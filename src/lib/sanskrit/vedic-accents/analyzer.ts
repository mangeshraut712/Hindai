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
    const known = KNOWN_ACCENTED_WORDS[wordLower];
    if (known && known.accents.join("") === wordLower) {
      known.accents.forEach((syllable, index) => {
        accents.push({
          syllable,
          accent: known.type[index] ?? "Anudatta",
          position: index,
        });
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
    const vowels = ["ai", "au", "ā", "ī", "ū", "ṛ", "ṝ", "e", "o", "a", "i", "u"];
    const consonants = [
      "kh",
      "gh",
      "ch",
      "jh",
      "ṭh",
      "ḍh",
      "th",
      "dh",
      "ph",
      "bh",
      "ṅ",
      "ñ",
      "ṇ",
      "ś",
      "ṣ",
      "k",
      "g",
      "c",
      "j",
      "ṭ",
      "ḍ",
      "t",
      "d",
      "n",
      "p",
      "b",
      "m",
      "y",
      "r",
      "l",
      "v",
      "s",
      "h",
    ];
    const syllables: string[] = [];
    let index = 0;

    while (index < word.length) {
      let cluster = "";
      while (index < word.length) {
        const consonant = consonants.find((item) => word.startsWith(item, index));
        if (!consonant) break;
        cluster += consonant;
        index += consonant.length;
      }

      const vowel = vowels.find((item) => word.startsWith(item, index));
      if (vowel) {
        syllables.push(cluster + vowel);
        index += vowel.length;
        continue;
      }

      if (cluster) {
        syllables.push(cluster);
        continue;
      }

      syllables.push(word[index] ?? "");
      index += 1;
    }

    return syllables.length > 0 ? syllables : [word];
  }

  /**
   * Apply accent marks to the word
   */
  private static applyAccents(word: string, accents: AccentPattern[]): string {
    if (accents.length === 0) return word;
    const unmarked = accents.map((accent) => accent.syllable).join("");
    if (unmarked.toLowerCase() !== word.toLowerCase()) return word;

    return accents
      .map((accent) => `${accent.syllable}${ACCENT_SYMBOLS[accent.accent] ?? ""}`)
      .join("");
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
  private static calculateConfidence(word: string, _accents: AccentPattern[]): number {
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
