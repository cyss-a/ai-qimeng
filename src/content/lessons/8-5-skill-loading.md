---
title: Skill：把能力打包成"可复用的模块"
module: M8
order: 5
slug: m8/8-5-skill-loading
description: 理解为什么全量塞提示词会撑爆上下文，以及"按需加载 Skill"如何把个人能力打包放大。
duration: 8 分钟
tags: [Agent, Skill, 技能]
status: published
---

把所有工作流和提示词一股脑塞给模型，听起来省事，其实是在烧钱又烧脑。Skill（技能，把一类能力整理成可随用随取的独立包）是更聪明的做法：用哪个加载哪个。这一讲讲清楚"全量塞入"的代价，以及怎么靠规范化把个人能力打包放大。

## 全量塞入 vs 按需加载

两种做法，代价天差地别：

| 做法 | 后果 |
| --- | --- |
| 全量塞入庞大工作流与提示词 | Token 成本飙升、模型注意力被稀释、容易超出上下文窗口（Context Window Limit） |
| 按需加载 Standardized Skill | 用哪个加载哪个，省 token、更聚焦、还能跨人复用 |

模型的上下文窗口是有限的"工作台面"。台面摆满了不相关的提示词，真正要用的反而被挤到边缘，模型也容易顾此失彼。Skill 的思路是：台面平时只留清单，干活时再把手边那本手册取下来。

## 真实例子：周报技能，用完还能分享

你做"周报生成"时，只需加载周报技能，不用把"写代码""查合同""做图"全背在上下文里。更妙的是，规范化之后，这个周报技能可以分享给同事——他直接装上就能用，不用从头教。一个人的经验，被打包成了一个可复用的模块。从散装提示词，到标准技能包，再到生态分发复用，能力就这样被放大了。

一句话金句：**规范化之后，个人的能力可以被打包放大。**

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>Skill（技能）是组织层 Orchestration 的载体，解决的是"什么时候加载什么"的调度问题。它把一类相关能力（提示词、工具调用步骤、示例）收进一个独立包，用时才调入上下文。和 Tool 的区别：Tool 是"单个动作"，Skill 是"一组为了完成某类任务的动作与知识的组合"。Skill 管编排，Tool 管执行。</p></div>
  </div>
</aside>

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>技能边界划得太粗，是新手最容易犯的错：一个技能里塞了"写周报、做 PPT、回邮件"十件事，等于又回到全量塞入，既占上下文又让模型分不清该用哪段。好的技能只解决一类明确任务。宁多不少——把一个大包拆成几个小包，比塞成一个大杂烩强得多。</p></div>
  </div>
</aside>

## 把一个重复任务整理成 Skill

想沉淀自己的第一个技能，可以用下面这个模板让模型帮你拆解：

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 把重复任务拆成 Skill</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>我每周都要做一件重复的事：[比如把本周工作整理成给老板的周报]。请帮我把它拆成一个标准 Skill 包，包含：
1. 这个技能的明确适用范围（一句话）；
2. 触发它该用的关键词；
3. 需要给模型的固定提示词框架；
4. 可能要调用的 1-2 个 Tool；
5. 一个输入输出示例。要求边界清晰，只解决这一件事。</code></pre>
</div>

## 小结

- 全量塞入提示词会撑爆上下文窗口：Token 贵、注意力散、易超限。
- Skill 是组织层载体，把一类能力打包成"用时才加载"的独立模块。
- 和 Tool 的区别：Tool 是单个动作，Skill 是一组动作与知识的组合，管编排。
- 技能边界要划细，一个技能只解决一类明确任务，别塞成大杂烩。
- 规范化之后，个人能力可以被打包、分享、放大——这就是 Skill 的终极价值。
