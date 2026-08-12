---
title: 第二步·给参考不照抄，搭骨架再填充
module: M9
order: 3
slug: m9/9-3-match-skeleton
description: 别让 AI 照抄别人网站，也别从零瞎琢磨。给 2–3 个参考站说清"我要这种感觉"，先搭骨架和占位图，再谈细节。
duration: 8 分钟
tags: [vibe coding, 视觉匹配, 骨架]
status: published
---

第一步你手里有了项目骨架：用户是谁、要哪些页、要哪些功能。现在到了"长什么样"。这一步最容易走两个极端：要么让 AI 照抄一个参考站（侵权又不合身），要么从零让它"自由发挥"（又回到模板味）。

正确做法是中间那条路：**给参考，但不照抄；先搭骨架，再填内容。**

## 给参考，但不照抄

把你喜欢的 2–3 个网站丢给 AI，明确说："我要的是这种**感觉**和**结构**，不是抄它的文字和图片。" AI 会提取出那些站点的排版节奏、留白方式、配色气质，应用到你自己的内容上。

为什么要强调"不照抄"？两点：一是版权，直接搬别人图文有法律风险；二是你的内容和参考站根本不同，照抄只会水土不服。你要的是"神似"，不是"复制"。

| 照抄 | 匹配（推荐） |
| --- | --- |
| 把参考站文字图片原样搬过来 | 提取排版、配色、节奏，套到你自己的内容 |
| 容易侵权、水土不服 | 气质对得上，内容是你自己的 |
| AI 偷懒，质量不可控 | 你定方向，AI 执行 |

## 视觉匹配 vs 逻辑匹配

"匹配"其实有两层，别混在一起：

- **视觉匹配**：配色、字体、间距、卡片圆角、留白多少。这是"看起来像不像"的那层。
- **逻辑匹配**：信息怎么组织、用户视线怎么走、先看到什么后看到什么。这是"用起来顺不顺"的那层。

很多人只盯着视觉抄，结果页面好看但找不到按钮在哪。反过来，逻辑对了、视觉朴素点，也比好看但乱的要强。给参考时两个都点一下："视觉上参考 A 的清爽感，逻辑上参考 B 的首屏结构。"

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>骨架屏 / 占位符（Placeholder）：在真实内容还没准备好时，先用灰色块或临时图占据布局位置，目的是先把"结构对不对"验证出来，而不是纠结每个图美不美。先骨架后细节，是做网站最省返工的顺序。</p></div>
  </div>
</aside>

## 先搭骨架，再填肉

拿到参考后，先让 AI 产出**骨架版**：每个页面有哪些区块、区块怎么排、图片先用占位图顶着。这时候不要抠颜色准不准、文案好不好——先确认"结构对"。

为什么先骨架？因为结构是牵一发而动全身的：等你把某个区块美化完，才发现它该放在另一页，前面全白做。骨架阶段改动成本几乎为零，细节阶段改动成本极高。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 匹配参考搭骨架</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>参考这三个站点的视觉气质和首屏逻辑（只学排版/配色/节奏，不要抄文字图片）：[粘贴链接或描述]。基于第一步的项目需求清单，先给我做"骨架版"——每个页面列出区块结构、排列顺序，图片先用占位图。先不要美化细节，我要先确认结构对不对。
---
项目需求清单：[粘贴上一步 AI 整理的那份]
---</code></pre>
</div>

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>别一上来就抠细节。新手常犯的错误是：第一屏颜色差一点就开始反复调，结果结构还没定，调了也白调。牢记顺序——先确认区块结构和排列对不对（骨架），再统一配色字体（风格），最后才填真实文案和图片（细节）。</p></div>
  </div>
</aside>

## 小结

- 给 2–3 个参考站，明确说"要这种感觉，不抄内容"；你要的是神似，不是复制。
- 匹配分两层：视觉匹配（配色/留白/节奏）和逻辑匹配（信息组织/视线流）。
- 先搭骨架版：区块结构 + 占位图，确认"结构对"再谈美化。
- 顺序铁律：骨架 → 风格 → 细节。在骨架没定之前抠细节，是最贵的浪费。
- 下一讲，我们解决最耗时的手工活：把收集来的图片整包丢给 AI 批量处理。
