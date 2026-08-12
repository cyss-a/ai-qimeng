#!/usr/bin/env python3
"""
Fetch AI news from Chinese RSS feeds and generate an M7 daily lesson markdown.
Run daily via cron / GitHub Actions to keep the AI Daily section fresh.

Usage:
    python3 scripts/fetch-news.py

Output:
    src/content/lessons/m7/7-{n}-{YYYY-MM-DD}.md
"""
import html
import os
import re
import sys
from datetime import datetime, timezone, timedelta
from urllib.request import Request, urlopen
from xml.etree import ElementTree as ET

# 中文 AI 科技媒体 RSS
FEEDS = [
    ("量子位", "https://www.qbitai.com/rss", "zh"),
    ("机器之心", "https://www.jiqizhixin.com/rss", "zh"),
    ("极客公园", "https://www.geekpark.net/rss", "zh"),
    ("36kr", "https://36kr.com/feed", "zh"),
    ("爱范儿", "https://www.ifanr.com/feed", "zh"),
    ("钛媒体", "https://www.tmtpost.com/feed", "zh"),
]

TARGET_DIR = "src/content/lessons/m7"
MAX_PER_SOURCE = 10
MAX_TOTAL = 20
DAYS_BACK = 3

# 10 种标题色，用于卡片标题轮换（与模块 token 一致，避免新增硬编码）
TITLE_COLORS = [
    "var(--m1)",
    "var(--m2)",
    "var(--m3)",
    "var(--m4)",
    "var(--m5)",
    "var(--m6)",
    "var(--m7)",
    "#0891B2",
    "#16A34A",
    "#9333EA",
]


META_PREFIX_PATTERNS = [
    r"^\s*作者\s*[｜|]\s*[^编辑]+\s*整理\s*[｜|]\s*[^\s]+\s*",
    r"^\s*作者\s*[｜|]\s*[^编辑\s]+\s*编辑\s*[｜|]\s*[^\s]+\s*",
    r"^\s*作者\s*[｜|]\s*[^\s]+\s*",
    r"^\s*编辑\s*[｜|]\s*[^\s]+\s*",
    r"^\s*头图来源\s*[:：]\s*[^\s]+\s*",
    r"^\s*综合\s*[^\d]{0,6}\d+\s*月\s*\d+\s*日消息，?\s*",
]


def strip_html(text: str) -> str:
    """Quick HTML-to-plain-text, keeping it readable."""
    if not text:
        return ""
    text = html.unescape(text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def clean_description(text: str) -> str:
    """Strip common Chinese article meta prefixes from description."""
    for pattern in META_PREFIX_PATTERNS:
        text = re.sub(pattern, "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def parse_rss_date(text: str) -> datetime | None:
    """Best-effort parse of common RSS date formats."""
    if not text:
        return None
    text = text.strip()
    formats = [
        "%a, %d %b %Y %H:%M:%S %z",
        "%a, %d %b %Y %H:%M:%S %Z",
        "%Y-%m-%dT%H:%M:%S%z",
        "%Y-%m-%dT%H:%M:%SZ",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%d",
    ]
    for fmt in formats:
        try:
            return datetime.strptime(text, fmt)
        except ValueError:
            continue
    m = re.search(r"(\d{4})-(\d{2})-(\d{2})", text)
    if m:
        return datetime(int(m.group(1)), int(m.group(2)), int(m.group(3)), tzinfo=timezone.utc)
    return None


def fetch_feed(url: str) -> str | None:
    try:
        req = Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "application/rss+xml, application/xml, text/xml, */*",
            },
        )
        with urlopen(req, timeout=20) as resp:
            return resp.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"WARN: failed to fetch {url}: {e}")
        return None


def parse_feed_items(xml_text: str, source: str) -> list[dict]:
    items = []
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError as e:
        print(f"WARN: parse error for {source}: {e}")
        return items

    channel = root.find("channel")
    if channel is None:
        return items

    for item in channel.findall("item")[:MAX_PER_SOURCE]:
        title_el = item.find("title")
        link_el = item.find("link")
        date_el = item.find("pubDate")
        desc_el = item.find("description")

        title = strip_html(title_el.text) if title_el is not None and title_el.text else "无标题"
        link = link_el.text.strip() if link_el is not None and link_el.text else ""
        pub_date = parse_rss_date(date_el.text) if date_el is not None and date_el.text else None
        desc = clean_description(strip_html(desc_el.text)) if desc_el is not None and desc_el.text else ""

        if pub_date and pub_date.tzinfo is None:
            pub_date = pub_date.replace(tzinfo=timezone.utc)

        # 只保留 3 天内的新闻
        if pub_date:
            cutoff = datetime.now(timezone.utc) - timedelta(days=DAYS_BACK)
            if pub_date < cutoff:
                continue

        # 摘要控制在 90 字以内
        if len(desc) > 90:
            desc = desc[:89] + "…"

        items.append(
            {
                "source": source,
                "title": title,
                "link": link,
                "pub_date": pub_date,
                "description": desc,
            }
        )
    return items


def generate_markdown(today: datetime, entries: list[dict], order: int) -> str:
    date_str = today.strftime("%Y-%m-%d")
    summary = " / ".join(
        e["title"][:24] + "…" if len(e["title"]) > 24 else e["title"] for e in entries[:3]
    )
    parts = [
        "---",
        f'title: "AI 日报 · {date_str}"',
        "module: M7",
        f"order: {order}",
        f'description: "今日 AI 热点精选：{summary}"',
        'duration: "5 分钟"',
        'tags: ["AI 新闻", "热点"]',
        "status: published",
        "---",
        "",
        "## 今日导读",
        "",
        f"> 本日报精选中文科技媒体 AI 板块，共 {len(entries)} 条热点，帮你 5 分钟读完今日新鲜事。",
        "",
        '<div class="daily-grid">',
        "",
    ]

    for i, e in enumerate(entries, 1):
        color = TITLE_COLORS[(i - 1) % len(TITLE_COLORS)]
        title_escaped = html.escape(e["title"])
        desc_escaped = html.escape(e["description"]) if e["description"] else ""
        parts.append(f'  <article class="daily-card daily-card--c{(i - 1) % len(TITLE_COLORS) + 1}">')
        parts.append(f'    <h3 class="daily-card__title" style="color: {color};">热点 {i}：{title_escaped}</h3>')
        if desc_escaped:
            parts.append(f'    <p class="daily-card__summary">{desc_escaped}</p>')
        else:
            parts.append('    <p class="daily-card__summary">暂无摘要，点击阅读原文查看详情。</p>')
        if e["link"]:
            parts.append(f'    <a class="daily-card__link" href="{e["link"]}" target="_blank" rel="noopener noreferrer">阅读全文 · {e["source"]} →</a>')
        else:
            parts.append(f'    <span class="daily-card__link daily-card__link--disabled">阅读全文 · {e["source"]}</span>')
        parts.append("  </article>")
        parts.append("")

    parts.extend(
        [
            "</div>",
            "",
            "---",
            "",
            "*本日报由脚本从公开中文 RSS 源聚合生成，人工复核后发布。*",
            "",
        ]
    )
    return "\n".join(parts)


def main():
    tz = timezone(timedelta(hours=8))
    today = datetime.now(tz)
    date_str = today.strftime("%Y-%m-%d")

    os.makedirs(TARGET_DIR, exist_ok=True)

    existing = sorted(f for f in os.listdir(TARGET_DIR) if f.endswith(".md"))
    order = 1
    if existing:
        nums = []
        for f in existing:
            m = re.match(r"7-(\d+)-", f)
            if m:
                nums.append(int(m.group(1)))
        order = max(nums) + 1 if nums else 1

    out_path = os.path.join(TARGET_DIR, f"7-{order}-{date_str}.md")

    all_entries = []
    for source, url, lang in FEEDS:
        xml = fetch_feed(url)
        if xml:
            items = parse_feed_items(xml, source)
            all_entries.extend(items)

    # 去重：按链接去重
    seen = set()
    deduped = []
    for e in all_entries:
        key = e["link"] or e["title"]
        if key and key not in seen:
            seen.add(key)
            deduped.append(e)

    selected = deduped[:MAX_TOTAL]

    if not selected:
        print("WARN: no fresh entries fetched; generating placeholder daily.")
        selected = [
            {
                "title": "今日 RSS 源暂未抓取到新内容",
                "link": "",
                "source": "系统",
                "description": "请检查网络或 RSS 源可用性。脚本会在下次运行时重试。",
            }
        ]

    md = generate_markdown(today, selected, order)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(md)

    print(f"OK: wrote {out_path} with {len(selected)} entries")


if __name__ == "__main__":
    main()
