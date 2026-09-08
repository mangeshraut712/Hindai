import {
  API_BASE,
  HAS_SERVER_API,
  SERVER_API_UNAVAILABLE_MESSAGE,
} from "@/lib/runtime/capabilities";
import { BASE_PATH } from "@/lib/site";

export function appUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (API_BASE && normalized.startsWith("/api/")) {
    return `${API_BASE}${normalized}`;
  }
  return `${BASE_PATH}${normalized}`;
}

export function assertServerApiAvailable(feature = "This feature"): void {
  if (!HAS_SERVER_API) {
    throw new Error(
      `${feature} is unavailable on the static host. ${SERVER_API_UNAVAILABLE_MESSAGE}`
    );
  }
}

export function appFetch(path: string, init?: RequestInit): Promise<Response> {
  assertServerApiAvailable();
  return fetch(appUrl(path), init);
}
