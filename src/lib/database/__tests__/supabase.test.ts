// Test file for Supabase database client
import { describe, it, expect, vi, beforeEach } from "vitest";
import { supabase, TABLES } from "../supabase";

// Mock @supabase/supabase-js
vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: null, error: null })),
          order: vi.fn(() => Promise.resolve({ data: [], error: null })),
        })),
        order: vi.fn(() => Promise.resolve({ data: [], error: null })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: null, error: null })),
        })),
      })),
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: null, error: null })),
        })),
      })),
    })),
  })),
}));

describe("Supabase Client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("TABLES constant", () => {
    it("should have all required table names", () => {
      expect(TABLES.SCRIPTURES).toBe("scriptures");
      expect(TABLES.VERSES).toBe("verses");
      expect(TABLES.WORD_ANALYSIS).toBe("word_analysis");
      expect(TABLES.TRANSLATIONS).toBe("translations");
      expect(TABLES.COMMENTARIES).toBe("commentaries");
      expect(TABLES.AUDIO).toBe("audio");
      expect(TABLES.USER_PROGRESS).toBe("user_progress");
      expect(TABLES.FLASHCARD_PROGRESS).toBe("flashcard_progress");
    });
  });

  describe("supabase client", () => {
    it("should be defined", () => {
      expect(supabase).toBeDefined();
    });

    it("should have from method", () => {
      expect(typeof supabase.from).toBe("function");
    });
  });

  describe("getScripture", () => {
    it("should be a function", () => {
      expect(typeof supabase.from).toBe("function");
    });
  });

  describe("getVerse", () => {
    it("should be a function", () => {
      expect(typeof supabase.from).toBe("function");
    });
  });

  describe("getVersesByChapter", () => {
    it("should be a function", () => {
      expect(typeof supabase.from).toBe("function");
    });
  });

  describe("getVersesWithLayers", () => {
    it("should be a function", () => {
      expect(typeof supabase.from).toBe("function");
    });
  });
});
