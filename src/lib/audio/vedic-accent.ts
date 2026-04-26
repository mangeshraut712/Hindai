// IIT Bombay Vedic Pitch-Accent Engine Integration
// Handles Vedic accent marks (udatta, anudatta, svarita) for Rigveda and Samaveda

export interface VedicAccent {
  syllable: string;
  accent: "udatta" | "anudatta" | "svarita";
  position: number;
}

export interface VedicAccentResult {
  text: string;
  accents: VedicAccent[];
  markedText: string; // Text with accent marks
  audioUrl?: string;
}

export class VedicAccentEngine {
  private static API_URL = "https://vedic-accent.iitb.ac.in/api";
  private static ACCENT_MARKS = {
    udatta: "´", // Rising accent
    anudatta: "`", // Falling accent
    svarita: "^", // Circumflex accent
  };

  /**
   * Analyze Vedic accents for a verse
   */
  static async analyzeAccents(
    text: string,
    veda: "rigveda" | "samaveda"
  ): Promise<VedicAccentResult> {
    try {
      const response = await fetch(`${this.API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, veda }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          text,
          accents: data.accents,
          markedText: this.applyAccentMarks(text, data.accents),
          audioUrl: data.audioUrl,
        };
      }
    } catch (error) {
      console.warn("IIT Bombay Vedic Accent API not available, using fallback");
    }

    // Fallback: Basic accent detection
    return this.fallbackAccentAnalysis(text, veda);
  }

  /**
   * Apply accent marks to text
   */
  private static applyAccentMarks(text: string, accents: VedicAccent[]): string {
    let result = text;
    const syllables = this.splitIntoSyllables(text);

    accents.forEach((accent) => {
      if (accent.position < syllables.length) {
        const mark = this.ACCENT_MARKS[accent.accent];
        // Insert accent mark after the syllable
        const before = syllables.slice(0, accent.position + 1).join("");
        const after = syllables.slice(accent.position + 1).join("");
        result = before + mark + after;
      }
    });

    return result;
  }

  /**
   * Split text into syllables (aksharas)
   */
  private static splitIntoSyllables(text: string): string[] {
    const syllables: string[] = [];
    let currentSyllable = "";

    for (const char of text) {
      // Vowel marks indicate syllable boundary
      if (/[ािीुूृॄौॐंः]/.test(char)) {
        currentSyllable += char;
        syllables.push(currentSyllable);
        currentSyllable = "";
      } else if (/[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]/.test(char)) {
        if (currentSyllable.length > 0) {
          syllables.push(currentSyllable);
        }
        currentSyllable = char;
      } else {
        currentSyllable += char;
      }
    }

    if (currentSyllable.length > 0) {
      syllables.push(currentSyllable);
    }

    return syllables;
  }

  /**
   * Fallback accent analysis (basic implementation)
   */
  private static fallbackAccentAnalysis(
    text: string,
    veda: "rigveda" | "samaveda"
  ): VedicAccentResult {
    const syllables = this.splitIntoSyllables(text);
    const accents: VedicAccent[] = [];

    // Basic rules for Vedic accent (simplified)
    // In Rigveda, typically the first syllable is udatta
    if (syllables.length > 0) {
      accents.push({
        syllable: syllables[0],
        accent: "udatta",
        position: 0,
      });
    }

    // Middle syllables are typically anudatta
    for (let i = 1; i < syllables.length - 1; i++) {
      accents.push({
        syllable: syllables[i],
        accent: "anudatta",
        position: i,
      });
    }

    // Last syllable can be svarita in certain contexts
    if (syllables.length > 1) {
      accents.push({
        syllable: syllables[syllables.length - 1],
        accent: "svarita",
        position: syllables.length - 1,
      });
    }

    return {
      text,
      accents,
      markedText: this.applyAccentMarks(text, accents),
    };
  }

  /**
   * Get audio with Vedic accents
   */
  static async getVedicAudio(
    text: string,
    veda: "rigveda" | "samaveda",
    reciter?: string
  ): Promise<string | null> {
    try {
      const params = new URLSearchParams({ text, veda });
      if (reciter) params.append("reciter", reciter);

      const response = await fetch(`${this.API_URL}/audio?${params}`);
      if (response.ok) {
        const data = await response.json();
        return data.audioUrl;
      }
    } catch (error) {
      console.error("Failed to get Vedic audio:", error);
    }

    return null;
  }

  /**
   * Get available reciters for a Veda
   */
  static async getReciters(veda: "rigveda" | "samaveda"): Promise<string[]> {
    try {
      const response = await fetch(`${this.API_URL}/reciters?veda=${veda}`);
      if (response.ok) {
        const data = await response.json();
        return data.reciters || [];
      }
    } catch (error) {
      console.error("Failed to get reciters:", error);
    }

    // Fallback reciters
    return ["South Indian", "Gujarat", "Maharashtra", "Orissa"];
  }

  /**
   * Display text with color-coded accents
   */
  static getColoredText(markedText: string): string {
    // Replace accent marks with colored spans
    return markedText
      .replace(/´/g, '<span class="text-red-600">´</span>')
      .replace(/`/g, '<span class="text-green-600">`</span>')
      .replace(/\^/g, '<span class="text-blue-600">^</span>');
  }

  /**
   * Generate audio with accent marks
   */
  static async generateAudioWithAccents(
    text: string,
    veda: "rigveda" | "samaveda"
  ): Promise<VedicAccentResult> {
    const result = await this.analyzeAccents(text, veda);

    if (!result.audioUrl) {
      const audioUrl = await this.getVedicAudio(text, veda);
      result.audioUrl = audioUrl || undefined;
    }

    return result;
  }

  /**
   * Validate if a text is Vedic (has proper accent patterns)
   */
  static isVedicText(text: string): boolean {
    // Check for common Vedic markers
    const vedicMarkers = [
      "ॐ", // Om
      "भूर्भुवः", // Bhur bhuva
      "स्वाहा", // Svaha
      "नमः", // Namah
    ];

    return vedicMarkers.some((marker) => text.includes(marker));
  }

  /**
   * Get accent explanation
   */
  static getAccentExplanation(accent: "udatta" | "anudatta" | "svarita"): string {
    const explanations = {
      udatta: "Udatta (´) - Rising accent, the primary stressed syllable",
      anudatta: "Anudatta (`) - Falling accent, unstressed syllable",
      svarita: "Svarita (^) - Circumflex accent, combination of udatta and anudatta",
    };
    return explanations[accent];
  }

  /**
   * Batch analyze multiple verses
   */
  static async batchAnalyze(
    verses: { text: string; veda: "rigveda" | "samaveda" }[]
  ): Promise<VedicAccentResult[]> {
    const results: VedicAccentResult[] = [];

    for (const verse of verses) {
      try {
        const result = await this.analyzeAccents(verse.text, verse.veda);
        results.push(result);
      } catch (error) {
        console.error(`Failed to analyze verse: ${verse.text}`);
      }
    }

    return results;
  }

  /**
   * Get accent statistics for a text
   */
  static getAccentStatistics(result: VedicAccentResult): {
    udatta: number;
    anudatta: number;
    svarita: number;
    total: number;
  } {
    const stats = {
      udatta: result.accents.filter((a) => a.accent === "udatta").length,
      anudatta: result.accents.filter((a) => a.accent === "anudatta").length,
      svarita: result.accents.filter((a) => a.accent === "svarita").length,
      total: result.accents.length,
    };
    return stats;
  }
}
