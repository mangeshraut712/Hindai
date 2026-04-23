import { describe, it, expect } from "vitest";
import {
  scriptureSections,
  scriptureCatalog,
  featuredScriptures,
  headerScriptures,
  getScriptureCatalogItem,
} from "@/lib/scripture-catalog";

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
});
