---
title: 后端与数据：Supabase 怎么接
module: M10
order: 4
slug: m10/10-4-supabase-backend
description: 用 Supabase 当云端数据库，把前端接上，实现"刷新不丢、换设备同步"。含建表、填密钥、数据一键导出——这是工作台永久有效的关键一块。
duration: 10 分钟
tags: [工作台, Supabase, 后端, 数据, 导出]
status: published
---

上一讲界面能跑了，但数据还是示例。这一讲接上"四件套"里的第二块——云端数据库 Supabase，让数据真正存下来、刷新不丢。这一块，就是纯前端教程最缺、也最该补的。

## Supabase 是什么

简单说：**一个放在云端的数据库 + 接口服务**，对个人免费、不用自己买服务器。你把数据表建在它那里，前端就能"读 / 写 / 改 / 删"，数据存在它的服务器上，跟你这台设备无关。

为什么选它：

- **免费层够个人用**——个人工作台的量级，免费额度基本用不完。
- **不用写后端**——它自带 API，前端直接调，省掉"自己搭服务器"这一步。
- **能导出**——后台一键导出 CSV / SQL，数据始终攥在你手里（这点后面讲永久有效会用到）。

## 四步接上

**第 1 步：建项目。** 注册 Supabase，新建一个项目（记住项目名，后面要找）。

**第 2 步：建表。** 把上一讲"项目需求清单"里的字段，变成一张表。以读书清单为例：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | bigint（自增主键） | 每条记录唯一编号 |
| title | text | 书名 |
| author | text | 作者 |
| status | text | 已读 / 想读 |
| rating | int | 评分 1–5 |
| notes | text | 笔记 |

> 表名用英文小写，比如 `books`。字段类型选 `text`（文本）/ `int`（整数）就够了，新手别纠结。

**第 3 步：拿密钥。** 进项目「Project Settings → API」，复制两样东西：
- **Project URL**（项目地址）
- **anon public key**（公开密钥，可放前端，它配合权限规则保护数据）

**第 4 步：告诉前端去连。** 把这两样填进上一讲工具生成的项目配置里（通常在 `.env` 或设置面板），再把"示例数据"换成"从 Supabase 读 / 写"。

<div class="prompt-card">
  <div class="prompt-card__head">
    <span class="prompt-card__title">提示词模板 · 前端接 Supabase</span>
    <button class="copy-btn" aria-label="复制提示词模板">
      <span class="copy-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
      <span class="copy-btn__label">复制</span>
    </button>
  </div>
  <pre class="prompt-card__code"><code>把前端接到 Supabase，表结构如下：

表名：books
字段：id(bigint 自增主键)、title(text)、author(text)、status(text)、rating(int)、notes(text)

要求：
1. 用 Supabase 官方 JS 客户端连接；
2. 列表页从 Supabase 读取所有记录并展示（不要再用示例数据）；
3. 新增 / 编辑 / 删除 都调用 Supabase 的 insert / update / delete；
4. 我已提供 Project URL 和 anon key，请放在环境变量（不要硬编码进代码）；
5. 操作后刷新列表，确保界面和云端数据一致。</code></pre>
</div>

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>RLS（行级安全）：Supabase 默认会拦住所有访问，需要开规则。个人工具最省事的做法——开启"登录用户能读写自己数据"，或先用"允许所有"跑通流程、之后再收紧。把"密钥硬编码进代码"是大忌，一旦公开别人就能乱改你的库。</p></div>
  </div>
</aside>

## 数据导出：让数据始终在你手里

这是"永久有效"的保险锁。进 Supabase 后台「Table Editor → 导出」，可以：

- **导出 CSV**——Excel 直接打开，随时备份。
- **导出 SQL**——连表带数据，换平台也能恢复。

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>密钥不要写死在代码里，用环境变量（.env）管理，且 `.env` 不要提交到 GitHub。这样即使代码公开，别人也拿不到你的数据库钥匙。很多"工作台第二天打不开"，其实是密钥泄露 / 库被锁，而不是代码问题。</p></div>
  </div>
</aside>

## 小结

- Supabase = 云端数据库 + 接口，免费、不用自己搭服务器，是工作台的"仓库管理员"。
- 四步：建项目 → 建表（字段来自需求清单）→ 拿 URL + anon key → 前端连接读写作云端。
- 密钥放环境变量，别硬编码；RLS 先跑通再收紧。
- 数据一键导出 CSV / SQL，始终攥在手里——这是永久有效的第一道保险。

下一讲，把代码推到 GitHub、部署上线，工作台就真正"属于你、且一直都在"了。
