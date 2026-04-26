"use client";

import { useState } from "react";
import { VerseWithLayers } from "@/lib/database/schema";

interface VerseReaderProps {
  verse: VerseWithLayers;
  onNext?: () => void;
  onPrevious?: () => void;
}

type TabType = "sanskrit" | "word-by-word" | "translation" | "commentary" | "anvaya";

export default function VerseReader({ verse, onNext, onPrevious }: VerseReaderProps) {
  const [activeTab, setActiveTab] = useState<TabType>("sanskrit");
  const [audioSpeed, setAudioSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const tabs: { id: TabType; label: string }[] = [
    { id: "sanskrit", label: "Sanskrit" },
    { id: "word-by-word", label: "Word-by-word" },
    { id: "anvaya", label: "Anvaya" },
    { id: "translation", label: "Translation" },
    { id: "commentary", label: "Commentary" },
  ];

  const handleSpeedChange = (speed: number) => {
    setAudioSpeed(speed);
    const audioElement = document.getElementById("verse-audio") as HTMLAudioElement;
    if (audioElement) {
      audioElement.playbackRate = speed;
    }
  };

  const togglePlay = () => {
    const audioElement = document.getElementById("verse-audio") as HTMLAudioElement;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      {/* Header with navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onPrevious}
          className="rounded bg-gray-200 px-4 py-2 transition hover:bg-gray-300"
        >
          ← Previous
        </button>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Chapter {verse.chapter}, Verse {verse.verse_num}
          </p>
          {verse.pada && <p className="text-xs text-gray-500">Pāda {verse.pada}</p>}
        </div>
        <button
          onClick={onNext}
          className="rounded bg-gray-200 px-4 py-2 transition hover:bg-gray-300"
        >
          Next →
        </button>
      </div>

      {/* Audio Player */}
      {verse.audio_url && (
        <div className="mb-4 rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
            <div className="flex gap-2">
              {[0.5, 0.75, 1, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`rounded px-3 py-1 ${
                    audioSpeed === speed ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {speed}×
                </button>
              ))}
            </div>
            {verse.audio?.some((a) => a.vedic_accents) && (
              <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800">
                Vedic Accents
              </span>
            )}
          </div>
          <audio
            id="verse-audio"
            src={verse.audio_url}
            onEnded={() => setIsPlaying(false)}
            className="mt-2 w-full"
          />
        </div>
      )}

      {/* Tab Navigation */}
      <div className="mb-4 flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === "sanskrit" && (
          <div className="space-y-4">
            <div className="rounded-lg bg-amber-50 p-4 text-center font-sans text-2xl">
              {verse.text_devanagari}
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center text-lg text-gray-700">
              {verse.text_iast}
            </div>
            {verse.meter && (
              <p className="text-center text-sm text-gray-500">Meter: {verse.meter}</p>
            )}
          </div>
        )}

        {activeTab === "word-by-word" && (
          <div className="space-y-2">
            {verse.word_analysis?.map((word, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded bg-gray-50 p-3 transition hover:bg-gray-100"
              >
                <span className="text-lg font-bold">{word.position}.</span>
                <div className="flex-1">
                  <div className="flex gap-4">
                    <span className="text-xl">{word.word_devanagari}</span>
                    <span className="text-gray-600">{word.word_iast}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Lemma: {word.lemma} | {word.case} | {word.number} | {word.gender}
                  </div>
                </div>
                <span className="text-blue-600">{word.meaning_en}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "anvaya" && (
          <div className="space-y-4">
            <div className="rounded-lg bg-green-50 p-4">
              <h3 className="mb-2 font-bold">Prose Word Order (Anvaya)</h3>
              <p className="text-lg">{verse.anvaya || "Anvaya analysis not available"}</p>
            </div>
            <p className="text-sm text-gray-600">
              The Anvaya layer shows the prose word order, which helps understand how Sanskrit
              poetry inverts word order for meter and emphasis.
            </p>
          </div>
        )}

        {activeTab === "translation" && (
          <div className="space-y-4">
            {verse.translations?.map((translation, index) => (
              <div key={index} className="rounded-lg bg-blue-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-bold">{translation.translator_name}</span>
                  <span className="text-sm text-gray-500">{translation.lang}</span>
                </div>
                {translation.tradition && (
                  <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800">
                    {translation.tradition}
                  </span>
                )}
                <p className="mt-2">{translation.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "commentary" && (
          <div className="space-y-4">
            {verse.commentaries?.map((commentary, index) => (
              <div key={index} className="rounded-lg bg-purple-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-bold">{commentary.acharya}</span>
                  <span className="rounded bg-purple-200 px-2 py-1 text-sm text-purple-800">
                    {commentary.school}
                  </span>
                </div>
                {commentary.century && (
                  <p className="text-xs text-gray-500">{commentary.century}</p>
                )}
                {commentary.text_sa && (
                  <p className="mt-2 text-sm italic text-gray-700">{commentary.text_sa}</p>
                )}
                <p className="mt-2">{commentary.text_en}</p>
                <p className="mt-2 text-xs text-gray-500">Source: {commentary.source}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <button className="text-sm text-gray-600 transition hover:text-blue-600">
          📝 Add Notes
        </button>
        <button className="text-sm text-gray-600 transition hover:text-blue-600">
          🔖 Bookmark
        </button>
        <button className="text-sm text-gray-600 transition hover:text-blue-600">🔗 Share</button>
      </div>
    </div>
  );
}
