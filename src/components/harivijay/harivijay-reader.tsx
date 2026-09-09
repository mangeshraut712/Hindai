"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BEAT_IMAGE, HARIVIJAY_CHAPTERS, type ReaderLocale } from "@/lib/data/harivijay/catalog";
import {
  bookPath,
  firstPageForChapter,
  folioCount,
  getLeaf,
  nextPage,
  parseBookPage,
  prevPage,
  toDevanagariNumeral,
} from "@/lib/data/harivijay/book";
import { readerLocaleLabel, speechLang } from "@/lib/data/harivijay/locales";

export function HarivijayReader({ initialPage }: { initialPage: number }) {
  const router = useRouter();
  const [page, setPage] = useState(() => parseBookPage(String(initialPage)));
  const [locale, setLocale] = useState<ReaderLocale>("mr");
  const [speaking, setSpeaking] = useState(false);
  const leaf = getLeaf(page);
  const total = folioCount();

  useEffect(() => {
    setPage(parseBookPage(String(initialPage)));
  }, [initialPage]);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
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
    if (!("speechSynthesis" in window) || leaf.kind !== "adhyay") return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const text = leaf.chapter.katha[locale].join(" ");
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = speechLang(locale);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/harivijay" className="text-sm font-semibold text-primary">
          ← हरिविजय home
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
            {readerLocaleLabel(item)}
          </Button>
        ))}
        {leaf.kind === "adhyay" ? (
          <Button size="sm" variant="outline" onClick={listen} data-testid="harivijay-listen">
            {speaking ? <Pause className="size-4" /> : <Play className="size-4" />}
            {speaking ? "Pause" : "Listen"}
          </Button>
        ) : null}
      </div>

      <article className="pothi-ebook-book overflow-hidden rounded-2xl border border-border/70">
        {leaf.kind === "cover" ? (
          <div className="space-y-6 px-6 py-10 text-center sm:px-10">
            <Image
              src="/harivijay/cover.webp"
              alt="श्रीहरिविजय cover — artist impression"
              width={768}
              height={1024}
              className="mx-auto h-auto w-full max-w-xs rounded-md object-contain"
              unoptimized
              priority
            />
            <h1 className="font-serif text-3xl">सचित्र श्रीहरिविजय</h1>
            <p className="text-sm leading-7 text-muted-foreground">
              Original Hind AI katha-sar on Sant Shridhar’s Krishna grantha arc. Not a modern
              Kathasar scan.
            </p>
            <Button asChild>
              <Link href={bookPath(3)}>Start adhyay 1</Link>
            </Button>
          </div>
        ) : null}

        {leaf.kind === "contents" ? (
          <div className="px-5 py-8 sm:px-8">
            <h1 className="text-center font-serif text-2xl">* अनुक्रमणिका *</h1>
            <ul className="mt-6 list-none space-y-2 p-0">
              {HARIVIJAY_CHAPTERS.map((chapter) => (
                <li key={chapter.id}>
                  <button
                    type="button"
                    className="w-full rounded-lg px-3 py-2 text-left hover:bg-secondary"
                    onClick={() => go(firstPageForChapter(chapter.id))}
                  >
                    <span className="font-devanagari text-primary">
                      अध्याय {toDevanagariNumeral(chapter.id)} ·
                    </span>{" "}
                    <span className="font-devanagari">{chapter.titleMr}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {leaf.kind === "adhyay" ? (
          <div className="px-5 py-8 sm:px-8">
            <div className="overflow-hidden rounded-xl border border-border/60">
              <Image
                src={BEAT_IMAGE[leaf.chapter.beat]}
                alt={`Artist impression for ${leaf.chapter.titleEn}`}
                width={1200}
                height={700}
                className="h-48 w-full object-cover sm:h-56"
                unoptimized
              />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              अध्याय {toDevanagariNumeral(leaf.chapter.id)} · {leaf.chapter.kathaTitleMr}
            </p>
            <h1 className="mt-3 font-devanagari text-3xl text-foreground">
              ॥ अध्याय {toDevanagariNumeral(leaf.chapter.id)} ॥
            </h1>
            <h2 className="mt-2 font-serif text-2xl">{leaf.chapter.titleMr}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{leaf.chapter.titleEn}</p>
            <div className="mt-6 space-y-4 text-base leading-8 text-foreground">
              {leaf.chapter.katha[locale].map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <p className="theme-note mt-8 text-xs leading-5">
              Tradition — original Hind AI katha-sar. Full public-domain ovi lines can be layered
              later; modern Kathasar prose is not hosted.
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
          data-testid="harivijay-prev"
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
          data-testid="harivijay-next"
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
