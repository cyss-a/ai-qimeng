# AI 新手启蒙课程 · 技术架构文档

- 版本：v1.0（MVP 范围）
- 日期：2026-08-11
- 作者：高见远（首席架构师）
- 项目：面向职场提效人群的「AI 新手启蒙课程」轻量级静态图文课程站
- 形态：长文章 + 图文混排，无登录、无后端、纯浏览；适配「知识星球」分发

> 本文件是给执行者的契约（规格即契约）：点名文件/接口、锁定版本、写明不做的事、内嵌已知坑、以端到端验证步骤收尾。架构规范遵循专家包 `references/01-standards/code-organization.md` 与 `references/architecture/mvp-stack.md`。

---

## 1. 结论速览（Verdict）

- **verdict：PASS（技术可行，按本 Spec 执行）**
- **选型结论**：Astro 7（静态生成，`output: 'static'`）+ Tailwind CSS v4（token 驱动）+ Lucide（锁定 SVG 图标库，经 `lucide-static` 锚定）+ EdgeOne Pages（静态托管）。
- **不可行警告**：无硬性不可行项。存在 3 个需主动规避的陷阱（见 §11）：
  1. Astro 7 默认 markdown 解析器（Sätteri）会丢弃 remark/rehype 插件，导致标题锚点 ID / TOC 失效 → 必须显式 `markdown.processor: 'unified'`。
  2. `astro-icon@1.1.5` 的 peer 依赖为 `astro@^4`，与 Astro 7 冲突 → 不使用 astro-icon，改用 `lucide-static` 提交原始 SVG。
  3. 知识星球内置浏览器对 `backdrop-filter` / `position: sticky` / 剪贴板需真机验证，且不支持整段 HTML 高保真粘贴 → 见 §10。

---

## 2. 技术选型对比矩阵（至少 3 方案）

维度说明：构建复杂度（越低越好）、长文图文混排体验、SEO/分享友好度、部署便利性、维护成本（越低越好）。

| 方案 | 构建复杂度 | 长文图文混排体验 | SEO/分享 | 部署便利 | 维护成本 | 综合 |
|------|-----------|------------------|----------|----------|----------|------|
| A. 纯静态 HTML/CSS/JS（手写） | 低（但内容多时高） | 一般（重复结构靠复制粘贴，易漂移） | 好（手写语义化） | 好（任意静态空间） | 高（每篇新文章重复模板/导航） | ★★☆☆☆ |
| B. **Astro 7（静态生成）** | 低（内容集合 + 组件） | **优**（Markdown 内容集合 + MDX + 原生 TOC） | **优**（默认静态 HTML + meta） | **优**（EdgeOne/Vercel/GH Pages 一键） | **低**（内容即 Markdown，导航自动生成） | ★★★★★ |
| C. VitePress 1.6.4 | 低 | 良（文档向，主题偏"文档站"） | 优 | 优 | 低 | ★★★★☆ |
| D. Next.js 14 static export | 中（框架重） | 良（需自行做内容体系） | 优 | 良（需配置 export） | 中（React 心智负担，对纯图文过重） | ★★★☆☆ |

### 逐项评估

- **方案 A（纯手写静态）**：零构建依赖，但 M1–M5 共约 20–25 篇长文，每篇都要手写导航/TOC/页脚/copy 脚本，结构极易漂移、可维护性差。不符合 MVP「低维护边际成本」假设。淘汰。
- **方案 B（Astro 7）**：内容驱动型框架，默认零 JS、输出纯静态 HTML；`Content Collections` + `getHeadings()` 原生生成 TOC 与锚点；`output: 'static'` 天然适配知识星球分发；支持 MDX 在文中嵌入组件（copy 按钮、callout）；Tailwind v4 通过 `@tailwindcss/vite` 原生集成；构建产物即为可部署静态文件。最契合「阅读优先 + 轻交互 + 零后端」。
- **方案 C（VitePress）**：Vue 驱动的文档站，稳定版 1.6.4（2025-08），2.0 仍在 alpha；侧边栏需手动配置，主题偏"API 文档"，与本产品「编辑感 / 纸质阅读」基调不符；非 Vue 团队学习成本高。可用但不如 Astro 贴合"课程长文"场景。备选。
- **方案 D（Next.js static export）**：需引入 React 运行时心智与构建配置，对纯图文静态站过重；SSG 导出需额外 `output: 'export'` 配置；优势（SSR/ISR）在本项目用不上。淘汰。

---

## 3. 最终选型与理由

**选定：Astro 7（静态生成）。**

理由（对齐 PRD 与 DESIGN 约束）：
1. **阅读优先**：默认 server-first、零客户端 JS，首屏即完整静态 HTML，首屏 < 3s、单篇 < 1s 可达（PRD 非功能 P0）。
2. **长文图文混排**：Markdown 内容集合 + 图片资源处理（Astro Assets 自动优化、响应式 `srcset`、懒加载）开箱即用。
3. **目录锚点 / 章节导航**：`render(entry).headings` 原生返回标题层级，TOC 侧栏无需额外插件；标题锚点 ID 经 ADR-004 配置后稳定可用。
4. **轻交互零框架**：原生 `<details>/<summary>` 折叠、极轻量 `<script>`（复制、主题、进度条）即满足 PRD「不引 JS 框架」承诺。
5. **SEO/分享**：每页语义化 `h1–h3` + 可配置 `meta description` / OG，利于知识星球链接预览与站外收录（PRD SEO P1）。
6. **部署便利**：构建产物为纯静态目录，EdgeOne Pages / Vercel / GitHub Pages 均一键接入。

---

## 4. 版本锚定技术栈（依赖清单）

> 所有版本经联网核验（2026-08-11），按实际版本写 API，避免幻觉。锁定于 `package.json` + `package-lock.json`，CI 安装以 lockfile 为准。

| 包 | 版本（锁定） | 角色 | 锚定依据 |
|----|--------------|------|----------|
| `astro` | `^7.0.0`（当前最新 7.2） | 静态站点生成框架 | astro.build 官方，2026-08 最新 7.2；Rust 编译器 + Vite 8；`output: 'static'` 为默认 |
| `@tailwindcss/vite` | `^4.0.0` | Tailwind v4 Vite 插件 | Tailwind v4 官方，Astro 文档推荐（`astro >= 5.2` 用此插件） |
| `tailwindcss` | `^4.0.0` | 工具类 CSS 框架 | 同上；`@theme` 映射 design-tokens |
| `lucide-static` | `^1.25.0` | **锁定 SVG 图标库（Lucide 原始 SVG 源）** | npm latest `1.25.0`（2026-07），ISC 许可；提供 `icons/*.svg` 原始文件 |
| `typescript` | `^5.x` | 类型（组件 props） | 可选，代码组织规范推荐 |
| `Node.js` | `22 LTS` | 运行/构建时 | Astro 7 + Vite 8 需 Node 20.3+，锁 22 |

**明确不引入**（规避陷阱）：
- `astro-icon@1.1.5`：peer 依赖 `astro@^4`，与 Astro 7 冲突。改用 `lucide-static` + 提交原始 SVG（见 §5）。
- `@astrojs/mdx`：MVP 非必需；轻交互用原生 `<details>` + 全局渐进增强脚本即可，无需在 Markdown 内嵌组件。如后续需在文中嵌组件，再评估 MDX 并验证 Astro 7 peer 兼容。
- 任何前端框架（React/Vue/Svelte）：PRD 明令「不引 JS 框架」。

---

## 5. 锁定的 SVG 图标库（P0 铁律）

依据 DESIGN.md §9 与 `design-tokens.json` `icon.*`，本项目图标库已锁定为 **Lucide**。本架构将其落为可版本化的依赖与渲染机制。

- **库名称**：Lucide（描边型、24px 网格、统一 2px 描边、语义明确、currentColor 着色）。
- **交付机制（Astro 7 安全）**：
  1. `lucide-static@^1.25.0` 作为 devDependency，提供 `node_modules/lucide-static/icons/*.svg` 原始文件。
  2. 初始化脚本（或一次性复制）将**精选图标子集**提交至仓库 `src/icons/*.svg`，使图标随 git 版本化、彻底锁定（不再依赖运行时拉取）。
  3. `src/components/Icon.astro` 用 `import.meta.glob('../icons/*.svg', { query: '?raw', eager: true })` 建立 `name → svg 字符串` 映射，渲染内联 `<svg>`，**构建期完成、零运行时 JS、仅打包用到的图标（tree-shake）**。
- **尺寸规范（锁定，对应 design-tokens）**：
  - `16px`：行内 / 列表标记（`--icon-size-inline`）
  - `20px`：按钮内图标（`--icon-size-button`）
  - `24px`：独立图标 / 空状态 / 章节标记（`--icon-size-standalone`）
  - 由 `Icon.astro` 的 `size` prop 映射到 token 尺寸类；不允许多套尺寸混用。
- **描边规范**：Lucide 默认 `stroke-width: 2`，按 design-tokens 覆盖为 **`stroke-width: 1.75`**，通过 CSS `[data-icon] { stroke-width: 1.75; stroke: currentColor; fill: none }` 统一。
- **禁用**：emoji 作为功能图标；混用第二套图标库（如同时引 Tabler/Heroicons）。全站仅 Lucide。
- **精选子集示例**（按 PRD 交互所需，约 20–30 个）：`book-open`、`list`、`chevron-right`、`chevron-down`、`arrow-right`、`arrow-left`、`copy`、`check`、`sun`、`moon`、`search`、`external-link`、`alert-triangle`、`info`、`lightbulb`、`file-text`、`message-square`、`table`、`clipboard-check`、`menu`、`x`、`bookmark`。具体以 `src/icons/` 实际提交为准。

---

## 6. 分层架构

本项目无后端，分层集中于「表现层 / 内容层 / 样式层 / 构建部署层」，依赖只向下，单文件 ≤ 300 行（遵循 `references/01-standards/code-organization.md`）。

```
构建部署层  astro build → dist/（纯静态 HTML/CSS/JS）→ EdgeOne Pages
    ↑
样式层      design-tokens.json → CSS 变量 + Tailwind v4 @theme（token 驱动，禁止硬编码）
    ↑
内容层      src/content/lessons/*.md（Markdown 内容集合，frontmatter 元数据）
    ↑
表现层      src/layouts/*.astro（BaseLayout / LessonLayout）
           src/components/*.astro（Icon / Toc / CopyButton / Callout / ProgressBar / ThemeToggle）
           src/pages/*.astro（index / lessons/[...slug]）
```

- 页面（`.astro`）只做组装，不堆业务逻辑；交互逻辑下沉到小组件 + 全局 `<script>`（渐进增强，事件委托）。
- 每个组件单一职责、单一导出；超限即拆文件。
- 样式一律走 token（`var(--*)`），组件内仅允许局部 `#fff`/`#000`。

---

## 7. 页面 / 路由清单

| 路由 | 文件 | 说明 |
|------|------|------|
| `/` | `src/pages/index.astro` | 课程头（课程名 + 一句话价值 + meta）+ 真实课程目录（章节列表，首讲高亮）+ 主 CTA「开始第一讲」+ 次 CTA「在知识星球继续阅读」 |
| `/lessons/[...slug]` | `src/pages/lessons/[...slug].astro` | 单篇图文课（M1–M5）。slug 形如 `m1/1-1-renzhi`。左固定目录 + 中 720px 阅读栏 + 右可选边注；移动端：顶部进度条 + 折叠目录 + 单列 |
| `/404.html` | `public/404.html` | 友好 404（访问不存在章节 URL 时引导回目录）；托管平台回退页 |

- 内容来源：`src/content/lessons/*.md` 内容集合，约 20–25 篇（M1–M5，M6/M7 为第二期/Backlog）。
- 内容集合 schema（frontmatter）：`title`、`module`（M1–M5）、`order`、`description`（meta description 源）、`duration`、`tags`。
- 构建输出：`build.format: 'directory'`（Astro 默认）→ `/lessons/m1/1-1-renzhi/index.html`，托管以干净 URL `/lessons/m1/1-1-renzhi/` 提供。

---

## 8. 静态资源与路由策略（替代 API 端点清单）

**本项目无后端 API、无服务端端点。** 所有交互均为客户端渐进增强，无网络请求（除可选隐私友好分析）。因此不产出 `openapi.yaml`（无服务器契约可定义）；以下以「静态路由 + 资源契约」替代：

- **静态资源产出（dist/）**：
  - `index.html`、`lessons/**/index.html`：预渲染静态页。
  - `_astro/*.css`：合并后的 token + Tailwind 样式（哈希命名，长期缓存）。
  - `_astro/*.js`：极小渐进增强脚本（主题/复制/进度条/目录抽屉），`type=module`、defer。
  - `_astro/*.webp|avif|jpg`：经 Astro Assets 优化的图片，含 `srcset` 与懒加载。
  - `icons`（内联于 HTML，不单独请求）：Lucide SVG 已内联。
- **路由解析（静态托管）**：
  - 干净 URL：`/lessons/m1/1-1-renzhi/` → 对应目录 `index.html`。
  - `trailingSlash: 'ignore'`（默认），避免 `/lessons/.../` 与 `/lessons/...` 双索引。
  - SPA 回退：不需要（全静态）；未知路径 → `404.html`。
- **跨页导航**：全量静态跳转（Astro 默认，无客户端路由库）；如需丝滑切换可选 View Transitions（MVP 不做）。
- **可选分析**：Umami / Plausible 轻量脚本，仅匿名 PV（获客/激活/留存/转化），不含 IP 与用户输入（PRD §9.1）。

---

## 9. 数据库表清单

**无。** 纯静态、无用户体系、无后端、无数据持久化。所有内容以 Markdown 文件形式版本化于仓库（等同于「内容即数据」）。MVP 不做搜索/提交/账号，故无表、无 ORM、无迁移。

---

## 10. 部署方案

### 主选：腾讯云 EdgeOne Pages（静态托管）
- 产品真实存在（edgeone.cloud.tencent.com），公测免费、全球 CDN、国内可达（利于知识星球用户）。
- **接入**：Git 仓库（GitHub）授权 → 选择仓库 → 构建命令 `npm run build`、输出目录 `dist/` → 每次 push `main` 自动构建部署。
- **自定义域名 + 备案**：可选；默认提供 `*.edgeone.app` 预览域名。
- **404**：EdgeOne Pages 错误页指向 `/404.html`。

### 可回滚策略（纯静态天然可回滚）
- EdgeOne Pages 保留每次部署历史 → 控制台一键回滚到上一版本构建（秒级、不可变产物）。
- Git 维度回滚：revert 对应 commit 并重新推送即重新部署旧内容。
- 因产物不可变、无数据库，回滚即「重新托管旧静态文件」，无数据迁移风险。

### 环境变量 / 配置（仅构建期，无密钥）
| 变量 | 用途 | 敏感度 |
|------|------|--------|
| `NODE_VERSION=22` | 构建运行时版本 | 无 |
| `SITE_URL` | canonical / OG 绝对地址 | 无 |
| `ANALYTICS_ID` | Umami/Plausible 站点 ID（可选） | 无 |
- 无任何密钥/密码（无后端、无 API 调用、无用户数据）。

### 备选：GitHub Pages
- `actions/deploy-pages` 构建 `dist/` → `gh-pages` 分支；回滚 = 重新部署历史 commit。作为 EdgeOne 不可用时的兜底。

---

## 11. 可行性验证（核心功能逐项）

| 功能 | 可行性 | 结论 / 陷阱 |
|------|--------|-------------|
| 图文混排长文章 | 可行 | Astro Markdown 内容集合 + Astro Assets 图片优化，输出纯静态 HTML。无坑。 |
| 章节导航 / 目录锚点 | 可行 | `render(entry).headings` 原生 TOC；标题锚点需 ADR-004（`processor: 'unified'`）保稳定。 |
| 响应式（移动端单列） | 可行 | Tailwind 响应式 + design-tokens 断点（<640/640–1024/1024+）；知识星球内置浏览器需真机验证。 |
| 可复制进知识星球 | 部分陷阱 | 站点为阅读载体，由知识星球外链/嵌入引流；知识星球编辑器**不支持整段 HTML 高保真粘贴**，重排版会丢失样式。应对：提供「复制为 Markdown/纯文本」导出（Backlog）+ 模板卡复制按钮（MVP）。 |
| 复制模板（剪贴板） | 可行 | `navigator.clipboard.writeText` 需 HTTPS 安全上下文；知识星球内打开为 HTTPS，满足；提供 `document.execCommand` 兜底。 |
| 深色模式 | 可行 | `localStorage` + `[data-theme]` 切换，极轻脚本，不丢阅读位置。 |
| 折叠交互（对比/示例） | 可行 | 原生 `<details>/<summary>`，零 JS；仅做样式美化。 |
| SEO / 分享预览 | 可行 | 每页 `meta description` + OG，静态 HTML 利于收录与链接卡片。 |

---

## 12. 已知坑预警（内嵌硬约束）

1. **[高] Astro 7 默认 markdown 解析器（Sätteri）丢弃 remark/rehype 插件** → 标题锚点 ID 与依赖 rehype 的 TOC 插件会静默失效。修复：在 `astro.config.mjs` 显式 `markdown: { processor: 'unified' }`（见 ADR-004）。
2. **[高] `astro-icon@1.1.5` peer 为 `astro@^4`，与 Astro 7 不兼容** → 不使用 astro-icon；改用 `lucide-static` + 提交 `src/icons/*.svg`（见 §5）。
3. **[中] 中文 Web 字体体积大（Noto Serif SC / Noto Sans SC）** → 用 `font-display: swap` + 子集化，先以系统字体兜底避免 CLS；首屏文字立即可见（design-tokens 已规定 swap）。
4. **[中] 知识星球内置浏览器兼容性** → `backdrop-filter`、`position: sticky` 行为可能异常；`clipboard` 需 HTTPS。上线前真机（iOS/Android 微信内核）走查。
5. **[中] Lucide 默认描边 2px，design-tokens 要求 1.75** → 通过 CSS `[data-icon]{stroke-width:1.75}` 统一覆盖，勿在每处手动改。
6. **[低] Astro 7 移除 `@astrojs/db` 托管 SQLite** → 本项目无 DB，无影响；勿引入该能力。
7. **[低] 静态托管无服务端 404 重写** → 必须提供 `public/404.html` 并在平台配置错误页。
8. **[低] 极简 JS 的「静默缺失」** → 复制/主题脚本虽小，仍需在构建后真机点测，避免运行时报错（参照生成式代码失效模式：静默缺失 import / 未处理 Promise）。

---

## 13. 端到端验证步骤（收尾即验收）

1. **安装与构建**：`npm ci`（lockfile 安装，`astro@7`、`tailwindcss@4`、`lucide-static@1.25.0`）→ `npm run build` → 断言 `dist/` 生成、无报错、产物含 `lessons/**/index.html`。
2. **本地预览**：`npm run preview`（或 `astro preview`）→ 浏览器开 `http://localhost:4321/`。
3. **核心成功流**：首页可见课程目录与首讲高亮 → 点「开始第一讲」进入 `/lessons/m1/1-1-...` → 左目录 TOC 可点击跳转锚点 → 正文宋体 17px、行高 1.85、栏宽 720px → 点模板卡「复制」按钮，剪贴板得到文本且出现「已复制」反馈 → 切深色模式不丢阅读位置。
4. **关键错误/边界流**：访问不存在 URL（如 `/lessons/m9/xx`）→ 显示 `404.html` 并引导回目录；窄屏（375px）下单列可读、无横向滚动、点击区 ≥ 44px；禁用 JS 后文章仍完整可读（渐进增强成立）。
5. **图标校验**：全站功能图标均为内联 Lucide SVG（检查 DOM 无 emoji、无第二套图标）；尺寸仅 16/20/24；描边 1.75。
6. **部署校验**：推 `main` → EdgeOne Pages 自动部署成功 → 预览域名可访问、HTTPS、移动端真机可读。
7. **回滚校验**：在 EdgeOne Pages 控制台一键回滚上一版本 → 旧内容恢复、无异常。

---

## 14. 明确不做（Out-of-Scope，防范围蔓延）

对齐 PRD §7，架构层不设计/不引入：
- 无后端、无 API、无数据库、无用户系统、无登录/付费墙。
- 不接入任何大模型 API（站点只教用户使用外部工具）。
- 不引前端框架（React/Vue/Svelte）；交互仅原生 HTML + 极轻脚本。
- 不做站内搜索、作业提交、视频课程、移动 App/小程序、多语言、实时更新。
- 不产出 `openapi.yaml`（无服务端契约）；不引入服务端渲染/ISR（纯静态 `output: 'static'`）。

---

## 15. 关联 ADR

- ADR-001：采用 Astro 7 作为静态站点生成器
- ADR-002：锁定 Lucide 为 SVG 图标库（经 lucide-static 锚定）
- ADR-003：采用 EdgeOne Pages 为主静态托管（GitHub Pages 兜底）
- ADR-004：Markdown 处理器锁定 unified（保住标题锚点 / TOC）
