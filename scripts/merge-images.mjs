// merge-images.mjs — 补齐蓝图 27 章插图引用
//
// 背景：蓝皮书的本地 markdown 在搬运时丢失了图片引用（![]() 行），
// 但图片二进制已存在于 public/workbuddy-assets/bluebook/...。
// 本脚本从上游原始 markdown（/tmp/up_raw/bluebook）重新归一化（复刻 port-workbuddy
// + port-assets + port-links 三段逻辑），得到「带正确图片 URL 的归一化文本」，
// 然后与本地现有文件逐行比对（忽略图片行）：
//   - 非图片文本完全一致 → 用上游归一化版本覆盖本地（等价于只补回了图片行）；
//   - 不一致 → 跳过并报告，交人工核查（绝不盲目覆盖用户已调好的内容）。
//
// 安全前提：上游与本地文本除图片外应一致；任何文本漂移都会被比对拦截。
import fs from 'node:fs';
import path from 'node:path';

const LOCAL = '/Volumes/池/素材+软件/workbuddy/2026-08-11-12-21-13/src/content/workbuddy/bluebook';
const UP = '/tmp/up_raw/bluebook';
const BASE = '/ai-qimeng';
const ASSET_EXT = /\.(png|jpe?g|gif|svg|webp|pdf|mp4|webm|ico|json|html)$/i;

// ---------- port-workbuddy: rewriteUrl + normalize ----------
function rewriteUrl(url) {
  const u = url.trim();
  if (/^(https?:|mailto:|tel:|#|\.\/|\.\.\/)/i.test(u)) return u;
  if (!u.startsWith('/')) return u;
  if (u.startsWith(BASE)) return u;
  const clean = u.split('#')[0].split('?')[0];
  const isAsset = ASSET_EXT.test(clean);
  const prefix = isAsset ? `${BASE}/workbuddy-assets` : `${BASE}/workbuddy`;
  return prefix + u;
}
function normalizeWorkbuddy(text) {
  text = text.replace(/\[Skip to content\]\(#VPContent\)/gi, '');
  // 关键修复：负向 lookbehind (?<!!) 避免吞掉空 alt 的图片 ![](...)（否则整本蓝皮书插图在搬运时被清空）
  text = text.replace(/(?<!!)\[[\s 　\u200b-\u200f]*\]\(([^)]*)\)/g, '');
  text = text.replace(/\[#\]\(#[^)]*\)/g, '');
  text = text.replace(/^[ \t]*:::.*$/gm, '');
  text = text.replace(/(\!?)\[([^\]]*)\]\(([^)\s]+)\)/g, (_m, bang, alt, url) => `${bang}[${alt}](${rewriteUrl(url)})`);
  text = text.replace(/(src|href)=("|')([^"']+?)\2/g, (_m, attr, q, url) => `${attr}=${q}${rewriteUrl(url)}${q}`);
  return text;
}

// ---------- port-assets: resolveRel / isLocal / toPublic / normalize ----------
function resolveRel(relDir, url) {
  const u = url.trim().replace(/\\/g, '/');
  const segs = relDir ? relDir.split('/') : [];
  for (const part of u.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') { segs.pop(); continue; }
    segs.push(part);
  }
  return segs.join('/');
}
function isLocal(url) {
  const u = url.trim();
  const abs = new RegExp('^(https?:|mailto:|tel:|#|/|' + BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'i');
  return !abs.test(u);
}
function toPublic(url, relDir) {
  const rel = resolveRel(relDir, url);
  const pub = rel.includes('/assets/') || /\/assets$/.test(rel)
    ? `${BASE}/workbuddy-assets/${rel}`
    : `${BASE}/workbuddy/${rel}`;
  // 资产路径含空格/中文会破坏 Markdown 图片解析（![]() 丢 ! 变成纯文本），
  // 故逐段编码（先 decode 避免二次编码），静态服务器会解码回原始文件名。
  return encodeUrlSafe(pub);
}
function encodeUrlSafe(url) {
  const idx = url.indexOf('://');
  const start = idx >= 0 ? url.indexOf('/', idx + 3) : 0;
  const head = url.slice(0, start);
  const tail = url.slice(start);
  return (
    head +
    tail
      .split('/')
      .map((seg) => {
        try { return encodeURIComponent(decodeURIComponent(seg)); } catch { return encodeURIComponent(seg); }
      })
      .join('/')
  );
}
function normalizeAssets(text, relDir) {
  text = text.replace(/!?\[#\]\(#[^)]*\)/g, '');
  text = text.replace(/\[Skip to content\]\(#VPContent\)/gi, '');
  // 关键修复：负向 lookbehind (?<!!) 避免吞掉空 alt 的图片 ![](...)
  text = text.replace(/(?<!!)\[[\s 　\u200b-\u200f]*\]\(([^)]*)\)/g, '');
  text = text.replace(/^[ \t]*:::.*$/gm, '');
  text = text.replace(/^\s*![\s ]*$/gm, '');
  text = text.replace(/(\!?)\[([^\]]*)\]\(([^)]+)\)/g, (_m, bang, alt, rawUrl) => {
    const url = rawUrl.trim();
    if (!isLocal(url)) return `${bang}[${alt}](${url})`;
    return `${bang}[${alt}](${toPublic(url, relDir)})`;
  });
  text = text.replace(/(src|href)=("|')([^"']+?)\2/g, (_m, attr, q, rawUrl) => {
    const url = rawUrl.trim();
    if (!isLocal(url)) return `${attr}=${q}${url}${q}`;
    return `${attr}=${q}${toPublic(url, relDir)}${q}`;
  });
  return text;
}

// ---------- port-links: makeId / map / resolveLink / rewrite ----------
const CN_NUM = { 一: '1', 二: '2', 三: '3', 四: '4', 五: '5', 六: '6', 七: '7', 八: '8', 九: '9', 十: '10' };
function makeId(entry) {
  let p = entry.replace(/\.md$/, '').replace(/\/index$/, '');
  const segs = p.split('/');
  const out = segs.map((seg) => {
    if (seg === 'bluebook') return 'bluebook';
    let m;
    if ((m = seg.match(/^第([一二三四五六七八九十])篇/))) return 'part' + CN_NUM[m[1]];
    if ((m = seg.match(/^第\s*(\d+)\s*章/))) return 'ch' + m[1].padStart(2, '0');
    if (seg === '附录' || seg.startsWith('附录')) {
      const am = seg.match(/附录\s*([A-Za-z])/);
      return am ? 'appendix-' + am[1].toLowerCase() : 'appendix';
    }
    if (seg.startsWith('课外阅读')) return 'extra-reading';
    return seg;
  });
  return out.join('/');
}
function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}
const map = new Map();
for (const f of walk(UP)) {
  const rel = path.relative(UP, f).split(path.sep).join('/').replace(/\.md$/, '').replace(/\/index$/, '');
  map.set(rel, makeId(rel));
}
function resolveLink(url) {
  let u = url.trim();
  if (!u.startsWith(`${BASE}/workbuddy/`) && !(u.startsWith(`${BASE}/workbuddy`) && u.length === `${BASE}/workbuddy`.length)) return null;
  let rest = u.slice(`${BASE}/workbuddy`.length);
  const hashIdx = rest.search(/[?#]/);
  let extra = '';
  if (hashIdx >= 0) { extra = rest.slice(hashIdx); rest = rest.slice(0, hashIdx); }
  let decoded;
  try { decoded = decodeURIComponent(rest); } catch { decoded = rest; }
  let key = decoded.replace(/^\//, '').replace(/\.md$/, '').replace(/\/index$/, '').replace(/\/$/, '');
  if (!key) return null;
  const id = map.get(key);
  if (!id) return null;
  return `${BASE}/workbuddy/${id}/` + extra;
}
function rewriteLinks(text) {
  text = text.replace(/(\!?)\[([^\]]*)\]\(([^)]+)\)/g, (_m, bang, alt, raw) => {
    const r = resolveLink(raw.trim());
    return r ? `${bang}[${alt}](${r})` : `${bang}[${alt}](${raw})`;
  });
  text = text.replace(/(href|src)=("|')([^"']+?)\2/g, (_m, attr, q, raw) => {
    if (raw.includes('/workbuddy-assets/')) return `${attr}=${q}${raw}${q}`;
    const r = resolveLink(raw.trim());
    return r ? `${attr}=${q}${r}${q}` : `${attr}=${q}${raw}${q}`;
  });
  return text;
}

// ---------- 清理本地被误删图片后残留的孤立 "!" 标记（仅用于比对，不改写本地逻辑判断之外的内容） ----------
function cleanLocalLeftovers(s) {
  s = s.replace(/^[ \t]*!([ \t]*)$/gm, '');   // 独立成行的 "!"
  s = s.replace(/^>\s*!(?=\s|$)/gm, '>');     // 块引用内残留的 "> !"
  return s;
}

// ---------- 比对（忽略图片行 + 媒体标签 + 折叠连续空行，逐行 strip 尾空白） ----------
function linesIgnoringImages(s) {
  const lines = s
    .replace(/<video\b[^>]*>/g, '')
    .replace(/<\/video>/g, '')
    .replace(/<source\b[^>]*>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''));
  // 折叠连续空行（上游图片行被移除后会留下多余空行，内容本身一致）
  const out = [];
  for (const l of lines) {
    if (l === '' && out.length && out[out.length - 1] === '') continue;
    out.push(l);
  }
  return out;
}
function sameIgnoringImages(a, b) {
  const la = linesIgnoringImages(a);
  const lb = linesIgnoringImages(b);
  if (la.length !== lb.length) return false;
  for (let i = 0; i < la.length; i++) if (la[i] !== lb[i]) return false;
  return true;
}

// ---------- 主流程 ----------
const imgRe = /!\[[^\]]*\]\([^)]*\)/g;
let skipped = 0, written = 0, noop = 0, missing = 0;
const mismatches = [];
const missingUp = [];

for (const f of walk(LOCAL)) {
  const rel = path.relative(LOCAL, f).split(path.sep).join('/');
  const upFile = path.join(UP, rel);
  if (!fs.existsSync(upFile)) { missingUp.push(rel); missing++; continue; }

  const rawUp = fs.readFileSync(upFile, 'utf-8');
  // relDir 必须包含 bluebook 段，使公开资产 URL 命中 public/workbuddy-assets/bluebook/...
  const relDir = path.join('bluebook', path.dirname(rel)).split(path.sep).join('/');
  let norm = normalizeWorkbuddy(rawUp);
  norm = normalizeAssets(norm, relDir);
  norm = rewriteLinks(norm);

  const localRaw = fs.readFileSync(f, 'utf-8');
  const localClean = cleanLocalLeftovers(localRaw);
  if (sameIgnoringImages(norm, localClean)) {
    if (norm !== localRaw) {
      // 仅图片行不同 → 覆盖（等价于补回图片）
      fs.writeFileSync(f, norm, 'utf-8');
      written++;
      const nImgs = (norm.match(imgRe) || []).length;
      console.log(`WRITE  ${rel}  (+${nImgs} 图片引用)`);
    } else {
      noop++;
    }
  } else {
    skipped++;
    mismatches.push(rel);
    console.log(`SKIP   ${rel}  (非图片文本不一致，需人工核查)`);
  }
}

console.log(`\n=== 汇总 ===`);
console.log(`写入(仅补图): ${written}`);
console.log(`无变化:       ${noop}`);
console.log(`跳过(不一致): ${skipped}`);
console.log(`上游缺失:     ${missing}`);
if (missingUp.length) { console.log('  上游缺失文件:'); missingUp.forEach((x) => console.log('   - ' + x)); }
if (mismatches.length) { console.log('  不一致文件:'); mismatches.forEach((x) => console.log('   - ' + x)); }
