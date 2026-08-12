---
title: Tools：大模型真正能"动手"的地方
module: M8
order: 3
slug: m8/8-3-tools-boundary
description: 分清 Tool 的内部执行与外部调用，理解"本地能做的别出网、出网必走标准接口"这条边界。
duration: 8 分钟
tags: [Agent, Tool, 执行层]
status: published
---

Function Calling 给出了指令，但到底谁去跑？是 Tool（工具，一段真正执行动作的代码：函数、脚本或 API 接口）。这一讲讲清楚工具的"物理边界"——哪些在本地就能办，哪些必须跨网络，这条线划错了，要么慢、要么泄密、要么烧钱。

## 工具的两类边界

Tool 是执行层的最小单元，但落地位置天差地别：

| 类型 | 例子 | 是否出网 | 特点 |
| --- | --- | --- | --- |
| 内部工具 / 本地环境 | IDE 助手、文件批量重命名、目录扫描 | 否 | 直接跑在你机器上，快、私密 |
| 外部工具 / 外部服务 | 调第三方天气、地图、支付 API | 是 | 跨网络，依赖标准化集成与鉴权 |

一句话原则：本地能自己干的，绝不出网；必须出网的，走带鉴权的标准接口。这条线决定了速度、隐私和成本。

## 真实例子：重命名 vs 查天气

你让 Agent"把当前文件夹里所有截图按日期重命名"。这是纯本地活，调用一个重命名脚本就行，不上网、不泄露任何数据，毫秒级完成。但"查东京天气"不一样，本地没有气象数据，必须走外部天气 API——联网、带 key、按次计费。两者都是 Tool，区别全在那条网络边界上：前者关着门自己干，后者得开门找外援。

## 多工具链：一个请求串起多个工具

工具的边界不止"本地 vs 外部"，还涉及"一个请求要调几个工具"。比如视频里的出门场景："我马上要出门，该带什么？如果下雨，帮我查附近有没有卖雨伞的店。"

这个请求需要三条外部调用按顺序接力：

1. **定位工具**：把"我所在位置"转成经纬度。
2. **天气工具**：拿经纬度去查当前天气（下不下雨、气温、空气质量）。
3. **店铺搜索工具**：只有当下雨时，才拿经纬度去搜附近卖雨伞的店。

每条调用的输出都是下一条调用的输入。执行层在这里不是"跑一个函数"就完事，而是根据模型规划，按依赖关系多次调用、传递结果、直到问题解决。这种"多工具链"是 Agent 和单次问答最本质的区别之一。

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>Tool（工具）是执行层里真正"动手"的单位，形态可以是几行 Python 函数、一条命令行指令，或一次 HTTP 请求。它接在 Function Calling 的输出之后：模型说"调 get_weather、地点 Tokyo"，Tool 就是那个真的去发请求、拿结果的东西。理解 Tool，你就理解了"Agent 到底靠什么碰外部世界"。</p></div>
  </div>
</aside>

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>把本能在本地完成的活也推到外部 API，是新手常犯的浪费：既慢（多一跳网络）、又泄隐私（数据出了你的机器）、还可能踩付费额度。写 Tool 前先问一句"这台机器自己能不能干"。能本地解决的，就地解决；只有缺数据、缺能力时才出网。</p></div>
  </div>
</aside>

## 让模型帮你生成一个新 Tool

想新增一个工具时，可以用下面这个模板让模型先把骨架和参数校验写出来：

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 生成一个本地文件处理 Tool</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>请写一个本地 Tool，功能是：把指定目录下所有 .png 截图按"拍摄日期_原名"重命名。要求：
1. 用 Python 实现，不依赖任何外部网络请求；
2. 接收参数 dir_path（字符串，目录路径）；
3. 先用 os.path.getmtime 取修改时间，避免读取 EXIF 失败；
4. 重名时自动加序号后缀，不覆盖原文件；
5. 返回被重命名的文件清单。</code></pre>
</div>

## 小结

- Tool 是执行层最小单元，可以是函数、脚本或一次 HTTP 请求。
- 工具分内部（本地、不出网）和外部（跨网、带鉴权）两类，边界决定速度、隐私、成本。
- 本地能干的活别推到外部 API，避免慢、泄密、烧额度。
- 模型输出"调什么"，Tool 才是"真去跑"的那一环。
- 下一讲，我们看外部工具怎么用 MCP 接成"通用插座"，免去重复对接。
