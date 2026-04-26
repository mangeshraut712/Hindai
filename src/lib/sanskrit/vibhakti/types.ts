// Vibhakti (Case Ending) & Karaka Analyzer Types

export interface VibhaktiResult {
  word: string;
  vibhakti: Vibhakti;
  karaka: Karaka;
  meaning: string;
  confidence: number;
}

export type Vibhakti =
  | "Prathama" // Nominative (1st)
  | "Dvitiya" // Accusative (2nd)
  | "Tritiya" // Instrumental (3rd)
  | "Chaturthi" // Dative (4th)
  | "Panchami" // Ablative (5th)
  | "Shashthi" // Genitive (6th)
  | "Saptami" // Locative (7th)
  | "Sambodhana"; // Vocative (address)

export type Karaka =
  | "Karta" // Agent/Doer
  | "Karma" // Object/Action
  | "Karanam" // Instrument
  | "Sampradana" // Recipient
  | "Apadana" // Source/Origin
  | "Adhikarana" // Location
  | "Sambandha" // Possession/Relation
  | "Adhikarana" // Location/Abode
  | "Vachaka"; // Denotation

export interface VibhaktiPattern {
  ending: string;
  vibhakti: Vibhakti;
  gender: Gender;
  number: Number;
}

export type Gender = "Masculine" | "Feminine" | "Neuter";
export type Number = "Singular" | "Dual" | "Plural";
