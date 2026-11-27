import type { UtsavEntry } from "@/lib/data/utsav";
import { upcomingUtsavs } from "@/lib/data/utsav";

export interface VisibleUpcomingInput {
  /** The list baked into the static HTML at build time. */
  built: UtsavEntry[];
  /** The visitor's current date, or null before the client has measured it. */
  visitorNow: Date | null;
  count: number;
}

/**
 * Decide which "coming next" list to show.
 *
 * `app/festivals/page.tsx` is `force-static` and the site is exported with
 * `output: "export"`, so anything the server renders is fixed at build time.
 * The build-time list is correct on the day of the build and then goes stale:
 * once its first festival has passed, it keeps showing a past event until the
 * next deploy. The client therefore re-derives the list from the visitor's own
 * clock after mount.
 *
 * Before the visitor date is known the build list is returned by reference, so
 * the first client render is identical to the server HTML (no hydration
 * mismatch) and no needless re-render is scheduled.
 */
export function visibleUpcoming({ built, visitorNow, count }: VisibleUpcomingInput): UtsavEntry[] {
  if (!(visitorNow instanceof Date) || Number.isNaN(visitorNow.getTime())) {
    return built;
  }
  const fresh = upcomingUtsavs(visitorNow, count);
  if (sameList(built, fresh)) return built;
  return fresh;
}

function sameList(a: UtsavEntry[], b: UtsavEntry[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((item, i) => item.slug === b[i]?.slug && item.dateISO === b[i]?.dateISO);
}

const CIVIL_FORMAT = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** Civil date for an ISO `YYYY-MM-DD` string, in the site's en-IN convention. */
export function formatCivil(iso: string): string {
  // Parse as noon so the civil date never shifts across a DST boundary.
  return CIVIL_FORMAT.format(new Date(`${iso}T12:00:00`));
}
