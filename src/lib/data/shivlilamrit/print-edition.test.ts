import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { FREE_KATHASAR_PDF, PRINT_KATHASAR, PRINT_SHOP_LINKS } from "./print-edition";

test("print Kathasar shop links are live storefronts, not on-site copies", () => {
  assert.match(PRINT_KATHASAR.publisher, /Dharmik Prakashan/);
  assert.equal(PRINT_SHOP_LINKS.length, 3);
  for (const link of PRINT_SHOP_LINKS) {
    assert.match(link.href, /^https:\/\//);
  }
  assert.ok(PRINT_SHOP_LINKS.some((link) => link.id === "amazon-in"));
});

test("free Kathasar PDF is published under public/ebook", () => {
  assert.equal(FREE_KATHASAR_PDF.hrefEn, "/ebook/Shivlilamrut_Kathasar_Adhyay_1_to_15.pdf");
  assert.equal(FREE_KATHASAR_PDF.hrefMr, FREE_KATHASAR_PDF.hrefEn);
  assert.match(FREE_KATHASAR_PDF.downloadMr, /शिवलीलामृत/);
  const file = join(process.cwd(), "public", "ebook", FREE_KATHASAR_PDF.downloadEn);
  assert.ok(existsSync(file), `missing ${file}`);
});
