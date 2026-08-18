---
title: 许可证与四种下载法：能不能改、能不能商用
module: M14
order: 3
slug: m14/14-3-license-download
description: 开源不等于随便用。许可证回答三个核心问题——下载后能不能改、能不能商用、改完要不要公开。再看四种把项目拿到手的方式：Release 安装包、Download Zip、Clone、Fork。
duration: 7 分钟
tags: [GitHub, 开源许可证, MIT, Clone, Fork, 下载]
status: published
---

上一讲拆完了界面，这一讲说两件和你"用得安不安心"直接相关的事：**许可证**和**怎么把项目拿到手**。

## 先搞懂许可证：开源不等于随便用

每个开源项目都有一份 **License（许可证）**。不同项目的开放程度不一样，它直接关系你最关心的三个问题：

1. 下载后，**我可以改吗？**
2. 我可以**拿来商用吗？**
3. 改完之后，**我的代码也必须公开吗？**

不同许可证，就是对这三个问题给出了不同回答。我帮你总结成两大阵营：

### 宽松组：MIT / Apache / BSD

这一组最宽松，甚至允许你**闭源商用**——只要保留原作者的声明就行。对打工人和开发者来说，堪称"良心之选"。你拿去改、拿去做成产品卖，基本都没问题，记得留名即可。

### 严谨组：有"传染性"规则（Copyleft）

另一组许可证限制就多得多，核心是一条"传染性"：**你改了别人的代码拿去发布，你的修改也得开源。** 常见的几种：

- **GPL**：最典型的"强传染"。用了 GPL 代码，整个软件分发时都得开源。
- **LGPL**：稍温和，允许你以"库"的形式调用它，闭源软件也能用，但你改了库本身还是要开源。
- **AGPL**：比 GPL 更严，连"只在服务器上跑、不发给用户"的网络服务都要开源——做 SaaS 的要特别留意。
- **MPL（Mozilla）**：按"文件"传染，你只改了带 MPL 的文件才需开源，自己新建的文件可以闭源。

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">怎么选：七种许可证速查</p>
    <div class="callout__content">
      <p>视频里说的"七种常见许可证"，按开放程度从松到严排好队：</p>
      <ul>
        <li><strong>MIT</strong>：最省心，闭源商用随便用，留个署名即可，也就是绝大多数个人项目选它。</li>
        <li><strong>Apache-2.0</strong>：比 MIT 多了"专利授权"保护，大厂法务更认，也就是想显得正规、涉及专利选它。</li>
        <li><strong>BSD</strong>：和 MIT 类似，更短更精简。</li>
        <li><strong>MPL-2.0</strong>：按文件传染，适合"开源核心 + 闭源扩展"。</li>
        <li><strong>LGPL</strong>：适合你做"被别人调用的库"。</li>
        <li><strong>GPL</strong>：想强制所有衍生都开源时用。</li>
        <li><strong>AGPL</strong>：做了网络服务（SaaS）还想强制开源时用。</li>
      </ul>
      <p>一句话：拿不准就选 MIT；碰到严谨组（GPL 系）项目，先查清楚再商用。</p>
    </div>
  </div>
</aside>

下面这张对照表，关键时候拿出来核对一下就安心了：

| 阵营 | 代表许可证 | 能改 | 能闭源商用 | 改完要公开 |
| --- | --- | --- | --- | --- |
| 宽松组 | MIT / Apache-2.0 / BSD | 能 | 能（留署名） | 不必 |
| 弱传染 | MPL-2.0 / LGPL | 能 | 部分可以 | 改了相关文件要 |
| 强传染 | GPL / AGPL | 能 | 受限（AGPL 连网络服务都要开源） | 通常要 |

## 四种把项目拿到手的方法

看懂了许可证，接下来是实际操作——你怎么把项目弄到手？目的不同，方法完全不同。

### 方法一：Release 下载安装包（只想用，不想碰代码）

如果你只想下载来用、不参与开发，直接找 **Release**，下载对应系统的安装包（Mac 选 `.dmg`，Windows 选 `.exe`），开箱即用。这是最省事的一条路。

### 方法二：Download Zip（只想看源码）

如果你不想安装，只是想看看它源码长什么样，点 Code 下拉里的 Download Zip，就能把整个源码压缩包下载到本地，揣进兜里慢慢看。

### 方法三：Clone（长期本地改 + 跟随更新）

如果你打算在本地长期修改这个项目，并且跟着原作者一起更新，那就适合 **Clone（克隆）**。点 Code 复制仓库地址，然后在终端里执行 `git clone` 加上这个地址就行。

- Windows：打开 PowerShell，粘贴地址执行。
- Mac：打开终端，步骤一样。

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">不会敲命令也没事</p>
    <div class="callout__content"><p>觉得敲命令麻烦，就把仓库地址丢给 AI，让它帮你 clone；以后原项目一更新，再让 AI 帮你 pull（拉取）最新代码。全程不用自己记命令。</p></div>
  </div>
</aside>

### 方法四：Fork（参与贡献）

Fork 和前三种最大的区别是：**它不会把项目下到你的电脑上，而是先在你自己的 GitHub 账号里复制一份专属副本。** 你改了别人的项目，最后想把成果贡献回去，就点 New Pull Request，提交合并申请——前面写谁、后面写谁，一目了然，不用死记硬背。

## 本讲到这里

记住两条：

- **许可证决定边界**：宽松组随便用（留署名），严谨组多留神。
- **拿项目分四种目的**：用就下 Release、看源码就 Download Zip、长期改就 Clone、想贡献就 Fork 提 PR。

下一讲是重头戏：如何用 AI 编程工具，从零做出一个项目，并真正开源发布到 GitHub 上——哪怕你一行代码都不会写。
