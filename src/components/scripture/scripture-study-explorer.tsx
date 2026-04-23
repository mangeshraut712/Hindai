"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIExplanation } from "@/components/ai/ai-explanation";
import { ScriptureVerse } from "@/types/scripture";

type ScriptureStudyExplorerProps = {
  verses: ScriptureVerse[];
  scriptureSlug: string;
  scriptureHighlight: string;
};

export function ScriptureStudyExplorer({
  verses,
  scriptureSlug,
  scriptureHighlight,
}: ScriptureStudyExplorerProps) {
  const progressKey = `hindai.reading-progress.${scriptureSlug}`;
  const chapters = useMemo(
    () => [...new Set(verses.map((verse) => verse.chapter))].sort((a, b) => a - b),
    [verses]
  );
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]);

  const chapterVerses = useMemo(
    () =>
      verses.filter((verse) => verse.chapter === selectedChapter).sort((a, b) => a.verse - b.verse),
    [selectedChapter, verses]
  );

  const [selectedVerseId, setSelectedVerseId] = useState(chapterVerses[0]?.id || verses[0]?.id);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(progressKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as { chapter: number; verseId: string };
      if (saved.chapter) {
        setSelectedChapter(saved.chapter);
      }
      if (saved.verseId) {
        setSelectedVerseId(saved.verseId);
      }
    } catch {
      // Ignore malformed local progress.
    }
  }, [progressKey]);

  const selectedVerse = useMemo(
    () => chapterVerses.find((verse) => verse.id === selectedVerseId) || chapterVerses[0],
    [chapterVerses, selectedVerseId]
  );

  const selectedIndex = chapterVerses.findIndex((verse) => verse.id === selectedVerse?.id);
  const previousVerse = selectedIndex > 0 ? chapterVerses[selectedIndex - 1] : null;
  const nextVerse =
    selectedIndex >= 0 && selectedIndex < chapterVerses.length - 1
      ? chapterVerses[selectedIndex + 1]
      : null;

  useEffect(() => {
    if (!selectedVerse) return;
    window.localStorage.setItem(
      progressKey,
      JSON.stringify({
        chapter: selectedVerse.chapter,
        verseId: selectedVerse.id,
      })
    );
  }, [progressKey, selectedVerse]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="eyebrow">Chapter navigator</span>
        {chapters.map((chapter) => (
          <Button
            key={chapter}
            variant={chapter === selectedChapter ? "premium" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedChapter(chapter);
              const firstVerse = verses
                .filter((verse) => verse.chapter === chapter)
                .sort((a, b) => a.verse - b.verse)[0];
              if (firstVerse) {
                setSelectedVerseId(firstVerse.id);
              }
            }}
          >
            Chapter {chapter}
          </Button>
        ))}
        {selectedVerse ? (
          <span className="text-xs text-muted-foreground">
            Continue reading from chapter {selectedVerse.chapter}, verse {selectedVerse.verse}
          </span>
        ) : null}
      </div>

      {selectedVerse ? (
        <article id={selectedVerse.id} className="surface-panel p-8 md:p-10">
          <div className="relative z-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Chapter {selectedVerse.chapter}
                </p>
                <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                  Verse {selectedVerse.verse}
                </h3>
              </div>
              <span className="text-sm text-muted-foreground">{scriptureHighlight}</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {chapterVerses.map((verse) => (
                <Button
                  key={verse.id}
                  variant={verse.id === selectedVerse.id ? "premium" : "outline"}
                  size="sm"
                  onClick={() => setSelectedVerseId(verse.id)}
                >
                  {verse.verse}
                </Button>
              ))}
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                    Sanskrit
                  </p>
                  <p className="mt-3 font-devanagari text-2xl leading-10 text-foreground">
                    {selectedVerse.sanskrit}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                    Transliteration
                  </p>
                  <p className="mt-3 text-sm italic leading-7 text-muted-foreground">
                    {selectedVerse.transliteration}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                    Translation
                  </p>
                  <p className="text-foreground/88 mt-3 text-base leading-8">
                    {selectedVerse.translation.en}
                  </p>
                  {selectedVerse.translation.hi ? (
                    <p className="mt-3 font-devanagari text-sm leading-8 text-muted-foreground">
                      {selectedVerse.translation.hi}
                    </p>
                  ) : null}
                </div>

                {selectedVerse.commentary ? (
                  <div className="rounded-[22px] border border-border/60 bg-background/75 p-4 text-sm leading-7 text-muted-foreground">
                    {selectedVerse.commentary}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!previousVerse}
                  onClick={() => previousVerse && setSelectedVerseId(previousVerse.id)}
                >
                  <ChevronLeft className="size-4" />
                  Previous verse
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!nextVerse}
                  onClick={() => nextVerse && setSelectedVerseId(nextVerse.id)}
                >
                  Next verse
                  <ChevronRight className="size-4" />
                </Button>
              </div>

              <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="size-4 text-primary" />
                Gemma 4 grounded study pack
              </span>
            </div>

            <AIExplanation
              verseId={selectedVerse.id}
              sanskrit={selectedVerse.sanskrit}
              translation={selectedVerse.translation.en}
              scripture={scriptureSlug}
              chapter={selectedVerse.chapter}
              verse={selectedVerse.verse}
              audience="student"
            />
          </div>
        </article>
      ) : null}
    </div>
  );
}
