import assert from "node:assert/strict";
import { test } from "node:test";
import { CHAPTER_IDS, RAMVIJAY_CHAPTERS, RAMVIJAY_SOURCE_NOTE } from "./catalog";
import { bookPath, firstPageForChapter, folioCount, getLeaf } from "./book";

test("Ramvijay catalog has bilingual katha leaves", () => {
  assert.equal(CHAPTER_IDS.length, RAMVIJAY_CHAPTERS.length);
  assert.match(RAMVIJAY_SOURCE_NOTE.composer, /श्रीधर/);
  for (const chapter of RAMVIJAY_CHAPTERS) {
    assert.ok(chapter.katha.mr.length >= 2);
    assert.ok(chapter.katha.en.length >= 2);
  }
  assert.equal(getLeaf(1).kind, "cover");
  assert.equal(getLeaf(firstPageForChapter(1)).kind, "adhyay");
  assert.equal(bookPath(1), "/ramvijay/book?p=1");
  assert.equal(folioCount(), 2 + CHAPTER_IDS.length);
});
