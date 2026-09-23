"use client";

import { useState } from "react";
import { GANESHAI_TRACKS } from "@/lib/data/ganeshotsav-guide";

export function FestivalRadio() {
  const [playing, setPlaying] = useState<string | null>(null);
  const current = GANESHAI_TRACKS.find((track) => track.youtubeId === playing);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="overflow-hidden rounded-3xl border border-amber-200/25 bg-black/40 p-3">
        {current ? (
          <iframe
            key={current.youtubeId}
            title={`${current.title} on YouTube`}
            src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full rounded-2xl"
          />
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-amber-700 via-red-800 to-stone-950 px-8 text-center">
            <span className="font-devanagari text-5xl text-amber-100">गणपती बाप्पा मोरया</span>
            <p className="mt-5 text-sm text-amber-100/80">
              Choose a song to begin the festival radio.
            </p>
          </div>
        )}
        <p className="px-2 pt-3 text-xs text-amber-100/70">
          YouTube playback needs an internet connection. No song audio is stored on Hind AI.
        </p>
      </div>
      <ol
        aria-label="All 30 ganeshai songs"
        className="grid max-h-[540px] list-none gap-2 overflow-y-auto p-0 pr-2 sm:grid-cols-2 lg:grid-cols-1"
      >
        {GANESHAI_TRACKS.map((track, index) => (
          <li key={track.youtubeId}>
            <button
              type="button"
              onClick={() => setPlaying(track.youtubeId)}
              aria-pressed={playing === track.youtubeId}
              className="flex w-full items-center gap-4 rounded-2xl border border-amber-200/25 bg-white/5 px-4 py-3 text-left text-amber-50 transition hover:bg-white/15 aria-pressed:border-amber-300 aria-pressed:bg-amber-300/15"
            >
              <span className="font-serif text-2xl text-amber-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <strong className="block text-sm">{track.title}</strong>
                <small className="text-amber-100/65">{track.artist}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
