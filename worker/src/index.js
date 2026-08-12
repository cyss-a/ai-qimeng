/**
 * AI 启梦 · 每日科技/AI 新闻聚合 Worker
 *
 * 职责：
 *  - 每日 UTC 01:00（北京时间 09:00）定时抓取多个中文科技/AI 媒体 RSS，
 *    归一化为统一 JSON，写入 R2 公开桶。
 *  - 支持手动刷新：访问 https://<worker>.workers.dev/?refresh=1 或 POST 立即生成。
 *
 * 数据契约（总监锁定）：
 *  - R2 桶名 ai-qimeng-news（公开读取）。
 *  - 对象：
 *      news/latest.json          最新一期
 *      news/YYYY-MM-DD.json      当日（保留最近 14 天，旧的自动清理）
 *      news/index.json           可用日期数组，降序
 *  - 单条结构：{ id, title, summary, source, url, pubDate }
 *
 * 设计要点（镜像 scripts/fetch-news.py 的精神）：
 *  - 单源失败不影响其它源（try/catch + 8s 超时）。
 *  - 标题含中文才保留（CJK 过滤）。
 *  - 按 url/title 去重，pubDate 降序，取前 20。
 *  - 有效条目 < 5 视为抓取异常，跳过写入以保留上一期真实内容。
 *
 * 不硬编码任何密钥：R2 通过 wrangler.toml 的 binding NEWS_BUCKET 注入。
 */

// 抓取源：优先 RSS；RSS 失败或为空时回退到首页 HTML 兜底解析。
// 现有 9 源 + 团队负责人要求追加的 7 源，共 16 个（可达性明细见 docs/CLOUDFLARE-SETUP.md 部署报告）。
// 注：雷锋网有效 RSS 为 /feed（/rss 返回 404）；虎嗅 rss/0.xml 在本机偶发超时，均配置 html 兜底。
// 追加源中：爱范儿 / 智东西 / IT之家 已 curl 验证 RSS 返回 200 且内容含 <rss/<feed；
// 品玩 /feed/all 现返回 404 页面、动点科技 feed 返回 403、cnBeta / 猎云网 在本机沙箱不可达（000），
// 这 4 源仅保留首页 HTML 兜底（rss 留空，由 runFetch 跳过 RSS 直接走 html 兜底）。
const SOURCES = [
  { name: '量子位',    rss: 'https://www.qbitai.com/rss',        html: 'https://www.qbitai.com/' },
  { name: '机器之心',  rss: 'https://www.jiqizhixin.com/rss',    html: 'https://www.jiqizhixin.com/' },
  { name: '极客公园',  rss: 'https://www.geekpark.net/rss',      html: 'https://www.geekpark.net/' },
  { name: '36氪',      rss: 'https://36kr.com/feed',             html: 'https://36kr.com/' },
  { name: '少数派',    rss: 'https://sspai.com/feed',            html: 'https://sspai.com/' },
  { name: '虎嗅',      rss: 'https://www.huxiu.com/rss/0.xml',   html: 'https://www.huxiu.com/' },
  { name: '钛媒体',    rss: 'https://www.tmtpost.com/rss',       html: 'https://www.tmtpost.com/' },
  { name: 'InfoQ 中文', rss: 'https://www.infoq.cn/feed',        html: 'https://www.infoq.cn/' },
  { name: '雷锋网',    rss: 'https://www.leiphone.com/feed',     html: 'https://www.leiphone.com/' },
  // —— 以下为团队负责人要求追加的 7 个源（curl 可达性见 docs/CLOUDFLARE-SETUP.md）——
  { name: '爱范儿',    rss: 'https://www.ifanr.com/feed',         html: 'https://www.ifanr.com/' },
  { name: '智东西',    rss: 'https://zhidx.com/rss',              html: 'https://zhidx.com/' },
  { name: 'IT之家',    rss: 'https://www.ithome.com/rss/',        html: 'https://www.ithome.com/' },
  // 品玩 /feed/all 返回 404、动点科技 feed 返回 403、cnBeta/猎云网 本机沙箱不可达（000），
  // 故 4 源 rss 留空，runFetch 会跳过 RSS 直接走首页 HTML 兜底。
  { name: '品玩',      rss: '',                                    html: 'https://www.pingwest.com/' },
  { name: '动点科技',  rss: '',                                    html: 'https://cn.technode.com/' },
  { name: 'cnBeta',    rss: '',                                    html: 'https://www.cnbeta.com/' },
  { name: '猎云网',    rss: '',                                    html: 'https://www.lieyunwang.com/' },
];

const RSS_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/rss+xml, application/xml, text/xml, */*',
};
const HTML_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html, application/xhtml+xml, */*',
};

const FETCH_TIMEOUT = 8000;  // 单源超时 8 秒
const MAX_ITEMS = 20;        // 最终保留条数
const MIN_ITEMS = 5;         // 低于此数量视为抓取异常，跳过写入
const SUMMARY_MAX = 80;      // 摘要字数上限
const RETENTION_DAYS = 14;   // 日报保留天数
const MAX_PER_SOURCE = 6;    // 单源最多贡献条数，保证多源多样性

// ---------------------------------------------------------------------------
// 抓取工具
// ---------------------------------------------------------------------------

// 带超时的文本抓取；任何失败都返回 null（单源失败不影响其它源）。
async function fetchText(url, headers) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT);
  try {
    const resp = await fetch(url, { signal: ctrl.signal, headers, redirect: 'follow' });
    if (!resp.ok) return null;
    return await resp.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// 文本清洗
// ---------------------------------------------------------------------------

function decodeEntities(s) {
  if (!s) return '';
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&'); // 放最后，避免二次解码
}

function stripCdata(s) {
  return (s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

function stripTags(s) {
  return (s || '').replace(/<[^>]+>/g, ' ');
}

function cleanText(s) {
  if (!s) return '';
  return stripCdata(stripTags(decodeEntities(s))).replace(/\s+/g, ' ').trim();
}

// 去除摘要开头的来源/作者等元信息前缀（对齐 scripts/fetch-news.py 的 META_PREFIX_PATTERNS）。
const META_PREFIX_RE = [
  /^(作者|编辑|责编|头图来源|图片来源|来源|撰文|文\/)\s*[:：]?\s*/,
  /^综合.{0,40}?(消息|报道|讯)\s*/,
];

// 摘要归一：先去元信息前缀，再按码点截断到 SUMMARY_MAX 字并补省略号。
function truncateSummary(text) {
  let s = cleanText(text);
  for (const re of META_PREFIX_RE) s = s.replace(re, '');
  s = s.trim();
  const chars = Array.from(s);
  if (chars.length > SUMMARY_MAX) {
    return chars.slice(0, SUMMARY_MAX).join('') + '…';
  }
  return s;
}

// 按本地名提取标签内容，忽略命名空间前缀（同时匹配 <pubDate> 与 <dc:date>）。
function localTag(block, localName) {
  const re = new RegExp(`<([\\w-]+:)?${localName}\\b[^>]*>([\\s\\S]*?)<\\/([\\w-]+:)?${localName}>`, 'i');
  const m = block.match(re);
  return m ? m[2] : '';
}

// 提取文章链接：优先 Atom 的 <link href>，再退回 RSS 的 <link>文本。
function extractLink(block) {
  const links = [...block.matchAll(/<link\b[^>]*>/gi)];
  if (links.length) {
    const alt = links.find((l) => /rel=["']alternate["']/i.test(l[0]));
    const chosen = alt || links[0];
    const m = chosen[0].match(/href=["']([^"']+)["']/i);
    if (m) return m[1];
  }
  return localTag(block, 'link') || '';
}

function toAbsolute(href, base) {
  try {
    return new URL(href, base).toString();
  } catch {
    return '';
  }
}

// 仅保留含中文字符的标题（CJK 过滤）。
function hasCJK(s) {
  return /[一-鿿㐀-䶿]/.test(s || '');
}

// ---------------------------------------------------------------------------
// RSS / Atom 解析（轻量正则，无外部依赖）
// ---------------------------------------------------------------------------

function parseRss(xml, sourceName) {
  if (!xml) return [];
  const items = [];
  // 同时支持 RSS <item> 与 Atom <entry>
  const blocks = xml.match(/<(item|entry)\b[\s\S]*?<\/\1>/gi) || [];
  for (const block of blocks) {
    const title = cleanText(localTag(block, 'title'));
    const url = cleanText(extractLink(block));
    const summary =
      cleanText(localTag(block, 'description')) ||
      cleanText(localTag(block, 'summary')) ||
      cleanText(localTag(block, 'content'));
    const pubRaw = localTag(block, 'pubDate') || localTag(block, 'date');
    if (!title || !url) continue;
    items.push({ source: sourceName, title, url, summary, pubDate: pubRaw });
  }
  return items;
}

// HTML 兜底：从首页抽取含中文的站内文章链接 + 标题（best-effort）。
function parseHtmlHome(html, baseUrl, sourceName) {
  if (!html) return [];
  const items = [];
  const re = /<a\b[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null && items.length < 40) {
    const href = m[1];
    const text = cleanText(m[2]);
    if (text.length < 6 || !hasCJK(text)) continue;
    const abs = toAbsolute(href, baseUrl);
    if (!abs || abs === baseUrl || abs.startsWith(baseUrl + '#')) continue;
    items.push({ source: sourceName, title: text, url: abs, summary: '', pubDate: '' });
  }
  return items;
}

// ---------------------------------------------------------------------------
// 日期处理
// ---------------------------------------------------------------------------

function formatISO(d, explicitOffMin) {
  if (!(d instanceof Date) || isNaN(d.getTime())) return '';
  const p = (n) => String(n).padStart(2, '0');
  const offMin = explicitOffMin !== undefined ? explicitOffMin : -d.getTimezoneOffset();
  const sign = offMin >= 0 ? '+' : '-';
  const abs = Math.abs(offMin);
  const oh = p(Math.floor(abs / 60));
  const om = p(abs % 60);
  return (
    `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}` +
    `T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}` +
    `${sign}${oh}:${om}`
  );
}

// 把 RSS 原始日期转成带时区偏移的 ISO（如 2026-08-12T00:30:00+08:00）。
// 优先保留原始偏移；无偏移则按北京时间（+08:00）处理（中文源日期通常省略时区）。
function formatPubDate(raw) {
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return '';
  const m = raw.trim().match(/([+-])(\d{2}):?(\d{2})\s*$/);
  if (m) {
    const sign = m[1] === '+' ? 1 : -1;
    const offMin = sign * (parseInt(m[2], 10) * 60 + parseInt(m[3], 10));
    const local = new Date(d.getTime() + offMin * 60000);
    return formatISO(local, offMin);
  }
  // 无偏移：中文 RSS 多数即北京时间，末尾补 +08:00（不输出 Z）
  return d.toISOString().replace(/\.\d{3}Z$/, '+08:00');
}

// ---------------------------------------------------------------------------
// id 生成（Web Crypto，按 url 哈希，稳定可去重）
// ---------------------------------------------------------------------------

async function makeId(url) {
  const data = new TextEncoder().encode(url);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return hex.slice(0, 12);
}

// ---------------------------------------------------------------------------
// 归一化 + 过滤 + 去重 + 排序
// ---------------------------------------------------------------------------

async function normalize(all) {
  // 先按来源限制条数，保证多源多样性（避免单源霸屏）
  const bySource = new Map();
  for (const r of all) {
    const s = r.source || '未知';
    if (!bySource.has(s)) bySource.set(s, []);
    bySource.get(s).push(r);
  }
  const capped = [];
  for (const [, list] of bySource) capped.push(...list.slice(0, MAX_PER_SOURCE));

  const raw = [];
  for (const r of capped) {
    const title = cleanText(r.title);
    if (!title || !hasCJK(title)) continue; // CJK 过滤：标题须含中文
    const url = (r.url || '').trim();
    if (!url) continue;
    const summary = truncateSummary(r.summary);
    const pubDate = formatPubDate(r.pubDate);
    raw.push({ title, url, summary, source: r.source, pubDate });
  }

  // 去重：先按 url，url 为空时按 title
  const seenUrl = new Set();
  const seenTitle = new Set();
  const deduped = [];
  for (const n of raw) {
    if (n.url) {
      if (seenUrl.has(n.url)) continue;
      seenUrl.add(n.url);
    } else {
      if (seenTitle.has(n.title)) continue;
      seenTitle.add(n.title);
    }
    deduped.push(n);
  }

  // 按 pubDate 降序；无日期沉底
  deduped.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));
  const top = deduped.slice(0, MAX_ITEMS);

  // 并行计算 id
  await Promise.all(top.map(async (n) => { n.id = await makeId(n.url); }));
  return top;
}

// ---------------------------------------------------------------------------
// R2 写入
// ---------------------------------------------------------------------------

async function updateIndex(bucket, todayStr) {
  let index = [];
  try {
    const obj = await bucket.get('news/index.json');
    if (obj) index = JSON.parse(await obj.text());
  } catch {
    // 首跑无 index，忽略
  }
  if (!Array.isArray(index)) index = [];

  if (!index.includes(todayStr)) index.unshift(todayStr);
  index.sort().reverse(); // 降序

  const keep = index.slice(0, RETENTION_DAYS);
  // 清理超期日报文件
  for (const d of index) {
    if (!keep.includes(d)) {
      await bucket.delete(`news/${d}.json`).catch(() => {});
    }
  }
  await bucket.put('news/index.json', JSON.stringify(keep), {
    httpMetadata: { contentType: 'application/json' },
  });
}

async function writeOutputs(bucket, payload, todayStr) {
  const body = JSON.stringify(payload);
  const opts = { httpMetadata: { contentType: 'application/json' } };
  await bucket.put('news/latest.json', body, opts);
  await bucket.put(`news/${todayStr}.json`, body, opts);
  await updateIndex(bucket, todayStr);
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------

async function runFetch(env) {
  const now = new Date();
  // 北京日期（UTC+8）：定时为北京 09:00，按北京日历日命名文件
  const beijingDate = new Date(now.getTime() + 8 * 3600 * 1000).toISOString().slice(0, 10);
  const sourceStats = {};
  const all = [];

  for (const src of SOURCES) {
    let raw = [];
    if (src.rss) {
      const xml = await fetchText(src.rss, RSS_HEADERS);
      if (xml) raw = parseRss(xml, src.name);
    }
    // RSS 无果（或无 RSS 源）则 HTML 兜底
    if (raw.length === 0 && src.html) {
      const html = await fetchText(src.html, HTML_HEADERS);
      if (html) raw = parseHtmlHome(html, src.html, src.name);
    }
    sourceStats[src.name] = raw.length;
    all.push(...raw);
  }

  const items = await normalize(all);

  // 健壮性：有效条目过少则跳过写入，保留上一期 latest.json
  if (items.length < MIN_ITEMS) {
    const reason = `有效条目仅 ${items.length} 条（< ${MIN_ITEMS}），跳过写入以保留上一期数据`;
    console.warn('[ai-qimeng-news] ' + reason, sourceStats);
    return { ok: true, skipped: true, reason, date: beijingDate, count: items.length, sourceStats };
  }

  const payload = {
    version: 1,
    date: beijingDate,
    generatedAt: now.toISOString(),
    count: items.length,
    sources: [...new Set(items.map((i) => i.source))],
    items,
  };

  await writeOutputs(env.NEWS_BUCKET, payload, beijingDate);
  console.log(`[ai-qimeng-news] 已写入 ${items.length} 条 -> news/latest.json / news/${beijingDate}.json`);
  return { ok: true, skipped: false, date: beijingDate, count: items.length, sourceStats };
}

// ---------------------------------------------------------------------------
// 入口
// ---------------------------------------------------------------------------

export default {
  // 定时触发（cron 0 1 * * *，UTC 01:00 = 北京 09:00）
  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      runFetch(env).catch((e) => {
        console.error('[ai-qimeng-news] scheduled run failed', e);
      })
    );
  },

  // 手动刷新 / 测试：?refresh=1 或 POST 立即生成；否则返回状态说明
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const wantRefresh = url.searchParams.get('refresh') === '1' || req.method === 'POST';
    if (wantRefresh) {
      const result = await runFetch(env);
      return jsonResponse(result);
    }
    return new Response(
      'AI 启梦每日新闻 Worker 运行中。每日 UTC 01:00（北京时间 09:00）自动抓取；立即生成首日数据请访问 ?refresh=1',
      { status: 200, headers: corsHeaders() }
    );
  },
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain; charset=utf-8',
  };
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
    },
  });
}
