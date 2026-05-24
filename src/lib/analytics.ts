"use client";

export type AnalyticsEvent =
  | "sadhana_session_started"
  | "sadhana_count_incremented"
  | "sadhana_milestone_reached"
  | "sadhana_session_completed"
  | "sadhana_session_reset"
  | "sadhana_mantra_selected"
  | "sadhana_goal_changed";

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, payload?: AnalyticsPayload) => void;
  }
}

export function trackEvent(eventName: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    app_area: "sadhana",
    ...payload,
  });
}
