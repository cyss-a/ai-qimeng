// port-workbuddy.mjs — 归一化搬运进来的 VitePress Markdown
// 1) 内部链接/资源按"是否资源后缀"分别前缀 /ai-qimeng/workbuddy (页面) 或 /ai-qimeng/workbuddy-assets (资源)
// 2) 剥离 VitePress  artifacts：Skip to content、零宽空格编辑锚点、[#](#anchor) 锚点图标、::: 容器标记
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Volumes/池/素材+软件/workbuddy/2026-08-11-12-21-13/src/content/workbuddy';
const ASSET_EXT = /\.(png|jpe?g|gif|svg|webp|pdf|mp4|webm|ico|json|html)$/i;

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

function rewriteUrl(url) {
  const u = url.trim();
  if (/^(https?:|mailto:|tel:|#|\.\/|\.\.\/)/i.test(u)) return u; // 外部/锚点/相对
  if (!u.startsWith('/')) return u; // 无前缀的相对
  if (u.startsWith('/ai-qimeng')) return u; // 已处理
  const clean = u.split('#')[0].split('?')[0];
  const isAsset = ASSET_EXT.test(clean);
  const prefix = isAsset ? '/ai-qimeng/workbuddy-assets' : '/ai-qimeng/workbuddy';
  return prefix + u;
}

function normalize(text) {
  // 1. 剥离 artifacts
  text = text.replace(/\[Skip to content\]\(#VPContent\)/gi, '');
  text = text.replace(/\[[\s 　\u200b-\u200f]*\]\(([^)]*)\)/g, ''); // 零宽/空白编辑锚点
  text = text.replace(/\[#\]\(#[^)]*\)/g, ''); // [#](#anchor) 锚点图标
  text = text.replace(/^[ \t]*:::.*$/gm, ''); // VitePress ::: 容器标记

  // 2. 改写 markdown 链接/图片
  text = text.replace(/(\!?)\[([^\]]*)\]\(([^)\s]+)\)/g, (_m, bang, alt, url) => {
    return `${bang}[${alt}](${rewriteUrl(url)})`;
  });
  // 3. 改写 HTML <img src> / <a href>
  text = text.replace(/(src|href)=("|')([^"']+?)\2/g, (_m, attr, q, url) => {
    return `${attr}=${q}${rewriteUrl(url)}${q}`;
  });
  return text;
}

const files = walk(ROOT);
let changed = 0;
for (const f of files) {
  const raw = fs.readFileSync(f, 'utf-8');
  const next = normalize(raw);
  if (next !== raw) {
    fs.writeFileSync(f, next, 'utf-8');
    changed++;
  }
}
console.log(`processed ${files.length} md files, rewrote ${changed}`);
