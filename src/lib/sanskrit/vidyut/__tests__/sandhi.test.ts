// Test file for Vidyut sandhi integration
import { describe, it, expect, vi, beforeEach } from "vitest";
import { VidyutProcessor } from "../sandhi";

// Mock fetch globally
global.fetch = vi.fn();

describe("VidyutProcessor", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("splitSandhi", () => {
    it("should return SandhiSplit result object", async () => {
      const result = await VidyutProcessor.splitSandhi("रामो गच्छति");
      expect(result).toHaveProperty("original");
      expect(result).toHaveProperty("words");
      expect(result).toHaveProperty("confidence");
    });

    it("should handle API errors with fallback", async () => {
      vi.mocked(fetch).mockRejectedValue(new Error("API error"));
      
      const result = await VidyutProcessor.splitSandhi("रामो गच्छति");
      expect(result.words).toBeDefined();
      expect(Array.isArray(result.words)).toBe(true);
    });
  });

  describe("analyzeMorphology", () => {
    it("should return MorphologicalAnalysis result object", async () => {
      const result = await VidyutProcessor.analyzeMorphology("रामः");
      expect(result).toHaveProperty("word");
      expect(result).toHaveProperty("lemma");
    });

    it("should handle API errors with fallback", async () => {
      vi.mocked(fetch).mockRejectedValue(new Error("API error"));
      
      const result = await VidyutProcessor.analyzeMorphology("रामः");
      expect(result.word).toBe("रामः");
      expect(result.lemma).toBeDefined();
    });
  });
});
