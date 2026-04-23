import { describe, it, expect } from "vitest";
import { cn, formatDate, slugify } from "@/lib/utils";

describe("cn utility", () => {
  it("should merge class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("should handle conditional classes", () => {
    expect(cn("base", false && "conditional", true && "active")).toBe("base active");
  });

  it("should merge tailwind classes correctly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});

describe("formatDate", () => {
  it("should format date correctly", () => {
    const date = new Date("2024-01-15");
    const formatted = formatDate(date);
    expect(formatted).toContain("January");
    expect(formatted).toContain("2024");
  });

  it("should handle different dates", () => {
    const date = new Date("2024-12-25");
    const formatted = formatDate(date);
    expect(formatted).toContain("December");
  });
});

describe("slugify", () => {
  it("should convert text to slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("should handle special characters", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("should handle multiple spaces", () => {
    expect(slugify("Hello   World")).toBe("hello-world");
  });

  it("should handle empty string", () => {
    expect(slugify("")).toBe("");
  });
});
