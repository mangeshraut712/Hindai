"use client";

import { useState, useEffect, useCallback } from "react";
import { VerseWithLayers } from "@/lib/database/schema";
import { listLocalProgress, saveLocalProgress } from "@/lib/progress/local-progress";
import { getLocalChapterSummary, listLocalVerses } from "@/lib/scripture/local-scripture-api";

type ChapterTab = "sanskrit" | "translation" | "commentary";

interface ChapterModeProps {
  scriptureId: string;
  chapter: number;
}

export default function ChapterMode({ scriptureId, chapter }: ChapterModeProps) {
  const [verses, setVerses] = useState<VerseWithLayers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedVerse, setExpandedVerse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<ChapterTab>("sanskrit");
  const [readingProgress, setReadingProgress] = useState(0);
  const [chapterSummary, setChapterSummary] = useState<string | null>(null);

  const loadChapterSummary = useCallback(() => {
    setChapterSummary(getLocalChapterSummary(scriptureId, chapter));
  }, [chapter, scriptureId]);

  const loadReadingProgress = useCallback(
    (totalVerses: number) => {
      const completed = listLocalProgress(scriptureId, chapter).filter(
        (record) => record.completed
      ).length;
      setReadingProgress(totalVerses > 0 ? (completed / totalVerses) * 100 : 0);
    },
    [chapter, scriptureId]
  );

  const loadChapter = useCallback(() => {
    setLoading(true);
    setError(null);
    try {
      const loadedVerses = listLocalVerses(scriptureId, chapter);
      setVerses(loadedVerses);
      if (!loadedVerses.length) {
        setError("This chapter is not in the local scripture index.");
      }
      loadChapterSummary();
      loadReadingProgress(loadedVerses.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load chapter");
    } finally {
      setLoading(false);
    }
  }, [chapter, loadChapterSummary, loadReadingProgress, scriptureId]);

  useEffect(() => {
    loadChapter();
  }, [loadChapter]);

  const toggleVerse = (verseNum: number) => {
    setExpandedVerse(expandedVerse === verseNum ? null : verseNum);
  };

  const markAsRead = (verseNum: number) => {
    saveLocalProgress({
      scripture_id: scriptureId,
      chapter,
      verse_num: verseNum,
      completed: true,
    });
    loadReadingProgress(verses.length);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="animate-pulse">
          <div className="theme-chip mb-4 h-8 rounded"></div>
          <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="theme-chip h-16 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Chapter header */}
      <div className="mb-6">
        <h1 className="text-foreground text-2xl font-bold">Chapter {chapter}</h1>

        {/* Reading progress */}
        <div className="mt-2">
          <div className="text-muted-foreground mb-1 flex justify-between text-sm">
            <span>Reading Progress</span>
            <span>{Math.round(readingProgress)}%</span>
          </div>
          <div className="theme-chip h-2 w-full rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${readingProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Chapter summary */}
      {chapterSummary && (
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 font-bold">Chapter Summary</h3>
          <p className="text-foreground/80">{chapterSummary}</p>
        </div>
      )}

      {/* Tab navigation for expanded view */}
      {expandedVerse !== null && (
        <div className="mb-4 flex border-b">
          {(["sanskrit", "translation", "commentary"] as const).map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium transition ${
                activeTab === tab
                  ? "text-primary border-b-2 border-blue-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Verses list */}
      <div className="space-y-2">
        {verses.map((verse) => (
          <div
            key={verse.id}
            className={`overflow-hidden rounded-lg border transition ${
              expandedVerse === verse.verse_num ? "border-blue-500" : "border-border"
            }`}
          >
            {/* Verse header (always visible) */}
            <div
              className="hover:bg-muted cursor-pointer p-4 transition"
              onClick={() => toggleVerse(verse.verse_num)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-foreground/80 font-bold">{verse.verse_num}.</span>
                  <span className="text-lg">{verse.text_devanagari}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(verse.verse_num);
                    }}
                    className="rounded bg-green-100 px-2 py-1 text-sm text-green-800 transition hover:bg-green-200"
                  >
                    ✓
                  </button>
                  <span className="text-muted-foreground">
                    {expandedVerse === verse.verse_num ? "▼" : "▶"}
                  </span>
                </div>
              </div>
            </div>

            {/* Expanded content */}
            {expandedVerse === verse.verse_num && (
              <div className="bg-muted border-t p-4">
                {activeTab === "sanskrit" && (
                  <div className="space-y-2">
                    <div className="text-xl">{verse.text_devanagari}</div>
                    <div className="text-muted-foreground">{verse.text_iast}</div>
                    {verse.word_analysis && verse.word_analysis.length > 0 && (
                      <div className="mt-4">
                        <h4 className="mb-2 font-bold">Word-by-word</h4>
                        <div className="space-y-1">
                          {verse.word_analysis.map((word, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{word.word_devanagari}</span>
                              <span className="text-muted-foreground ml-2">
                                ({word.lemma} - {word.meaning_en})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "translation" && (
                  <div className="space-y-3">
                    {verse.translations?.map((translation, index) => (
                      <div key={index} className="bg-card rounded p-3">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-medium">{translation.translator_name}</span>
                          <span className="text-muted-foreground text-xs">{translation.lang}</span>
                        </div>
                        <p>{translation.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "commentary" && (
                  <div className="space-y-3">
                    {verse.commentaries?.map((commentary, index) => (
                      <div key={index} className="bg-card rounded p-3">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-medium">{commentary.acharya}</span>
                          <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800">
                            {commentary.school}
                          </span>
                        </div>
                        <p className="text-sm">{commentary.text_en}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chapter navigation */}
      <div className="mt-6 flex justify-between">
        {chapter > 1 && (
          <button
            type="button"
            onClick={() =>
              (window.location.href = `/scriptures/${scriptureId}/chapter/${chapter - 1}`)
            }
            className="theme-chip hover:bg-muted rounded px-4 py-2 transition"
          >
            ← Previous Chapter
          </button>
        )}
        <button
          type="button"
          onClick={() =>
            (window.location.href = `/scriptures/${scriptureId}/chapter/${chapter + 1}`)
          }
          className="theme-chip-active rounded px-4 py-2 transition"
        >
          Next Chapter →
        </button>
      </div>
    </div>
  );
}
