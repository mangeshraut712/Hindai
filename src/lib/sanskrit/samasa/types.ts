// Samasa (Compound) Analyzer Types

export interface SamasaResult {
  original: string;
  split: string[];
  type: SamasaType;
  meaning: string;
  components: SamasaComponent[];
  confidence: number;
}

export interface SamasaComponent {
  word: string;
  meaning: string;
  role: string;
}

export type SamasaType =
  | "Tatpurusha" // Determinative compound
  | "Karmadharaya" // Adjective compound
  | "Dvandva" // Copulative compound
  | "Dvigu" // Numeral determinative
  | "Bahuvrihi" // Possessive compound
  | "Tatpurusha" // Genitive compound
  | "Amredita" // Reduplicated compound
  | "Karmadharaya" // Adverbial compound
  | "Avyayibhava" // Indeclinable compound
  | "Unknown";
