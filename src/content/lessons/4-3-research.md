---
title: 用 AI 做调研与对比
module: M4
order: 3
slug: m4/4-3-research
description: 让 AI 帮你搭调研框架、汇总公开信息、做方案对比——但结论你必须自己判断，事实必须你核对。
duration: 10 分钟
tags: [场景, 调研]
status: published
---

调研不是让 AI 给答案，是让它帮你把信息理清楚。这一讲讲怎么用它搭框架、做对比表，以及为什么"它说的出处"要你自己点开验证。很多人调研卡在"不知道从哪查起"，AI 正好补这个缺口——它不替你拍板，但能帮你把路子先铺开。先说一个底层认知：它很可能会一本正经地编内容，这叫幻觉（Hallucination，模型一本正经地编内容），在调研里危害最大，因为它编出来的"来源"看着比真的还真。所以这一讲的灵魂就一句：**让 AI 当"信息整理员"，不当"信息来源"。**

## 用它搭提纲，不替你下结论

调研的第一步往往是"从哪查起"。对着一个大主题，新手常有三种反应：要么直接丢给 AI 让它"帮我写一份调研报告"（结果它编一通回来），要么对着空白文档发呆，要么东查一点西查一点最后拼不出逻辑。把主题丢给它，让它列一份结构化的提纲，你再照着补材料，比这两种都强。

为什么有效？因为列提纲是它最擅长的事——规则清楚、对错好判断。你给主题，它按"背景 / 主流选项 / 成本 / 适用情况 / 常见坑"这种骨架展开，几乎不会翻车。但注意，它列的是"该查什么"，不是"查到了什么"。提纲里的结论性句子，你一个都不能直接抄，得自己去填肉。

一个真实工作台的场景：你是运营，老板让你"看看竞品最近在搞什么活动"。你不用自己闷头想维度，先把任务交给它列提纲；拿到提纲后，你再去各竞品官网、公众号、行业号里把事实一个个填进去。这样你的时间花在"找事实"上，而不是"想结构"上——后者正是 AI 替你省掉的脑力。

怎么用到你自己工作上：下次任何要"了解情况"的活（选供应商、评估新工具、写行业扫描），先用下面这个模板要一份提纲，再动手查。你会发现，调研的体感从"满头大汗"变成了"照表填空"。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 调研提纲</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>你是一名研究助理。我想了解"[你的主题]"这个主题，请帮我列一份调研提纲，覆盖：背景、主流选项、成本区间、适合什么情况、常见坑。只列框架和该查什么，不要替我下结论。
---
[你的调研目标，一两句]
---</code></pre>
</div>

## 对比表的列怎么设计才公平

做对比最容易偏心——你想推哪个，就可能多列它的优点、少列它的短板，最后表格看着客观，实则早有倾向。更隐蔽的坑是"维度不一致"：A 列了 5 个优点，B 只列了 3 个，读者一眼就觉得 A 好，其实是你的表不公平。

让 AI 用同一组维度同时评两边，才站得住。关键是"维度必须一致"这句话要写进提示词——价格对价格、上手难度对上手难度、适用规模对适用规模、主要短板对主要短板。它给的描述，你也要逐条当"待核实"处理，因为维度对齐了不代表数据对。这里让 AI 用结构化输出（Structured Output，按固定格式如表格 / JSON 返回）给对比表最稳，你拿到的就是对齐好的格子，而不是一段要再提炼的散文。

一个生活化的类比：这就像你让朋友帮你在两款手机里挑一个。如果你只告诉他"A 拍照好、便宜"，他自然偏向 A；但如果你说"请按价格、续航、拍照、售后四点公平比"，他就没法偏。AI 也一样，公平不来自它的品德，来自你给的"同一把尺子"。

怎么用到你自己工作上：凡是要做"选 A 还是选 B"的汇报（方案二选一、工具选型、供应商比价），先把维度定死写进提示词，再让它填。回填时，每条事实你自己补来源。这样你交上去的表，领导挑不出"你偏心"，因为尺子是统一的。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 公平对比表</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>你是一名客观的采购顾问。请就下面两个选项做对比表，维度必须一致：价格、上手难度、适用规模、主要短板。每项用事实描述，不夸大、不护短。
---
[选项 A 描述]
[选项 B 描述]
---</code></pre>
</div>

## 一个能照做的调研排期

把"用 AI 调研"拆成四步，新手也不容易乱：周一用提纲模板把维度铺开；周二到周四按提纲去一手来源（官网、年报、行业报告）填事实，每条标来源链接；周五让 AI 用结构化输出（Structured Output，按固定格式如表格 / JSON 返回）把填好的事实收成对比表，你再核一遍。这样 AI 只干它擅长的"整理"，判断和事实始终在你手上，不会本末倒置。

这里有个坑要提前说：调研时你常会贴一大堆资料进同一个对话。注意上下文窗口（Context Window，模型一次能处理的文字长度上限）——你贴得越多，它越可能"忘了"最早贴的那篇，引用时张冠李戴。所以别在一个对话里堆十几份文档，要么分批、要么每段单独问"基于这份，提取三点"。

另一类风险是数据隐私（Data Privacy，你粘进去的内容的去向与风险）：调研竞品时，别把公司自家的未公开数据也一起粘进公开工具去"比对"，那等于把机密送到第三方。要对比，先把自家数据脱敏或留在本地。

## 核实出处的三步法

这是调研里最不能省的一步。AI 给的"出处"常常张冠李戴，甚至编一个看起来很真的链接和文号——因为它接话茬时，比起说"我没这数据"，它更愿意编一个。三步核：①它说的数据，点进原链接看是不是真的；②它说的结论，看原文到底有没有这句话，别被它的"总结"带跑；③拿不准的，用搜索再交叉验证一次，最好找到两个独立来源互相印证。

举个翻车例子：有人让它"给三个支持远程办公提升效率的权威研究"，它真列出了三篇"论文"加 DOI。那人直接写进汇报，结果同事一搜，其中两篇根本不存在。代价不是"丢脸"两个字——是整份报告的 credibility 崩了。所以宁可慢一点，出处要你自己点开。

一个实用心法：凡是它给得特别顺、特别完整的"来源清单"，反而最该警惕。真文献往往有具体年份、期刊、作者，它编的常只有模糊标题。拿不准就让它标"这条我无法确认来源"，你再自己查——能主动认"我不知道"的回答，才更可信。

真实场景：你想摸清"三家协作工具哪家适合小团队"。先要提纲（价格 / 上手 / 协作 / 短板），再去各官网取真实报价和功能，最后让 AI 收表。全程它没编过一个来源，因为你给的就是一手事实——这正是"信息整理员"的正确打开方式。

怎么用到你自己工作上：把"点开出处"设成铁习惯，就像发文前读一遍。报告里每一条引用、数字、法规，旁边标上你亲查的链接。长期下来，你出的东西领导敢直接用，这本身就是职场信用。

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">注意</p>
    <div class="callout__content"><p>调研里任何要写进报告的引用、数字、法规条文，必须你本人点开核实。把 AI 编的出处当真，是调研翻车最常见的原因。</p></div>
  </div>
</aside>

<aside class="callout callout--tip" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">提示</p>
    <div class="callout__content"><p>把 AI 当"信息整理员"，不当"信息来源"。它帮你理，来源永远是你自己查到的那一手。</p></div>
  </div>
</aside>

## 术语卡：幻觉（Hallucination）——调研时它最会编"看起来很真的来源"

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>幻觉（Hallucination，模型一本正经地编内容）指 AI 生成了听起来合理、实则不存在的事实——虚构的报告、作者、链接、法条编号都算。它的根源在第一讲讲过：模型本质在"顺着概率接话茬"，比起承认"我不知道"，它更倾向编一个通顺的答案。在调研场景危害最大，因为它编的"来源"常常带具体标题、年份、DOI，比真文献还像真的。应对只有一条：任何要写进正式材料的事实，必须你点开一手来源核实，绝不照抄它给的出处。</p></div>
  </div>
</aside>

## 小结

- 用 AI 搭提纲、做对比表，效率拉满，但结论要你自己下。
- 对比表维度要对齐两边，用结构化输出收表才公平、才有说服力，数据仍要你补来源。
- 它给的出处必须你点开核实，别照抄——幻觉在调研里最会编"真来源"。
- 长资料分批喂，留意上下文窗口；自家机密别顺手粘进公开工具。
- 下一讲，我们把它用在 PPT 上——先做结构，再谈好看。
