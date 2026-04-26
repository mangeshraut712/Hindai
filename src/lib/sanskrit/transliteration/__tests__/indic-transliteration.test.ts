// Test file for Indic Transliteration
import { describe, it, expect } from "vitest";
import { IndicTransliteration } from "../indic-transliteration";

describe("IndicTransliteration", () => {
  describe("convert method", () => {
    it("should return TransliterationResult object", () => {
      const result = IndicTransliteration.convert("राम", "Devanagari", "IAST");
      expect(result).toHaveProperty("original");
      expect(result).toHaveProperty("originalScript");
      expect(result).toHaveProperty("targetScript");
      expect(result).toHaveProperty("converted");
    });

    it("should return same text when source and target scripts match", () => {
      const result = IndicTransliteration.convert("राम", "Devanagari", "Devanagari");
      expect(result.converted).toBe("राम");
    });
  });

  describe("detectScript", () => {
    it("should detect Devanagari script", () => {
      const script = IndicTransliteration.detectScript("राम");
      expect(script).toBe("Devanagari");
    });

    it("should detect IAST script", () => {
      const script = IndicTransliteration.detectScript("rāma");
      expect(script).toBe("IAST");
    });

    it("should detect SLP1 script", () => {
      const script = IndicTransliteration.detectScript("rAma");
      expect(script).toBe("SLP1");
    });
  });

  describe("getSupportedScripts", () => {
    it("should return list of supported scripts", () => {
      const scripts = IndicTransliteration.getSupportedScripts();
      expect(Array.isArray(scripts)).toBe(true);
      expect(scripts.length).toBeGreaterThan(0);
      expect(scripts).toContain("Devanagari");
      expect(scripts).toContain("IAST");
      expect(scripts).toContain("SLP1");
      expect(scripts).toContain("HK");
      expect(scripts).toContain("ITRANS");
    });
  });
});
