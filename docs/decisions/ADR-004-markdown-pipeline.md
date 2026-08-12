# ADR-004: Markdown 处理器锁定 unified（保住标题锚点 / TOC）

- 状态：Accepted（2026-08-11）
- 决策者：高见远（首席架构师）
- 关联：ADR-001（Astro 7）

## 背景（Context）

Astro 7.0（2026-06）将默认 Markdown 解析器切换为 **Sätteri**（Rust 实现），并**不再执行 remark/rehype 插件**。本项目依赖标题锚点 ID 与目录（TOC）导航：若锚点 ID 由某个 rehype 插件生成，切换默认解析器后会**静默失效**——页面照常构建、不报错，但 TOC 跳转断裂、章节导航不可用（生成式代码失效模式：沉默逻辑错误，最贵的一类）。

## 决策（Decision）

在 `astro.config.mjs` 显式声明：

```js
export default defineConfig({
  markdown: {
    processor: 'unified',
  },
});
```

保留 unified（remark/rehype）管线，确保标题锚点 ID 与任何 rehype 插件（如 rehype-slug、rehype-autolink-headings，若后续启用）行为稳定、可预期。

## 理由（Arguments）

- 目录锚点 / 章节导航是 PRD 核心交互（RICE 中「课程导航 / 目录锚点」评分 3.60，MVP 必做）；锚点失效属无声故障，必须在架构层前置规避。
- 显式 `processor: 'unified'` 是 Astro 7 官方提供的回退开关，成本为零、向后兼容。
- 即便当前仅依赖 Astro 原生标题 ID，锁定 unified 也消除了「升级/换解析器导致静默断裂」的回归风险，符合规格即契约「内嵌已知坑」原则。

## 后果（Consequences）

- 正面：TOC 与锚点跳转稳定；未来可安全引入 rehype 插件（如自动标题链接、代码高亮增强）而不怕被静默丢弃。
- 负面 / 约束：相比 Sätteri 默认，`unified` 管线构建略慢（remark/rehype 生态），但对本项目几十篇文档体量可忽略。
- 风险缓解：CI 中对一篇含多级标题的样例文档断言其渲染 HTML 含 `id` 锚点，作为回归防护。
