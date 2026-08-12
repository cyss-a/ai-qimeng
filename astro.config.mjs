// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// AI 新手启蒙课程 · Astro 配置
// 关键约束（来自 ARCHITECTURE.md §12 / ADR-004）：
// - output: 'static'        纯静态产物，适配知识星球分发
// - trailingSlash: 'ignore' 干净 URL，避免双索引
// - @tailwindcss/vite       Tailwind v4 官方集成
//
// 关于 markdown.processor（ADR-004）：
// 契约原文写 `processor: 'unified'`，但真实 Astro 7.2 已将该选项改为对象形式
// （需 `@astrojs/markdown-remark` 的 `unified({})`）。在本受限构建环境中该重依赖链
// 多次因 OOM 安装不完整。经实测，Astro 7.2 默认管线 `satteri()` 同样会为标题注入
// `id` 锚点并支持 `getHeadings()`，TOC / 章节导航功能正常。故此处采用默认管线，
// ADR-004 的核心验收目标（标题锚点 / TOC 稳定可用）依旧满足。
export default defineConfig({
  output: 'static',
  // GitHub Pages 项目页：站点根 + 子路径 base（不设 base 资源会 404）
  site: 'https://cyss-a.github.io',
  base: '/ai-qimeng/',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
