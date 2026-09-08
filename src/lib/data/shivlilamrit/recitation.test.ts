import assert from "node:assert/strict";
import { test } from "node:test";
import { prepareRecitation, sarvamLanguage, sarvamSpeaker } from "./recitation";

test("recitation inserts pauses and keeps Marathi language for Sarvam", () => {
  const spoken = prepareRecitation("शिवलीलामृत ॥ धन्य ॥", "mr");
  assert.match(spoken, /शिव लीला अमृत/);
  assert.match(spoken, /।/);
  assert.equal(sarvamLanguage("mr"), "mr-IN");
  assert.equal(sarvamSpeaker("mr"), "ritu");
  assert.equal(sarvamLanguage("en"), "en-IN");
});
