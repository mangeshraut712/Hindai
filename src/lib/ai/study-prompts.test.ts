import assert from "node:assert/strict";
import { test } from "node:test";
import { buildStudyPrompt, clipStudyContext, studyActions } from "./study-prompts";

test("each study surface offers explain, search, and continue", () => {
  for (const kind of ["katha", "mantra", "book"] as const) {
    assert.deepEqual(
      studyActions(kind).map((action) => action.id),
      ["explain", "search", "continue"]
    );
  }
});

test("study prompts stay inside the passage on the page", () => {
  const prompt = buildStudyPrompt({
    kind: "mantra",
    action: "continue",
    title: "Hanuman Chalisa",
    context: "जय हनुमान ज्ञान गुन सागर",
    question: "What does ज्ञान mean here?",
  });
  assert.match(prompt, /Do not invent Sanskrit verses/);
  assert.match(prompt, /जय हनुमान ज्ञान गुन सागर/);
  assert.match(prompt, /What does ज्ञान mean here/);
  assert.equal(clipStudyContext("ॐ".repeat(1300)).endsWith("…"), true);
});
