# AI 新手启蒙课程 · 架构细化文档（Phase 2）

- 版本：v1.0（MVP 范围）
- 日期：2026-08-11
- 作者：高见远（首席架构师）
- 上游契约：`SPEC.md`（§5/§7/§11）、`DESIGN.md` §9、`design-tokens.json`、`docs/architecture/ARCHITECTURE.md`、`docs/decisions/ADR-002 / ADR-004`
- 本文定位：把架构层的图标、组件、构建配置、坑检查点落到「前端可直接照抄」的精度。

> P0 铁律重申：全站功能图标仅 Lucide，禁止 emoji、禁止引入第二套图标库；本文件及所有配置注释禁止出现 emoji。

---

## 1. 锁定 Lucide 图标子集清单（28 个，已校验存在）

**校验方式**：`npm pack lucide-static@1.25.0` → 解包 `icons/*.svg`，确认下列 28 个文件名**全部存在**（lucide-static@1.25.0 共含 1997 个图标；本子集为其约 1.4%，构建期 tree-shake 仅打包用到的）。

**命名说明**：team-lead 示例中的旧式名（`alert-triangle` / `message-square` / `file-text` / `clipboard-check`）在 1.25.0 中**仍然有效**（该版本同时保留旧名与新别名 `circle-alert` / `circle-check`）。故子集直接采用旧式名，无需改名；但前端只允许引用下表内的 28 个，禁止随手引包内其他图标（否则破坏「锁定子集」语义）。

尺寸依据 `design-tokens.json`：`size-inline=16px`（行内/列表标记）、`size-button=20px`（按钮内）、`size-standalone=24px`（独立/空状态/章节标记）。下表「默认尺寸」为推荐值，`<Icon size>` 可局部覆盖。

| # | 图标名（Lucide） | 默认尺寸 | 用途 / 页面 / 组件 | 备注 |
|---|------------------|----------|--------------------|------|
| 1 | `book-open` | 24 | 课程标识 / 模块标记（首页 CourseHeader 左、阅读页模块标） | 全站唯一「课程 logo」语义 |
| 2 | `graduation-cap` | 24 | M1–M5 模块图标（目录模块分组标） | 与 book-open 区分层级 |
| 3 | `list` | 20 | 目录区标题图标（首页 Toc / 阅读页左固定 Toc） | 作 bullet 时降为 16 |
| 4 | `bookmark` | 16 | 当前阅读章节指示（Toc 当前项左标） | 仅高亮项显示 |
| 5 | `chevron-right` | 20 | 目录子项展开指示 / 相邻章节「下一讲」 | 交互态 |
| 6 | `chevron-down` | 20 | 折叠块（`<details>/<summary>`）展开箭头 / 移动端目录抽屉 | 交互态 |
| 7 | `chevron-up` | 20 | 返回顶部（配合 ProgressBar） | 滚动后出现 |
| 8 | `arrow-right` | 20 | 「开始第一讲」主 CTA 内箭头 / 「下一讲」 | 交互态 |
| 9 | `arrow-left` | 20 | 「返回目录」/「上一讲」 | 交互态 |
| 10 | `corner-down-right` | 20 | 章节下一级跳转指示 | 目录嵌套用 |
| 11 | `copy` | 16 | CopyButton 默认态（代码/提示词块右上角） | DESIGN §4 规定 16px |
| 12 | `check` | 16 | CopyButton 成功态「已复制」反馈 | 与 copy 同上下文 |
| 13 | `circle-check` | 16 | 避坑自查清单（Checklist）已完成项勾选 | 区别于 check 的实心圆底 |
| 14 | `clipboard-check` | 24 | Checklist 区块标题图标 | 独立语义 |
| 15 | `sun` | 20 | ThemeToggle 浅色态 | 按钮内 |
| 16 | `moon` | 20 | ThemeToggle 深色态 | 按钮内 |
| 17 | `menu` | 20 | 移动端目录抽屉开关（顶部汉堡） | 仅 <1024 显示 |
| 18 | `x` | 20 | 移动端目录抽屉关闭 / 404 关闭 | 交互态 |
| 19 | `external-link` | 20 | 「在知识星球继续阅读」次 CTA / 正文外链标记 | 正文内联时用 16 |
| 20 | `info` | 24 | Callout 提示型（说明/注释） | 独立语义 |
| 21 | `alert-triangle` | 24 | Callout 警告型（避坑/风险） | 独立语义 |
| 22 | `lightbulb` | 24 | Callout 技巧型（「小技巧」高亮块） | 独立语义 |
| 23 | `file-text` | 16 | 文章/章节标记（Toc 条目类型、课程资料） | 行内 |
| 24 | `message-square` | 16 | AI 对话示例块标题标记 | 行内 |
| 25 | `table` | 16 | 表格示例标记（M4 场景化案例常含表） | 行内 |
| 26 | `link` | 16 | TOC 项 hover 锚点复制 / 原文链接 | 行内 |
| 27 | `user` | 16 | 适合人群 / 讲师 meta（首页课程头） | 行内 |
| 28 | `clock` | 16 | 章节时长 meta（frontmatter `duration`） | 行内 |

**明确不进 `src/icons/` 提交的图标**（防范畴蔓延）：
- `search`：lucide-static 中存在，但 SPEC §3 将「站内搜索」列为 Backlog，MVP 不渲染搜索框，故不提交；v2 需要时再补。
- 其余 1969 个包内图标：一律不引用。任何组件如需新图标，先提 PR 扩充本表（并同步 `scripts/sync-icons.mjs` 的 `ICONS` 数组），禁止直接 `import` 包内 `*.svg`。

---

## 2. Icon.astro 组件规格（可照抄）

### 2.1 文件位置与职责
- 路径：`src/components/Icon.astro`
- 职责：把 `src/icons/*.svg` 原始 Lucide SVG 内联渲染为 `<svg>`；构建期完成、零运行时 JS、仅打包用到的图标（tree-shake）；统一 stroke 1.75 + currentColor；缺失图标 fail-fast 阻断构建。
- 单文件 ≤ 300 行（代码组织规范）。

### 2.2 图标源加载机制
```js
// 构建期把 src/icons/*.svg 以原始字符串 eager 收集为 map：name -> svg 源码
const icons = import.meta.glob('../icons/*.svg', {
  query: '?raw',
  eager: true,
}) as Record<string, { default: string }>;
```
- 键形如 `'../icons/book-open.svg'`，取 `name` 时拼 `'../icons/' + name + '.svg'`。
- `eager: true` → 静态导入，构建期求值；页面预渲染时即内联，无客户端请求、无运行时依赖。

### 2.3 组件完整实现
```astro
---
// src/components/Icon.astro
// 锁定子集内联渲染：仅 Lucide、构建期内联、零运行时 JS、stroke 1.75 由全局 CSS 覆盖
const icons = import.meta.glob('../icons/*.svg', {
  query: '?raw',
  eager: true,
}) as Record<string, { default: string }>;

// 尺寸 → design-tokens 尺寸类（16/20/24 三档，禁止其他值）
const SIZE_CLASS: Record<number, string> = {
  16: 'icon--16', // var(--icon-size-inline)
  20: 'icon--20', // var(--icon-size-button)
  24: 'icon--24', // var(--icon-size-standalone)
};
type IconSize = keyof typeof SIZE_CLASS;

interface Props {
  name: string;            // 必须：仅允许 §1 锁定子集内的 28 个名
  size?: IconSize;         // 默认 20（按钮内）
  class?: string;          // 附加类（如动画/旋转）
  label?: string;          // 提供 → 可访问图标按钮（role=img + aria-label）；缺省 → 装饰（aria-hidden）
}

const { name, size = 20, class: className, label } = Astro.props;

// fail-fast：缺失图标在 astro build 阶段抛错，阻断构建（静默错拼会破坏 P0 图标合规）
const key = `../icons/${name}.svg`;
if (!(key in icons)) {
  throw new Error(
    `[Icon] 未知图标 "${name}"。请确认 src/icons/${name}.svg 已提交（仅限 ARCHITECTURE-DETAIL §1 锁定子集）。`
  );
}
const inner = (icons[key].default as string).replace(/<svg[^>]*>([\s\S]*?)<\/svg>/, '$1');
const sizeClass = SIZE_CLASS[size];
const a11y = label
  ? { role: 'img', 'aria-label': label }
  : { 'aria-hidden': 'true' };
---
<svg
  data-icon
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  class:list={['icon', sizeClass, className]}
  {...a11y}
  set:html={inner}
></svg>
```

### 2.4 配套全局 CSS（stroke 1.75 + 尺寸类）
```css
/* src/styles/global.css（经 @tailwindcss/vite 注入，或 BaseLayout 引入） */
/* 统一覆盖 Lucide 默认 stroke-width:2 → design-tokens icon.stroke:1.75 */
[data-icon] {
  stroke-width: 1.75;
  stroke: currentColor;
  fill: none;
  flex: none;            /* 防止在 flex 容器中被拉伸 */
  display: inline-block;
  vertical-align: middle;
}
.icon--16 { width: var(--icon-size-inline);     height: var(--icon-size-inline); }
.icon--20 { width: var(--icon-size-button);     height: var(--icon-size-button); }
.icon--24 { width: var(--icon-size-standalone); height: var(--icon-size-standalone); }
```
- **禁止**：在任意 `.astro` 内手动写 `stroke-width` 覆盖（统一由 `[data-icon]` 管控，见 SPEC §11 坑#5）。

### 2.5 使用范式
```astro
<!-- 装饰性（无 label → aria-hidden，屏幕阅读器跳过） -->
<Icon name="book-open" size={24} />

<!-- 交互性图标按钮（有 label → 可访问） -->
<button id="theme-toggle" aria-label="切换深色模式">
  <Icon name="moon" size={20} label="切换深色模式" />
</button>

<!-- 复制按钮（成功态切换 name） -->
<button id="copy-prompt"><Icon name="copy" size={16} label="复制提示词" /></button>
```

### 2.6 子集同步脚本（保证仅锁定图标入库 + 二次 fail-fast）
```js
// scripts/sync-icons.mjs — 从 lucide-static 拉取锁定子集到 src/icons/
import { copyFile, mkdir } from 'node:fs/promises';

// 与 §1 锁定子集保持一致；改子集必须同步此处 + 提 PR
const ICONS = [
  'book-open','graduation-cap','list','bookmark','chevron-right','chevron-down',
  'chevron-up','arrow-right','arrow-left','corner-down-right','copy','check',
  'circle-check','clipboard-check','sun','moon','menu','x','external-link',
  'info','alert-triangle','lightbulb','file-text','message-square','table',
  'link','user','clock',
];

const SRC = 'node_modules/lucide-static/icons/';
const DEST = 'src/icons/';

await mkdir(DEST, { recursive: true });
for (const n of ICONS) {
  // 若 lucide-static 无此名 → copyFile 抛 ENOENT → 同步即失败（提前 fail-fast）
  await copyFile(`${SRC}${n}.svg`, `${DEST}${n}.svg`);
}
console.log(`[sync-icons] 已同步 ${ICONS.length} 个 Lucide 图标到 src/icons/`);
```
`package.json` 脚本：
```json
{
  "scripts": {
    "sync:icons": "node scripts/sync-icons.mjs",
    "prebuild": "npm run sync:icons",
    "build": "astro build",
    "preview": "astro preview",
    "dev": "astro dev"
  }
}
```
- `prebuild` 自动同步，确保 `src/icons/` 与锁定子集一致；CI 以 lockfile 安装 `lucide-static@^1.25.0`，版本漂移会被 lockfile 拦住。

---

## 3. astro.config.mjs 关键配置清单（可照抄）

### 3.1 主配置
```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // ADR-001：纯静态输出，无服务端、无 API、无 DB
  output: 'static',

  // ADR-004：锁定 unified 解析器，保住 Markdown 标题锚点 ID / TOC
  // 根因：Astro 7 默认解析器 Sätteri（Rust）会静默丢弃 remark/rehype 插件，
  //       导致 heading id 与依赖 rehype 的 TOC 插件失效（SPEC §11 坑#1）。
  markdown: {
    processor: 'unified',
  },

  // 干净 URL：/lessons/m1/1-1-renzhi/ → dist/lessons/m1/1-1-renzhi/index.html
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },

  // Tailwind v4 官方集成（@tailwindcss/vite 插件，非 PostCSS 配置）
  vite: {
    plugins: [tailwindcss()],
  },

  // 可选分析（仅匿名 PV，不含 IP 与用户输入，PRD §9.1）
  // 经环境变量注入，无密钥：SITE_URL / ANALYTICS_ID
});
```

### 3.2 Tailwind v4 `@theme` 映射 design-tokens
```css
/* src/styles/tokens.css — design-tokens.json → Tailwind v4 @theme */
@import "tailwindcss";

/* 深色主题以 [data-theme="dark"] 为作用域（DESIGN §9 明暗切换机制） */
@custom-variant dark (&:where([data-theme=dark] *));

@theme {
  /* 颜色（A1 / A2）— 浅色基准；深色由 [data-theme=dark] 覆盖变量 */
  --color-bg: #FBFBFD;
  --color-surface: #FFFFFF;
  --color-surface-warm: #F3F5F7;
  --color-fg: #1A1C20;
  --color-fg-2: #3A3D44;
  --color-muted: #6B6E76;
  --color-meta: #9A9DA4;
  --color-border: #E6E8EC;
  --color-border-soft: #F0F1F4;
  --color-accent: #0D9488;
  --color-accent-on: #FFFFFF;
  --color-accent-hover: #0F766E;
  --color-accent-active: #115E59;
  --color-success: #16A34A;
  --color-warn: #D97706;
  --color-danger: #DC2626;

  /* 字体（design-tokens.font） */
  --font-display: "Noto Serif SC", "Source Serif 4", Georgia, serif;
  --font-body: "Noto Sans SC", "Inter", system-ui, sans-serif;
  --font-read: "Noto Serif SC", "Noto Sans SC", Georgia, serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;

  /* 字号（长文专用 read=17px） */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-read: 17px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 32px;
  --text-4xl: 40px;

  /* 行高（中文正文 1.85） */
  --leading-body: 1.7;
  --leading-read: 1.85;
  --leading-tight: 1.2;

  /* 圆角 */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 9999px;

  /* 间距 / 阴影 / 聚焦环（节选自 design-tokens） */
  --spacing-1: 4px; --spacing-2: 8px; --spacing-3: 12px; --spacing-4: 16px;
  --spacing-5: 20px; --spacing-6: 24px; --spacing-8: 32px; --spacing-10: 40px;
  --shadow-ring: 0 0 0 1px var(--color-border);
  --shadow-raised: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06);
  --focus-ring: 0 0 0 3px rgba(13,148,136,0.30);

  /* 布局（阅读栏 720px / 容器 1080px） */
  --spacing-read: 720px;
  --spacing-container: 1080px;

  /* 图标尺寸 token（Icon.astro 使用，见 §2.4） */
  --icon-size-inline: 16px;
  --icon-size-button: 20px;
  --icon-size-standalone: 24px;
}
```
- 深色调色板（`--color-*` 在 `[data-theme="dark"]` 下重定义为 design-tokens.dark 值）写入 `global.css` 的 `[data-theme="dark"] { --color-bg:#0E1116; ... }` 块，不在 `@theme` 内重复（避免生成双套工具类）。
- 强调色仅 `#0D9488`（浅）/ `#2DD4BF`（深），**非 `#6366f1`、非紫粉渐变**（DESIGN §7 红线）。

### 3.3 依赖清单（package.json，重申锁定）
```json
{
  "devDependencies": {
    "astro": "^7.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "lucide-static": "^1.25.0",
    "typescript": "^5.0.0"
  }
}
```
**明确不引入**：`astro-icon`（peer `astro@^4` 与 v7 冲突，ADR-002）、`@astrojs/mdx`（MVP 非必需）、任何前端框架（React/Vue/Svelte）、`@astrojs/db`（无 DB）。Node.js 运行时锁 22 LTS（EdgeOne/GitHub Actions 通过 `NODE_VERSION=22` 环境变量）。

---

## 4. 已知坑在脚手架中的落地检查点（对应 SPEC §11）

| # | SPEC §11 坑 | 脚手架落地检查点 | 验收动作 |
|---|-------------|------------------|----------|
| 1 | 标题锚点/TOC 静默失效（Sätteri 丢插件） | `astro.config.mjs` 显式 `markdown.processor:'unified'`（§3.1）；TOC 由 `render(entry).headings` 生成，标题 `id` 经 unified + rehype-slug 稳定输出 | 构建后 `grep -o 'id="[^"]+"' dist/lessons/*/index.html` 确认 h2/h3 有锚点；点击 TOC 能跳转 |
| 2 | astro-icon 与 v7 冲突 | 依赖不含 `astro-icon`；图标走 `lucide-static` + `src/icons/` + `Icon.astro`（§1/§2）；CI lockfile 拦住误装 | `package.json` 无 astro-icon；`src/components` 无 astro-icon 引用 |
| 3 | 中文字体体积大致 CLS | `@font-face` 对 Noto Serif SC / Noto Sans SC 设 `font-display: swap` + 子集化；系统字体兜底（`Georgia`/`system-ui`）保证首屏文字立即可见（DESIGN §9） | Lighthouse CLS < 0.1；首屏无 FOIT 白屏 |
| 4 | 知识星球内置浏览器兼容异常 | 不依赖 `backdrop-filter`/`position:sticky` 实现核心功能（ProgressBar 用 scroll 监听 + 顶部 fixed 条，移动端目录用 `<details>` 抽屉而非 sticky 侧栏）；剪贴板提供 `execCommand` 兜底 | iOS/Android 微信内核真机走查：无横向滚动、点击区 ≥44px、复制可用 |
| 5 | Lucide stroke 2px ≠ token 1.75 | 全局 CSS `[data-icon]{stroke-width:1.75}`（§2.4）；`Icon.astro` 统一加 `data-icon`；任何处不得手动改 stroke-width | 浏览器检查任意 Lucide SVG 计算样式 `stroke-width:1.75` |
| 6 | 静态托管无服务端 404 重写 | 提供 `public/404.html`（友好提示 + 返回目录链接）；EdgeOne Pages / GitHub Pages 配置错误页指向它 | `curl -I` 不存在 URL → 返回 404 且内容来自 404.html |
| 7 | 极简 JS 静默缺失（复制/主题脚本） | CopyButton：`if (navigator.clipboard?.writeText) { await writeText() } else { execCommand('copy') }` 包 try/catch；ThemeToggle：`document.addEventListener('DOMContentLoaded', ...)` 内绑定，切换写 `localStorage` 不丢阅读位置；所有 `<script>` 用事件委托、无未被 import 的符号 | 构建后真机点测：禁用 JS 文章仍可读（渐进增强成立）、复制/主题不报错、Promise 均处理 |

**P0 收口检查（交付前必过）**：
- 全站 DOM 内功能图标均为内联 `<svg data-icon>`，无 emoji、无第二套图标库（AC-11）。
- 所有颜色/间距/圆角走 `var(--*)`，仅组件内局部 `#fff`/`#000`（DESIGN §8）。
- 配置注释与本文档无 emoji、无紫粉渐变表述。

---

## 5. 与上游契约的一致性声明
- 图标子集、渲染管线、stroke 1.75、禁 astro-icon：与 `ARCHITECTURE.md` §5、ADR-002、DESIGN §9 完全一致。
- `markdown.processor:'unified'`、`output:'static'`、`trailingSlash`/`build.format`：与 ADR-001/ADR-004、SPEC §5 一致。
- 图标尺寸三档、强调色 Teal：与 `design-tokens.json` `icon.*` 及 SPEC §8 一致。
- 本文件为前端 `src/` 脚手架的直接依据；任何偏差须回提 PR 并同步 SPEC / design-tokens。
