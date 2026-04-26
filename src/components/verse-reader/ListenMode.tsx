"use client";

import { useState, useEffect, useRef } from "react";
import { VerseWithLayers } from "@/lib/database/schema";

interface ListenModeProps {
  scriptureId: string;
  chapter: number;
}

export default function ListenMode({ scriptureId, chapter }: ListenModeProps) {
  const [verses, setVerses] = useState<VerseWithLayers[]>([]);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    loadChapter();
  }, [scriptureId, chapter]);

  useEffect(() => {
    // Auto-advance to next verse when current audio ends
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        if (currentVerseIndex < verses.length - 1) {
          setCurrentVerseIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      };
      audio.addEventListener("ended", handleEnded);
      return () => audio.removeEventListener("ended", handleEnded);
    }
  }, [currentVerseIndex, verses.length]);

  useEffect(() => {
    // Play audio when isPlaying changes
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    // Update playback speed
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    // Handle sleep timer
    if (sleepTimer !== null) {
      const timeout = setTimeout(
        () => {
          setIsPlaying(false);
          setSleepTimer(null);
        },
        sleepTimer * 60 * 1000
      ); // Convert minutes to milliseconds
      return () => clearTimeout(timeout);
    }
  }, [sleepTimer]);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load chapter");
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const setSleepTimerMinutes = (minutes: number) => {
    setSleepTimer(minutes);
  };

  const clearSleepTimer = () => {
    setSleepTimer(null);
  };

  const goToVerse = (index: number) => {
    setCurrentVerseIndex(index);
  };

  const currentVerse = verses[currentVerseIndex];

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

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Listen Mode</h1>
        <p className="text-gray-600">Chapter {chapter}</p>
      </div>

      {/* Audio Player */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4">
        {currentVerse?.audio_url ? (
          <audio
            ref={audioRef}
            src={currentVerse.audio_url}
            onLoadedMetadata={() => {
              if (isPlaying && audioRef.current) {
                audioRef.current.play();
              }
            }}
            className="w-full"
          />
        ) : (
          <p className="text-gray-500">No audio available for this verse</p>
        )}

        {/* Playback controls */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Speed:</span>
            {[0.5, 0.75, 1, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`rounded px-3 py-1 ${
                  playbackSpeed === speed
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {speed}×
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sleep Timer:</span>
            <select
              value={sleepTimer || ""}
              onChange={(e) => setSleepTimerMinutes(parseInt(e.target.value) || 0)}
              className="rounded border px-3 py-1"
            >
              <option value="">Off</option>
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="45">45 min</option>
              <option value="60">1 hour</option>
            </select>
            {sleepTimer && (
              <button onClick={clearSleepTimer} className="text-sm text-red-600 hover:text-red-800">
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Current verse display */}
      {currentVerse && (
        <div className="mb-6 rounded-lg border-2 border-amber-300 bg-amber-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-bold text-gray-700">Verse {currentVerse.verse_num}</span>
            <span className="text-sm text-gray-500">
              {currentVerseIndex + 1} / {verses.length}
            </span>
          </div>

          <div className="mb-4 text-center font-sans text-2xl">{currentVerse.text_devanagari}</div>

          <div className="mb-4 text-center text-lg text-gray-700">{currentVerse.text_iast}</div>

          {/* Pada-by-pada highlighting */}
          {currentVerse.word_analysis && (
            <div className="mt-4 border-t border-amber-200 pt-4">
              <h4 className="mb-2 font-bold">Word-by-word</h4>
              <div className="flex flex-wrap gap-2">
                {currentVerse.word_analysis.map((word, index) => (
                  <span key={index} className="rounded border border-amber-200 bg-white px-3 py-1">
                    <span className="font-medium">{word.word_devanagari}</span>
                    <span className="ml-1 text-gray-500">({word.meaning_en})</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Translation */}
          {currentVerse.translations && currentVerse.translations.length > 0 && (
            <div className="mt-4 border-t border-amber-200 pt-4">
              <h4 className="mb-2 font-bold">Translation</h4>
              <p className="text-gray-700">{currentVerse.translations[0].text}</p>
            </div>
          )}
        </div>
      )}

      {/* Verse list with progress */}
      <div className="mb-6">
        <h3 className="mb-2 font-bold">Chapter Verses</h3>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
          {verses.map((verse, index) => (
            <button
              key={verse.id}
              onClick={() => goToVerse(index)}
              className={`rounded p-2 text-center transition ${
                index === currentVerseIndex
                  ? "bg-blue-600 text-white"
                  : index < currentVerseIndex
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {verse.verse_num}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => goToVerse(Math.max(0, currentVerseIndex - 1))}
          disabled={currentVerseIndex === 0}
          className="rounded bg-gray-200 px-4 py-2 transition hover:bg-gray-300 disabled:opacity-50"
        >
          ← Previous
        </button>
        <button
          onClick={() => goToVerse(Math.min(verses.length - 1, currentVerseIndex + 1))}
          disabled={currentVerseIndex === verses.length - 1}
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          Next →
        </button>
      </div>

      {/* Auto-play toggle */}
      <div className="mt-4 rounded-lg bg-gray-50 p-4">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={isPlaying}
            onChange={(e) => setIsPlaying(e.target.checked)}
            className="h-5 w-5"
          />
          <span className="font-medium">Auto-play verses</span>
        </label>
        <p className="mt-1 text-sm text-gray-600">
          When enabled, audio will automatically advance to the next verse
        </p>
      </div>
    </div>
  );
}
