// workbuddy-id.ts — 纯净（无 Astro 依赖）的 entry.id 生成器。
// 被 content.config.ts（构建期 schema 生成）与路由/落地页共用，避免循环依赖。
//
// 源 Markdown 用中文文件夹名组织（第一篇 / 第 N 章 / 附录），
// 直接用作 URL 会出现中文编码与层级冗余。这里把它们映射成稳定的 ASCII id：
//   bluebook/index.md                              -> bluebook
//   bluebook/第一篇 .../index.md                    -> bluebook/part1
//   bluebook/第一篇 .../第 1 章 .../index.md         -> bluebook/part1/ch01
//   bluebook/附录/index.md                          -> bluebook/appendix
//   bluebook/附录/附录 A .../index.md               -> bluebook/appendix-a
//   cases/index.md                                 -> cases
//   cases/submissions/<name>/index.md              -> cases/submissions/<name>
//   community/contributing.md                      -> community/contributing
//   help/index.md                                  -> help
//   reading-guide.md                               -> reading-guide

const CN_NUM: Record<string, string> = {
  一: '1', 二: '2', 三: '3', 四: '4', 五: '5', 六: '6', 七: '7', 八: '8', 九: '9', 十: '10',
};

export function makeId(entry: string): string {
  let p = entry.replace(/\.md$/, '').replace(/\/index$/, '');
  const segs = p.split('/');
  const out = segs.map((seg) => {
    if (seg === 'bluebook') return 'bluebook';
    let m: RegExpMatchArray | null;
    if ((m = seg.match(/^第([一二三四五六七八九十])篇/))) return 'part' + CN_NUM[m[1]];
    if ((m = seg.match(/^第\s*(\d+)\s*章/))) return 'ch' + m[1].padStart(2, '0');
    if (seg === '附录' || seg.startsWith('附录')) {
      const am = seg.match(/附录\s*([A-Za-z])/);
      return am ? 'appendix-' + am[1].toLowerCase() : 'appendix';
    }
    if (seg.startsWith('课外阅读')) return 'extra-reading';
    // ASCII 段（如 cases/submissions/<name>）原样保留；其余中文段也原样（极少出现）
    return seg;
  });
  return out.join('/');
}
