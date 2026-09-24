import assert from "node:assert/strict";
import { test } from "node:test";
import { SATYANARAYAN_READING_CHAPTERS } from "./satyanarayan-reader";

test("all five source chapters separate Sanskrit reading from Hindi notes", () => {
  assert.deepEqual(
    SATYANARAYAN_READING_CHAPTERS.map((chapter) => chapter.number),
    [1, 2, 3, 4, 5]
  );
  for (const chapter of SATYANARAYAN_READING_CHAPTERS) {
    assert.ok(chapter.original.length > 10, `chapter ${chapter.number} original`);
    assert.ok(chapter.hindi.length > 0, `chapter ${chapter.number} Hindi`);
    assert.ok(chapter.sourceUrl.startsWith("https://sa.wikisource.org/"));
    assert.ok(!chapter.original.join(" ").includes("अनुवाद:-"));
  }
  assert.match(SATYANARAYAN_READING_CHAPTERS[0].original.join(" "), /एकदा नैमिषारण्ये/);
  assert.match(SATYANARAYAN_READING_CHAPTERS[4].original.join(" "), /शतानन्दो/);
  assert.match(SATYANARAYAN_READING_CHAPTERS[4].original.join(" "), /गोलोकं तु तदा ययुः/);
  assert.doesNotMatch(SATYANARAYAN_READING_CHAPTERS[4].original.join(" "), /शब्दार्थ/);
});
