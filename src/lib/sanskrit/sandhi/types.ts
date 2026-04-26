// Sandhi (Sanskrit Phonological Combination) Types

export interface SandhiResult {
  original: string;
  split: string[];
  reconstructed: string;
  rules: SandhiRule[];
  confidence: number;
}

export interface SandhiRule {
  type: SandhiType;
  description: string;
  from: string;
  to: string;
  position: number;
}

export type SandhiType =
  | "VowelSandhi"
  | "ConsonantSandhi"
  | "VisargaSandhi"
  | "YogaSandhi"
  | "GunSandhi"
  | "VriddhiSandhi";

export interface SandhiPattern {
  pattern: RegExp;
  replacement: string;
  type: SandhiType;
  description: string;
  examples: string[];
}
