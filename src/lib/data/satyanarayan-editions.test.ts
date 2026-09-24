import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import editions from "./satyanarayan-editions.json";

test("supplied Satyanarayan editions cover five chapters and retain offline page references", () => {
  assert.deepEqual(
    editions.chapters.map((chapter) => chapter.number),
    [1, 2, 3, 4, 5]
  );

  for (const chapter of editions.chapters) {
    for (const language of ["marathi", "hindi", "english"] as const) {
      const text = chapter[language].join(" ");
      assert.ok(text.length > 900, `${language} chapter ${chapter.number} has reading text`);
      assert.ok(chapter[`${language}Pages`].length > 0);
      for (const page of chapter[`${language}Pages`]) {
        assert.ok(
          existsSync(
            `public/images/satyanarayan/source-pages/${language}-${String(page).padStart(2, "0")}.webp`
          )
        );
      }
    }
  }

  assert.match(editions.chapters[0].marathi.join(" "), /सत्यनारायण कथा/);
  assert.match(editions.chapters[4].hindi.join(" "), /तुंगध्वज/);
  assert.match(editions.chapters[4].english.join(" "), /Thungadhwaja/);
  assert.match(editions.aarti.marathi, /जय जय दीनदयाळा/);
  assert.match(editions.aarti.hindi, /ओम् जय लक्ष्मी रमणा/);
});
