// Data Ingestion Pipeline for SanskritDocuments.org
// Handles downloading and parsing Sanskrit texts from sanskritdocuments.org

import { Scripture, Verse, Translation } from "@/lib/database/schema";

export interface SanskritDocument {
  id: string;
  title: string;
  title_sanskrit: string;
  category: string;
  author?: string;
  language: string;
  content: string;
  source: string;
}

export class SanskritDocumentsIngestor {
  private static BASE_URL = "https://sanskritdocuments.org";

  /**
   * Download a text from SanskritDocuments.org
   */
  static async downloadText(documentId: string): Promise<string> {
    const url = `${this.BASE_URL}/doc_${documentId}/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download document: ${documentId}`);
    }
    return response.text();
  }

  /**
   * Parse Sanskrit text into structured format
   * Expected format: Chapter lines followed by verse lines
   */
  static parseText(
    content: string,
    documentId: string
  ): {
    scripture: Partial<Scripture>;
    verses: Partial<Verse>[];
  } {
    const lines = content.split("\n").filter((line) => line.trim());
    const verses: Partial<Verse>[] = [];
    let currentChapter = 1;
    let currentVerse = 1;

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Detect chapter markers (common patterns)
      if (trimmed.match(/^(Chapter|Adhyāya|परिच्छेद)/i)) {
        currentChapter++;
        currentVerse = 1;
        return;
      }

      // Detect verse markers (common patterns)
      const verseMatch = trimmed.match(/^(\d+)\.(\d+)/);
      if (verseMatch) {
        currentChapter = parseInt(verseMatch[1]);
        currentVerse = parseInt(verseMatch[2]);
      }

      // Parse Devanagari and IAST from line
      const { devanagari, iast } = this.extractScripts(trimmed);

      if (devanagari) {
        verses.push({
          id: `${documentId}-${currentChapter}-${currentVerse}`,
          scripture_id: documentId,
          book: 1,
          chapter: currentChapter,
          verse_num: currentVerse,
          text_devanagari: devanagari,
          text_iast: iast || this.transliterateToIAST(devanagari),
          verified: false,
        });
        currentVerse++;
      }
    });

    return {
      scripture: {
        id: documentId,
        slug: documentId.toLowerCase().replace(/\s+/g, "-"),
        title_en: documentId,
        title_sa: documentId,
        category: "stotra" as const,
        total_verses: verses.length,
        language: "Sanskrit",
        tradition: "General",
        license: "CC0",
      },
      verses,
    };
  }

  /**
   * Extract Devanagari and IAST from a line
   */
  private static extractScripts(line: string): {
    devanagari: string;
    iast?: string;
  } {
    // Check if line contains Devanagari
    const devanagariMatch = line.match(/[\u0900-\u097F]+(?:[\s।॥-]+[\u0900-\u097F]+)*/);
    const devanagari = devanagariMatch ? devanagariMatch[0].trim() : "";

    // Check if line contains IAST (Latin with diacritics)
    const romanLine = devanagari ? line.replace(devanagari, " ") : line;
    const iastMatch = romanLine.match(
      /[a-zA-Zāīūṛṝḷḹṃḥśṣṅñṭḍṇ]+(?:[\s-]+[a-zA-Zāīūṛṝḷḹṃḥśṣṅñṭḍṇ]+)*/
    );
    const iast = iastMatch ? iastMatch[0].trim() : undefined;

    return { devanagari, iast };
  }

  /**
   * Simple transliteration from Devanagari to IAST
   * This is a basic implementation - use indic-transliteration for production
   */
  private static transliterateToIAST(devanagari: string): string {
    const vowels: Record<string, string> = {
      अ: "a",
      आ: "ā",
      इ: "i",
      ई: "ī",
      उ: "u",
      ऊ: "ū",
      ऋ: "ṛ",
      ॠ: "ṝ",
      ऌ: "ḷ",
      ॡ: "ḹ",
      ए: "e",
      ऐ: "ai",
      ओ: "o",
      औ: "au",
    };
    const vowelSigns: Record<string, string> = {
      "ा": "ā",
      "ि": "i",
      "ी": "ī",
      "ु": "u",
      "ू": "ū",
      "ृ": "ṛ",
      "ॄ": "ṝ",
      "ॢ": "ḷ",
      "ॣ": "ḹ",
      "े": "e",
      "ै": "ai",
      "ो": "o",
      "ौ": "au",
    };
    const consonants: Record<string, string> = {
      क: "k",
      ख: "kh",
      ग: "g",
      घ: "gh",
      ङ: "ṅ",
      च: "c",
      छ: "ch",
      ज: "j",
      झ: "jh",
      ञ: "ñ",
      ट: "ṭ",
      ठ: "ṭh",
      ड: "ḍ",
      ढ: "ḍh",
      ण: "ṇ",
      त: "t",
      थ: "th",
      द: "d",
      ध: "dh",
      न: "n",
      प: "p",
      फ: "ph",
      ब: "b",
      भ: "bh",
      म: "m",
      य: "y",
      र: "r",
      ल: "l",
      व: "v",
      श: "ś",
      ष: "ṣ",
      स: "s",
      ह: "h",
    };
    const marks: Record<string, string> = {
      "ं": "ṃ",
      "ः": "ḥ",
      "ँ": "m̐",
      "।": ".",
      "॥": "||",
    };

    let result = "";
    const chars = [...devanagari];

    for (let index = 0; index < chars.length; index++) {
      const char = chars[index];
      const next = chars[index + 1];

      if (vowels[char]) {
        result += vowels[char];
        continue;
      }

      if (consonants[char]) {
        result += consonants[char];
        if (!vowelSigns[next] && next !== "्") {
          result += "a";
        }
        continue;
      }

      if (vowelSigns[char]) {
        result += vowelSigns[char];
        continue;
      }

      if (char === "्") {
        continue;
      }

      result += marks[char] || char;
    }
    return result;
  }

  /**
   * Batch ingest multiple documents
   */
  static async batchIngest(documentIds: string[]): Promise<{
    scriptures: Partial<Scripture>[];
    verses: Partial<Verse>[];
  }> {
    const scriptures: Partial<Scripture>[] = [];
    const verses: Partial<Verse>[] = [];

    for (const docId of documentIds) {
      try {
        const content = await this.downloadText(docId);
        const parsed = this.parseText(content, docId);
        scriptures.push(parsed.scripture);
        verses.push(...parsed.verses);
      } catch (error) {
        console.error(`Failed to ingest document ${docId}:`, error);
      }
    }

    return { scriptures, verses };
  }

  /**
   * Get list of available documents from SanskritDocuments.org
   * This would need to be implemented based on their actual API/structure
   */
  static async getAvailableDocuments(): Promise<SanskritDocument[]> {
    // This is a placeholder - actual implementation would scrape or use their API
    return [
      {
        id: "gita",
        title: "Bhagavad Gita",
        title_sanskrit: "भगवद्गीता",
        category: "itihasa",
        author: "Vyasa",
        language: "Sanskrit",
        content: "",
        source: "sanskritdocuments.org",
      },
      {
        id: "yoga-sutras",
        title: "Yoga Sutras",
        title_sanskrit: "योगसूत्र",
        category: "darshana",
        author: "Patanjali",
        language: "Sanskrit",
        content: "",
        source: "sanskritdocuments.org",
      },
    ];
  }
}
