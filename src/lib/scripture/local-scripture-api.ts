import { getVerse, getVersesByScripture } from "@/lib/data/scriptures";
import { toVerseWithLayers } from "@/lib/scripture/verse-adapter";
import type { VerseWithLayers } from "@/lib/database/schema";

export function listLocalVerses(scriptureId: string, chapter?: number): VerseWithLayers[] {
  const verses = getVersesByScripture(scriptureId).filter((verse) =>
    chapter ? verse.chapter === chapter : true
  );
  return verses.map(toVerseWithLayers);
}

export function getLocalVerse(
  scriptureId: string,
  chapter: number,
  verse: number
): VerseWithLayers | null {
  const match = getVerse(scriptureId, chapter, verse);
  return match ? toVerseWithLayers(match) : null;
}

export function getLocalChapterSummary(scriptureId: string, chapter: number): string | null {
  const verses = listLocalVerses(scriptureId, chapter);
  if (!verses.length) {
    return null;
  }

  const firstNote = verses.find((verse) => verse.commentaries?.[0]?.text_en)?.commentaries?.[0]
    ?.text_en;
  if (firstNote) {
    return firstNote;
  }

  const firstTranslation = verses[0]?.translations?.[0]?.text;
  if (!firstTranslation) {
    return null;
  }

  return `Local-index chapter ${chapter} opens with: ${firstTranslation}`;
}
