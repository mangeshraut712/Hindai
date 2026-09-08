import assert from "node:assert/strict";
import { test } from "node:test";
import { firstPageForSlug, getFolio } from "./book";
import { kathaForFolio, loadFolioVerses } from "./folio-content";

test("folio content loads katha and ovis without the UI layer", async () => {
  const kathaPage = getFolio(firstPageForSlug("11"));
  assert.ok(kathaPage);
  assert.match(kathaForFolio(kathaPage).mr[0], /रुद्र/);
  const oviPage = getFolio(firstPageForSlug("11") + 1);
  assert.ok(oviPage);
  const verses = await loadFolioVerses(oviPage);
  assert.equal(verses.length, 182);
  assert.match(verses[0], /धन्य धन्य तेचि जन/);
});
