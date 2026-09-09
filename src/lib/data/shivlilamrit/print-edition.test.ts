import assert from "node:assert/strict";
import { test } from "node:test";
import { PRINT_KATHASAR, PRINT_SHOP_LINKS } from "./print-edition";

test("print Kathasar shop links are live storefronts, not on-site copies", () => {
  assert.match(PRINT_KATHASAR.publisher, /Dharmik Prakashan/);
  assert.equal(PRINT_SHOP_LINKS.length, 3);
  for (const link of PRINT_SHOP_LINKS) {
    assert.match(link.href, /^https:\/\//);
  }
  assert.ok(PRINT_SHOP_LINKS.some((link) => link.id === "amazon-in"));
});
