/**
 * TypeScript types for scripture data
 * Optimized for large-scale scripture databases
 */

export interface Scripture {
  id: string;
  name: string;
  sanskritName: string;
  category: "veda" | "epic" | "purana" | "dharma-shastra" | "philosophy" | "upanishad";
  description: string;
  totalChapters: number;
  totalVerses?: number;
  language: string;
  approximateDate: string;
  author?: string;
  keyConcepts: string[];
  mandalas?: number; // For Vedas
  sections?: string[]; // For structured texts
}

export interface ScriptureVerse {
  id: string;
  scriptureId: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  padaArtha?: {
    word: string;
    iast: string;
    meaning: string;
  }[];
  wordByWord?: {
    sanskrit: string;
    iast: string;
    meaning: string;
  }[];
  translation: {
    en: string;
    hi?: string;
    sa?: string; // Sanskrit explanation
  };
  commentary?: string;
  keyTerms: string[];
  relatedVerses?: string[];
  tags?: string[]; // For search optimization
  speaker?: string; // Speaker of the verse (e.g. Krishna, Arjuna)
  sukta?: number; // For Vedas
  mandala?: number; // For Vedas
  deity?: string;
  sage?: string;
  meter?: string;
  verseRefs?: {
    scriptureId: string;
    chapter: number;
    verse: number;
    relevance: string;
  }[];
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
  mode?: "contextual" | "cross-scriptural" | "linguistic";
}

export interface SearchResult {
  verse: ScriptureVerse;
  score: number;
  highlights: string[];
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ScriptureIndex {
  scriptureId: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  tags: string[];
  keyTerms: string[];
}
