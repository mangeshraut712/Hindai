// Test file for Google Cloud TTS integration
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SanskritTTS } from "../tts";

// Mock fetch globally
global.fetch = vi.fn();

describe("SanskritTTS", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("generateAudio", () => {
    it("should return TTSResult object", async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ audioContent: "base64-audio-data" }),
      } as Response);

      const result = await SanskritTTS.generateAudio("राम");
      expect(result).toHaveProperty("audioUrl");
      expect(result).toHaveProperty("duration");
      expect(result).toHaveProperty("config");
    });

    it("should throw error on API failure", async () => {
      vi.mocked(fetch).mockRejectedValue(new Error("API error"));

      await expect(SanskritTTS.generateAudio("राम")).rejects.toThrow("API error");
    });
  });

  describe("generateVerseAudio", () => {
    it("should generate audio for a verse", async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ audioContent: "base64-audio-data" }),
      } as Response);

      const result = await SanskritTTS.generateVerseAudio("रामो गच्छति");
      expect(result).toHaveProperty("audioUrl");
      expect(result).toHaveProperty("duration");
    });
  });

  describe("getAvailableVoices", () => {
    it("should return list of available voices", () => {
      const voices = SanskritTTS.getAvailableVoices();
      expect(typeof voices).toBe("object");
      expect(Object.keys(voices).length).toBeGreaterThan(0);
    });
  });

  describe("getRecommendedVoice", () => {
    it("should return recommended voice", () => {
      const voice = SanskritTTS.getRecommendedVoice();
      expect(typeof voice).toBe("string");
      expect(voice.length).toBeGreaterThan(0);
    });
  });

  describe("generateSlowMode", () => {
    it("should generate audio with slow speed", async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ audioContent: "base64-audio-data" }),
      } as Response);

      const result = await SanskritTTS.generateSlowMode("राम");
      expect(result.config.speakingRate).toBe(0.5);
    });
  });

  describe("generateFastMode", () => {
    it("should generate audio with fast speed", async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ audioContent: "base64-audio-data" }),
      } as Response);

      const result = await SanskritTTS.generateFastMode("राम");
      expect(result.config.speakingRate).toBe(1.25);
    });
  });
});
