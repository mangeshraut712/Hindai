import { describe, it, expect } from "vitest";
import {
  scriptureSections,
  scriptureCatalog,
  featuredScriptures,
  headerScriptures,
  getScriptureCatalogItem,
} from "@/lib/scripture-catalog";
import {
  MAHAPURANAS,
  UPANISHADS,
  getVerse,
  getVerseById,
  getVerseLocationKey,
  getVersesByScripture,
  sampleVerses,
  scriptures,
  verseById,
  versesByLocation,
} from "@/lib/data/scriptures";

describe("Scripture Catalog", () => {
  it("should have scripture sections", () => {
    expect(scriptureSections.length).toBeGreaterThan(0);
  });

  it("should have a catalog with items", () => {
    expect(Object.keys(scriptureCatalog).length).toBeGreaterThan(0);
  });

  it("should have featured scriptures", () => {
    expect(featuredScriptures.length).toBeGreaterThan(0);
  });

  it("should have header scriptures", () => {
    expect(headerScriptures.length).toBeGreaterThan(0);
  });

  it("should retrieve scripture by slug", () => {
    const item = getScriptureCatalogItem("bhagavad-gita");
    expect(item).toBeDefined();
    expect(item?.name).toBeDefined();
  });

  it("should return undefined for unknown slug", () => {
    const item = getScriptureCatalogItem("unknown-scripture");
    expect(item).toBeUndefined();
  });

  it("should have valid scripture items with required fields", () => {
    const item = getScriptureCatalogItem("bhagavad-gita");
    expect(item?.slug).toBeDefined();
    expect(item?.name).toBeDefined();
    expect(item?.description).toBeDefined();
  });

  it("should expose every scripture dataset entry through the route catalog", () => {
    const catalogSlugs = new Set(scriptureCatalog.map((item) => item.slug));
    const datasetSlugs = [
      ...scriptures.map((scripture) => scripture.id),
      ...UPANISHADS.map((upanishad) => upanishad.id),
      ...MAHAPURANAS.map((purana) => purana.id),
    ];

    expect(scriptureCatalog).toHaveLength(catalogSlugs.size);

    for (const slug of datasetSlugs) {
      expect(catalogSlugs.has(slug), `${slug} should be routable`).toBe(true);
      expect(getScriptureCatalogItem(slug)?.href).toBe(`/${slug}`);
    }
  });

  it("should index every verse by id, scripture, and location", () => {
    const verseIds = new Set(sampleVerses.map((verse) => verse.id));

    expect(sampleVerses.length).toBeGreaterThan(700);
    expect(verseById.size).toBe(sampleVerses.length);
    expect(verseIds.size).toBe(sampleVerses.length);

    for (const verse of sampleVerses) {
      expect(getVerseById(verse.id)).toBe(verse);
      expect(getVersesByScripture(verse.scriptureId)).toContain(verse);
      expect(versesByLocation.get(getVerseLocationKey(verse))).toContain(verse);
    }
  });

  it("should retrieve known verses before AI generation is needed", () => {
    const verse = getVerse("bhagavad-gita", 2, 47);

    expect(verse?.id).toBe("bg-2-47");
    expect(verse?.translation.en).toMatch(/action/i);
  });
});
