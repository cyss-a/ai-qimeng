// port-assets.mjs — 第二步搬运归一化（资产搬迁 + 引用重写 + 残留 artifacts 清理）
//
// 1) 将 src/content/workbuddy/**/assets/ 目录整体搬迁到 public/workbuddy-assets/，
//    保持相对 src/content/workbuddy 的路径结构，使 Astro 能按公开 URL 提供图片/视频。
// 2) 把 Markdown 中的本地资产引用（./assets、../assets、assets\ 反斜杠、裸 assets）
//    重写为 /ai-qimeng/workbuddy-assets/<relPath> 绝对公开地址。
// 3) 把本地页面引用（./ 或 ../ 开头的相对链接）重写为 /ai-qimeng/workbuddy/<relPath>。
// 4) 清理 VitePress 残留 artifacts：![#](#anchor) 图标链接、独立成行的 "!"、
//    [Skip to content]、零宽编辑锚点、::: 容器标记。
//
// 幂等：重写后 URL 以 /ai-qimeng 开头，isLocal 直接跳过，可重复运行。
import fs from 'node:fs';
import path from 'node:path';

const SRC = '/Volumes/池/素材+软件/workbuddy/2026-08-11-12-21-13/src/content/workbuddy';
const PUB = '/Volumes/池/素材+软件/workbuddy/2026-08-11-12-21-13/public/workbuddy-assets';
const BASE_URL = '/ai-qimeng';

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

// 把 "url"（相对）按 md 所在目录 relDir 解析成相对 src/content/workbuddy 的 posix 路径
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
  // 跳过：外部、锚点、绝对（含已处理的 /ai-qimeng）、空
  const abs = new RegExp(
    '^(https?:|mailto:|tel:|#|/|' + BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')',
    'i'
  );
  return !abs.test(u);
}

function toPublic(url, relDir) {
  const rel = resolveRel(relDir, url);
  return rel.includes('/assets/') || /\/assets$/.test(rel)
    ? `${BASE_URL}/workbuddy-assets/${rel}`
    : `${BASE_URL}/workbuddy/${rel}`;
}

function normalize(text, relDir) {
  // ---- artifacts 清理 ----
  text = text.replace(/!?\[#\]\(#[^)]*\)/g, '');            // 锚点图标链接（含前导 !）
  text = text.replace(/\[Skip to content\]\(#VPContent\)/gi, '');
  text = text.replace(/\[[\s 　\u200b-\u200f]*\]\(([^)]*)\)/g, ''); // 零宽/空白编辑锚点
  text = text.replace(/^[ \t]*:::.*$/gm, '');               // VitePress ::: 容器
  text = text.replace(/^\s*![\s ]*$/gm, '');                // 独立成行的 "!" 残留

  // ---- Markdown 链接/图片 ----
  text = text.replace(/(\!?)\[([^\]]*)\]\(([^)]+)\)/g, (_m, bang, alt, rawUrl) => {
    const url = rawUrl.trim();
    if (!isLocal(url)) return `${bang}[${alt}](${url})`;
    return `${bang}[${alt}](${toPublic(url, relDir)})`;
  });

  // ---- HTML <img src> / <a href> / <video src> / <source src> ----
  text = text.replace(/(src|href)=("|')([^"']+?)\2/g, (_m, attr, q, rawUrl) => {
    const url = rawUrl.trim();
    if (!isLocal(url)) return `${attr}=${q}${url}${q}`;
    return `${attr}=${q}${toPublic(url, relDir)}${q}`;
  });

  return text;
}

const mdFiles = walk(SRC);
let changed = 0;
const warnings = [];

for (const f of mdFiles) {
  const relDir = path.dirname(path.relative(SRC, f)).split(path.sep).join('/');
  const raw = fs.readFileSync(f, 'utf-8');
  const next = normalize(raw, relDir);
  if (next !== raw) {
    fs.writeFileSync(f, next, 'utf-8');
    changed++;
  }
}

// ---- 搬迁 assets 目录 ----
const assetDirs = [];
(function collect(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'assets') assetDirs.push(p);
      else collect(p);
    }
  }
})(SRC);

let moved = 0;
for (const d of assetDirs) {
  const rel = path.relative(SRC, d).split(path.sep).join('/');
  const dest = path.join(PUB, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(dest)) {
    fs.renameSync(d, dest);
    moved++;
  } else {
    warnings.push(`目标已存在，跳过搬迁: ${rel}`);
  }
}

// ---- 校验：重写后的本地资产 URL 是否都能在 public 找到 ----
for (const f of mdFiles) {
  const text = fs.readFileSync(f, 'utf-8');
  const refs = text.match(/\/ai-qimeng\/workbuddy-assets\/[^\s"')<]+/g) || [];
  for (const ref of refs) {
    const rel = ref.replace(`${BASE_URL}/workbuddy-assets/`, '');
    const fp = path.join(PUB, rel);
    if (!fs.existsSync(fp)) warnings.push(`缺失资产: ${rel}  (引用自 ${path.basename(f)})`);
  }
}

console.log(`md files processed: ${mdFiles.length}, rewritten: ${changed}`);
console.log(`asset dirs moved: ${moved}/${assetDirs.length}`);
if (warnings.length) {
  console.log(`\n⚠ warnings (${warnings.length}):`);
  [...new Set(warnings)].slice(0, 60).forEach((w) => console.log('  - ' + w));
}
