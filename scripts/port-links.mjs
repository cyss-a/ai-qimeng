// port-links.mjs — 重写搬运内容内部的"页面互链"，使其指向本站 ASCII 路由 id。
//
// 源站 VitePress 内部链接用中文路径（如 /bluebook/第一篇.../第 1 章.../ 或 .../index.md）。
// 本站路由 id 已被 makeId 映射为 bluebook/part1/ch01 等 ASCII 形式，故需把内部互链也改写，
// 否则这些链接会 404。
//
// 做法：
//  1) 遍历 src/content/workbuddy 下所有 .md，构建 原始相对路径(归一化) -> ASCII id 的映射；
//  2) 对每个 .md 内的页面链接（/ai-qimeng/workbuddy/<rest>，非 assets）解码并归一化后查表替换。
// 幂等：已是正确的 ASCII 链接查不到对应"原文路径"键，保持原样。
import fs from 'node:fs';
import path from 'node:path';

const SRC = '/Volumes/池/素材+软件/workbuddy/2026-08-11-12-21-13/src/content/workbuddy';
const BASE = '/ai-qimeng/workbuddy';

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

// 构建映射：归一化原始路径 -> id
const map = new Map();
for (const f of walk(SRC)) {
  const rel = path.relative(SRC, f).split(path.sep).join('/').replace(/\.md$/, '').replace(/\/index$/, '');
  map.set(rel, makeId(rel));
}

function resolveLink(url) {
  // 仅处理本站页面路由（非 assets）
  let u = url.trim();
  if (!u.startsWith(BASE + '/') && !(u.startsWith(BASE) && u.length === BASE.length)) return null;
  // 去掉 BASE 前缀
  let rest = u.slice(BASE.length); // 形如 /bluebook/... 或 空
  // 分离 query/hash
  const hashIdx = rest.search(/[?#]/);
  let extra = '';
  if (hashIdx >= 0) {
    extra = rest.slice(hashIdx);
    rest = rest.slice(0, hashIdx);
  }
  let decoded;
  try {
    decoded = decodeURIComponent(rest);
  } catch {
    decoded = rest;
  }
  let key = decoded.replace(/^\//, '');
  // 去掉 .md 与 /index
  key = key.replace(/\.md$/, '').replace(/\/index$/, '').replace(/\/$/, '');
  if (!key) return null; // 指向栏目根
  const id = map.get(key);
  if (!id) return null;
  return `${BASE}/${id}/` + extra;
}

function rewrite(text) {
  // Markdown 链接/图片中的页面链接
  text = text.replace(/(\!?)\[([^\]]*)\]\(([^)]+)\)/g, (_m, bang, alt, raw) => {
    const r = resolveLink(raw.trim());
    return r ? `${bang}[${alt}](${r})` : `${bang}[${alt}](${raw})`;
  });
  // HTML href/src 中的页面链接（排除 assets）
  text = text.replace(/(href|src)=("|')([^"']+?)\2/g, (_m, attr, q, raw) => {
    if (raw.includes('/workbuddy-assets/')) return `${attr}=${q}${raw}${q}`;
    const r = resolveLink(raw.trim());
    return r ? `${attr}=${q}${r}${q}` : `${attr}=${q}${raw}${q}`;
  });
  return text;
}

let changed = 0;
const unmapped = new Set();
for (const f of walk(SRC)) {
  const raw = fs.readFileSync(f, 'utf-8');
  const next = rewrite(raw);
  if (next !== raw) {
    fs.writeFileSync(f, next, 'utf-8');
    changed++;
  }
}

// 二次扫描：列出仍指向中文路径且未命中的页面链接（用于人工核查）
for (const f of walk(SRC)) {
  const text = fs.readFileSync(f, 'utf-8');
  const links = text.match(/\/ai-qimeng\/workbuddy\/[^\s"')<]+/g) || [];
  for (const l of links) {
    const decoded = (() => { try { return decodeURIComponent(l); } catch { return l; } })();
    if (/%[0-9A-Fa-f]{2}/.test(l) || /[一-鿿]/.test(decoded)) {
      // 仍含编码或中文字符，说明可能是未被映射的链接
      const key = decoded.replace(/^\/ai-qimeng\/workbuddy\//, '').replace(/\.md$/, '').replace(/\/index$/, '').replace(/\/$/, '');
      if (!map.get(key)) unmapped.add(l + '  (in ' + path.basename(f) + ')');
    }
  }
}

console.log(`md files rewritten: ${changed}`);
if (unmapped.size) {
  console.log(`\n⚠ 仍含未映射的中文/编码页面链接 (${unmapped.size}):`);
  [...unmapped].slice(0, 40).forEach((u) => console.log('  - ' + u));
} else {
  console.log('所有内部页面链接已映射到 ASCII 路由 id。');
}
