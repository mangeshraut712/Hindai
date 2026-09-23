import assert from "node:assert/strict";
import { test } from "node:test";
import { listPublicSitemapEntries, sitemapLoc } from "./public-sitemap";

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
