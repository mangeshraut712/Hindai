// Vidyut Integration for Sandhi Splitting and Morphology
// Vidyut is a Rust library for Sanskrit linguistics
// This module provides a TypeScript interface to Vidyut functionality

export interface SandhiSplit {
  words: string[];
  original: string;
  confidence: number;
}

export interface MorphologicalAnalysis {
  word: string;
  lemma: string;
  dhatu?: string; // Verb root
  pratyaya?: string[]; // Suffixes
  karaka?: string; // Semantic role
  vibhakti?: string; // Case
  linga?: string; // Gender
  vacana?: string; // Number
  purusha?: string; // Person
  lakara?: string; // Tense
  meaning?: string;
}

export interface VidyutResult {
  text: string;
  sandhi_splits: SandhiSplit[];
  morphology: MorphologicalAnalysis[];
}

/**
 * Vidyut Sanskrit Processor
 *
 * Note: Vidyut is a Rust library. In production, this would interface with:
 * 1. A Python backend service using vidyut-py
 * 2. Or WASM bindings of the Rust library
 * 3. Or a microservice running vidyut
 *
 * For now, this provides the interface and a basic fallback implementation.
 */
export class VidyutProcessor {
  private static API_URL = process.env.VIDYUT_API_URL || "http://localhost:8080";

  /**
   * Split sandhi (compounds) into individual words
   */
  static async splitSandhi(text: string): Promise<SandhiSplit> {
    try {
      // Try to use Vidyut API if available
      const response = await fetch(`${this.API_URL}/sandhi/split`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      console.warn("Vidyut API not available, using fallback");
    }

    // Fallback: Basic sandhi splitting
    return this.fallbackSandhiSplit(text);
  }

  /**
   * Perform morphological analysis on a word
   */
  static async analyzeMorphology(word: string): Promise<MorphologicalAnalysis> {
    try {
      const response = await fetch(`${this.API_URL}/morphology/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      });

      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      console.warn("Vidyut API not available, using fallback");
    }

    // Fallback: Basic morphology
    return this.fallbackMorphology(word);
  }

  /**
   * Batch analyze a verse
   */
  static async analyzeVerse(text: string): Promise<VidyutResult> {
    const sandhiSplit = await this.splitSandhi(text);
    const morphology: MorphologicalAnalysis[] = [];

    for (const word of sandhiSplit.words) {
      const analysis = await this.analyzeMorphology(word);
      morphology.push(analysis);
    }

    return {
      text,
      sandhi_splits: [sandhiSplit],
      morphology,
    };
  }

  /**
   * Fallback sandhi splitting (basic implementation)
   * This is a simplified version - Vidyut would be much more accurate
   */
  private static fallbackSandhiSplit(text: string): SandhiSplit {
    // Common sandhi patterns to split
    const patterns = [
      { pattern: /([aāiīuūṛṝḷḹ])([aāiīuūṛṝḷḹ])/g, replacement: "$1 $2" },
      { pattern: /([kkgṅcchjñṭṭhḍḍhnpbhm])([aāiīuūṛṝḷḹ])/g, replacement: "$1 $2" },
      { pattern: /([aāiīuūṛṝḷḹ])([kkgṅcchjñṭṭhḍḍhnpbhm])/g, replacement: "$1 $2" },
    ];

    let result = text;
    for (const { pattern, replacement } of patterns) {
      result = result.replace(pattern, replacement);
    }

    const words = result.split(/\s+/).filter((w) => w.length > 0);

    return {
      words,
      original: text,
      confidence: 0.5, // Low confidence for fallback
    };
  }

  /**
   * Fallback morphology analysis (basic implementation)
   */
  private static fallbackMorphology(word: string): MorphologicalAnalysis {
    // Very basic morphology detection
    const analysis: MorphologicalAnalysis = {
      word,
      lemma: word,
    };

    // Detect common endings
    if (word.endsWith("a")) {
      analysis.linga = "masculine";
      analysis.vacana = "singular";
    } else if (word.endsWith("ā")) {
      analysis.linga = "feminine";
      analysis.vacana = "singular";
    } else if (word.endsWith("am")) {
      analysis.linga = "neuter";
      analysis.vacana = "singular";
      analysis.vibhakti = "accusative";
    } else if (word.endsWith("ena")) {
      analysis.vibhakti = "instrumental";
    } else if (word.endsWith("āya")) {
      analysis.vibhakti = "dative";
    } else if (word.endsWith("asya")) {
      analysis.vibhakti = "genitive";
    } else if (word.endsWith("ti")) {
      analysis.purusha = "third";
      analysis.lakara = "present";
    }

    return analysis;
  }

  /**
   * Check if Vidyut API is available
   */
  static async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/health`, {
        method: "GET",
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get verb root (dhatu) for a word
   */
  static async getDhatu(word: string): Promise<string | null> {
    const analysis = await this.analyzeMorphology(word);
    return analysis.dhatu || null;
  }

  /**
   * Get all possible karaka roles for a word
   */
  static async getKaraka(word: string): Promise<string[]> {
    const analysis = await this.analyzeMorphology(word);
    const karanakas: string[] = [];

    if (analysis.karaka) {
      karanakas.push(analysis.karaka);
    }

    // Infer from vibhakti
    if (analysis.vibhakti === "nominative") {
      karanakas.push("karta"); // Doer
    } else if (analysis.vibhakti === "accusative") {
      karanakas.push("karma"); // Object
    } else if (analysis.vibhakti === "instrumental") {
      karanakas.push("karana"); // Instrument
    } else if (analysis.vibhakti === "dative") {
      karanakas.push("sampradana"); // Recipient
    }

    return karanakas;
  }
}
