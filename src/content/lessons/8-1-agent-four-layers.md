---
title: Agent 四层技术栈：给大模型装上"手脚"
module: M8
order: 1
slug: m8/8-1-agent-four-layers
description: 用"老板与团队"的比喻，看懂 Agent 的四层分工：决策、协议、执行、组织。
duration: 8 分钟
tags: [Agent, 架构, 智能体]
status: published
---

大模型本身像个"只动嘴不动手的老板"：它能出主意、写方案，但没法自己打开网页、查数据库、发邮件。Agent（智能体，能自主调用工具完成任务的 AI 系统）之所以能真正干活，是因为有人在它底下补了三层"辅助班子"。这一讲先把整张架构图立起来，让你知道每一层到底在忙什么。

## 四层技术栈：各管一摊

把 Agent 拆成四层，每层只负责一件事，彼此接力：

| 层级 | 角色 | 负责什么 |
| --- | --- | --- |
| 决策层 Decision | 大模型 LLM | 读懂需求，生成"我该做什么"的结构化意图 |
| 协议层 Protocol | Function Calling | 规定意图的书写格式，让模型输出能被程序读懂 |
| 执行层 Execution | Tool + MCP | 真正去跑代码、调接口、碰外部世界 |
| 组织层 Orchestration | Skill | 按需把相关能力打包加载，避免一次性塞太多 |

可以这样想一个公司：老板（LLM）只发指令；秘书（Function Calling）把指令写成标准工单；员工（Tool）在本地执行，或经"外接办公室"（MCP）去对接外部服务；而 Skill 像挂在墙上的标准作业手册，遇到对应任务才取下来用。决策、协议、执行、组织，四层各司其职，才让"动嘴的老板"变成了"能办事的团队"。

## 真实例子：一句话查气温，背后四层接力

你说"帮我查东京现在多少度"。老板 LLM 不会自己联网，它产出一张工单：调用天气工具、地点东京。秘书按格式把工单递出去，执行层真的去查了，把"28℃"拿回来交给老板，老板再组织成一句人话回你。整条链路就是这四层在接力——你只看到最后那句回答，底下已经跑完一整套分工。

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>Agent（智能体）和 LLM（大语言模型）不是一回事。LLM 只是会读会写文字的"大脑"；Agent 是在这个大脑外面，套上了协议、工具、技能这套班子的完整系统——它能把"想法"变成"动作"。你可以记住：LLM 负责想，Agent 负责办。没有后面三层，LLM 永远只是个动嘴的老板。</p></div>
  </div>
</aside>

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>最常见的新手误会，是把 LLM 当成 Agent 用，指望它自己联网查实时股价、实时天气。它不会，也做不到——它只会一本正经地编一个看起来合理的数据。凡是"要碰外部世界"的事，都必须走下面三讲说的协议、工具、连接，别让模型凭空答。</p></div>
  </div>
</aside>

## 一句话让模型产出结构化意图

想验证这套四层模型，最便宜的入口是先让模型学会"只输出意图、不自己编"。下面这个模板可以直接复制去试：

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 训练模型输出结构化意图</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>你是一个只做规划的助手。用户提出需求时，你不要直接回答内容，只输出一段 JSON，说明"该调用哪个工具、传什么参数"。可用工具：get_weather（参数 location）、send_email（参数 to、body）。如果用户问题不需要工具，输出 {"action":"chat"}。
---
用户：东京现在气温多少？
---</code></pre>
</div>

## 小结

- Agent = 决策层（LLM）+ 协议层（Function Calling）+ 执行层（Tool / MCP）+ 组织层（Skill）。
- LLM 负责"想"，Agent 负责"办"；没有后三层，模型永远只是动嘴的老板。
- 一句用户提问，背后是四层接力把意图变成动作再变回人话。
- 别指望 LLM 自己联网查实时数据，那一步必须交给工具执行。
- 下一讲，我们钻进协议层，看 Function Calling 到底怎么把"想法"翻译成"工单"。
