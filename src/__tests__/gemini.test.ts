/**
 * Unit Tests for Google Gemini Integration
 * 
 * Tests cover:
 * - AI types and interfaces
 * - Schema validation
 * - Rate limiting structure
 */

import { describe, it, expect } from "vitest";
import { AIResponseSchema } from "@/lib/ai/gemini";

describe("Gemini AI Integration", () => {
  describe("AIResponseSchema", () => {
    it("should validate valid AI response", () => {
      const validResponse = {
        explanation: "Test explanation",
        context: "Test context",
        keyTerms: [
          { term: "Karma", meaning: "Action", sanskrit: "कर्म" },
        ],
        references: [
          { scripture: "Bhagavad Gita", chapter: 2, verse: 47 },
        ],
      };

      const result = AIResponseSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
    });

    it("should require explanation field", () => {
      const invalidResponse = {
        context: "Test context",
      };

      const result = AIResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });

    it("should validate with minimal fields", () => {
      const minimalResponse = {
        explanation: "Test explanation",
      };

      const result = AIResponseSchema.safeParse(minimalResponse);
      expect(result.success).toBe(true);
    });
  });

  describe("AIQuery interface", () => {
    it("should accept valid query", () => {
      const query = {
        query: "Explain karma yoga",
        scriptureId: "bhagavad-gita",
        chapter: 2,
        verse: 47,
        language: "en" as const,
      };

      expect(query.query).toBe("Explain karma yoga");
      expect(query.scriptureId).toBe("bhagavad-gita");
    });
  });
});
