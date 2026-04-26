// Anvaya (Prose Word Order) Types

export interface AnvayaResult {
  original: string;
  anvaya: string[];
  wordOrder: WordOrder[];
  explanation: string;
  confidence: number;
}

export interface WordOrder {
  word: string;
  position: number;
  grammaticalRole: GrammaticalRole;
  meaning: string;
}

export type GrammaticalRole =
  | "Subject"
  | "Object"
  | "Verb"
  | "Adjective"
  | "Adverb"
  | "Preposition"
  | "Conjunction"
  | "Particle"
  | "Interjection"
  | "Unknown";
