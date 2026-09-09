import assert from "node:assert/strict";
import { test } from "node:test";
import { HARIPAAT_LEAVES, HARIPAAT_SOURCE_NOTE, LEAF_IDS } from "./catalog";
import { bookPath, firstPageForLeaf, folioCount, getPage } from "./book";

test("Haripaat has bilingual daily leaves", () => {
  assert.equal(LEAF_IDS.length, HARIPAAT_LEAVES.length);
  assert.match(HARIPAAT_SOURCE_NOTE.tradition, /हरिपाठ/);
  for (const leaf of HARIPAAT_LEAVES) {
    assert.ok(leaf.katha.mr.length >= 2);
    assert.ok(leaf.katha.en.length >= 2);
  }
  assert.equal(getPage(1).kind, "cover");
  assert.equal(getPage(firstPageForLeaf(1)).kind, "leaf");
  assert.equal(bookPath(1), "/haripaat/book?p=1");
  assert.equal(folioCount(), 2 + LEAF_IDS.length);
});
