// Database Schema for Scripture Delivery System
// Based on the blueprint: scriptures, verses, word_analysis, translations, commentaries

export interface Scripture {
  id: string;
  slug: string;
  title_en: string;
  title_sa: string; // Devanagari
  category: ScriptureCategory;
  total_verses: number;
  language: string;
  tradition: string;
  license: string;
  source_url?: string;
  created_at: Date;
  updated_at: Date;
}

export type ScriptureCategory =
  | "veda"
  | "upanishad"
  | "itihasa"
  | "purana"
  | "darshana"
  | "stotra"
  | "agama"
  | "tantra";

export interface Verse {
  id: string;
  scripture_id: string;
  book: number; // For texts with multiple books (e.g., Ramayana kandas)
  chapter: number;
  verse_num: number;
  pada?: number; // Quarter of verse (1-4)
  text_devanagari: string;
  text_iast: string;
  text_slp1?: string;
  text_hk?: string; // Harvard-Kyoto
  anvaya?: string; // Prose word order
  meter?: string; // Chandas (meter)
  audio_url?: string;
  audio_vedic_url?: string; // Vedic recitation with accents
  embedding?: number[]; // Vector for semantic search
  verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface WordAnalysis {
  id: string;
  verse_id: string;
  position: number; // Position in verse
  word_devanagari: string;
  word_iast: string;
  lemma: string; // Dictionary form
  case?: string; // Vibhakti
  number?: string; // Singular, dual, plural
  gender?: string; // Masculine, feminine, neuter
  meaning_en: string;
  morphology?: string; // Detailed morphological tags
  created_at: Date;
}

export interface Translation {
  id: string;
  verse_id: string;
  lang: string; // en, hi, ta, te, etc.
  translator_name: string;
  tradition?: string; // advaita, dvaita, vishishtadvaita, etc.
  text: string;
  source_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Commentary {
  id: string;
  verse_id: string;
  acharya: string; // Shankara, Ramanuja, Madhva, etc.
  school: VedantaSchool;
  text_sa?: string; // Sanskrit commentary
  text_en: string; // English translation
  source: string; // Source text name
  century?: string; // Century of composition
  created_at: Date;
  updated_at: Date;
}

export type VedantaSchool =
  | "advaita"
  | "vishishtadvaita"
  | "dvaita"
  | "shuddhadvaita"
  | "dvaitadvaita"
  | "achintya-bhedabheda"
  | "general";

export interface Audio {
  id: string;
  verse_id: string;
  type: AudioType;
  url: string;
  source: string; // Vedic Heritage Portal, Archive.org, TTS, etc.
  quality: AudioQuality;
  duration?: number; // in seconds
  vedic_accents?: boolean; // Has proper udatta, anudatta, svarita
  created_at: Date;
}

export type AudioType = "pre-recorded" | "tts" | "vedic-accent";
export type AudioQuality = "high" | "medium" | "low";

export interface UserProgress {
  id: string;
  user_id: string;
  scripture_id: string;
  chapter: number;
  verse_num: number;
  completed: boolean;
  bookmarked: boolean;
  notes?: string;
  last_accessed: Date;
  created_at: Date;
  updated_at: Date;
}

export interface FlashcardProgress {
  id: string;
  user_id: string;
  verse_id: string;
  ease_factor: number; // SM-2 algorithm
  interval: number; // Days until next review
  repetitions: number;
  last_reviewed: Date;
  next_review: Date;
  quality: number; // 0-5 rating
  created_at: Date;
  updated_at: Date;
}

// Database query result types
export interface VerseWithLayers extends Verse {
  word_analysis?: WordAnalysis[];
  translations?: Translation[];
  commentaries?: Commentary[];
  audio?: Audio[];
}

export interface ScriptureWithVerses extends Scripture {
  verses?: Verse[];
}
