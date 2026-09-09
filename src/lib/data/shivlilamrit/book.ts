import { CHAPTER_IDS, getChapter, isChapterId, type ChapterId } from "./catalog";
import { getExtra, listPothi, type PothiEntry } from "./pothi";

export const PRINT_CONTENTS_PAGE = 8;
export const PRINT_ADHYAY_ONE_PAGE = 9;

export const OVI_COUNTS: Record<ChapterId, number> = {
  1: 148,
  2: 188,
  3: 193,
  4: 115,
  5: 123,
  6: 203,
  7: 213,
  8: 154,
  9: 150,
  10: 149,
  11: 182,
  12: 205,
  13: 217,
  14: 216,
  15: 324,
};

export type FolioKind = "cover" | "title" | "contents" | "katha" | "ovis";

export interface Folio {
  page: number;
  kind: FolioKind;
  slug: string;
  titleMr: string;
  titleEn: string;
  chapterId?: ChapterId;
  special?: boolean;
  oviFrom?: number;
  oviTo?: number;
  oviTotal?: number;
}

export interface ContentsRow {
  page: number;
  titleMr: string;
  titleEn: string;
  kind: FolioKind | "section";
  slug: string;
  chapterId?: ChapterId;
}

const DEVANAGARI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"] as const;

export function toDevanagariNumeral(value: number): string {
  return String(value)
    .split("")
    .map((digit) => DEVANAGARI_DIGITS[Number(digit)] ?? digit)
    .join("");
}

function verseCountFor(entry: PothiEntry): number {
  if (entry.chapterId) {
    return OVI_COUNTS[entry.chapterId];
  }
  if (entry.slug === "nitya-ovis") {
    return 42;
  }
  return getExtra(entry.slug)?.verses.length ?? 0;
}

let cachedSpine: Folio[] | null = null;

function pushEntry(folios: Folio[], entry: PothiEntry): void {
  folios.push({
    page: folios.length + 1,
    kind: "katha",
    slug: entry.slug,
    titleMr: entry.titleMr,
    titleEn: entry.titleEn,
    chapterId: entry.chapterId,
    special: entry.chapterId === 11,
  });
  const verses = verseCountFor(entry);
  if (verses > 0) {
    folios.push({
      page: folios.length + 1,
      kind: "ovis",
      slug: entry.slug,
      titleMr: entry.titleMr,
      titleEn: entry.titleEn,
      chapterId: entry.chapterId,
      special: entry.chapterId === 11,
      oviFrom: 1,
      oviTo: verses,
      oviTotal: verses,
    });
  }
}

export function buildSpine(): Folio[] {
  if (cachedSpine) {
    return cachedSpine;
  }
  const folios: Folio[] = [
    {
      page: 1,
      kind: "cover",
      slug: "cover",
      titleMr: "श्रीशिवलीलामृत",
      titleEn: "Shivlilamrit",
    },
    {
      page: 2,
      kind: "title",
      slug: "title",
      titleMr: "श्रीशिवलीलामृत कथासार",
      titleEn: "Title page",
    },
  ];

  for (const entry of listPothi().filter((item) => item.kind === "front")) {
    pushEntry(folios, entry);
  }

  while (folios.length < PRINT_CONTENTS_PAGE - 1) {
    folios.push({
      page: folios.length + 1,
      kind: "title",
      slug: "front-leaf",
      titleMr: "श्रीशिवलीलामृत कथासार",
      titleEn: "Front leaf",
    });
  }

  folios.push({
    page: PRINT_CONTENTS_PAGE,
    kind: "contents",
    slug: "contents",
    titleMr: "अनुक्रमणिका",
    titleEn: "Contents",
  });

  for (const entry of listPothi().filter((item) => item.kind !== "front")) {
    pushEntry(folios, entry);
  }

  cachedSpine = folios;
  return folios;
}

export function folioCount(): number {
  return buildSpine().length;
}

export function getFolio(page: number): Folio | undefined {
  return buildSpine()[page - 1];
}

export type PageViewMode = "one" | "two";

export function isPageViewMode(value: string): value is PageViewMode {
  return value === "one" || value === "two";
}

export function pagesForView(page: number, mode: PageViewMode): number[] {
  const safe = Math.min(Math.max(1, page), folioCount());
  switch (mode) {
    case "one":
      return [safe];
    case "two": {
      const right = safe + 1;
      return right <= folioCount() ? [safe, right] : [safe];
    }
    default: {
      const _exhaustive: never = mode;
      return _exhaustive;
    }
  }
}

export function nextViewPage(page: number, mode: PageViewMode): number {
  switch (mode) {
    case "one":
      return Math.min(page + 1, folioCount());
    case "two":
      return Math.min(page + 2, folioCount());
    default: {
      const _exhaustive: never = mode;
      return _exhaustive;
    }
  }
}

export function prevViewPage(page: number, mode: PageViewMode): number {
  switch (mode) {
    case "one":
      return Math.max(page - 1, 1);
    case "two":
      return Math.max(page - 2, 1);
    default: {
      const _exhaustive: never = mode;
      return _exhaustive;
    }
  }
}

export function storyPages(): number[] {
  const pages: number[] = [];
  for (const folio of buildSpine()) {
    if (folio.kind === "ovis") {
      continue;
    }
    pages.push(folio.page);
  }
  return pages;
}

export function nextStoryPage(page: number): number {
  const next = storyPages().find((stop) => stop > page);
  return next ?? page;
}

export function prevStoryPage(page: number): number {
  const prev = [...storyPages()].reverse().find((stop) => stop < page);
  return prev ?? 1;
}

export function storyFolio(page: number): Folio {
  const folio = getFolio(page) ?? getFolio(1)!;
  if (folio.kind !== "ovis") {
    return folio;
  }
  return getFolio(firstPageForSlug(folio.slug)) ?? folio;
}

export function firstPageForSlug(slug: string): number {
  const match = buildSpine().find((folio) => folio.slug === slug && folio.kind === "katha");
  return match?.page ?? 1;
}

export function firstOviPageForSlug(slug: string): number {
  const match = buildSpine().find((folio) => folio.slug === slug && folio.kind === "ovis");
  return match?.page ?? firstPageForSlug(slug);
}

export interface JumpTarget {
  page: number;
  label: string;
}

export function folioStatusLabel(folio: Folio): string {
  switch (folio.kind) {
    case "cover":
      return "Cover";
    case "title":
      return "Title page";
    case "contents":
      return "Contents";
    case "katha":
      return folio.chapterId
        ? `Adhyay ${folio.chapterId} · opening katha`
        : "Front or closing note";
    case "ovis":
      if (folio.oviFrom && folio.oviTo && folio.oviTotal) {
        const chapter = folio.chapterId ? `Adhyay ${folio.chapterId} · ` : "";
        return `${chapter}Ovis ${folio.oviFrom}–${folio.oviTo} of ${folio.oviTotal}`;
      }
      return "Ovis";
    default: {
      const _exhaustive: never = folio.kind;
      return _exhaustive;
    }
  }
}

export function searchJumpTargets(query: string): JumpTarget[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return [];
  }
  return contentsRows()
    .filter((row) => row.chapterId)
    .filter((row) => {
      const haystack = [
        row.titleMr,
        row.titleEn,
        row.slug,
        row.chapterId ? `adhyay ${row.chapterId}` : "",
        row.chapterId ? `अध्याय ${toDevanagariNumeral(row.chapterId)}` : "",
        row.chapterId ? String(row.chapterId) : "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    })
    .map((row) => ({
      page: row.page,
      label: row.chapterId ? `Adhyay ${row.chapterId} · ${row.titleEn}` : row.titleEn,
    }));
}

export function resolveJumpQuery(query: string): number | undefined {
  const raw = query.trim();
  if (!raw) {
    return undefined;
  }
  const named = raw.match(/^(?:adhyay|adhyaya|dhyay|अध्याय)\s*(\d{1,2})$/i);
  if (named) {
    const id = Number(named[1]);
    if (isChapterId(id)) {
      return firstPageForSlug(String(id));
    }
  }
  const leaf = raw.match(/^(?:p|page|leaf|पृष्ठ)\s*(\d+)$/i);
  if (leaf) {
    return parseBookPage(leaf[1]);
  }
  if (/^\d+$/.test(raw)) {
    const value = Number(raw);
    if (isChapterId(value)) {
      return firstPageForSlug(String(value));
    }
    return parseBookPage(raw);
  }
  return searchJumpTargets(raw)[0]?.page;
}

export function adhyayJumpOptions(): Array<{ id: ChapterId; page: number; label: string }> {
  return CHAPTER_IDS.map((id) => ({
    id,
    page: firstPageForSlug(String(id)),
    label: `${id} · ${getChapter(id).titleEn}`,
  }));
}

export function contentsRows(): ContentsRow[] {
  return buildSpine()
    .filter((folio) => folio.kind === "katha" && folio.chapterId)
    .map((folio) => ({
      page: folio.page,
      titleMr: folio.chapterId
        ? `अध्याय ${toDevanagariNumeral(folio.chapterId)} · ${folio.titleMr}`
        : folio.titleMr,
      titleEn: folio.chapterId ? `Adhyay ${folio.chapterId} · ${folio.titleEn}` : folio.titleEn,
      kind: folio.kind,
      slug: folio.slug,
      chapterId: folio.chapterId,
    }));
}

export function bookPath(page: number): string {
  const safe = Math.min(Math.max(1, page), folioCount());
  return `/shivlilamrit/book?p=${safe}`;
}

export function parseBookPage(raw: string | string[] | undefined): number {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) {
    return 1;
  }
  return Math.min(Math.max(1, parsed), folioCount());
}

export function slugFromAdhyayParam(adhyay: string): string {
  const id = Number(adhyay);
  if (isChapterId(id)) {
    return String(id);
  }
  return adhyay;
}
