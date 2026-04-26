// Vedic Accent Marks Analyzer

import { VedicAccentResult, AccentPattern, AccentType } from "./types";
import { KNOWN_ACCENTED_WORDS, ACCENT_SYMBOLS } from "./patterns";

export class VedicAccentAnalyzer {
  /**
   * Analyze a Sanskrit word to determine its Vedic accent pattern
   */
  static analyze(word: string): VedicAccentResult {
    const accents = this.detectAccents(word);
    const accentedWord = this.applyAccents(word, accents);
    const meaning = this.generateMeaning(word, accents);
    const confidence = this.calculateConfidence(word, accents);

    return {
      word,
      accentedWord,
      accents,
      meaning,
      confidence,
    };
  }

  /**
   * Detect accent patterns for a word
   */
  private static detectAccents(word: string): AccentPattern[] {
    const accents: AccentPattern[] = [];
    const wordLower = word.toLowerCase();

    // Check if word is in known accented words database
    if (KNOWN_ACCENTED_WORDS[wordLower]) {
      const known = KNOWN_ACCENTED_WORDS[wordLower];
      const syllables = this.splitIntoSyllables(word);

      known.type.forEach((type, index) => {
        if (index < syllables.length) {
          accents.push({
            syllable: syllables[index],
            accent: type,
            position: index,
          });
        }
      });

      return accents;
    }

    // Fallback: Apply basic accent rules
    const syllables = this.splitIntoSyllables(word);
    syllables.forEach((syllable, index) => {
      let accent: AccentType = "Anudatta";

      // First syllable is usually Udatta
      if (index === 0) {
        accent = "Udatta";
      }

      accents.push({
        syllable,
        accent,
        position: index,
      });
    });

    return accents;
  }

  /**
   * Split a word into syllables
   */
  private static splitIntoSyllables(word: string): string[] {
    const syllables: string[] = [];
    let current = "";

    for (let i = 0; i < word.length; i++) {
      current += word[i];

      // Simple syllable boundary detection
      if (this.isSyllableBoundary(current, word[i + 1])) {
        syllables.push(current);
        current = "";
      }
    }

    if (current.length > 0) {
      syllables.push(current);
    }

    return syllables.length > 0 ? syllables : [word];
  }

  /**
   * Check if we have a syllable boundary
   */
  private static isSyllableBoundary(current: string, nextChar: string): boolean {
    const vowels = ["a", "ā", "i", "ī", "u", "ū", "ṛ", "ṝ", "ḷ", "ḷ", "e", "ai", "o", "au"];
    const consonants = [
      "k",
      "kh",
      "g",
      "gh",
      "ṅ",
      "c",
      "ch",
      "j",
      "jh",
      "ñ",
      "ṭ",
      "ṭh",
      "ḍ",
      "ḍh",
      "ṇ",
      "t",
      "th",
      "d",
      "dh",
      "n",
      "p",
      "ph",
      "b",
      "bh",
      "m",
      "y",
      "r",
      "l",
      "v",
      "ś",
      "ṣ",
      "s",
      "h",
    ];

    // If next char is a vowel and current ends with consonant, likely boundary
    if (nextChar && vowels.includes(nextChar) && current.length > 0) {
      const lastChar = current.slice(-1);
      if (consonants.includes(lastChar)) {
        return true;
      }
    }

    // If current ends with vowel and next is consonant, likely boundary
    if (nextChar && consonants.includes(nextChar) && current.length > 0) {
      const lastChar = current.slice(-1);
      if (vowels.includes(lastChar)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Apply accent marks to the word
   */
  private static applyAccents(word: string, accents: AccentPattern[]): string {
    let result = word;
    const syllables = this.splitIntoSyllables(word);

    accents.forEach((accent) => {
      const symbol = ACCENT_SYMBOLS[accent.accent];
      if (symbol && accent.position < syllables.length) {
        // Replace the syllable with accented version
        const syllable = syllables[accent.position];
        const accentedSyllable = syllable + symbol;
        result = result.replace(syllable, accentedSyllable);
      }
    });

    return result;
  }

  /**
   * Generate meaning description for the accent pattern
   */
  private static generateMeaning(word: string, accents: AccentPattern[]): string {
    const accentDescriptions = accents.map((a) => {
      const symbol = ACCENT_SYMBOLS[a.accent];
      return `${a.syllable}${symbol} (${a.accent})`;
    });

    return `${word} has accent pattern: ${accentDescriptions.join(" - ")}`;
  }

  /**
   * Calculate confidence score for the analysis
   */
  private static calculateConfidence(word: string, accents: AccentPattern[]): number {
    const wordLower = word.toLowerCase();

    // High confidence if word is in known database
    if (KNOWN_ACCENTED_WORDS[wordLower]) {
      return 0.9;
    }

    // Medium confidence for basic rule application
    return 0.5;
  }

  /**
   * Analyze multiple words
   */
  static analyzeBatch(words: string[]): VedicAccentResult[] {
    return words.map((word) => this.analyze(word));
  }
}
