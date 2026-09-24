import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildStudyPrompt,
  clipStudyContext,
  studyActions,
  studyAnswerLines,
} from "./study-prompts";

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
  assert.equal(clipStudyContext("ॐ".repeat(1300), 1200).endsWith("…"), true);
  assert.match(prompt, /what this section does not include|Continue from the last event/);
});

test("an explanation names the event and a follow-up keeps the earlier note", () => {
  const explained = buildStudyPrompt({
    kind: "katha",
    action: "explain",
    title: "अध्याय 1",
    context: "नारद विष्णूला प्रश्न विचारतो.",
  });
  assert.match(explained, /Name the people and the event/);
  assert.match(explained, /what this section does not include/);
  const followUp = buildStudyPrompt({
    kind: "katha",
    action: "search",
    title: "अध्याय 1",
    context: "नारद विष्णूला प्रश्न विचारतो.",
    question: "नारद कोणाला विचारतो?",
    priorAnswer: "नारद विष्णूकडे जातो.",
  });
  assert.match(followUp, /Earlier note on this same section/);
  assert.match(followUp, /नारद विष्णूकडे जातो/);
});

test("study answers drop markdown headings and keep numbered points", () => {
  assert.deepEqual(studyAnswerLines("## सारांश\n\n1. नारद प्रश्न विचारतो\n- विष्णू व्रत सांगतो"), [
    { kind: "text", text: "सारांश" },
    { kind: "blank", text: "" },
    { kind: "bullet", text: "नारद प्रश्न विचारतो" },
    { kind: "bullet", text: "विष्णू व्रत सांगतो" },
  ]);
});

test("a long katha can send its selected chapter in the learner's language", () => {
  const lastLine = "कलावती प्रसाद घेऊन परत आली.";
  const prompt = buildStudyPrompt({
    kind: "katha",
    action: "explain",
    title: "सत्यनारायण कथा · अध्याय ४",
    context: `${"कथेचा भाग. ".repeat(700)} ${lastLine}`,
    contextLimit: 14000,
    answerLanguage: "Marathi",
  });
  assert.match(prompt, /Answer in Marathi/);
  assert.match(prompt, /कलावती प्रसाद घेऊन परत आली/);
});
