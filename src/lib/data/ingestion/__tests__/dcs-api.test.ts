// Test file for DCS API integration
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DCSAPI } from "../dcs-api";

// Mock fetch globally
global.fetch = vi.fn();

describe("DCSAPI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("convertToWordAnalysis", () => {
    it("should convert DCS word analysis to WordAnalysis format", () => {
      const dcsAnalysis = {
        verse_id: "test-verse-1",
        text: "रामो गच्छति",
        words: [
          {
            word: "रामः",
            lemma: "राम",
            pos: "noun",
            case: "nominative",
            number: "singular",
            gender: "masculine",
            meaning: "Rama",
          },
          {
            word: "गच्छति",
            lemma: "गम्",
            pos: "verb",
            person: "third",
            mood: "indicative",
            tense: "present",
            meaning: "goes",
          },
        ],
      };

      const result = DCSAPI.convertToWordAnalysis(dcsAnalysis, "test-verse-1");

      expect(result).toHaveLength(2);
      expect(result[0].verse_id).toBe("test-verse-1");
      expect(result[0].word_devanagari).toBe("रामः");
      expect(result[0].lemma).toBe("राम");
      expect(result[0].case).toBe("nominative");
      expect(result[0].meaning_en).toBe("Rama");
    });

    it("should build morphology string from word properties", () => {
      const word = {
        word: "रामः",
        lemma: "राम",
        pos: "noun",
        case: "nominative",
        number: "singular",
        gender: "masculine",
      };

      const morphology = DCSAPI["buildMorphologyString"](word);

      expect(morphology).toContain("noun");
      expect(morphology).toContain("nominative");
      expect(morphology).toContain("singular");
      expect(morphology).toContain("masculine");
    });
  });

  describe("batchAnalyze", () => {
    it("should handle API errors gracefully", async () => {
      vi.mocked(fetch).mockRejectedValue(new Error("API error"));

      const verses = [
        { id: "verse-1", text: "रामो गच्छति" },
        { id: "verse-2", text: "सीता आगच्छति" },
      ];

      const results = await DCSAPI.batchAnalyze(verses);

      expect(results.size).toBe(2);
      expect(results.get("verse-1")).toEqual([]);
      expect(results.get("verse-2")).toEqual([]);
    });
  });
});
