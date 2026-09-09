"use client";

import { useState } from "react";
import { VerseWithLayers } from "@/lib/database/schema";
import { getLocalStreak, recordLocalReview } from "@/lib/progress/local-progress";
import { listLocalVerses } from "@/lib/scripture/local-scripture-api";

interface StudyModeProps {
  scriptureId: string;
  chapter?: number;
}

function versesForStudy(
  scriptureId: string,
  chapter?: number
): { verses: VerseWithLayers[]; error: string | null } {
  try {
    const loaded = listLocalVerses(scriptureId, chapter);
    return {
      verses: loaded,
      error: loaded.length ? null : "No verses available in the local scripture index.",
    };
  } catch (err) {
    return {
      verses: [],
      error: err instanceof Error ? err.message : "Failed to load verses",
    };
  }
}

export default function StudyMode({ scriptureId, chapter }: StudyModeProps) {
  const [verses, setVerses] = useState(() => versesForStudy(scriptureId, chapter).verses);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showSanskrit, setShowSanskrit] = useState(true);
  const [showWordByWord, setShowWordByWord] = useState(false);
  const [error, setError] = useState(() => versesForStudy(scriptureId, chapter).error);
  const [streak, setStreak] = useState(() => getLocalStreak());
  const [sessionProgress, setSessionProgress] = useState(0);
  const [quality, setQuality] = useState<number | null>(null);
  const [reviewed, setReviewed] = useState<Set<number>>(new Set());

  const [prevProps, setPrevProps] = useState({ scriptureId, chapter });

  if (scriptureId !== prevProps.scriptureId || chapter !== prevProps.chapter) {
    const next = versesForStudy(scriptureId, chapter);
    setPrevProps({ scriptureId, chapter });
    setError(next.error);
    setVerses(next.verses);
    setCurrentIndex(0);
    setReviewed(new Set());
    setSessionProgress(0);
    setQuality(null);
  }

  const handleRate = (rating: number) => {
    const currentVerse = verses[currentIndex];
    if (!currentVerse) return;

    try {
      const nextStreak = recordLocalReview(rating);
      setReviewed(new Set([...reviewed, currentIndex]));
      setSessionProgress((prev) => prev + 1);
      setQuality(rating);
      setStreak(nextStreak);

      // Move to next card after short delay
      setTimeout(() => {
        setQuality(null);
        setShowTranslation(false);
        setShowWordByWord(false);
        if (currentIndex < verses.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 500);
    } catch {
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
        <div className="rounded-lg border border-border bg-muted p-4">
          <p className="text-muted-foreground">No verses available for study</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Study Mode</h1>
          <p className="text-muted-foreground">
            {chapter ? `Chapter ${chapter}` : "All verses"} ({currentIndex + 1} / {verses.length})
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{streak}</div>
            <div className="text-xs text-muted-foreground">Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{sessionProgress}</div>
            <div className="text-xs text-muted-foreground">Reviewed</div>
          </div>
        </div>
      </div>

      {/* View options */}
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={toggleSanskrit}
          className={`rounded px-3 py-1 ${showSanskrit ? "theme-chip-active" : "theme-chip"}`}
        >
          Sanskrit
        </button>
        <button
          type="button"
          onClick={toggleTranslation}
          className={`rounded px-3 py-1 ${showTranslation ? "theme-chip-active" : "theme-chip"}`}
        >
          Translation
        </button>
        <button
          type="button"
          onClick={toggleWordByWord}
          className={`rounded px-3 py-1 ${showWordByWord ? "theme-chip-active" : "theme-chip"}`}
        >
          Word-by-word
        </button>
        <button type="button" onClick={shuffleVerses} className="theme-chip rounded">
          🔀 Shuffle
        </button>
      </div>

      {/* Flashcard */}
      {currentVerse && (
        <div className="mb-6 rounded-lg border-2 border-border bg-card p-6 shadow-lg">
          {/* Verse number */}
          <div className="mb-4 text-sm text-muted-foreground">
            Chapter {currentVerse.chapter}, Verse {currentVerse.verse_num}
          </div>

          {/* Sanskrit text */}
          {showSanskrit && (
            <div className="mb-4">
              <div className="theme-panel-soft rounded-lg p-4 text-center font-sans text-2xl">
                {currentVerse.text_devanagari}
              </div>
              <div className="mt-2 rounded-lg bg-muted p-4 text-center text-lg text-foreground/80">
                {currentVerse.text_iast}
              </div>
            </div>
          )}

          {/* Word-by-word */}
          {showWordByWord && currentVerse.word_analysis && (
            <div className="theme-success mb-4 rounded-lg p-4">
              <h3 className="mb-2 font-bold">Word-by-word</h3>
              <div className="space-y-2">
                {currentVerse.word_analysis.map((word, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="font-bold">{word.position}.</span>
                    <span className="text-lg">{word.word_devanagari}</span>
                    <span className="text-muted-foreground">({word.word_iast})</span>
                    <span className="text-primary">→ {word.meaning_en}</span>
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
              <p className="mb-3 text-sm text-muted-foreground">How well did you remember?</p>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <button
                    type="button"
                    key={rating}
                    onClick={() => handleRate(rating)}
                    className={`rounded px-4 py-2 transition ${
                      rating <= 2
                        ? "bg-red-100 text-red-800 hover:bg-red-200"
                        : rating <= 3
                          ? "theme-callout hover:bg-yellow-200"
                          : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
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
          type="button"
          onClick={() => goToVerse(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="theme-chip rounded px-4 py-2 transition hover:bg-muted disabled:opacity-50"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={() => goToVerse(Math.min(verses.length - 1, currentIndex + 1))}
          disabled={currentIndex === verses.length - 1}
          className="theme-chip-active rounded px-4 py-2 transition disabled:opacity-50"
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
              type="button"
              key={verse.id}
              onClick={() => goToVerse(index)}
              className={`rounded p-2 text-xs transition ${
                index === currentIndex
                  ? "theme-chip-active"
                  : reviewed.has(index)
                    ? "theme-success0 text-white"
                    : "theme-chip hover:bg-muted"
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
        <ul className="space-y-1 text-sm text-foreground/80">
          <li>• Hide the translation first, try to recall the meaning</li>
          <li>• Use word-by-word to understand grammar</li>
          <li>• Rate honestly for optimal spaced repetition</li>
          <li>• Review cards marked &quot;Again&quot; (0-2) more frequently</li>
          <li>• Maintain your streak by studying daily</li>
        </ul>
      </div>
    </div>
  );
}
