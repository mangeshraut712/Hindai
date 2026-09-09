import { CHAPTER_IDS, HARIVIJAY_CHAPTERS, type ChapterId, type HarivijayChapter } from "./catalog";

export type LeafKind = "cover" | "contents" | "adhyay";

export type HarivijayLeaf =
  | { kind: "cover"; page: 1 }
  | { kind: "contents"; page: 2 }
  | { kind: "adhyay"; page: number; chapter: HarivijayChapter };

const COVER_PAGE = 1;
const CONTENTS_PAGE = 2;
const FIRST_ADHYAY_PAGE = 3;

export function toDevanagariNumeral(n: number): string {
  return String(n).replace(/\d/g, (d) => "०१२३४५६७८९"[Number(d)] ?? d);
}

export function folioCount(): number {
  return 2 + CHAPTER_IDS.length;
}

export function bookPath(page: number): string {
  return `/harivijay/book?p=${page}`;
}

export function firstPageForChapter(id: ChapterId): number {
  return FIRST_ADHYAY_PAGE + (id - 1);
}

export function parseBookPage(raw: string | undefined): number {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1) return COVER_PAGE;
  return Math.min(Math.floor(n), folioCount());
}

export function getLeaf(page: number): HarivijayLeaf {
  const p = parseBookPage(String(page));
  if (p === COVER_PAGE) return { kind: "cover", page: COVER_PAGE };
  if (p === CONTENTS_PAGE) return { kind: "contents", page: CONTENTS_PAGE };
  const chapter = HARIVIJAY_CHAPTERS[p - FIRST_ADHYAY_PAGE];
  if (!chapter) {
    return { kind: "cover", page: COVER_PAGE };
  }
  return { kind: "adhyay", page: p, chapter };
}

export function nextPage(page: number): number | null {
  const p = parseBookPage(String(page));
  return p < folioCount() ? p + 1 : null;
}

export function prevPage(page: number): number | null {
  const p = parseBookPage(String(page));
  return p > COVER_PAGE ? p - 1 : null;
}

export function leafLabel(leaf: HarivijayLeaf): string {
  switch (leaf.kind) {
    case "cover":
      return "Cover";
    case "contents":
      return "अनुक्रमणिका";
    case "adhyay":
      return `अध्याय ${toDevanagariNumeral(leaf.chapter.id)}`;
    default: {
      const _exhaustive: never = leaf;
      return _exhaustive;
    }
  }
}
