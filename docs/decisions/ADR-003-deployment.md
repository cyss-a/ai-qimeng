# ADR-003: 采用 EdgeOne Pages 为主静态托管（GitHub Pages 兜底）

- 状态：Accepted（2026-08-11）
- 决策者：高见远（首席架构师）
- 关联：ADR-001（Astro 7 静态产物）

## 背景（Context）

产物为纯静态站点（`astro build` → `dist/`），需一个托管方案满足：国内可达（知识星球用户多在微信/国内网络）、全球 CDN、免费或低成本、可回滚、部署便利。候选：EdgeOne Pages、Vercel、GitHub Pages、CloudBase 静态。

## 决策（Decision）

- 主选：**腾讯云 EdgeOne Pages**（edgeone.cloud.tencent.com，真实存在，公测免费、全球 CDN、国内可达）。Git（GitHub）授权 → 构建命令 `npm run build`、输出 `dist/` → push `main` 自动部署。
- 回滚：EdgeOne Pages 保留部署历史，控制台一键回滚；Git 维度 revert commit 重新部署。
- 配置（仅构建期、无密钥）：`NODE_VERSION=22`、`SITE_URL`、`ANALYTICS_ID`（可选 Umami/Plausible）。
- 兜底：**GitHub Pages**（`actions/deploy-pages` 部署 `dist/` 至 `gh-pages`）。
- 错误页：提供 `public/404.html` 并在平台配置为错误回退页。

## 理由（Arguments）

- EdgeOne Pages 国内可达性强、CDN 全球加速，最契合知识星球分发场景与性能 P0（首屏 < 3s）。
- 纯静态产物天然可回滚（不可变文件 + 部署历史），无需数据库迁移，回滚风险为零。
- 无后端即无密钥，环境变量仅构建期、无敏感信息，符合 PRD 安全 P0（不采集用户数据）。
- Vercel 海外优但国内访问不稳；CloudBase 偏后端能力，本项目用不上；GitHub Pages 国内偶尔不稳，故作兜底。

## 后果（Consequences）

- 正面：部署自动化、可回滚、成本低、国内可达。
- 负面 / 约束：EdgeOne Pages 处于公测，SLA/长期定价以官方为准；自定义域名需备案（可选）。
- 风险缓解：保留 GitHub Pages 兜底流水线；产物纯静态可随时迁移托管方，无供应商锁定。
