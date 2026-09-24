"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Minus, Plus, Printer } from "lucide-react";
import { readingBlocks, type SatyanarayanReadingChapter } from "@/lib/data/satyanarayan-reader";
import editions from "@/lib/data/satyanarayan-editions.json";
import { publicUrl } from "@/lib/site";
import { GemmaStudyPanel } from "@/components/ai/gemma-study-panel";

interface ChapterGuide {
  number: number;
  title: string;
  titleMr: string;
  summary: string;
  summaryMr: string;
}

export function SatyanarayanReader({
  chapters,
  guides,
}: {
  chapters: SatyanarayanReadingChapter[];
  guides: readonly ChapterGuide[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<"marathi" | "hindi" | "english" | "original">("marathi");
  const [textSize, setTextSize] = useState(22);

  useEffect(() => {
    const match = window.location.hash.match(/^#adhyay-([1-5])$/);
    if (match) setActiveIndex(Number(match[1]) - 1);
  }, []);

  const selectChapter = (index: number) => {
    setActiveIndex(index);
    window.history.replaceState(null, "", `#adhyay-${index + 1}`);
    document.getElementById("katha-reader")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chapter = chapters[activeIndex];
  const edition = editions.chapters[activeIndex];
  const guide = guides[activeIndex];
  if (!chapter || !guide || !edition) return null;

  const labels = {
    marathi: "मराठी पुस्तक",
    hindi: "हिन्दी कथा",
    english: "English story",
    original: "संस्कृत पाठ",
  } as const;
  const reading = mode === "original" ? chapter.original : edition[mode];
  const blocks = readingBlocks(reading, mode === "marathi");
  const extractionNote = {
    marathi:
      "हा मजकूर पुस्तकातून काढलेला आहे. अक्षर चुकू शकते. नेमका शब्द हवा असल्यास खालील छापील पान पाहा.",
    hindi:
      "यह पाठ पुस्तक से निकाला गया है। अक्षर ग़लत हो सकते हैं। ठीक शब्द के लिए नीचे दिया छपा पृष्ठ देखें।",
    english:
      "Searchable text was extracted from the book and may contain letter recognition errors. Use the printed page views below when exact wording matters.",
  } as const;
  const pageNumbers = mode === "original" ? [] : edition[`${mode}Pages`];

  return (
    <section id="katha-reader" className="scroll-mt-20" aria-label="Satyanarayan katha reader">
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-300">
          मूळ कथा · The complete reading
        </p>
        <h2 className="mt-3 font-devanagari text-4xl font-semibold leading-tight sm:text-5xl">
          श्री सत्यनारायण व्रतकथा
        </h2>
        <p className="mt-4 font-devanagari text-base leading-8 text-stone-700 dark:text-stone-300">
          पाचही अध्याय क्रमाने वाचा. मराठी, हिन्दी, English आणि संस्कृत यांपैकी भाषा निवडा.
          पुस्तकातील शब्द तपासण्यासाठी प्रत्येक अध्यायाखाली मूळ छापील पानेही पाहता येतील.
        </p>
      </div>

      <div className="grid gap-7 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
        <nav
          aria-label="Five katha chapters"
          className="grid grid-cols-5 gap-2 lg:sticky lg:top-24 lg:grid-cols-1"
        >
          {guides.map((entry, index) => (
            <button
              key={entry.number}
              type="button"
              onClick={() => selectChapter(index)}
              aria-current={activeIndex === index ? "step" : undefined}
              className={`rounded-2xl border px-2 py-3 text-left transition-colors sm:px-4 ${
                activeIndex === index
                  ? "border-amber-700 bg-[#51291c] text-amber-50 shadow-lg shadow-amber-950/15"
                  : "border-amber-900/15 bg-white/75 text-stone-700 hover:border-amber-700/50 hover:bg-amber-50 dark:bg-stone-900 dark:text-stone-200"
              }`}
            >
              <span className="block font-devanagari text-lg font-bold">
                {["१", "२", "३", "४", "५"][index]}
              </span>
              <span className="mt-1 hidden font-devanagari text-sm leading-6 lg:block">
                {entry.titleMr}
              </span>
              <span className="sr-only">
                Chapter {entry.number}: {entry.title}
              </span>
            </button>
          ))}
        </nav>

        <article className="min-w-0 overflow-hidden rounded-[28px] border border-amber-900/15 bg-[#fffdf8] shadow-[0_20px_70px_rgba(73,40,17,0.08)] dark:border-amber-100/15 dark:bg-stone-900">
          <header className="border-b border-amber-900/10 bg-gradient-to-br from-amber-100/80 via-[#fffaf0] to-orange-50 px-5 py-7 dark:from-stone-800 dark:via-stone-900 dark:to-stone-900 sm:px-9">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-800 dark:text-amber-300">
              अध्याय {chapter.number} / ५
            </p>
            <h3 className="mt-3 font-devanagari text-3xl font-semibold leading-tight sm:text-4xl">
              {guide.titleMr}
            </h3>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{guide.title}</p>
            <p className="mt-5 border-l-2 border-amber-700 pl-4 font-devanagari text-lg leading-9 text-stone-800 dark:text-stone-100">
              {guide.summaryMr}
            </p>
            <details className="mt-5 text-sm leading-7 text-stone-600 dark:text-stone-300">
              <summary className="cursor-pointer font-semibold text-amber-900 dark:text-amber-200">
                English chapter guide
              </summary>
              <p className="mt-2">{guide.summary}</p>
            </details>
          </header>

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-900/10 px-5 py-4 sm:px-9">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Reading language">
              {(["marathi", "hindi", "english", "original"] as const).map((language) => (
                <button
                  key={language}
                  type="button"
                  role="tab"
                  aria-selected={mode === language}
                  onClick={() => setMode(language)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === language ? "bg-[#51291c] text-amber-50" : "bg-amber-100 text-amber-950 dark:bg-stone-800 dark:text-amber-100"}`}
                >
                  {labels[language]}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1" aria-label="Reading controls">
              <button
                type="button"
                aria-label="Smaller text"
                onClick={() => setTextSize((size) => Math.max(18, size - 2))}
                className="rounded-full p-2 hover:bg-amber-100 dark:hover:bg-stone-800"
              >
                <Minus className="size-4" />
              </button>
              <span
                className="min-w-7 text-center text-xs text-stone-500"
                aria-label={`Text size ${textSize} pixels`}
              >
                Aa
              </span>
              <button
                type="button"
                aria-label="Larger text"
                onClick={() => setTextSize((size) => Math.min(30, size + 2))}
                className="rounded-full p-2 hover:bg-amber-100 dark:hover:bg-stone-800"
              >
                <Plus className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Print reading page"
                onClick={() => window.print()}
                className="ml-1 rounded-full p-2 hover:bg-amber-100 dark:hover:bg-stone-800"
              >
                <Printer className="size-4" />
              </button>
            </div>
          </div>

          <div className="px-5 py-8 sm:px-9 sm:py-10" role="tabpanel">
            <p className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
              <BookOpen className="size-4" />{" "}
              {mode === "original"
                ? "Sanskrit reading · Devanagari · Wikisource edition"
                : `${labels[mode]} · supplied book edition`}
            </p>
            {mode !== "original" && (
              <p className="mb-7 max-w-[66ch] rounded-xl bg-amber-100/60 px-4 py-3 text-sm leading-6 text-stone-700 dark:bg-stone-800 dark:text-stone-200">
                {extractionNote[mode]}
              </p>
            )}
            <div
              className={`mx-auto max-w-[66ch] space-y-0 text-stone-900 dark:text-amber-50 ${mode === "english" ? "font-serif" : "font-devanagari"}`}
              style={{ fontSize: `${textSize}px`, lineHeight: 2.05 }}
            >
              {blocks.map((block, index) => (
                <p
                  key={`${mode}-${index}`}
                  className={
                    block.kind === "verse"
                      ? "whitespace-pre-line border-l-2 border-amber-700/70 py-3 pl-4 text-[0.92em] leading-9 text-amber-950 dark:text-amber-100"
                      : block.kind === "heading"
                        ? "pt-6 text-center text-[0.8em] font-semibold tracking-wide text-amber-800 first:pt-0 dark:text-amber-200"
                        : "whitespace-pre-line border-b border-amber-900/10 py-4 first:pt-0 last:border-0 dark:border-amber-100/10"
                  }
                >
                  {block.kind === "verse" ? (
                    <span className="mb-1 block text-[0.65em] font-semibold uppercase tracking-[0.16em] text-amber-700">
                      श्लोक
                    </span>
                  ) : null}
                  {block.text}
                </p>
              ))}
            </div>
          </div>

          {mode !== "original" && (
            <details className="border-t border-amber-900/10 px-5 py-6 sm:px-9">
              <summary className="cursor-pointer font-semibold text-amber-900 dark:text-amber-200">
                मूळ छापील पाने · View the book pages ({pageNumbers.join(", ")})
              </summary>
              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
                These are page images from the supplied book, available offline. Open an image to
                zoom in. A boundary page may also contain part of the neighbouring chapter.
              </p>
              <div className="mt-5 grid gap-5">
                {pageNumbers.map((page) => (
                  <a
                    key={page}
                    href={publicUrl(
                      `/images/satyanarayan/source-pages/${mode}-${String(page).padStart(2, "0")}.webp`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-xl border border-amber-900/15 bg-white"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={publicUrl(
                        `/images/satyanarayan/source-pages/${mode}-${String(page).padStart(2, "0")}.webp`
                      )}
                      alt={`${labels[mode]} printed book page ${page}`}
                      loading="lazy"
                      className="mx-auto h-auto max-w-full"
                    />
                  </a>
                ))}
              </div>
            </details>
          )}

          <footer className="border-t border-amber-900/10 bg-amber-50/70 px-5 py-6 dark:bg-stone-800/70 sm:px-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => selectChapter(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="inline-flex items-center gap-2 rounded-full border border-amber-900/20 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="size-4" /> Previous
              </button>
              <span className="font-devanagari text-sm text-stone-600 dark:text-stone-300">
                {chapter.number} / ५ अध्याय
              </span>
              <button
                type="button"
                onClick={() => selectChapter(activeIndex + 1)}
                disabled={activeIndex === 4}
                className="inline-flex items-center gap-2 rounded-full bg-[#51291c] px-4 py-2 text-sm font-semibold text-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next <ArrowRight className="size-4" />
              </button>
            </div>
            {mode === "original" && (
              <a
                href={chapter.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-xs font-semibold text-amber-900 underline underline-offset-4 dark:text-amber-200"
              >
                Compare with Wikisource page ↗
              </a>
            )}
          </footer>
        </article>
      </div>

      <div className="mt-10 rounded-[28px] border border-amber-900/15 bg-[#fffdf8] p-5 dark:bg-stone-900 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-300">
          कथा समजून घ्या · Chapter study
        </p>
        <h3 className="mt-2 font-devanagari text-2xl font-semibold">या अध्यायाबद्दल विचारा</h3>
        <p className="mt-2 font-devanagari text-sm leading-7 text-stone-600 dark:text-stone-300">
          निवडलेला अध्याय आणि भाषा प्रश्नासोबत पाठवली जाते. मजकुरातील प्रसंग, पात्रे किंवा अर्थ
          विचारा. अचूक पठणासाठी वर दिलेले छापील पान तपासा.
        </p>
        <GemmaStudyPanel
          key={`${chapter.number}-${mode}`}
          kind="katha"
          title={`श्री सत्यनारायण व्रतकथा · अध्याय ${chapter.number} · ${labels[mode]}`}
          context={`${mode === "original" ? "Sanskrit Wikisource edition." : "OCR-assisted transcription of a supplied printed book. If a word looks uncertain, say so rather than repairing it from memory."}\n${reading.join("\n\n")}`}
          contextLimit={14000}
          answerLanguage={mode === "hindi" ? "Hindi" : mode === "english" ? "English" : "Marathi"}
          scopeToPassage
        />
      </div>
    </section>
  );
}
