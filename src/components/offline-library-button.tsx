"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Progress = {
  saved: number;
  failed: number;
  total: number;
  done: boolean;
  storageFull?: boolean;
  error?: string;
};

export function OfflineLibraryButton() {
  const [supported, setSupported] = useState(false);
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    setSupported("serviceWorker" in navigator && process.env.NODE_ENV === "production");
    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === "OFFLINE_LIBRARY_PROGRESS") {
        setProgress(event.data as Progress);
      }
    };
    navigator.serviceWorker?.addEventListener("message", onMessage);
    return () => navigator.serviceWorker?.removeEventListener("message", onMessage);
  }, []);

  const save = async () => {
    try {
      setProgress({ saved: 0, failed: 0, total: 0, done: false });
      const registration = await navigator.serviceWorker.ready;
      if (!registration.active) throw new Error("The offline reader is not ready yet.");
      registration.active.postMessage({ type: "SAVE_OFFLINE_LIBRARY" });
    } catch (error) {
      setProgress({ saved: 0, failed: 0, total: 0, done: true, error: String(error) });
    }
  };

  const label = progress?.error
    ? progress.error
    : progress?.done && progress.failed === 0
      ? "All exported site files are saved. External videos and AI still need internet."
      : progress?.done
        ? progress.storageFull
          ? "Device storage filled before the library finished."
          : "Some files could not be saved. Try again with a stable connection."
        : progress
          ? progress.total > 0
            ? "Saving " + progress.saved + " of " + progress.total + " files…"
            : "Preparing the library…"
          : "Download all exported pages, books, images and app files. External videos and AI require internet. This uses device storage.";

  return (
    <div className="mt-5 rounded-2xl border border-border/60 bg-background/75 p-4">
      <Button type="button" onClick={save} disabled={!supported || (!!progress && !progress.done)}>
        {progress?.done ? "Save again" : "Save full library offline"}
      </Button>
      <p role="status" className="mt-3 text-sm leading-6 text-muted-foreground">
        {supported ? label : "Offline download is available on the published site."}
      </p>
      {progress && progress.total > 0 ? (
        <progress
          aria-label="Offline library download"
          className="mt-3 w-full"
          value={progress.saved + progress.failed}
          max={progress.total}
        />
      ) : null}
    </div>
  );
}
