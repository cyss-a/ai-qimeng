import { getCollection, type CollectionEntry } from 'astro:content';

// 课程模块元数据：frontmatter 仅含 module 代码，展示名在此集中管理。
// M7「AI 热点日报」置顶展示且不带 M 编号（直接显示「AI 热点日报」），其余模块顺延。
export const MODULES = {
  M1: { id: 'M1', title: '认知篇', subtitle: '先搞懂 AI 是什么、能替你做什么' },
  M2: { id: 'M2', title: '工具篇', subtitle: '主流工具地图与怎么选' },
  M3: { id: 'M3', title: '提示词篇', subtitle: '写出好提示词的套路' },
  M4: { id: 'M4', title: '场景篇', subtitle: '把 AI 用进真实工作流' },
  M5: { id: 'M5', title: '避坑篇', subtitle: '这些坑别踩' },
  M6: { id: 'M6', title: '变现实战篇', subtitle: '把 AI 智能体打包卖给个体户' },
  M7: { id: 'M7', title: 'AI 热点日报', subtitle: '每天 09:00 自动更新 · 中文科技媒体 AI 热点精选' },
  M8: { id: 'M8', title: 'Agent 架构篇', subtitle: '从 Function Calling 到 MCP 与 Skill 的进阶分层' },
  M9: { id: 'M9', title: '用 AI 做网站', subtitle: 'vibe coding 入门：从想法到上线' },
  M10: { id: 'M10', title: '搭个人工作台', subtitle: '前端+后端+Supabase：做出永久有效的专属工具' },
  M11: { id: 'M11', title: '上线篇', subtitle: '从 Demo 到扛得住真实用户的服务' },
  M12: { id: 'M12', title: '自生长知识库', subtitle: '用 Obsidian + Codex 搭一个会自己长大的第二大脑' },
  M13: { id: 'M13', title: '短视频创作篇', subtitle: '口播文案四步法 + 镜头表现力，亲手做出能爆的内容' },
  M14: { id: 'M14', title: 'GitHub 开源篇', subtitle: '零基础搞懂 GitHub：找资源、读界面、选许可证、四种下载法，再用 AI 发布你的第一个开源项目' },
} as const;

export type ModuleId = keyof typeof MODULES;
export type LessonEntry = CollectionEntry<'lessons'>;

// M7（AI 热点日报）置顶、其余顺延；M7 展示时不带 M 编号
const MODULE_ORDER: ModuleId[] = ['M7', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14'];

// 内容层（Astro 7）下 entry.id 取自首字的 frontmatter `slug`（如 m1/1-1-renzhi），
// 已含模块前缀，直接用做作业 URL。
export function lessonSlug(entry: LessonEntry): string {
  return entry.id;
}

// 基址感知：GitHub Pages 项目页部署在 /ai-qimeng/ 子路径下，
// Astro 不会自动重写裸 <a href> 字面量，所有内部链接必须显式拼接 base。
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  return b + (path.startsWith('/') ? path : '/' + path);
}

export function lessonHref(entry: LessonEntry): string {
  return withBase(`/lessons/${entry.id}/`);
}

// 按（模块顺序，章节 order）排序，全站目录与相邻导航共用
export async function getLessons(): Promise<LessonEntry[]> {
  const all = await getCollection('lessons');
  return all.sort((a, b) => {
    const mi = MODULE_ORDER.indexOf(a.data.module) - MODULE_ORDER.indexOf(b.data.module);
    return mi !== 0 ? mi : a.data.order - b.data.order;
  });
}
