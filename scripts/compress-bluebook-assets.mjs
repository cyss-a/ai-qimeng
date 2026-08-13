/**
 * compress-bluebook-assets.mjs
 * 一次性压缩 public/workbuddy-assets/bluebook/ 下的图片，减少章节页加载体积。
 * - PNG：分别尝试无损 compressionLevel=9 与 palette quality=90，取更小者；只覆盖比原文件小的。
 * - JPEG：quality=85 + mozjpeg；只覆盖比原文件小的。
 * - GIF：跳过（无可用压缩工具，且不改动 .gif 后缀）。
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd(), 'public/workbuddy-assets/bluebook');

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else if (/\.(png|jpe?g)$/i.test(ent.name)) out.push(p);
  }
  return out;
}

async function compressImage(p) {
  const orig = fs.statSync(p).size;
  const ext = path.extname(p).toLowerCase();
  let buf;

  if (ext === '.png') {
    const img = sharp(p);
    const [lossless, palette] = await Promise.all([
      img.clone().png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer(),
      img.clone().png({ compressionLevel: 9, quality: 90 }).toBuffer(),
    ]);
    buf = lossless.length <= palette.length ? lossless : palette;
  } else {
    buf = await sharp(p).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
  }

  if (buf.length < orig) {
    fs.writeFileSync(p, buf);
    return { ok: true, saved: orig - buf.length, ratio: buf.length / orig };
  }
  return { ok: false, saved: 0, ratio: 1 };
}

async function main() {
  if (!fs.existsSync(ROOT)) {
    console.error('目录不存在:', ROOT);
    process.exit(1);
  }
  const files = walk(ROOT);
  console.log(`发现 ${files.length} 张待处理图片`);

  let totalOrig = 0;
  let totalSaved = 0;
  let compressed = 0;
  let skipped = 0;

  for (const p of files) {
    const orig = fs.statSync(p).size;
    totalOrig += orig;
    try {
      const r = await compressImage(p);
      if (r.ok) {
        compressed++;
        totalSaved += r.saved;
        console.log(`✓ ${path.basename(p)} ${(orig / 1024 / 1024).toFixed(2)}MB → ${(r.ratio * 100).toFixed(0)}%`);
      } else {
        skipped++;
      }
    } catch (e) {
      console.error(`✗ ${p}: ${e.message}`);
      skipped++;
    }
  }

  console.log('\n统计:');
  console.log(`  处理: ${files.length} 张`);
  console.log(`  压缩: ${compressed} 张`);
  console.log(`  跳过: ${skipped} 张`);
  console.log(`  原体积: ${(totalOrig / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  节省: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${totalOrig ? Math.round((totalSaved / totalOrig) * 100) : 0}%)`);
}

main();
