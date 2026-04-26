// Samasa (Compound) Patterns for Sanskrit

import { SamasaType } from "./types";

export interface SamasaPattern {
  pattern: RegExp;
  type: SamasaType;
  description: string;
  examples: string[];
}

export const SAMASA_PATTERNS: SamasaPattern[] = [
  // Tatpurusha (Determinative compound) - Noun + Noun where first modifies second
  {
    pattern: /(\w+)(\w+)/,
    type: "Tatpurusha",
    description: "Determinative compound - first word modifies second",
    examples: ["Rajaputra (son of king)", "Nagarapati (lord of city)"],
  },

  // Karmadharaya (Adjective compound) - Adjective + Noun
  {
    pattern: /(\w+)(\w+)/,
    type: "Karmadharaya",
    description: "Adjective compound - adjective + noun",
    examples: ["Nilotpala (blue lotus)", "Shyamavarna (dark color)"],
  },

  // Dvandva (Copulative compound) - Noun + Noun (and)
  {
    pattern: /(\w+)(\w+)/,
    type: "Dvandva",
    description: "Copulative compound - both words equally important",
    examples: ["Matarpitar (mother and father)", "Dakshinavashina (south and north)"],
  },

  // Dvigu (Numeral determinative) - Number + Noun
  {
    pattern: /(eka|dvi|tri|chatur|pancha|shad|sapta|ashta|nava|dasha)(\w+)/,
    type: "Dvigu",
    description: "Numeral determinative - number + noun",
    examples: ["Ekavara (one color)", "Dashanama (ten names)"],
  },

  // Bahuvrihi (Possessive compound) - Having X
  {
    pattern: /(\w+)(\w+)/,
    type: "Bahuvrihi",
    description: "Possessive compound - 'having X'",
    examples: ["Mahabahu (great-armed)", "Shatapada (hundred-footed)"],
  },

  // Amredita (Reduplicated compound) - Word repeated
  {
    pattern: /(\w+)\1/,
    type: "Amredita",
    description: "Reduplicated compound - word repeated for emphasis",
    examples: ["Divyadivya (very divine)", "Nityanitya (very eternal)"],
  },

  // Avyayibhava (Indeclinable compound) - Becomes indeclinable
  {
    pattern: /(\w+)(\w+)/,
    type: "Avyayibhava",
    description: "Indeclinable compound - becomes indeclinable",
    examples: ["Yathashakti (according to power)", "Yathakalam (at all times)"],
  },
];

// Common prefixes (upasargas) for compound detection
export const UPASARGAS = [
  "pra",
  "parā",
  "upa",
  "apa",
  "sam",
  "ni",
  "vi",
  "ā",
  "nis",
  "pari",
  "ava",
  "dur",
  "su",
  "an",
  "ati",
  "ud",
  "abhi",
  "prati",
  "pari",
  "anu",
];

// Common suffixes for compound detection
export const SUFFIXES = [
  "a",
  "ā",
  "i",
  "ī",
  "u",
  "ū",
  "ṛ",
  "ṝ",
  "ḷ",
  "ḷ",
  "e",
  "ai",
  "o",
  "au",
  "am",
  "ām",
  "aḥ",
  "āḥ",
];
