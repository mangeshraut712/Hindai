// Samasa (Compound) Analyzer

import { SamasaResult, SamasaType, SamasaComponent } from "./types";
import { SAMASA_PATTERNS, UPASARGAS } from "./patterns";

export class SamasaAnalyzer {
  /**
   * Analyze a Sanskrit compound to determine its type and split into components
   */
  static analyze(compound: string): SamasaResult {
    const split = this.splitCompound(compound);
    const type = this.detectSamasaType(compound, split);
    const meaning = this.generateMeaning(compound, type, split);
    const components = this.identifyComponents(split);
    const confidence = this.calculateConfidence(compound, split, type);

    return {
      original: compound,
      split,
      type,
      meaning,
      components,
      confidence,
    };
  }

  /**
   * Split a compound into potential constituent words
   */
  private static splitCompound(compound: string): string[] {
    const words: string[] = [];
    let remaining = compound;

    // Try to split at common upasarga boundaries
    for (const upasarga of UPASARGAS) {
      if (remaining.startsWith(upasarga) && remaining.length > upasarga.length) {
        words.push(upasarga);
        remaining = remaining.slice(upasarga.length);
        break;
      }
    }

    // Try to split remaining part by common patterns
    if (remaining.length > 0) {
      const splits = this.splitByPatterns(remaining);
      words.push(...splits);
    }

    return words.length > 0 ? words : [compound];
  }

  /**
   * Split text by common patterns
   */
  private static splitByPatterns(text: string): string[] {
    const words: string[] = [];
    let current = "";

    for (let i = 0; i < text.length; i++) {
      current += text[i];

      // Check if current forms a known word ending
      if (this.isWordBoundary(current, text[i + 1])) {
        words.push(current);
        current = "";
      }
    }

    if (current.length > 0) {
      words.push(current);
    }

    return words.length > 0 ? words : [text];
  }

  /**
   * Check if we have a word boundary
   */
  private static isWordBoundary(current: string, nextChar: string): boolean {
    // Simple heuristic: if next char is a vowel and current ends with consonant, likely boundary
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

    if (nextChar && vowels.includes(nextChar) && current.length > 2) {
      const lastChar = current.slice(-1);
      if (consonants.includes(lastChar)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Detect the type of samasa based on pattern matching
   */
  private static detectSamasaType(compound: string, split: string[]): SamasaType {
    // Check for reduplication (Amredita)
    if (split.length === 2 && split[0] === split[1]) {
      return "Amredita";
    }

    // Check for numeral determinative (Dvigu)
    const numerals = [
      "eka",
      "dvi",
      "tri",
      "chatur",
      "pancha",
      "shad",
      "sapta",
      "ashta",
      "nava",
      "dasha",
    ];
    if (split.length >= 2 && numerals.includes(split[0])) {
      return "Dvigu";
    }

    // Check for common patterns
    for (const pattern of SAMASA_PATTERNS) {
      if (pattern.pattern.test(compound)) {
        return pattern.type;
      }
    }

    // Default to Tatpurusha (most common)
    return "Tatpurusha";
  }

  /**
   * Generate meaning description for the compound
   */
  private static generateMeaning(compound: string, type: SamasaType, split: string[]): string {
    const typeDescriptions: Record<SamasaType, string> = {
      Tatpurusha: "Determinative compound",
      Karmadharaya: "Adjective compound",
      Dvandva: "Copulative compound (and)",
      Dvigu: "Numeral determinative",
      Bahuvrihi: "Possessive compound (having)",
      Amredita: "Reduplicated compound",
      Avyayibhava: "Indeclinable compound",
      Unknown: "Unknown compound type",
    };

    return `${compound} is a ${typeDescriptions[type]}: ${split.join(" + ")}`;
  }

  /**
   * Identify components with their roles
   */
  private static identifyComponents(split: string[]): SamasaComponent[] {
    return split.map((word, index) => ({
      word,
      meaning: this.getWordMeaning(word),
      role:
        index === 0
          ? "first component"
          : index === split.length - 1
            ? "last component"
            : "middle component",
    }));
  }

  /**
   * Get meaning for a word (simplified)
   */
  private static getWordMeaning(word: string): string {
    const commonWords: Record<string, string> = {
      raja: "king",
      nagara: "city",
      matri: "mother",
      pitar: "father",
      nila: "blue",
      utpala: "lotus",
      shyama: "dark",
      varna: "color",
      maha: "great",
      bahu: "arm",
      shata: "hundred",
      pada: "foot",
      eka: "one",
      dasha: "ten",
      nitya: "eternal",
      divya: "divine",
    };

    return commonWords[word.toLowerCase()] || "word";
  }

  /**
   * Calculate confidence score for the analysis
   */
  private static calculateConfidence(compound: string, split: string[], type: SamasaType): number {
    let confidence = 0.5;

    // Higher confidence if we successfully split into multiple words
    if (split.length > 1) {
      confidence += 0.2;
    }

    // Higher confidence for reduplication (clear pattern)
    if (type === "Amredita" && split[0] === split[1]) {
      confidence = 0.9;
    }

    // Higher confidence for numeral determinative (clear pattern)
    if (type === "Dvigu") {
      confidence = 0.8;
    }

    return Math.min(confidence, 1);
  }

  /**
   * Analyze multiple compounds
   */
  static analyzeBatch(compounds: string[]): SamasaResult[] {
    return compounds.map((compound) => this.analyze(compound));
  }
}
