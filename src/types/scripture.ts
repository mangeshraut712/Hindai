/**
 * TypeScript types for scripture data
 */

export interface Scripture {
  id: string;
  name: string;
  sanskritName: string;
  category: "veda" | "epic" | "purana" | "dharma-shastra" | "philosophy";
  description: string;
  totalChapters: number;
  language: string;
  approximateDate: string;
  author?: string;
  keyConcepts: string[];
}

export interface ScriptureVerse {
  id: string;
  scriptureId: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: {
    en: string;
    hi?: string;
  };
  commentary?: string;
  keyTerms: string[];
  relatedVerses?: string[];
}

export interface AIExplanation {
  id: string;
  verseId: string;
  explanation: string;
  context: string;
  modernRelevance: string;
  keyTerms: {
    term: string;
    meaning: string;
    sanskrit: string;
  }[];
  references: {
    scripture: string;
    chapter: number;
    verse: number;
  }[];
  generatedAt: Date;
  modelVersion: string;
}

export interface SearchResult {
  verse: ScriptureVerse;
  score: number;
  highlights: string[];
}
