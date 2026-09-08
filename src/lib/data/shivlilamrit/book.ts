import { isChapterId, type ChapterId } from "./catalog";
import { getExtra, listPothi, type PothiEntry } from "./pothi";

export const OVIS_PER_PAGE = 4;

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

export type FolioKind = "cover" | "contents" | "katha" | "ovis";

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

function oviPageCount(total: number): number {
  return total > 0 ? Math.ceil(total / OVIS_PER_PAGE) : 0;
}

let cachedSpine: Folio[] | null = null;

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
      kind: "contents",
      slug: "contents",
      titleMr: "अनुक्रमणिका",
      titleEn: "Contents",
    },
  ];

  for (const entry of listPothi()) {
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
    const leaves = oviPageCount(verses);
    for (let leaf = 0; leaf < leaves; leaf += 1) {
      const oviFrom = leaf * OVIS_PER_PAGE + 1;
      const oviTo = Math.min(verses, oviFrom + OVIS_PER_PAGE - 1);
      folios.push({
        page: folios.length + 1,
        kind: "ovis",
        slug: entry.slug,
        titleMr: entry.titleMr,
        titleEn: entry.titleEn,
        chapterId: entry.chapterId,
        special: entry.chapterId === 11,
        oviFrom,
        oviTo,
        oviTotal: verses,
      });
    }
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

export function firstPageForSlug(slug: string): number {
  const match = buildSpine().find((folio) => folio.slug === slug && folio.kind === "katha");
  return match?.page ?? 1;
}

export function contentsRows(): ContentsRow[] {
  return buildSpine()
    .filter((folio) => folio.kind === "katha" || folio.kind === "cover" || folio.kind === "contents")
    .map((folio) => ({
      page: folio.page,
      titleMr: folio.titleMr,
      titleEn: folio.titleEn,
      kind: folio.kind,
      slug: folio.slug,
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
