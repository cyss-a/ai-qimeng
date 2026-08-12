#!/usr/bin/env bash
# ==========================================================================
#  AI 启梦 · 一键部署 Cloudflare Worker + R2 日报管线
#  用法：
#    1) 已在 Cloudflare 控制台绑定支付方式（Billing -> Payment Methods）
#       —— 不绑卡 R2 建不了桶。绑卡仅 $0 预授权，免费额度内永不计费。
#    2) 本机装好 Node.js 18+ 和 jq（mac: brew install jq；Ubuntu: apt install jq）
#    3) 终端先登录一次： wrangler login   （会打开浏览器授权）
#    4) 在项目根目录执行： bash deploy-cloudflare.sh
#  脚本会：建桶 -> 开公开访问 -> 设 CORS -> 部署 Worker -> 生成首日数据
#          -> 写入 news-url.txt -> 提交并 push（GitHub Actions 重建即启用日更）
# ==========================================================================
set -euo pipefail

echo "========== 前置检查 =========="
command -v node >/dev/null 2>&1 || { echo "缺少 Node.js，请先装：https://nodejs.org"; exit 1; }
command -v jq   >/dev/null 2>&1 || { echo "缺少 jq，请先装（brew install jq / apt install jq）"; exit 1; }
if ! command -v wrangler >/dev/null 2>&1; then
  echo "未检测到 wrangler，正在全局安装..."
  npm install -g wrangler
fi

# 登录态校验
if ! ACCOUNT_ID=$(wrangler whoami 2>&1 | grep -oE '[0-9a-f]{32}' | head -1) || [ -z "$ACCOUNT_ID" ]; then
  echo "未登录或获取不到 Account ID，请先执行： wrangler login"
  exit 1
fi
echo "Account ID: $ACCOUNT_ID"

CONFIG="${HOME}/.wrangler/config.json"
if [ ! -f "$CONFIG" ]; then
  echo "找不到 $CONFIG，请先执行： wrangler login"
  exit 1
fi
TOKEN=$(jq -r '.oauth_token // .api_token // empty' "$CONFIG")
[ -z "$TOKEN" ] && { echo "wrangler 凭证为空，请重新 wrangler login"; exit 1; }

BUCKET="ai-qimeng-news"
echo
echo "========== 1/6 创建 R2 桶 $BUCKET =========="
wrangler r2 bucket create "$BUCKET" 2>&1 | grep -vi "already exists" || true

echo
echo "========== 2/6 开启 r2.dev 公开访问 =========="
curl -s -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET/r2.dev" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"enabled":true}' >/dev/null

PUB=$(curl -s "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET/r2.dev" \
  -H "Authorization: Bearer $TOKEN" | jq -r '.result.public_bucket_id // empty')
if [ -z "$PUB" ]; then
  echo "未能自动获取 r2.dev 地址。请到 Cloudflare 控制台 -> R2 -> $BUCKET -> Settings -> Public access 手动开启，"
  echo "然后把 pub-xxxx.r2.dev 记下来，手动执行本脚本末尾的‘写 news-url.txt’部分。"
  exit 1
fi
PUBLIC_URL="https://$PUB.r2.dev/news/latest.json"
echo "公开 JSON 地址: $PUBLIC_URL"

echo
echo "========== 3/6 设置桶 CORS（允许本站跨域读取）=========="
wrangler r2 bucket cors put "$BUCKET" --file worker/cors.json 2>&1 || \
wrangler r2 bucket cors put "$BUCKET" --json '[{"AllowedOrigins":["https://cyss-a.github.io"],"AllowedMethods":["GET","HEAD"],"AllowedHeaders":["*"],"ExposeHeaders":["ETag","Content-Length"],"MaxAgeSeconds":3600}]' 2>&1 || \
echo "（CORS 设置失败，请到控制台手动添加 AllowedOrigins: https://cyss-a.github.io 的 GET/HEAD）"

echo
echo "========== 4/6 部署 Worker =========="
( cd worker && wrangler deploy )

echo
echo "========== 5/6 生成首日数据 =========="
SUB=$(jq -r '.workers_dev.subdomain // empty' "$CONFIG" 2>/dev/null || true)
if [ -n "$SUB" ]; then
  echo "触发 https://ai-qimeng-daily-news.$SUB.workers.dev/?refresh=1"
  curl -s "https://ai-qimeng-daily-news.$SUB.workers.dev/?refresh=1" && echo
else
  echo "未读到 workers.dev 子域，请手动执行："
  echo "  curl \"https://ai-qimeng-daily-news.<你的子域>.workers.dev/?refresh=1\""
fi

echo
echo "========== 6/6 写 news-url.txt 并提交 =========="
printf '%s' "$PUBLIC_URL" > news-url.txt
echo "已写入 news-url.txt: $PUBLIC_URL"

git add -f news-url.txt deploy-cloudflare.sh
git commit -m "ci: 注入 R2 日报地址，启用运行时日更 [skip ci]" || echo "（无新提交）"
git push

echo
echo "完成。GitHub Actions 会重建站点并启用每日 R2 更新。"
echo "确认日报 JSON： $PUBLIC_URL"
echo "说明：Worker 每天北京时间 09:00 自动刷新；想手动刷新访问 worker 地址 + ?refresh=1"
