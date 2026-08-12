# 部署与发布清单 · AI 新手启蒙课程

静态站点（Astro 7 `output: 'static'`），构建产物在 `dist/`。无后端、无登录，纯静态文件即可托管。

## 前置：发布前必做

1. **设置真实域名**：编辑 `astro.config.mjs` 的 `site` 字段（当前为 `https://ai-qimeng.example.com`），改为你计划使用的正式域名。这影响 sitemap / canonical 绝对路径。
2. **重新构建**：`npm run build`（产物输出到 `dist/`）。
3. **本地预览（可选但推荐）**：
   ```bash
   cd dist && python3 -m http.server 4321
   # 浏览器打开 http://localhost:4321/ 走查首页 + 任意课程页 + 404
   ```

## 方案 A（主推）：腾讯 EdgeOne Pages

国内访问快、与 知识星球 分发场景契合。

- 安装/使用 EdgeOne Pages CLI：
  ```bash
  npx edgeone pages deploy dist
  ```
  按提示登录腾讯云账号并绑定/新建项目；如需非交互（CI），配置令牌环境变量后执行。具体子命令与令牌变量以 [EdgeOne Pages 官方文档](https://cloud.tencent.com/document/product/1552) 为准。
- 或在 EdgeOne 控制台「Pages」中直接关联 Git 仓库，开启推送到主分支自动部署。

## 方案 B（兜底）：GitHub Pages

适合已有 GitHub 账号、希望免费托管的场景。

1. 初始化仓库并推送到 GitHub：
   ```bash
   git init
   git add -A
   git commit -m "AI 新手启蒙课程 v1"
   gh repo create ai-qimeng --public   # 或手动在 GitHub 建仓后 git remote add
   git push -u origin main
   ```
2. 在项目根创建 `.github/workflows/deploy.yml`：
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   permissions:
     contents: read
     pages: write
     id-token: write
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with: { node-version: 20, cache: npm }
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v3
           with: { path: dist }
     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```
3. 仓库 Settings → Pages → Source 选 "GitHub Actions"，推送即自动发布。

## 发布后验证（health / 核心流程）

- 首页返回 200，标题含「AI 新手启蒙」。
- 任意课程页（如 `/lessons/m1/1-1-renzhi/`）返回 200 且含真实正文（非 Lorem）。
- `/404.html` 可访问、样式正常。
- 明暗主题切换无闪烁；移动端 375px 宽度无横向滚动。
- 复制按钮（提示词模板卡）在微信内核浏览器中可用。

## 注意事项

- **字体可达性**：正文用 Google Fonts（Noto Serif/Sans SC）。大陆网络下建议自托管或改用国内 CDN，避免首屏字体加载慢。
- **知识星球 分发**：本站点用于提供可分享的阅读链接；也可将 `src/content/lessons/*.md` 的 Markdown 直接粘贴进 知识星球 帖子/专栏发布。
- **内容迭代**：补写/修订任意课文后，重新 `npm run build` 并重新部署即可。
