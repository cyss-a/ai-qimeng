# ADR-002: 锁定 Lucide 为 SVG 图标库（经 lucide-static 锚定）

- 状态：Accepted（2026-08-11）
- 决策者：高见远（首席架构师）
- 关联：DESIGN.md §9、design-tokens.json `icon.*`；ADR-001（Astro 7）

## 背景（Context）

P0 铁律：全站功能图标必须统一一套 SVG 图标库，禁止 emoji、禁止混用多套。DESIGN.md §9 与 design-tokens.json 已明确锁定 **Lucide**（描边型、24px 网格、currentColor），尺寸 16/20/24px、stroke 1.75。问题落在「如何在 Astro 7 技术栈下把它落为可版本化的依赖与渲染机制」。

调研发现 `astro-icon@1.1.5`（社区常用方案）的 peer 依赖为 `astro@^4`，与本项目 Astro 7 冲突，直接安装会触发 peer 不兼容或运行时异常（生成式代码失效模式：幻觉依赖/接口）。

## 决策（Decision）

- 锁定图标库：**Lucide**。
- 锚定依赖：`lucide-static@^1.25.0`（npm latest 1.25.0，2026-07，ISC 许可，提供 `icons/*.svg` 原始文件）作为 devDependency。
- 渲染机制：初始化时精选 Lucide 图标子集，提交至仓库 `src/icons/*.svg`（随 git 版本化、彻底锁定）；`src/components/Icon.astro` 用 `import.meta.glob('../icons/*.svg', { query: '?raw', eager: true })` 内联渲染，**构建期完成、零运行时 JS、仅打包用到的图标（tree-shake）**。
- 尺寸：16px（行内）/ 20px（按钮）/ 24px（独立）映射 design-tokens；stroke 经 CSS 统一覆盖为 1.75。
- 禁止：emoji 图标；引入第二套图标库（Tabler/Heroicons 等）。

## 理由（Arguments）

- Lucide 已与 DESIGN 系统对齐（描边统一、语义明确、可矢量缩放），无需另选。
- `lucide-static` 提供原始 SVG 文件，提交子集到仓库后图标版本与内容一同受 git 管控，满足「锁定图标库的依赖」且规避运行时拉取与 peer 冲突。
- 内联 SVG + tree-shake：零运行时 JS、无额外网络请求，契合静态站性能与「不引 JS 框架」约束。
- 规避 `astro-icon` 与 Astro 7 的 peer 不兼容（主动排雷，避免幻觉依赖上线）。

## 后果（Consequences）

- 正面：图标全站统一、版本可控、零运行时成本；新增图标只需从 `lucide-static` 复制对应 SVG 到 `src/icons/` 并报入 `Icon.astro` 映射。
- 负面 / 约束：图标需手动精选并提交（非按需自动拉取）；若未来大量新增图标需维护 `src/icons/` 清单。
- 风险缓解：在 `Icon.astro` 集中管理映射，缺失图标构建即报错（fail-fast）；design-tokens 与 DESIGN.md 保持 `icon.library = lucide` 单一事实来源。
