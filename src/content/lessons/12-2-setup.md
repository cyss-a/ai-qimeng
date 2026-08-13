---
title: 十分钟，搭起你的自生长知识库
module: M12
order: 2
slug: m12/12-2-setup
description: 三个工具（Obsidian + Codex + 浏览器插件）、五步走通最小闭环：初始化、定目录、写 AGENTS.md、采集原料、让 AI 编译成网。附可直接复制的提示词。
duration: 12 分钟
tags: [Obsidian, Codex, 搭建, 提示词]
status: published
---

上一讲讲了"为什么"。这一讲讲"怎么做"——不绕弯，照着五步走，十分钟能跑通一个最小可用的版本。

## 三个工具，一个闭环

- **Obsidian**：基于本地 Markdown 文件的知识管理软件。所有内容就是纯文本文件，存在你自己的电脑里，数据完全自控，不怕哪天平台关了。
- **Codex**：OpenAI 出的终端 AI 助手。很多人只拿它写代码，但它在"知识库场景"的能力被严重低估——它可以读取 Obsidian 里的文件，帮你分析、提纯、归档、建立链接，回答问题时还会明确标注信息来源。
- **浏览器插件**：Obsidian Web Clipper，看到好网页一键存进仓库。

核心逻辑就一句：**Obsidian 负责记住，Codex 负责整理和执行。** 两个指向同一个文件夹，配合起来，你的知识库就不只是收藏夹，而是一个会越来越懂你的工作系统。

## 第一步：初始化项目

打开 Obsidian，新建一个仓库，叫 `kb-wiki`。如果你懂一点 Git，顺手 `git init` 做版本管理（改坏了能回退）。

然后打开 Codex，新建一个会话，把**工作目录指向刚建的 `kb-wiki` 文件夹**。这样两个工具指向同一个地方，Codex 才能读到你存进去的东西。

## 第二步：设计目录结构

在 Obsidian 里建好这几个：

- `raw/` —— 放原始资料（还没处理的"生肉"）
- `wiki/` —— 放编译后的知识（AI 提炼好的"熟肉"）
- `templates/` —— 放 Wiki 页面的模板
- `AGENTS.md` —— 告诉 Codex 怎么干的"规范文件"（最重要）
- `index.md` —— Wiki 的索引页

## 第三步：写 AGENTS.md（最核心的一步）

这是整个系统能不能转起来的关键。你要告诉 Codex：

- 你的角色是什么（比如"知识库管理员"）
- 目录结构怎么维护
- 从哪里读取素材
- 素材怎么编译
- 摘要怎么写
- 链接怎么创建

不用自己从零写。直接把下面这段发给 Codex，让它先生成一版，你再微调几个地方定稿：

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词 · 让 Codex 生成 AGENTS.md</span>
    <button class="copy-btn" aria-label="复制提示词">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>帮我写一份 AGENTS.md，指导你如何维护一个个人知识库。
目录结构：raw/ 放原始资料，wiki/ 放编译后的知识，templates/ 放页面模板。
要求：
1. 阅读 raw 中新增的文件；
2. 提取其中的概念和实体；
3. 为每个有效来源在 wiki/ 创建一篇摘要笔记；
4. 建立双向链接，把相关概念连起来；
5. 更新 index.md 作为总索引，更新 log.md 记录每次改动。
输出格式参考下面的模板：
---
标题：
来源：
核心观点：
关联概念：[[概念A]] [[概念B]]
---
请先生成这份 AGENTS.md，我之后会微调。</code></pre>
</div>

这个文件不是一次写好的。以后用着用着，觉得哪里不对，改一下就好——它会慢慢完善起来。

## 第四步：采集原始资料

逛浏览器看到一篇好文章，用 Web Clipper 一键存进 `raw/`。手机上看到公众号好文，先存到收藏，再让 Codex 定期同步进 `raw/`。

一个原则：**只收高质量的，宁缺毋滥。** 垃圾进，垃圾出，AI 也救不了你塞进去的噪音。

## 第五步：让 Codex 编译知识

打开 Codex，发这句话：

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词 · 每日整理（可直接交给 Codex）</span>
    <button class="copy-btn" aria-label="复制提示词">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>请检查 raw/ 中最近新增的内容。
1. 去重、提炼核心观点；
2. 标出里面的案例和可用链接；
3. 把长期有用的内容写入 wiki/ 作为概念笔记；
4. 如果发现有可复用三次以上的方法，写成一篇方法草稿放进 Skill 库；
5. 更新 index.md 和 log.md。
注意：不要覆盖 raw/ 里的原始文件。</code></pre>
</div>

Codex 就开始干活了——读原始资料、提取概念、写摘要、建链接、更新索引。等它跑完，你打开 Obsidian 的**关系图谱**，能看到知识点彼此关联，形成一张网。那一刻你就明白了：它不是收藏夹，它在长。

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">给小白的一句话</p>
    <div class="callout__content"><p>工具可以变通：不会用 Git 没关系，先建文件夹跑通最小闭环；没有 Codex 也没关系，任何能读写你本地文件的 AI 客户端（WorkBuddy、Cursor、Claude 都行）都能当这个"引擎"。关键是"Obsidian 存 + AI 整理"这个闭环，不挑具体工具。</p></div>
  </div>
</aside>

## 小结

- 三件套：Obsidian（存）+ Codex（整理）+ Web Clipper（采）。
- 五步走通：初始化 → 定目录 → 写 AGENTS.md → 采集原料 → 让 AI 编译成网。
- AGENTS.md 是命门：先让 AI 生成、你再微调，用着用着持续改。
- 最小闭环 = 收集 → 消化 → 沉淀 → 输出。先跑通，再谈自动化。
