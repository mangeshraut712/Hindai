import type { ChapterId } from "./catalog";
import { CHAPTER_IDS } from "./catalog";
import { loadChapterOvis } from "./load-ovis";

export async function oviCounts(): Promise<Record<ChapterId, number>> {
  const counts = {} as Record<ChapterId, number>;
  for (const id of CHAPTER_IDS) {
    const ovis = await loadChapterOvis(id);
    counts[id] = ovis.length;
  }
  return counts;
}
