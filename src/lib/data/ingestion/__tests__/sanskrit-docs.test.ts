// Test file for SanskritDocuments.org data ingestion
import { describe, it, expect, beforeEach } from "vitest";
import { SanskritDocumentsIngestor } from "../sanskrit-docs";

describe("SanskritDocumentsIngestor", () => {
  describe("parseText", () => {
    it("should parse simple Sanskrit text with chapter and verse markers", () => {
      const content = `
Chapter 1
1.1 रामो राजमणि पुरुषोत्तमः
1.2 सीता पत्नी महाप्रजा
Chapter 2
2.1 धर्मो रक्षति रक्षितः
      `;

      const result = SanskritDocumentsIngestor.parseText(content, "test-ramayana");

      expect(result.scripture.id).toBe("test-ramayana");
      expect(result.verses.length).toBeGreaterThan(0);
      expect(result.verses[0].chapter).toBe(1);
      expect(result.verses[0].verse_num).toBe(1);
    });

    it("should extract Devanagari and IAST from lines", () => {
      const { devanagari, iast } = SanskritDocumentsIngestor["extractScripts"](
        "रामो राजमणि rāmo rājamaṇi"
      );

      expect(devanagari).toBe("रामो राजमणि");
      expect(iast).toBe("rāmo rājamaṇi");
    });

    it("should transliterate Devanagari to IAST", () => {
      const iast = SanskritDocumentsIngestor["transliterateToIAST"]("राम");
      expect(iast).toContain("r");
      expect(iast).toContain("ā");
      expect(iast).toContain("m");
    });
  });

  describe("getAvailableDocuments", () => {
    it("should return list of available documents", async () => {
      const docs = await SanskritDocumentsIngestor.getAvailableDocuments();
      expect(Array.isArray(docs)).toBe(true);
      expect(docs.length).toBeGreaterThan(0);
    });
  });
});
