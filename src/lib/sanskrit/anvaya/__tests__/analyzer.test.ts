// Test file for Anvaya analyzer
import { describe, it, expect } from "vitest";
import { AnvayaAnalyzer } from "../analyzer";

describe("AnvayaAnalyzer", () => {
  describe("analyze", () => {
    it("should return AnvayaResult object", () => {
      const result = AnvayaAnalyzer.analyze("रामो गच्छति");
      expect(result).toHaveProperty("original");
      expect(result).toHaveProperty("anvaya");
      expect(result).toHaveProperty("wordOrder");
      expect(result).toHaveProperty("explanation");
      expect(result).toHaveProperty("confidence");
    });

    it("should split text into words", () => {
      const result = AnvayaAnalyzer.analyze("रामो गच्छति");
      expect(result.wordOrder.length).toBeGreaterThan(0);
    });

    it("should assign grammatical roles to words", () => {
      const result = AnvayaAnalyzer.analyze("रामो गच्छति");
      result.wordOrder.forEach((word) => {
        expect(word).toHaveProperty("word");
        expect(word).toHaveProperty("position");
        expect(word).toHaveProperty("grammaticalRole");
        expect(word).toHaveProperty("meaning");
      });
    });

    it("should generate explanation", () => {
      const result = AnvayaAnalyzer.analyze("रामो गच्छति");
      expect(result.explanation).toBeDefined();
      expect(typeof result.explanation).toBe("string");
    });
  });
});
