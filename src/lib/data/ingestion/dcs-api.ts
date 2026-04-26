// DCS (Digital Corpus of Sanskrit) API Integration
// Provides word-by-word morphological analysis for Sanskrit verses

import { WordAnalysis } from "@/lib/database/schema";

export interface DCSWord {
  word: string;
  lemma: string;
  pos: string; // Part of speech
  case?: string;
  number?: string;
  gender?: string;
  person?: string;
  mood?: string;
  tense?: string;
  voice?: string;
  meaning?: string;
}

export interface DCSVerseAnalysis {
  verse_id: string;
  text: string;
  words: DCSWord[];
}

export class DCSAPI {
  private static BASE_URL = "https://dcs.bbaw.de/api/v1";

  /**
   * Get morphological analysis for a verse
   */
  static async analyzeVerse(verseText: string): Promise<DCSVerseAnalysis> {
    const url = `${this.BASE_URL}/analyze`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: verseText }),
    });

    if (!response.ok) {
      throw new Error(`DCS API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Convert DCS word analysis to our WordAnalysis format
   */
  static convertToWordAnalysis(dcsAnalysis: DCSVerseAnalysis, verseId: string): WordAnalysis[] {
    return dcsAnalysis.words.map((word, index) => ({
      id: `${verseId}-word-${index}`,
      verse_id: verseId,
      position: index + 1,
      word_devanagari: word.word,
      word_iast: this.transliterateToIAST(word.word),
      lemma: word.lemma,
      case: word.case,
      number: word.number,
      gender: word.gender,
      meaning_en: word.meaning || "",
      morphology: this.buildMorphologyString(word),
      created_at: new Date(),
    }));
  }

  /**
   * Build morphology string from DCS word properties
   */
  private static buildMorphologyString(word: DCSWord): string {
    const parts: string[] = [];
    if (word.pos) parts.push(word.pos);
    if (word.case) parts.push(word.case);
    if (word.number) parts.push(word.number);
    if (word.gender) parts.push(word.gender);
    if (word.person) parts.push(word.person);
    if (word.mood) parts.push(word.mood);
    if (word.tense) parts.push(word.tense);
    if (word.voice) parts.push(word.voice);
    return parts.join(", ");
  }

  /**
   * Simple transliteration to IAST (placeholder - use indic-transliteration in production)
   */
  private static transliterateToIAST(text: string): string {
    // This is a simplified implementation
    // In production, use indic-transliteration library
    return text;
  }

  /**
   * Batch analyze multiple verses
   */
  static async batchAnalyze(
    verses: { id: string; text: string }[]
  ): Promise<Map<string, WordAnalysis[]>> {
    const results = new Map<string, WordAnalysis[]>();

    for (const verse of verses) {
      try {
        const analysis = await this.analyzeVerse(verse.text);
        const wordAnalysis = this.convertToWordAnalysis(analysis, verse.id);
        results.set(verse.id, wordAnalysis);
      } catch (error) {
        console.error(`Failed to analyze verse ${verse.id}:`, error);
        results.set(verse.id, []);
      }
    }

    return results;
  }

  /**
   * Search for a word in the DCS corpus
   */
  static async searchWord(word: string): Promise<DCSWord[]> {
    const url = `${this.BASE_URL}/search?q=${encodeURIComponent(word)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`DCS API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get lemma information
   */
  static async getLemmaInfo(lemma: string): Promise<{
    lemma: string;
    meaning: string;
    examples: string[];
  }> {
    const url = `${this.BASE_URL}/lemma/${encodeURIComponent(lemma)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`DCS API error: ${response.statusText}`);
    }

    return response.json();
  }
}
