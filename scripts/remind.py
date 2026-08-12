#!/usr/bin/env python3
"""
Redesign all inline SVG mindmaps to a clean, colorful Modao-style radial tree.
- Center topic + colored branch topics + light leaf pills.
- Each branch gets its own accent color so not all blocks look the same.
- Smooth cubic-bezier connectors, generous whitespace, crisp text alignment.
"""
import re, glob, os

# Tree definitions extracted from existing lesson mindmaps.
TREES = {
    "3-1-four-elements.md": {
        "aria": "提示词四要素思维导图",
        "root": ("提示词四要素", "Prompt"),
        "branches": [
            ("角色 Role", ["身份与视角", "专业度与语气"]),
            ("任务 Task", ["动词开头", "明确标准"]),
            ("上下文 Context", ["读者是谁", "红线与用途"]),
            ("格式 Format", ["表格/分点", "长度约束"]),
        ],
    },
    "3-3-revise.md": {
        "aria": "改稿迭代循环思维导图",
        "root": ("改稿迭代循环", "Revise Loop"),
        "branches": [
            ("初稿 Draft", ["你写事实与意图", "初稿贴全不摘要"]),
            ("给反馈 Feedback", ["说清修改方向", "一次只给一目标"]),
            ("修改 Revise", ["它改措辞结构", "你核对事实"]),
            ("定稿 Final", ["再改一轮", "发出前复核"]),
        ],
    },
    "5-1-5pitfalls.md": {
        "aria": "新手五大坑思维导图",
        "root": ("新手五大坑", "用 AI 前先避雷"),
        "branches": [
            ("坑一·泄密", ["机密粘进公开工具", "先脱敏或用私有版"]),
            ("坑二·照抄幻觉", ["把产出当事实发出", "带数人名的要自己核"]),
            ("坑三·让渡判断", ["替你拍板做决策", "当参谋，别当领导"]),
            ("坑四·能力外包", ["凡事都交给 AI", "自写框架再让它扩"]),
            ("坑五·漏核对", ["发出前没读一遍", "收件人写错最致命"]),
        ],
    },
    "5-3-output-check.md": {
        "aria": "AI 产出核查清单思维导图",
        "root": ("AI 产出核查", "收到先过"),
        "branches": [
            ("真实性", ["事实是否编造", "来源能否点开"]),
            ("准确性", ["人名数字日期", "是否改了原稿"]),
            ("合规性", ["口径是否一致", "版权与引用"]),
            ("收尾", ["语气贴读者", "发出前读一遍"]),
        ],
    },
    "6-1-what-is-agent.md": {
        "aria": "智能体组成思维导图",
        "root": ("智能体", "工作流打包+AI监工"),
        "branches": [
            ("痛点·能力分散", ["写作强搜索强编程强各有所长", "切换成本高重复讲需求"]),
            ("解法·工作流打包", ["功能集合连点成线", "提示词设记忆一键启动"]),
            ("执行·分层流水线", ["分层执行产出固定产品", "你说一句话自动流转"]),
            ("类比·外包流水线", ["几个同事编成固定线", "像外包流水线省心"]),
        ],
    },
    "6-2-case-study.md": {
        "aria": "案例与行业复制思维导图",
        "root": ("真实案例", "二手车商一键出图"),
        "branches": [
            ("起点·随手拍车照", ["群友拍二手车照片", "不懂AI但要易用产品"]),
            ("转化·image-to-image", ["图生图加提示词", "随手拍变展厅级图"]),
            ("复制·行业逻辑", ["痛点一致全国大市场", "需求远大于供给"]),
            ("地图·目标行业", ["设计电商外贸ERP", "工程制图水果装修建材"]),
        ],
    },
    "6-3-tech-stack.md": {
        "aria": "技术栈全景思维导图",
        "root": ("技术栈", "门槛比想象低"),
        "branches": [
            ("搭建工具", ["Claude桌面/Code/Coze", "Dify/N8N/UI-Path"]),
            ("连接能力", ["MCP让AI操作网页应用", "现成AI软件即插即用"]),
            ("学习成本", ["2-3天可上手", "vibe coding让AI教"]),
            ("核心技术", ["文生图文生视频编程", "只是串联起来用"]),
        ],
    },
    "6-4-get-clients.md": {
        "aria": "获客三路径与筛选思维导图",
        "root": ("获客", "三路径+筛选"),
        "branches": [
            ("路径A·试水", ["闭门造车+短视频发想法", "没水花就kill项目"]),
            ("路径B·行业渠道", ["从自己行业痛点切入", "财务人员客户HR管理"]),
            ("路径C·社群池", ["财富自由团需求不断", "一天到晚有人提需求"]),
            ("筛选·难度评估", ["个体户花小钱办大事坑", "让Claude估预算先接能做的"]),
        ],
    },
    "6-5-delivery-scale.md": {
        "aria": "交付体系与扩张思维导图",
        "root": ("交付", "体系+扩张+转念"),
        "branches": [
            ("交付体系", ["首单就建可复用流程", "整理成skill文档知识库"]),
            ("团队扩张", ["业务量撑大团队", "一人跑通再批量加人"]),
            ("思维转变", ["从闭门造车到听市场", "拥抱下层市场声音"]),
            ("迭代", ["持续迭代降沟通成本", "按行业批量定制"]),
        ],
    },
    "8-1-agent-four-layers.md": {
        "aria": "Agent 四层架构思维导图",
        "root": ("Agent 四层架构", "LLM+协议+工具+技能"),
        "branches": [
            ("决策层 Decision", ["大模型 LLM", "读懂需求生成意图"]),
            ("协议层 Protocol", ["Function Calling", "意图格式程序可读"]),
            ("执行层 Execution", ["Tool 本地执行", "MCP 对接外部服务"]),
            ("组织层 Orchestration", ["Skill 按需加载", "避免一次塞太多"]),
        ],
    },
    "9-2-clarify.md": {
        "aria": "建站前先聊清的 5 件事思维导图",
        "root": ("建站前先聊清", "5 件事"),
        "branches": [
            ("给谁用 Who", ["目标用户画像", "他们要完成什么"]),
            ("有哪些页 Pages", ["首页/列表/详情", "要不要关于/联系"]),
            ("要什么功能 Features", ["搜索/登录/付费", "表单/评论"]),
            ("数据从哪来 Data", ["静态写死", "要不要数据库"]),
            ("什么风格 Style", ["参考站点", "配色与气质"]),
        ],
    },
    "9-5-director.md": {
        "aria": "vibe coding 三步法思维导图",
        "root": ("vibe coding 三步法", "导演式指挥"),
        "branches": [
            ("第一步·聊成项目", ["让 AI 反问你", "模糊想法变需求"]),
            ("第二步·匹配搭骨架", ["给参考不照抄", "先区块后美化"]),
            ("第三步·素材批处理", ["图片整包识别", "分配表再审核"]),
            ("第四步·打磨上线", ["统一风格", "自查后部署"]),
        ],
    },
    "10-2-universal-prompt.md": {
        "aria": "通用提示词六要素思维导图",
        "root": ("通用提示词", "六要素"),
        "branches": [
            ("角色 Role", ["让 AI 扮产品助理", "只给自己用的工具"]),
            ("目标 Goal", ["解决什么", "给谁用"]),
            ("页面 Pages", ["要哪几个页面", "各自放什么"]),
            ("功能 Features", ["增删改查", "要不要登录筛选"]),
            ("数据 Data", ["存哪些字段", "必须存云端Supabase"]),
            ("风格 Style", ["参考谁", "什么气质"]),
        ],
    },
    "10-5-github-deploy.md": {
        "aria": "工作台上线四步与永久三保险思维导图",
        "root": ("工作台上线", "四步+三保险"),
        "branches": [
            ("推 GitHub", ["代码永不下线", "新建仓库连工具"]),
            ("选部署平台", ["Vercel/Netlify", "CloudBase/GitHub Pages"]),
            ("一键部署", ["连仓库点 Deploy", "拿到永久网址"]),
            ("永久三保险", ["代码在GitHub", "数据在Supabase", "站点在部署"]),
        ],
    },
    "10-6-build-runbook.md": {
        "aria": "从零搭建工作台五步法思维导图",
        "root": ("从零搭建工作台", "照抄五步"),
        "branches": [
            ("第0步·准备", ["注册账号", "VPN见10-1"]),
            ("第1步·澄清", ["六要素聊需求", "先出清单"]),
            ("第2步·前端", ["AI生成界面", "预留接口"]),
            ("第3步·后端", ["Supabase建表", "云端存储"]),
            ("第4步·上线", ["连GitHub部署", "永久网址"]),
            ("第5步·备份", ["导出CSV", "三保险"]),
        ],
    },
}

# Branch accent palette. Each branch topic + its leaves share a hue.
# Values come from tokens.css so they adapt to light/dark theme.
BRANCH_PALETTE = [
    {"main": "var(--mindmap-b1)", "soft": "var(--mindmap-b1-soft)", "ink": "var(--mindmap-b1-ink)", "line": "var(--mindmap-b1-line)"},
    {"main": "var(--mindmap-b2)", "soft": "var(--mindmap-b2-soft)", "ink": "var(--mindmap-b2-ink)", "line": "var(--mindmap-b2-line)"},
    {"main": "var(--mindmap-b3)", "soft": "var(--mindmap-b3-soft)", "ink": "var(--mindmap-b3-ink)", "line": "var(--mindmap-b3-line)"},
    {"main": "var(--mindmap-b4)", "soft": "var(--mindmap-b4-soft)", "ink": "var(--mindmap-b4-ink)", "line": "var(--mindmap-b4-line)"},
    {"main": "var(--mindmap-b5)", "soft": "var(--mindmap-b5-soft)", "ink": "var(--mindmap-b5-ink)", "line": "var(--mindmap-b5-line)"},
    {"main": "var(--mindmap-b6)", "soft": "var(--mindmap-b6-soft)", "ink": "var(--mindmap-b6-ink)", "line": "var(--mindmap-b6-line)"},
]


def estimate_text_width(text: str, px_per_char: float = 13.3) -> int:
    """Rough width estimate for Chinese/English mixed text."""
    return max(60, int(len(text) * px_per_char + 28))


def escape_xml(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def generate_svg(root_title: str, root_subtitle: str, branches: list, aria_label: str) -> str:
    n = len(branches)

    # Layout constants
    root_x = 40
    root_w = 172
    root_h = 72
    root_rx = 16

    branch_x = 260
    branch_h = 38
    branch_rx = 19  # pill-like

    leaf_h = 28
    leaf_rx = 14
    leaf_gap_y = 18
    leaf_to_branch_x = 52

    # First pass: compute branch widths and leaf widths per branch
    branch_meta = []
    for i, (branch_title, leaves) in enumerate(branches):
        palette = BRANCH_PALETTE[i % len(BRANCH_PALETTE)]
        branch_w = max(120, estimate_text_width(branch_title))
        leaf_ws = [max(90, estimate_text_width(leaf)) for leaf in leaves]
        branch_meta.append({
            "title": branch_title,
            "leaves": leaves,
            "palette": palette,
            "branch_w": branch_w,
            "leaf_ws": leaf_ws,
            "max_leaf_w": max(leaf_ws) if leaf_ws else 90,
        })

    # Leaf column starts right after the widest branch + gap
    max_branch_w = max(m["branch_w"] for m in branch_meta)
    leaf_x = branch_x + max_branch_w + leaf_to_branch_x

    # Total width = leaf_x + max_leaf_w + right margin
    max_leaf_w = max(m["max_leaf_w"] for m in branch_meta) if branch_meta else 90
    view_w = leaf_x + max_leaf_w + 44

    # Vertical sizing
    step = 92
    total_h = max(360, n * step + 80)
    first_y = (total_h - (n - 1) * step) // 2
    root_cy = total_h // 2
    root_y = root_cy - root_h // 2
    root_right = root_x + root_w

    connectors = ['  <g fill="none" stroke-width="2" stroke-linecap="round">']
    nodes = []

    # Root node (neutral, clean)
    nodes.append(
        f'  <rect x="{root_x}" y="{root_y}" width="{root_w}" height="{root_h}" rx="{root_rx}" '
        f'fill="var(--surface)" stroke="var(--fg-2)" stroke-width="1.5"/>'
    )
    nodes.append(
        f'  <text x="{root_x + root_w // 2}" y="{root_cy - 6}" text-anchor="middle" '
        f'dominant-baseline="central" font-size="16" font-weight="600" fill="var(--fg)">{escape_xml(root_title)}</text>'
    )
    nodes.append(
        f'  <text x="{root_x + root_w // 2}" y="{root_cy + 17}" text-anchor="middle" '
        f'dominant-baseline="central" font-size="12" fill="var(--muted)">{escape_xml(root_subtitle)}</text>'
    )

    # Branches and leaves
    for i, meta in enumerate(branch_meta):
        palette = meta["palette"]
        branch_y = first_y + i * step
        branch_w = meta["branch_w"]
        branch_mid_y = branch_y + branch_h // 2
        branch_right = branch_x + branch_w

        # connector root -> branch
        rb_offset = max(18, (branch_x - root_right) // 2)
        connectors.append(
            f'    <path d="M{root_right},{root_cy} '
            f'C{root_right + rb_offset},{root_cy} {branch_x - rb_offset},{branch_mid_y} {branch_x},{branch_mid_y}" '
            f'stroke="{palette["line"]}"/>'
        )

        # branch node
        nodes.append(
            f'  <rect x="{branch_x}" y="{branch_y}" width="{branch_w}" height="{branch_h}" rx="{branch_rx}" '
            f'fill="{palette["main"]}"/>'
        )
        nodes.append(
            f'  <text x="{branch_x + branch_w // 2}" y="{branch_mid_y}" text-anchor="middle" '
            f'dominant-baseline="central" font-size="13" font-weight="500" fill="#FFFFFF">{escape_xml(meta["title"])}</text>'
        )

        # leaves
        leaves = meta["leaves"]
        leaf_ws = meta["leaf_ws"]
        leaf_count = len(leaves)
        leaf_span = (leaf_count - 1) * (leaf_h + leaf_gap_y)
        leaf_top_y = branch_mid_y - leaf_span // 2

        for j, (leaf, lw) in enumerate(zip(leaves, leaf_ws)):
            leaf_y = leaf_top_y + j * (leaf_h + leaf_gap_y)
            leaf_mid_y = leaf_y + leaf_h // 2

            # connector branch -> leaf
            bl_offset = max(14, (leaf_x - branch_right) // 2)
            connectors.append(
                f'    <path d="M{branch_right},{branch_mid_y} '
                f'C{branch_right + bl_offset},{branch_mid_y} {leaf_x - bl_offset},{leaf_mid_y} {leaf_x},{leaf_mid_y}" '
                f'stroke="{palette["line"]}"/>'
            )

            nodes.append(
                f'  <rect x="{leaf_x}" y="{leaf_y}" width="{lw}" height="{leaf_h}" rx="{leaf_rx}" '
                f'fill="{palette["soft"]}" stroke="{palette["line"]}" stroke-width="1"/>'
            )
            nodes.append(
                f'  <text x="{leaf_x + lw // 2}" y="{leaf_mid_y}" text-anchor="middle" '
                f'dominant-baseline="central" font-size="12" fill="{palette["ink"]}">{escape_xml(leaf)}</text>'
            )

    connectors.append("  </g>")

    lines = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {view_w} {total_h}" width="100%" role="img" aria-label="{escape_xml(aria_label)}">',
        *connectors,
        *nodes,
        "</svg>",
    ]
    return "\n".join(lines)


def replace_mindmap_svg(file_path: str, new_svg: str, aria_label: str) -> bool:
    text = open(file_path, encoding="utf-8").read()
    pattern = re.compile(
        rf'(<div class="mindmap"[^>]*aria-label="{re.escape(aria_label)}"[^>]*>\s*)<svg.*?</svg>(\s*</div>)',
        re.S,
    )
    new_text, count = pattern.subn(rf"\1{new_svg}\2", text)
    if count == 0:
        pattern2 = re.compile(
            r'(<div class="mindmap"[^>]*>\s*)<svg.*?</svg>(\s*</div>)',
            re.S,
        )
        new_text, count = pattern2.subn(rf"\1{new_svg}\2", text)
    if count:
        open(file_path, "w", encoding="utf-8").write(new_text)
    return count > 0


def main():
    base = "src/content/lessons"
    for filename, tree in TREES.items():
        path = os.path.join(base, filename)
        if not os.path.exists(path):
            print(f"SKIP (missing): {path}")
            continue
        svg = generate_svg(*tree["root"], tree["branches"], tree["aria"])
        ok = replace_mindmap_svg(path, svg, tree["aria"])
        print(f"{'OK' if ok else 'FAIL'}: {filename}")


if __name__ == "__main__":
    main()
