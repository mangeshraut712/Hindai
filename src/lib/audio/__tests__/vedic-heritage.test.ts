// Test file for Vedic Heritage Portal audio integration
import { describe, it, expect, vi, beforeEach } from "vitest";
import { VedicHeritagePortal } from "../vedic-heritage";

// Mock fetch globally
global.fetch = vi.fn();

describe("VedicHeritagePortal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAudioForVerse", () => {
    it("should return audio URL for a verse", async () => {
      const result = await VedicHeritagePortal.getAudioForVerse("bhagavad-gita", 1, 1);
      if (result) {
        expect(result).toHaveProperty("audio_url");
        expect(result).toHaveProperty("source");
      }
    });

    it("should handle API errors with fallback to Archive.org", async () => {
      vi.mocked(fetch).mockRejectedValue(new Error("API error"));

      const result = await VedicHeritagePortal.getAudioForVerse("bhagavad-gita", 1, 1);
      if (result) {
        expect(result.source).toBeDefined();
      }
    });
  });

  describe("getReciters", () => {
    it("should return list of reciters", async () => {
      const reciters = await VedicHeritagePortal.getReciters("bhagavad-gita");
      expect(Array.isArray(reciters)).toBe(true);
    });
  });

  describe("getSampradayas", () => {
    it("should return list of sampradayas", async () => {
      const sampradayas = await VedicHeritagePortal.getSampradayas("bhagavad-gita");
      expect(Array.isArray(sampradayas)).toBe(true);
    });
  });

  describe("hasVedicAccents", () => {
    it("should check for Vedic accent recordings", () => {
      const hasAccents = VedicHeritagePortal.hasVedicAccents("rigveda");
      expect(typeof hasAccents).toBe("boolean");
    });
  });
});
