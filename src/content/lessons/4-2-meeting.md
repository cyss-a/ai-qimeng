---
title: 用 AI 整理会议纪要
module: M4
order: 2
slug: m4/4-2-meeting
description: 把录音转写或聊天记录丢给 AI，几秒出"结论 / 待办 / 责任人 / 时间"。重点是别让它编造。
duration: 8 分钟
tags: [场景, 会议]
status: published
---

开会最累的是会后整理。这一讲讲怎么把转写稿交给 AI，产出能直接发的纪要，并强调"忠实整理、不编造"的约束怎么写。一场会半小时，整理纪要可能又要耗掉半小时，这部分最该让 AI 接手——你只复核它填错的地方。省下来的时间，够你多跟两个客户聊。

先说清一个能力边界：AI 擅长"从已有文字里挑出结构"，不擅长"补全没说的话"。所以纪要这件事，它该做的是整理员，不是编剧。你要做的，是在提示词里划清这条线。

## 纪要的四段式结构

一份能用的纪要，通常就四块：结论、待办、责任人、时间。把转写稿丢进去，让它按这个骨架填，出来就清爽，不用你再从头捋。

这里用到一个很实用的概念：结构化输出（Structured Output，按固定格式如表格 / JSON 返回）。你明确要"表格、列名为事项 / 负责人 / 截止时间 / 状态"，它就老老实实往格子里填，而不是吐一段散文让你再提炼。凡是你要拿去用的东西，优先要结构化输出——这是把 AI 当工具、而不是当聊天对象的关键一步。

**怎么用到你自己工作上：** 把"结论 / 待办 / 责任人 / 时间"设成你的纪要默认骨架，每次开会都套。转写一出来就丢进去，三秒出表。你会发现自己从"会后最烦的活"里彻底解放，只剩核对那两步。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 会议纪要</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>你是一名会议记录员。请把下面的会议转写整理成纪要，分四块：结论、待办事项、责任人、截止时间。用表格呈现，列名为：事项、负责人、截止时间、状态。只忠实整理，不编造任何信息。
---
[粘贴会议转写 / 记录]
---</code></pre>
</div>

## 为什么"只忠实整理，不编造"必须写

AI 有个毛病：材料里没写清楚的，它爱帮你"补圆"。比如谁负责没明说，它可能随便安个人名；时间模糊，它可能编个日期。这句话约束能挡掉大部分这种事——你是在要一份整理稿，不是在要它创作。

这正是它最容易出"幻觉（Hallucination，模型一本正经地编内容）"的地方：纪要里它也可能编参会人、编结论、编一个听起来很合理的截止日。句子通顺、语气笃定，但全是假的。参会人一眼就能看穿，尴尬的是你。所以"只忠实整理，不编造"不是客气话，是防坑的护栏。

**怎么用到你自己工作上：** 把这句约束当成纪要提示词的固定后缀，永远带着。更进一步，材料里含糊的地方，你先自己标个"[待确认]"，它就更不会乱补。你给的边界越清，它越守规矩。

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">注意</p>
    <div class="callout__content"><p>发纪要前，把"负责人"和"时间"两列逐条核对。AI 编的名字和日期，参会人一眼就能看出来，尴尬的是你。</p></div>
  </div>
</aside>

## 人名 / 时间错的常见原因与核对法

错通常出在这几处：

- 同音字：转写把"张"听成"章"，AI 照抄。
- 时间模糊：只说"下周"，AI 可能填具体某天。
- 多人发言混在一起，责任归错人。

核对法很简单：纪要出来后，把"谁、何时、做什么"三栏对着原始记录过一遍，拿不准的标"待确认"，别让它替你定。养成这个习惯，你会发现 AI 省下的是整理时间，你守住的是不出错。人工复核（Human-in-the-loop，关键内容由人把关）在纪要场景尤其重要——它编得越像真的，你越要亲手核一遍。

**怎么用到你自己工作上：** 建一个"纪要三核对"清单：人名对不对、时间对不对、结论有没有漏。每次发前过一遍，三分钟换来零翻车。长期下来，同事会觉得你纪要又快又准，其实是你把最后的把关做扎实了。

## 会前会中做三件小事，纪要准一半

纪要质量七分靠源头，别等会后全甩给 AI。会前把议程发到群里，AI 才有"框架"可对照；会中开着转写、少插空闲聊和私下感慨，转写稿就干净；多人发言时，尽量让每个人先报名再说话（"我是小张，我认为……"），转写就能带上说话人，AI 归责任时少乱猜。这三件不费你什么事，却能把后面的"三核对"工作量砍掉一大半。

真实场景：一场一小时的需求评审，转写有三万多字。直接整段丢给 AI，它容易把后半场的责任张冠李戴。这里涉及上下文窗口（Context Window，模型一次能处理的文字长度上限）——超出部分它"看不全"，结论就会飘。稳妥做法是按议程拆成几段（背景一段、方案一段、待办一段），每段单独整理，再你手动拼回一份。分段虽然多一步，但每段都在它"看得清"的范围内，准确率明显更高。

**怎么用到你自己工作上：** 会后就两类的会最该用这招——人多、待办多的会，以及跨部门的会。前者靠分段防乱，后者靠"说话人报名"防归错人。养成习惯后，同事会以为你速记特别厉害，其实是你把脏活交给了 AI、把把关留给了自己。

<aside class="callout callout--tip" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">提示</p>
    <div class="callout__content"><p>转写稿越干净，纪要越准。开会时开着转写、少插空闲聊，事后省一半核对功夫。</p></div>
  </div>
</aside>

## 术语卡：幻觉（Hallucination）——纪要里它也可能编参会人 / 结论

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>幻觉（Hallucination，模型一本正经地编内容）是指模型为了把话接顺，凭空造出看似合理却并非事实的信息。在纪要场景里，它最常见的花样是：给没明确负责人的事项安个名字、给模糊的"下周"编个具体日期、甚至补一条会上一句没提的"结论"。防法是双重的——提示词里写死"只忠实整理，不编造"，发出前你再把"谁 / 何时 / 做了什么"三栏对着原始记录核一遍。越顺溜的内容，越要动手查。</p></div>
  </div>
</aside>

## 小结

- 纪要四段式：结论 / 待办 / 责任人 / 时间，优先要结构化输出（表格）。
- "只忠实整理，不编造"这句约束一定写上，挡掉大部分幻觉。
- 负责人和时间必须你逐条核对，拿不准标"待确认"；坚持人工复核。
- 长会议按议程分段整理，绕开上下文窗口限制，准确率更高。
- 下一讲，我们把"查资料、做对比"也交给它。
