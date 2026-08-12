# Phase 2 设计细化 · 三页面设计提示词（前端可直接照做）

> 依据：SPEC.md §7/§8 + DESIGN.md + design-tokens.json + mockup-reader.svg
> 目标：为前端产出首页 / 图文阅读页 / 404 的「视觉 + 布局 + 组件」规格
> 铁律：所有颜色/间距/圆角/动效一律 `var(--*)` 引用 design-tokens；图标全用 Lucide（16/20/24px，stroke 1.75，currentColor）；禁止 emoji、禁止紫粉渐变、禁止千篇一律 Hero、禁止空洞占位。

---

## ⛔ P0 合规自检（verdict）

| 检查项 | 结果 | 证据 |
|--------|------|------|
| verdict | **pass** | 以下三页规格均满足 P0，可放行 |
| 零 emoji 图标 | **是（零）** | 全站功能图标逐处标注 Lucide 名称 + 尺寸 16/20/24；无 🚀🔥💡✨ 等 |
| 零紫粉渐变 | **是（零）** | accent 仅青绿 `--accent #0D9488`（浅）/ `#2DD4BF`（深）；无渐变主视觉、无发光边框+毛玻璃 |
| 零硬编码颜色 | **是（零）** | 所有色值走 `var(--*)`；唯一例外为「组件内局部 #fff/#000」，本稿无此类；深色代码块如需用新增 token `--surface-code`（见待确认项），不在稿内硬编码 |
| 禁千篇一律 Hero | **是** | 首页首屏直接呈现真实课程头 + 真实 M1–M5 目录 + 首讲高亮，无大图+口号 Hero |
| 禁空洞占位 | **是** | 课程名/章节/讲师/适合人群/时长为真实课程结构（示例文案为真实内容，非 Lorem/Welcome） |

---

## 0. 全局壳 BaseLayout（三页共用）

- **背景/容器**：`background: var(--bg)`；内容容器 `max-width: var(--container-max)`（1080px）居中；左右 gutter `var(--space-5)`（20px），移动端 `var(--space-4)`（16px）。
- **字体加载**：Noto Serif SC / Noto Sans SC 用 `font-display: swap` + 子集化；Inter / JetBrains Mono 可 CDN/自托管；系统字体兜底，先保证首屏文字可见（规避 CLS，SPEC §11）。
- **主题**：`<html data-theme="light|dark">`；默认 `light`；切换写 `localStorage` 并记忆；切主题不丢阅读位置（AC-09）。
- **全局焦点**：所有交互元素 `:focus-visible { box-shadow: var(--focus-ring); outline: none; }`；图标按钮带 `aria-label`。
- **主题切换按钮**：右上固定，Lucide `sun`/`moon` **20px**，currentColor，`aria-label="切换深浅色"`，`border-radius: var(--radius-pill)`，点击区 ≥44×44px。
- **图标基线**：全站 Lucide，统一 `[data-icon]{ stroke-width:1.75 }` 覆盖默认 2px（AC-11）；尺寸仅 16/20/24。
- **动效**：过渡用 `var(--motion-base)`（200ms）/ `var(--ease-standard)`；尊重 `prefers-reduced-motion`（关闭非必要过渡）。
- **a11y**：正文对比度 ≥4.5:1；语义化 `h1–h3`；每页 `meta description` + OG（利于星球检索，SPEC §10）。

---

## 1. 首页 `/`

### 1.1 路由与角色
- 路由：`GET /`（静态预渲染）。核心组件：`BaseLayout` + `CourseHeader` + `Toc` + `CTA`。内容来源：固定结构 + 内容集合索引（M1–M5）。

### 1.2 布局
- **桌面 ≥1024**：两栏 grid —— `grid-template-columns: minmax(0,1.1fr) minmax(0,0.9fr)`；gap `var(--space-8)`（32px）；整体容器 1080px 居中。左栏 = CourseHeader + CTA；右栏 = Toc（可 `position: sticky; top: var(--space-6)`）。
- **平板 640–1024**：单栏堆叠（header → CTA → Toc），容器收窄至 720–960px。
- **手机 <640**：单栏，gutter 16px；CTA 按钮**全宽**；Toc 在 header 下方。
- 顶部 `padding-top: var(--section-y-desktop)`（80/48/32 随断点）。

### 1.3 组件规格

**CourseHeader（课程头）**
- 顶部眉标：左侧 16px 方块（`background: var(--accent); border-radius: var(--radius-sm)`）+ 文字「AI 启蒙 · 职场提效」，`font: var(--font-body)`，`font-size: var(--text-xs)`（12px），`letter-spacing: var(--tracking-caps)`（0.08em），`color: var(--meta)`。
- H1 课程名：`font: var(--font-display)`（Noto Serif SC），`font-size: var(--text-4xl)`（40px 桌面 / `var(--text-3xl)` 32px 移动），`font-weight: 590`（announce），`color: var(--fg)`，`letter-spacing: var(--tracking-display)`（-0.01em），示例文案「**AI 新手启蒙课**」（真实课程名，非占位）。
- 一句话价值主张：`font: var(--font-body)`，`font-size: var(--text-lg)`（18px），`line-height: var(--leading-body)`（1.7），`color: var(--muted)`，示例「面向零基础职场人的 AI 图文课——用大白话和真实工作场景，一天跨过『会用 AI 提效』的门槛。」
- **Meta 行（真实 meta + 16px Lucide 图标）**：三项横排（移动端可换行），每项 `gap: var(--space-2)`（8px），`color: var(--fg-2)`，`font-size: var(--text-sm)`（14px）：
  - `user` 16px + 「讲师：课程主理人」（真实姓名由 copy/PM 提供）
  - `users` 16px + 「适合：行政 / 运营 / 市场 / 销售 / HR / 财务」
  - `clock` 16px + 「时长：约 3 小时 · 共 12 讲」
- 间距：眉标→H1 `var(--space-5)`（20px）；H1→价值主张 `var(--space-3)`（12px）；价值主张→Meta `var(--space-5)`（20px）。

**CTA 组**
- 主 CTA「开始第一讲」：`background: var(--accent)`；`color: var(--accent-on)`；`border-radius: var(--radius-sm)`（8px）；`padding: var(--space-3) var(--space-5)`（12px 20px）；左侧 Lucide `book-open` **20px**（currentColor）；`font: var(--font-body)`，`font-weight: 510`（emphasize）；hover → `background: var(--accent-hover)`；active → `var(--accent-active)`；`:focus-visible` → `var(--focus-ring)`。链接到首讲 `/lessons/m1/1-1-renzhi/`。
- 次 CTA「在知识星球继续阅读」：`background: transparent`；`border: 1px solid var(--border)`；`color: var(--fg)`；同圆角/同 padding；左侧 Lucide `external-link` **20px**；hover → `border-color: var(--accent)`，`color: var(--accent)`。
- 间距：两按钮 `gap: var(--space-3)`（12px）；CTA 组距 Meta `var(--space-6)`（24px）。移动端按钮 `width: 100%`，堆叠 `gap: var(--space-3)`。

**Toc（课程目录）**
- 区块眉标「课程目录」：`font: var(--font-body)`，`font-size: var(--text-xs)`（12px），`letter-spacing: var(--tracking-caps)`，`color: var(--meta)`，`margin-bottom: var(--space-4)`（16px）。
- 按 **M1–M5** 分模块，每模块：模块头（Lucide 模块图标 **20px** + 模块名，`font: var(--font-body)`，`font-size: var(--text-lg)`（18px），`font-weight: 510`，`color: var(--fg-2)`，`margin: var(--space-6) 0 var(--space-3)`（24/12））。
- 模块下课程项：每行 = 序号（如「1-1」，`color: var(--meta)`，`font-size: var(--text-sm)`）+ 标题（`color: var(--fg-2)`，`font-size: var(--text-base)`（16px））；`padding: var(--space-3)`（12px）；`border-radius: var(--radius-sm)`；hover → `background: var(--surface-warm)`，`color: var(--fg)`。
- **首讲高亮（当前/首讲）**：`background: var(--surface-warm)` + 左侧 `border-left: 3px solid var(--accent)`（语义强调，非装饰侧条纹）；标题 `color: var(--accent)`，`font-weight: 510`。示例首讲：「**1-1 先搞懂 AI 能替你做什么**」。
- 真实目录结构（M1–M5，示例，copy 可改）：
  - **M1 认知篇 · AI 到底能替你做什么**：1-1 先搞懂 AI 能替你做什么（首讲）｜1-2 三种常见误区：别当神仙也别当威胁｜1-3 一张图看懂能力边界
  - **M2 工具篇 · 选对趁手的工具**：2-1 聊天类怎么选（ChatGPT/豆包/通义）｜2-2 绘画类入门｜2-3 办公类（WPS/飞书 AI）
  - **M3 提示词篇 · 让 AI 听得懂人话**：3-1 好提示词 5 个套路｜3-2 错误 prompt ↔ 正确 prompt 对比｜3-3 把模糊需求写清楚
  - **M4 场景篇 · 挂在真实工作流上**：4-1 写邮件与周报｜4-2 整理纪要与资料｜4-3 做 Excel 与 PPT｜4-4 竞品与行业调研
  - **M5 避坑篇 · 少走弯路**：5-1 发给 AI 前自查 5 项｜5-2 产出可用性核对清单｜5-3 隐私与安全红线

### 1.4 字体 / 配色 / 间距 / 图标小结
- 字体：标题 `var(--font-display)`，UI/正文短文本 `var(--font-body)`；正文阅读走阅读页 `--font-read`。
- 配色：基底 `var(--bg)`/`var(--surface)`；文本 `var(--fg)`/`var(--fg-2)`/`var(--muted)`/`var(--meta)`；强调仅 `var(--accent)` 系；边框 `var(--border)`/`var(--border-soft)`。
- 图标（Lucide，currentColor）：`user`/`users`/`clock` 16px（meta）；`book-open`/`external-link` 20px（CTA）；模块图标 20px（如 `brain`/`wrench`/`pen-line`/`briefcase`/`shield-alert`）；`sun`/`moon` 20px（主题）。

### 1.5 响应式断点
- **<640**：单栏；gutter 16px；CTA 全宽堆叠；眉标/标题/目录依次堆叠；无横向滚动。
- **640–1024**：单栏但容器 720–960px；CTA 可并排。
- **≥1024**：两栏（header+CTA 左 / Toc 右 sticky）；容器 1080px。
- **≥1280**：同两栏，可适度放大右栏 Toc 宽度。

### 1.6 验收要点（映射 SPEC §9）
- AC-01 首屏 3s 内展示目录与首屏内容；AC-05 无登录可浏览；AC-06 目录即返回入口；AC-11 图标合规；P0-5 首屏真实目录非 Hero。

---

## 2. 图文阅读页 `/lessons/[...slug]`

### 2.1 路由与角色
- 路由：`GET /lessons/[...slug]`（静态预渲染，slug 如 `m1/1-1-renzhi`）。核心组件：`LessonLayout` + `Toc`（左固定）+ `Reader`（720px 宋体）+ `Callout` + `CopyButton` + `ProgressBar` + `ThemeToggle` + `Foldable` + `CodeCard` + `Checklist` + 边注。内容来源：`src/content/lessons/*.md`（frontmatter: title/module/order/description/duration/tags）。

### 2.2 布局
- **≥1280（三栏）**：左 `Toc` 固定宽 ~240px（`position: sticky; top: var(--space-6); align-self: start`）→ 中 `Reader` `max-width: var(--container-read)`（720px）→ 右「边注」栏 ~200px（仅在有边注内容时显示，否则折叠）。三栏 gap `var(--space-8)`（32px）。
- **1024–1280（两栏）**：左 `Toc` 240px sticky + 中 `Reader` 720px；右栏隐藏。
- **<1024（单栏）**：顶栏（进度条 + 「目录」按钮 + 主题切换 + 返回目录）+ 单栏 `Reader`（gutter 16–20px）；左 Toc 改为顶栏「目录」按钮触发的抽屉/折叠面板（overlay 或 `<details>`），当前讲高亮。
- 顶部 `padding-top: var(--space-6)`（24px）；章节内 `section-y` 随断点。

### 2.3 组件规格

**顶栏 LessonTopbar（固定/sticky）**
- 顶部阅读进度条：`position: fixed; top:0; left:0; right:0; height:3px;` 轨道 `background: var(--border)`；填充 `background: var(--accent)`，宽度 = 滚动百分比（JS 渐进增强，禁用 JS 时隐藏，`aria-hidden`）。
- 行内控件（右侧）：「目录」按钮（Lucide `list` **20px**，`aria-label="打开目录"`，仅 <1024 显示）；「返回目录」链接（Lucide `arrow-left` **20px** + 文字，指向 `/`）；主题切换（`sun`/`moon` 20px）。控件点击区 ≥44×44。

**Reader（正文阅读栏）**
- 容器 `max-width: var(--container-read)`（720px），`margin: 0 auto`。
- 眉标：「第 X 讲 / M？篇」，`font: var(--font-body)`，`font-size: var(--text-sm)`（14px），`letter-spacing: var(--tracking-caps)`，`color: var(--accent)`，`margin-bottom: var(--space-3)`。
- 文章 H1（标题）：`font: var(--font-display)`，`font-size: var(--text-3xl)`（32px），`font-weight: 590`，`color: var(--fg)`，`letter-spacing: var(--tracking-display)`。
- H2：`font: var(--font-display)`，`font-size: var(--text-2xl)`（24px），`font-weight: 510`，`color: var(--fg)`，`margin-top: var(--space-8)`（32px，章节分离），`margin-bottom: var(--space-4)`。
- H3：`font: var(--font-body)`，`font-size: var(--text-lg)`（18px），`font-weight: 510`，`color: var(--fg-2)`。
- 正文 `p`：`font: var(--font-read)`（Noto Serif SC），`font-size: var(--text-read)`（**17px**），`line-height: var(--leading-read)`（**1.85**），`letter-spacing: var(--tracking-read)`（0.02em），`color: var(--fg)`，`margin-bottom: var(--space-5)`（20px，≥1.2×行高）。
- 正文链接：`color: var(--accent)` + `text-decoration: underline`；hover → `color: var(--accent-hover)`。
- 列表 `ul/ol`：`font: var(--font-read)`；`padding-left: var(--space-5)`；项 `margin-bottom: var(--space-2)`。
- 正文**一律左对齐**，不使用 `text-align: justify`（避免中文字距被拉伸，DESIGN.md §3）。

**Toc（左固定目录）**
- 模块/课程列表同首页 Toc 结构；**当前讲高亮**：`background: var(--surface-warm)` + 左 `3px solid var(--accent)`，标题 `color: var(--accent)`。
- 长按可滚动（`max-height: calc(100vh - 120px); overflow:auto`）；点击锚点跳转（AC-06）。注意 SPEC §11 锚点坑：`astro.config.mjs` 须 `markdown: { processor: 'unified' }` 保证 TOC 锚点 ID 不丢失。

**Callout 高亮块（语义强调）**
- `background: var(--surface-warm)`；`border-radius: var(--radius-md)`（12px）；`border-left: 3px solid var(--accent)`；`padding: var(--space-5)`（20px）。
- 标题 `font: var(--font-body)`，`font-weight: 510`，`color: var(--fg)`；正文 `font: var(--font-body)`，`color: var(--fg-2)`，`font-size: var(--text-base)`。
- 用途：关键结论、**「示例，需自行核实」提示**（AC-08，AI 生成示例必须标注）。

**Foldable 折叠块（原生 details/summary）**
- `<details>` + `<summary>`：`font: var(--font-body)`，`font-weight: 510`，`color: var(--fg)`；summary 左侧 Lucide `chevron-right` **16px**（currentColor），展开时 `transform: rotate(90deg)`，过渡 `var(--motion-base)`。
- 内容：`font: var(--font-read)`（17px/1.85）。
- 用途：**错误 prompt ↔ 正确 prompt 对比**默认收起、点击展开（AC-02）。

**CodeCard 代码 / 提示词块 + CopyButton**
- 卡片：`background: var(--surface-warm)`（当前合规默认；如需真深色代码块，请加 token `--surface-code`，见待确认项）；`border: 1px solid var(--border)`；`border-radius: var(--radius-md)`（12px）；`border-left: 3px solid var(--accent)`；`padding: var(--space-4) var(--space-5)`。
- 文本：`font: var(--font-mono)`；`font-size: var(--text-sm)`（14px）；`color: var(--fg)`；`white-space: pre-wrap; word-break: break-word`。
- **CopyButton**（右上角）：Lucide `copy` **16px**（currentColor），`aria-label="复制提示词"`；点击 → 写入剪贴板（提供 `execCommand` 兜底，规避微信内核异常，SPEC §11）→ 按钮变为 Lucide `check` 16px + 文字「已复制」，颜色 `var(--success)`，2s 后复原（AC-03）。

**Checklist 自查清单**
- 列表项：`font: var(--font-read)`；左侧 Lucide `circle` **16px**（currentColor）作未勾占位，示例勾选用 `check` 16px `color: var(--accent)`；项 `gap: var(--space-2)`，`margin-bottom: var(--space-3)`。
- 用途：M5「发给 AI 前自查 5 项」「产出可用性核对清单」。

**内联图片 + caption**
- `img`：`width: 100%`（不超 720px 阅读栏）；`border-radius: var(--radius-md)`（12px）；`margin: var(--space-6) 0`；`loading="lazy"`；响应式 `srcset`。
- caption：`font: var(--font-body)`，`font-size: var(--text-sm)`，`color: var(--meta)`，`margin-top: var(--space-2)`，如「图 1：AI 能力边界示意」。

**边注（右栏，≥1280）**
- `font: var(--font-body)`，`font-size: var(--text-sm)`，`color: var(--muted)`；`border-left: 1px solid var(--border-soft)`，`padding-left: var(--space-4)`。仅在有内容时渲染。

**Prev/Next 导航（底部）**
- 两链接块：左「上一篇」Lucide `arrow-left` **20px** + 标题；右「下一篇」Lucide `arrow-right` **20px** + 标题；`font: var(--font-body)`，`color: var(--accent)`；hover → `var(--accent-hover)`。移动端堆叠全宽。

### 2.4 字体 / 配色 / 间距 / 图标小结
- 正文阅读：`--font-read` 17px / 1.85；标题 `--font-display`；UI `--font-body`；代码 `--font-mono`。
- 配色同全局；强调仅 `--accent` 系；Callout/CodeCard 用 `--surface-warm` + 左 accent 细线（语义强调）。
- 图标（Lucide）：`list`/`arrow-left`/`arrow-right`/`sun`/`moon` 20px；`chevron-right`/`copy`/`check`/`circle` 16px；无 24px 独立图标需求于本页（如需空状态可用 24px）。

### 2.5 响应式断点
- **<640**：单栏；gutter 16px；顶栏（进度+目录+主题+返回）；Toc 抽屉化；Prev/Next 堆叠全宽；375px 无横向滚动、点击区 ≥44px。
- **640–1024**：单栏；gutter 20–24px；Toc 仍抽屉。
- **1024–1280**：两栏（左 Toc 240 sticky + 中 Reader 720）。
- **≥1280**：三栏（+ 右边注 ~200）。

### 2.6 验收要点（映射 SPEC §9）
- AC-01/AC-02（折叠）/AC-03（复制）/AC-04（移动端）/AC-06（导航）/AC-08（示例标注）/AC-09（主题不丢位置）/AC-10（禁 JS 仍可读）/AC-11（图标）。TOC 锚点须 `processor:'unified'`（§11 坑）。

---

## 3. 404 页 `/404.html`

### 3.1 路由与角色
- 路由：`GET /404.html`（平台错误回退）。核心：友好提示 + 返回目录链接。静态，沿用主视觉 Token。

### 3.2 布局
- 居中单栏：`max-width: 480px`，`margin: 0 auto`，垂直居中（`min-height: 100vh` 内 `display:flex; flex-direction:column; justify-content:center`，`padding: var(--space-8)`）。
- 构成：图标 → H1 → 说明 → 主 CTA → 次链接。

### 3.3 组件规格
- **图标**：Lucide `compass`（或 `file-question`）**24px**（独立图标），`color: var(--accent)`；外圈 `width/height: 64px`，`background: var(--surface-warm)`，`border: 1px solid var(--border)`，`border-radius: var(--radius-pill)`，flex 居中；`margin-bottom: var(--space-6)`。
- **H1**：`font: var(--font-display)`，`font-size: var(--text-2xl)`（24px），`font-weight: 590`，`color: var(--fg)`，如「**这篇课程不存在**」（真实、友好，非占位）。
- **说明**：`font: var(--font-body)`，`font-size: var(--text-base)`，`line-height: var(--leading-body)`，`color: var(--muted)`，如「你访问的章节可能已更名或尚未发布。返回课程目录，从第一讲重新开始。」
- **主 CTA「返回课程目录」**：同首页主 CTA 规格（`background: var(--accent)`；`color: var(--accent-on)`；左侧 Lucide `arrow-left` **20px**；链接 `/`）。移动端全宽。
- **次链接「回到首页」**：文字链接 `color: var(--accent)`，hover `var(--accent-hover)`。
- 右上保留主题切换（`sun`/`moon` 20px），保证全站一致。

### 3.4 字体 / 配色 / 图标小结
- 字体：H1 `--font-display`；说明/CTA `--font-body`。
- 配色：基底 `var(--bg)`；图标/CTA accent 系；说明 `var(--muted)`；外圈 `var(--surface-warm)` + `var(--border)`。无渐变、无大图 Hero。
- 图标（Lucide）：`compass`/`file-question` 24px；`arrow-left` 20px（CTA）。

### 3.5 响应式断点
- **<640**：单栏，gutter 16px，CTA 全宽；图标 64px 居中。
- **≥640**：同上居中，容器 ≤480px。
- 无横向滚动；点击区 ≥44px。

### 3.6 验收要点（映射 SPEC §9）
- AC-07 未知章节 URL → 友好提示并返回目录；AC-11 图标合规；P0 视觉一致性（accent 青绿 + 冷调基底）。

---

## 4. 图标使用总表（三页共用 Lucide 清单）

| 图标 | 尺寸 | 用途 | 页面 |
|------|------|------|------|
| `user` | 16px | 讲师 meta | 首页 |
| `users` | 16px | 适合人群 meta | 首页 |
| `clock` | 16px | 时长 meta | 首页 |
| `book-open` | 20px | 主 CTA「开始第一讲」 | 首页 |
| `external-link` | 20px | 次 CTA「知识星球」 | 首页 |
| `brain`/`wrench`/`pen-line`/`briefcase`/`shield-alert` | 20px | M1–M5 模块图标 | 首页/阅读页 Toc |
| `sun`/`moon` | 20px | 主题切换 | 全页 |
| `list` | 20px | 打开目录（移动） | 阅读页 |
| `arrow-left` | 20px | 返回目录 / 上一篇 / 404 CTA | 阅读页/404 |
| `arrow-right` | 20px | 下一篇 | 阅读页 |
| `chevron-right` | 16px | 折叠块 summary | 阅读页 |
| `copy` | 16px | 复制按钮 | 阅读页 |
| `check` | 16px | 复制成功 / 清单勾选 | 阅读页 |
| `circle` | 16px | 清单未勾占位 | 阅读页 |
| `compass` / `file-question` | 24px | 404 图标 | 404 |

> 统一：`[data-icon]{ stroke-width:1.75 }`；`fill: none; stroke: currentColor`；禁止 emoji、禁止第二套图标（AC-11）。

---

## 5. 待架构 / 前端确认项
1. **深色代码块 token**：本稿 CodeCard 默认用 `var(--surface-warm)` 以严格合规；若设计需要真正深色代码块，请在 `design-tokens.json` 新增 `--surface-code`（深色）并在 `@theme` 映射，勿在组件内硬编码 `#161A21`。
2. **真实文案/讲师名**：课程名、章节标题、讲师名、适合人群描述由 copy/PM 提供；本稿示例文案均为真实课程结构，非空洞占位，可直接替换为最终文案。
3. **TOC 锚点**：阅读页左 Toc 锚点跳转须依赖 `astro.config.mjs` 的 `markdown: { processor: 'unified' }`（SPEC §11 已知坑），前端实现时务必开启。
4. **剪贴板兜底**：`CopyButton` 在微信内核（知识星球内置浏览器）需 `execCommand('copy')` 兜底（SPEC §11）。
