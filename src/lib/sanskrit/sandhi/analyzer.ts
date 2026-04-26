// Sandhi Analyzer - Splits Sanskrit compounds into constituent words

import { SandhiResult, SandhiRule } from "./types";
import { SANDHI_PATTERNS } from "./patterns";

export class SandhiAnalyzer {
  /**
   * Analyze a Sanskrit compound and split it into constituent words
   * This is a simplified implementation. For production use,
   * consider using a morphological analyzer or ML-based approach
   */
  static analyze(text: string): SandhiResult {
    const rules: SandhiRule[] = [];
    const split = this.splitCompound(text);
    const reconstructed = this.reconstructFromSplit(split);

    return {
      original: text,
      split,
      reconstructed,
      rules,
      confidence: this.calculateConfidence(text, split, reconstructed),
    };
  }

  /**
   * Split a compound into potential constituent words
   * Uses pattern matching and dictionary lookup simulation
   */
  private static splitCompound(text: string): string[] {
    const words: string[] = [];
    let remaining = text;

    // Try to split at common sandhi junctions
    const junctions = this.findSandhiJunctions(remaining);

    if (junctions.length > 0) {
      let lastIndex = 0;
      for (const junction of junctions) {
        if (junction > lastIndex) {
          words.push(remaining.slice(lastIndex, junction));
          lastIndex = junction;
        }
      }
      if (lastIndex < remaining.length) {
        words.push(remaining.slice(lastIndex));
      }
    } else {
      // Fallback: try to split by common word patterns
      words.push(...this.splitByPatterns(remaining));
    }

    return words.length > 0 ? words : [text];
  }

  /**
   * Find potential sandhi junctions in the text
   */
  private static findSandhiJunctions(text: string): number[] {
    const junctions: number[] = [];

    // Look for common sandhi patterns
    const patterns = [
      /([aāiīuūṛṝḷḷeaiou])([aāiīuūṛṝḷḷeaiou])/g, // vowel-vowel junctions
      /([ḥ])([aāiīuūṛṝḷḷeaiou])/g, // visarga-vowel junctions
      /([aāiīuūṛṝḷḷeaiou])([kḡg])/g, // vowel-guttural junctions
      /([aāiīuūṛṝḷḷeaiou])([cḍj])/g, // vowel-palatal junctions
      /([aāiīuūṛṝḷḷeaiou])([ṭḍḍ])/g, // vowel-cerebral junctions
      /([aāiīuūṛṝḷḷeaiou])([td])/g, // vowel-dental junctions
      /([aāiīuūṛṝḷḷeaiou])([pb])/g, // vowel-labial junctions
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        junctions.push(match.index + 1);
      }
    }

    // Remove duplicates and sort
    return [...new Set(junctions)].sort((a, b) => a - b);
  }

  /**
   * Split text by common Sanskrit word patterns
   */
  private static splitByPatterns(text: string): string[] {
    const words: string[] = [];
    const commonPrefixes = [
      "pra",
      "parā",
      "upa",
      "apa",
      "sam",
      "ni",
      "vi",
      "ā",
      "nis",
      "pari",
      "ava",
      "dur",
      "su",
    ];
    const commonSuffixes = [
      "a",
      "am",
      "āḥ",
      "eṣa",
      "i",
      "ī",
      "u",
      "ū",
      "ḥ",
      "as",
      "ām",
      "aiḥ",
      "eṣām",
      "ānām",
    ];

    // Try to identify common prefixes
    for (const prefix of commonPrefixes) {
      if (text.startsWith(prefix) && text.length > prefix.length) {
        words.push(prefix);
        text = text.slice(prefix.length);
        break;
      }
    }

    // Try to identify common suffixes
    for (const suffix of commonSuffixes) {
      if (text.endsWith(suffix) && text.length > suffix.length) {
        words.push(text.slice(0, -suffix.length));
        words.push(suffix);
        return words;
      }
    }

    // If no patterns match, return the whole text
    if (words.length === 0) {
      words.push(text);
    }

    return words;
  }

  /**
   * Reconstruct the compound from split words
   */
  private static reconstructFromSplit(words: string[]): string {
    if (words.length < 2) return words.join("");

    let reconstructed = words[0];
    for (let i = 1; i < words.length; i++) {
      reconstructed = this.applySandhi(reconstructed, words[i]);
    }
    return reconstructed;
  }

  /**
   * Apply sandhi rules between two words
   */
  private static applySandhi(word1: string, word2: string): string {
    let combined = word1 + word2;

    // Apply sandhi patterns
    for (const pattern of SANDHI_PATTERNS) {
      const matches = combined.match(pattern.pattern);
      if (matches) {
        combined = combined.replace(pattern.pattern, pattern.replacement);
      }
    }

    return combined;
  }

  /**
   * Calculate confidence score for the analysis
   */
  private static calculateConfidence(
    original: string,
    split: string[],
    reconstructed: string
  ): number {
    if (split.length === 1) return 0.3; // Low confidence if no split found

    const similarity = this.calculateSimilarity(original, reconstructed);
    const wordCount = split.length;

    // Higher confidence if reconstruction matches original
    // and reasonable number of words split
    let confidence = similarity * 0.7;

    // Penalize too many splits
    if (wordCount > 5) {
      confidence *= 0.5;
    }

    // Boost confidence for reasonable splits
    if (wordCount >= 2 && wordCount <= 4) {
      confidence *= 1.2;
    }

    return Math.min(Math.max(confidence, 0), 1);
  }

  /**
   * Calculate similarity between two strings
   */
  private static calculateSimilarity(str1: string, str2: string): number {
    if (str1 === str2) return 1;

    const len1 = str1.length;
    const len2 = str2.length;
    const maxLen = Math.max(len1, len2);

    if (maxLen === 0) return 1;

    // Simple character matching
    let matches = 0;
    const minLen = Math.min(len1, len2);
    for (let i = 0; i < minLen; i++) {
      if (str1[i] === str2[i]) matches++;
    }

    return matches / maxLen;
  }

  /**
   * Get sandhi explanation for a specific transformation
   */
  static explainSandhi(from: string, to: string): string {
    for (const pattern of SANDHI_PATTERNS) {
      const test = from.replace(pattern.pattern, pattern.replacement);
      if (test === to) {
        return `${pattern.description}: "${from}" → "${to}"`;
      }
    }
    return `Unknown sandhi transformation: "${from}" → "${to}"`;
  }

  /**
   * Analyze multiple compounds
   */
  static analyzeBatch(texts: string[]): SandhiResult[] {
    return texts.map((text) => this.analyze(text));
  }
}
