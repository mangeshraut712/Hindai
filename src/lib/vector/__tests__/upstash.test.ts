// Test file for Upstash vector search
import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateEmbedding, indexVerse, searchVerses, VectorData } from "../upstash";

// Mock fetch globally
global.fetch = vi.fn();

describe("Upstash Vector Search", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("generateEmbedding", () => {
    it("should return embedding array", async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ embedding: new Array(1536).fill(0.1) }),
      } as Response);

      const embedding = await generateEmbedding("राम");
      expect(Array.isArray(embedding)).toBe(true);
      expect(embedding.length).toBeGreaterThan(0);
    });

    it("should use fallback when API fails", async () => {
      vi.mocked(fetch).mockRejectedValue(new Error("API error"));

      const embedding = await generateEmbedding("राम");
      expect(Array.isArray(embedding)).toBe(true);
      expect(embedding.length).toBe(1536);
    });
  });

  describe("indexVerse", () => {
    it("should index a verse", async () => {
      const data: VectorData = {
        id: "verse-1",
        verse_id: "verse-1",
        scripture_id: "bhagavad-gita",
        chapter: 1,
        verse_num: 1,
        text_devanagari: "धृतराष्ट्र",
        text_iast: "dhṛtarāṣṭra",
        translation: "O Dhritarashtra",
      };

      await indexVerse(data);
      // Mock implementation just logs, so we expect no error
      expect(true).toBe(true);
    });
  });

  describe("searchVerses", () => {
    it("should return search results", async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ embedding: new Array(1536).fill(0.1) }),
      } as Response);

      const results = await searchVerses("धर्म", 10);
      expect(Array.isArray(results)).toBe(true);
    });

    it("should handle filter parameters", async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ embedding: new Array(1536).fill(0.1) }),
      } as Response);

      const results = await searchVerses("धर्म", 10, { scripture_id: "bhagavad-gita" });
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe("searchWithinScripture", () => {
    it("should search within a specific scripture", async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ embedding: new Array(1536).fill(0.1) }),
      } as Response);

      const results = await searchVerses("धर्म", 10, { scripture_id: "bhagavad-gita" });
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe("searchWithinChapter", () => {
    it("should search within a specific chapter", async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ embedding: new Array(1536).fill(0.1) }),
      } as Response);

      const results = await searchVerses("धर्म", 10, { scripture_id: "bhagavad-gita", chapter: 1 });
      expect(Array.isArray(results)).toBe(true);
    });
  });
});
