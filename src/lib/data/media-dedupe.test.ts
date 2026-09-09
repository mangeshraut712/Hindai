import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";

const PUBLIC_ROOT = join(process.cwd(), "public");
const MEDIA_EXT = new Set([".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".avif"]);

function listMedia(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listMedia(full));
      continue;
    }
    const ext = entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase();
    if (MEDIA_EXT.has(ext)) out.push(full);
  }
  return out;
}

test("public media files are unique by content hash (no duplicate copies)", () => {
  const files = listMedia(PUBLIC_ROOT);
  assert.ok(files.length >= 40, `expected a full media set, got ${files.length}`);

  const byHash = new Map<string, string[]>();
  for (const file of files) {
    const hash = createHash("sha256").update(readFileSync(file)).digest("hex");
    const rel = relative(PUBLIC_ROOT, file);
    const list = byHash.get(hash) ?? [];
    list.push(rel);
    byHash.set(hash, list);
  }

  const duplicates = [...byHash.values()].filter((group) => group.length > 1);
  assert.deepEqual(
    duplicates,
    [],
    `Duplicate media copies found:\n${duplicates.map((g) => g.join(" == ")).join("\n")}`
  );
});

test("referenced site media paths exist under public/", () => {
  const required = [
    "logo.webp",
    "Home.webp",
    "haripaat/cover.webp",
    "harivijay/cover.webp",
    "ramvijay/cover.webp",
    "shivlilamrit/cover.webp",
    "ganesh-aarti/hero.webp",
    "vishnu/hero.webp",
    "festivals/janmashtami.webp",
    "festivals/govardhan-puja.webp",
  ];
  for (const rel of required) {
    assert.ok(statSync(join(PUBLIC_ROOT, rel)).isFile(), `missing ${rel}`);
  }
});
