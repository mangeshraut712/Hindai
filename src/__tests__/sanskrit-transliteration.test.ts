import { describe, expect, it } from "vitest";
import { transliterateToIast } from "@/lib/sanskrit/transliteration";

describe("transliterateToIast", () => {
  it("converts Devanagari words to IAST", () => {
    expect(transliterateToIast("रामो गच्छति")).toBe("rāmo gacchati");
  });

  it("handles virama and danda marks", () => {
    expect(transliterateToIast("योगः चित्तवृत्तिनिरोधः।")).toBe("yogaḥ cittavṛttinirodhaḥ.");
  });
});
