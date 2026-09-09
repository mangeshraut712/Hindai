import assert from "node:assert/strict";
import { test } from "node:test";
import {
  BEAT_IMAGE,
  CHAPTER_IDS,
  HARIVIJAY_CHAPTERS,
  HARIVIJAY_SOURCE_NOTE,
  type StoryBeat,
} from "./catalog";
import { bookPath, firstPageForChapter, folioCount, getLeaf } from "./book";

test("Harivijay has 36 unique adhyays with bilingual katha", () => {
  assert.equal(CHAPTER_IDS.length, 36);
  assert.equal(HARIVIJAY_CHAPTERS.length, 36);
  assert.equal(new Set(HARIVIJAY_CHAPTERS.map((c) => c.id)).size, 36);
  assert.match(HARIVIJAY_SOURCE_NOTE.composer, /श्रीधर/);
  for (const chapter of HARIVIJAY_CHAPTERS) {
    assert.ok(chapter.titleMr.length > 2);
    assert.ok(chapter.titleEn.length > 2);
    assert.ok(chapter.katha.mr.length >= 2);
    assert.ok(chapter.katha.en.length >= 2);
    assert.ok(BEAT_IMAGE[chapter.beat].startsWith("/harivijay/"));
  }
});

test("Harivijay folio walks cover, contents, then adhyays", () => {
  assert.equal(folioCount(), 38);
  assert.equal(getLeaf(1).kind, "cover");
  assert.equal(getLeaf(2).kind, "contents");
  const leaf = getLeaf(firstPageForChapter(4));
  assert.equal(leaf.kind, "adhyay");
  if (leaf.kind === "adhyay") {
    assert.equal(leaf.chapter.id, 4);
  }
  assert.equal(bookPath(1), "/harivijay/book?p=1");
});

test("every story beat has an image path", () => {
  const beats: StoryBeat[] = [
    "gokul",
    "mathura",
    "birth",
    "vrindavan",
    "govardhan",
    "rasa",
    "dwarka",
    "kurukshetra",
    "prabhas",
    "close",
  ];
  for (const beat of beats) {
    assert.ok(BEAT_IMAGE[beat]);
  }
});
