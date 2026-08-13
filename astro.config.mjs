// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// AI 新手启蒙课程 · Astro 配置
// 关键约束（来自 ARCHITECTURE.md §12 / ADR-004）：
// - output: 'static'        纯静态产物，适配知识星球分发
// - trailingSlash: 'ignore' 干净 URL，避免双索引
// - @tailwindcss/vite       Tailwind v4 官方集成
//
// 关于 markdown.rehypePlugins：
// Astro 7.2 虽提示 `markdown.rehypePlugins` 已废弃，但内容集合（content collections）
// 的 `render()` 在当前版本仍走该管线；`unified({...})` processor 对内容集合不生效。
// 故暂保留 rehypePlugins 注入自定义插件（懒加载 + 难度地图标记）。

/**
 * 零依赖 rehype 插件：给 markdown 渲染的图片加懒加载。
 * 首图立即加载（eager + fetchpriority=high），其余 lazy + async decoding，
 * 解决章节页多图同时请求导致首屏卡顿的问题。
 */
function rehypeLazyImages() {
  return (tree) => {
    let firstImg = true;
    function walk(node) {
      if (!node || typeof node !== 'object') return;
      if (node.type === 'element' && node.tagName === 'img') {
        const props = node.properties || (node.properties = {});
        props.loading = firstImg ? 'eager' : 'lazy';
        props.decoding = props.decoding || 'async';
        if (firstImg) {
          props.fetchpriority = props.fetchpriority || 'high';
          firstImg = false;
        }
      }
      if (Array.isArray(node.children)) {
        for (const child of node.children) walk(child);
      }
    }
    walk(tree);
  };
}

/**
 * 零依赖 rehype 插件：标记「难度地图」区块，供 CSS 做深色表头美化 + 移动端横向滚动。
 * - 遇到文本为「难度地图」的 h2 → 加 .difficulty-map-title
 * - 其后的 table（跳过纯空白文本节点找真正的元素兄弟）→ 加 .difficulty-map-table
 *   并套一层 .difficulty-map-scroll 容器，小屏下可横向滑动而不挤压换行。
 */
function rehypeDifficultyMap() {
  return (tree) => {
    function walk(node, parent, index) {
      if (!node || typeof node !== 'object') return;
      if (node.type === 'element' && node.tagName === 'h2' && Array.isArray(node.children)) {
        const textNode = node.children.find((c) => c.type === 'text');
        const text = textNode ? (textNode.value || '').trim() : '';
        if (text === '难度地图') {
          const props = node.properties || (node.properties = {});
          const existing = (props.class || '').toString().split(/\s+/).filter(Boolean);
          if (!existing.includes('difficulty-map-title')) existing.push('difficulty-map-title');
          props.class = existing.join(' ');
          // 利用父节点和自身索引，找下一个真正的元素兄弟（table）并套滚动容器
          if (parent && Array.isArray(parent.children)) {
            let j = index + 1;
            while (j < parent.children.length && parent.children[j].type !== 'element') j++;
            const next = parent.children[j];
            if (next && next.tagName === 'table') {
              const nextProps = next.properties || (next.properties = {});
              const nextExisting = (nextProps.class || '').toString().split(/\s+/).filter(Boolean);
              if (!nextExisting.includes('difficulty-map-table')) nextExisting.push('difficulty-map-table');
              nextProps.class = nextExisting.join(' ');
              parent.children[j] = {
                type: 'element',
                tagName: 'div',
                properties: { class: 'difficulty-map-scroll' },
                children: [next],
              };
            }
          }
        }
      }
      if (Array.isArray(node.children)) {
        for (let i = 0; i < node.children.length; i++) {
          walk(node.children[i], node, i);
        }
      }
    }
    walk(tree);
  };
}

export default defineConfig({
  output: 'static',
  // GitHub Pages 项目页：站点根 + 子路径 base（不设 base 资源会 404）
  site: 'https://cyss-a.github.io',
  base: '/ai-qimeng/',
  trailingSlash: 'ignore',
  markdown: {
    rehypePlugins: [rehypeLazyImages, rehypeDifficultyMap],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
