"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { GemmaStudyPanel } from "@/components/ai/gemma-study-panel";
import { Button } from "@/components/ui/button";
import type { AartiItem, AartiLayer } from "@/lib/data/ganesh-aarti-sangrah";

const LAYERS: Array<{ id: AartiLayer; label: string }> = [
  { id: "original", label: "Devanagari" },
  { id: "iast", label: "IAST" },
  { id: "english", label: "English" },
  { id: "meaning", label: "Marathi note" },
];

export function AartiReader({ item }: { item: AartiItem }) {
  const [layer, setLayer] = useState<AartiLayer>("original");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const spoken = useMemo(() => item.verses.map((verse) => verse.original).join("। "), [item]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSpeechError(
        "Spoken playback is not supported in this browser. The complete text is available below."
      );
      return false;
    }
    setSpeechError("");
    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(spoken);
    utterance.lang = "hi-IN";
    utterance.rate = 0.88;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = (event) => {
      setIsPlaying(false);
      if (event.error !== "canceled" && event.error !== "interrupted") {
        setSpeechError(
          "Spoken playback could not finish. Please try again or choose another browser voice."
        );
      }
    };
    window.speechSynthesis.speak(utterance);
    return true;
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (item.audioUrl && audio && !audioError) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        return;
      }
      try {
        await audio.play();
        setIsPlaying(true);
        return;
      } catch {
        setAudioError(true);
      }
    }
    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
      return;
    }
    if (speak()) {
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-8">
      {item.audioUrl ? (
        <audio
          ref={audioRef}
          src={item.audioUrl}
          preload="none"
          onEnded={() => setIsPlaying(false)}
          onError={() => setAudioError(true)}
        />
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" onClick={() => void togglePlayback()} aria-pressed={isPlaying}>
          {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
          {isPlaying ? (item.audioUrl && !audioError ? "Pause" : "Stop") : "Listen"}
        </Button>
        <p className="flex min-w-0 items-start gap-2 text-sm leading-6 text-muted-foreground">
          <Volume2 className="mt-0.5 size-4 shrink-0" />
          <span className="min-w-0">
            {item.audioUrl && !audioError
              ? (item.audioLabel ?? "Recorded audio")
              : "Browser voice reading the displayed Devanagari; pronunciation depends on the installed voice"}
          </span>
        </p>
      </div>

      {speechError ? (
        <p role="status" className="text-sm text-muted-foreground">
          {speechError}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Text layer">
        {LAYERS.map((entry) => (
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

      <ol className="space-y-5">
        {item.verses.map((verse) => {
          let text = verse.original;
          switch (layer) {
            case "original":
              text = verse.original;
              break;
            case "iast":
              text = verse.iast;
              break;
            case "english":
              text = verse.english;
              break;
            case "meaning":
              text = verse.meaning;
              break;
            default: {
              const exhaustive: never = layer;
              return exhaustive;
            }
          }
          return (
            <li key={verse.number} className="surface-panel rounded-2xl p-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary">
                {verse.label ?? String(verse.number).padStart(2, "0")}
              </p>
              <p
                className={`mt-3 whitespace-pre-line text-lg leading-8 ${
                  layer === "original" || layer === "meaning" ? "font-devanagari" : ""
                }`}
              >
                {text}
              </p>
            </li>
          );
        })}
      </ol>
      <GemmaStudyPanel
        kind="mantra"
        title={item.title}
        context={item.verses.map((verse) => verse.original).join("\n")}
      />
      {item.bookletNote ? (
        <aside className="surface-panel rounded-2xl p-5" aria-label="Printed booklet notes">
          <h2 className="text-sm font-semibold text-primary">Printed booklet notes</h2>
          <p className="mt-3 whitespace-pre-line font-devanagari text-lg leading-8">
            {item.bookletNote}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Devanagari follows the supplied booklet, pages {item.bookletPages}. IAST is a
            transliteration; English and Marathi notes explain the text.
          </p>
        </aside>
      ) : null}
    </div>
  );
}
