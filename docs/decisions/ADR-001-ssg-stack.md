# ADR-001: 采用 Astro 7 作为静态站点生成器

- 状态：Accepted（2026-08-11）
- 决策者：高见远（首席架构师）
- 关联：ADR-002（图标库）、ADR-003（部署）、ADR-004（markdown 处理器）

## 背景（Context）

「AI 新手启蒙课程」是面向零基础职场人的轻量级静态图文课程站：长文章 + 图文混排、无登录无后端、纯浏览、适配知识星球分发。PRD 要求首屏 < 3s、单篇 < 1s、移动端单列可读、SEO/可检索、目录锚点导航、轻交互（折叠/复制/主题）且不引 JS 框架。需在「纯手写静态 / Astro 7 / VitePress / Next.js static export」间选型。

## 决策（Decision）

采用 **Astro 7**（版本 `^7.0.0`，当前最新 7.2），构建模式 `output: 'static'`（默认），内容以 Markdown 内容集合（`src/content/lessons/*.md`）管理。

## 理由（Arguments）

- 内容驱动架构最贴合「长文课程」：默认 server-first、零客户端 JS，首屏即完整静态 HTML，直接满足性能 P0。
- `Content Collections` + `render(entry).headings` 原生生成 TOC 与标题层级，目录锚点无需自研。
- Astro Assets 对图片自动优化、响应式 `srcset`、懒加载，图文混排体验优。
- 轻交互可用原生 `<details>/<summary>` + 极轻 `<script>` 渐进增强实现，契合「不引 JS 框架」。
- 静态产物可被 EdgeOne Pages / Vercel / GitHub Pages 一键托管，利于知识星球分发。
- 对比淘汰项：纯手写静态可维护性差（多文章重复模板）；VitePress 主题偏文档站、非 Vue 团队成本高；Next.js static export 引入 React 心智过重。

## 后果（Consequences）

- 正面：构建产物纯静态、可回滚、性能好、内容即 Markdown 易维护；天然 SEO 友好。
- 负面 / 约束：需遵守 Astro 7 的 markdown 处理器选择（见 ADR-004）；`astro-icon` 与 Astro 7 不兼容（见 ADR-002，改用 lucide-static）；团队需熟悉 Astro `.astro` 组件与内容集合约定。
- 风险缓解：锁定 `astro@^7` + lockfile；CI 以 `npm ci` 安装；上线前真机走查知识星球内置浏览器。
