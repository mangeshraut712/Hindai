import { AnvayaAnalyzer } from "@/lib/sanskrit/anvaya/analyzer";
import { searchDhatuByMeaning, searchDhatuByRoot } from "@/lib/sanskrit/dhatu/dhatus";
import { SandhiAnalyzer } from "@/lib/sanskrit/sandhi/analyzer";
import { SamasaAnalyzer } from "@/lib/sanskrit/samasa/analyzer";
import { ScriptConverter } from "@/lib/sanskrit/scripts/converter";
import { transliterateToIast } from "@/lib/sanskrit/transliteration";
import { VedicAccentAnalyzer } from "@/lib/sanskrit/vedic-accents/analyzer";
import { VibhaktiAnalyzer } from "@/lib/sanskrit/vibhakti/analyzer";

export type SanskritToolId =
  | "transliterate"
  | "sandhi"
  | "vibhakti"
  | "vedic-accents"
  | "anvaya"
  | "dhatu"
  | "samasa"
  | "scripts";

export function runSanskritTool(tool: SanskritToolId, text: string): unknown {
  const input = text.trim();
  if (!input) {
    throw new Error("Text is required.");
  }

  switch (tool) {
    case "transliterate":
      return {
        source: "local-index",
        devanagari: input,
        iast: transliterateToIast(input),
      };
    case "sandhi":
      return { source: "local-index", result: SandhiAnalyzer.analyze(input) };
    case "vibhakti":
      return { source: "local-index", result: VibhaktiAnalyzer.analyze(input) };
    case "vedic-accents":
      return { source: "local-index", result: VedicAccentAnalyzer.analyze(input) };
    case "anvaya":
      return { source: "local-index", result: AnvayaAnalyzer.analyze(input) };
    case "dhatu": {
      const byRoot = searchDhatuByRoot(input);
      const dhatus = byRoot.length ? byRoot : searchDhatuByMeaning(input);
      return { source: "local-index", dhatus, total: dhatus.length };
    }
    case "samasa":
      return { source: "local-index", result: SamasaAnalyzer.analyze(input) };
    case "scripts": {
      const fromScript = ScriptConverter.detectScript(input);
      const result = ScriptConverter.convert(input, fromScript, "IAST");
      return { source: "local-index", detectedScript: fromScript, result };
    }
    default: {
      const _exhaustive: never = tool;
      throw new Error(`Unsupported Sanskrit tool: ${_exhaustive}`);
    }
  }
}
