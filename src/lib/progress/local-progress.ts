import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";

export const LOCAL_PROGRESS_KEY = "hindai.user-progress.v1";

export interface LocalProgressRecord {
  scripture_id: string;
  chapter: number;
  verse_num: number;
  completed: boolean;
  bookmarked: boolean;
  notes: string;
  last_accessed: string;
}

interface LocalProgressStore {
  records: LocalProgressRecord[];
  reviewDates: string[];
}

function emptyStore(): LocalProgressStore {
  return { records: [], reviewDates: [] };
}

function loadStore(): LocalProgressStore {
  return getLocalStorageItem<LocalProgressStore>(LOCAL_PROGRESS_KEY) ?? emptyStore();
}

function saveStore(store: LocalProgressStore): void {
  setLocalStorageItem(LOCAL_PROGRESS_KEY, store);
}

function recordKey(scriptureId: string, chapter: number, verse: number): string {
  return `${scriptureId}:${chapter}:${verse}`;
}

export function getLocalProgress(
  scriptureId: string,
  chapter: number,
  verse: number
): LocalProgressRecord | null {
  const store = loadStore();
  return (
    store.records.find(
      (record) =>
        record.scripture_id === scriptureId &&
        record.chapter === chapter &&
        record.verse_num === verse
    ) ?? null
  );
}

export function listLocalProgress(scriptureId: string, chapter: number): LocalProgressRecord[] {
  return loadStore().records.filter(
    (record) => record.scripture_id === scriptureId && record.chapter === chapter
  );
}

export function saveLocalProgress(update: {
  scripture_id: string;
  chapter: number;
  verse_num: number;
  completed?: boolean;
  bookmarked?: boolean;
  notes?: string;
}): LocalProgressRecord {
  const store = loadStore();
  const existing = store.records.find(
    (record) =>
      record.scripture_id === update.scripture_id &&
      record.chapter === update.chapter &&
      record.verse_num === update.verse_num
  );

  const next: LocalProgressRecord = {
    scripture_id: update.scripture_id,
    chapter: update.chapter,
    verse_num: update.verse_num,
    completed: update.completed ?? existing?.completed ?? false,
    bookmarked: update.bookmarked ?? existing?.bookmarked ?? false,
    notes: update.notes ?? existing?.notes ?? "",
    last_accessed: new Date().toISOString(),
  };

  const records = existing
    ? store.records.map((record) =>
        recordKey(record.scripture_id, record.chapter, record.verse_num) ===
        recordKey(next.scripture_id, next.chapter, next.verse_num)
          ? next
          : record
      )
    : [...store.records, next];

  saveStore({ ...store, records });
  return next;
}

export function recordLocalReview(quality: number): number {
  const store = loadStore();
  const today = new Date().toISOString().slice(0, 10);
  const reviewDates = store.reviewDates.includes(today)
    ? store.reviewDates
    : [...store.reviewDates, today].sort();

  saveStore({ ...store, reviewDates });
  return quality >= 3 ? getLocalStreak(reviewDates) : 0;
}

function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getLocalStreak(reviewDates = loadStore().reviewDates): number {
  if (!reviewDates.length) {
    return 0;
  }

  const dates = [...reviewDates].sort().reverse();
  const cursor = new Date(`${dates[0]}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newest = new Date(`${dates[0]}T00:00:00`);
  const dayMs = 86_400_000;
  if (today.getTime() - newest.getTime() > dayMs) {
    return 0;
  }

  let streak = 0;
  for (const value of dates) {
    const expected = toLocalDateKey(cursor);
    if (value !== expected) {
      break;
    }
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
