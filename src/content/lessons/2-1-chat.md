---
title: 聊天助手怎么用最顺手
module: M2
order: 1
slug: m2/2-1-chat
description: 把聊天助手变成日常搭子：连续对话、让它追问、让它记住规矩，而不是每次从零开始。
duration: 8 分钟
tags: [工具, 聊天]
status: published
---

很多人用聊天助手像用搜索引擎：输一句、收一句、关掉。这一讲讲几个让它"更像一个长期搭子"的小习惯——连续对话、让它先追问再答、把你的偏好存成固定开头。搜索引擎用完就忘，但它有"上下文（Context，模型一次对话里能记住的你之前说的话）"，用好了，它越来越懂你的场景。

## 别每次都从头讲背景

搜索引擎用完就走没关系，但聊天助手记得住"上文"。你先说"我是做运营的，经常要给老板发周报"，后面再让它写周报，它就默认按这个场景来，不用你每回重讲。这背后是"多轮对话（Multi-turn Dialogue，在同一段会话里连续交流、前后呼应）"的能力——它把前面的话当成理解后面的依据。

比如你先交代一句"我们公司叫晨光，做办公文具，老板看重数据不看废话"，之后让它"把这段改成周报"，它自动就会往"数据 + 结论"的方向靠。把背景一次性讲清，后面省下的是反复拉扯的时间。新手常错在：每次打开都重新描述公司，结果它每次给的都不贴手。背景讲一次，管这一整段对话。

## 让它先问清再动手

你含糊地说"帮我写个群通知"，它只能给你一个通用模板，你还得大改。更好的办法是反过来：先让它提问。

直接说"我想发个端午放假通知，你先问我几个关键信息再写"。它会追出放假起止、值班安排、紧急联系人这些要点，你答完，它一次写出来的东西就能直接用。省下的返工，比你多打几行字划算得多。原理是：你给的约束越具体，它接话茬的范围越窄，出错越少。

<aside class="callout callout--tip" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">提示</p>
    <div class="callout__content"><p>拿不准要给它什么信息时，就让它"先列三个需要确认的问题"。这比你自己硬想要周全快，也更能逼出你本来没想到要说的细节。</p></div>
  </div>
</aside>

## 术语卡：上下文（Context）与多轮对话

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>上下文（Context，模型一次能"看到"的文本，包括你前面的所有对话）决定了它懂不懂你的背景。多轮对话（Multi-turn Dialogue）就是在这个上下文里连续聊，让它越聊越懂你。要注意：上下文有长度上限（叫上下文窗口，Context Window），聊太长前面的话会被"忘掉"；而且开"新对话"会清空上下文，所以它记不住你上礼拜说过啥——要长期规矩，得靠你自己存成开头模板。</p></div>
  </div>
</aside>

## 把常用要求存成开头模板

有些要求你每回都要说：语气正式、别超过 200 字、用表格呈现、不要编造数据。与其每次手打，不如存一段固定开头，用时改改内容就发出去。这等于把"背景 + 规矩"一次性喂进上下文，后面每回都继承。

下面这个模板可以直接复制，按你的岗位替换括号里的内容：

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 长期搭子开头</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>你是我固定的办公搭子。我是[岗位]，常做[周报/群通知/会议纪要]这类事。请默认：语气[正式但亲切]、关键内容用表格、不编造任何数字和事实、涉及数据请提醒我自行核对。下面是我这次的需求：
---
[你的具体任务]
---
</code></pre>
</div>

## 长期搭子开头的边界

这套用法很省事，但也有边界：上下文只在"当前这段对话"里有效，你关掉重开，它就不记得你是晨光公司了；而且它记的是你这回说的事，不是"你这个人"的长期档案。所以两类信息要分开存：

- **一次性背景**（这次要整理的会议、这份要改的稿）：直接贴在对话里。
- **长期规矩**（语气、格式、别编数据）：存成你自己的模板文本，每次新对话开头先贴一遍。

别指望它"越用越懂你"像真人同事——它的记忆是每段对话重新开始的。把规矩固化进你的模板，才是稳定提效的关键。

## 一个具体用法：把"周报搭子"养熟

拿周报举例。第一回你交代："我是运营，每周五给老板发周报，老板只看数据和结论，不爱看过程。"它记住了这个背景。接下来四周，你只要贴"本周做了 A、B、C 三件事，数据分别是……"，它就按"数据 + 结论"的格式出稿，你几乎不用改。这就是"工作流（Workflow，把一组固定步骤串起来重复跑）"的雏形——背景讲一次，后面每次只喂新料。

新手常犯的反例：每次打开都写"帮我写个周报"，不交代任何背景，于是它每次都给你一套花哨但空的模板，你还得重说一遍公司情况。差距不在工具，在"你有没有把背景沉淀下来"。

<aside class="callout callout--tip" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">提示</p>
    <div class="callout__content"><p>如果一段对话越聊越长、它开始"记混"前面的要求，别硬撑。把你的开头模板 + 这次的新料，复制到一个新对话里重开，往往比在旧对话里反复纠正更干净。</p></div>
  </div>
</aside>

再给一个场景：你要写一条给下属的绩效反馈，拿不准语气。先说"我要给下属写绩效反馈，担心太软或太硬，你先问我三个问题再动笔"。它追问"他哪方面待改进""你们关系如何""公司有无模板"，你答完，出来的反馈比你自己憋的更稳妥。追问不是麻烦，是它替你补全你没说出口的背景。

## 常见疑问：它答非所问怎么办？

大概率是上下文被无关内容带偏了。两种解法：一是开个"新对话"重来，清掉干扰；二是在这句前面补一句"回到刚才的需求：……"把它拉回主线。别跟一段已经跑偏的对话死磕，重开成本最低。

## 小结

- 连续对话靠"上下文"，别每次从零讲起。
- 让它先追问再写，比含糊下令少返工。
- 把常用要求存成开头模板，复用最省事；但记住上下文只管当前对话。
- 下一讲我们看办公软件里自带的 AI，不装新工具也能提效。
