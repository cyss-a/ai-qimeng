---
title: 通用提示词：把"我想要个工具"聊成项目
module: M10
order: 2
slug: m10/10-2-universal-prompt
description: 给你一套可以反复用的"通用提示词"。不管想做记账本、读书清单还是客户跟进表，套进去就能让 AI 帮你把模糊想法聊成清楚项目。
duration: 8 分钟
tags: [工作台, 通用提示词, 需求澄清]
status: published
---

上一讲定了"四件套"的目标。这一讲先解决最前面、也最关键的一步——把"我想要个工具"变成 AI 能照做的项目说明。

和 M9 里说的一样：空泛需求只会换来通用模板。但工作台比普通网站更依赖"你到底要记什么、怎么用"，所以更得先把需求聊清，再分给前端和后端两步走。

## 通用提示词：六要素

不管你想做哪种工作台，把下面六点一次说清，AI 就能反过来帮你补全细节、产出项目骨架。我管它叫**六要素**：

<div class="mindmap" role="img" aria-label="通用提示词六要素思维导图">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 730 632" width="100%" role="img" aria-label="通用提示词六要素思维导图">
  <g fill="none" stroke-width="2" stroke-linecap="round">
    <path d="M212,316 C236,316 236,105 260,105" stroke="var(--mindmap-b1-line)"/>
    <path d="M381,105 C433,105 434,96 486,96" stroke="var(--mindmap-b1-line)"/>
    <path d="M381,105 C433,105 434,142 486,142" stroke="var(--mindmap-b1-line)"/>
    <path d="M212,316 C236,316 236,197 260,197" stroke="var(--mindmap-b2-line)"/>
    <path d="M381,197 C433,197 434,188 486,188" stroke="var(--mindmap-b2-line)"/>
    <path d="M381,197 C433,197 434,234 486,234" stroke="var(--mindmap-b2-line)"/>
    <path d="M212,316 C236,316 236,289 260,289" stroke="var(--mindmap-b3-line)"/>
    <path d="M394,289 C440,289 440,280 486,280" stroke="var(--mindmap-b3-line)"/>
    <path d="M394,289 C440,289 440,326 486,326" stroke="var(--mindmap-b3-line)"/>
    <path d="M212,316 C236,316 236,381 260,381" stroke="var(--mindmap-b4-line)"/>
    <path d="M434,381 C460,381 460,372 486,372" stroke="var(--mindmap-b4-line)"/>
    <path d="M434,381 C460,381 460,418 486,418" stroke="var(--mindmap-b4-line)"/>
    <path d="M212,316 C236,316 236,473 260,473" stroke="var(--mindmap-b5-line)"/>
    <path d="M381,473 C433,473 434,464 486,464" stroke="var(--mindmap-b5-line)"/>
    <path d="M381,473 C433,473 434,510 486,510" stroke="var(--mindmap-b5-line)"/>
    <path d="M212,316 C236,316 236,565 260,565" stroke="var(--mindmap-b6-line)"/>
    <path d="M394,565 C440,565 440,556 486,556" stroke="var(--mindmap-b6-line)"/>
    <path d="M394,565 C440,565 440,602 486,602" stroke="var(--mindmap-b6-line)"/>
  </g>
  <rect x="40" y="280" width="172" height="72" rx="16" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="1.5"/>
  <text x="126" y="310" text-anchor="middle" dominant-baseline="central" font-size="16" font-weight="600" fill="var(--fg)">通用提示词</text>
  <text x="126" y="333" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--muted)">六要素</text>
  <rect x="260" y="86" width="121" height="38" rx="19" fill="var(--mindmap-b1)"/>
  <text x="320" y="105" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">角色 Role</text>
  <rect x="486" y="82" width="161" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="566" y="96" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">让 AI 扮产品助理</text>
  <rect x="486" y="128" width="134" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="553" y="142" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">只给自己用的工具</text>
  <rect x="260" y="178" width="121" height="38" rx="19" fill="var(--mindmap-b2)"/>
  <text x="320" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">目标 Goal</text>
  <rect x="486" y="174" width="90" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="531" y="188" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">解决什么</text>
  <rect x="486" y="220" width="90" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="531" y="234" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">给谁用</text>
  <rect x="260" y="270" width="134" height="38" rx="19" fill="var(--mindmap-b3)"/>
  <text x="327" y="289" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">页面 Pages</text>
  <rect x="486" y="266" width="107" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="539" y="280" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">要哪几个页面</text>
  <rect x="486" y="312" width="94" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="533" y="326" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">各自放什么</text>
  <rect x="260" y="362" width="174" height="38" rx="19" fill="var(--mindmap-b4)"/>
  <text x="347" y="381" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">功能 Features</text>
  <rect x="486" y="358" width="90" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="531" y="372" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">增删改查</text>
  <rect x="486" y="404" width="121" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="546" y="418" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">要不要登录筛选</text>
  <rect x="260" y="454" width="121" height="38" rx="19" fill="var(--mindmap-b5)"/>
  <text x="320" y="473" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">数据 Data</text>
  <rect x="486" y="450" width="94" height="28" rx="14" fill="var(--mindmap-b5-soft)" stroke="var(--mindmap-b5-line)" stroke-width="1"/>
  <text x="533" y="464" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b5-ink)">存哪些字段</text>
  <rect x="486" y="496" width="200" height="28" rx="14" fill="var(--mindmap-b5-soft)" stroke="var(--mindmap-b5-line)" stroke-width="1"/>
  <text x="586" y="510" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b5-ink)">必须存云端Supabase</text>
  <rect x="260" y="546" width="134" height="38" rx="19" fill="var(--mindmap-b6)"/>
  <text x="327" y="565" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">风格 Style</text>
  <rect x="486" y="542" width="90" height="28" rx="14" fill="var(--mindmap-b6-soft)" stroke="var(--mindmap-b6-line)" stroke-width="1"/>
  <text x="531" y="556" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b6-ink)">参考谁</text>
  <rect x="486" y="588" width="90" height="28" rx="14" fill="var(--mindmap-b6-soft)" stroke="var(--mindmap-b6-line)" stroke-width="1"/>
  <text x="531" y="602" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b6-ink)">什么气质</text>
</svg>
</div>

1. **角色 Role**：让 AI 扮演什么。"你是我个人项目的产品助理，帮我用 AI 做一个只给自己用的小工具。"
2. **目标 Goal**：解决什么、给谁用。"做一个读书清单，记录我读过的、想读的书，和每本书的笔记。"
3. **页面 Pages**：要哪几个页面、各自放什么。"两个页面：①清单页（列表+筛选）②详情页（一本书的全部信息）。"
4. **功能 Features**：能做什么操作、要不要登录。"能新增/编辑/删除一本书；能按'已读/想读'筛选；能搜书名。"
5. **数据 Data**：存哪些字段、存在哪。"每本书存：书名、作者、状态、评分、笔记、封面图。数据要存在云端，刷新不丢。"
6. **风格 Style**：参考谁、什么气质。"参考 Notion 的简洁列表风，浅色，不要花哨渐变。"

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>第 5 点"数据存在云端"这句**必须有**——它就是上一讲说的防丢开关。少了这句，AI 默认用浏览器本地存储，你又回到"刷新就丢"的老路。</p></div>
  </div>
</aside>

## 直接复制的通用提示词

把下面这段复制过去，括号里换成你自己的内容，发给任意 AI 聊天助手即可。它先会反过来问你不清楚的地方，确认后再写代码。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 把想法聊成项目</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>你是我个人项目的产品助理。我想用 AI 做一个只给自己用的小工具，请先向我提问、把需求聊清楚，再给出项目方案，不要急着写代码。

我想做的工具：[一句话说想做什么，比如"读书清单" / "记账本" / "客户跟进表"]
给谁用：[只有我自己 / 小团队]
要哪些页面：[比如"清单页 + 详情页"]
要哪些功能：[比如"新增/编辑/删除 + 筛选 + 搜索"]
每条数据要记哪些字段：[比如"书名、作者、状态、评分、笔记"]
风格参考：[贴 1-2 个参考站链接，或描述，比如"Notion 简洁列表风，浅色"]

重要：数据必须存在云端（用 Supabase），刷新不丢、换设备能同步，不要只用浏览器本地存储。聊清楚后，请先输出一份"项目需求清单"（页面 / 功能 / 数据字段 / 风格），我再确认。</code></pre>
</div>

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">灵感卡</p>
    <div class="callout__content"><p>"工作台"可以是这些：记账本、读书清单、灵感收集箱、习惯打卡、客户跟进表、内容发布日历、旅行计划本、健身记录。它们本质都一样——几个字段 + 增删改查 + 云端保存。套上面的模板，换掉括号里的内容就行。</p></div>
  </div>
</aside>

## 小结

- 把"我想要个工具"聊成项目，用六要素：角色 / 目标 / 页面 / 功能 / 数据 / 风格。
- "数据存在云端（Supabase）"这句必须有，它是防丢开关，缺了就退回本地存储。
- 通用提示词可反复套用：换掉括号里的工具名，就能做记账本、清单、跟进表……
- 让 AI 先反问、先出"项目需求清单"再写代码——下一讲拿这份清单做前端。
