---
title: 上线与永久有效：GitHub + 部署 + 导出
module: M10
order: 5
slug: m10/10-5-github-deploy
description: 把代码推到 GitHub、用部署平台发布、从 Supabase 导出数据。讲清"永久有效"的三保险，并给常见失败排查，让小白做出刷新不丢、一直能开的工作台。
duration: 10 分钟
tags: [工作台, GitHub, 部署, 上线, 永久有效]
status: published
---

前面三块（前端、Supabase、导出）都齐了。这一讲做最后两块——**代码仓库（GitHub）+ 部署平台**，并把这个工作台的"永久有效"彻底锁死。做完这一讲，你就有了一个刷新不丢、换设备能同步、自己关掉电脑也一直在线的专属工具。

## 上线四步

<div class="mindmap" role="img" aria-label="工作台上线四步与永久三保险思维导图">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 810 448" width="100%" role="img" aria-label="工作台上线四步与永久三保险思维导图">
  <g fill="none" stroke-width="2" stroke-linecap="round">
    <path d="M212,224 C236,224 236,105 260,105" stroke="var(--mindmap-b1-line)"/>
    <path d="M394,105 C420,105 420,96 446,96" stroke="var(--mindmap-b1-line)"/>
    <path d="M394,105 C420,105 420,142 446,142" stroke="var(--mindmap-b1-line)"/>
    <path d="M212,224 C236,224 236,197 260,197" stroke="var(--mindmap-b2-line)"/>
    <path d="M380,197 C413,197 413,188 446,188" stroke="var(--mindmap-b2-line)"/>
    <path d="M380,197 C413,197 413,234 446,234" stroke="var(--mindmap-b2-line)"/>
    <path d="M212,224 C236,224 236,289 260,289" stroke="var(--mindmap-b3-line)"/>
    <path d="M380,289 C413,289 413,280 446,280" stroke="var(--mindmap-b3-line)"/>
    <path d="M380,289 C413,289 413,326 446,326" stroke="var(--mindmap-b3-line)"/>
    <path d="M212,224 C236,224 236,381 260,381" stroke="var(--mindmap-b4-line)"/>
    <path d="M380,381 C413,381 413,349 446,349" stroke="var(--mindmap-b4-line)"/>
    <path d="M380,381 C413,381 413,395 446,395" stroke="var(--mindmap-b4-line)"/>
    <path d="M380,381 C413,381 413,441 446,441" stroke="var(--mindmap-b4-line)"/>
  </g>
  <rect x="40" y="188" width="172" height="72" rx="16" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="1.5"/>
  <text x="126" y="218" text-anchor="middle" dominant-baseline="central" font-size="16" font-weight="600" fill="var(--fg)">工作台上线</text>
  <text x="126" y="241" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--muted)">四步+三保险</text>
  <rect x="260" y="86" width="134" height="38" rx="19" fill="var(--mindmap-b1)"/>
  <text x="327" y="105" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">推 GitHub</text>
  <rect x="446" y="82" width="107" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="499" y="96" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">代码永不下线</text>
  <rect x="446" y="128" width="121" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="506" y="142" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">新建仓库连工具</text>
  <rect x="260" y="178" width="120" height="38" rx="19" fill="var(--mindmap-b2)"/>
  <text x="320" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">选部署平台</text>
  <rect x="446" y="174" width="214" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="553" y="188" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">Vercel/Netlify</text>
  <rect x="446" y="220" width="320" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="606" y="234" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">CloudBase/GitHub Pages</text>
  <rect x="260" y="270" width="120" height="38" rx="19" fill="var(--mindmap-b3)"/>
  <text x="320" y="289" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">一键部署</text>
  <rect x="446" y="266" width="174" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="533" y="280" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">连仓库点 Deploy</text>
  <rect x="446" y="312" width="107" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="499" y="326" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">拿到永久网址</text>
  <rect x="260" y="362" width="120" height="38" rx="19" fill="var(--mindmap-b4)"/>
  <text x="320" y="381" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">永久三保险</text>
  <rect x="446" y="335" width="147" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="519" y="349" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">代码在GitHub</text>
  <rect x="446" y="381" width="174" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="533" y="395" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">数据在Supabase</text>
  <rect x="446" y="427" width="94" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="493" y="441" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">站点在部署</text>
</svg>
</div>

**第 1 步：代码推到 GitHub。** 把工具导出的代码连到 GitHub（大多工具有"Connect GitHub"一键连），新建一个仓库。这样代码存在 GitHub 的服务器上，永不下线，也方便你以后回看、改版。

**第 2 步：选部署平台。** 把仓库发布到互联网，谁都能打开：

| 平台 | 特点 | 适合 |
| --- | --- | --- |
| Vercel | 连 GitHub 一键部署，前端首选 | 静态 / 前端项目 |
| Netlify | 类似 Vercel，拖拽也能部署 | 静态站点 |
| CloudBase | 腾讯云，国内访问快 | 国内用户为主 |
| GitHub Pages | 免费、和仓库一体 | 纯静态、想极简 |

**第 3 步：一键部署。** 在平台里连上 GitHub 仓库，点"Deploy"。等一两分钟，它会给你一个网址（如 `xxx.vercel.app`）。把这个网址收藏好——它就是你的工作台入口。

**第 4 步：绑定自定义域名（可选）。** 想用自己的网址（如 `我的工作台.com`），在平台里按提示绑就行。不绑也能用平台给的免费网址，不影响"永久有效"。

## 永久有效：三保险

为什么这样就不会"刷新就丢、下次打不开"？因为你的工作台同时跑在三个互不相干的云端：

1. **代码在 GitHub**——你这台电脑坏了，代码还在。
2. **数据在 Supabase**——浏览器清了、换设备，数据从云端读，稳。
3. **站点在部署平台**——平台 7×24 在线，教程站关了你的还在。

任何一个单点出问题，都不影响另外两个。这就是和"纯前端 + 本地存储"教程最本质的区别。

## 常见失败与排查

| 现象 | 多半原因 | 怎么查 |
| --- | --- | --- |
| 部署报红叉 | 代码有报错 / 依赖没装 | 看平台日志，搜红色报错第一行 |
| 页面空白 | 环境变量没填 | 检查 Supabase 的 URL / key 是否填进平台设置 |
| 数据读不出 | Supabase 没开 RLS / 表名错 | 后台看 Table Editor，确认表和数据在 |
| 改了没生效 | 没重新部署 | 改完代码要再 Deploy 一次 |

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>"永久有效"不等于"永远不用管"。Supabase 免费项目若长期完全不用，极少数情况会被回收——所以**定期导出一次 CSV 备份**（第 10-4 讲的方法）。代码在 GitHub、数据有备份、站点在部署，三处都在，你的工作台就是真正属于你的。</p></div>
  </div>
</aside>

## 全流程回顾

从想法到"永久属于自己的工作台"，五讲串成一条线：

1. 定目标：前后端都有，才永久有效（10-1）
2. 聊需求：用通用提示词把想法变成清单（10-2）
3. 生前端：用提示词让 AI 出界面（10-3）
4. 接后端：Supabase 存数据、能导出（10-4）
5. 上线：GitHub + 部署平台，锁死永久有效（本讲）

照这条线走，你做出来的就不再是"刷新就丢的玩具"，而是一个真正属于你、且一直都在的专属工作台。

想一步不落照着做出来，直接翻 **10-6《从零搭建：一份可以直接抄的提示词清单》**——前面五讲的原理，它在那里串成一条"复制提示词 → 发给 AI → 完工"的实操线，每步都给你复制好的提示词。
