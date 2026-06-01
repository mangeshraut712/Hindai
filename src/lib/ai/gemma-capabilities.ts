export const HINDAI_GEMMA_MODEL = "google/gemma-4-31b-it:free";

export const gemmaCapabilityPillars = [
  {
    title: "Scripture explanation",
    body: "Explain verses, themes, and philosophical ideas with Sanskrit terms, transliteration, and practical meaning.",
  },
  {
    title: "Grounded comparison",
    body: "Compare ideas across Gita, Upanishads, Vedas, Yoga texts, Ramayana, Mahabharata, and Puranic material.",
  },
  {
    title: "Native-language study",
    body: "Respond in clear English or Indian-language study style with Devanagari-aware transliteration support.",
  },
  {
    title: "Daily guidance",
    body: "Generate sadhana routines, mantra practice notes, dharma suggestions, festival context, and reflection prompts.",
  },
  {
    title: "Sanskrit learning",
    body: "Help with sandhi, samasa, dhatu, vibhakti, anvaya, pronunciation notes, and example sentences.",
  },
  {
    title: "Vision analysis",
    body: "Analyze sacred text images, iconography, yantras, ritual objects, and temple details when image input is available.",
  },
];

export const hindAIUseCases = [
  {
    title: "For daily practice",
    body: "Open Daily or Sadhana for mantra counting, sankalpa, short routines, and practical Gemma 4 explanations.",
  },
  {
    title: "For scripture reading",
    body: "Start in the Library, open a text, read its structure, then ask Gemma 4 for context or a verse-level study pack.",
  },
  {
    title: "For Sanskrit study",
    body: "Use SanskritNova and Sanskrit Tools for transliteration, grammar, anvaya, dhatu lookup, and guided exercises.",
  },
  {
    title: "For teaching",
    body: "Use Study Paths to turn broad topics into classroom-friendly sequences with comparison prompts.",
  },
  {
    title: "For culture and calendar",
    body: "Use Panchanga, Pilgrimage, Stotras, Audio, and Dharma Guide for lived context beyond isolated text lookup.",
  },
  {
    title: "For visual material",
    body: "Use Vision to interpret manuscripts, sacred symbols, and temple imagery with cautious cultural context.",
  },
];

export const hindAIWorkflow = [
  "Choose a route: Library for texts, Guru AI for questions, Sadhana for practice, SanskritNova for learning, or Vision for images.",
  "Give Gemma 4 a concrete goal: explain, compare, translate, summarize, create a routine, or prepare a teaching note.",
  "Ask for the language and depth you need: simple English, Hindi-style explanation, Sanskrit terms, student level, or teacher level.",
  "Use the answer as study support, then verify important claims against the source text or a qualified teacher.",
];

export function buildHindAISystemPrompt({
  mode,
  audience,
  language = "English",
}: {
  mode?: string;
  audience?: string;
  language?: string;
} = {}) {
  return [
    "You are Hind AI, a Gemma 4 powered digital gurukul for ancient Indian scripture study.",
    "Use only the Hind AI Gemma 4 via OpenRouter identity. Do not claim to be another model or provider.",
    "Give accurate, humble, source-aware guidance for Hindu scriptures, Sanskrit learning, dharma, sadhana, philosophy, and cultural context.",
    "When relevant, include Sanskrit terms in Devanagari with simple transliteration and a clear explanation.",
    "For daily practice, keep guidance practical, safe, and respectful. Encourage qualified teacher guidance for rituals, intense practice, health, or life decisions.",
    "When uncertain, state uncertainty and give multiple traditional interpretations instead of inventing certainty.",
    "Prefer concise streaming-friendly paragraphs, short lists, and clear next steps.",
    `Requested mode: ${mode || "general study"}.`,
    `Audience: ${audience || "general learner"}.`,
    `Preferred response language/style: ${language}.`,
  ].join("\n");
}
