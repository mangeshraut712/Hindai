"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { GemmaStudyPanel } from "@/components/ai/gemma-study-panel";
import { Button } from "@/components/ui/button";
import type { Recitation, RecitationLayer, RecitationVerse } from "@/lib/data/recitations/types";

const LAYERS: Array<{ id: RecitationLayer; label: string }> = [
  { id: "original", label: "Devanagari" },
  { id: "iast", label: "IAST" },
  { id: "english", label: "English" },
  { id: "note", label: "Note" },
];

function verseSpoken(original: string): string {
  return original.replace(/-\n/g, "").replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}

function layerText(verse: RecitationVerse, layer: RecitationLayer): string {
  switch (layer) {
    case "original":
      return verse.original;
    case "iast":
      return verse.iast;
    case "english":
      return verse.english;
    case "note":
      return verse.note;
    default: {
      const exhaustive: never = layer;
      return exhaustive;
    }
  }
}

export function RecitationReader({ recitation }: { recitation: Recitation }) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [layer, setLayer] = useState<RecitationLayer>("original");
  const [isPlaying, setIsPlaying] = useState(false);
  const [continueThrough, setContinueThrough] = useState(true);
  const [speechError, setSpeechError] = useState("");
  const playingRef = useRef(false);
  const continueRef = useRef(true);
  const sectionRef = useRef(0);

  const section = recitation.sections[sectionIndex] ?? recitation.sections[0];
  const showEnglish = recitation.sections.some((entry) =>
    entry.verses.some((verse) => verse.english.length > 0)
  );
  const showNote = recitation.sections.some((entry) =>
    entry.verses.some((verse) => verse.note.length > 0)
  );
  const layers = LAYERS.filter((entry) => {
    if (entry.id === "english") return showEnglish;
    if (entry.id === "note") return showNote;
    return true;
  });

  useEffect(() => {
    continueRef.current = continueThrough;
  }, [continueThrough]);

  useEffect(() => {
    sectionRef.current = sectionIndex;
  }, [sectionIndex]);

  useEffect(() => {
    return () => {
      playingRef.current = false;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stop = () => {
    playingRef.current = false;
    setIsPlaying(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const speakFrom = (index: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      playingRef.current = false;
      setIsPlaying(false);
      setSpeechError("Spoken playback is not supported in this browser. The text is on the page.");
      return;
    }
    const current = recitation.sections[index];
    if (!current) {
      stop();
      return;
    }
    setSpeechError("");
    setSectionIndex(index);
    sectionRef.current = index;
    window.speechSynthesis.cancel();
    const chunks = current.verses.map((verse) => verseSpoken(verse.original)).filter(Boolean);
    let cursor = 0;

    const speakNext = () => {
      if (!playingRef.current) return;
      if (cursor >= chunks.length) {
        const following = index + 1;
        if (continueRef.current && following < recitation.sections.length) {
          speakFrom(following);
          return;
        }
        playingRef.current = false;
        setIsPlaying(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(chunks[cursor] ?? "");
      cursor += 1;
      utterance.lang = "hi-IN";
      utterance.rate = 0.86;
      utterance.onend = () => speakNext();
      utterance.onerror = (event) => {
        if (!playingRef.current) return;
        if (event.error === "canceled" || event.error === "interrupted") return;
        playingRef.current = false;
        setIsPlaying(false);
        setSpeechError("Spoken playback stopped. Try again, or use another browser voice.");
      };
      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stop();
      return;
    }
    playingRef.current = true;
    setIsPlaying(true);
    speakFrom(sectionRef.current);
  };

  if (!section) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end gap-3">
        {recitation.sections.length > 1 ? (
          <label className="min-w-0 flex-1 text-sm text-muted-foreground">
            Section
            <select
              aria-label="Section"
              className="mt-2 block w-full max-w-full rounded-xl border border-border bg-background px-3 py-2 text-base text-foreground"
              value={section.id}
              onChange={(event) => {
                const next = recitation.sections.findIndex(
                  (entry) => entry.id === event.target.value
                );
                stop();
                setSectionIndex(next < 0 ? 0 : next);
              }}
            >
              {recitation.sections.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.titleEn}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <p className="text-sm text-muted-foreground">{section.verses.length} in this section</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" onClick={togglePlayback} aria-pressed={isPlaying}>
          {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
          {isPlaying ? "Stop" : "Listen"}
        </Button>
        {recitation.sections.length > 1 ? (
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={continueThrough}
              onChange={(event) => setContinueThrough(event.target.checked)}
            />
            Continue through the text
          </label>
        ) : null}
        <p className="flex min-w-0 items-start gap-2 text-sm leading-6 text-muted-foreground">
          <Volume2 className="mt-0.5 size-4 shrink-0" />
          <span>
            Browser voice reading the Devanagari. Pronunciation follows the installed voice.
          </span>
        </p>
      </div>

      {speechError ? (
        <p role="status" className="text-sm text-muted-foreground">
          {speechError}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Text layer">
        {layers.map((entry) => (
          <Button
            key={entry.id}
            type="button"
            size="sm"
            variant={layer === entry.id ? "default" : "outline"}
            role="tab"
            aria-selected={layer === entry.id}
            onClick={() => setLayer(entry.id)}
          >
            {entry.label}
          </Button>
        ))}
      </div>

      <div>
        <h2 className="font-serif text-2xl">{section.titleEn}</h2>
        <p className="mt-2 font-devanagari text-xl text-primary">{section.title}</p>
        <GemmaStudyPanel
          key={section.id}
          kind="mantra"
          title={`${recitation.title} · ${section.titleEn}`}
          context={section.verses.map((verse) => verse.original).join("\n")}
        />
      </div>

      <ol className="space-y-5">
        {section.verses.map((verse) => {
          const text = layerText(verse, layer);
          return (
            <li
              key={`${section.id}-${verse.number}`}
              className="surface-panel min-w-0 rounded-2xl p-5"
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-primary">
                {verse.label || String(verse.number).padStart(2, "0")}
              </p>
              <p
                className={`mt-3 whitespace-pre-line break-words text-lg leading-8 ${
                  layer === "original" || layer === "note" ? "font-devanagari" : ""
                }`}
              >
                {text || "—"}
              </p>
            </li>
          );
        })}
      </ol>

      {recitation.sections.length > 1 ? (
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={sectionIndex === 0}
            onClick={() => {
              stop();
              setSectionIndex((current) => Math.max(0, current - 1));
            }}
          >
            Previous section
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={sectionIndex >= recitation.sections.length - 1}
            onClick={() => {
              stop();
              setSectionIndex((current) => Math.min(recitation.sections.length - 1, current + 1));
            }}
          >
            Next section
          </Button>
        </div>
      ) : null}
    </div>
  );
}
