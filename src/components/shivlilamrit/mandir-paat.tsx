"use client";

import type { ReactNode } from "react";

export function ringGhanta() {
  const AudioCtx =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) {
    return;
  }
  const ctx = new AudioCtx();
  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.16, now);
  master.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
  master.connect(ctx.destination);

  const partials = [523.25, 784.0, 1046.5];
  for (const freq of partials) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(freq === 784 ? 0.9 : 0.35, now);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 2.2);
  }
}

export function MandirDiya({ className = "" }: { className?: string }) {
  return (
    <div className={`pothi-diya ${className}`} aria-hidden="true">
      <span className="pothi-diya-flame" />
      <span className="pothi-diya-bowl" />
    </div>
  );
}

export function MandirPaat({ children }: { children: ReactNode }) {
  return (
    <div className="pothi-garbha relative min-h-[100dvh] overflow-hidden">
      <div className="pothi-rangoli pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-amber-200/15 to-transparent" />
      <div className="relative z-10 mx-auto flex max-w-5xl items-end justify-between px-6 pt-4">
        <MandirDiya />
        <MandirDiya />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-3 pb-16 sm:px-6">
        <div className="pothi-paat">{children}</div>
      </div>
    </div>
  );
}
