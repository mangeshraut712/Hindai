export interface RecitationVerse {
  number: number;
  label: string;
  original: string;
  iast: string;
  english: string;
  marathi?: string;
  hindi?: string;
  note: string;
}

export interface RecitationSection {
  id: string;
  title: string;
  titleEn: string;
  verses: RecitationVerse[];
}

export interface Recitation {
  slug: string;
  title: string;
  titleSa: string;
  originalLanguage: "Sanskrit" | "Marathi" | "Awadhi";
  deity: string;
  occasion: string;
  summary: string;
  sourceNote: string;
  sourceUrl?: string;
  sections: RecitationSection[];
}

export type RecitationLayer = "original" | "iast" | "marathi" | "english" | "hindi" | "note";
