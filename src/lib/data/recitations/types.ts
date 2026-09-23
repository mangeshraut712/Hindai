export interface RecitationVerse {
  number: number;
  label: string;
  original: string;
  iast: string;
  english: string;
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
  deity: string;
  occasion: string;
  summary: string;
  sourceNote: string;
  sections: RecitationSection[];
}

export type RecitationLayer = "original" | "iast" | "english" | "note";
