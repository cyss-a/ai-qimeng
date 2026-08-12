---
title: 为什么工作台要"前后端都有"
module: M10
order: 1
slug: m10/10-1-why-fullstack
description: 网上很多教程只教你做"前端界面"，刷新就丢、换设备就没。这一讲讲清：想让工作台永久有效，必须前后端都有。
duration: 7 分钟
tags: [工作台, 全栈, 永久有效, Supabase]
status: published
---

你照着某个教程做了一个"超好看的记账本 / 待办 / 灵感墙"，本地打开很爽。结果第二天一刷新——没了。换台电脑打开——也没了。甚至那个教程作者贴的演示链接，你自己点进去——打不开了。

这不是你手笨，是教程本身只教了"一半"。这一讲先把根因讲透，再给你一个能避坑的框架。

## 坑在哪：纯前端 + 浏览器本地存储

大多数"做网站"入门教程，做到最后就是一个**纯前端界面**：页面、按钮、样式都有，数据则临时存在浏览器的 `localStorage` 里。

`localStorage` 是什么？简单说，就是"这条网站在你这台浏览器上随手记的小纸条"。它有三个致命限制：

- **跟着设备走**：清了浏览器缓存、换了浏览器、换了电脑，纸条就没了。
- **容量很小**：每个网站最多约 5MB，存几十条还行，存多了就爆。
- **没法共享**：纸条只贴在你这台机器上，别人（或未来的你）看不到。

更隐蔽的是——很多"教程 Demo"连代码都没真正部署出去，只是在作者电脑本地跑给你看。所以它自己"下次刷新就打不开"，你照着做，自然也复刻了一个一模一样的短命玩具。

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>别被"看起来能跑"骗了。<strong>本地能跑 ≠ 永久有效</strong>。判断一个教程靠不靠谱，就看它有没有"数据库 + 代码仓库 + 部署平台"这三样。缺一，基本就是短命 demo——你做出来的工作台，迟早也会"刷新就打不开"。</p></div>
  </div>
</aside>

## 解法：永久有效四件套

想让工作台真的"属于你、且一直都在"，得把它拆成四块，每一块都不能少：

1. **前端界面**——你看到、点得动的那层（页面、按钮、表单）。
2. **云端数据库 / 后端**——把数据真正存下来，刷新不丢、换设备同步。本模块用 **Supabase** 代劳，不用你自己买服务器。
3. **代码仓库**——把代码版本化管理、存到云端，永不下线。用 **GitHub**。
4. **部署平台**——把站点发布到互联网，谁都能打开。如 Vercel / Netlify / CloudBase / GitHub Pages。

把这四块和"纯前端教程"放一起对比，区别一眼就明白：

| 维度 | 纯前端教程（易丢） | 四件套工作台（永久） |
| --- | --- | --- |
| 刷新页面 | 数据可能清空 | 数据从云端读，稳 |
| 换设备 | 看不到 | 登录同账号就有 |
| 代码在谁那 | 可能只在别人电脑 | 在 GitHub，你的 |
| 访问链接 | 教程站自己都打不开 | 部署平台 7×24 在线 |
| 数据导出 | 基本没有 | Supabase 一键导出 CSV / SQL |

## "永久有效"到底指什么

说人话：**即使你电脑坏了、浏览器清了、教程站关了，你的工作台还在**——因为代码在 GitHub、数据在 Supabase、站点在部署平台。这三处都跑在"别人家"的服务器上，不依赖你这一台设备。

这就是为什么前面那个网站（以及很多网上教程）会出问题：它们往往只做了"前端界面"这一层，缺了后面三层。本模块就是来补齐的。

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>前端 / 后端：前端是你看得见的界面（按钮、列表、表单）；后端是藏在后面的"仓库管理员"，负责把数据存进数据库、按请求取出来。个人工作台要"永久有效"，后端（这里用 Supabase 代劳）不能省——它是防丢的那把锁。</p></div>
  </div>
</aside>

## 小结

- 纯前端 + `localStorage` 的教程 demo，刷新 / 换设备就丢，因为它没后端、没部署。
- 想永久有效，要"四件套"：前端界面 + 云端数据库（Supabase）+ 代码仓库（GitHub）+ 部署平台。
- "永久有效" = 代码在 GitHub、数据在 Supabase、站点在部署平台，都不依赖你这台设备。
- 判断教程靠不靠谱：看它有没有数据库 + 仓库 + 部署，缺一就是短命 demo。
- 下一讲，给你一套可反复用的"通用提示词"，把"我想要个工具"一步步聊成清楚的项目。
