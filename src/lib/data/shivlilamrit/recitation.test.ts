import assert from "node:assert/strict";
import { test } from "node:test";
import {
  prepareRecitation,
  pickIndianVoice,
  recitationChunks,
  sarvamLanguage,
  sarvamSpeaker,
} from "./recitation";

test("recitation inserts pauses and keeps Marathi language for Sarvam", () => {
  const spoken = prepareRecitation("शिवलीलामृत ॥ धन्य ॥", "mr");
  assert.match(spoken, /शिव लीला अमृत/);
  assert.match(spoken, /।/);
  assert.equal(sarvamLanguage("mr"), "mr-IN");
  assert.equal(sarvamSpeaker("mr"), "ritu");
  assert.equal(sarvamLanguage("en"), "en-IN");
});

test("recitation chunks long chapters and prefers an Indian voice", () => {
  const chunks = recitationChunks(["एक।", "दोन।", "तीन।"], "mr", 8);
  assert.ok(chunks.length >= 2);
  const voice = pickIndianVoice(
    [
      { lang: "en-US", name: "Samantha" },
      { lang: "hi-IN", name: "Lekha" },
      { lang: "mr-IN", name: "Marathi" },
    ] as SpeechSynthesisVoice[],
    "mr"
  );
  assert.equal(voice?.lang, "mr-IN");
});
