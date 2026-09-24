export type StudyKind = "katha" | "mantra" | "book";

export type StudyAction = "explain" | "search" | "continue";

export interface StudyActionChoice {
  id: StudyAction;
  label: string;
}

const CONTEXT_LIMIT = 8000;
const PRIOR_NOTE_LIMIT = 900;

const LOCALIZED_ACTIONS: Record<string, [string, string, string]> = {
  Marathi: ["ही कथा समजावून सांगा", "यातून काय शिकायचे?", "पुढे काय होते?"],
  Hindi: ["यह कथा समझाइए", "इससे क्या सीखें?", "आगे क्या होता है?"],
};

export function studyPanelCopy(answerLanguage?: string): { hint: string; placeholder: string } {
  if (answerLanguage === "Marathi") {
    return {
      hint: "या भागातील पात्रे आणि प्रसंग सांगते, आणि पानावर काय नाही तेही सांगते.",
      placeholder: "पात्र, ओळ किंवा प्रसंग विचारा",
    };
  }
  if (answerLanguage === "Hindi") {
    return {
      hint: "इस अंश के पात्र और प्रसंग बताता है, और यह भी कि पृष्ठ पर क्या नहीं है।",
      placeholder: "पात्र, पंक्ति या प्रसंग पूछें",
    };
  }
  return {
    hint: "Names the people and the event in this section, then says what the page does not include. It will not invent missing verses.",
    placeholder: "Ask about a person, a line, or what happens here",
  };
}

export function studyActions(kind: StudyKind, answerLanguage?: string): StudyActionChoice[] {
  const localized = answerLanguage ? LOCALIZED_ACTIONS[answerLanguage] : undefined;
  switch (kind) {
    case "katha":
      return [
        { id: "explain", label: localized?.[0] ?? "Explain this story" },
        { id: "search", label: localized?.[1] ?? "What should I learn?" },
        { id: "continue", label: localized?.[2] ?? "Continue from this text" },
      ];
    case "mantra":
      return [
        { id: "explain", label: "Explain this recitation" },
        { id: "search", label: "How do I recite this?" },
        { id: "continue", label: "Meanings of these lines" },
      ];
    case "book":
      return [
        { id: "explain", label: "Explain this page" },
        { id: "search", label: "What does this book teach?" },
        { id: "continue", label: "Continue from this page" },
      ];
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

export function clipStudyContext(text: string, limit = CONTEXT_LIMIT): string {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= limit) return compact;
  return `${compact.slice(0, limit)}…`;
}

function taskFor(kind: StudyKind, action: StudyAction, question: string): string {
  const subject = kindLabel(kind);
  switch (action) {
    case "explain":
      return `Explain ${subject} so a learner can retell it. Name the people and the event in this section. Then explain any names or phrases that appear in the passage. End with one sentence on what this section does not include.`;
    case "search":
      return question
        ? "Answer the learner's question from this section only. If the passage does not contain the answer, say so and point to the nearest line that does."
        : `Say what a learner should notice next in ${subject}: the people, the event, and one phrase from the passage.`;
    case "continue":
      return "Continue from the last event already written in the passage. Name who acts and what changes. Do not start a later chapter that is not in the passage, and do not write new Sanskrit.";
    default: {
      const exhaustive: never = action;
      return exhaustive;
    }
  }
}

export type StudyAnswerKind = "blank" | "bullet" | "text";

export interface StudyAnswerLine {
  kind: StudyAnswerKind;
  text: string;
}

export function studyAnswerLines(answer: string): StudyAnswerLine[] {
  return answer.split("\n").map((line) => {
    const trimmed = line.trim().replace(/^#{1,6}\s+/, "");
    if (!trimmed) return { kind: "blank", text: "" };
    const bullet = trimmed.match(/^(?:[-*]|\d+[.)]|[०-९]+[.)])\s+(.+)$/);
    if (bullet?.[1]) return { kind: "bullet", text: bullet[1] };
    return { kind: "text", text: trimmed };
  });
}

function kindLabel(kind: StudyKind): string {
  switch (kind) {
    case "katha":
      return "this story";
    case "mantra":
      return "this recitation";
    case "book":
      return "this page";
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

export function buildStudyPrompt(input: {
  kind: StudyKind;
  action: StudyAction;
  title: string;
  context: string;
  question?: string;
  contextLimit?: number;
  answerLanguage?: string;
  priorAnswer?: string;
}): string {
  const question = input.question?.trim() ?? "";
  const context = clipStudyContext(input.context, input.contextLimit);
  const prior = clipStudyContext(input.priorAnswer?.trim() ?? "", PRIOR_NOTE_LIMIT);
  return [
    `Source already on the Hind AI page: ${input.title}.`,
    "Use only this passage. Do not invent Sanskrit verses, missing shlokas, or a copyrighted translation.",
    "If the passage is a story summary, say so. If a line is incomplete on the page, say the page does not show the rest.",
    "This is study help, not a prediction and not a ritual instruction.",
    "Write short paragraphs. Do not use Markdown headings.",
    input.answerLanguage ? `Answer in ${input.answerLanguage}.` : "",
    `Task: ${taskFor(input.kind, input.action, question)}`,
    question ? `Learner question: ${question}` : "",
    prior ? `Earlier note on this same section:\n${prior}` : "",
    `Passage:\n${context || "(This page has a title but no passage text yet.)"}`,
  ]
    .filter((line) => line.length > 0)
    .join("\n\n");
}
