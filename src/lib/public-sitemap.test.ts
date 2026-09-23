import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { listPublicSitemapEntries, sitemapLoc } from "./public-sitemap";
import { scriptureCatalog } from "./scripture-catalog";

const APP_DIR = join(process.cwd(), "app");
const CATALOG_SLUGS = new Set(scriptureCatalog.map((item) => item.slug));

function routeExists(path: string): boolean {
  const segments = path.split("/").filter(Boolean);
  let dirs = [APP_DIR];
  for (const segment of segments) {
    dirs = dirs.flatMap((dir) =>
      readdirSync(dir, { withFileTypes: true })
        .filter((entry) => {
          if (!entry.isDirectory()) return false;
          if (entry.name === segment) return true;
          if (!/^\[[^.\]]+\]$/.test(entry.name)) return false;
          // app/[slug] only prerenders scripture catalog slugs; other dynamic routes
          // get their params from the same data lists the sitemap is built from.
          return dir !== APP_DIR || CATALOG_SLUGS.has(segment);
        })
        .map((entry) => join(dir, entry.name))
    );
  }
  return dirs.some((dir) => existsSync(join(dir, "page.tsx")));
}

test("every sitemap path is served by an app route", () => {
  const missing = listPublicSitemapEntries()
    .map((entry) => entry.path)
    .filter((path) => !routeExists(path));
  assert.deepEqual(missing, []);
});

test("sitemap entries are unique and include grantha + culture routes", () => {
  const entries = listPublicSitemapEntries();
  const paths = entries.map((entry) => entry.path);
  assert.equal(new Set(paths).size, paths.length);
  assert.ok(paths.includes("/"));
  assert.ok(paths.includes("/sadhana"));
  assert.equal(paths.filter((path) => path === "/sadhana").length, 1);
  assert.ok(paths.includes("/haripaat"));
  assert.ok(paths.includes("/haripaat/book"));
  assert.ok(paths.includes("/harivijay"));
  assert.ok(paths.includes("/ramvijay"));
  assert.ok(paths.includes("/festivals"));
  assert.ok(paths.includes("/katha"));
  assert.ok(paths.includes("/recite"));
  assert.ok(paths.includes("/recite/hanuman-chalisa"));
  assert.ok(paths.includes("/recite/durga-saptashati"));
  assert.ok(paths.includes("/mahadev/somnath"));
  assert.ok(sitemapLoc("/ai-guide").endsWith("/ai-guide/"));
  assert.ok(sitemapLoc("/").endsWith("/Hindai/") || sitemapLoc("/").endsWith("/"));
});
