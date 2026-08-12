---
title: 用 AI 做 PPT 大纲
module: M4
order: 4
slug: m4/4-4-ppt
description: 别让 AI 直接出花哨幻灯片，先让它把逻辑和分页想清楚。这讲讲"大纲 → 每页要点"的提示词与降噪。
duration: 7 分钟
tags: [场景, PPT]
status: published
---

PPT 难在结构，不在配色。这一讲讲怎么先让 AI 产出清晰的大纲和每页要点，你再去做视觉，避免"满屏字"或"逻辑散"。不少人花一下午调字体、找模板，最后发现逻辑还没顺——先把结构交给 AI 想清楚，再做皮就快了。这里要用到一个关键能力：信息降噪（Noise Reduction，从一堆内容里提炼要点），也就是让 AI 把你想讲的一大坨，压成观众真能记住的几句话。

## 先大纲，后视觉

很多人一上来就让 AI "做个 PPT"，它吐一堆带装饰的彩页，看着热闹，逻辑却散。正确顺序是先要大纲：讲什么、分几页、每页一句核心。结构定了，样式后面好办。你照着大纲自己讲一遍，如果连你自己都顺不下来，说明逻辑有问题——这时候改，比做好三十页再推倒重来便宜得多。

为什么先大纲能省时间？因为"逻辑散"是全行业 PPT 的通病，而它恰恰来自没想清"先讲什么后讲什么"。AI 在你给的素材里做结构化输出（Structured Output，按固定格式如表格 / JSON 返回），把散乱想法收成"第 1 页讲背景、第 2 页讲问题、第 3 页讲方案"，这一步它比人稳。视觉是体力活，交给模板和工具最快；逻辑才是你的活。

一个生活化的类比：写 PPT 像盖房子。大纲是图纸，配色字体是装修。没人先铺地砖再想几室几厅——图纸定了，装修队照着干就行；图纸错了，装修越豪华越浪费。AI 最擅长画图纸，最不擅长替你住进去感受动线合不合理，所以图纸你得过一遍。

怎么用到你自己工作上：下次要做汇报，先把"主题 + 听众 + 时长"丢给它要大纲，自己讲顺了再进工具做页。你会发现做页从"憋半天"变成"照图施工"，半小时能出初稿。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · PPT 大纲</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>你是一名 PPT 结构顾问。主题是"[你的主题]"，听众是[谁]，时长约[多少]分钟。请先产出大纲：共几页、每页的标题和一句核心观点。先不要设计样式。
---
[你的主题和背景]
---</code></pre>
</div>

## 每页"一个观点 + 三个支撑"

满屏字没人看。让 AI 把每页压成"一个观点 + 三个支撑"，观众一眼抓住重点，你也知道该配什么图。这一招对汇报特别有用，领导要的从来不是字数，是结论。信息降噪在这里就是：把你想说的十句话，删到一句观点加三个证据，其余都是噪音。

为什么"三个"常见？因为人一次能记住的要点大概就是三到五个，多了就糊。让 AI 主动做减法，比你自己舍不得删强——它不心疼你写的长句。但注意，它压出来的支撑点，可能漏掉你最关键的那个，所以压完你要补："我还有个重要点 X，请替换掉最弱的一条。"

一个真实场景：你给客户讲方案，原本写了两页密密麻麻的优势。用这招压成"一个核心卖点 + 三个证据"，客户当场记住了卖点，会后还复述得出来。汇报成功与否，往往就看观众离场时能不能说出你那"一个观点"。

怎么用到你自己工作上：任何要"让人记住"的页——项目汇报、周会同步、培训材料——都先让 AI 压成"一观点三支撑"。你再核对那三个支撑是不是你最想讲的，不是就换。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 每页要点</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>你是一名 PPT 结构顾问。基于上面的大纲，请把第[ N ]页展开：先写一句核心观点，再用三个要点支撑，每点不超过 15 字。不要堆段落。
---
[粘贴该页大纲]
---</code></pre>
</div>

## 让它标出哪页要你补数据

AI 没有你的真实数据，硬编的数字最危险——写在 PPT 里对外一放，当场露怯。让它主动标出"这页需要你提供数据"，你再补，比它瞎填强。这是信息降噪的反面：噪音不只是"多"，还有"假的"。假的撑满一页，比空着更糟。

一个翻车例子：有人让 AI "把季度业绩做成页"，它编了一串增长率。汇报时老板问"这数哪来的"，答不上来，整页 credibility 归零。正确做法是提示词里加一句"凡涉及数字，请标 [需我提供]，不要编造"，它就会留空位。你填真数，页才站得住。

一个实用习惯：把"标空位"当默认要求写进每个 PPT 提示词。它留的空，正是你该补的一手材料；它填的，你反而要追问来源。长期下来，你出的 PPT 数字经得起任何同事当场质疑。

怎么用到你自己工作上：做数据类汇报（业绩、复盘、测算），提示词末尾固定加"数字请标 [需我提供]，勿编造"。填完真数再进工具排版。

## 一个能照做的 PPT 流水线

拿"给客户讲方案"举例，十页左右的汇报这样跑最快：①把"主题 + 听众（客户决策层）+ 12 分钟"丢给它要大纲，自己讲顺；②逐页用"一观点三支撑"展开，把密密麻麻的素材压成要点；③让它标出每页"需我提供"的数据空位，你填真数；④进工具套模板做视觉。四步里前三步是 AI 的强项，第四步你定风格——逻辑这条线从头到尾在你手里。

这里有个容易踩的：你给 AI 的背景材料越长，越要小心上下文窗口（Context Window，模型一次能处理的文字长度上限）。把二十页产品文档整段粘进去，它可能被细节淹没，反而写不出你要的那句核心观点。好做法是背景先自己压成半页要点再给它，关键诉求开头结尾各说一遍。

最后强调一遍协作纪律：人工复核（Human-in-the-loop，关键内容由人把关）在 PPT 上不是"看一下"，是"过逻辑"。AI 能把字排漂亮，但分不清"先讲痛点还是先讲方案"哪种更打动这位客户——这个判断必须你做。记住，观众记住的是你那"一个观点"，不是它排的版式。

真实场景：你给老板汇报年度复盘，原本想塞满数据。用流水线压成"一个结论（今年达成率超目标）+ 三个支撑（营收、效率、口碑）"，老板当场记住了结论，会后还拿去跟上层复述。这就是降噪的价值：少即是多。

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">注意</p>
    <div class="callout__content"><p>PPT 里要对外汇报的数字、案例，必须由你提供。让 AI 标空位、你填真数据，别让它替你造。</p></div>
  </div>
</aside>

<aside class="callout callout--tip" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">提示</p>
    <div class="callout__content"><p>大纲定稿后，视觉交给模板和工具最快。结构清楚，套什么皮都好看。</p></div>
  </div>
</aside>

## 术语卡：信息降噪（Noise Reduction）——PPT 的核心本事

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>信息降噪（Noise Reduction，从一堆内容里提炼要点）指把冗余、重复、无关的信息滤掉，只留下受众真该记住的核心。做 PPT 时它有两层含义：一是把你想说的十句话压成"一个观点 + 三个支撑"，二是把 AI 可能编造的假数据当作噪音剔除、标空位让你补真料。降噪不是"少写"，是"写对地方"——观众离场能复述出的那一句，才是你降噪成功的标准。</p></div>
  </div>
</aside>

## 小结

- PPT 先出大纲，再谈视觉，顺序不能反。
- 每页"一个观点 + 三个支撑"，用信息降噪拒绝满屏字。
- 让 AI 标出要补数据的页，真数据你填，假数据当噪音删。
- 背景别一次堆太长，留意上下文窗口；逻辑判断坚持人工复核。
- 这一讲收住 M4 的四个场景。下一模块我们讲怎么把这些用法沉淀成你自己的日常工作流。
