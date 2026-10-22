"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { GemmaStudyPanel } from "@/components/ai/gemma-study-panel";
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
import { publicUrl } from "@/lib/site";

function studyCopy(
  page: ReturnType<typeof getLeaf>,
  locale: ReaderLocale
): { title: string; context: string } {
  switch (page.kind) {
    case "cover":
      return { title: "Harivijay", context: "Cover of the Harivijay katha-sar." };
    case "contents":
      return {
        title: "Harivijay contents",
        context: HARIVIJAY_CHAPTERS.map(
          (chapter) => `${chapter.titleMr} — ${chapter.titleEn}`
        ).join("\n"),
      };
    case "adhyay":
      return {
        title: page.chapter.titleEn,
        context: page.chapter.katha[locale].join("\n"),
      };
    default: {
      const exhaustive: never = page;
      return exhaustive;
    }
  }
}

export function HarivijayReader({ initialPage }: { initialPage: number }) {
  const router = useRouter();
  const [page, setPage] = useState(() => parseBookPage(String(initialPage)));
  const [locale, setLocale] = useState<ReaderLocale>("mr");
  const [speaking, setSpeaking] = useState(false);
  const leaf = getLeaf(page);
  const study = studyCopy(leaf, locale);
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
        <Link href="/harivijay" className="text-primary text-sm font-semibold">
          ← हरिविजय home
        </Link>
        <p className="text-muted-foreground text-xs tabular-nums">
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

      <article className="pothi-ebook-book border-border/70 overflow-hidden rounded-2xl border">
        {leaf.kind === "cover" ? (
          <div className="space-y-6 px-6 py-10 text-center sm:px-10">
            <Image
              src={publicUrl("/harivijay/cover.webp")}
              alt="श्रीहरिविजय cover — artist impression"
              width={768}
              height={1024}
              className="mx-auto h-auto w-full max-w-xs rounded-md object-contain"
              unoptimized
              priority
            />
            <h1 className="font-serif text-3xl">सचित्र श्रीहरिविजय</h1>
            <p className="text-muted-foreground text-sm leading-7">
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
                    className="hover:bg-secondary w-full rounded-lg px-3 py-2 text-left"
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
            <div className="border-border/60 overflow-hidden rounded-xl border">
              <Image
                src={publicUrl(BEAT_IMAGE[leaf.chapter.beat])}
                alt={`Artist impression for ${leaf.chapter.titleEn}`}
                width={1200}
                height={700}
                className="h-48 w-full object-cover sm:h-56"
                unoptimized
              />
            </div>
            <p className="text-primary mt-6 text-xs font-semibold tracking-[0.16em] uppercase">
              अध्याय {toDevanagariNumeral(leaf.chapter.id)} · {leaf.chapter.kathaTitleMr}
            </p>
            <h1 className="font-devanagari text-foreground mt-3 text-3xl">
              ॥ अध्याय {toDevanagariNumeral(leaf.chapter.id)} ॥
            </h1>
            <h2 className="mt-2 font-serif text-2xl">{leaf.chapter.titleMr}</h2>
            <p className="text-muted-foreground mt-1 text-sm">{leaf.chapter.titleEn}</p>
            <div className="text-foreground mt-6 space-y-4 text-base leading-8">
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

      <GemmaStudyPanel
        key={`${page}-${locale}`}
        kind="book"
        title={study.title}
        context={study.context}
      />

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
