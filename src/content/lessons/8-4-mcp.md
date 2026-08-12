---
title: MCP：给工具接上"通用插座"
module: M8
order: 4
slug: m8/8-4-mcp
description: 搞懂传统 N×M 集成有多乱，以及 MCP 靠"能力自描述"如何实现握手、发现、决策三步闭环。
duration: 9 分钟
tags: [Agent, MCP, 协议]
status: published
---

如果每个软件都要单独写对接代码，世界会乱成什么样？MCP（Model Context Protocol，模型上下文协议）就是来终结这种混乱的"通用插座"。这一讲先看传统集成为什么痛，再看 MCP 怎么用"能力自描述"把乱局理顺。

## 传统痛点是 N×M 混乱集成

想象一下：Cursor、Windsurf、Bolt.new 这三个 AI 编辑器，都要对接同一套企业 ERP 接口。按老办法，每对组合都得重写一遍对接代码——3 个客户端 × 1 套 ERP = 3 份重复开发，而且各家格式不统一，换一个 ERP 又得重来。客户端越多、服务端越多，重复量就是 N×M 地涨，没有统一标准，全靠硬编码。

MCP 的解法叫"能力自描述"：服务方自己说清楚"我能提供哪些工具、哪些数据、怎么调"，客户端运行时直接读这份清单，不用把接口写死在代码里。新增一个能力，不用改一行对接代码。

## 三步闭环：握手、发现、决策

1. 握手与初始化（Handshake）：MCP Server 主动给 Client 发一份标准化的能力清单。
2. 动态发现（Discover）：客户端在运行时感知有哪些可用工具、提示词、数据源，新增能力即时可见。
3. 实时决策（Decide）：模型按用户需求，自主挑最合适的一个去调。

整个流程是：MCP Server（自描述能力清单）→ 握手 → Client 动态发现 → 模型实时决策 → 调用。模型不再被"你提前写死了什么"限制，而是面对一个随时可感知的"武器库"。

## 真实例子：装一个新服务，Agent 立刻"多了一项本领"

你新装了一个查公司合同的 MCP 服务。不用改任何代码，Agent 立刻"知道"自己多了"搜合同"的能力；用户问"上季度签了哪几份大单"，模型自动选它去查，而不是你提前在代码里写死"如果用户问合同就用 X 接口"。这就是动态发现的价值——能力随接随用。

## 真实例子：Claude Code 里的 MCP 工具

Claude Code 是一个具体的 Agent 编辑器。当你给它安装一个定位 MCP 服务后，它会自动在工具列表里多出一项"定位工具（MCP）"。你加载一个"出门清单助手"Skill 后问"我要出门该带什么"，Claude Code 不需要你提前写死"先调定位、再调天气"，而是：

1. 从 MCP Server 读取能力清单，知道自己有定位工具；
2. 根据 Skill 里的执行步骤，决定先调用定位；
3. 拿到经纬度后，再决定下一步调天气或店铺搜索。

这里 MCP 解决的是"工具怎么被标准化地接进来"，Function Calling 解决的是"模型怎么发出调用指令"，Skill 解决的是"按什么剧本编排调用顺序"。三者分工明确，才让一句自然语言能驱动多个外部工具自动接力。

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>MCP（Model Context Protocol，模型上下文协议）把"工具怎么接"标准化了，类比 USB-C：不同设备插同一个口都能用，不用每种组合单独做一根线。Server 是能力提供方（比如一个暴露"查合同"功能的服务），Client 是消费方（你的 Agent 编辑器）。有了这套协议，客户端和服务端从 N×M 的乱麻，变成"都遵守同一套插头标准"的清爽对接，并和 Function Calling 分工：Function Calling 负责"模型怎么把意图格式化成调用指令"，MCP 负责"工具怎么被标准化接进来、被动态发现"——前者在模型侧，后者在连接侧，两者接力而非替代，MCP 接好的工具最终还是经由 Function Calling 交给模型去挑选。</p></div>
  </div>
</aside>

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>MCP 让 Agent 直接摸到你的系统和数据，权限很大。接来路不明的 MCP Server，等于把钥匙直接交给陌生人——它能读你文件、调你接口。只接来源可信、能力清单读得懂的服务，别为了省事接一个不知道背后干啥的连接器。这和"只装可信软件"是同一个安全常识。</p></div>
  </div>
</aside>

## 评估团队该不该上 MCP

落地前，可以先用下面这个模板让模型帮你梳理优先级：

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 评估 MCP 接入优先级</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>我们团队常用的系统有：CRM、企业网盘、内部 ERP、代码仓库。请按"接入 MCP 后收益最高、且数据敏感度可控"的原则，排出最该先接的三个系统，并说明每个系统接入后能让 Agent 多做什么、需要注意什么权限边界。</code></pre>
</div>

## 小结

- 传统集成是 N×M 混乱：每个客户端对每个服务端都要重写对接代码。
- MCP 用"能力自描述"破局，服务端自己声明能提供什么，客户端运行时读。
- 三步闭环：握手发清单 → 动态发现能力 → 模型实时决策调用。
- 新装一个 MCP 服务，Agent 立刻多一项本领，不用改代码。
- 只接来源可信的 MCP Server，权限大，安全底线不能松。
- 下一讲，我们看组织层 Skill：怎么把能力打包成可复用模块，避免撑爆上下文。
