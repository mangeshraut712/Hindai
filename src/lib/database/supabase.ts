// Supabase Database Client Setup
// Handles PostgreSQL database operations for scriptures, verses, translations, etc.

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
  SCRIPTURES: "scriptures",
  VERSES: "verses",
  WORD_ANALYSIS: "word_analysis",
  TRANSLATIONS: "translations",
  COMMENTARIES: "commentaries",
  AUDIO: "audio",
  USER_PROGRESS: "user_progress",
  FLASHCARD_PROGRESS: "flashcard_progress",
} as const;

// Scripture operations
export async function getScripture(id: string) {
  const { data, error } = await supabase.from(TABLES.SCRIPTURES).select("*").eq("id", id).single();

  if (error) throw error;
  return data;
}

export async function getScriptureBySlug(slug: string) {
  const { data, error } = await supabase
    .from(TABLES.SCRIPTURES)
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getAllScriptures() {
  const { data, error } = await supabase.from(TABLES.SCRIPTURES).select("*").order("title_en");

  if (error) throw error;
  return data;
}

export async function createScripture(scripture: any) {
  const { data, error } = await supabase
    .from(TABLES.SCRIPTURES)
    .insert(scripture)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Verse operations
export async function getVerse(id: string) {
  const { data, error } = await supabase.from(TABLES.VERSES).select("*").eq("id", id).single();

  if (error) throw error;
  return data;
}

export async function getVersesByChapter(scriptureId: string, chapter: number) {
  const { data, error } = await supabase
    .from(TABLES.VERSES)
    .select("*")
    .eq("scripture_id", scriptureId)
    .eq("chapter", chapter)
    .order("verse_num");

  if (error) throw error;
  return data;
}

export async function getVersesWithLayers(verseId: string) {
  const { data, error } = await supabase
    .from(TABLES.VERSES)
    .select(
      `
      *,
      word_analysis (*),
      translations (*),
      commentaries (*),
      audio (*)
    `
    )
    .eq("id", verseId)
    .single();

  if (error) throw error;
  return data;
}

export async function createVerse(verse: any) {
  const { data, error } = await supabase.from(TABLES.VERSES).insert(verse).select().single();

  if (error) throw error;
  return data;
}

export async function batchCreateVerses(verses: any[]) {
  const { data, error } = await supabase.from(TABLES.VERSES).insert(verses).select();

  if (error) throw error;
  return data;
}

// Word analysis operations
export async function getWordAnalysis(verseId: string) {
  const { data, error } = await supabase
    .from(TABLES.WORD_ANALYSIS)
    .select("*")
    .eq("verse_id", verseId)
    .order("position");

  if (error) throw error;
  return data;
}

export async function createWordAnalysis(wordAnalysis: any) {
  const { data, error } = await supabase
    .from(TABLES.WORD_ANALYSIS)
    .insert(wordAnalysis)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function batchCreateWordAnalysis(wordAnalyses: any[]) {
  const { data, error } = await supabase.from(TABLES.WORD_ANALYSIS).insert(wordAnalyses).select();

  if (error) throw error;
  return data;
}

// Translation operations
export async function getTranslations(verseId: string) {
  const { data, error } = await supabase
    .from(TABLES.TRANSLATIONS)
    .select("*")
    .eq("verse_id", verseId);

  if (error) throw error;
  return data;
}

export async function createTranslation(translation: any) {
  const { data, error } = await supabase
    .from(TABLES.TRANSLATIONS)
    .insert(translation)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Commentary operations
export async function getCommentaries(verseId: string) {
  const { data, error } = await supabase
    .from(TABLES.COMMENTARIES)
    .select("*")
    .eq("verse_id", verseId);

  if (error) throw error;
  return data;
}

export async function getCommentariesBySchool(verseId: string, school: string) {
  const { data, error } = await supabase
    .from(TABLES.COMMENTARIES)
    .select("*")
    .eq("verse_id", verseId)
    .eq("school", school);

  if (error) throw error;
  return data;
}

export async function createCommentary(commentary: any) {
  const { data, error } = await supabase
    .from(TABLES.COMMENTARIES)
    .insert(commentary)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Audio operations
export async function getAudio(verseId: string) {
  const { data, error } = await supabase.from(TABLES.AUDIO).select("*").eq("verse_id", verseId);

  if (error) throw error;
  return data;
}

export async function createAudio(audio: any) {
  const { data, error } = await supabase.from(TABLES.AUDIO).insert(audio).select().single();

  if (error) throw error;
  return data;
}

// User progress operations
export async function getUserProgress(userId: string, scriptureId?: string) {
  let query = supabase.from(TABLES.USER_PROGRESS).select("*").eq("user_id", userId);

  if (scriptureId) {
    query = query.eq("scripture_id", scriptureId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function upsertUserProgress(progress: any) {
  const { data, error } = await supabase
    .from(TABLES.USER_PROGRESS)
    .upsert(progress)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Flashcard progress operations
export async function getFlashcardProgress(userId: string, verseId?: string) {
  let query = supabase.from(TABLES.FLASHCARD_PROGRESS).select("*").eq("user_id", userId);

  if (verseId) {
    query = query.eq("verse_id", verseId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function upsertFlashcardProgress(progress: any) {
  const { data, error } = await supabase
    .from(TABLES.FLASHCARD_PROGRESS)
    .upsert(progress)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getDueFlashcards(userId: string) {
  const { data, error } = await supabase
    .from(TABLES.FLASHCARD_PROGRESS)
    .select("*")
    .eq("user_id", userId)
    .lte("next_review", new Date().toISOString())
    .order("next_review", { ascending: true });

  if (error) throw error;
  return data;
}
