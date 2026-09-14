import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const PUBLIC_ROOT = join(process.cwd(), "public");

test("PWA manifest icons exist and screenshots are not 404 placeholders", () => {
  const manifest = JSON.parse(readFileSync(join(PUBLIC_ROOT, "manifest.json"), "utf8")) as {
    icons?: Array<{ src: string; type?: string }>;
    screenshots?: Array<{ src: string }>;
  };
  assert.ok(!manifest.screenshots?.length, "do not advertise missing screenshot files");
  for (const icon of manifest.icons ?? []) {
    const rel = icon.src.replace(/^\.\//, "");
    assert.ok(existsSync(join(PUBLIC_ROOT, rel)), `missing icon ${rel}`);
    if (rel.endsWith(".webp")) {
      assert.equal(icon.type, "image/webp");
    }
  }
});

test("llms.txt points at GitHub Pages, not paused Vercel", () => {
  for (const name of ["llms.txt", "llms-full.txt"]) {
    const body = readFileSync(join(PUBLIC_ROOT, name), "utf8");
    assert.doesNotMatch(body, /vercel\.app/);
    assert.match(body, /mangeshraut712\.github\.io\/Hindai/);
  }
});
