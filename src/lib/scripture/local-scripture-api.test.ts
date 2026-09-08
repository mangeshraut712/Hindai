import assert from "node:assert/strict";
import { test } from "node:test";
import { getLocalVerse, listLocalVerses } from "./local-scripture-api";

test("loads a known Bhagavad Gita verse from the local index", () => {
  const verse = getLocalVerse("bhagavad-gita", 1, 1);
  assert.ok(verse);
  assert.equal(verse.scripture_id, "bhagavad-gita");
  assert.equal(verse.chapter, 1);
  assert.equal(verse.verse_num, 1);
  assert.ok(verse.text_devanagari.includes("धर्मक्षेत्रे"));
  assert.ok((verse.translations?.length ?? 0) > 0);
});

test("lists chapter verses without inventing records", () => {
  const verses = listLocalVerses("bhagavad-gita", 1);
  assert.ok(verses.length > 0);
  assert.ok(verses.every((verse) => verse.chapter === 1));
  assert.equal(getLocalVerse("missing-text", 1, 1), null);
});
