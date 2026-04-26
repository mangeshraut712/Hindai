// Vedic Accent Marks Types
// Udatta (acute), Anudatta (grave), Svarita (circumflex)

export interface VedicAccentResult {
  word: string;
  accentedWord: string;
  accents: AccentPattern[];
  meaning: string;
  confidence: number;
}

export interface AccentPattern {
  syllable: string;
  accent: AccentType;
  position: number;
}

export type AccentType = "Udatta" | "Anudatta" | "Svarita";

export const ACCENT_SYMBOLS = {
  Udatta: "́", // acute accent (above)
  Anudatta: "", // no mark (unmarked)
  Svarita: "̀", // grave accent (below)
};
