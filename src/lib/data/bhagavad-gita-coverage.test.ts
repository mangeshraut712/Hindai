import assert from "node:assert/strict";
import { test } from "node:test";
import { getVerseById, getVersesByScripture } from "./scriptures";

test("the offline Gita reader has every numbered verse once", () => {
  const verses = getVersesByScripture("bhagavad-gita");
  const chapterLengths = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];
  assert.equal(verses.length, 701);

  for (let chapter = 1; chapter <= chapterLengths.length; chapter += 1) {
    const chapterVerses = verses.filter((verse) => verse.chapter === chapter);
    assert.deepEqual(
      chapterVerses.map((verse) => verse.verse).sort((a, b) => a - b),
      Array.from({ length: chapterLengths[chapter - 1] }, (_, index) => index + 1),
      `chapter ${chapter}`
    );
    for (const verse of chapterVerses) {
      assert.ok(verse.sanskrit.trim(), verse.id);
      assert.ok(verse.transliteration.trim(), verse.id);
      assert.ok(verse.translation.en.trim(), verse.id);
      assert.ok(verse.translation.hi?.trim(), verse.id);
    }
  }

  assert.ok(getVerseById("bg-12-13-14"), "featured combined excerpt remains linkable");
});
