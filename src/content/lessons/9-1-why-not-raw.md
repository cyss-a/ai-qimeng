---
title: 为什么不要一上来就让 AI 写网页
module: M9
order: 1
slug: m9/9-1-why-not-raw
description: 一句话"帮我做个网站"只会换来通用模板。先看懂新手最常踩的坑，再来学一套可复制的做法。
duration: 6 分钟
tags: [vibe coding, 建站, AI 编程]
status: published
---

很多人第一次想用 AI 做个网站，会直接甩一句话："帮我做一个电商网站""给我搞个个人博客"。听起来很合理，但你多半会得到一个长得都差不多的通用模板——首页大图、三个卡片、一个"立即购买"按钮，内容全是占位文字。

问题不在 AI 笨，而在你给的"需求"里，藏了太多你以为 AI 知道、其实它根本不知道的东西。

## 一句话需求，缺了什么

当你说"帮我做一个电商网站"时，下面这些你脑子里默认的东西，AI 一个都没收到：

| 你以为 AI 懂的 | 实际上 AI 不知道的 |
| --- | --- |
| 卖什么、卖给谁 | 是卖衣服、卖课程，还是卖二手相机？ |
| 要哪些页面 | 要不要详情页、购物车、登录、后台？ |
| 长什么样 | 你心里有参考站，但没说出来 |
| 数据从哪来 | 商品是写死的，还是要数据库？ |
| 要不要上线 | 是本地看看，还是真要给人访问？ |

AI 不会读心。它接到一句空泛的话，只能套一个"最安全、最通用"的模板填进去——这也是为什么十个新手做出来的第一个网站，看着都像同一个模板换了个标题。

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>把"一句话需求"当成需求，是用 AI 做网站最大的坑。你以为省了沟通，其实把"替你想清楚"这件事甩给了 AI，而它最不擅长的就是替你做没说出来的决定。结果就是：来回改十遍，越改越像模板。</p></div>
  </div>
</aside>

## vibe coding 是什么

这两年流行一个词叫 **vibe coding（氛围编程）**：你不用自己写代码，而是用自然语言指挥 AI 把网站做出来。你描述想要什么，AI 生成代码、运行、报错、再修，你只看效果对不对。

但这里有个关键误会：vibe coding 不等于"一句话甩给 AI 就完事"。恰恰相反，它更像是**当导演**——你不用亲自扛摄像机，但你得说清楚这场戏要拍什么、什么气氛、镜头怎么走。演员（AI）很能干，但得你导。

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>vibe coding（氛围编程）：由 OpenAI 联合创始人 Andrej Karpathy 提出的概念，指"完全沉浸在氛围里，让 AI 把想法变成代码，自己只负责看效果、提反馈"。重点不是你多懂代码，而是你会不会把模糊的想法，一步步聊清楚、对清楚。后面的几讲，就是一套可以照着做的三步法。</p></div>
  </div>
</aside>

## 这套方法长什么样

接下来三讲，我会给你一套从"想法"到"能上线网站"的可复制流程，它来自一次黑客松里用 AI 三小时做出夺冠网站的真实打法，拆成了三步：

- **第一步·聊成项目**：先不让 AI 写代码，而是让它反过来问你一堆问题，把模糊的想法逼成一个清楚的项目骨架。
- **第二步·匹配搭骨架**：给它 2–3 个参考站，说清"我要这种感觉，但不要抄内容"，先搭出页面骨架和占位图，再谈细节。
- **第三步·素材批处理**：把收集到的图片整包丢给 AI，让它识别、分类、分配到对应页面，省掉最耗时的手工排版。

这一讲先建立共识：**做网站的第一行代码，应该从"把需求聊清楚"开始，而不是从"让 AI 生成"开始**。下一讲，我们就钻进第一步——怎么让 AI 反过来面试你。

## 小结

- 一句话"帮我做个网站"只会换来通用模板，因为 AI 收不到你没说出口的细节。
- vibe coding 是"用自然语言指挥 AI 写代码"，本质是你当导演、AI 当演员，不是甩一句就完事。
- 最大的坑是把空泛需求当需求；省下的沟通，最后都会变成十倍返工。
- 后面三讲是一套三步法：聊成项目 → 匹配搭骨架 → 素材批处理。
