// Test file for IIT Bombay Vedic accent engine
import { describe, it, expect, vi, beforeEach } from "vitest";
import { VedicAccentEngine } from "../vedic-accent";

// Mock fetch globally
global.fetch = vi.fn();

describe("VedicAccentEngine", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("analyzeAccents", () => {
    it("should return VedicAccentResult object", async () => {
      const result = await VedicAccentEngine.analyzeAccents("ॐ भूर्भुवः", "rigveda");
      expect(result).toHaveProperty("text");
      expect(result).toHaveProperty("accents");
      expect(result).toHaveProperty("markedText");
    });

    it("should handle API errors with fallback", async () => {
      vi.mocked(fetch).mockRejectedValue(new Error("API error"));
      
      const result = await VedicAccentEngine.analyzeAccents("ॐ भूर्भुवः", "rigveda");
      expect(result.accents).toBeDefined();
      expect(Array.isArray(result.accents)).toBe(true);
    });
  });

  describe("getVedicAudio", () => {
    it("should return audio URL or null", async () => {
      const audioUrl = await VedicAccentEngine.getVedicAudio("ॐ भूर्भुवः", "rigveda");
      expect(audioUrl === null || typeof audioUrl === "string").toBe(true);
    });
  });

  describe("getReciters", () => {
    it("should return list of reciters", async () => {
      const reciters = await VedicAccentEngine.getReciters("rigveda");
      expect(Array.isArray(reciters)).toBe(true);
    });
  });

  describe("isVedicText", () => {
    it("should identify Vedic text", () => {
      expect(VedicAccentEngine.isVedicText("ॐ भूर्भुवः स्वाहा")).toBe(true);
      expect(VedicAccentEngine.isVedicText("नमः शिवाय")).toBe(true);
      expect(VedicAccentEngine.isVedicText("hello world")).toBe(false);
    });
  });

  describe("getAccentExplanation", () => {
    it("should return explanation for accent types", () => {
      const udatta = VedicAccentEngine.getAccentExplanation("udatta");
      const anudatta = VedicAccentEngine.getAccentExplanation("anudatta");
      const svarita = VedicAccentEngine.getAccentExplanation("svarita");

      expect(udatta).toContain("Rising");
      expect(anudatta).toContain("Falling");
      expect(svarita).toContain("Circumflex");
    });
  });

  describe("getAccentStatistics", () => {
    it("should return statistics for accent analysis", () => {
      const result = {
        text: "ॐ भूर्भुवः",
        accents: [
          { syllable: "ॐ", accent: "udatta" as const, position: 0 },
          { syllable: "भू", accent: "anudatta" as const, position: 1 },
          { syllable: "र्", accent: "svarita" as const, position: 2 },
        ],
        markedText: "ॐ´ भू` र्^",
        confidence: 0.8,
      };

      const stats = VedicAccentEngine.getAccentStatistics(result);
      expect(stats).toHaveProperty("udatta");
      expect(stats).toHaveProperty("anudatta");
      expect(stats).toHaveProperty("svarita");
      expect(stats).toHaveProperty("total");
      expect(stats.total).toBe(3);
    });
  });
});
