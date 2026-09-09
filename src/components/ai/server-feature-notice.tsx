import { HAS_SERVER_API, SERVER_API_UNAVAILABLE_MESSAGE } from "@/lib/runtime/capabilities";

export function ServerFeatureNotice({ feature = "Gemma 4" }: { feature?: string }) {
  if (HAS_SERVER_API) {
    return null;
  }

  return (
    <div role="status" className="theme-callout rounded-lg px-4 py-3 text-sm">
      <p>
        <strong>{feature}</strong> is paused on this static GitHub Pages host.{" "}
        {SERVER_API_UNAVAILABLE_MESSAGE}
      </p>
    </div>
  );
}
