# Cloudflare 开通 + 绑卡 + 部署 Worker 步步指引

本指引面向**还没有 Cloudflare 账号**的用户，目标是把 `worker/` 里的「AI 启梦每日新闻」Worker 跑起来，让它每天自动抓取国内科技/AI 媒体，把归一化后的日报 JSON 写进 R2 公开桶，供前端站点读取。

读完后你需要拿到两个东西：

1. Worker 地址：`https://<你的子域>.workers.dev`（用于手动刷新）。
2. R2 公开 JSON 地址：`https://pub-xxxx.r2.dev/news/latest.json`（填到前端环境变量 `PUBLIC_NEWS_JSON_URL`）。

---

## 前置认知（先看这段，少走弯路）

- 本项目**完全免费**即可跑通：Cloudflare 免费额度为 R2 存储 10 GB + 零出流量计费、Worker 每天 10 万次请求。日报 JSON 每天几十 KB，永远不会触线。
- 绑卡只是为了**通过支付验证**（Cloudflare 会做一笔 $0 的预授权冻结，随即释放）。只要你不主动买付费套餐，**免费额度内永远不会真实扣费**。
- Worker 代码里**不含任何密钥**，只通过绑定读取 R2 桶；R2 公开桶只存公开日报 JSON，无隐私数据。
- 前端读取的是 R2 的**公开访问地址**（`.r2.dev` 或自定义域名），不是 S3 私有接口地址。详情见步骤 7。

---

## 步骤 1：注册 Cloudflare 免费账号

1. 打开 https://dash.cloudflare.com/sign-up
2. 用常用邮箱注册（QQ / 163 / Gmail 均可），验证邮箱完成注册。
3. 登录后进入控制台首页。此时账号是免费的，无需任何付费。

> 如果你已经有 Cloudflare 账号并登录，直接从步骤 2 开始。

---

## 步骤 2：绑定支付方式（最关键，按你的卡选择）

Cloudflare 开通 R2 必须先绑定一种支付方式并通过 $0 预授权。下面按你手里的卡分两种情况。

### 情况 A（最省事）：你有带 Visa / Mastercard 标志的双币或全币信用卡

国内各大行（中行、工行、建行、招行等）发行的双币/全币信用卡都带 Visa 或 Mastercard 标，直接在 Cloudflare 绑即可：

1. 控制台右上角点头像 → **My Profile**（我的资料）。
2. 左侧菜单 **Billing**（账单）→ **Payment Methods**（支付方式）→ **Add a payment method**（添加支付方式）。
3. 选 **Credit/Debit Card**，填入卡号、有效期、CVV、账单地址（按卡面英文信息填，账单地址选 China 并填真实拼音地址）。
4. 提交后 Cloudflare 会做一笔 **$0 预授权冻结**并立刻释放，卡里不会少钱。

### 情况 B：你只有「纯银联卡」（卡面只有 UnionPay，无 Visa/Mastercard 标）

Cloudflare 的 Billing 直接绑国内银联卡通常会被拒。正确路径是：**先用 PayPal 香港站把银联卡绑到 PayPal，再把 PayPal 绑到 Cloudflare**。

> 注意：必须是 **PayPal 香港站**（paypal.com/hk），不能用 paypal.com（美国站大陆卡无法验证），也不能用国内 PayPal 个人号（国内个人号不允许绑定银行卡作为付款方式）。

1. 打开 https://www.paypal.com/hk 点 **注册**（Sign Up），地区选「香港 Hong Kong」。
2. 注册类型选 **个人账户**（Personal），用邮箱注册并完成验证。
3. 进入钱包（Wallet）→ **关联卡/银行账户** → 选「银行卡」，填入你的银联卡信息。香港站通常支持绑定大陆发行的银联卡作为付款方式。
4. 验证通过后，回到 Cloudflare **Billing → Payment Methods → Add a payment method**，这次选 **PayPal**，按提示授权登录你的 PayPal 香港账号并完成关联。
5. 关联成功后 Cloudflare 同样做一笔 $0 预授权，随即释放。

### 免费额度提醒（再说一次）

绑卡只用于通过支付验证。**R2 免费 10 GB 存储 + 零出流量费、Worker 免费 10 万请求/天**，日报场景用不到付费部分。除非你主动在控制台升级付费计划，否则不会产生费用。账单页可随时解绑。

---

## 步骤 3：开通 R2 并创建公开桶

1. 控制台左侧菜单找到 **R2** 并进入；首次进入会提示 **Add subscription**（添加订阅）——点进去，按提示用步骤 2 绑好的支付方式确认（同样是 $0 验证，不扣费）。
2. 订阅后点 **Create bucket**（创建存储桶）：
   - **Bucket name** 必须填：`ai-qimeng-news`（与代码里的桶名一致，否则 Worker 写不进去）。
   - 地区选离你近的（如 APAC），其余默认。
   - 勾选 / 开启 **公开访问（Public access / Public development preview）**。如果创建时没开，进桶后到 **Settings → Public access → Enable** 也能补开。
3. 记下桶创建成功后的**公开访问地址**：在桶的 Settings → Public access 里会显示一个形如 `https://pub-xxxxxxxx.r2.dev` 的地址，这就是前端要用的基地址（详见步骤 7）。
4. 设置桶的 CORS，允许前端站点跨域读取。在 `worker/` 目录下执行（也可在本地终端执行，需先装好 wrangler，见步骤 4）：

   ```bash
   wrangler r2 bucket cors put ai-qimeng-news --json '[{"AllowedOrigins":["https://cyss-a.github.io"],"AllowedMethods":["GET","HEAD"],"AllowedHeaders":["*"],"ExposeHeaders":["ETag","Content-Length"],"MaxAgeSeconds":3600}]'
   ```

   - 如果提示命令格式不符（不同 wrangler 版本），可改用文件方式：先建 `cors.json` 写入上面的 JSON 数组，再执行
     `wrangler r2 bucket cors put ai-qimeng-news --file cors.json`（仓库已附 `worker/cors.json`，内容同上）。
   - **多源站场景**：若你的前端最终部署在 EdgeOne / 自定义域名等其它地址，把那个源也加进 `AllowedOrigins` 数组即可，例如
     `"AllowedOrigins":["https://cyss-a.github.io","https://你的自定义域名"]`。

> **关于 Worker 运行地域的重要说明（务必读）**：Worker 运行在 Cloudflare 的**亚太边缘节点（香港 / 新加坡 / 日本 / 台湾）**，**并非中国大陆节点**，不会也不能"突破防火长城"。其价值在于两点：(1) 亚太边缘离国内源站网络路径相对更稳，抓取国内科技媒体 RSS 比从海外或本机更可靠；(2) 抓取后写入 R2，R2 + Cloudflare CDN 能把 `latest.json` 就近分发，中国大陆用户访问 `pub-xxxx.r2.dev` 或自定义域名时延迟更低。站点本身仍托管在 GitHub Pages，与 Worker/R2 是两套独立设施。不要把"亚太边缘"理解为"在中国境内执行"或"绕过 GFW"。

---

## 步骤 4：本地准备（安装 wrangler 并登录）

1. 确认本机已装 Node.js（建议 18 及以上，本项目开发机为 v22）：
   ```bash
   node --version
   ```
2. 安装 Wrangler（Cloudflare 的命令行工具），二选一：
   - 全局安装：`npm install -g wrangler`
   - 或只用 npx（不全局装）：后续命令把 `wrangler` 换成 `npx wrangler`
3. 登录 Cloudflare（会打开浏览器授权）：
   ```bash
   wrangler login
   ```
   按提示在浏览器里授权，授权成功终端会提示 logged in。
4. 进入项目里的 `worker/` 目录（本文件同级的上一级 `worker/`）：
   ```bash
   cd worker
   ```

---

## 步骤 5：部署 Worker

在 `worker/` 目录下执行：

```bash
wrangler deploy
```

部署成功后会输出你的 Worker 地址，形如：

```
https://ai-qimeng-daily-news.<你的子域>.workers.dev
```

其中 `<你的子域>` 是 Cloudflare 账号的默认 workers.dev 子域（首次部署会让你设置，或在控制台 **Workers & Pages → 你的 Worker → 设置** 里查看）。

> 说明：`worker/wrangler.toml` 里已设 `workers_dev = true`，所以默认就部署到 `*.workers.dev`，无需额外配置域名。

---

## 步骤 6：立即生成首日数据

部署后定时任务要等到次日北京 09:00 才首次跑。想立刻看到数据，手动触发一次：

```bash
curl "https://ai-qimeng-daily-news.<你的子域>.workers.dev/?refresh=1"
```

返回一段 JSON 即表示成功，里面含 `count`（写入条数）、`date`、`sourceStats`（各源抓取条数）。随后可访问：

```
https://pub-xxxxxxxx.r2.dev/news/latest.json
```

确认能拿到日报 JSON。

> 本地调试也可：`wrangler dev` 启动后访问 `http://localhost:8787/?refresh=1`；或在 `wrangler dev` 运行时用 `curl` 触发，Dev 环境同样会写 R2。

---

## 步骤 7：把 R2 公开地址填到前端

前端通过环境变量 `PUBLIC_NEWS_JSON_URL` 读取日报 JSON。取值为步骤 3 拿到的公开地址 + `/news/latest.json`：

- 公开地址格式：`https://pub-xxxxxxxx.r2.dev/news/latest.json`
  （控制台 R2 → `ai-qimeng-news` → Settings → Public access 中查看 `pub-xxxx.r2.dev` 这一串）
- 若你给桶绑了自定义域名（需域名本身已在 Cloudflare 托管），地址则是 `https://你的域名/news/latest.json`。

> 注意区分两种地址：
> - `https://pub-xxxx.r2.dev/...` 是**公开访问地址**，浏览器和前端 `fetch` 能直接读，用于 `PUBLIC_NEWS_JSON_URL`。该 `r2.dev` 地址为**开发预览地址**，生产环境建议在 Cloudflare 托管自有域名并绑到桶（见步骤 3 桶设置），用自定义域名提供 JSON 更稳更可控。
> - `https://ai-qimeng-news.r2.cloudflarestorage.com/...` 是 **S3 兼容私有接口地址**，需要密钥才能访问，只给服务端工具用，**不要**填给前端。

填写方式（二选一）：

- 方式一：在站点根目录 `.env` 写入（Astro 只把 `PUBLIC_` 前缀的变量暴露给前端）：
  ```bash
  # 站点根目录/.env
  PUBLIC_NEWS_JSON_URL=https://pub-xxxxxxxx.r2.dev/news/latest.json
  ```
- 方式二：在部署平台（EdgeOne Pages / GitHub Pages Actions 等）的环境变量里设置同名 `PUBLIC_NEWS_JSON_URL`。

改完环境变量后重新构建并部署前端站点即可生效。

---

## 步骤 8：日常运行说明

- **每日自动更新**：`worker/wrangler.toml` 里的 Cron Trigger `0 1 * * *`（UTC 01:00 = 北京时间 09:00）会每天自动跑一次 `runFetch`，刷新 `news/latest.json` 与当日文件，并更新 `news/index.json`（保留最近 14 天，旧的自动清理）。你无需做任何事。
- **手动刷新**：随时访问 `https://<你的子域>.workers.dev/?refresh=1`（或 POST 该地址）即可立即重新生成。
- **健壮性**：若某天抓取到的有效条目少于 5 条（源大面积异常），Worker 会跳过写入、保留上一期 `latest.json`，避免用空数据覆盖真实内容；可在 Worker 的日志（控制台 **Workers & Pages → 你的 Worker → Logs**）里看到 warn。

---

## 安全提示

- Worker 代码不含任何密钥；R2 通过 `wrangler.toml` 的绑定 `NEWS_BUCKET` 注入，不使用明文凭证。
- R2 桶设为**公开**只用于存放公开日报 JSON，不含任何用户隐私或后台数据；如需完全私有，可改为签名 URL 方案（超出本 MVP 范围）。
- 绑卡仅用于通过 Cloudflare 的 $0 支付验证；免费额度内永不计费，账单页可随时解绑支付方式。
