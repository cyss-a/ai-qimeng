---
title: 像导演一样指挥 AI：先骨架后素材再细节
module: M9
order: 5
slug: m9/9-5-director
description: 把前三讲收个尾。建立"导演心态"——你定方向、AI 执行；先骨架后素材再细节。附一套可照做的总流程与上线提醒。
duration: 8 分钟
tags: [vibe coding, 导演心态, 上线]
status: published
---

前三讲我们分别讲了：聊成项目、匹配搭骨架、素材批处理。这一讲把它们串起来，并聊一个比技巧更重要的东西——**心态**。

## 你是导演，不是保姆

vibe coding 最舒服的状态，是你当导演、AI 当演员。导演不亲自扛摄像机，但清楚每场戏要什么效果、什么节奏；演员很能干，但得你喊"开始"、喊"卡"、说"这条重来"。

新手最容易掉进两个心态坑：

| 保姆心态（别这样） | 导演心态（该这样） |
| --- | --- |
| 一行行教 AI 写代码 | 说清要什么，让它产出，你审效果 |
| 指望一次就完美 | 接受初稿很糙，靠几轮迭代变好 |
| 出错了就慌 | 把报错当反馈，丢回去让它修 |

<aside class="callout callout--info" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">术语卡</p>
    <div class="callout__content"><p>部署（Deploy）：把做好的网站从你电脑里发布到互联网上，让任何人都能打开访问。常见做法有 GitHub Pages、Vercel、腾讯云 CloudBase 等——它们大多能"连上代码仓库，推上去就自动上线"。做网站的最后一步，不是写完代码，是部署出去。</p></div>
  </div>
</aside>

## 三步法总览：一张图记牢

把前面三讲和最后的打磨上线合起来，就是一套可复制的流程：

<div class="mindmap" role="img" aria-label="vibe coding 三步法思维导图">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 637 448" width="100%" role="img" aria-label="vibe coding 三步法思维导图">
  <g fill="none" stroke-width="2" stroke-linecap="round">
    <path d="M212,224 C236,224 236,105 260,105" stroke="var(--mindmap-b1-line)"/>
    <path d="M394,105 C426,105 427,96 459,96" stroke="var(--mindmap-b1-line)"/>
    <path d="M394,105 C426,105 427,142 459,142" stroke="var(--mindmap-b1-line)"/>
    <path d="M212,224 C236,224 236,197 260,197" stroke="var(--mindmap-b2-line)"/>
    <path d="M407,197 C433,197 433,188 459,188" stroke="var(--mindmap-b2-line)"/>
    <path d="M407,197 C433,197 433,234 459,234" stroke="var(--mindmap-b2-line)"/>
    <path d="M212,224 C236,224 236,289 260,289" stroke="var(--mindmap-b3-line)"/>
    <path d="M407,289 C433,289 433,280 459,280" stroke="var(--mindmap-b3-line)"/>
    <path d="M407,289 C433,289 433,326 459,326" stroke="var(--mindmap-b3-line)"/>
    <path d="M212,224 C236,224 236,381 260,381" stroke="var(--mindmap-b4-line)"/>
    <path d="M394,381 C426,381 427,372 459,372" stroke="var(--mindmap-b4-line)"/>
    <path d="M394,381 C426,381 427,418 459,418" stroke="var(--mindmap-b4-line)"/>
  </g>
  <rect x="40" y="188" width="172" height="72" rx="16" fill="var(--surface)" stroke="var(--fg-2)" stroke-width="1.5"/>
  <text x="126" y="218" text-anchor="middle" dominant-baseline="central" font-size="16" font-weight="600" fill="var(--fg)">vibe coding 三步法</text>
  <text x="126" y="241" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--muted)">导演式指挥</text>
  <rect x="260" y="86" width="134" height="38" rx="19" fill="var(--mindmap-b1)"/>
  <text x="327" y="105" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">第一步·聊成项目</text>
  <rect x="459" y="82" width="134" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="526" y="96" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">让 AI 反问你</text>
  <rect x="459" y="128" width="121" height="28" rx="14" fill="var(--mindmap-b1-soft)" stroke="var(--mindmap-b1-line)" stroke-width="1"/>
  <text x="519" y="142" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b1-ink)">模糊想法变需求</text>
  <rect x="260" y="178" width="147" height="38" rx="19" fill="var(--mindmap-b2)"/>
  <text x="333" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">第二步·匹配搭骨架</text>
  <rect x="459" y="174" width="107" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="512" y="188" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">给参考不照抄</text>
  <rect x="459" y="220" width="107" height="28" rx="14" fill="var(--mindmap-b2-soft)" stroke="var(--mindmap-b2-line)" stroke-width="1"/>
  <text x="512" y="234" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b2-ink)">先区块后美化</text>
  <rect x="260" y="270" width="147" height="38" rx="19" fill="var(--mindmap-b3)"/>
  <text x="333" y="289" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">第三步·素材批处理</text>
  <rect x="459" y="266" width="107" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="512" y="280" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">图片整包识别</text>
  <rect x="459" y="312" width="107" height="28" rx="14" fill="var(--mindmap-b3-soft)" stroke="var(--mindmap-b3-line)" stroke-width="1"/>
  <text x="512" y="326" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b3-ink)">分配表再审核</text>
  <rect x="260" y="362" width="134" height="38" rx="19" fill="var(--mindmap-b4)"/>
  <text x="327" y="381" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">第四步·打磨上线</text>
  <rect x="459" y="358" width="90" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="504" y="372" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">统一风格</text>
  <rect x="459" y="404" width="94" height="28" rx="14" fill="var(--mindmap-b4-soft)" stroke="var(--mindmap-b4-line)" stroke-width="1"/>
  <text x="506" y="418" text-anchor="middle" dominant-baseline="central" font-size="12" fill="var(--mindmap-b4-ink)">自查后部署</text>
</svg>
</div>

1. **聊成项目**：不让 AI 先写代码，而是让它反问你，把模糊想法整理成"项目需求清单"（用户/页面/功能/数据/风格）。
2. **匹配搭骨架**：给 2–3 个参考站说清"要这种感觉不抄内容"，先产出骨架版（区块结构 + 占位图），确认结构对。
3. **素材批处理**：图片整包丢给 AI 识别分类，输出分配表，你审核后填入对应位置。
4. **打磨上线**：统一配色字体、过一遍自查清单，再部署出去让人能访问。

## 几个心态上的提醒

- **别逐行教它写**。你越微观指挥，越容易把自己绕进去。说目标、看结果、提反馈，这个循环最高效。
- **别指望一次完美**。第一版糙很正常，甚至该糙——先把方向跑通，再一轮轮打磨。这点和拍电影一样，没有一条过。
- **把报错当素材**。AI 跑出错了，别慌，把报错信息原样丢回去，它大多能自己修。你扮演的是"发现问题的人"，不是"修 bug 的人"。
- **你永远是最终把关人**。AI 不会为上线后的效果负责，风格对不对、内容准不准、有没有侵权，最后都是你拍板。

## 上线前自查清单

部署之前，过一遍这几项，能挡掉大部分"上线才发现"的低级问题：

| 检查项 | 怎么确认 |
| --- | --- |
| 链接都打得开 | 点一遍所有按钮和导航，没有死链 |
| 手机上能看 | 用窄屏看一遍，布局没崩 |
| 图片都加载 | 没有裂图、没有占位图漏网 |
| 文案没错别字 | 通读一遍，尤其首页和标题 |
| 没有别人的图 | 确认每张图你有权用 |

<aside class="callout callout--warn" role="note">
  <span class="callout__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
  <div class="callout__body">
    <p class="callout__title">避坑提醒</p>
    <div class="callout__content"><p>别在第一步没聊清时就急着要代码，也别在骨架没定时就抠细节——这两件事在前面几讲都强调过，是返工的最大来源。记住顺序：聊成项目 → 匹配搭骨架 → 素材批处理 → 打磨上线。顺序对了，vibe coding 是真的三小时出网站；顺序乱了，三天都出不了。</p></div>
  </div>
</aside>

## 小结

- vibe coding 的核心是"导演心态"：你定方向、AI 执行，不逐行教、不指望一次完美。
- 总流程四步：聊成项目 → 匹配搭骨架 → 素材批处理 → 打磨上线。
- 报错是反馈不是灾难，原样丢回去让 AI 修；你永远是把关人。
- 上线前过一遍自查清单：链接、手机布局、图片、文案、版权。
- 到这，M9 收尾。你已经能用 AI 从"一个想法"做出"一个能上线的网站"了。
