"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Columns2, Pause, Play, Search, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrintLeaf } from "@/components/shivlilamrit/print-leaf";
import { PrintBookShop } from "@/components/shivlilamrit/print-book-shop";
import { usePothiSpeech } from "@/components/shivlilamrit/use-pothi-speech";
import {
  type ReaderLocale,
  type ReaderTheme,
  readerLocaleLabel,
  readerThemeLabel,
} from "@/lib/data/shivlilamrit/catalog";
import {
  type PageViewMode,
  PRINT_CONTENTS_PAGE,
  adhyayJumpOptions,
  contentsRows,
  firstPageForSlug,
  folioCount,
  folioStatusLabel,
  getFolio,
  isPageViewMode,
  nextViewPage,
  pagesForView,
  parseBookPage,
  prevViewPage,
  resolveJumpQuery,
  searchJumpTargets,
  toDevanagariNumeral,
} from "@/lib/data/shivlilamrit/book";
import { kathaParagraphs, oviDisplay } from "@/lib/data/shivlilamrit/locales";
import { kathaForFolio, loadStoryVerses } from "@/lib/data/shivlilamrit/folio-content";

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

function writePageQuery(page: number): void {
  const url = new URL(window.location.href);
  url.searchParams.set("p", String(page));
  History.prototype.replaceState.call(
    window.history,
    window.history.state,
    "",
    `${url.pathname}${url.search}`
  );
}

export function PothiFolio({ initialPage }: { initialPage: number }) {
  const total = folioCount();
  const [page, setPage] = useState(initialPage);
  const [viewMode, setViewMode] = useState<PageViewMode>("one");
  const [theme, setTheme] = useState<ReaderTheme>("night");
  const [locale, setLocale] = useState<ReaderLocale>("mr");
  const [font, setFont] = useState<(typeof FONT_STEPS)[number]>(22);
  const [settings, setSettings] = useState(false);
  const [versesBySlug, setVersesBySlug] = useState<Record<string, string[]>>({});
  const [jumpQuery, setJumpQuery] = useState("");
  const pageRef = useRef(page);
  const viewModeRef = useRef(viewMode);
  pageRef.current = page;
  viewModeRef.current = viewMode;

  const visiblePages = useMemo(() => pagesForView(page, viewMode), [page, viewMode]);
  const folios = useMemo(
    () => visiblePages.map((item) => getFolio(item)).filter((item) => item !== undefined),
    [visiblePages]
  );

  useEffect(() => {
    const applyQuery = () => {
      const raw = new URLSearchParams(window.location.search).get("p");
      if (raw) {
        setPage(parseBookPage(raw));
      }
    };
    applyQuery();
    window.addEventListener("popstate", applyQuery);
    return () => window.removeEventListener("popstate", applyQuery);
  }, []);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    try {
      const saved = JSON.parse(raw) as {
        theme?: string;
        locale?: string;
        font?: number;
        viewMode?: string;
      };
      if (saved.theme && isTheme(saved.theme)) {
        setTheme(saved.theme);
      }
      if (saved.locale && isLocale(saved.locale)) {
        setLocale(saved.locale);
      }
      if (FONT_STEPS.includes(saved.font as (typeof FONT_STEPS)[number])) {
        setFont(saved.font as (typeof FONT_STEPS)[number]);
      }
      if (saved.viewMode && isPageViewMode(saved.viewMode)) {
        setViewMode(saved.viewMode);
      }
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, locale, font, viewMode }));
  }, [theme, locale, font, viewMode]);

  useEffect(() => {
    let cancelled = false;
    for (const folio of folios) {
      if (folio.kind !== "ovis") {
        continue;
      }
      void loadStoryVerses(folio).then((loaded) => {
        if (cancelled) {
          return;
        }
        setVersesBySlug((current) => ({ ...current, [folio.slug]: loaded }));
      });
    }
    return () => {
      cancelled = true;
    };
  }, [folios]);

  const speakLines = useMemo(() => {
    const lines: string[] = [];
    for (const folio of folios) {
      if (folio.kind === "cover" || folio.kind === "title") {
        lines.push("श्री शिवलीलामृत कथासार। ॐ नमः शिवाय।");
        continue;
      }
      if (folio.kind === "contents") {
        lines.push(
          "अनुक्रमणिका। " +
            contentsRows()
              .map((row) => row.titleMr)
              .join("। ")
        );
        continue;
      }
      if (folio.kind === "katha") {
        lines.push(...kathaParagraphs(kathaForFolio(folio), locale, folio.chapterId, folio.slug));
        continue;
      }
      const verses = versesBySlug[folio.slug] ?? [];
      lines.push(...verses.map((text) => oviDisplay(text, locale)));
    }
    return lines;
  }, [folios, locale, versesBySlug]);

  const { playing, activeLine, status, speak, stop } = usePothiSpeech(speakLines, locale);

  const go = useCallback(
    (next: number) => {
      stop();
      const safe = Math.min(Math.max(1, next), total);
      setPage(safe);
      writePageQuery(safe);
    },
    [stop, total]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        go(nextViewPage(pageRef.current, viewModeRef.current));
      } else if (event.key === "ArrowLeft") {
        go(prevViewPage(pageRef.current, viewModeRef.current));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const jumpHits = useMemo(() => searchJumpTargets(jumpQuery).slice(0, 6), [jumpQuery]);
  const lead = folios[0];
  if (!lead) {
    return null;
  }
  const heading = (item: (typeof folios)[number]) =>
    locale === "en" || locale === "roman" ? item.titleEn : item.titleMr;
  const chapterHint = lead.chapterId ? `अध्याय ${toDevanagariNumeral(lead.chapterId)}` : null;
  const nextPage = nextViewPage(page, viewMode);
  const prevPage = prevViewPage(page, viewMode);
  const paper =
    theme === "night"
      ? "bg-[#12110f] text-[#e8e0d0]"
      : theme === "sepia"
        ? "bg-[#ebe0c8] text-[#3a2c1c]"
        : theme === "mandir"
          ? "bg-[#1a100c] text-[#f3e6c8]"
          : "bg-[#f4f1ea] text-[#2c2118]";
  const nightLeaf = theme === "night" || theme === "mandir";

  let lineCursor = 0;
  const leafOffsets: number[] = [];
  for (const folio of folios) {
    leafOffsets.push(lineCursor);
    if (folio.kind === "cover" || folio.kind === "title" || folio.kind === "contents") {
      lineCursor += 1;
    } else if (folio.kind === "katha") {
      lineCursor += kathaParagraphs(
        kathaForFolio(folio),
        locale,
        folio.chapterId,
        folio.slug
      ).length;
    } else {
      lineCursor += versesBySlug[folio.slug]?.length ?? 0;
    }
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-background text-foreground">
      <div
        className={`mx-auto px-4 py-5 sm:px-6 ${viewMode === "two" ? "max-w-6xl" : "max-w-3xl"}`}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border/70 bg-card px-3 py-3 sm:px-4">
          <Link
            href="/shivlilamrit"
            className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground"
          >
            Close
          </Link>
          <p className="min-w-0 text-center font-devanagari text-sm leading-snug text-foreground">
            {chapterHint ? `${chapterHint} · ${heading(lead)}` : heading(lead)}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setViewMode((current) => (current === "one" ? "two" : "one"))}
              data-testid="pothi-view-mode"
            >
              <Columns2 className="size-4" />
              {viewMode === "two" ? "One page" : "Two pages"}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setSettings((open) => !open)}>
              <Settings2 className="size-4" />
              Type
            </Button>
          </div>
        </div>

        {settings ? (
          <div className="mb-4 flex flex-wrap gap-2 rounded-2xl border border-border/70 bg-card p-3">
            {THEMES.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={theme === item ? "default" : "outline"}
                onClick={() => setTheme(item)}
              >
                {readerThemeLabel(item)}
              </Button>
            ))}
            {LOCALES.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={locale === item ? "default" : "outline"}
                onClick={() => {
                  stop();
                  setLocale(item);
                }}
              >
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
                setFont(
                  FONT_STEPS[Math.min(FONT_STEPS.length - 1, FONT_STEPS.indexOf(font) + 1)] ?? 28
                )
              }
            >
              A+
            </Button>
          </div>
        ) : null}

        <form
          className="mb-4"
          onSubmit={(event) => {
            event.preventDefault();
            const next = resolveJumpQuery(jumpQuery);
            if (next) {
              go(next);
              setJumpQuery("");
            }
          }}
        >
          <label className="flex min-h-11 items-center gap-2 rounded-2xl border border-border/70 bg-card px-3 text-sm text-foreground">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              className="min-h-11 min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
              value={jumpQuery}
              onChange={(event) => setJumpQuery(event.target.value)}
              placeholder="Adhyay 4, Gokarna, or page 20"
              aria-label="Search or jump to adhyay"
              data-testid="pothi-jump"
            />
            <Button type="submit" size="sm" variant="outline">
              Go
            </Button>
          </label>
          {jumpHits.length > 0 && jumpQuery.trim() && !/^\d+$/.test(jumpQuery.trim()) ? (
            <ul className="m-0 mt-2 list-none space-y-1 rounded-2xl border border-border/70 bg-card p-2 text-sm">
              {jumpHits.map((hit) => (
                <li key={`${hit.page}-${hit.label}`}>
                  <button
                    type="button"
                    className="w-full rounded-md px-3 py-2 text-left text-foreground hover:bg-secondary"
                    onClick={() => {
                      go(hit.page);
                      setJumpQuery("");
                    }}
                  >
                    {hit.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </form>

        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-border/70 bg-card px-3 py-3">
          <label className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground">
            <span className="text-muted-foreground">Adhyay</span>
            <select
              className="min-h-11 max-w-[min(100%,20rem)] rounded-md border border-border bg-background px-3 text-sm text-foreground"
              value={lead.chapterId ?? ""}
              onChange={(event) => {
                const id = event.target.value;
                if (id) {
                  go(
                    adhyayJumpOptions().find((item) => String(item.id) === id)?.page ??
                      firstPageForSlug("1")
                  );
                }
              }}
              aria-label="Jump to adhyay"
            >
              <option value="">Front</option>
              {adhyayJumpOptions().map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <Button size="sm" variant="outline" onClick={() => go(PRINT_CONTENTS_PAGE)}>
            Contents
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => void speak()}
            data-testid="pothi-listen"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            {playing ? "Pause" : "Listen"}
          </Button>
          {status ? <p className="w-full text-xs text-muted-foreground">{status}</p> : null}
        </div>

        <div
          className={`pothi-reader-paper rounded-2xl p-3 sm:p-4 ${paper}`}
          data-theme={theme}
          data-night-leaf={nightLeaf ? "true" : "false"}
        >
          <div
            className={viewMode === "two" && folios.length > 1 ? "pdf-spread" : undefined}
            style={{ fontSize: `${font}px` }}
          >
            {folios.map((folio, index) => (
              <div className="pdf-frame" key={folio.page}>
                <PrintLeaf
                  folio={folio}
                  locale={locale}
                  heading={heading(folio)}
                  kathaLines={
                    folio.kind === "katha"
                      ? kathaParagraphs(kathaForFolio(folio), locale, folio.chapterId, folio.slug)
                      : []
                  }
                  ovis={
                    folio.kind === "ovis"
                      ? (versesBySlug[folio.slug] ?? []).map((text, oviIndex) => ({
                          n: oviIndex + 1,
                          text,
                        }))
                      : []
                  }
                  ovisLoading={folio.kind === "ovis" && !(folio.slug in versesBySlug)}
                  activeLine={activeLine}
                  lineOffset={leafOffsets[index] ?? 0}
                  onJump={go}
                  onStartAdhyay1={() => go(firstPageForSlug("1"))}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-border/70 bg-card px-3 py-4 sm:px-4">
          <p className="text-center font-devanagari text-sm text-foreground">
            पृष्ठ {toDevanagariNumeral(lead.page)}
            {folios[1] ? `–${toDevanagariNumeral(folios[1].page)}` : ""} · {folioStatusLabel(lead)}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button
              className="min-w-0"
              variant="outline"
              disabled={prevPage === page}
              onClick={() => go(prevPage)}
              data-testid="pothi-prev"
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <Button
              className="min-w-0"
              variant="outline"
              disabled={nextPage === page}
              onClick={() => go(nextPage)}
              data-testid="pothi-next"
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <PrintBookShop compact />
        </div>
      </div>
    </div>
  );
}
