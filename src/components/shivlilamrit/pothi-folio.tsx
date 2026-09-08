"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bell, ChevronLeft, ChevronRight, Pause, Play, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MandirDiya, ringGhanta } from "@/components/shivlilamrit/mandir-paat";
import { ShivaLingam } from "@/components/shivlilamrit/shiva-lingam";
import {
  type ReaderLocale,
  type ReaderTheme,
  readerLocaleLabel,
  readerThemeLabel,
} from "@/lib/data/shivlilamrit/catalog";
import {
  bookPath,
  contentsRows,
  folioCount,
  getFolio,
  parseBookPage,
  toDevanagariNumeral,
  type Folio,
} from "@/lib/data/shivlilamrit/book";
import { kathaParagraphs, oviDisplay } from "@/lib/data/shivlilamrit/locales";
import { kathaForFolio, loadFolioVerses } from "@/lib/data/shivlilamrit/folio-content";
import { browserSpeechLang, prepareRecitation } from "@/lib/data/shivlilamrit/recitation";
import { appUrl } from "@/lib/runtime/app-fetch";
import { BASE_PATH } from "@/lib/site";

const FONT_STEPS = [18, 20, 22, 24, 28] as const;
const THEMES: ReaderTheme[] = ["mandir", "paper", "sepia", "night"];
const LOCALES: ReaderLocale[] = ["mr", "hi", "en", "roman"];
const STORAGE_KEY = "hindai:shivlilamrit-folio";

function isTheme(value: string): value is ReaderTheme {
  return THEMES.includes(value as ReaderTheme);
}

function isLocale(value: string): value is ReaderLocale {
  return LOCALES.includes(value as ReaderLocale);
}

function pickVoice(locale: ReaderLocale): SpeechSynthesisVoice | undefined {
  const wanted = browserSpeechLang(locale);
  const voices = window.speechSynthesis.getVoices();
  const prefix = wanted.slice(0, 2);
  return (
    voices.find((voice) => voice.lang === wanted) ??
    voices.find((voice) => voice.lang.startsWith(prefix) && voice.lang.includes("IN")) ??
    voices.find((voice) => voice.lang.startsWith(prefix))
  );
}

export function PothiFolio({ initialPage }: { initialPage: number }) {
  const total = folioCount();
  const [page, setPage] = useState(initialPage);
  const folio = getFolio(page) ?? getFolio(1)!;
  const [theme, setTheme] = useState<ReaderTheme>("mandir");
  const [locale, setLocale] = useState<ReaderLocale>("mr");
  const [font, setFont] = useState<(typeof FONT_STEPS)[number]>(22);
  const [settings, setSettings] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [throughBook, setThroughBook] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [engine, setEngine] = useState<"sarvam-bulbul-v3" | "browser">("browser");
  const [verses, setVerses] = useState<string[]>([]);
  const continueRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("p");
    if (raw) {
      setPage(parseBookPage(raw));
    }
  }, []);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    try {
      const saved = JSON.parse(raw) as { theme?: string; locale?: string; font?: number };
      if (saved.theme && isTheme(saved.theme)) {
        setTheme(saved.theme);
      }
      if (saved.locale && isLocale(saved.locale)) {
        setLocale(saved.locale);
      }
      if (FONT_STEPS.includes(saved.font as (typeof FONT_STEPS)[number])) {
        setFont(saved.font as (typeof FONT_STEPS)[number]);
      }
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, locale, font, page }));
  }, [theme, locale, font, page]);

  useEffect(() => {
    let cancelled = false;
    void loadFolioVerses(folio).then((loaded) => {
      if (!cancelled) {
        setVerses(loaded);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [folio]);

  const go = useCallback(
    (next: number) => {
      const safe = Math.min(Math.max(1, next), total);
      setPage(safe);
      window.history.replaceState(null, "", `${BASE_PATH}${bookPath(safe)}`);
    },
    [total]
  );

  const pageOvis = useMemo(() => {
    if (folio.kind !== "ovis" || !folio.oviFrom || !folio.oviTo) {
      return [];
    }
    return verses.slice(folio.oviFrom - 1, folio.oviTo).map((text, index) => ({
      n: (folio.oviFrom ?? 1) + index,
      text,
    }));
  }, [folio, verses]);

  const kathaLines = useMemo(() => {
    if (folio.kind !== "katha") {
      return [];
    }
    return kathaParagraphs(kathaForFolio(folio), locale, folio.chapterId, folio.slug);
  }, [folio, locale]);

  const speakLines = useMemo(() => {
    if (folio.kind === "cover") {
      return ["श्री शिवलीलामृत कथासार। ॐ नमः शिवाय।"];
    }
    if (folio.kind === "contents") {
      return ["अनुक्रमणिका। " + contentsRows().map((row) => row.titleMr).join("। ")];
    }
    if (folio.kind === "katha") {
      return kathaLines;
    }
    return pageOvis.map((ovi) => oviDisplay(ovi.text, locale));
  }, [folio.kind, kathaLines, locale, pageOvis]);

  const stopSpeech = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setPlaying(false);
    setActiveLine(null);
  }, []);

  useEffect(() => {
    stopSpeech();
  }, [page, locale, stopSpeech]);

  const speakBrowser = useCallback(
    (lines: string[]) => {
      const voice = pickVoice(locale);
      lines.forEach((line, index) => {
        const utterance = new SpeechSynthesisUtterance(prepareRecitation(line, locale));
        utterance.lang = browserSpeechLang(locale);
        utterance.rate = 0.78;
        if (voice) {
          utterance.voice = voice;
        }
        utterance.onstart = () => setActiveLine(index);
        utterance.onend = () => {
          if (index === lines.length - 1) {
            setPlaying(false);
            setActiveLine(null);
            if (throughBook && page < total) {
              continueRef.current = true;
              go(page + 1);
            }
          }
        };
        window.speechSynthesis.speak(utterance);
      });
      setEngine("browser");
      setPlaying(true);
    },
    [go, locale, page, throughBook, total]
  );

  const speak = async () => {
    if (playing) {
      stopSpeech();
      return;
    }
    const joined = speakLines.map((line) => prepareRecitation(line, locale)).join("। ");
    try {
      const response = await fetch(appUrl("/api/pothi/speak"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: joined, locale }),
      });
      const payload = (await response.json()) as {
        base64?: string;
        mime?: string;
        engine?: string;
        fallback?: boolean;
      };
      if (payload.base64 && payload.mime) {
        const bytes = Uint8Array.from(atob(payload.base64), (char) => char.charCodeAt(0));
        const blob = new Blob([bytes], { type: payload.mime });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => {
          setPlaying(false);
          if (throughBook && page < total) {
            continueRef.current = true;
            go(page + 1);
          }
        };
        await audio.play();
        setEngine("sarvam-bulbul-v3");
        setPlaying(true);
        return;
      }
    } catch {
      // Browser recitation below.
    }
    if ("speechSynthesis" in window) {
      speakBrowser(speakLines);
    }
  };

  useEffect(() => {
    if (!continueRef.current) {
      return;
    }
    continueRef.current = false;
    void speak();
  }, [page]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        go(page + 1);
      } else if (event.key === "ArrowLeft") {
        go(page - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, page]);

  const mandir = theme === "mandir";
  const heading = locale === "en" || locale === "roman" ? folio.titleEn : folio.titleMr;
  const leafClass = mandir
    ? "pothi-leaf"
    : theme === "night"
      ? "pothi-leaf-night rounded-[1.4rem]"
      : "rounded-[1.4rem] bg-[#fffaf0] text-[#3a2412]";

  return (
    <div
      className={
        mandir
          ? "pothi-garbha relative min-h-[100dvh] overflow-hidden"
          : `min-h-[100dvh] ${theme === "night" ? "bg-[#12110f] text-[#e8e0d0]" : "bg-[#e8d5b5] text-[#3f2a14]"}`
      }
    >
      {mandir ? <div className="pothi-rangoli pointer-events-none absolute inset-0" /> : null}
      {mandir ? (
        <div className="relative z-10 mx-auto flex max-w-4xl items-end justify-between px-4 pt-5 sm:px-8">
          <MandirDiya />
          <MandirDiya />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-3xl px-3 pb-8 sm:px-6">
        <div className={mandir ? "pothi-paat" : undefined}>
          <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-3 text-xs sm:px-4 sm:text-sm">
            <Link href="/shivlilamrit" className="inline-flex min-h-11 items-center opacity-80">
              Close
            </Link>
            <p className="min-w-0 text-center font-devanagari leading-snug">{heading}</p>
            <Button size="sm" variant="outline" onClick={() => setSettings((open) => !open)}>
              <Settings2 className="size-4" />
              Type
            </Button>
          </header>

          {settings ? (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {THEMES.map((item) => (
                <Button key={item} size="sm" variant={theme === item ? "default" : "outline"} onClick={() => setTheme(item)}>
                  {readerThemeLabel(item)}
                </Button>
              ))}
              {LOCALES.map((item) => (
                <Button key={item} size="sm" variant={locale === item ? "default" : "outline"} onClick={() => setLocale(item)}>
                  {readerLocaleLabel(item)}
                </Button>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setFont(FONT_STEPS[Math.max(0, FONT_STEPS.indexOf(font) - 1)] ?? 18)}
              >
                A−
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setFont(FONT_STEPS[Math.min(FONT_STEPS.length - 1, FONT_STEPS.indexOf(font) + 1)] ?? 28)
                }
              >
                A+
              </Button>
            </div>
          ) : null}

          <article
            className={`${leafClass} min-h-[70dvh] px-4 py-8 sm:px-10`}
            style={{ fontSize: `${font}px`, lineHeight: 1.9 }}
          >
            {folio.kind === "cover" ? (
              <div className="flex min-h-[60dvh] flex-col items-center justify-center text-center">
                <ShivaLingam className="h-40 w-40 text-primary" />
                <h1 className="mt-6 px-1 font-devanagari text-2xl sm:text-4xl">सचित्र श्रीशिवलीलामृत</h1>
                <p className="mt-3 font-serif text-lg">A living pothi · १५ adhyays</p>
                <p className="mt-8 text-sm opacity-70">Turn the page for the contents, then the grantha in print order.</p>
              </div>
            ) : null}

            {folio.kind === "contents" ? (
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl">अनुक्रमणिका</h1>
                <p className="mt-2 text-sm opacity-70">Contents of this pothi, with folio numbers. This is a leaf, not a sidebar.</p>
                <ol className="mt-6 list-none space-y-2 p-0 text-[0.72em] leading-7">
                  {contentsRows().map((row) => (
                    <li key={`${row.slug}-${row.page}`}>
                      <button
                        type="button"
                        className="flex w-full items-baseline gap-2 text-left"
                        onClick={() => go(row.page)}
                      >
                        <span className="font-devanagari">{row.titleMr}</span>
                        <span className="min-w-0 flex-1 border-b border-dotted border-current/30" />
                        <span className="font-devanagari">{toDevanagariNumeral(row.page)}</span>
                        <span className="opacity-60">/{row.page}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {folio.kind === "katha" ? (
              <div className="space-y-5 font-devanagari">
                {folio.special ? (
                  <p className="text-center text-xs font-semibold uppercase tracking-[0.18em]">Rudra adhyay</p>
                ) : null}
                <h1 className="font-serif text-2xl sm:text-3xl">{heading}</h1>
                {kathaLines.map((para, index) => (
                  <p key={`k-${index}`} className={activeLine === index ? "pothi-ovi-active" : undefined}>
                    {para}
                  </p>
                ))}
              </div>
            ) : null}

            {folio.kind === "ovis" ? (
              <ol className="list-none space-y-7 p-0 font-devanagari">
                {pageOvis.map((ovi, index) => (
                  <li key={ovi.n} className={`flex min-w-0 gap-3 sm:gap-4 ${activeLine === index ? "pothi-ovi-active" : ""}`}>
                    <span className="mt-1 w-8 shrink-0 text-right text-sm opacity-50 sm:w-10">
                      {toDevanagariNumeral(ovi.n)}
                    </span>
                    <p className="min-w-0 text-pretty">
                      {oviDisplay(ovi.text, locale)} ॥{ovi.n}॥
                    </p>
                  </li>
                ))}
              </ol>
            ) : null}
          </article>

          <footer className="px-3 py-4 sm:px-4">
            <p className="text-center font-devanagari text-sm">
              पृष्ठ {toDevanagariNumeral(page)} / {toDevanagariNumeral(total)}
              <span className="mx-2 opacity-50">·</span>
              <span className="opacity-80">
                {page} / {total}
              </span>
            </p>
            {folio.kind === "ovis" && folio.oviFrom && folio.oviTo ? (
              <p className="mt-1 text-center text-xs opacity-70">
                Ovis {folio.oviFrom}–{folio.oviTo} of {folio.oviTotal}
              </p>
            ) : (
              <p className="mt-1 text-center text-xs opacity-70">
                {folio.kind === "katha" ? "Katha-sar" : folio.kind === "contents" ? "Contents leaf" : "Cover"}
              </p>
            )}
            <div className="mt-4 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <Button className="min-w-0" variant="outline" disabled={page <= 1} onClick={() => go(page - 1)}>
                  <ChevronLeft className="size-4" />
                  Previous
                </Button>
                <Button className="min-w-0" variant="outline" disabled={page >= total} onClick={() => go(page + 1)}>
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button size="sm" variant="outline" onClick={() => go(2)}>
                  Contents
                </Button>
                <Button size="sm" variant="outline" onClick={() => void speak()}>
                  {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                  {playing ? "Pause" : "Listen"}
                </Button>
                <Button size="sm" variant={throughBook ? "default" : "outline"} onClick={() => setThroughBook((value) => !value)}>
                  Through pothi
                </Button>
                <Button size="sm" variant="outline" onClick={ringGhanta} aria-label="Temple bell">
                  <Bell className="size-4" />
                </Button>
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] opacity-60">
              Speech: {engine === "sarvam-bulbul-v3" ? "Sarvam Bulbul v3 (mr/hi/en-IN)" : "browser Indian voice"} ·
              Gemma is the study model, not TTS
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
