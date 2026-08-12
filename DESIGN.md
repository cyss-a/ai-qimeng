# AI 新手启蒙课程 · 设计规范（DESIGN.md）

> 产品：面向职场提效人群的「AI 新手启蒙课程」轻量级静态图文课程站
> 形态：长文章 + 图文混排，无登录纯浏览；内容结构适配「知识星球」上架分发
> 寄存器：阅读优先的产品型（Product Register）为主、课程落地展示为辅的混合寄存器
> 设计基调：克制 · 专业 · 易读优先 · 切忌花哨

---

## 1. Visual Theme & Atmosphere

- 视觉主题关键词（5 个）：**克制（restrained）、编辑感（editorial）、可读（legible）、冷静（calm）、可信（trustworthy）**
- 氛围描述：以「安静的纸质阅读空间」为隐喻——大量留白、清晰的信息层级、单色基底 + 单一青绿强调色。用户进入后第一感受是「这篇能安心读完」，而非「又被营销轰炸」。动效与色彩都服务于阅读本身，不做装饰性表达。
- 氛围反面（明确禁止）：紫色→粉色渐变主视觉、奶油米色默认背景、emoji 图标、千篇一律的「大图 + 居中口号」Hero。

---

## 2. Color Palette & Roles

四层 Token 架构（A1-identity / A2 / B-slot / C-extension）。所有颜色必须走 Token，禁止硬编码（唯一例外组件内局部 `#fff`/`#000`）。

**A1-identity（品牌核心，不可省略）**
- 浅色：`--bg #FBFBFD` `--surface #FFFFFF` `--fg #1A1C20` `--muted #6B6E76` `--accent #0D9488` `--border #E6E8EC`
- 深色：`--bg #0E1116` `--surface #161A21` `--fg #E6E9EF` `--muted #8A909C` `--accent #2DD4BF` `--border #262C35`

**A2（有默认值，语义色）**
- `--accent-on #FFFFFF`（亮色）/ `#06231F`（暗色，亮青绿底用深字）
- `--accent-hover #0F766E` `--accent-active #115E59`
- `--success #16A34A` `--warn #D97706` `--danger #DC2626`

**B-slot（品牌别名）**
- `--surface-warm #F3F5F7`（浅）/ `#1E232B`（深）：高亮块/引用块背景
- `--fg-2 #3A3D44` `--meta #9A9DA4` `--border-soft #F0F1F4`

**每屏强调色使用 ≤2 处**：accent 只用于（1）主 CTA 按钮 /（2）当前阅读进度与章节高亮 /（3）正文内必要链接强调。其余一律中性色。这遵循 Stripe/Linear「单色基底 + 一个强调色」原则，克制本身即高级感。

**明暗双主题**：默认浅色（阅读友好、降低屏幕眩光）；提供深色主题（GitHub Dark 级别，适配夜间阅读与开发者偏好）。切换不丢失阅读位置。

---

## 3. Typography Rules

**字体栈（中西文搭配，避免 AI 模板全 sans 套路）**
- `--font-display`：`"Noto Serif SC", "Source Serif 4", Georgia, serif` — 标题、引文，编辑感
- `--font-body`：`"Noto Sans SC", "Inter", system-ui, sans-serif` — UI 框架、导航、标签、说明
- `--font-read`：`"Noto Serif SC", "Noto Sans SC", Georgia, serif` — **长文正文专用**（宋体提升中文长文阅读舒适度，得到/微信读书范式）
- `--font-mono`：`"JetBrains Mono", "Fira Code", monospace` — 代码 / AI 提示词块

**字号层级（8 级 + 1 个长文专用）**：xs 12 / sm 14 / base 16（UI 基准）/ **read 17（长文正文）** / lg 18 / xl 20 / 2xl 24 / 3xl 32 / 4xl 40。正文基准 16px，长文正文 17px（不低于 14px，遵循 Refactoring UI / 语雀可读性结论）。

**字距规则**
- 标题（≥32px）：`-0.01em` 负字距
- ALL CAPS 拉丁标签：`0.08em`
- 中文正文：`0.02em` 微开字距，提升可读性
- 正文小字（12-14px）：`0.01em`

**字重系统（三级）**：read 400（正文）/ emphasize 510（小标题、强调）/ announce 590（大标题、CTA）。

**行高**：UI 文本 1.7；**长文正文 1.85**（中文行高须高于西文 1.5，语雀/Refactoring UI 结论）；标题 1.2。

**阅读舒适度硬指标**
- 正文每行 **38–42 个汉字**（内容栏宽 `--container-read` 720px 约束）
- 段间距充裕（≥ 1.2 倍行高）；章节标题上方加大 `margin-top`（增强章节区分，语雀结论）
- 长文本一律**左对齐**，不使用两端对齐（避免中文字间距被强行拉伸）
- 链接：正文内必要链接用 accent + 下划线（hover）；文章列表/目录中的可点击项不强行染色，用加粗/更深色或 hover 表达

---

## 4. Component Stylings

**按钮**
- Primary：`background var(--accent)` / `color var(--accent-on)` / `radius var(--radius-sm)` / padding 10px 16px；hover `--accent-hover`，active `--accent-active`，全部带 `--focus-ring`
- Secondary：透明 + 1px `var(--border)` / 文字 `var(--fg)`；hover 边框转 `var(--accent)`
- Ghost：极淡背景 `rgba(...)` / 文字 `var(--fg)`
- 内联图标统一 20px（按钮内）

**卡片 / 高亮块（Callout）**
- 基础卡：`background var(--surface)` + 1px `var(--border)` + `radius var(--radius-md)`；**默认无阴影**，仅 hover/raised 场景用 `--elev-raised`
- 高亮块：`background var(--surface-warm)` + 左侧 3px `var(--accent)` 细线（**允许**作为语义强调，非装饰侧条纹）或顶部细线；用于关键结论/提醒
- 折叠块（Details/Summary）：默认折叠，用于可深读的 FAQ / 延伸阅读，降低长文压迫感（语雀范式）

**输入框 / 搜索**
- 背景 `var(--surface)` + 1px `var(--border)`；focus 显示 `--focus-ring`（精心设计，非浏览器默认）；带验证状态（error 用 `--danger`）

**代码 / 提示词块**
- 暗色 `var(--surface-warm)` 或更深 surface + `var(--font-mono)` + 右上角「复制」按钮（图标 16px）；这是 AI 课程的高频组件

**目录 / 导航**
- 章节列表：当前章节用 `var(--accent)` 文字 + 左侧细指示条；其余 `var(--muted)`
- 顶部阅读进度条：accent 细条，随滚动填充

---

## 5. Layout Principles

- 栅格：桌面 12 列 / 平板 8 列 / 手机 4 列；整体容器 `--container-max` 1080px；**长文阅读栏 `--container-read` 720px 居中**
- 节区节奏：桌面 80px / 平板 48px / 手机 32px
- **首屏（P0 硬规则，禁止千篇一律 Hero）**：不放大图 + 居中口号。改为「紧凑课程头（课程名 + 一句话价值主张 + 讲师/适合人群/时长 meta）+ 真实课程目录（章节列表，当前/首讲高亮）+ 主 CTA『开始第一讲』+ 次 CTA『在知识星球继续阅读』」直接呈现真实内容。
- 阅读布局：左固定侧栏（章节目录，当前讲高亮、可滚动）+ 中阅读栏（720px 宋体正文、图文混排、高亮块、代码块）+ 右可选边注；移动端：顶部进度条 + 抽屉式/折叠目录 + 单列。
- 图文混排：图片内联于内容栏宽，带 caption；不与文字争抢，保持安静。

---

## 6. Depth & Elevation

- 三级层级：`--elev-flat`(none) / `--elev-ring`(1px 边框环) / `--elev-raised`(模糊阴影)
- 浅色模式主要靠「1px 边框 + 留白」表达层级，**不依赖重阴影**（避免幽灵卡片：边框 + 大模糊阴影同时出现）
- 深色模式通过**亮度递进**表达层级（`#0E1116 → #161A21 → #1E232B`），而非阴影
- 卡片圆角上限 12–16px（`--radius-md/lg`），禁止 ≥24px 过度圆滑（AI 模板味）

---

## 7. Do's and Don'ts

✅ 允许
- 单色基底 + 单一青绿强调，每屏 ≤2 处 accent
- 宋体长文正文（阅读舒适度优先）
- 真实课程目录/内容直接进首屏
- 精心设计的 focus ring、hover、loading、empty、error 全状态
- 章节标题上方加大留白以区分

❌ 禁止（AI 模板 7 大罪 + 本项目红线）
- 紫色→粉色渐变主视觉（三位一体：渐变+发光边框+毛玻璃）
- emoji 作为功能图标（锁定 Lucide）
- 默认 `#6366f1` 靛蓝强调（一眼 AI）；奶油米色默认背景
- 圆角卡片 + 彩色左边框（装饰性侧条纹）；渐变文字
- 千篇一律 Hero（大图 + 空洞口号 + 抽象 3D）
- 虚构指标（"10,000+ 用户"）；填充式文案（"Welcome to"/"Elevate"）
- 纯硬编码颜色；正文 <14px；长文两端对齐；卡片同时 1px 边框 + ≥16px 模糊阴影

---

## 8. Responsive Behavior

- 断点：手机 <640 / 平板 640–1024 / 桌面 1024–1280 / 大屏 >1280
- **移动优先**：绝大多数「知识星球」用户在手机端阅读，首屏与正文必须在 375px 宽下单列可读、无需放大
- 触摸目标 ≥44×44px；按钮间距 ≥8px
- 导航：桌面左侧栏目录；移动端顶部进度条 + 折叠/抽屉目录
- 图片：响应式 `srcset` + 懒加载 + 低质量占位
- 支持 `prefers-reduced-motion`：关闭非必要动效

---

## 9. Agent Prompt Guide（给前端 / 架构师）

- **图标库必须对齐**：本项目锁定 **Lucide**（描边型、24px 网格、currentColor），尺寸 16/20/24px，stroke 1.75，全站仅 Lucide、不混用。架构师选型若变更需回 `design-tokens.json` 同步改 `icon.library`。
- **图标渲染管线（与架构 §5 对齐）**：库仍是 Lucide，仅渲染管线变更——用 `lucide-static`（devDependency）提供原始 SVG，精选子集提交到 `src/icons/*.svg`，由 `src/components/Icon.astro` 内联渲染；**禁止使用 `astro-icon` 等会引入第二套图标库或与 Astro 7 冲突（astro-icon@1.1.5 peer 为 astro@^4）的方案**。`stroke-width:1.75` 由全局 CSS `[data-icon]{stroke-width:1.75}` 统一覆盖 Lucide 默认 2px，前端勿在每处手动改。
- **Token 驱动**：CSS 变量从 `design-tokens.json` 生成（light/dark 两套）；组件内只允许 `#fff`/`#000` 局部，其余一律 `var(--*)`。无 `design-tokens.json` 不放行。
- **字体加载**：Noto Serif SC / Noto Sans SC 用 `font-display: swap` 分轴加载（中文体积大，优先保证首屏文字可见）；Inter / JetBrains Mono 可 CDN/自托管。
- **明暗主题**：`[data-theme="light|dark"]` 切换；默认浅色；记忆用户选择（localStorage）。
- **阅读体验是验收核心**：验收时以「能否安心读完一篇长文」为标准——检查行宽、行高、章节留白、目录可用、代码块复制、移动端单列。
- **a11y 必查**：对比度正文 ≥4.5:1；所有交互元素 `--focus-ring` + 键盘可达；图标按钮带 `aria-label`；不支持仅颜色传达状态。
