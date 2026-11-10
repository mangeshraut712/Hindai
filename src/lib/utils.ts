import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export { slugify } from "./slugify";
export { formatDate } from "./format-date";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Local Storage Utilities
 * Provides type-safe localStorage operations with error handling
 */
export function getLocalStorageItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setLocalStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors (e.g., quota exceeded, private browsing)
  }
}

export function removeLocalStorageItem(key: string): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage errors
  }
}
