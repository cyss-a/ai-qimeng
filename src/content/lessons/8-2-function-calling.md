---
title: Function Calling：让大模型学会"下指令"
module: M8
order: 2
slug: m8/8-2-function-calling
description: 看懂 Function Calling 怎么把"自然语言"翻译成"机器能执行的调用指令"，并跑通一个查天气的闭环。
duration: 8 分钟
tags: [Agent, Function Calling, 工具调用]
status: published
---

大模型只能吐文字，不能直接开灯、查库、发邮件。Function Calling（函数调用，让模型输出"要调哪个函数、传什么参数"的标准格式）就是那根把"想法"翻译成"动作"的导线。这一讲讲清楚它怎么把一句人话，变成程序能直接跑的指令。

## 它怎么工作：三步闭环

Function Calling 的本质，是给模型一份"工具说明书"，然后让它按格式填单：

1. 你先告诉模型"你手下有哪些工具，各自要什么参数"——相当于发一份工具说明书。
2. 用户提问时，模型不直接答，而是挑一个最合适的工具，输出一段结构化 JSON，比如：`{"tool":"get_weather","location":"Tokyo"}`。
3. 你的程序拿到这段 JSON，真正去执行，再把结果喂回模型，模型总结成自然语言回复。

关键是：模型只负责"决定调哪个、填什么参数"，真正去联网、去计算的，是你的代码。模型是大脑，协议是约定，执行靠外部。

## 真实例子：查东京气温的完整链路

用户问"东京现在气温多少"。模型没有联网权限，但它知道有个 `get_weather` 工具，于是输出 `{"tool":"get_weather","location":"Tokyo"}`。你的后端代码收到后，真的去调天气 API，拿到 28℃，再塞回给模型。模型才说："东京现在 28 度。"注意顺序——先有模型的决定，才有代码的执行，最后才有模型的总结。真正联网的是你的代码，不是模型。

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>Function Calling 不是"模型自己运行了函数"。模型全程不碰任何外部系统，它只是输出一段约定好的 JSON，告诉你的程序"该调哪个、传什么"。真正的执行权一直在你的代码手里。所以它是"协议层"而不是"执行层"——它定义格式，不干粗活。理解这一点，你才不会被"模型会自己调 API"的说法吓到。</p></div>
  </div>
</aside>

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>工具说明书里参数格式写得含糊，模型就会瞎填。比如地点只写"城市名"，它可能输出"东京都"三个字，导致天气接口报错。解决办法：参数约束写死（枚举或正则），并给一两个示例。宁可把说明书写得啰嗦，也别让模型自由发挥——它的"自由"最后都会变成你的报错。</p></div>
  </div>
</aside>

## 定义一个可调用工具的模板

下面这个模板，可以照着改成你自己的第一个工具：

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 定义并调用一个天气工具</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>工具定义（JSON Schema）：
{
  "name": "get_weather",
  "description": "查询指定城市的实时气温",
  "parameters": {
    "type": "object",
    "properties": {
      "location": { "type": "string", "description": "城市拼音或英文名，如 Tokyo" }
    },
    "required": ["location"]
  }
}
用户提问时，请只输出要调用的工具名和参数，格式：{"tool":"get_weather","location":"Tokyo"}。</code></pre>
</div>

## 小结

- Function Calling 把"自然语言需求"翻译成"程序能执行的 JSON 指令"。
- 模型只决定"调哪个、填什么"，真正执行的是你的代码，不是模型。
- 给模型的工具说明书要把参数约束写死、给示例，避免它乱填。
- 查天气的完整链路是：模型决定 → 代码执行 → 结果回灌 → 模型总结。
- 下一讲，我们看执行层：Tool 到底在本地跑，还是要出网。
