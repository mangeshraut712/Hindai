/**
 * Thin festival list for Panchanga / sadhana reminders.
 * Deep encyclopedia lives in `@/lib/data/utsav` — do not duplicate civil dates here.
 * Absolute miracle claims (“grants liberation”, “infinite merit”) are refused.
 */

import { UTSAVS, type UtsavEntry, type UtsavKind, deepFestivalHref } from "@/lib/data/utsav";
import type { Festival, FestivalType } from "./types";

/** Panchanga ids that differ from deep encyclopedia slugs. */
const UTSAV_SLUG_TO_PANCHANGA_ID: Record<string, string> = {
  "rama-navami": "ram-navami",
  "sharad-navaratri": "navratri",
  vijayadashami: "dussehra",
};

function mapKind(kind: UtsavKind): FestivalType {
  switch (kind) {
    case "major":
    case "cluster":
      return "Major";
    case "vrat":
      return "Vrat";
    case "jayanti":
      return "Jayanti";
    case "sankranti":
      return "Sankranti";
    case "regional":
      return "Regional";
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

function panchangaId(entry: UtsavEntry): string {
  return UTSAV_SLUG_TO_PANCHANGA_ID[entry.slug] ?? entry.slug;
}

function fromUtsav(entry: UtsavEntry): Festival {
  const id = panchangaId(entry);
  return {
    id,
    name: entry.name,
    sanskrit: entry.sanskrit,
    date: new Date(`${entry.dateISO}T12:00:00`),
    type: mapKind(entry.kind),
    description: entry.summary,
    pujaVidhi: entry.doList.slice(0, 3).join("; "),
    significance: `${entry.tagline} Katha is tradition; temple etiquette is living custom — open the deep festival page.`,
    regional: entry.regions,
  };
}

function byDate(a: Festival, b: Festival): number {
  return a.date.getTime() - b.date.getTime();
}

/** Single source: deep utsav encyclopedia. No parallel EXTRA list. */
export const FESTIVALS: Festival[] = UTSAVS.map(fromUtsav).sort(byDate);

/** Next year's civil date per festival id, used once this year's date has passed. */
const NEXT_DATES = new Map<string, Date>(
  UTSAVS.flatMap((entry) =>
    entry.nextDateISO
      ? [[panchangaId(entry), new Date(`${entry.nextDateISO}T12:00:00`)] as const]
      : []
  )
);

export function getFestivalsForMonth(year: number, month: number): Festival[] {
  return FESTIVALS.filter((festival) => {
    const festivalDate = new Date(festival.date);
    return festivalDate.getFullYear() === year && festivalDate.getMonth() === month;
  }).sort(byDate);
}

export function getUpcomingFestivals(count: number = 5, from: Date = new Date()): Festival[] {
  const today = new Date(from);
  today.setHours(0, 0, 0, 0);
  return FESTIVALS.map((festival) => {
    const next = NEXT_DATES.get(festival.id);
    return festival.date < today && next ? { ...festival, date: next } : festival;
  })
    .filter((festival) => festival.date >= today)
    .sort(byDate)
    .slice(0, count);
}

export function getFestivalById(id: string): Festival | undefined {
  return FESTIVALS.find((festival) => festival.id === id);
}

export function festivalDeepHref(id: string): string | undefined {
  return deepFestivalHref(id);
}
