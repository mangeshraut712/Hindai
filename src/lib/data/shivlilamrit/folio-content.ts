import type { ChapterKatha } from "./catalog";
import { getChapter } from "./catalog";
import { loadChapterOvis } from "./load-ovis";
import { getExtra } from "./pothi";
import type { Folio } from "./book";

export async function loadFolioVerses(folio: Folio): Promise<string[]> {
  if (folio.kind !== "ovis") {
    return [];
  }
  if (folio.chapterId) {
    return loadChapterOvis(folio.chapterId);
  }
  if (folio.slug === "nitya-ovis") {
    const closing = await loadChapterOvis(15);
    return closing.slice(-42);
  }
  return getExtra(folio.slug)?.verses ?? [];
}

export function kathaForFolio(folio: Folio): ChapterKatha {
  if (folio.chapterId) {
    return getChapter(folio.chapterId).katha;
  }
  return getExtra(folio.slug)?.katha ?? { mr: [], en: [] };
}
