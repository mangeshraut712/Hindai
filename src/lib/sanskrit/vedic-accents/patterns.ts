// Vedic Accent Patterns for Sanskrit

import { AccentType } from "./types";

export interface AccentPattern {
  pattern: RegExp;
  accent: AccentType;
  description: string;
  examples: string[];
}

export const ACCENT_SYMBOLS = {
  Udatta: "́", // acute accent (above)
  Anudatta: "", // no mark (unmarked)
  Svarita: "̀", // grave accent (below)
};

export const VEDIC_ACCENT_PATTERNS: AccentPattern[] = [
  // Udatta (acute) - Rising pitch, marked with acute accent
  {
    pattern: /[aāiīuūṛṝḷ]́/g,
    accent: "Udatta",
    description: "Rising pitch (acute accent)",
    examples: ["brahmá", "agní", "devá"],
  },

  // Anudatta (grave) - Lower pitch, unmarked
  {
    pattern: /[aāiīuūṛṝḷ]/g,
    accent: "Anudatta",
    description: "Lower pitch (unmarked)",
    examples: ["brahma", "agni", "deva"],
  },

  // Svarita (circumflex) - Falling pitch, marked with grave accent
  {
    pattern: /[aāiīuūṛṝḷ]̀/g,
    accent: "Svarita",
    description: "Falling pitch (grave accent)",
    examples: ["brahmà", "agnì", "devà"],
  },
];

// Common words with known accent patterns
export const KNOWN_ACCENTED_WORDS: Record<string, { accents: string[]; type: AccentType[] }> = {
  brahma: { accents: ["bra", "hma"], type: ["Udatta", "Anudatta"] },
  agni: { accents: ["ag", "ni"], type: ["Udatta", "Anudatta"] },
  deva: { accents: ["de", "va"], type: ["Udatta", "Anudatta"] },
  indra: { accents: ["in", "dra"], type: ["Udatta", "Anudatta"] },
  varuna: { accents: ["va", "ru", "na"], type: ["Udatta", "Anudatta", "Anudatta"] },
  mitra: { accents: ["mi", "tra"], type: ["Udatta", "Anudatta"] },
  surya: { accents: ["su", "rya"], type: ["Udatta", "Anudatta"] },
  chandra: { accents: ["chan", "dra"], type: ["Udatta", "Anudatta"] },
  vayu: { accents: ["va", "yu"], type: ["Udatta", "Anudatta"] },
  prithvi: { accents: ["prith", "vi"], type: ["Udatta", "Anudatta"] },
};

// Rules for accent assignment
export const ACCENT_RULES = [
  {
    rule: "First syllable of root word is usually Udatta",
    pattern: /^.+/,
    accent: "Udatta",
  },
  {
    rule: "Following syllables are usually Anudatta",
    pattern: /.+$/,
    accent: "Anudatta",
  },
  {
    rule: "Svarita occurs after Udatta in certain contexts",
    pattern: /.+/,
    accent: "Svarita",
  },
];
