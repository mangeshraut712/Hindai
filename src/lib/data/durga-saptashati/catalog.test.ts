import assert from "node:assert/strict";
import { test } from "node:test";
import {
  DURGA_SAPTASHATI_LEAVES,
  DURGA_SAPTASHATI_SOURCE_NOTE,
  LEAF_IDS,
  charitraLabel,
} from "./catalog";
import { bookPath, firstPageForLeaf, folioCount, getPage } from "./book";

test("Durga Saptashati has angas plus thirteen adhyayas", () => {
  assert.equal(LEAF_IDS.length, DURGA_SAPTASHATI_LEAVES.length);
  assert.equal(LEAF_IDS.length, 16);
  assert.match(DURGA_SAPTASHATI_SOURCE_NOTE.tradition, /सप्तशती/);
  const angas = DURGA_SAPTASHATI_LEAVES.filter((leaf) => leaf.kind === "anga");
  const adhyayas = DURGA_SAPTASHATI_LEAVES.filter((leaf) => leaf.kind === "adhyay");
  assert.equal(angas.length, 3);
  assert.equal(adhyayas.length, 13);
  for (const leaf of DURGA_SAPTASHATI_LEAVES) {
    assert.ok(leaf.katha.mr.length >= 2);
    assert.ok(leaf.katha.en.length >= 2);
    assert.ok(charitraLabel(leaf.charitra).length > 2);
  }
  assert.equal(getPage(1).kind, "cover");
  assert.equal(getPage(firstPageForLeaf(1)).kind, "leaf");
  assert.equal(bookPath(1), "/durga-saptashati/book?p=1");
  assert.equal(folioCount(), 2 + LEAF_IDS.length);
});
