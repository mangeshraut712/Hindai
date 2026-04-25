"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScriptureVerse } from "@/types/scripture";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";

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
  const favoritesKey = `hindai.favorites.verses`;

  // Check if this is Rigveda (has mandala and sukta fields)
  const isRigveda = scriptureSlug === "rigveda" || verses.some((v) => v.mandala !== undefined);

  const mandalas = useMemo(
    () =>
      [
        ...new Set(
          verses.map((verse) => verse.mandala).filter((m): m is number => m !== undefined)
        ),
      ].sort((a, b) => a - b),
    [verses]
  );

  const chapters = useMemo(
    () => [...new Set(verses.map((verse) => verse.chapter))].sort((a, b) => a - b),
    [verses]
  );

  const [selectedMandala, setSelectedMandala] = useState(mandalas[0] || chapters[0]);
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]);

  const suktas = useMemo(
    () =>
      [
        ...new Set(
          verses
            .filter((v) => v.mandala === selectedMandala)
            .map((verse) => verse.sukta)
            .filter((s): s is number => s !== undefined)
        ),
      ].sort((a, b) => a - b),
    [selectedMandala, verses]
  );

  const [selectedSukta, setSelectedSukta] = useState(suktas[0]);

  const chapterVerses = useMemo(() => {
    if (isRigveda && selectedMandala !== undefined && selectedSukta !== undefined) {
      return verses
        .filter((verse) => verse.mandala === selectedMandala && verse.sukta === selectedSukta)
        .sort((a, b) => a.verse - b.verse);
    }
    return verses
      .filter((verse) => verse.chapter === selectedChapter)
      .sort((a, b) => a.verse - b.verse);
  }, [isRigveda, selectedMandala, selectedSukta, selectedChapter, verses]);

  const [selectedVerseId, setSelectedVerseId] = useState(chapterVerses[0]?.id || verses[0]?.id);
  const [favoriteVerseIds, setFavoriteVerseIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = getLocalStorageItem<{ chapter: number; verseId: string }>(progressKey);
    if (saved) {
      if (saved.chapter) {
        setSelectedChapter(saved.chapter);
      }
      if (saved.verseId) {
        setSelectedVerseId(saved.verseId);
      }
    }
  }, [progressKey]);

  useEffect(() => {
    const saved = getLocalStorageItem<string[]>(favoritesKey);
    if (saved) {
      setFavoriteVerseIds(new Set(saved));
    }
  }, [favoritesKey]);

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

  // Update selected verse ID when chapterVerses changes (for Rigveda navigation)
  useEffect(() => {
    if (chapterVerses.length > 0) {
      const currentVerseExists = chapterVerses.find((v) => v.id === selectedVerseId);
      if (!currentVerseExists) {
        setSelectedVerseId(chapterVerses[0]?.id);
      }
    }
  }, [chapterVerses, selectedVerseId]);

  useEffect(() => {
    if (!selectedVerse) return;
    setLocalStorageItem(progressKey, {
      chapter: selectedVerse.chapter,
      verseId: selectedVerse.id,
    });
  }, [progressKey, selectedVerse]);

  const toggleFavorite = (verseId: string) => {
    const newFavorites = new Set(favoriteVerseIds);
    if (newFavorites.has(verseId)) {
      newFavorites.delete(verseId);
    } else {
      newFavorites.add(verseId);
    }
    setFavoriteVerseIds(newFavorites);
    setLocalStorageItem(favoritesKey, [...newFavorites]);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="eyebrow">{isRigveda ? "Mandala navigator" : "Chapter navigator"}</span>
        {isRigveda ? (
          <>
            {mandalas.map((mandala) => (
              <Button
                key={mandala}
                variant={mandala === selectedMandala ? "premium" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedMandala(mandala);
                  const firstSukta = suktas[0];
                  if (firstSukta) {
                    setSelectedSukta(firstSukta);
                    const firstVerse = verses
                      .filter((verse) => verse.mandala === mandala && verse.sukta === firstSukta)
                      .sort((a, b) => a.verse - b.verse)[0];
                    if (firstVerse) {
                      setSelectedVerseId(firstVerse.id);
                    }
                  }
                }}
              >
                Mandala {mandala}
              </Button>
            ))}
            {selectedMandala && (
              <div className="ml-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">Sukta:</span>
                {suktas.map((sukta) => (
                  <Button
                    key={sukta}
                    variant={sukta === selectedSukta ? "premium" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedSukta(sukta);
                      const firstVerse = verses
                        .filter(
                          (verse) => verse.mandala === selectedMandala && verse.sukta === sukta
                        )
                        .sort((a, b) => a.verse - b.verse)[0];
                      if (firstVerse) {
                        setSelectedVerseId(firstVerse.id);
                      }
                    }}
                  >
                    {sukta}
                  </Button>
                ))}
              </div>
            )}
          </>
        ) : (
          chapters.map((chapter) => (
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
          ))
        )}
        {selectedVerse ? (
          <span className="text-xs text-muted-foreground">
            {isRigveda
              ? `Reading Mandala ${selectedVerse.mandala}, Sukta ${selectedVerse.sukta}, Verse ${selectedVerse.verse}`
              : `Continue reading from chapter ${selectedVerse.chapter}, verse ${selectedVerse.verse}`}
          </span>
        ) : null}
      </div>

      <AnimatePresence mode="wait">
        {selectedVerse ? (
          <motion.article
            key={selectedVerse.id}
            id={selectedVerse.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="surface-panel p-8 md:p-10"
          >
            <div className="relative z-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    {isRigveda
                      ? `Mandala ${selectedVerse.mandala}, Sukta ${selectedVerse.sukta}`
                      : `Chapter ${selectedVerse.chapter}`}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                    Verse {selectedVerse.verse}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{scriptureHighlight}</span>
                  <Button
                    variant={favoriteVerseIds.has(selectedVerse.id) ? "premium" : "outline"}
                    size="sm"
                    onClick={() => toggleFavorite(selectedVerse.id)}
                  >
                    {favoriteVerseIds.has(selectedVerse.id) ? (
                      <BookmarkCheck className="size-4" />
                    ) : (
                      <Bookmark className="size-4" />
                    )}
                    {favoriteVerseIds.has(selectedVerse.id) ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-1.5">
                {chapterVerses.map((verse) => (
                  <button
                    key={verse.id}
                    onClick={() => setSelectedVerseId(verse.id)}
                    className={`inline-flex size-9 items-center justify-center rounded-xl text-sm font-medium transition-all ${
                      verse.id === selectedVerse.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "border border-border/60 bg-background/75 text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    {verse.verse}
                  </button>
                ))}
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="size-4 text-primary" />
                      <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                        Sanskrit
                      </p>
                    </div>
                    <div className="mt-4 rounded-2xl border border-amber-200/40 bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-rose-50/30 p-7 dark:border-amber-800/20 dark:from-amber-950/25 dark:via-orange-950/15 dark:to-rose-950/10">
                      <p className="font-devanagari text-2xl leading-relaxed text-foreground drop-shadow-sm sm:text-3xl">
                        {selectedVerse.sanskrit}
                      </p>
                    </div>
                  </div>
                  {selectedVerse.transliteration ? (
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                        Transliteration
                      </p>
                      <p className="mt-3 text-sm italic leading-8 text-muted-foreground">
                        {selectedVerse.transliteration}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                      Translation
                    </p>
                    <p className="mt-4 text-base leading-8 text-foreground/90">
                      {selectedVerse.translation.en}
                    </p>
                    {selectedVerse.translation.hi ? (
                      <p className="mt-4 border-t border-border/40 pt-4 font-devanagari text-sm leading-8 text-muted-foreground">
                        {selectedVerse.translation.hi}
                      </p>
                    ) : null}
                  </div>

                  {selectedVerse.commentary ? (
                    <div className="rounded-[22px] border border-border/60 bg-background/75 p-5 text-sm leading-7 text-muted-foreground">
                      {selectedVerse.commentary}
                    </div>
                  ) : null}

                  {selectedVerse.deity || selectedVerse.sage || selectedVerse.meter ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedVerse.deity ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/75 px-3 py-1 text-xs text-muted-foreground">
                          Deity: <strong className="text-foreground">{selectedVerse.deity}</strong>
                        </span>
                      ) : null}
                      {selectedVerse.sage ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/75 px-3 py-1 text-xs text-muted-foreground">
                          Sage: <strong className="text-foreground">{selectedVerse.sage}</strong>
                        </span>
                      ) : null}
                      {selectedVerse.meter ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/75 px-3 py-1 text-xs text-muted-foreground">
                          Meter: <strong className="text-foreground">{selectedVerse.meter}</strong>
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
            </div>
          </motion.article>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
