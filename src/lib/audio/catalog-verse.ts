import { getVerse } from "@/lib/data/scriptures";

/** Sanskrit for a catalog verse. Returns null when the library has no such address. */
export function catalogVerseText(
  scriptureId: string,
  chapter: number,
  verse: number
): string | null {
  const text = getVerse(scriptureId, chapter, verse)?.sanskrit.trim();
  return text ? text : null;
}
