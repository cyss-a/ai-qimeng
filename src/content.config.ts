import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 课程内容集合（Astro 7 内容层 API：使用 glob loader 加载 Markdown）
// frontmatter 字段：title / module / order / description / duration / tags
// 额外可选 status：published（已发布）| draft（编写中），用于首页目录区分
const lessons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    module: z.enum(['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10']),
    order: z.number(),
    description: z.string(),
    duration: z.string(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['published', 'draft']).default('published'),
  }),
});

export const collections = { lessons };
