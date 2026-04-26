"use client";

import { useState, useEffect } from "react";
import { VerseWithLayers } from "@/lib/database/schema";

interface ChapterModeProps {
  scriptureId: string;
  chapter: number;
}

export default function ChapterMode({ scriptureId, chapter }: ChapterModeProps) {
  const [verses, setVerses] = useState<VerseWithLayers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedVerse, setExpandedVerse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"sanskrit" | "translation" | "commentary">("sanskrit");
  const [readingProgress, setReadingProgress] = useState(0);
  const [chapterSummary, setChapterSummary] = useState<string | null>(null);

  useEffect(() => {
    loadChapter();
  }, [scriptureId, chapter]);

  const loadChapter = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/scriptures/${scriptureId}/verses?chapter=${chapter}`);
      if (!response.ok) {
        throw new Error("Failed to load chapter");
      }
      const data = await response.json();
      setVerses(data.verses || []);

      // Load chapter summary
      await loadChapterSummary();

      // Load reading progress
      await loadReadingProgress();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load chapter");
    } finally {
      setLoading(false);
    }
  };

  const loadChapterSummary = async () => {
    try {
      const response = await fetch(`/api/scriptures/${scriptureId}/summary?chapter=${chapter}`);
      if (response.ok) {
        const data = await response.json();
        setChapterSummary(data.summary);
      }
    } catch (err) {
      console.error("Failed to load chapter summary");
    }
  };

  const loadReadingProgress = async () => {
    try {
      const response = await fetch(
        `/api/user/progress?scripture_id=${scriptureId}&chapter=${chapter}`
      );
      if (response.ok) {
        const data = await response.json();
        const completed = data.progress?.filter((p: any) => p.completed).length || 0;
        const total = verses.length;
        setReadingProgress(total > 0 ? (completed / total) * 100 : 0);
      }
    } catch (err) {
      console.error("Failed to load reading progress");
    }
  };

  const toggleVerse = (verseNum: number) => {
    setExpandedVerse(expandedVerse === verseNum ? null : verseNum);
  };

  const markAsRead = async (verseNum: number) => {
    try {
      await fetch("/api/user/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scripture_id: scriptureId,
          chapter,
          verse_num: verseNum,
          completed: true,
        }),
      });
      await loadReadingProgress();
    } catch (err) {
      console.error("Failed to mark verse as read");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="animate-pulse">
          <div className="mb-4 h-8 rounded bg-gray-200"></div>
          <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-16 rounded bg-gray-200"></div>
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
        <h1 className="text-2xl font-bold text-gray-800">Chapter {chapter}</h1>

        {/* Reading progress */}
        <div className="mt-2">
          <div className="mb-1 flex justify-between text-sm text-gray-600">
            <span>Reading Progress</span>
            <span>{Math.round(readingProgress)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{ width: `${readingProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Chapter summary */}
      {chapterSummary && (
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 font-bold">Chapter Summary</h3>
          <p className="text-gray-700">{chapterSummary}</p>
        </div>
      )}

      {/* Tab navigation for expanded view */}
      {expandedVerse !== null && (
        <div className="mb-4 flex border-b">
          {["sanskrit", "translation", "commentary"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-medium transition ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
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
              expandedVerse === verse.verse_num ? "border-blue-500" : "border-gray-200"
            }`}
          >
            {/* Verse header (always visible) */}
            <div
              className="cursor-pointer p-4 transition hover:bg-gray-50"
              onClick={() => toggleVerse(verse.verse_num)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-700">{verse.verse_num}.</span>
                  <span className="text-lg">{verse.text_devanagari}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(verse.verse_num);
                    }}
                    className="rounded bg-green-100 px-2 py-1 text-sm text-green-800 transition hover:bg-green-200"
                  >
                    ✓
                  </button>
                  <span className="text-gray-400">
                    {expandedVerse === verse.verse_num ? "▼" : "▶"}
                  </span>
                </div>
              </div>
            </div>

            {/* Expanded content */}
            {expandedVerse === verse.verse_num && (
              <div className="border-t bg-gray-50 p-4">
                {activeTab === "sanskrit" && (
                  <div className="space-y-2">
                    <div className="text-xl">{verse.text_devanagari}</div>
                    <div className="text-gray-600">{verse.text_iast}</div>
                    {verse.word_analysis && verse.word_analysis.length > 0 && (
                      <div className="mt-4">
                        <h4 className="mb-2 font-bold">Word-by-word</h4>
                        <div className="space-y-1">
                          {verse.word_analysis.map((word, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{word.word_devanagari}</span>
                              <span className="ml-2 text-gray-500">
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
                      <div key={index} className="rounded bg-white p-3">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-medium">{translation.translator_name}</span>
                          <span className="text-xs text-gray-500">{translation.lang}</span>
                        </div>
                        <p>{translation.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "commentary" && (
                  <div className="space-y-3">
                    {verse.commentaries?.map((commentary, index) => (
                      <div key={index} className="rounded bg-white p-3">
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
            onClick={() =>
              (window.location.href = `/scriptures/${scriptureId}/chapter/${chapter - 1}`)
            }
            className="rounded bg-gray-200 px-4 py-2 transition hover:bg-gray-300"
          >
            ← Previous Chapter
          </button>
        )}
        <button
          onClick={() =>
            (window.location.href = `/scriptures/${scriptureId}/chapter/${chapter + 1}`)
          }
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Next Chapter →
        </button>
      </div>
    </div>
  );
}
