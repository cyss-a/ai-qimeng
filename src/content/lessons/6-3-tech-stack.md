---
title: "技术栈全景：门槛比你以为的低"
module: M6
order: 3
slug: "m6/6-3-tech-stack"
description: "拆开看支撑智能体变现的工具链：搭建平台、MCP 连接能力、以及为什么两三天就能上手——因为大部分操作可以让 AI 手把手教你。"
duration: "约 18 分钟"
tags: ["技术栈", "MCP", "工具"]
status: published
---

上一讲你看到了一个能卖钱的案例，可能心里犯嘀咕：这得会多少技术？这一讲专门打消这个顾虑。真相是：支撑变现的核心技术，门槛比你以为的低得多。

## 基础搭建工具：挑一个顺手的就行

做智能体、做工作流，底层是一些"搭建平台"。常见的有这些：Claude Desktop（克劳德桌面版，把模型当本地助手用）、Claude Code（克劳德编程版，能直接帮你写和改代码）、Coze（扣子，国内低代码智能体搭建平台）、Dify（一个开源的 AI 应用开发平台）、N8N（一个可视化自动化工作流工具）、UI-Path（一个老牌的桌面流程自动化软件）。

你不需要全学。它们的定位略有分工：Coze、Dify 偏"搭智能体和可视化流程"，适合不想写代码的人；Claude Code、N8N 偏"把步骤串起来并接外部系统"；UI-Path 偏传统桌面自动化。新人最常见的错误是"每个都试一遍结果一个都不熟"。正确做法是：先选一个低代码的（比如 Coze 或 Dify），把上一讲说的"打包"跑通一次，再按需补别的。

## MCP：让 AI 直接操作你的软件

这里要重点讲一个东西——MCP（Model Context Protocol，让 AI 连接外部工具的开放标准）。它是个开放协议，作用是给 AI 开一扇门，让它不再只是"动嘴"，而是能"动手"：直接操作你电脑上的网页、本地应用、数据库。

没有 MCP 时，AI 像个只能口头建议的顾问，你听了还得自己去做；有了 MCP，AI 能直接帮你点开网页、填表单、读文件、调接口。对变现来说意义巨大：你卖的"傻瓜按钮"背后，往往就是 MCP 在替用户操作那些他本来不会用的工具。它是把"分散能力"真正连成"一条线"的那根线。

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">注意</p>
    <div class="callout__content"><p>给 AI 开了 MCP 操作权限，等于让它碰你的账号和文件。只接你信任的、来源清楚的 MCP 服务，别为了省事接来路不明的连接器，那是把钥匙直接交给陌生人。这句话不是吓你，是实打实的安全底线。</p></div>
  </div>
</aside>

## 关键认知：核心技术都是现成的

<div class="mindmap" role="img" aria-label="技术栈全景思维导图">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 743 448" width="100%" role="img" aria-label="技术栈全景思维导图">
  <g fill="none" stroke-width="2" stroke-linecap="round">
    <path d="M212,224 C236,224 236,105 260,105" stroke="var(--mindmap-b1-line)"/>
    <path d="M380,105 C406,105 406,96 432,96" stroke="var(--mindmap-b1-line)"/>
    <path d="M380,105 C406,105 406,142 432,142" stroke="var(--mindmap-b1-line)"/>
    <path d="M212,224 C236,224 236,197 260,197" stroke="var(--mindmap-b2-line)"/>
    <path d="M380,197 C406,197 406,188 432,188" stroke="var(--mindmap-b2-line)"/>
    <path d="M380,197 C406,197 406,234 432,234" stroke="var(--mindmap-b2-line)"/>
    <path d="M212,224 C236,224 236,289 260,289" stroke="var(--mindmap-b3-line)"/>
    <path d="M380,289 C406,289 406,280 432,280" stroke="var(--mindmap-b3-line)"/>
    <path d="M380,289 C406,289 406,326 432,326" stroke="var(--mindmap-b3-line)"/>
    <path d="M212,224 C236,224 236,381 260,381" stroke="var(--mindmap-b4-line)"/>
    <path d="M380,381 C406,381 406,372 432,372" stroke="var(--mindmap-b4-line)"/>
    <path d="M380,381 C406,381 406,418 432,418" stroke="var(--mindmap-b4-line)"/>
  </g>
  <rect x="40" y="188" width="172" height="72" rx="16" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="1.5"/>
  <text x="126" y="218" text-anchor="middle" dominant-baseline="central" font-size="16" font-weight="600" fill="var(--fg)">技术栈</text>
  <text x="126" y="241" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--muted)">门槛比想象低</text>
  <rect x="260" y="86" width="120" height="38" rx="19" fill="var(--mindmap-b1)"/>
  <text x="320" y="105" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">搭建工具</text>
  <rect x="432" y="82" width="267" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="565" y="96" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">Claude桌面/Code/Coze</text>
  <rect x="432" y="128" width="240" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="552" y="142" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">Dify/N8N/UI-Path</text>
  <rect x="260" y="178" width="120" height="38" rx="19" fill="var(--mindmap-b2)"/>
  <text x="320" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">连接能力</text>
  <rect x="432" y="174" width="187" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="525" y="188" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">MCP让AI操作网页应用</text>
  <rect x="432" y="220" width="161" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="512" y="234" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">现成AI软件即插即用</text>
  <rect x="260" y="270" width="120" height="38" rx="19" fill="var(--mindmap-b3)"/>
  <text x="320" y="289" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">学习成本</text>
  <rect x="432" y="266" width="121" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="492" y="280" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">2-3天可上手</text>
  <rect x="432" y="312" width="227" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="545" y="326" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">vibe coding让AI教</text>
  <rect x="260" y="362" width="120" height="38" rx="19" fill="var(--mindmap-b4)"/>
  <text x="320" y="381" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">核心技术</text>
  <rect x="432" y="358" width="147" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="505" y="372" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">文生图文生视频编程</text>
  <rect x="432" y="404" width="121" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="492" y="418" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">只是串联起来用</text>
</svg>
</div>

你真正要写的"核心能力"——文生图（Text-to-Image，用文字描述直接生成图片）、文生视频（Text-to-Video，用文字描述直接生成视频）、编程——全都是各家 AI 软件里现成的功能。你不是从零造轮子，你只是把这些现成的轮子按业务顺序串起来。这就好比装修：墙漆、水管、灯都是买来的，你的价值在"怎么排布让房子好住"，不在"从头炼铁"。

## 为什么两三天就能上手：vibe coding

很多人卡在"我不会编程"。现在有种新玩法叫 vibe coding（氛围编程，用自然语言加 AI 边聊边写代码）。你不用懂语法，你用大白话告诉 AI"我要一个按钮，点了把图传上去再调接口"，它就把代码写出来，你复制粘贴、跑起来、不对再让它改。整个过程像跟一个耐心的程序员同事聊天。

所以真实的学习曲线是这样的：你花 2–3 天，把搭建平台的基本操作摸一遍，遇到不会的，直接问 AI、让它手把手指导你点哪、贴哪段代码。大部分操作卡住时，把报错截图丢给 AI，它就能告诉你下一步。你学的不是"编程"，是"怎么指挥 AI 帮你把流程搭起来"。门槛低，低在这儿。

## 术语卡：MCP（模型上下文协议）到底解决了什么

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>MCP（Model Context Protocol，让 AI 连接外部工具的开放标准）解决的是"AI 只能动嘴、不能动手"的老问题。它是一套开放协议，相当于给 AI 接了一堆标准插头：插上网页操作的插头，它就能帮你点页面；插上本地文件的插头，它就能读你文档；插上数据库的插头，它就能查数据。对变现者来说，MCP 是让"傻瓜按钮"真正替用户操作后台工具的关键——没有它，你卖的只是一句建议；有了它，你卖的是一套自动跑起来的动作。</p></div>
  </div>
</aside>

## 一个能直接用来起手的问题

不知道从哪个平台入手，可以先问 AI 一句，让它按你的条件推荐：

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 让我挑搭建平台</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>我是零基础新手，想做一个[比如：二手车图转精修]的自动化小工具，希望尽量不写代码、能接网页操作和本地文件。请从 Coze、Dify、N8N、Claude Code 里推荐最合适的一个，说明第一步该点哪里，并提醒我需要注意的安全项。</code></pre>
</div>

## 小结

- 搭建平台有 Coze、Dify、N8N、Claude Code、UI-Path 等，新人先选一个低代码的跑通。
- MCP 让 AI 从"动嘴"变"动手"，是傻瓜按钮能真正操作后台工具的关键。
- 核心技术（文生图、文生视频、编程）全是现成功能，你只负责串联。
- 学习成本 2–3 天，因为大部分操作可以让 AI 用 vibe coding 手把手教你。
- 下一讲，我们讲怎么找到第一批客户，以及怎么筛掉不赚钱的单子。
