// Vibhakti Patterns for Sanskrit Case Endings

import { VibhaktiPattern, Vibhakti, Gender, Number } from "./types";

export const VIBHAKTI_PATTERNS: VibhaktiPattern[] = [
  // Masculine - Singular
  { ending: "aḥ", vibhakti: "Prathama", gender: "Masculine", number: "Singular" },
  { ending: "am", vibhakti: "Dvitiya", gender: "Masculine", number: "Singular" },
  { ending: "ena", vibhakti: "Tritiya", gender: "Masculine", number: "Singular" },
  { ending: "āya", vibhakti: "Chaturthi", gender: "Masculine", number: "Singular" },
  { ending: "āt", vibhakti: "Panchami", gender: "Masculine", number: "Singular" },
  { ending: "asya", vibhakti: "Shashthi", gender: "Masculine", number: "Singular" },
  { ending: "e", vibhakti: "Saptami", gender: "Masculine", number: "Singular" },
  { ending: "a", vibhakti: "Sambodhana", gender: "Masculine", number: "Singular" },

  // Masculine - Dual
  { ending: "au", vibhakti: "Prathama", gender: "Masculine", number: "Dual" },
  { ending: "au", vibhakti: "Dvitiya", gender: "Masculine", number: "Dual" },
  { ending: "ābhyām", vibhakti: "Tritiya", gender: "Masculine", number: "Dual" },
  { ending: "ābhyām", vibhakti: "Chaturthi", gender: "Masculine", number: "Dual" },
  { ending: "ābhyām", vibhakti: "Panchami", gender: "Masculine", number: "Dual" },
  { ending: "ayoh", vibhakti: "Shashthi", gender: "Masculine", number: "Dual" },
  { ending: "ayoh", vibhakti: "Saptami", gender: "Masculine", number: "Dual" },
  { ending: "au", vibhakti: "Sambodhana", gender: "Masculine", number: "Dual" },

  // Masculine - Plural
  { ending: "āḥ", vibhakti: "Prathama", gender: "Masculine", number: "Plural" },
  { ending: "ān", vibhakti: "Dvitiya", gender: "Masculine", number: "Plural" },
  { ending: "aiḥ", vibhakti: "Tritiya", gender: "Masculine", number: "Plural" },
  { ending: "ebhyaḥ", vibhakti: "Chaturthi", gender: "Masculine", number: "Plural" },
  { ending: "ebhyaḥ", vibhakti: "Panchami", gender: "Masculine", number: "Plural" },
  { ending: "ānām", vibhakti: "Shashthi", gender: "Masculine", number: "Plural" },
  { ending: "eṣu", vibhakti: "Saptami", gender: "Masculine", number: "Plural" },
  { ending: "āḥ", vibhakti: "Sambodhana", gender: "Masculine", number: "Plural" },

  // Feminine - Singular (ā-ending)
  { ending: "ā", vibhakti: "Prathama", gender: "Feminine", number: "Singular" },
  { ending: "ām", vibhakti: "Dvitiya", gender: "Feminine", number: "Singular" },
  { ending: "ayā", vibhakti: "Tritiya", gender: "Feminine", number: "Singular" },
  { ending: "yai", vibhakti: "Chaturthi", gender: "Feminine", number: "Singular" },
  { ending: "yāḥ", vibhakti: "Panchami", gender: "Feminine", number: "Singular" },
  { ending: "yāḥ", vibhakti: "Shashthi", gender: "Feminine", number: "Singular" },
  { ending: "yām", vibhakti: "Saptami", gender: "Feminine", number: "Singular" },
  { ending: "e", vibhakti: "Sambodhana", gender: "Feminine", number: "Singular" },

  // Feminine - Dual
  { ending: "e", vibhakti: "Prathama", gender: "Feminine", number: "Dual" },
  { ending: "e", vibhakti: "Dvitiya", gender: "Feminine", number: "Dual" },
  { ending: "ābhyām", vibhakti: "Tritiya", gender: "Feminine", number: "Dual" },
  { ending: "ābhyām", vibhakti: "Chaturthi", gender: "Feminine", number: "Dual" },
  { ending: "ābhyām", vibhakti: "Panchami", gender: "Feminine", number: "Dual" },
  { ending: "yoh", vibhakti: "Shashthi", gender: "Feminine", number: "Dual" },
  { ending: "yoh", vibhakti: "Saptami", gender: "Feminine", number: "Dual" },
  { ending: "e", vibhakti: "Sambodhana", gender: "Feminine", number: "Dual" },

  // Feminine - Plural
  { ending: "āḥ", vibhakti: "Prathama", gender: "Feminine", number: "Plural" },
  { ending: "āḥ", vibhakti: "Dvitiya", gender: "Feminine", number: "Plural" },
  { ending: "ābhiḥ", vibhakti: "Tritiya", gender: "Feminine", number: "Plural" },
  { ending: "ābhyaḥ", vibhakti: "Chaturthi", gender: "Feminine", number: "Plural" },
  { ending: "ābhyaḥ", vibhakti: "Panchami", gender: "Feminine", number: "Plural" },
  { ending: "ānām", vibhakti: "Shashthi", gender: "Feminine", number: "Plural" },
  { ending: "āsu", vibhakti: "Saptami", gender: "Feminine", number: "Plural" },
  { ending: "āḥ", vibhakti: "Sambodhana", gender: "Feminine", number: "Plural" },

  // Neuter - Singular
  { ending: "am", vibhakti: "Prathama", gender: "Neuter", number: "Singular" },
  { ending: "am", vibhakti: "Dvitiya", gender: "Neuter", number: "Singular" },
  { ending: "ena", vibhakti: "Tritiya", gender: "Neuter", number: "Singular" },
  { ending: "āya", vibhakti: "Chaturthi", gender: "Neuter", number: "Singular" },
  { ending: "āt", vibhakti: "Panchami", gender: "Neuter", number: "Singular" },
  { ending: "asya", vibhakti: "Shashthi", gender: "Neuter", number: "Singular" },
  { ending: "e", vibhakti: "Saptami", gender: "Neuter", number: "Singular" },
  { ending: "am", vibhakti: "Sambodhana", gender: "Neuter", number: "Singular" },

  // Neuter - Dual
  { ending: "e", vibhakti: "Prathama", gender: "Neuter", number: "Dual" },
  { ending: "e", vibhakti: "Dvitiya", gender: "Neuter", number: "Dual" },
  { ending: "ābhyām", vibhakti: "Tritiya", gender: "Neuter", number: "Dual" },
  { ending: "ābhyām", vibhakti: "Chaturthi", gender: "Neuter", number: "Dual" },
  { ending: "ābhyām", vibhakti: "Panchami", gender: "Neuter", number: "Dual" },
  { ending: "ayoh", vibhakti: "Shashthi", gender: "Neuter", number: "Dual" },
  { ending: "ayoh", vibhakti: "Saptami", gender: "Neuter", number: "Dual" },
  { ending: "e", vibhakti: "Sambodhana", gender: "Neuter", number: "Dual" },

  // Neuter - Plural
  { ending: "āni", vibhakti: "Prathama", gender: "Neuter", number: "Plural" },
  { ending: "āni", vibhakti: "Dvitiya", gender: "Neuter", number: "Plural" },
  { ending: "aiḥ", vibhakti: "Tritiya", gender: "Neuter", number: "Plural" },
  { ending: "ebhyaḥ", vibhakti: "Chaturthi", gender: "Neuter", number: "Plural" },
  { ending: "ebhyaḥ", vibhakti: "Panchami", gender: "Neuter", number: "Plural" },
  { ending: "ānām", vibhakti: "Shashthi", gender: "Neuter", number: "Plural" },
  { ending: "eṣu", vibhakti: "Saptami", gender: "Neuter", number: "Plural" },
  { ending: "āni", vibhakti: "Sambodhana", gender: "Neuter", number: "Plural" },
];

// Karaka (semantic role) mappings based on vibhakti
export const KARAKA_MAPPINGS: Record<Vibhakti, string[]> = {
  Prathama: ["Karta", "Vachaka"], // Agent, Denotation
  Dvitiya: ["Karma"], // Object
  Tritiya: ["Karanam"], // Instrument
  Chaturthi: ["Sampradana"], // Recipient
  Panchami: ["Apadana"], // Source
  Shashthi: ["Sambandha"], // Possession
  Saptami: ["Adhikarana"], // Location
  Sambodhana: ["Karta"], // Agent (addressed)
};

export const VIBHAKTI_NAMES: Record<Vibhakti, string> = {
  Prathama: "Nominative (1st case)",
  Dvitiya: "Accusative (2nd case)",
  Tritiya: "Instrumental (3rd case)",
  Chaturthi: "Dative (4th case)",
  Panchami: "Ablative (5th case)",
  Shashthi: "Genitive (6th case)",
  Saptami: "Locative (7th case)",
  Sambodhana: "Vocative (address)",
};

export const KARAKA_NAMES: Record<string, string> = {
  Karta: "Agent/Doer",
  Karma: "Object/Action",
  Karanam: "Instrument",
  Sampradana: "Recipient",
  Apadana: "Source/Origin",
  Adhikarana: "Location",
  Sambandha: "Possession/Relation",
  Vachaka: "Denotation",
};
