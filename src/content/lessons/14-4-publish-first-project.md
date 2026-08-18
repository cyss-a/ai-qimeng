---
title: 用 AI 发布你的第一个开源项目
module: M14
order: 4
slug: m14/14-4-publish-first-project
description: 手把手实操：用 AI 编程工具生成项目，让 AI 写 README / License / 做安全检查，再推到 GitHub 并发布 V0.1.0。最后讲发布后的维护与宣传——零技术小白也能做出属于自己的开源项目。
duration: 10 分钟
tags: [GitHub, 开源发布, AI 编程, README, 部署]
status: published
---

前面三讲都是"用别人的"。这一讲，我们自己来——**创建一个属于你自己的开源项目，并真正发布到 GitHub 上。** 全程默认你没有任何编程技术，跟着一步步走就行。

## 第一步：用 AI 编程工具生成项目

先打开一个 AI 编程工具（视频里演示用的是 Glice，你也可以用 Cursor、Trae、通义灵码等任意同类工具，思路完全一样）。

新建一个项目，给它起个名，然后让 AI 做一个简单的小网页。比如："帮我做一个待办清单网页，能添加、勾选、删除任务。" 稍等片刻，AI 就给你做好了。你当场试一下：添加三个任务、勾选一个、再删除一个——基本按键都能用，项目就成型了。

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">先验证再开源</p>
    <div class="callout__content"><p>在本地把功能都点一遍、确认能用，再往下走。一个连作者自己都没跑通的项目，发上去只会收获一堆 Issue。</p></div>
  </div>
</aside>

## 第二步：补齐开源"三件套"

一个正规的开源项目，发布前需要检查三样东西：**README、License、安全检查**。让不懂代码的小白手写这些确实吃力，但我们可以让 AI 写，你只负责审查内容。

### 1. README：项目的门面

README 是你的项目说明书，GitHub 会直接把它放到首页最显眼的位置。用户打开不到五秒，就决定要不要给你点 Star。所以一定要写好。

给 AI 的提示词，要包含这三块信息：**项目是干什么的、怎么安装使用、输入输出有什么条件**，让用户一眼看懂。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词 · 让 AI 写 README</span>
    <button class="copy-btn" aria-label="复制提示词">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>为下面这个项目写一份 README.md（中文）：
1. 这个项目是干什么的（一句话 + 一段说明）；
2. 怎么安装、怎么运行 / 使用（分步骤）；
3. 输入和输出的条件、注意事项。
语气面向完全不懂技术的小白，配简单的截图占位说明。
---
[把项目简介或主要文件贴在这里]
---</code></pre>
</div>

让 AI 生成后，打开检查一下：架构和内容是不是按你的要求来的。没问题就保留。

### 2. License：标明开源边界

挂上许可证，让用户知道你开源的边界在哪。这里用最宽松的 **MIT** 做示范——复制成本低、商用友好。

### 3. 安全检查：这一步一定要做

让 AI 帮你做最后一次安全检查：检查代码里有没有密码、token、隐私信息、本地绝对路径，以及任何不应该被公开出去的内容。**这一步非常重要，尤其是复杂项目，一定要谨慎对待。**

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词 · 让 AI 做发布前安全检查</span>
    <button class="copy-btn" aria-label="复制提示词">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>在发布到公开仓库前，请检查这个项目里是否存在：
硬编码的密码 / API token / 密钥；
个人隐私信息（姓名、电话、邮箱、地址）；
本地绝对路径或仅本机可用的配置；
任何不应公开的内容。
如有，列出具体位置和修改建议，不要改动业务代码。</code></pre>
</div>

<aside class="callout callout--danger" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6"/><path d="M9 9l6 6"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">千万别省的一步</p>
    <div class="callout__content"><p>把含密钥、隐私的文件推到公开仓库，等于把家门钥匙挂在门口。发布前让 AI 扫一遍安全检查，是底线操作，不是可选项。</p></div>
  </div>
</aside>

## 第三步：把项目推到 GitHub

三件套齐了，项目还躺在你的本地电脑上。想公开，就得真正推到 GitHub。这一步继续让 AI 帮忙：

1. 让 AI 检查电脑里有没有装 `git`，没有就让它装一下，然后初始化当前项目。
2. 让 AI 检查有没有装 **GitHub CLI（gh）**，没有就装，并确认你已登录。
3. 如果没登录成功，手动在终端输入 `gh auth login`，选"在浏览器里打开登录"，回车就 OK。
4. 告诉 AI："把当前项目创建成一个新的 GitHub 仓库，可见性设 Public，推送到主分支。" 完成后，去 GitHub 上检查一下——你的账号里真的多了一个开源项目。

到这一步，**恭喜，你的第一个开源项目正式上线了。**

## 第四步：发布第一个版本 V0.1.0

不过现在 Release 里还没有正式发布版本，别人还没法打包下载。回到 AI 编程工具里，让它：

- 检查当前是否适合发布 `V0.1.0`；
- 合适的话，写一份简洁的发布说明；
- 创建并推送标签（Tag）。

这样，你的第一个版本就诞生了，别人也能打包下载使用。

## 发布之后：维护和宣传

项目发上去，不是往 GitHub 里一丢就完事。

- **有人用出问题时**，会在你的 Issues 里提；也可能有人直接给你提交 PR，或者帮你修 bug、加功能。这时候让 AI 化身你的"24 小时客服"，先整理和初步检查这些反馈，再由你决定要不要修改、合并。
- **好项目需要持续更新**来维持活力。但 GitHub 不会主动给你打广告，得你自己宣传：分享到技术社区、自媒体平台，也可以通过 PR 把自己的项目推进对应领域的 Awesome 清单里。慢慢就会变成——有人看、有人用、有人提 Issue 或 PR、项目持续更新，更多人看到。

## 写在最后

你可能也发现了：你其实已经从一个零技术的小白，开发出了一个属于自己的开源项目。AI 正在悄悄改变"编程"这件事——普通人即使不懂代码，也能把一个想法，用 AI 做成真正能用的东西，还能通过开源和更多人交流、完善。

这也是 GitHub 最有意思的地方：**它不再只是程序员的代码仓库，而可以成为我们普通人，把想法变成作品、再把作品分享给大家的入口。**

到这里，GitHub 零基础系统教程就结束了。从认识它、找资源，到读懂界面、选许可证、下载参与，再到亲手发布第一个项目——你已经具备在开源世界里自在游走的能力了。
