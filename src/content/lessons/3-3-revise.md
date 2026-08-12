---
title: 让 AI 改稿而不是瞎写
module: M3
order: 3
slug: m3/3-3-revise
description: 最好的用法是"你写初稿，它来改"。这讲讲怎么把 AI 当编辑，而不是当枪手，产出才靠谱。
duration: 8 分钟
tags: [提示词, 改稿]
status: published
---

完全交给 AI 写，容易空、容易错。更稳的做法是你先写，让它改。这一讲讲"给初稿 + 给标准 + 给修改方向"的改稿提示词怎么写，以及为什么"人写机改"比"机写人抄"靠谱得多。

先搞清一个前提：模型一次能处理的文字量是有上限的，这个上限叫上下文窗口（Context Window，模型一次能"看到"的最大文本量）。它不像人，能记住你三天前说过的话——你这次没贴进来的东西，它就真的"看不见"。所以改稿时，初稿必须原样贴回去，别只说"把我之前写的那段改一下"，否则它根本不知道"那段"长什么样。把"你写初稿、它来改、一轮轮逼近定稿"的循环画成一张图，会看得更清楚：

<div class="mindmap" role="img" aria-label="改稿迭代循环思维导图">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 664 448" width="100%" role="img" aria-label="改稿迭代循环思维导图">
  <g fill="none" stroke-width="2" stroke-linecap="round">
    <path d="M212,224 C236,224 236,105 260,105" stroke="var(--mindmap-b1-line)"/>
    <path d="M394,105 C446,105 447,96 499,96" stroke="var(--mindmap-b1-line)"/>
    <path d="M394,105 C446,105 447,142 499,142" stroke="var(--mindmap-b1-line)"/>
    <path d="M212,224 C236,224 236,197 260,197" stroke="var(--mindmap-b2-line)"/>
    <path d="M447,197 C473,197 473,188 499,188" stroke="var(--mindmap-b2-line)"/>
    <path d="M447,197 C473,197 473,234 499,234" stroke="var(--mindmap-b2-line)"/>
    <path d="M212,224 C236,224 236,289 260,289" stroke="var(--mindmap-b3-line)"/>
    <path d="M407,289 C453,289 453,280 499,280" stroke="var(--mindmap-b3-line)"/>
    <path d="M407,289 C453,289 453,326 499,326" stroke="var(--mindmap-b3-line)"/>
    <path d="M212,224 C236,224 236,381 260,381" stroke="var(--mindmap-b4-line)"/>
    <path d="M394,381 C446,381 447,372 499,372" stroke="var(--mindmap-b4-line)"/>
    <path d="M394,381 C446,381 447,418 499,418" stroke="var(--mindmap-b4-line)"/>
  </g>
  <rect x="40" y="188" width="172" height="72" rx="16" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="1.5"/>
  <text x="126" y="218" text-anchor="middle" dominant-baseline="central" font-size="16" font-weight="600" fill="var(--fg)">改稿迭代循环</text>
  <text x="126" y="241" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--muted)">Revise Loop</text>
  <rect x="260" y="86" width="134" height="38" rx="19" fill="var(--mindmap-b1)"/>
  <text x="327" y="105" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">初稿 Draft</text>
  <rect x="499" y="82" width="121" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="559" y="96" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">你写事实与意图</text>
  <rect x="499" y="128" width="121" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="559" y="142" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">初稿贴全不摘要</text>
  <rect x="260" y="178" width="187" height="38" rx="19" fill="var(--mindmap-b2)"/>
  <text x="353" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">给反馈 Feedback</text>
  <rect x="499" y="174" width="107" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="552" y="188" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">说清修改方向</text>
  <rect x="499" y="220" width="121" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="559" y="234" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">一次只给一目标</text>
  <rect x="260" y="270" width="147" height="38" rx="19" fill="var(--mindmap-b3)"/>
  <text x="333" y="289" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">修改 Revise</text>
  <rect x="499" y="266" width="107" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="552" y="280" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">它改措辞结构</text>
  <rect x="499" y="312" width="94" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="546" y="326" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">你核对事实</text>
  <rect x="260" y="362" width="134" height="38" rx="19" fill="var(--mindmap-b4)"/>
  <text x="327" y="381" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">定稿 Final</text>
  <rect x="499" y="358" width="90" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="544" y="372" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">再改一轮</text>
  <rect x="499" y="404" width="94" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="546" y="418" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">发出前复核</text>
</svg>
</div>

## 为什么"你写它改"更稳

AI 不知道你真实的业务细节、内部口径、这件事背后的来龙去脉。它替你从零写，很容易写得"都对、但都不沾边"——结构漂亮，内容却和你的情况对不上。而你最清楚要表达什么，把它当编辑，比当枪手靠谱。

打个比方：你让一个没参会的人帮你写会议纪要，他只能凭你口头描述编，编出来的多半"像那么回事"却漏了关键结论；但如果你把录音给他、让他整理，他就准了。写稿同理——你提供"事实与意图"，它负责"打磨与排版"，分工最稳。

一句话分好工：你负责"说什么"，它负责"说得好"。这样既保住你的判断，又省下改措辞、调结构的时间。

**怎么用到你自己工作上：** 别一上来就甩一句"帮我写个方案"。先把你脑子里最关键的几点列成粗糙初稿，哪怕只有半页、满是口语，再交给它润色成正式稿。你的"粗糙"里有真信息，它的"流畅"里有好表达，合起来才既对又好看。

## 改稿提示词的三段式

把初稿、标准、方向一次给它，它改得准：

1. 初稿：把你已经写的内容贴进去（记得贴全，别只给摘要）。
2. 标准：要什么效果——"更简洁""更正式""更有说服力"。
3. 方向：具体改哪——"第二段的理由再补一条""开头加一句背景"。

这三段里，"方向"最容易被忽略，却最关键。你不指方向，它就按自己理解大改，常常把你满意的部分也顺手删了。

**怎么用到你自己工作上：** 改稿前先自己读一遍初稿，标出"哪里最不满意"。把那几条写成明确的修改指令，比笼统说"改好一点"强十倍。比如"结尾那句口号式的表达去掉，换成一句具体的行动号召"。

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">注意</p>
    <div class="callout__content"><p>别让它在"润色"时偷偷加事实。凡是它新写进来的数字、人名、引用，发出前都要你核对一遍——"改稿"和"编稿"只差一句话。它一焦虑想让文章更"饱满"，就可能编点论据填进去。</p></div>
  </div>
</aside>

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 改稿三段式</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>你是一名编辑。下面是我写的初稿。请在不改变原意的前提下改写：语气更正式一些，删掉啰嗦的铺垫，把第三段压缩成两句话。不要新增我没说过的事实。
---
[粘贴你的初稿]
---</code></pre>
</div>

## 多轮改稿：一次一个目标

别一上来就说"全都改好"。一次给一个明确目标，改完看一眼，再给下一个，质量稳定得多。比如第一轮只调语气，第二轮再压字数，第三轮才管结构。目标越窄，它越不会顾此失彼。

这和科学里的"温度（Temperature，控制输出随机度的旋钮）"也有关：你让它大改，等于放开它的随机性，它更容易发挥过头；你让它"只做一件事"，等于把温度调低，它更守规矩。所以"窄指令"不只是省事，也是让结果更可控的办法。

**怎么用到你自己工作上：** 把一篇重要稿子的打磨拆成三轮对话，而不是一轮搞定。第一轮定语气，第二轮砍字数，第三轮查事实。每轮结束你都看一眼，发现问题立刻在下一轮纠正。这样比"一次性扔出去再返工"稳得多，也更好控。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 单目标改稿</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>你是一名编辑。请只做一件事：把下面这段的语气改得更亲切、像同事之间说话，其他都不要动。
---
[粘贴段落]
---</code></pre>
</div>

## 改稿时最该警惕的三种"偷偷加料"

你让它"润色一下"，它为了文章更饱满，可能背着你加东西。三种最常出现：

- **加数字**：你原文没写具体增长，它补个"增长约 30%"让文章更有力——这个数它编的。
- **加引用**："正如某报告指出的……"它顺手造了个听起来权威的来源，实则查无此文。
- **加事实**：把"我们服务过几家企业"扩成"我们服务过 200 家行业头部企业"，量级凭空放大。

防法是给它上一道箍：在提示词里写"不要新增任何我没写过的数字、人名、引用；如要补充，请明确标注'以下为建议补充，待你核实'"。这样它要么不动，要么把新增的亮出来给你审，而不是混进正文。

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">注意</p>
    <div class="callout__content"><p>定稿前做最后一次"事实扫描"：从头扫一遍有没有它新塞进来的数字和名字。发出去署名的是你，背锅的也是你——"改稿"和"编稿"只差你一眼。</p></div>
  </div>
</aside>

还有一个小技巧：每轮改完，对照你最初的初稿扫一眼"它有没有把我原意改偏"。比如你写"我们争取下季度上线"，它改成"我们下季度一定上线"——"争取"变"一定"，承诺被它擅自加重，发出去就是你的锅。改稿时守住"原意不动"，是底线。

## 术语卡：上下文窗口（Context Window）——改稿时别忘了贴回原文

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>上下文窗口（Context Window，模型一次能"看到"的最大文本量）就像它眼前那张一次性能铺开看的"工作台"。超出这个量的内容，它看不到也记不住。改稿时要贴回原文，否则它会"忘了"前面的要求——你只说"把我那段改短"，它却不知道"那段"在哪儿、写了啥，只能凭空编一版。所以多轮改稿时，要么把原文和前面的要求一起贴回，要么就在同一段对话里继续，让它还"记得"。</p></div>
  </div>
</aside>

## 小结

- 你写初稿、它来改，比它从零写更稳，也更适合你的真实情况。
- 改稿提示词 = 初稿 + 标准 + 方向，三段一次给齐，初稿要贴全。
- 多轮改，一次一个目标，别贪多；窄指令让结果更可控。
- 它润色时可能偷偷加事实，发出前你逐条核对。
- 这一讲收住 M3：四要素、四种套路、改稿心法都齐了。下一模块我们进真实场景，看看这些怎么落进邮件、会议和汇报里。
