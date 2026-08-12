# Spec - AI新手启蒙课程 v1.0

> 生成日期：2026-08-11
> 基于：PRD v1.0（许清楚）+ 架构文档 v1.0（高见远）+ UIUX 文档 v1.0（颜好看）
> 状态：已确认（用户于 Phase 1 确认三文档，本 Spec 据此自动生成）
> 关联文档：
> - `PRD_AI新手启蒙课程.md`
> - `DESIGN.md` / `design-tokens.json` / `mockup-reader.svg`
> - `docs/architecture/ARCHITECTURE.md`
> - `docs/decisions/ADR-001-ssg-stack.md` / `ADR-002-icon-library.md` / `ADR-003-deployment.md` / `ADR-004-markdown-pipeline.md`

---

## 1. 产品定义
- **一句话描述**：一套面向零基础职场人的 AI 启蒙图文课，用大白话和真实工作场景，帮你在一天内跨过"会用 AI 提效"的门槛。
- **目标用户**：25–45 岁职场白领 / 事务型岗位（行政、运营、市场、销售、HR、财务、教师、公务员），AI 零基础到"会用 AI 聊聊天"但未融入工作流。
- **核心问题**：职场人不缺 AI 资料，缺"低门槛 + 场景化 + 体系化"的启蒙路径——不知道输入什么指令、不知道什么场景该用 AI、资料碎片化难坚持。

## 2. MVP 范围（锁定——不在此列表的功能一律不做）

| 优先级 | 功能 / 内容 | 验收标准摘要 | 来源 |
|--------|-------------|-------------|------|
| P0 | 体系化图文课程 M1–M5（约 20–25 篇长文+图文混排） | 完整"认知→工具→提示词→场景→避坑"路径，零基础一天跑通 | PRD §5/§6 |
| P0 | 课程导航 / 目录锚点（章节目录 + TOC + 相邻章节跳转） | 任意章节可返回目录与相邻章节 | PRD §6/架构 §7 |
| P0 | 提示词模板库（可一键复制） | 复制按钮将模板写入剪贴板并给"已复制"反馈 | PRD §6/§8 |
| P0 | 场景化实操案例（写作/纪要/Excel/PPT/调研） | 每个技巧挂在真实工作流上 | PRD §5.3 M4 |
| P0 | 可展开对比 / 示例（原生折叠交互） | 错误 prompt ↔ 正确 prompt 对比默认收起、点击展开 | PRD §5.4 |
| P0 | 避坑自查清单（Checklist） | 如"发给 AI 前自查 5 项""产出可用性核对清单" | PRD §6 |
| P0 | 明暗双主题（localStorage 记忆，默认浅色） | 切换不丢阅读位置 | 设计 DESIGN.md |
| P0 | 知识星球适配（移动端优先、SEO 可检索、真实 CTA） | 内置浏览器可读、无横向滚动、点击区 ≥44px | PRD §1/§8 |

## 3. 明确不做（Out-of-Scope — 锁定）

| 不做的功能 | 原因 | 何时考虑 |
|------------|------|----------|
| 视频课程 | 坚持图文静态定位，视频制作重、与低边际成本假设冲突 | 不纳入 MVP |
| 社群 / 答疑 / 直播 / 打卡 | 纯浏览内容，互动由知识星球承载 | 不纳入 MVP |
| 登录 / 注册 / 账号 / 付费墙 | 无后端、无用户体系，降低合规风险；付费由星球承担 | 不纳入 MVP |
| AI 工具集成 / API 调用 | 站点只教用户使用外部工具，不接入大模型 | 不纳入 MVP |
| 作业提交与批改 | MVP 聚焦"看懂能用" | 不纳入 MVP |
| 站内搜索 | 星球后台可覆盖；静态搜索成本高 | Backlog |
| 移动 App / 小程序 | H5 静态站 + 星球内置浏览器适配即可 | 不纳入 MVP |
| 多语言 / 海外本地化 | 首发聚焦中文职场人群 | 不纳入 MVP |
| PDF 导出 / 打印优化 | 轻量，优先级低 | Backlog |
| 智能体模块 M6 / 进阶 M7 | 第二期内容 | v2.0 |

## 4. 技术架构（锁定 — 含版本锚定）

| 层 | 技术 | 实际版本 | 锁定原因 |
|----|------|----------|----------|
| 静态生成 | Astro | ^7.0.0（最新 7.2） | 内容驱动、默认零客户端 JS、纯静态输出（ADR-001） |
| 样式 | Tailwind CSS v4 | ^4.0.0 | `@theme` 映射 design-tokens，token 驱动（ADR-001） |
| Tailwind 集成 | @tailwindcss/vite | ^4.0.0 | Astro + Tailwind v4 官方集成方式 |
| 图标 | lucide-static | ^1.25.0 | 锁定 Lucide 原始 SVG 源，提交 `src/icons/*.svg` 版本化（ADR-002） |
| 构建运行 | Node.js | 22 LTS | Astro 7 + Vite 8 需 Node 20.3+ |
| 类型（可选） | TypeScript | ^5.x | 组件 props 类型 |
| 部署 | 腾讯云 EdgeOne Pages | - | 静态托管、国内可达、CDN、可回滚（ADR-003） |
| 部署兜底 | GitHub Pages | - | EdgeOne 不可用时的兜底（ADR-003） |
| 分析（可选） | Umami / Plausible | - | 仅匿名 PV，不含 IP 与用户输入（PRD §9.1） |

**明确不引入**：`astro-icon@1.1.5`（peer 为 astro@^4，与 v7 冲突，改 lucide-static）、`@astrojs/mdx`（MVP 非必需）、任何前端框架（React/Vue/Svelte）、`@astrojs/db`（无 DB）。

## 5. API 端点清单（锁定——本项目无后端，以静态路由契约替代）

本项目**无后端、无服务端 API、无数据库**。所有交互为客户端渐进增强，无网络请求（除可选分析）。故不产出 `openapi.yaml`。静态路由契约如下：

| Method | Path | 功能 | 认证 | 说明 |
|--------|------|------|------|------|
| GET | `/` | 课程首页（课程头 + 真实目录 + CTA） | 无 | 静态预渲染 |
| GET | `/lessons/[...slug]/` | 单篇图文课（M1–M5） | 无 | 静态预渲染，`slug` 如 `m1/1-1-renzhi` |
| GET | `/404.html` | 友好 404（未知章节 URL 引导回目录） | 无 | 托管平台错误回退页 |

路由解析：`build.format: 'directory'`（默认）→ 干净 URL `/lessons/m1/1-1-renzhi/`；`trailingSlash: 'ignore'`；未知路径 → `404.html`。

## 6. 数据库表清单（锁定）

**无。** 纯静态、无用户体系、无后端、无数据持久化。内容以 Markdown 文件（`src/content/lessons/*.md`）版本化于仓库，等同于"内容即数据"。无表、无 ORM、无迁移。

## 7. 页面清单（锁定）

| 页面 | 路由 | 核心组件 | 内容来源 | 设计 Token 主题 |
|------|------|----------|----------|-----------------|
| 课程首页 | `/` | BaseLayout + CourseHeader + Toc（目录）+ CTA | 固定结构 + 内容集合索引 | light（默认）/ dark |
| 图文阅读页 | `/lessons/[...slug]` | LessonLayout + Toc（左固定）+ Reader（720px 宋体正文）+ Callout + CopyButton + ProgressBar + ThemeToggle | `src/content/lessons/*.md`（frontmatter: title/module/order/description/duration/tags） | light（默认）/ dark |
| 404 页 | `/404.html` | 友好提示 + 返回目录链接 | 静态 | light（默认）/ dark |

内容集合 schema（frontmatter）：`title`、`module`（M1–M5）、`order`、`description`（meta description 源）、`duration`、`tags`。
MVP 内容规模：M1–M5 共约 20–25 篇（M6/M7 为第二期/Backlog）。

## 8. 设计 Token（锁定）

> 设计师已产出机器可读 Token 文件 `design-tokens.json`（遵循 W3C Design Tokens 社区格式，light/dark 两套），前端通过构建生成 CSS 变量 `var(--*)` 引用。**所有颜色/间距/圆角/动效必须走 Token，禁止硬编码（唯一例外组件内局部 #fff/#000）。**

- **基底**：近白冷调 `--bg #FBFBFD`（浅）/ `#0E1116`（深）；`--surface #FFFFFF`/`#161A21`
- **唯一强调色**：青绿 Teal `--accent #0D9488`（浅）/ `#2DD4BF`（深）——克制、可信、成长感；**非紫粉渐变、非默认靛蓝 #6366f1**
- **语义色**：`--success #16A34A` / `--warn #D97706` / `--danger #DC2626`
- **字体**：
  - 正文（长文）：`--font-read` Noto Serif SC，17px / 行高 1.85（中文须高于西文）
  - UI：Noto Sans SC / Inter，16px 基准
  - 代码/提示词块：JetBrains Mono
- **图标库（P0-1 锁定）**：**Lucide**，尺寸仅 16px（行内）/ 20px（按钮）/ 24px（独立），stroke 1.75，currentColor；**全站禁止 emoji 图标、禁止混用第二套**
- **阅读栏宽**：720px（约 38–42 汉字/行）；容器最大 1080px
- **对标品牌**：语雀（阅读舒适）+ Linear/Stripe（克制单色）+ 得到/少数派（知识调性）
- **首屏铁律（P0-5）**：禁止千篇一律 Hero 大图+口号；首屏直接呈现真实课程目录 + 首讲高亮 + 真实 meta（讲师/适合人群/时长）

## 9. 验收标准（锁定——QA 测试时以此为唯一依据，EARS 格式）

| 编号 | 功能 | EARS 格式验收标准 | 优先级 |
|------|------|-------------------|--------|
| AC-01 | 可访问性 | When 用户打开课程站首页，系统**必须**在 3 秒内展示课程目录与首屏内容 | P0 |
| AC-02 | 内容呈现 | Where 用户阅读课程文章，系统**必须**支持示例对比的"展开/收起"折叠交互 | P0 |
| AC-03 | 模板复制 | When 用户点击提示词模板的复制按钮，系统**必须**将该模板文本复制到剪贴板并给出"已复制"反馈 | P0 |
| AC-04 | 移动端适配 | While 用户在知识星球内置浏览器（移动端）访问，系统**必须**保持图文可读、无横向滚动、点击区域不小于 44×44 像素 | P0 |
| AC-05 | 无登录浏览 | Where 用户未登录、未付费，系统**必须**仍可浏览全部课程内容 | P0 |
| AC-06 | 导航 | Where 用户处于任意章节，系统**必须**提供返回目录与相邻章节的跳转入口 | P0 |
| AC-07 | 错误处理 | If 用户访问不存在的章节 URL，then 系统**必须**展示友好提示并返回课程目录 | P0 |
| AC-08 | 内容可信 | Where 文章包含 AI 生成内容示例，系统**必须**标注"示例，需自行核实"提示 | P0 |
| AC-09 | 主题切换 | When 用户切换明暗主题，系统**必须**记忆选择且不丢失当前阅读位置 | P0 |
| AC-10 | 渐进增强 | If 用户禁用 JavaScript，系统**仍必须**完整呈现文章内容（交互降级而非内容缺失） | P0 |
| AC-11 | 图标合规 | Where 系统渲染任何功能图标，系统**必须**使用内联 Lucide SVG（无 emoji、无第二套图标）、尺寸仅 16/20/24、stroke 1.75 | P0 |
| AC-12 | 内容质量 | Where 文章发布前，系统**应**经过至少一次"零基础读者试读"校验，确认无术语黑话、无空话占位 | P1 |

## 10. 边界与约束
- 不支持 IE 浏览器；兼容知识星球内置浏览器（iOS/Android 微信内核）、Chrome/Safari 最新 2 版
- 响应式断点：640 / 1024 / 1280；触摸目标 ≥44×44px；支持 `prefers-reduced-motion`
- 性能目标：首屏 < 3s（静态 CDN）、单篇图文打开 < 1s
- 安全：纯静态无后端、无用户数据收集；外链统一 `rel="noopener"`；不内置任何表单提交
- a11y：正文对比度 ≥4.5:1；交互元素 `--focus-ring` + 键盘可达；图标按钮带 `aria-label`；不仅靠颜色传达状态
- SEO：语义化 `h1–h3`、每篇 `meta description` + OG，利于星球内检索与站外收录

## 11. 内嵌已知坑（从架构文档拉取，开发时强制规避）

| 坑 | 技术栈指纹 | 根因 | 修法 |
|----|------------|------|------|
| 标题锚点/TOC 静默失效 | astro@7 | Astro 7 默认解析器 Sätteri 丢弃 remark/rehype 插件，锚点 ID 静默丢失 | `astro.config.mjs` 显式 `markdown: { processor: 'unified' }`（ADR-004） |
| astro-icon 与 v7 冲突 | astro-icon@1.1.5 | peer 依赖 astro@^4，与 Astro 7 不兼容 | 改用 `lucide-static` + 提交 `src/icons/*.svg`（ADR-002） |
| 中文字体体积大导致 CLS | noto-serif-sc / noto-sans-sc | 中文字体子集大，首屏阻塞 | `font-display: swap` + 子集化，系统字体兜底，先保证首屏文字可见 |
| 知识星球内置浏览器兼容异常 | 微信内核 | `backdrop-filter`/`position:sticky`/剪贴板行为可能异常 | 上线前 iOS/Android 真机走查；剪贴板提供 `execCommand` 兜底 |
| Lucide 描边 2px 与 Token 1.75 不符 | lucide-static | Lucide 默认 stroke-width 2 | CSS 统一 `[data-icon]{stroke-width:1.75}` 覆盖，勿逐处改 |
| 静态托管无服务端 404 重写 | edgeone-pages / gh-pages | 纯静态无路由重写 | 必须提供 `public/404.html` 并在平台配置错误页 |
| 极简 JS 静默缺失 | 原生 script | 复制/主题脚本小但可能运行时报错 | 构建后真机点测，参照生成式代码失效模式（静默缺失 import / 未处理 Promise） |

## 12. 端到端验证步骤（Spec 锁定的最后一项）

```bash
# 1. 安装与构建（lockfile 为准）
npm ci   # astro@7 / tailwindcss@4 / lucide-static@1.25.0 / node 22
npm run build
# 断言：dist/ 生成、无报错、产物含 lessons/**/index.html

# 2. 本地预览
npm run preview   # http://localhost:4321/

# 3. 核心成功流
# 首页可见课程目录与首讲高亮 → 点"开始第一讲"进入 /lessons/m1/1-1-...
# 左目录 TOC 可点击跳转锚点 → 正文宋体 17px、行高 1.85、栏宽 720px
# 点模板卡"复制"按钮 → 剪贴板得到文本且出现"已复制"反馈
# 切深色模式不丢阅读位置

# 4. 关键错误/边界流
curl -I http://localhost:4321/lessons/m9/xx   # 断言：返回 404 并指向 404.html 引导回目录
# 窄屏 375px：单列可读、无横向滚动、点击区 ≥44px
# 禁用 JS：文章仍完整可读（渐进增强成立）

# 5. 图标校验
# 全站功能图标均为内联 Lucide SVG（DOM 无 emoji、无第二套图标）；尺寸仅 16/20/24；stroke 1.75

# 6. 部署校验
git push main → EdgeOne Pages 自动部署 → 预览域名 HTTPS 可访问、移动端真机可读
# 回滚校验：EdgeOne 控制台一键回滚上一版本 → 旧内容恢复无异常
```

## 13. 变更记录
| 日期 | 变更内容 | 原因 | 影响范围 |
|------|----------|------|----------|
| 2026-08-11 | 初始 Spec v1.0 生成 | 用户确认 PRD/架构/设计三文档 | 全范围基准锁定 |
