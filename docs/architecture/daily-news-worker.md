# AI 热点日报 · Cloudflare Worker + R2 数据管线架构

- 版本：v1.0
- 日期：2026-08-12
- 作者：高见远（首席架构师）
- 关联决策：ADR-021（日报抓取迁 Cloudflare Worker + R2，前端运行时渲染）
- 关联代码：`scripts/fetch-news.py`（build-time 兜底生成器）、`src/pages/m7/index.astro`、`src/styles/components-lesson.css`

> 本文是给执行者的契约（规格即契约）：点名对象布局、JSON 字段语义、源清单、CORS、前端渲染契约、风险缓解与验收步骤。遵循 P0 铁律：无 emoji 图标、无紫粉渐变、配色走 design token。

---

## 1. 目标与范围

把 M7 日报的「抓取」从 GitHub Actions 迁到 Cloudflare Worker + R2，实现：

1. 每日北京时间 09:00 在亚太边缘稳定抓取国内科技 / AI 媒体。
2. 结果以 JSON 存入 R2，前端运行时拉取渲染，免重建、真正每日更新。
3. 抓取源从原有 6 个扩展到约 17 个，覆盖更全。
4. build-time 内容作为 SEO + 即时兜底，运行时内容作为新鲜度增强，二者优雅共存。

**明确不做**：
- 不接管站点托管（站点仍在 GitHub Pages `cyss-a.github.io/ai-qimeng/`）。
- 不在 Worker 内做 LLM 摘要 / 翻译（摘要由「截取正文首段 / description ≤ 80 字」确定性生成，零外部依赖、零成本）。
- 不引入前端框架；运行时渲染用原生 `<script>` 渐进增强。

---

## 2. 数据流

```
┌──────────────────────────────────────────────────────────────────────┐
│  Cloudflare Worker  (Cron: 0 1 * * * UTC = 北京时间 09:00)             │
│                                                                        │
│   ┌────────┐ ┌────────┐ ┌────────┐   ... 并发抓取 17 个源             │
│   │量子位   │ │机器之心 │ │智东西   │                                     │
│   │RSS     │ │RSS     │ │RSS     │                                     │
│   └───┬────┘ └───┬────┘ └───┬────┘                                     │
│       │ fetch      │ fetch      │ fetch                                 │
│       │ (浏览器 UA + 15s 超时 + 失败跳过)                               │
│       ▼            ▼            ▼                                       │
│   ┌────────────────────────────────────────────────────────────────┐  │
│   │ 归一化层                                                        │  │
│   │  解析 RSS / HTML → 统一 item(id,title,summary,source,url,      │  │
│   │  pubDate) → URL 去重 → 摘要截断(≤80 中文字) → 时区归一(+08:00) │  │
│   │  健壮性：单源失败跳过；聚合后 <5 条 → 不覆盖 latest.json       │  │
│   └───────────────────────────────┬────────────────────────────────┘  │
│                                    │ write (覆盖 latest / 写归档 / 写索引)│
│                                    ▼                                   │
│   ┌────────────────────────────────────────────────────────────────┐  │
│   │ R2 bucket: ai-qimeng-news                                       │  │
│   │   news/latest.json        (当日最新，每日覆盖写)                │  │
│   │   news/YYYY-MM-DD.json    (每日归档，保留近 14 天)              │  │
│   │   news/index.json         (可用日期数组，降序)                  │  │
│   └───────────────────────────────┬────────────────────────────────┘  │
└───────────────────────────────────┼────────────────────────────────────┘
                                      │ GET  (CORS 仅放行 https://cyss-a.github.io)
                                      ▼
┌──────────────────────────────────────────────────────────────────────┐
│  浏览器  (GitHub Pages: cyss-a.github.io/ai-qimeng/m7/)                │
│                                                                        │
│   1) Build-time: Astro 渲染 src/content/lessons/m7/*.md（SEO + 即时） │
│   2) Runtime:    <script> fetch(latest.json) → 若 date > build-date  │
│      用 .daily-card 样式覆盖 .daily-grid                              │
│   3) 失败 / CORS 阻断 → 静默保留 build-time 内容（优雅降级）         │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. R2 对象布局（锁定）

| 对象键 | 内容 | 写入策略 | 缓存头建议 |
|--------|------|----------|------------|
| `news/latest.json` | 当日最新聚合（envelope + items） | 每日 Cron 覆盖写；`<5` 条时跳过不写 | `public, max-age=300, s-maxage=300` |
| `news/YYYY-MM-DD.json` | 当日归档副本 | 每日 Cron 写一次（与 latest 同源） | `public, max-age=86400`（不可变，按日期） |
| `news/index.json` | 可用日期字符串数组，降序，如 `["2026-08-12","2026-08-11",...]` | 每日 Cron 重建（prepend 今日，prune > 14 天） | `public, max-age=300, s-maxage=300` |

- Bucket 名：`ai-qimeng-news`（运维开通）。
- 所有对象 `Content-Type: application/json; charset=utf-8`。
- **保留策略**：每次运行列举 `news/YYYY-MM-DD.json`，删除早于 14 天的归档（latest/index 不参与过期）。
- 公开访问方式（二选一，主决策为 A）：
  - **A. R2 公开桶 + 自定义域名**：在 Cloudflare 给自有域名加 `news.<domain>` 子域，R2 自定义域托管；CORS 见 §7。
  - **B. r2.dev 公开 URL**：`https://pub-<hash>.r2.dev/news/latest.json`（开发便捷，但 Cloudflare 建议生产用自定义域；若 r2.dev 有配额/稳定性顾虑，启用 §7 的 Worker 代理增强）。

---

## 4. JSON 数据契约（基线 + 校验 refined）

### 4.1 Envelope（`latest.json` / `YYYY-MM-DD.json`）

```json
{
  "version": 1,
  "date": "2026-08-12",
  "generatedAt": "2026-08-12T01:05:00Z",
  "count": 20,
  "sources": ["量子位", "机器之心", "智东西"],
  "items": [
    {
      "id": "a1b2c3d4e5f6",
      "title": "中文标题",
      "summary": "≤80 中文字的摘要，由 Worker 截取正文首段或 description 生成。",
      "source": "量子位",
      "url": "https://www.qbitai.com/xxx",
      "pubDate": "2026-08-12T00:30:00+08:00"
    }
  ]
}
```

**字段语义（refined 相对团队基线）**：

| 字段 | 类型 | 说明 / refined 约束 |
|------|------|---------------------|
| `version` | int | **新增**，契约版本号，当前 `1`。用于前端前向兼容（未来加字段不破坏旧解析）。 |
| `date` | string | 日报日期 `YYYY-MM-DD`（北京时间当天）。 |
| `generatedAt` | string | ISO8601 UTC，如 `2026-08-12T01:05:00Z`（即北京 09:05）。 |
| `count` | int | `items` 实际条数（= `items.length`）。 |
| `sources` | string[] | **新增**，本次成功抓取到 ≥1 条的源 display name 列表；前端可用于标注「今日覆盖 N 个源」，也便于排查某源长期缺失。 |
| `items` | object[] | 归一化后的条目数组，按 `pubDate` 降序。 |
| `items[].id` | string | 基于 `url` 的**稳定哈希**：`sha1(url).hexdigest()[:12]`（12 位十六进制，约 48 bit，< 1 万条碰撞可忽略）。同 URL 跨运行 id 不变，用作前端 key 与去重键。 |
| `items[].title` | string | 中文标题（已去 HTML 标签）。 |
| `items[].summary` | string | ≤ 80 **中文字**摘要（按 Unicode 码点计数，非字节）。来源：优先 `description`/og:description/正文首段；剥离 HTML 与常见中文稿前缀（复用 `fetch-news.py` 的 `META_PREFIX_PATTERNS`）；超长截断并追加 `…`。 |
| `items[].source` | string | 媒体 display name，**必须匹配 Worker SOURCE_REGISTRY 中的受控词表**（见 §5），保证前端拿到一致的标签与配色。 |
| `items[].url` | string | 文章规范绝对 URL（已补全协议与 host）。 |
| `items[].pubDate` | string | RFC3339 含时区偏移；源未给时区时**默认 `+08:00`**（中国大陆）。 |

### 4.2 `index.json`

```json
["2026-08-12", "2026-08-11", "2026-08-10"]
```

- 纯字符串数组，降序；仅含保留期内（近 14 天）且有成功归档的日期。
- 前端「往期日报」面板据此渲染可选日期；点击后 `fetch('news/<date>.json')` 渲染该日卡片。

### 4.3 归一化规则（Worker 侧，对齐 `fetch-news.py`）

- **摘要截取**：`strip_html` → `clean_description`（去「作者｜编辑｜头图来源」等前缀）→ 按字符截断至 ≤ 80 → 截断追加 `…`。
- **去重**：以 `url` 为键（无 url 时退化为 `title`）；跨源同链只留首条。
- **时区归一**：解析常见 RSS 日期格式；缺失偏移则补 `+08:00`。
- **数量控制**：每源上限 `MAX_PER_SOURCE=8`，全局上限 `MAX_TOTAL=24`（保持卡片网格均衡，原脚本为 10 / 20，此处略放宽以容纳更多源）。
- **健壮性下限**：聚合后有效条目 `< MIN_ITEMS=5` → **不写 `latest.json`、不写当日归档**，保留上一期真实内容（与 `fetch-news.py` 第 250 行语义一致），`exit 0`。

---

## 5. 抓取与归一化逻辑

- **并发抓取**：Worker 内对 SOURCE_REGISTRY 并发 `fetch`，每个请求带浏览器 UA + `Accept: application/rss+xml, application/xml, text/xml, */*`，超时 15s；单源异常（网络/解析/超时）打印日志并跳过，不影响其他源。
- **解析分支**：
  - RSS 源：解析 `<channel><item>`，取 `title/link/pubDate/description`。
  - HTML 兜底源（无 RSS 者）：抓取文章列表页，按 `<article>` / `<a>` + `og:title` / `meta description` 提条目（见 §6 标注）。兜底解析较脆，建议优先依赖 RSS 源。
- **受控词表（SOURCE_REGISTRY）**：每项含 `id / display / type(rss|html) / url / risk`。`display` 即写入 `source` 字段的值，前端据此映射展示名与配色 token。新增源只改此表，不动解析主流程。

---

## 6. 扩展后的国内源清单

> 类型：`rss` = 官方/稳定 RSS；`html` = 需 HTML 兜底解析（较脆）；`bridge` = 经第三方 RSS 桥接（依赖外部服务，可达性风险高）。
> 可达性风险：低 = 公开 RSS 稳定；中 = 偶有反爬/限流；高 = 依赖第三方或反爬强。

| # | 媒体 | 类型 | 源地址（已联网核验） | 可达性风险 | 备注 |
|---|------|------|----------------------|------------|------|
| 1 | 量子位 | rss | `https://www.qbitai.com/rss` | 低 | 原 6 源之一，AI 流量头部 |
| 2 | 机器之心 | rss | `https://www.jiqizhixin.com/rss` | 低 | 原 6 源之一，技术深度 |
| 3 | 极客公园 | rss | `https://www.geekpark.net/rss` | 低 | 原 6 源之一 |
| 4 | 36氪 | rss | `https://36kr.com/feed` | 中 | 原 6 源之一，有 AI 频道；偶有反爬 |
| 5 | 爱范儿 | rss | `https://www.ifanr.com/feed` | 低 | 原 6 源之一 |
| 6 | 钛媒体 | rss | `https://www.tmtpost.com/feed` | 低 | 原 6 源之一 |
| 7 | 智东西 | rss | `https://zhidx.com/rss` | 低 | 经搜索核验返回 RSS（含 `+0800`） |
| 8 | 少数派 | rss | `https://sspai.com/feed` | 低 | 数字生活 / AI 工具向 |
| 9 | 品玩 PingWest | rss | `https://www.pingwest.com/feed/all` | 低 | 科技创新 |
| 10 | 虎嗅 | rss | `https://www.huxiu.com/rss/0.xml` | 中 | 商业/科技；RSS 路径偶变 |
| 11 | IT之家 | rss | `https://www.ithome.com/rss/` | 低 | 消费电子快讯 |
| 12 | cnBeta | rss | `https://www.cnbeta.com/backend.php` | 低 | IT 业界资讯 |
| 13 | 动点科技 TechNode | rss | `https://cn.technode.com/feed/` | 低 | 创业/科技（中英） |
| 14 | 猎云网 | rss | `https://www.lieyunwang.com/feed` | 中 | 创投/AI 融资动态 |
| 15 | 雷锋网 | rss | `https://www.leiphone.com/feed` | 低 | AI / 机器人垂直 |
| 16 | InfoQ 中文 | rss | `https://www.infoq.cn/rss`（AI 专题经 RSSHub `https://rsshub.app/infoq/topic/31`） | 中 | 工程/AI；官方 rss 偏综合，AI 精选走 RSSHub |
| 17 | 新智元 | bridge | `https://decemberpei.cyou/rssbox/wechat-xinzhiyuan.xml`（第三方微信转 RSS） | 高 | 无官方 RSS；依赖第三方桥接，可能限流/失效；建议设 `html` 兜底或暂列观察 |

**源清单治理**：
- 主依赖 RSS 源（#1–#15 + #16 官方），`bridge` 源（#17）作为可选增强，缺失不触发 `<5` 保护。
- 新增源 = 在 SOURCE_REGISTRY 追加一项；移除/失效源 = 删项。建议 Worker 每次运行记录各源成功/失败计数，便于长期观测。
- **与 build-time 兜底同步**：`fetch-news.py` 当前用原 6 源；建议将其源列表扩到与 Worker 一致（或至少保持重叠），避免「build-time 兜底内容与 runtime 内容来源差异过大」。MVP 可先让 build-time 维持原 6 源、Worker 用全量 17 源。

---

## 7. CORS 与跨域

R2 公开桶需允许来自站点域的只读跨域请求（仅 `https://cyss-a.github.io`，不含子路径；GitHub Pages 项目页的源就是该 origin）。

**CORS 策略（应用到 bucket `ai-qimeng-news`）**：

```json
[
  {
    "AllowedOrigins": ["https://cyss-a.github.io"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag", "Content-Length"],
    "MaxAgeSeconds": 3600
  }
]
```

- 仅 `GET`/`HEAD`、仅放行站点 origin；不加自定义请求头 → **不触发浏览器预检（preflight）**，降低配置敏感度。
- 运维命令形态（精确写法见 devops guide）：`wrangler r2 bucket cors put ai-qimeng-news --file cors.json`（或 `--json '<...>'`）。
- 验证：从 `https://cyss-a.github.io/ai-qimeng/m7/` 的浏览器控制台 `fetch('https://<桶域名>/news/latest.json')` 返回 200 且无 CORS 报错。

**可选增强（Worker 代理，规避 r2.dev 依赖）**：同一 Worker 增加路由 `GET /news/*`，读 R2 对象后在响应里手动加 `Access-Control-Allow-Origin: https://cyss-a.github.io` 与 `Cache-Control`，前端改为请求 Worker 域名。此增强在 r2.dev 公开桶于生产有配额/稳定性顾虑时启用；本架构主决策仍为「R2 公开桶 + CORS」。

---

## 8. 前端运行时渲染契约

渲染分工（渐进增强，不引框架）：

1. **Build-time（兜底，SEO + 即时）**：`src/pages/m7/index.astro` 维持现状，读取 `src/content/lessons/m7/*.md` 渲染 `.daily-grid` / `.daily-card`（复用 `src/styles/components-lesson.css`）。在 `.daily-page` 容器上挂 `data-build-date="<build 时已知最新日期>"` 与 `data-news-json="<桶域名>/news/latest.json"`，供脚本读取。
2. **Runtime（新鲜度增强）**：页面底部加一段 `<script type="module">`：
   - `fetch(data-news-json)` → 解析 envelope。
   - 若 `envelope.date > data-build-date`：用 `envelope.items` 重新生成 `.daily-grid` 内部 HTML，每条复用 `.daily-card` 结构（`title` 走配色 token 轮转数组 `[--m1..--m8, --success, --m10]`，与原 `fetch-news.py` 的 `TITLE_COLORS` 对齐，**禁止硬编码色值**；`summary` 截断 3 行由 CSS `-webkit-line-clamp` 控制；`link` 新窗口打开 `rel="noopener noreferrer"`）。
   - 否则保持 build-time 内容（当日已是最新）。
3. **优雅降级**：`fetch` 失败 / CORS 拦截 / JSON 非法 → 静默保留 build-time 内容，不抛错、不白屏。禁用 JS 时 build-time 内容完整可读。
4. **归档面板**：新增「往期日报」增强——`fetch('news/index.json')` 拿到日期数组，渲染可选日期，点击后 `fetch('news/<date>.json')` 覆盖卡片网格（与 latest 同渲染函数）。

**前端需向架构确认的契约要点**：
- `latest.json` / 日期 `.json` 的 envelope 字段（§4.1）与 `index.json` 数组（§4.2）。
- `id` 为 URL 的 sha1 前 12 位，作 React/模板 key。
- `summary` 已是 ≤ 80 中文字，前端无需再截断（仅 CSS 行数截断）。
- `pubDate` 已含时区，前端按本地时区格式化即可。
- 配色**仅用 design token 轮转**，不引入新色板。

---

## 9. 关键风险与缓解

| 风险 | 影响 | 缓解 |
|------|------|------|
| CORS 配错 | 浏览器拦截 `fetch`，runtime 渲染失效 | build-time 兜底保证不白屏；运维按 §7 配并真机验证；用无自定义头的 GET 免预检 |
| 单源临时不可达 | 少几条内容 | 单源失败跳过（§5）；17 源 + `MIN_ITEMS=5` 冗余充足 |
| 反爬 / UA 封锁（36氪、虎嗅） | 个别源长期缺 | 浏览器 UA + Accept；失败计数观测；必要时加 `html` 兜底或降权 |
| r2.dev 生产配额/稳定性 | JSON 拉取不稳 | 用自定义域（§3 A）；或启用 §7 Worker 代理增强 |
| JSON 契约漂移 | 前端解析失败 | envelope 带 `version`；前端容错解析（缺字段补默认） |
| 时区不一致 | 排序/日期错乱 | 缺偏移默认 `+08:00`；统一 RFC3339（§4.1） |
| Worker Cron 抖动 | 非精确 09:00 | Cloudflare Cron 允许秒级偏差，日报场景可接受 |
| R2 覆盖写最终一致 | 边缘短暂旧值 | `latest.json` 覆盖 + CDN `max-age=300`；前端可加 `?ts=` 防缓存（可选） |
| 源清单与 build-time 不一致 | 兜底内容与 runtime 差异大 | 保持 SOURCE_REGISTRY 与原列表同步意识（§6 治理） |

**Cloudflare 中国可达性澄清（写入用户指引）**：Worker 跑在 Cloudflare 亚太边缘（HK/SG/JP/TW），**非**中国大陆节点；价值是「亚太边缘抓国内源更稳」+「R2/CDN 把 JSON 就近投递给大陆用户」，不是「在大陆执行」或「绕过 GFW」。站点仍由 GitHub Pages 托管。

---

## 10. 成本评估

| 资源 | MVP 用量 | 免费额度 | 结论 |
|------|----------|----------|------|
| Worker 请求 | 日级 Cron 1 次 + 并发抓 ~17 源 + 写 3 对象 ≈ 数十次/日 | 10 万次/日 | 远低于阈值 |
| Worker CPU | 单次 Cron 秒级（抓 + 归一） | 免费档 10ms/请求上限；Cron 触发可放宽，实测秒级内完成 | 足够 |
| R2 存储 | 14 个日期归档（每 ~10–30KB）+ latest + index ≈ 数百 KB | 10 GB | 忽略 |
| R2 操作 | 日写 ~3 Class A + 读（按 PV） | 1M Class A / 月、10M Class B / 月 | 远低于阈值 |

结论：整套管线在 Cloudflare 免费额度内运行，MVP 阶段零边际成本。

---

## 11. 端到端验收步骤

1. **Worker 跑通**：手动 `wrangler dev` 或触发一次 Cron，控制台输出各源成功/失败计数；写入 `latest.json` 含 `version/date/generatedAt/count/sources/items`，`items` 每条字段齐全。
2. **健壮性**：临时把某源 URL 改错 → 该源跳过、其余正常、`<5` 时 `latest.json` 不被覆盖（保留旧值）。
3. **R2 布局**：确认 `news/latest.json`、`news/<今日>.json`、`news/index.json` 三对象存在；`index.json` 为降序数组；第 15 天运行后最旧归档被清理。
4. **CORS**：从 `https://cyss-a.github.io/ai-qimeng/m7/` 控制台 `fetch` 桶域名 `latest.json` 返回 200、无 CORS 报错；`AllowedOrigins` 仅含 `https://cyss-a.github.io`。
5. **前端渲染**：
   - 构建部署后访问 `/m7/`，build-time 卡片立即可见（SEO 内容在 HTML 源码中）。
   - 等待 09:00 后（或手动触发 Worker）刷新，runtime 脚本用 `latest.json` 覆盖网格（日期新于 build-date 时）。
   - 断网/CORS 错 → 仍显示 build-time 内容，无白屏。
   - 归档面板：`index.json` 渲染日期，点击切换对应日期 `.json` 内容。
6. **配色合规**：运行时卡片配色仅来自 design token 轮转，DOM 中无 emoji、无硬编码色值、无第二套图标库。
7. **回滚**：Worker/R2 故障期间，站点由 build-time 兜底，日报页始终有内容。

---

## 12. 关联 ADR 与文件

- ADR-021：本管线的决策依据。
- ADR-001 / ADR-003：站点静态本质与 GitHub Pages 托管不变。
- `scripts/fetch-news.py`：build-time 兜底生成器（源列表、健壮性语义被复用扩展）。
- `src/pages/m7/index.astro`：渲染页（build-time 兜底 + runtime 覆盖契约）。
- `src/styles/components-lesson.css`：`.daily-grid` / `.daily-card` 样式被运行时渲染复用。
- devops guide：Cloudflare 开通 + 绑卡 + Worker/R2 创建 + `wrangler` CORS 命令的步步指引（另出）。
