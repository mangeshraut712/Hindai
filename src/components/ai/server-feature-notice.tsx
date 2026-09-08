import { HAS_SERVER_API, SERVER_API_UNAVAILABLE_MESSAGE } from "@/lib/runtime/capabilities";

export function ServerFeatureNotice({ feature = "Gemma 4" }: { feature?: string }) {
  if (HAS_SERVER_API) {
    return null;
  }

  return (
    <div
      role="status"
      className="rounded-lg border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-400/30 dark:bg-amber-950/40 dark:text-amber-50"
    >
      <p>
        <strong>{feature}</strong> is paused on this static GitHub Pages host.{" "}
        {SERVER_API_UNAVAILABLE_MESSAGE}
      </p>
    </div>
  );
}
