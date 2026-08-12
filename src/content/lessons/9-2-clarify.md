---
title: 第一步·让 AI 反问你，把想法聊成项目
module: M9
order: 2
slug: m9/9-2-clarify
description: 做网站前先别让它写代码。用一个"反转提问"的提示词，让 AI 反过来面试你，把模糊想法逼成清楚的项目骨架。
duration: 8 分钟
tags: [vibe coding, 需求澄清, 建站]
status: published
---

上一讲说了，最大的坑是把空泛需求甩给 AI。那正确姿势是什么？**先不让它写代码，而是让它反过来问你。** 你只管用大白话回答，AI 负责把你的回答整理成一份清楚的项目骨架。

## 为什么是"让 AI 反问你"

你自己想写需求文档，往往卡在"不知道该想什么"。但如果你让 AI 来问，它很擅长顺着你的模糊想法，一层层挖出关键问题——而且问出来的问题，正好覆盖了做网站必须想清楚的那些事。

一句话需求之所以坑，是因为你跳过了"想清楚"这一步。让 AI 反问你，等于请了个产品经理，逼你把脑子里的东西倒出来。

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>需求澄清（Requirement Clarification）：在项目动手前，把"要做什么、给谁做、做到什么程度"对齐清楚的过程。做网站最贵的不是写代码，是写错方向后返工。这一步就是把返工提前到"还没写代码"的阶段消化掉。</p></div>
  </div>
</aside>

## 反转提问：一个能直接抄的提示词

核心就一句话：**在写任何代码之前，先向我提问。** 下面这个模板可以复制去用，把"我的模糊想法"换成你自己的。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 让 AI 先反问你</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>在写任何代码之前，请先向我提问，搞清楚这个项目到底是什么。一次提 8–10 个问题，覆盖：目标用户是谁、他们要在这网站上完成什么、需要哪些页面、要哪些功能（搜索/登录/付费/表单等）、数据从哪来（静态写死还是用数据库）、想要什么视觉风格和参考站点。我回答后，请把所有信息整理成一份"项目需求清单"，分模块列清楚，不要急着写代码。
---
我的模糊想法：我想做一个帮人挑生日礼物的小网站。
---</code></pre>
</div>

## 一个真实例子：从一句话到项目骨架

假设你的想法是"做一个帮人挑生日礼物的网站"。你把这个甩给 AI，它不会直接写代码，而是反过来问你：

> 1. 这个网站是给谁用的？送礼的人，还是收礼的人？
> 2. 用户进来后第一步做什么——填问卷测推荐，还是直接逛分类？
> 3. 要不要用户登录保存心愿单？
> 4. 礼物数据是你自己整理一批，还是要接电商接口实时查？
> 5. 要不要"按预算筛选"这种功能？
> 6. 页面大概需要几个：首页、测试页、结果页、关于页？
> 7. 你心里有参考站吗，比如某宝的礼物频道、某个测评号？
> 8. 风格想要可爱活泼，还是简洁高级？

你用大白话回答完，AI 就能吐出一份像样的项目需求清单：用户是"纠结送什么的人"、核心流程是"答 5 题 → 出 3 个推荐"、需要首页/测试页/结果页/关于页、数据先静态写死 20 条、风格走简洁高级、参考某测评号。

到这一步，你手里已经有了一份"想清楚"的骨架——这才是写代码该开始的地方。

## 做网站前，先聊清这 5 件事

不管你的项目多小，下面这五件事最好在动手前对齐。漏掉任何一件，后面都可能返工。

<div class="mindmap" role="img" aria-label="建站前先聊清的 5 件事思维导图">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 704 540" width="100%" role="img" aria-label="建站前先聊清的 5 件事思维导图">
  <g fill="none" stroke-width="2" stroke-linecap="round">
    <path d="M212,270 C236,270 236,105 260,105" stroke="var(--mindmap-b1-line)"/>
    <path d="M381,105 C453,105 454,96 526,96" stroke="var(--mindmap-b1-line)"/>
    <path d="M381,105 C453,105 454,142 526,142" stroke="var(--mindmap-b1-line)"/>
    <path d="M212,270 C236,270 236,197 260,197" stroke="var(--mindmap-b2-line)"/>
    <path d="M421,197 C473,197 474,188 526,188" stroke="var(--mindmap-b2-line)"/>
    <path d="M421,197 C473,197 474,234 526,234" stroke="var(--mindmap-b2-line)"/>
    <path d="M212,270 C236,270 236,289 260,289" stroke="var(--mindmap-b3-line)"/>
    <path d="M474,289 C500,289 500,280 526,280" stroke="var(--mindmap-b3-line)"/>
    <path d="M474,289 C500,289 500,326 526,326" stroke="var(--mindmap-b3-line)"/>
    <path d="M212,270 C236,270 236,381 260,381" stroke="var(--mindmap-b4-line)"/>
    <path d="M421,381 C473,381 474,372 526,372" stroke="var(--mindmap-b4-line)"/>
    <path d="M421,381 C473,381 474,418 526,418" stroke="var(--mindmap-b4-line)"/>
    <path d="M212,270 C236,270 236,473 260,473" stroke="var(--mindmap-b5-line)"/>
    <path d="M421,473 C473,473 474,464 526,464" stroke="var(--mindmap-b5-line)"/>
    <path d="M421,473 C473,473 474,510 526,510" stroke="var(--mindmap-b5-line)"/>
  </g>
  <rect x="40" y="234" width="172" height="72" rx="16" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="1.5"/>
  <text x="126" y="264" text-anchor="middle" dominant-baseline="central" font-size="16" font-weight="600" fill="var(--fg)">建站前先聊清</text>
  <text x="126" y="287" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--muted)">5 件事</text>
  <rect x="260" y="86" width="121" height="38" rx="19" fill="var(--mindmap-b1)"/>
  <text x="320" y="105" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">给谁用 Who</text>
  <rect x="526" y="82" width="107" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="579" y="96" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">目标用户画像</text>
  <rect x="526" y="128" width="121" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="586" y="142" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">他们要完成什么</text>
  <rect x="260" y="178" width="161" height="38" rx="19" fill="var(--mindmap-b2)"/>
  <text x="340" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">有哪些页 Pages</text>
  <rect x="526" y="174" width="134" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="593" y="188" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">首页/列表/详情</text>
  <rect x="526" y="220" width="134" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="593" y="234" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">要不要关于/联系</text>
  <rect x="260" y="270" width="214" height="38" rx="19" fill="var(--mindmap-b3)"/>
  <text x="367" y="289" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">要什么功能 Features</text>
  <rect x="526" y="266" width="134" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="593" y="280" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">搜索/登录/付费</text>
  <rect x="526" y="312" width="94" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="573" y="326" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">表单/评论</text>
  <rect x="260" y="362" width="161" height="38" rx="19" fill="var(--mindmap-b4)"/>
  <text x="340" y="381" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">数据从哪来 Data</text>
  <rect x="526" y="358" width="90" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="571" y="372" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">静态写死</text>
  <rect x="526" y="404" width="107" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="579" y="418" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">要不要数据库</text>
  <rect x="260" y="454" width="161" height="38" rx="19" fill="var(--mindmap-b5)"/>
  <text x="340" y="473" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">什么风格 Style</text>
  <rect x="526" y="450" width="90" height="28" rx="14" fill="var(--mindmap-b5-soft)" stroke="var(--mindmap-b5-line)" stroke-width="1"/>
  <text x="571" y="464" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b5-ink)">参考站点</text>
  <rect x="526" y="496" width="94" height="28" rx="14" fill="var(--mindmap-b5-soft)" stroke="var(--mindmap-b5-line)" stroke-width="1"/>
  <text x="573" y="510" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b5-ink)">配色与气质</text>
</svg>
</div>

| 维度 | 要回答的问题 |
| --- | --- |
| 给谁用 Who | 目标用户是谁？他们来这网站要完成什么？ |
| 有哪些页 Pages | 需要首页、列表、详情吗？要不要关于页、联系页？ |
| 要什么功能 Features | 搜索、登录、付费、表单、评论，哪些真要做？ |
| 数据从哪来 Data | 内容写死在页面里，还是接数据库/接口动态取？ |
| 什么风格 Style | 有参考站点吗？想要什么配色和气质？ |

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>别在没聊清之前就急着要代码。很多人被"AI 三分钟出网站"的视频刺激，恨不得立刻看到页面。但跳过澄清直接生成，往往第一版就把方向定死，后面越改越乱。先花十分钟把需求清单对齐，比之后改三天划算得多。</p></div>
  </div>
</aside>

## 小结

- 正确姿势：先让 AI 反问你，把模糊想法逼成清楚的项目骨架，再写代码。
- 反转提问模板的核心：在写任何代码之前先提问，覆盖用户/页面/功能/数据/风格。
- 你用大白话回答，AI 负责整理成"项目需求清单"——这一步把返工提前消化掉。
- 动手前先对齐五件事：给谁用、有哪些页、要什么功能、数据从哪来、什么风格。
- 下一讲，我们拿着这份骨架，进入第二步：怎么给参考、搭骨架，而不照抄。
