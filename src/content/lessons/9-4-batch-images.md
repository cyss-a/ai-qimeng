---
title: 第三步·图片整包丢给 AI 识别分类
module: M9
order: 4
slug: m9/9-4-batch-images
description: 把收集来的图片整包丢给 AI，让它识别每张是什么、该放哪个页面哪个位置。这一步能省掉做网站最累的手工排版。
duration: 7 分钟
tags: [vibe coding, 批量处理, 素材]
status: published
---

骨架搭好了，风格也定了。接下来要填真实图片——这本是做网站最累的活：几十张图，哪张放首页、哪张放详情、哪张当背景，全靠你一张张看、一张张拖。

有个办法能把这件事从"几小时"压到"几分钟"：**把图片整包丢给 AI，让它识别、分类、分配。**

## 整包识别，而不是一张张来

传统做法是打开每张图，判断内容，再决定放哪。AI 可以一口气吃下整个文件夹，一次性告诉你：这张是产品图、那张是场景图、另一张是团队照，并建议每张放哪个页面、哪个区块。

你从"亲自看每张图做决定"，变成"审核 AI 给出的分配表"。审核比原创快得多。

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>批量处理（Batch Processing）：把一批同类任务一次性交给程序/AI 处理，而不是逐个手动操作。素材（Asset）：网站用到的图片、图标、视频等资源的统称。做网站 80% 的体力活都在"素材整理"，批量处理就是专门对付它的。</p></div>
  </div>
</aside>

## 一个能直接抄的图片分配提示词

把图片文件夹交给支持读图的 AI（或直接把图贴进对话），用下面这个模板：

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 图片识别与分配</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>这是网站要用的图片素材（共 N 张）。请逐张识别每张图的内容，然后结合下面的页面结构，建议每张图放到哪个页面、哪个区块、用作什么（首图/产品图/背景/插图）。输出一张分配表：图片编号 | 内容识别 | 建议页面 | 建议位置 | 用途。不要直接改代码，先给我这张表让我确认。
---
页面结构：[粘贴骨架里各页的区块清单]
---</code></pre>
</div>

## 手工 vs 批处理，差在哪

| 做法 | 你做的事 | 耗时 | 出错率 |
| --- | --- | --- | --- |
| 手工逐张 | 自己看每张、自己决定位置、自己拖进去 | 几小时 | 高（漏放、错放） |
| 整包批处理 | AI 识别+建议，你只审核分配表 | 几分钟 | 低（你只需核对） |

AI 不一定每次都分对，但它能在一秒内给你一个"八成正确"的初稿。你在这个初稿上改，远比从零开始快。

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>两点要注意。第一，图片版权：AI 能帮你整理图，但不能帮你把别人的图变成你的。商用前确认每张图你有权用（自有、付费授权或明确可商用）。第二，看清 AI 的识别：它偶尔会把相似图认混，分配表出来后一定自己过一遍，特别是首图和背景这种显眼位置。</p></div>
  </div>
</aside>

## 小结

- 填真实图片是做网站最累的活；整包丢给 AI 识别分类，能把几小时压到几分钟。
- 核心模板：让 AI 逐张识别内容，并结合页面结构输出"图片分配表"，你只审核。
- 你从"亲自决定每张放哪"变成"核对 AI 的初稿"，审核比原创快得多。
- 注意图片版权和识别准确性：分配表出来后自己过一遍，特别是首图和背景。
- 下一讲，我们把整套方法收个尾，聊聊"导演心态"和最终的细节打磨。
