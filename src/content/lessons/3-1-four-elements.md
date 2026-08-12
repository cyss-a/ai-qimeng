---
title: 提示词四要素
module: M3
order: 1
slug: m3/3-1-four-elements
description: 提示词不是咒语，是把需求说清楚。记住四个要素——角色、任务、上下文、格式与约束，你写的东西就会明显更好用。
duration: 11 分钟
tags: [提示词, 入门]
status: published
---

很多人觉得"提示词"是门玄学，要背一堆模板、记一堆咒语。其实没那么复杂。提示词（Prompt，你写给 AI 的指令）说白了就一句话：**把你的需求，清楚地告诉一个不太了解你、但很听话的助手。** 你雇过新人就知道，背景标准不讲清，交来的东西就总差口气。AI 也一样——它读得多，却对你的公司、项目、读者一无所知；你讲清，它才接得住。所以这一讲不教"咒语"，只教你怎么把模糊的念头，拆成它能听懂的指令。

只要把一个请求拆成四个要素，你写出来的东西就会好用很多。这四要素是：**角色、任务、上下文、格式与约束。** 下面一个个拆开讲，每个都配上对比示例和"怎么用到你自己工作上"的落点。先用一张图把四要素的关系摆清楚：

<div class="mindmap" role="img" aria-label="提示词四要素思维导图">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 637 448" width="100%" role="img" aria-label="提示词四要素思维导图">
  <g fill="none" stroke-width="2" stroke-linecap="round">
    <path d="M212,224 C236,224 236,105 260,105" stroke="var(--mindmap-b1-line)"/>
    <path d="M381,105 C433,105 434,96 486,96" stroke="var(--mindmap-b1-line)"/>
    <path d="M381,105 C433,105 434,142 486,142" stroke="var(--mindmap-b1-line)"/>
    <path d="M212,224 C236,224 236,197 260,197" stroke="var(--mindmap-b2-line)"/>
    <path d="M381,197 C433,197 434,188 486,188" stroke="var(--mindmap-b2-line)"/>
    <path d="M381,197 C433,197 434,234 486,234" stroke="var(--mindmap-b2-line)"/>
    <path d="M212,224 C236,224 236,289 260,289" stroke="var(--mindmap-b3-line)"/>
    <path d="M434,289 C460,289 460,280 486,280" stroke="var(--mindmap-b3-line)"/>
    <path d="M434,289 C460,289 460,326 486,326" stroke="var(--mindmap-b3-line)"/>
    <path d="M212,224 C236,224 236,381 260,381" stroke="var(--mindmap-b4-line)"/>
    <path d="M407,381 C446,381 447,372 486,372" stroke="var(--mindmap-b4-line)"/>
    <path d="M407,381 C446,381 447,418 486,418" stroke="var(--mindmap-b4-line)"/>
  </g>
  <rect x="40" y="188" width="172" height="72" rx="16" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="1.5"/>
  <text x="126" y="218" text-anchor="middle" dominant-baseline="central" font-size="16" font-weight="600" fill="var(--fg)">提示词四要素</text>
  <text x="126" y="241" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--muted)">Prompt</text>
  <rect x="260" y="86" width="121" height="38" rx="19" fill="var(--mindmap-b1)"/>
  <text x="320" y="105" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">角色 Role</text>
  <rect x="486" y="82" width="94" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="533" y="96" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">身份与视角</text>
  <rect x="486" y="128" width="107" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="539" y="142" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">专业度与语气</text>
  <rect x="260" y="178" width="121" height="38" rx="19" fill="var(--mindmap-b2)"/>
  <text x="320" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">任务 Task</text>
  <rect x="486" y="174" width="90" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="531" y="188" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">动词开头</text>
  <rect x="486" y="220" width="90" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="531" y="234" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">明确标准</text>
  <rect x="260" y="270" width="174" height="38" rx="19" fill="var(--mindmap-b3)"/>
  <text x="347" y="289" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">上下文 Context</text>
  <rect x="486" y="266" width="90" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="531" y="280" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">读者是谁</text>
  <rect x="486" y="312" width="94" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="533" y="326" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">红线与用途</text>
  <rect x="260" y="362" width="147" height="38" rx="19" fill="var(--mindmap-b4)"/>
  <text x="333" y="381" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">格式 Format</text>
  <rect x="486" y="358" width="94" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="533" y="372" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">表格/分点</text>
  <rect x="486" y="404" width="90" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="531" y="418" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">长度约束</text>
</svg>
</div>

## 要素一：角色——给它一个身份

在开头告诉它"你现在是某某角色"，它的语气、专业度和侧重点会立刻贴合场景。

- 写邮件：*"你是一名资深的行政助理……"*
- 做技术分析：*"你是一名有十年经验的数据分析师……"*
- 给老板汇报：*"你是一名擅长向上沟通的职场教练……"*

同一个问题，让"实习生"和"十年老手"来答，厚度不一样。角色像一副专业眼镜，让它答得更聚焦、更少外行话。

**怎么用到你自己工作上：** 先想"这件事谁最该做"——助理、专家、还是教练？把这个角色写进第一句。比如给客户写延期说明，开头写"你是一名客户关系经理"，它自然更体贴、更兜底，而不是冷冰冰甩一句"项目延期"。角色选错，基调就歪。

## 要素二：任务——说清"你要它做什么"

用动词开头，越具体越好：**改写、整理、对比、列出、翻译成、挑错**。避免"帮我看看"这种模糊说法——"看看"讲不清要它做什么、做到什么程度。

- ✗ 模糊："帮我看看这段写得怎么样"
- ✓ 明确："把下面这段改得更适合发在公司群里，语气正式但亲切，控制在 120 字以内"

注意差别：左边那句，它大概率回"这段写得不错，建议……"——可你要的是改写稿，它却只给点评。右边那句，动作（改）、场景（公司群）、标准（正式但亲切 + 120 字）三样齐全。写任务前，先在心里补完"动词 + 对象 + 标准"。

**怎么用到你自己工作上：** 把"动词 + 对象 + 标准"当固定句式。比如不要写"帮我写个开场白"，而是"写一段 30 秒的会议开场白，点明今天要拍板的两件事"。动词越利落，它越不跑偏；标准越明确，你返工越少。

## 要素三：上下文——给背景，少让它猜

它不了解你的公司、读者、限制。把这些直接给它，它就不用瞎编——而瞎编恰恰是它最容易出丑的地方（行业里叫"幻觉"，Hallucination，模型一本正经地编内容）。

常见的背景包括：

- 读者是谁（老板 / 客户 / 同事）
- 用途是什么（群通知 / 周报 / 对外稿）
- 有哪些不能碰的红线（字数、口径、保密）

打个比方：你让同事"帮我回下那个邮件"，他若不知道是谁、说的啥、对方什么脾气，也只能瞎回。上下文，就是把前因后果补给他，他才接得住；你不给背景，AI 就按"通用情况"猜，猜错是你背锅。

**怎么用到你自己工作上：** 把"读者 + 用途 + 红线"当固定检查项。发对外稿，补"读者是不懂技术的客户，避免术语"；发内部群，补"同事都知情，可直说"；涉密，补"以下信息需脱敏"。背景给足，它编错的概率降一截。

## 要素四：格式与约束——你要什么"样子"

告诉它输出的形状，你就不用再二次整理。人爱固定的"容器"，AI 尤其吃这套——你给框，它就往里填；不给框，它就按自己舒服的方式写散文。

- "用表格，列名是……"
- "分三点，每点一句结论 + 一句理由"
- "先给结论，再给步骤"

一个常见翻车：你不指定格式，它回一大段散文，重点藏在第三句，你还得自己再提炼一遍。指定格式，等于替自己省了这道工；约束还能管"不要做什么"，比如"不要新增我没说过的数字"，边界写清，它少犯错。

**怎么用到你自己工作上：** 凡是你要拿去用的东西，先想"我最后要什么形状"。要对比就"用两列表格"；要汇报就"先结论后三点"；要让人照做就"分步骤、每步一行"。格式写清，成品几乎直接能用，你只做最后把关。

<aside class="callout callout--tip" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">提示</p>
    <div class="callout__content"><p>四要素不是每次都要写满。临时问一句话，给个任务就行；但凡结果不如意，多半是"上下文"或"格式"没说清，补这两条最有效。</p></div>
  </div>
</aside>

## 四要素怎么排优先级（新手最简心法）

四要素不是每次都要写满，但优先级有讲究。给你一条最简心法：**"任务"是底线，必须有；"角色"和"格式"是提分项，想要更贴手就加上；"上下文"是防翻车的，但凡结果跑偏，先回来补它。**

举个具体例子。你要写一封给客户的延期说明：

- 只写任务："写一封项目延期的说明" → 它给你一封冷冰冰、像系统自动发的通知。
- 加角色："你是一名客户关系经理" → 语气立刻变体贴、会兜底。
- 加上下文："客户是合作三年的老客户，别用太官方的话术" → 它知道该走亲切路线，而不是甩模板。
- 加格式："分两段：先致歉说明原因，再给新的时间表" → 你拿到几乎直接能发。

你看，同样是"写延期说明"，四要素加得越全，你返工越少。新手别追求一次写满，先保证"任务 + 上下文"这两条，效果就已经甩"帮我写个东西"十条街。

再补一句关于"格式"的提醒：很多人嫌写格式麻烦，结果它回一大段散文，重点埋在第三句，你又得自己提炼。其实"格式"是最好的省工开关——你说"用两列表格：问题 / 我的应对"，它填进去，你几乎零二次整理。多写五个字的要求，省下五分钟的返工。

## 术语卡：提示词（Prompt）——它到底指什么

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>提示词（Prompt，你写给 AI 的指令）不是"咒语"，而是你和模型之间的沟通界面：你写下的每句话，都会变成它预测下一个字的依据。写好提示词的本质，是把你默认知道、却没说出口的背景与标准，显式交代给它。它越清楚你要什么，越不需要靠猜——而猜，正是幻觉和跑题的开始。</p></div>
  </div>
</aside>

## 对照看看：差在哪

下面这组对比，左边是新手常写的，右边是加上四要素后的。点开看看差别。

<details class="collapse">
  <summary class="collapse__summary">
    <span class="collapse__title">展开：错误提示词 ↔ 正确提示词</span>
    <span class="collapse__chevron"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
  </summary>
  <div class="collapse__content">
    <p><strong>✗ 错误（只有任务，缺角色 / 上下文 / 格式）：</strong></p>
    <div class="prompt-card">
      <div class="prompt-card__head"><span class="prompt-card__title">反面示例</span></div>
      <pre class="prompt-card__code"><code>帮我写个会议纪要。</code></pre>
    </div>
    <p>它会回一段"通用会议纪要模板"，跟你这场会没关系，你还得自己往里填。</p>
    <p><strong>✓ 正确（四要素齐全）：</strong></p>
    <div class="prompt-card">
      <div class="prompt-card__head"><span class="prompt-card__title">正面示例</span></div>
      <pre class="prompt-card__code"><code>你是一名会议记录员。请把下面的会议录音整理成纪要，读者是没参会的同事。输出用表格，列名为：结论、负责人、截止时间、待确认事项。只忠实整理，不编造。
---
[粘贴会议记录]
---</code></pre>
    </div>
    <p>同样的活，右边一次就能直接用，左边还要返工两三轮。</p>
  </div>
</details>

## 一个能反复用的万能骨架

把下面这个骨架存起来，每次换掉括号里的内容就行：

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 万能四要素骨架</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>角色：你是一名[角色]。
任务：[你要它做什么，用动词开头]。
上下文：[读者是谁、用途是什么、有什么红线]。
格式：请按[想要的格式]输出。
---
[贴上你的原始材料]
---</code></pre>
</div>

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">注意</p>
    <div class="callout__content"><p>四要素里的"原始材料"如果涉及机密或隐私，先脱敏再粘贴。把公司未公开数据直接粘进公开工具，是职场用 AI 最常见的坑。</p></div>
  </div>
</aside>

## 小结

- 提示词 = 角色 + 任务 + 上下文 + 格式与约束，本质是把需求讲清楚，不是背咒语。
- 角色决定基调，任务要动词开头，上下文少让它猜，格式决定你还要不要二次整理。
- 结果不如意，先补"上下文"和"格式"两条。
- 下一讲我们讲四种最常用的提示词套路，直接能套。
