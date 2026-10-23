import assert from "node:assert/strict";
import { test } from "node:test";
import { getRigvedaVerse, getVerse } from "./scriptures";

test("Purusha Sukta 10.90.1 is verse 1 and opens with sahasraśīrṣā", () => {
  const structured = getRigvedaVerse(10, 90, 1);
  const flat = getVerse("rigveda", 10, 1, { sukta: 90 });
  assert.equal(flat?.id, "rv-10-90-1");
  assert.equal(flat?.verse, 1);
  assert.equal(flat?.sanskrit, structured?.sanskrit);
  assert.match(structured?.sanskrit ?? "", /सहस्रशीर्षा/);
  assert.notEqual(getVerse("rigveda", 10, 90)?.id, "rv-10-90-1");
});

test("Nasadiya Sukta 10.129.1 is not stored under verse 129", () => {
  const verse = getVerse("rigveda", 10, 1, { sukta: 129 });
  assert.equal(verse?.id, "rv-10-129-1");
  assert.equal(verse?.verse, 1);
  assert.equal(getRigvedaVerse(10, 129, 1)?.sanskrit, verse?.sanskrit);
  assert.match(verse?.sanskrit ?? "", /नासदासीन्/);
});
