"use client";

import { useState, useEffect } from "react";
import { VerseWithLayers } from "@/lib/database/schema";
import { FlashcardProgress } from "@/lib/database/schema";

interface StudyModeProps {
  scriptureId: string;
  chapter?: number;
}

export default function StudyMode({ scriptureId, chapter }: StudyModeProps) {
  const [verses, setVerses] = useState<VerseWithLayers[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showSanskrit, setShowSanskrit] = useState(true);
  const [showWordByWord, setShowWordByWord] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [quality, setQuality] = useState<number | null>(null);
  const [reviewed, setReviewed] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadVerses();
    loadStreak();
  }, [scriptureId, chapter]);

  const loadVerses = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = chapter
        ? `/api/scriptures/${scriptureId}/verses?chapter=${chapter}`
        : `/api/scriptures/${scriptureId}/verses`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to load verses");
      }
      const data = await response.json();
      setVerses(data.verses || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load verses");
    } finally {
      setLoading(false);
    }
  };

  const loadStreak = async () => {
    try {
      const response = await fetch("/api/user/streak");
      if (response.ok) {
        const data = await response.json();
        setStreak(data.streak || 0);
      }
    } catch (err) {
      console.error("Failed to load streak");
    }
  };

  const handleRate = async (rating: number) => {
    const currentVerse = verses[currentIndex];
    if (!currentVerse) return;

    try {
      await fetch("/api/sanskrit/learning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "review",
          userId: "current-user", // Would come from auth
          flashcardId: currentVerse.id,
          quality: rating,
        }),
      });

      setReviewed(new Set([...reviewed, currentIndex]));
      setSessionProgress((prev) => prev + 1);
      setQuality(rating);

      // Update streak if rating >= 3
      if (rating >= 3) {
        setStreak((prev) => prev + 1);
      } else {
        setStreak(0);
      }

      // Move to next card after short delay
      setTimeout(() => {
        setQuality(null);
        setShowTranslation(false);
        setShowWordByWord(false);
        if (currentIndex < verses.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 500);
    } catch (err) {
      console.error("Failed to save review");
    }
  };

  const toggleSanskrit = () => {
    setShowSanskrit(!showSanskrit);
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const toggleWordByWord = () => {
    setShowWordByWord(!showWordByWord);
  };

  const goToVerse = (index: number) => {
    setCurrentIndex(index);
    setShowTranslation(false);
    setShowWordByWord(false);
    setQuality(null);
  };

  const shuffleVerses = () => {
    const shuffled = [...verses].sort(() => Math.random() - 0.5);
    setVerses(shuffled);
    setCurrentIndex(0);
    setReviewed(new Set());
    setSessionProgress(0);
  };

  const currentVerse = verses[currentIndex];

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

  if (verses.length === 0) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-gray-600">No verses available for study</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Study Mode</h1>
          <p className="text-gray-600">
            {chapter ? `Chapter ${chapter}` : "All verses"} ({currentIndex + 1} / {verses.length})
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{streak}</div>
            <div className="text-xs text-gray-500">Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{sessionProgress}</div>
            <div className="text-xs text-gray-500">Reviewed</div>
          </div>
        </div>
      </div>

      {/* View options */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={toggleSanskrit}
          className={`rounded px-3 py-1 ${showSanskrit ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Sanskrit
        </button>
        <button
          onClick={toggleTranslation}
          className={`rounded px-3 py-1 ${
            showTranslation ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Translation
        </button>
        <button
          onClick={toggleWordByWord}
          className={`rounded px-3 py-1 ${
            showWordByWord ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Word-by-word
        </button>
        <button
          onClick={shuffleVerses}
          className="rounded bg-purple-100 px-3 py-1 text-purple-800 hover:bg-purple-200"
        >
          🔀 Shuffle
        </button>
      </div>

      {/* Flashcard */}
      {currentVerse && (
        <div className="mb-6 rounded-lg border-2 border-gray-200 bg-white p-6 shadow-lg">
          {/* Verse number */}
          <div className="mb-4 text-sm text-gray-500">
            Chapter {currentVerse.chapter}, Verse {currentVerse.verse_num}
          </div>

          {/* Sanskrit text */}
          {showSanskrit && (
            <div className="mb-4">
              <div className="rounded-lg bg-amber-50 p-4 text-center font-sans text-2xl">
                {currentVerse.text_devanagari}
              </div>
              <div className="mt-2 rounded-lg bg-gray-50 p-4 text-center text-lg text-gray-700">
                {currentVerse.text_iast}
              </div>
            </div>
          )}

          {/* Word-by-word */}
          {showWordByWord && currentVerse.word_analysis && (
            <div className="mb-4 rounded-lg bg-green-50 p-4">
              <h3 className="mb-2 font-bold">Word-by-word</h3>
              <div className="space-y-2">
                {currentVerse.word_analysis.map((word, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="font-bold">{word.position}.</span>
                    <span className="text-lg">{word.word_devanagari}</span>
                    <span className="text-gray-600">({word.word_iast})</span>
                    <span className="text-blue-600">→ {word.meaning_en}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Translation */}
          {showTranslation && currentVerse.translations && (
            <div className="mb-4 rounded-lg bg-blue-50 p-4">
              <h3 className="mb-2 font-bold">Translation</h3>
              {currentVerse.translations.map((translation, index) => (
                <div key={index} className="mb-2">
                  <span className="font-medium">{translation.translator_name}: </span>
                  <span>{translation.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Rating buttons */}
          {quality === null && (
            <div className="mt-6 border-t pt-4">
              <p className="mb-3 text-sm text-gray-600">How well did you remember?</p>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRate(rating)}
                    className={`rounded px-4 py-2 transition ${
                      rating <= 2
                        ? "bg-red-100 text-red-800 hover:bg-red-200"
                        : rating <= 3
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>0-2: Again</span>
                <span>3: Good</span>
                <span>4-5: Easy</span>
              </div>
            </div>
          )}

          {/* Quality feedback */}
          {quality !== null && (
            <div className="mt-6 border-t pt-4 text-center">
              <p className="text-lg font-medium">
                {quality <= 2 ? "Will review again soon" : quality <= 3 ? "Good!" : "Excellent!"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => goToVerse(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="rounded bg-gray-200 px-4 py-2 transition hover:bg-gray-300 disabled:opacity-50"
        >
          ← Previous
        </button>
        <button
          onClick={() => goToVerse(Math.min(verses.length - 1, currentIndex + 1))}
          disabled={currentIndex === verses.length - 1}
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          Next →
        </button>
      </div>

      {/* Progress grid */}
      <div className="mb-6">
        <h3 className="mb-2 font-bold">Session Progress</h3>
        <div className="sm:grid-cols-20 grid grid-cols-10 gap-1">
          {verses.map((verse, index) => (
            <button
              key={verse.id}
              onClick={() => goToVerse(index)}
              className={`rounded p-2 text-xs transition ${
                index === currentIndex
                  ? "bg-blue-600 text-white"
                  : reviewed.has(index)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {verse.verse_num}
            </button>
          ))}
        </div>
      </div>

      {/* Study tips */}
      <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
        <h3 className="mb-2 font-bold">Study Tips</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Hide the translation first, try to recall the meaning</li>
          <li>• Use word-by-word to understand grammar</li>
          <li>• Rate honestly for optimal spaced repetition</li>
          <li>• Review cards marked "Again" (0-2) more frequently</li>
          <li>• Maintain your streak by studying daily</li>
        </ul>
      </div>
    </div>
  );
}
