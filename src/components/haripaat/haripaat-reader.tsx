"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HARIPAAT_LEAVES, type ReaderLocale } from "@/lib/data/haripaat/catalog";
import {
  bookPath,
  firstPageForLeaf,
  folioCount,
  getPage,
  nextPage,
  parseBookPage,
  prevPage,
  toDevanagariNumeral,
} from "@/lib/data/haripaat/book";

function localeLabel(locale: ReaderLocale): string {
  switch (locale) {
    case "mr":
      return "मराठी";
    case "en":
      return "English";
    default: {
      const _exhaustive: never = locale;
      return _exhaustive;
    }
  }
}

export function HaripaatReader({ initialPage }: { initialPage: number }) {
  const router = useRouter();
  const [page, setPage] = useState(() => parseBookPage(String(initialPage)));
  const [locale, setLocale] = useState<ReaderLocale>("mr");
  const [speaking, setSpeaking] = useState(false);
  const leafPage = getPage(page);
  const total = folioCount();

  useEffect(() => {
    setPage(parseBookPage(String(initialPage)));
  }, [initialPage]);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function go(next: number) {
    const safe = parseBookPage(String(next));
    setPage(safe);
    router.replace(bookPath(safe), { scroll: false });
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }

  function listen() {
    if (!("speechSynthesis" in window) || leafPage.kind !== "leaf") return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(leafPage.leaf.katha[locale].join(" "));
    utter.lang = locale === "mr" ? "mr-IN" : "en-IN";
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/haripaat" className="text-sm font-semibold text-primary">
          ← हरिपाठ home
        </Link>
        <p className="text-xs tabular-nums text-muted-foreground">
          Leaf {page} / {total}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {(["mr", "en"] as const).map((item) => (
          <Button
            key={item}
            size="sm"
            variant={locale === item ? "default" : "outline"}
            onClick={() => setLocale(item)}
          >
            {localeLabel(item)}
          </Button>
        ))}
        {leafPage.kind === "leaf" ? (
          <Button size="sm" variant="outline" onClick={listen} data-testid="haripaat-listen">
            {speaking ? <Pause className="size-4" /> : <Play className="size-4" />}
            {speaking ? "Pause" : "Listen"}
          </Button>
        ) : null}
      </div>

      <article className="pothi-ebook-book overflow-hidden rounded-2xl border border-border/70">
        {leafPage.kind === "cover" ? (
          <div className="space-y-6 px-6 py-10 text-center sm:px-10">
            <Image
              src="/haripaat/cover.webp"
              alt="Haripaat cover — artist impression"
              width={768}
              height={1024}
              className="mx-auto h-auto w-full max-w-xs rounded-md object-contain"
              priority
            />
            <h1 className="font-serif text-3xl">॥ हरिपाठ ॥</h1>
            <p className="text-sm leading-7 text-muted-foreground">
              Original Hind AI katha-sar for daily Hari reading.
            </p>
            <Button asChild>
              <Link href={bookPath(3)}>Start leaf 1</Link>
            </Button>
          </div>
        ) : null}

        {leafPage.kind === "contents" ? (
          <div className="px-5 py-8 sm:px-8">
            <h1 className="text-center font-serif text-2xl">* अनुक्रमणिका *</h1>
            <ul className="mt-6 list-none space-y-2 p-0">
              {HARIPAAT_LEAVES.map((leaf) => (
                <li key={leaf.id}>
                  <button
                    type="button"
                    className="w-full rounded-lg px-3 py-2 text-left hover:bg-secondary"
                    onClick={() => go(firstPageForLeaf(leaf.id))}
                  >
                    <span className="font-devanagari text-primary">
                      {toDevanagariNumeral(leaf.id)} ·
                    </span>{" "}
                    <span className="font-devanagari">{leaf.titleMr}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {leafPage.kind === "leaf" ? (
          <div className="px-5 py-8 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              पाठ {toDevanagariNumeral(leafPage.leaf.id)} · {leafPage.leaf.kathaTitleMr}
            </p>
            <h1 className="mt-3 font-devanagari text-3xl">
              ॥ पाठ {toDevanagariNumeral(leafPage.leaf.id)} ॥
            </h1>
            <h2 className="mt-2 font-serif text-2xl">{leafPage.leaf.titleMr}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{leafPage.leaf.titleEn}</p>
            <div className="mt-6 space-y-4 text-base leading-8">
              {leafPage.leaf.katha[locale].map((para) => (
                <p key={para.slice(0, 28)}>{para}</p>
              ))}
            </div>
            <p className="theme-note mt-8 text-xs leading-5">
              Tradition — original Hind AI katha-sar. Not a publisher patha scan.
            </p>
          </div>
        ) : null}
      </article>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          disabled={!prevPage(page)}
          onClick={() => {
            const p = prevPage(page);
            if (p) go(p);
          }}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <Button variant="outline" onClick={() => go(2)}>
          Contents
        </Button>
        <Button
          variant="outline"
          disabled={!nextPage(page)}
          onClick={() => {
            const p = nextPage(page);
            if (p) go(p);
          }}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
