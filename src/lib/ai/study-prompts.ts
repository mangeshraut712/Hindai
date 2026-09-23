export type StudyKind = "katha" | "mantra" | "book";

export type StudyAction = "explain" | "search" | "continue";

export interface StudyActionChoice {
  id: StudyAction;
  label: string;
}

const CONTEXT_LIMIT = 1200;

export function studyActions(kind: StudyKind): StudyActionChoice[] {
  switch (kind) {
    case "katha":
      return [
        { id: "explain", label: "Explain this story" },
        { id: "search", label: "What should I learn?" },
        { id: "continue", label: "Continue from this text" },
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

export function clipStudyContext(text: string): string {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= CONTEXT_LIMIT) return compact;
  return `${compact.slice(0, CONTEXT_LIMIT)}…`;
}

function taskFor(kind: StudyKind, action: StudyAction, question: string): string {
  switch (action) {
    case "explain":
      return `Explain ${kindLabel(kind)} in plain language a learner can follow.`;
    case "search":
      return question
        ? "Answer the learner's question from the passage."
        : `Say what a learner should understand next from this ${kindLabel(kind)}.`;
    case "continue":
      return "Continue only from the passage. If it is a summary, explain the next idea in that summary. Do not write new Sanskrit.";
    default: {
      const exhaustive: never = action;
      return exhaustive;
    }
  }
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
}): string {
  const question = input.question?.trim() ?? "";
  const context = clipStudyContext(input.context);
  return [
    `Source already on the Hind AI page: ${input.title}.`,
    "Use only this passage. Do not invent Sanskrit verses, missing shlokas, or a copyrighted translation.",
    "If the passage is a story summary, say so. If a line is incomplete on the page, say the page does not show the rest.",
    "This is study help, not a prediction and not a ritual instruction.",
    `Task: ${taskFor(input.kind, input.action, question)}`,
    question ? `Learner question: ${question}` : "",
    `Passage:\n${context || "(This page has a title but no passage text yet.)"}`,
  ]
    .filter((line) => line.length > 0)
    .join("\n\n");
}
