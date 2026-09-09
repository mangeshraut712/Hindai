/**
 * Convert oversized public PNG/JPG assets to WebP for GitHub Pages
 * (images.unoptimized — browsers download the file as-is).
 *
 * Usage: node scripts/optimize-public-images.mjs
 */
import { readdirSync, statSync, unlinkSync, existsSync } from "node:fs";
import { join, extname, basename, dirname } from "node:path";
import sharp from "sharp";

const ROOT = join(process.cwd(), "public");
const SKIP_DIRS = new Set(["ebook"]);
const MAX_HERO_EDGE = 1600;
const WEBP_QUALITY = 72;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      walk(full, out);
    } else if (/\.(png|jpe?g)$/i.test(name)) {
      out.push(full);
    }
  }
  return out;
}

async function convert(file) {
  const webpPath = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const meta = await sharp(file).metadata();
  const width = meta.width ?? MAX_HERO_EDGE;
  const targetWidth = Math.min(width, MAX_HERO_EDGE);

  await sharp(file)
    .rotate()
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(webpPath);

  const before = statSync(file).size;
  const after = statSync(webpPath).size;
  // Drop original raster once WebP exists (static export serves WebP paths).
  unlinkSync(file);
  return {
    file: file.replace(ROOT + "/", ""),
    before,
    after,
    ratio: ((after / before) * 100).toFixed(1) + "%",
  };
}

const files = walk(ROOT);
const results = [];
for (const file of files) {
  try {
    results.push(await convert(file));
  } catch (err) {
    console.error("FAIL", file, err.message);
  }
}

const before = results.reduce((s, r) => s + r.before, 0);
const after = results.reduce((s, r) => s + r.after, 0);
console.log(
  JSON.stringify(
    {
      count: results.length,
      beforeMB: +(before / 1e6).toFixed(1),
      afterMB: +(after / 1e6).toFixed(1),
      sample: results.slice(0, 8),
    },
    null,
    2
  )
);
