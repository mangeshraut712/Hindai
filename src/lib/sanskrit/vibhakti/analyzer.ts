// Vibhakti (Case Ending) & Karaka Analyzer

import { VibhaktiResult, Vibhakti, Karaka } from "./types";
import { VIBHAKTI_PATTERNS, KARAKA_MAPPINGS, VIBHAKTI_NAMES, KARAKA_NAMES } from "./patterns";

export class VibhaktiAnalyzer {
  /**
   * Analyze a Sanskrit word to determine its vibhakti (case ending) and karaka (semantic role)
   */
  static analyze(word: string): VibhaktiResult {
    const vibhakti = this.detectVibhakti(word);
    const karaka = this.assignKaraka(vibhakti);
    const meaning = this.generateMeaning(word, vibhakti, karaka);
    const confidence = this.calculateConfidence(word, vibhakti);

    return {
      word,
      vibhakti,
      karaka,
      meaning,
      confidence,
    };
  }

  /**
   * Detect the vibhakti (case ending) of a word based on its ending
   */
  private static detectVibhakti(word: string): Vibhakti {
    const wordLower = word.toLowerCase();

    // Check for known endings
    for (const pattern of VIBHAKTI_PATTERNS) {
      if (wordLower.endsWith(pattern.ending)) {
        return pattern.vibhakti;
      }
    }

    // Fallback: try to detect based on common patterns
    if (wordLower.endsWith("ḥ") || wordLower.endsWith("āḥ")) {
      return "Prathama";
    }
    if (wordLower.endsWith("am")) {
      return "Dvitiya";
    }
    if (wordLower.endsWith("ena")) {
      return "Tritiya";
    }
    if (wordLower.endsWith("āya")) {
      return "Chaturthi";
    }
    if (wordLower.endsWith("āt")) {
      return "Panchami";
    }
    if (wordLower.endsWith("asya") || wordLower.endsWith("yāḥ") || wordLower.endsWith("ānām")) {
      return "Shashthi";
    }
    if (wordLower.endsWith("e") || wordLower.endsWith("eṣu") || wordLower.endsWith("āsu")) {
      return "Saptami";
    }

    // Default to unknown (will be treated as Prathama)
    return "Prathama";
  }

  /**
   * Assign a karaka (semantic role) based on the vibhakti
   */
  private static assignKaraka(vibhakti: Vibhakti): Karaka {
    const possibleKarakas = KARAKA_MAPPINGS[vibhakti];
    // Return the first possible karaka for the vibhakti
    return possibleKarakas[0] as Karaka;
  }

  /**
   * Generate a meaning description for the word based on its vibhakti and karaka
   */
  private static generateMeaning(word: string, vibhakti: Vibhakti, karaka: Karaka): string {
    const vibhaktiName = VIBHAKTI_NAMES[vibhakti];
    const karakaName = KARAKA_NAMES[karaka];

    return `${word} is in ${vibhaktiName} case, functioning as ${karakaName}`;
  }

  /**
   * Calculate confidence score for the analysis
   */
  private static calculateConfidence(word: string, vibhakti: Vibhakti): number {
    const wordLower = word.toLowerCase();

    // Check if ending matches known pattern
    for (const pattern of VIBHAKTI_PATTERNS) {
      if (wordLower.endsWith(pattern.ending)) {
        return 0.9; // High confidence for known patterns
      }
    }

    // Lower confidence for fallback detection
    return 0.5;
  }

  /**
   * Analyze multiple words
   */
  static analyzeBatch(words: string[]): VibhaktiResult[] {
    return words.map((word) => this.analyze(word));
  }

  /**
   * Get all possible vibhaktis for a word ending
   */
  static getPossibleVibhaktis(ending: string): Vibhakti[] {
    const matchingPatterns = VIBHAKTI_PATTERNS.filter((pattern) => pattern.ending === ending);
    return matchingPatterns.map((pattern) => pattern.vibhakti);
  }

  /**
   * Get the full case table for a gender and number
   */
  static getCaseTable(
    gender: "Masculine" | "Feminine" | "Neuter",
    number: "Singular" | "Dual" | "Plural"
  ): Record<Vibhakti, string> {
    const table: Partial<Record<Vibhakti, string>> = {};
    const patterns = VIBHAKTI_PATTERNS.filter(
      (pattern) => pattern.gender === gender && pattern.number === number
    );

    for (const pattern of patterns) {
      table[pattern.vibhakti] = pattern.ending;
    }

    return table as Record<Vibhakti, string>;
  }
}
