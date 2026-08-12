---
title: 前端界面：用提示词让 AI 生出页面
module: M10
order: 3
slug: m10/10-3-frontend-build
description: 拿到"项目需求清单"后，用一套提示词让 AI 编程工具生出前端界面。附工具对比、本地预览自检清单和可直接复制的提示词。
duration: 9 分钟
tags: [工作台, 前端, AI 编程, 界面]
status: published
---

上一讲你拿到了一份"项目需求清单"（页面 / 功能 / 数据字段 / 风格）。这一讲，我们把它交给一个 AI 编程工具，让它把界面生出来——也就是"四件套"里的第一块：前端。

## 选一个 AI 编程工具

不用自己装环境，直接在浏览器里就能用。常见几个：

| 工具 | 特点 | 适合 |
| --- | --- | --- |
| Lovable | 聊天式生成全栈网站，自带部署 | 想一步到位、含数据库 |
| Bolt | 浏览器内编码，预览快 | 想边聊边看效果 |
| v0 | 擅长 UI 组件，偏前端 | 界面精致度要求高 |
| Cursor | 本地编辑器 + AI，可控性强 | 想自己多掌控代码 |
| Codex / Claude | 给代码、你本地跑 | 已有开发环境 |

本模块选**任意能"聊天生成 + 预览"的工具**都行，关键是流程，不是工具名。新手从 Lovable 或 Bolt 上手最省事。

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>前端 = 你看得见、点得动的那层：页面、按钮、表单、列表。它只负责"展示和收集"，真正把数据存住的是后面要接的 Supabase（后端）。所以这一讲先不管存储，专心把界面做出来、能点。</p></div>
  </div>
</aside>

## 把需求清单交给它

打开工具，把上一讲的"项目需求清单"整段贴进去，再补一句关键要求——**数据走 Supabase，别用浏览器本地存储**。这样它从一开始就把后端接口预留好，后面接 Supabase 才顺。

## 直接复制：生成前端的提示词

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 生成前端界面</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>根据下面的"项目需求清单"帮我做一个前端界面（先只做界面，存储后面接 Supabase）。

【项目需求清单】
页面：[清单页 + 详情页]
功能：[新增 / 编辑 / 删除 + 筛选 + 搜索]
字段：[书名、作者、状态、评分、笔记]
风格：[Notion 简洁列表风，浅色，不要花哨渐变]

要求：
1. 用清晰的页面和组件结构，按钮、表单、列表都能点能用；
2. 列表页能展示数据，详情页能展示单条全部字段；
3. 预留好"数据从云端读取 / 写入"的接口位置，现在可以先写死示例数据；
4. 响应式，手机和电脑都能正常看；
5. 先给我一个能本地预览的版本，并告诉我怎么运行。

重要：不要只用浏览器 localStorage 存储，后面要接 Supabase，请为云端存储预留接口。</code></pre>
</div>

## 拿到界面后，先做这 4 项自检

别急着往下走，先在工具里点一遍：

1. **按钮能点**——新增 / 编辑 / 删除都能唤起对应操作（哪怕现在只是弹窗）。
2. **列表能显示**——示例数据正常渲染，不乱码、不重叠。
3. **手机能看**——把预览窗口拉窄，布局不崩、不横向滚动。
4. **能导出代码**——工具要能让你"下载代码"或"连 GitHub"，这是下一步推仓库的前提。

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>如果工具说"先用 localStorage 帮你存着，后面再换"，一定拦住它：<strong>现在就按上面的提示词要求预留 Supabase 接口</strong>。拖到后面再换存储，往往要返工重做数据层，小白最容易卡在这。</p></div>
  </div>
</aside>

## 小结

- 前端界面用 AI 编程工具（Lovable / Bolt / v0 / Cursor 等）聊天生成，关键在流程不在工具名。
- 把"项目需求清单"+"数据走 Supabase"一起发，让它从一开始就预留后端接口。
- 拿到的界面先过 4 项自检：按钮能点、列表能显、手机能看、能导出代码。
- 现在界面能跑、但数据还是示例——下一讲接 Supabase，让它真正"刷新不丢"。
