import { getCollection, type CollectionEntry } from 'astro:content';

export type WorkbuddyEntry = CollectionEntry<'workbuddy'>;

// 署名与许可（搬运自 AlephAITech/WorkBuddyGuide，MIT License）
export const WORKBUDDY_SOURCE = {
  repo: 'https://github.com/AlephAITech/WorkBuddyGuide',
  site: 'https://workbuddy.homes/',
  license: 'MIT',
  credit: 'WorkBuddy Guide · AlephAITech',
};

// 从 entry.body 取首个 H1 作为标题（无需 render 全部 48 页，省构建开销）
export function titleFromEntry(entry: WorkbuddyEntry): string {
  if (entry.data.title) return entry.data.title;
  const m = (entry.body || '').match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : entry.id;
}

export function descriptionFromEntry(entry: WorkbuddyEntry): string {
  if (entry.data.description) return entry.data.description;
  const m = (entry.body || '').match(/^>\s*(.+)$/m);
  if (!m) return '';
  // 去掉 Markdown 链接/图片语法，仅留可读文本（避免描述里出现裸 [text](url)）
  return m[1]
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .trim();
}

// 逻辑阅读顺序：阅读指南 -> 蓝皮书(手册/各篇/章/附录) -> 案例 -> 社区 -> 帮助
function sectionRank(id: string): number {
  if (id === 'reading-guide') return 0;
  if (id.startsWith('bluebook')) return 1;
  if (id.startsWith('cases')) return 2;
  if (id.startsWith('community')) return 3;
  if (id.startsWith('help')) return 4;
  return 9;
}

// 蓝皮书内部顺序：手册总览 -> 各篇总览 -> 章节 -> 附录
function bluebookKey(id: string): [number, number, number, string] {
  if (id === 'bluebook') return [0, 0, 0, id];
  const m = id.match(/^bluebook\/(?:part(\d+)\/)?(?:ch(\d+))?/);
  if (m) {
    const part = m[1] ? Number(m[1]) : 0;
    const ch = m[2] ? Number(m[2]) : 0;
    const tier = ch > 0 ? 2 : 1; // 章(2) 排在 篇总览(1) 之后
    return [1, tier, part * 1000 + ch, id];
  }
  if (id.startsWith('bluebook/appendix')) {
    const am = id.match(/appendix-([a-z])/);
    const letter = am ? am[1].charCodeAt(0) : 96;
    return [1, 3, letter, id];
  }
  return [1, 9, 0, id];
}

export function sortWorkbuddy(entries: WorkbuddyEntry[]): WorkbuddyEntry[] {
  return [...entries].sort((a, b) => {
    const ra = sectionRank(a.id);
    const rb = sectionRank(b.id);
    if (ra !== rb) return ra - rb;
    if (a.id.startsWith('bluebook') && b.id.startsWith('bluebook')) {
      const ka = bluebookKey(a.id);
      const kb = bluebookKey(b.id);
      for (let i = 0; i < 4; i++) {
        if (ka[i] !== kb[i]) return ka[i] < kb[i] ? -1 : 1;
      }
      return 0;
    }
    return a.id.localeCompare(b.id, 'zh-Hans-CN');
  });
}

export async function getWorkbuddy(): Promise<WorkbuddyEntry[]> {
  const all = await getCollection('workbuddy');
  return sortWorkbuddy(all);
}

// 落地页分组用的结构
export interface WbSection {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  entries: { id: string; title: string; description: string; isIndex: boolean }[];
}

export function groupForLanding(entries: WorkbuddyEntry[]): WbSection[] {
  const sections: WbSection[] = [];
  const meta: Record<string, { title: string; icon: string; blurb: string }> = {
    'reading-guide': { title: '阅读与学习指南', icon: 'book-open', blurb: '新手路线、按任务选教程、团队落地路线一目了然。' },
    bluebook: { title: 'WorkBuddy 实战蓝皮书', icon: 'file-text', blurb: '从下载安装到多 Agent 系统，27 章完整手册 + 附录。' },
    cases: { title: '社区实战案例', icon: 'clipboard-check', blurb: '真实用户提交的可复现案例，覆盖办公、投资、自媒体等场景。' },
    community: { title: '社区与共创', icon: 'message-square', blurb: '如何提交案例、加入共创群，与作者和其他实践者交流。' },
    help: { title: '帮助与反馈', icon: 'info', blurb: '遇到问题时的排查入口与反馈渠道。' },
    scenarios: { title: '六大场景任务库', icon: 'layout-grid', blurb: '按高频职场场景组织的任务卡与 MVP 模板，拿来即用。' },
  };

  // 蓝皮书内部继续按篇分组
  const bluebookParts: Record<string, WbSection> = {};

  for (const e of entries) {
    const id = e.id;
    if (id === 'reading-guide') {
      sections.push({
        id,
        title: meta['reading-guide'].title,
        icon: meta['reading-guide'].icon,
        blurb: meta['reading-guide'].blurb,
        entries: [{ id, title: titleFromEntry(e), description: descriptionFromEntry(e), isIndex: true }],
      });
      continue;
    }
    if (id.startsWith('bluebook')) {
      const pm = id.match(/^bluebook\/(?:part(\d+))?/);
      const partNum = pm && pm[1] ? Number(pm[1]) : 0;
      if (partNum === 0) {
        // 手册总览（bluebook 索引页）
        if (!sections.find((s) => s.id === 'bluebook')) {
          sections.push({ ...meta.bluebook, id: 'bluebook', entries: [] });
        }
        sections
          .find((s) => s.id === 'bluebook')!
          .entries.push({ id, title: titleFromEntry(e), description: descriptionFromEntry(e), isIndex: true });
      } else {
        const partKey = `part${partNum}`;
        if (!bluebookParts[partKey]) {
          bluebookParts[partKey] = {
            id: `bluebook/${partKey}`,
            title: `第 ${partNum} 篇`,
            icon: meta.bluebook.icon,
            blurb: '',
            entries: [],
          };
        }
        bluebookParts[partKey].entries.push({
          id,
          title: titleFromEntry(e),
          description: descriptionFromEntry(e),
          isIndex: /^bluebook\/part\d+$/.test(id),
        });
      }
      continue;
    }
    if (id.startsWith('cases')) {
      if (!sections.find((s) => s.id === 'cases')) sections.push({ ...meta.cases, id: 'cases', entries: [] });
      sections
        .find((s) => s.id === 'cases')!
        .entries.push({ id, title: titleFromEntry(e), description: descriptionFromEntry(e), isIndex: id === 'cases' });
      continue;
    }
    if (id.startsWith('community')) {
      if (!sections.find((s) => s.id === 'community')) sections.push({ ...meta.community, id: 'community', entries: [] });
      sections
        .find((s) => s.id === 'community')!
        .entries.push({ id, title: titleFromEntry(e), description: descriptionFromEntry(e), isIndex: id === 'community' });
      continue;
    }
    if (id.startsWith('help')) {
      if (!sections.find((s) => s.id === 'help')) sections.push({ ...meta.help, id: 'help', entries: [] });
      sections
        .find((s) => s.id === 'help')!
        .entries.push({ id, title: titleFromEntry(e), description: descriptionFromEntry(e), isIndex: id === 'help' });
      continue;
    }
    if (id.startsWith('scenarios')) {
      if (!sections.find((s) => s.id === 'scenarios')) sections.push({ ...meta.scenarios, id: 'scenarios', entries: [] });
      sections
        .find((s) => s.id === 'scenarios')!
        .entries.push({ id, title: titleFromEntry(e), description: descriptionFromEntry(e), isIndex: id === 'scenarios' });
      continue;
    }
  }

  // 组装：阅读指南 -> 蓝皮书手册 -> 各篇 -> 案例 -> 社区 -> 帮助 -> 场景库
  const result: WbSection[] = [];
  for (const s of sections) {
    if (s.id === 'bluebook') {
      result.push(s); // 手册总览
      const partKeys = Object.keys(bluebookParts)
        .filter((k) => k.startsWith('part'))
        .sort((a, b) => Number(a.slice(4)) - Number(b.slice(4)));
      for (const k of partKeys) result.push(bluebookParts[k]);
    } else {
      result.push(s);
    }
  }
  return result;
}
