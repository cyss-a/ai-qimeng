---
title: 从零搭建：一份可以直接抄的提示词清单
module: M10
order: 6
slug: m10/10-6-build-runbook
description: 把前面几讲串成一条"照抄就能做"的实操线。从注册工具到上线，每一步都给你可直接复制的提示词，小白跟着发就能搭出永久有效的工作台。
duration: 12 分钟
tags: [工作台, 从零搭建, 提示词清单, 实操]
status: published
---

前面五讲学透了原理：为什么前后端都要有、通用提示词怎么写、前端怎么生、Supabase 怎么接、怎么上线才永久。这一讲把这些**串成一条"照抄就能做"的线**——你不用记流程，只要按顺序把下面每张"提示词卡片"复制、发给你的 AI，就能从零搭出一个刷新不丢、一直能开的工作台。

<div class="mindmap" role="img" aria-label="从零搭建工作台五步法思维导图">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 637 632" width="100%" role="img" aria-label="从零搭建工作台五步法思维导图">
  <g fill="none" stroke-width="2" stroke-linecap="round">
    <path d="M212,316 C236,316 236,105 260,105" stroke="var(--mindmap-b1-line)"/>
    <path d="M380,105 C406,105 406,96 432,96" stroke="var(--mindmap-b1-line)"/>
    <path d="M380,105 C406,105 406,142 432,142" stroke="var(--mindmap-b1-line)"/>
    <path d="M212,316 C236,316 236,197 260,197" stroke="var(--mindmap-b2-line)"/>
    <path d="M380,197 C406,197 406,188 432,188" stroke="var(--mindmap-b2-line)"/>
    <path d="M380,197 C406,197 406,234 432,234" stroke="var(--mindmap-b2-line)"/>
    <path d="M212,316 C236,316 236,289 260,289" stroke="var(--mindmap-b3-line)"/>
    <path d="M380,289 C406,289 406,280 432,280" stroke="var(--mindmap-b3-line)"/>
    <path d="M380,289 C406,289 406,326 432,326" stroke="var(--mindmap-b3-line)"/>
    <path d="M212,316 C236,316 236,381 260,381" stroke="var(--mindmap-b4-line)"/>
    <path d="M380,381 C406,381 406,372 432,372" stroke="var(--mindmap-b4-line)"/>
    <path d="M380,381 C406,381 406,418 432,418" stroke="var(--mindmap-b4-line)"/>
    <path d="M212,316 C236,316 236,473 260,473" stroke="var(--mindmap-b5-line)"/>
    <path d="M380,473 C406,473 406,464 432,464" stroke="var(--mindmap-b5-line)"/>
    <path d="M380,473 C406,473 406,510 432,510" stroke="var(--mindmap-b5-line)"/>
    <path d="M212,316 C236,316 236,565 260,565" stroke="var(--mindmap-b6-line)"/>
    <path d="M380,565 C406,565 406,556 432,556" stroke="var(--mindmap-b6-line)"/>
    <path d="M380,565 C406,565 406,602 432,602" stroke="var(--mindmap-b6-line)"/>
  </g>
  <rect x="40" y="280" width="172" height="72" rx="16" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="1.5"/>
  <text x="126" y="310" text-anchor="middle" dominant-baseline="central" font-size="16" font-weight="600" fill="var(--fg)">从零搭建工作台</text>
  <text x="126" y="333" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--muted)">照抄五步</text>
  <rect x="260" y="86" width="120" height="38" rx="19" fill="var(--mindmap-b1)"/>
  <text x="320" y="105" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">第0步·准备</text>
  <rect x="432" y="82" width="90" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="477" y="96" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">注册账号</text>
  <rect x="432" y="128" width="134" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="499" y="142" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">VPN见10-1</text>
  <rect x="260" y="178" width="120" height="38" rx="19" fill="var(--mindmap-b2)"/>
  <text x="320" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">第1步·澄清</text>
  <rect x="432" y="174" width="107" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="485" y="188" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">六要素聊需求</text>
  <rect x="432" y="220" width="90" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="477" y="234" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">先出清单</text>
  <rect x="260" y="270" width="120" height="38" rx="19" fill="var(--mindmap-b3)"/>
  <text x="320" y="289" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">第2步·前端</text>
  <rect x="432" y="266" width="107" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="485" y="280" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">AI生成界面</text>
  <rect x="432" y="312" width="90" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="477" y="326" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">预留接口</text>
  <rect x="260" y="362" width="120" height="38" rx="19" fill="var(--mindmap-b4)"/>
  <text x="320" y="381" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">第3步·后端</text>
  <rect x="432" y="358" width="161" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="512" y="372" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">Supabase建表</text>
  <rect x="432" y="404" width="90" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="477" y="418" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">云端存储</text>
  <rect x="260" y="454" width="120" height="38" rx="19" fill="var(--mindmap-b5)"/>
  <text x="320" y="473" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">第4步·上线</text>
  <rect x="432" y="450" width="147" height="28" rx="14" fill="var(--mindmap-b5-soft)" stroke="var(--mindmap-b5-line)" stroke-width="1"/>
  <text x="505" y="464" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b5-ink)">连GitHub部署</text>
  <rect x="432" y="496" width="90" height="28" rx="14" fill="var(--mindmap-b5-soft)" stroke="var(--mindmap-b5-line)" stroke-width="1"/>
  <text x="477" y="510" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b5-ink)">永久网址</text>
  <rect x="260" y="546" width="120" height="38" rx="19" fill="var(--mindmap-b6)"/>
  <text x="320" y="565" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">第5步·备份</text>
  <rect x="432" y="542" width="94" height="28" rx="14" fill="var(--mindmap-b6-soft)" stroke="var(--mindmap-b6-line)" stroke-width="1"/>
  <text x="479" y="556" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b6-ink)">导出CSV</text>
  <rect x="432" y="588" width="90" height="28" rx="14" fill="var(--mindmap-b6-soft)" stroke="var(--mindmap-b6-line)" stroke-width="1"/>
  <text x="477" y="602" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b6-ink)">三保险</text>
</svg>
</div>

## 第 0 步：先把要注册的东西备齐

动手前，先开好这几个账号（注册过程按网站提示走，几分钟的事）：

- **一个 AI 编程工具**：Lovable / Bolt / v0 任选一个（新手从 Lovable 或 Bolt 上手最省事）。
- **Supabase**：云端数据库，存数据的地方。
- **GitHub**：存代码的仓库。
- **一个部署平台**：Vercel / Netlify / CloudBase / GitHub Pages 任选。

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">代理提醒</p>
    <div class="callout__content"><p>其中 **Supabase、Vercel、Netlify、Lovable、Bolt、v0 在国内需要科学上网**（完整清单见 10-1）。如果某个网站打不开，多半就是没挂代理。优先选国内直连的 CloudBase / EdgeOne Pages 部署，能少很多麻烦。</p></div>
  </div>
</aside>

## 第 1 步：用提示词把需求聊清

打开任意 AI 聊天助手（DeepSeek、通义、豆包、ChatGPT 都行），把下面这张卡复制过去，括号里换成你自己的内容。它会先反问你、确认后再给方案。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词 · 第1步 澄清需求</span>
    <button class="copy-btn" aria-label="复制提示词">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>你是我个人项目的产品助理。我想用 AI 做一个只给自己用的小工具，请先向我提问、把需求聊清楚，再给方案，不要急着写代码。

我想做的工具：[一句话，比如"读书清单"]
给谁用：[只有我自己 / 小团队]
要哪些页面：[比如"清单页 + 详情页"]
要哪些功能：[比如"新增/编辑/删除 + 筛选 + 搜索"]
每条数据记哪些字段：[比如"书名、作者、状态、评分、笔记"]
风格参考：[贴 1-2 个参考链接，或描述，如"Notion 简洁列表风，浅色"]

重要：数据必须存在云端（用 Supabase），刷新不丢、换设备能同步，不要只用浏览器本地存储。聊清楚后，先输出一份"项目需求清单"（页面/功能/数据字段/风格），我再确认。</code></pre>
</div>

确认它给的"项目需求清单"没问题，就回一句"确认，开始"。

## 第 2 步：用提示词生成前端界面

把 AI 编程工具（Lovable / Bolt / v0）打开，贴上这张卡。它就会把界面生出来。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词 · 第2步 生成前端</span>
    <button class="copy-btn" aria-label="复制提示词">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>根据下面的"项目需求清单"帮我做一个前端界面（先只做界面，存储后面接 Supabase）。

【项目需求清单】
页面：[清单页 + 详情页]
功能：[新增/编辑/删除 + 筛选 + 搜索]
字段：[书名、作者、状态、评分、笔记]
风格：[Notion 简洁列表风，浅色，不要花哨渐变]

要求：
1. 页面和组件结构清晰，按钮、表单、列表都能点能用；
2. 列表页能展示数据，详情页能展示单条全部字段；
3. 预留"数据从云端读取/写入"的接口位置，现在可以先写死示例数据；
4. 响应式，手机和电脑都能正常看；
5. 先给我一个能本地预览的版本，并告诉我怎么运行。

重要：不要只用浏览器 localStorage，后面要接 Supabase，请为云端存储预留接口。</code></pre>
</div>

拿到界面后先点一遍：按钮能点、列表能显、手机拉窄不崩、能导出代码。四样过了再往下。

## 第 3 步：建 Supabase 表（云端存储就位）

去 supabase.com 新建一个项目（按提示走）。项目建好后，用这张卡让 AI 帮你写"建表 SQL"，你再粘到 Supabase 后台的 **SQL Editor** 里运行。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词 · 第3步 生成建表 SQL</span>
    <button class="copy-btn" aria-label="复制提示词">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>我要把下面这些数据存到 Supabase（Postgres）。请帮我写一段建表 SQL，包含自增主键 id、创建时间 created_at（默认 now()），以及下面的字段，字段类型要合适（文本用 text，数字用 numeric/int，时间用 timestamptz）。

表名：[比如 books]
字段：[书名 text、作者 text、状态 text、评分 numeric、笔记 text]

要求：
1. 开启行级安全 RLS，并加一条策略允许匿名用户对该表做全部操作（仅限个人项目练习用）；
2. 给出在 Supabase 后台 SQL Editor 粘贴运行的完整语句；
3. 顺便告诉我建完后在 Project Settings → API 里能拿到哪两个值（URL 和 anon key）。</code></pre>
</div>

SQL 跑成功后，到 **Project Settings → API** 记下两个值：**Project URL** 和 **anon public key**——第 4 步要填。

## 第 4 步：连上后端 + 一键上线

回到你的 AI 编程工具，贴上这张卡。它会把前端真正连到 Supabase，并帮你推到 GitHub、部署上线。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词 · 第4步 连接+部署</span>
    <button class="copy-btn" aria-label="复制提示词">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>我现在有一个前端界面（上面需求清单那个），也已经建好了 Supabase 表和拿到了 Project URL、anon key。请把前端真正连上 Supabase：

要求：
1. 用官方 @supabase/supabase-js 客户端，从环境变量读取 SUPABASE_URL 和 SUPABASE_ANON_KEY（不要写死在代码里）；
2. 把原来写死的示例数据，改成从 Supabase 读取和写入（列表、新增、编辑、删除都走数据库）；
3. 在界面上加"连接状态"提示，连不上时给出明确报错而不是白屏；
4. 本地能跑通后，帮我把它连到我的 GitHub 仓库并部署上线，给我一个可访问的网址。

附：我的 Supabase URL 和 anon key 我会填到项目/部署平台的环境变量里。</code></pre>
</div>

这一步有两个**关键动作**别漏：
- 把 Supabase 的 URL 和 anon key 填进工具的"环境变量 / Secrets"设置里（不是写进代码）；
- 部署平台里也把这两个环境变量填上，否则线上会白屏。

## 第 5 步：加一个"导出备份"按钮

最后，给工作台加个导出功能，随时能把数据备份下来——这就是"永久有效"的第三重保险。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词 · 第5步 导出备份</span>
    <button class="copy-btn" aria-label="复制提示词">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>给我的工作台加一个"导出数据"功能：点击后把 Supabase 里 [表名] 的当前全部数据导出成 CSV 文件下载。

要求：
1. 用 JS 在浏览器端把查询结果转成 CSV 并触发下载，不需要后端额外服务；
2. CSV 表头用中文（书名、作者、状态、评分、笔记）；
3. 加一个明显的"导出 CSV"按钮，放在列表页右上角；
4. 同时告诉我：万一以后想整库备份，在 Supabase 后台 Table Editor 也能直接导出 CSV，或用 pg_dump 导出 SQL。</code></pre>
</div>

## 照抄顺序总表

把上面五步的提示词按顺序发给 AI，中间只做两件事：**在 Supabase 跑一次 SQL、把两个 key 填进环境变量**。其余交给 AI。

1. 第 0 步：开好 Supabase / GitHub / 部署平台 / AI 编程工具四个账号（需代理的提前挂上）。
2. 第 1 步：复制"澄清需求"卡 → 发给 AI 聊天助手 → 确认项目需求清单。
3. 第 2 步：复制"生成前端"卡 → 发给 AI 编程工具 → 拿到能预览的界面。
4. 第 3 步：去 Supabase 建项目 → 复制"建表 SQL"卡 → 在 SQL Editor 跑 → 记下 URL 和 anon key。
5. 第 4 步：复制"连接+部署"卡 → 发给 AI 编程工具 → 填好环境变量 → 拿到永久网址。
6. 第 5 步：复制"导出备份"卡 → 发给 AI 编程工具 → 加上导出按钮。

做完这六条，你就拥有了一个：**代码在 GitHub、数据在 Supabase、站点在部署平台、还能随时导出备份**的专属工作台。它不依赖你这台设备，刷新不丢、关电脑也一直在——和那些"下次刷新就打不开"的教程，彻底两回事。

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">做到这就够了</p>
    <div class="callout__content"><p>第一次做，先照这五步把"一个能跑的工作台"做出来，比追求完美重要。做出来之后，再慢慢加字段、改样式、换参考风格——因为代码在 GitHub、数据在 Supabase，你随时能改、不怕丢。</p></div>
  </div>
</aside>

## 小结

- 本讲把前五讲串成一条"复制提示词 → 发给 AI → 完工"的实操线，小白照顺序发就能做。
- 第 0 步备齐四个账号；其中 Supabase / Vercel / Netlify / Lovable / Bolt / v0 需科学上网（清单见 10-1）。
- 第 1–2 步出需求清单和前端界面；第 3 步在 Supabase 跑建表 SQL；第 4 步连后端并部署上线；第 5 步加导出备份。
- 中间你只手动做两件事：跑一次 SQL、填两个 key 到环境变量。其余交给 AI。
- 成品 = 代码在 GitHub + 数据在 Supabase + 站点在部署平台 + 能导出备份，刷新不丢、一直能开。
