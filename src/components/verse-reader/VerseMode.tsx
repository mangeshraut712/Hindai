"use client";

import { useState, useEffect } from "react";
import VerseReader from "./VerseReader";
import { VerseWithLayers } from "@/lib/database/schema";

interface VerseModeProps {
  scriptureId: string;
  initialChapter?: number;
  initialVerse?: number;
}

export default function VerseMode({
  scriptureId,
  initialChapter = 1,
  initialVerse = 1,
}: VerseModeProps) {
  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [currentVerse, setCurrentVerse] = useState(initialVerse);
  const [verse, setVerse] = useState<VerseWithLayers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    loadVerse();
  }, [currentChapter, currentVerse, scriptureId]);

  const loadVerse = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/scriptures/${scriptureId}/verses?chapter=${currentChapter}&verse=${currentVerse}`
      );
      if (!response.ok) {
        throw new Error("Failed to load verse");
      }
      const data = await response.json();
      setVerse(data.verse);

      // Load user progress
      await loadUserProgress();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load verse");
    } finally {
      setLoading(false);
    }
  };

  const loadUserProgress = async () => {
    try {
      const response = await fetch(
        `/api/user/progress?scripture_id=${scriptureId}&chapter=${currentChapter}&verse=${currentVerse}`
      );
      if (response.ok) {
        const data = await response.json();
        setIsBookmarked(data.progress?.bookmarked || false);
        setNotes(data.progress?.notes || "");
      }
    } catch (err) {
      console.error("Failed to load user progress");
    }
  };

  const handleNext = () => {
    setCurrentVerse((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentVerse > 1) {
      setCurrentVerse((prev) => prev - 1);
    }
  };

  const handleBookmark = async () => {
    try {
      const response = await fetch("/api/user/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scripture_id: scriptureId,
          chapter: currentChapter,
          verse_num: currentVerse,
          bookmarked: !isBookmarked,
        }),
      });
      if (response.ok) {
        setIsBookmarked(!isBookmarked);
      }
    } catch (err) {
      console.error("Failed to bookmark verse");
    }
  };

  const handleSaveNotes = async () => {
    try {
      const response = await fetch("/api/user/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scripture_id: scriptureId,
          chapter: currentChapter,
          verse_num: currentVerse,
          notes,
        }),
      });
      if (response.ok) {
        setShowNotes(false);
      }
    } catch (err) {
      console.error("Failed to save notes");
    }
  };

  const jumpToVerse = (chapter: number, verse: number) => {
    setCurrentChapter(chapter);
    setCurrentVerse(verse);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="animate-pulse">
          <div className="mb-4 h-8 rounded bg-gray-200"></div>
          <div className="h-64 rounded bg-gray-200"></div>
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

  if (!verse) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-gray-600">Verse not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Scripture header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Chapter {currentChapter}, Verse {currentVerse}
        </h1>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="rounded bg-gray-100 px-3 py-1 text-sm transition hover:bg-gray-200"
          >
            📝 {showNotes ? "Hide Notes" : "Show Notes"}
          </button>
          <button
            onClick={handleBookmark}
            className={`rounded px-3 py-1 text-sm transition ${
              isBookmarked ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            🔖 {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>
        </div>
      </div>

      {/* Notes panel */}
      {showNotes && (
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your notes here..."
            className="min-h-[100px] w-full rounded border p-2"
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleSaveNotes}
              className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Save Notes
            </button>
          </div>
        </div>
      )}

      {/* Verse reader */}
      <VerseReader verse={verse} onNext={handleNext} onPrevious={handlePrevious} />

      {/* Quick navigation */}
      <div className="mt-6 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-bold">Quick Navigation</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => jumpToVerse(currentChapter, 1)}
            className="rounded border bg-white px-3 py-1 transition hover:bg-gray-100"
          >
            Verse 1
          </button>
          <button
            onClick={() => jumpToVerse(currentChapter, Math.max(1, currentVerse - 10))}
            className="rounded border bg-white px-3 py-1 transition hover:bg-gray-100"
          >
            -10
          </button>
          <button
            onClick={() => jumpToVerse(currentChapter, currentVerse + 10)}
            className="rounded border bg-white px-3 py-1 transition hover:bg-gray-100"
          >
            +10
          </button>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={currentVerse}
              onChange={(e) => jumpToVerse(currentChapter, parseInt(e.target.value) || 1)}
              className="w-20 rounded border px-2 py-1"
            />
            <span className="text-sm text-gray-600">Go to verse</span>
          </div>
        </div>
      </div>

      {/* Chapter navigation */}
      <div className="mt-4 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-bold">Chapter Navigation</h3>
        <div className="flex flex-wrap gap-2">
          {currentChapter > 1 && (
            <button
              onClick={() => jumpToVerse(currentChapter - 1, 1)}
              className="rounded border bg-white px-3 py-1 transition hover:bg-gray-100"
            >
              ← Chapter {currentChapter - 1}
            </button>
          )}
          <button
            onClick={() => jumpToVerse(currentChapter + 1, 1)}
            className="rounded border bg-white px-3 py-1 transition hover:bg-gray-100"
          >
            Chapter {currentChapter + 1} →
          </button>
        </div>
      </div>
    </div>
  );
}
