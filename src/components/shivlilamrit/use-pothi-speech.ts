"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReaderLocale } from "@/lib/data/shivlilamrit/catalog";
import {
  browserSpeechLang,
  pickIndianVoice,
  prepareRecitation,
  recitationChunks,
} from "@/lib/data/shivlilamrit/recitation";
import { appUrl } from "@/lib/runtime/app-fetch";

const CLOUD_CHAR_LIMIT = 1800;

export function usePothiSpeech(lines: string[], locale: ReaderLocale) {
  const [playing, setPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(0);
  const linesRef = useRef(lines);
  const localeRef = useRef(locale);
  const keepAliveRef = useRef(0);
  const cancelledRef = useRef(false);
  linesRef.current = lines;
  localeRef.current = locale;

  const clearKeepAlive = () => {
    if (keepAliveRef.current) {
      window.clearInterval(keepAliveRef.current);
      keepAliveRef.current = 0;
    }
  };

  const stop = useCallback(() => {
    cancelledRef.current = true;
    clearKeepAlive();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setPlaying(false);
    setActiveLine(null);
    setStatus("");
  }, []);

  useEffect(() => () => stop(), [stop]);

  const waitForVoices = () =>
    new Promise<SpeechSynthesisVoice[]>((resolve) => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
        return;
      }
      const done = () => {
        window.speechSynthesis.removeEventListener("voiceschanged", done);
        resolve(window.speechSynthesis.getVoices());
      };
      window.speechSynthesis.addEventListener("voiceschanged", done);
      window.setTimeout(done, 400);
    });

  const speakNextBrowser = useCallback(() => {
    if (cancelledRef.current || !("speechSynthesis" in window)) {
      return;
    }
    const queue = linesRef.current;
    const localeNow = localeRef.current;
    const index = indexRef.current;
    if (index >= queue.length) {
      clearKeepAlive();
      setPlaying(false);
      setActiveLine(null);
      setStatus("");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      prepareRecitation(queue[index] ?? "", localeNow)
    );
    utterance.lang = browserSpeechLang(localeNow);
    utterance.rate = 0.82;
    const voice = pickIndianVoice(window.speechSynthesis.getVoices(), localeNow);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.onstart = () => {
      setActiveLine(index);
      setStatus(
        `Listening ${index + 1}/${queue.length}` + (voice ? ` · ${voice.name}` : " · browser voice")
      );
    };
    utterance.onend = () => {
      if (cancelledRef.current) {
        return;
      }
      indexRef.current += 1;
      speakNextBrowser();
    };
    utterance.onerror = () => {
      if (cancelledRef.current) {
        return;
      }
      indexRef.current += 1;
      speakNextBrowser();
    };
    window.speechSynthesis.speak(utterance);
  }, []);

  const speak = useCallback(async () => {
    if (playing) {
      stop();
      return;
    }
    const queue = linesRef.current.filter((line) => line.trim());
    if (queue.length === 0) {
      setStatus("Nothing to read yet. Wait for the ovis to load.");
      return;
    }
    cancelledRef.current = false;
    indexRef.current = 0;
    setPlaying(true);

    const chunks = recitationChunks(queue, localeRef.current, CLOUD_CHAR_LIMIT);
    const shortEnough = chunks.length === 1 && (chunks[0]?.length ?? 0) <= CLOUD_CHAR_LIMIT;
    if (shortEnough) {
      try {
        const response = await fetch(appUrl("/api/pothi/speak"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: chunks[0], locale: localeRef.current }),
        });
        const payload = (await response.json()) as { base64?: string; mime?: string };
        if (payload.base64 && payload.mime && !cancelledRef.current) {
          const bytes = Uint8Array.from(atob(payload.base64), (char) => char.charCodeAt(0));
          const blob = new Blob([bytes], { type: payload.mime });
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audioRef.current = audio;
          audio.onended = () => {
            setPlaying(false);
            setActiveLine(null);
            setStatus("");
          };
          await audio.play();
          setActiveLine(0);
          setStatus("Listening · Sarvam Marathi/Hindi voice");
          return;
        }
      } catch {
        // Browser recitation below.
      }
    }

    if (!("speechSynthesis" in window)) {
      setPlaying(false);
      setStatus("This browser cannot speak. Try Chrome or Safari.");
      return;
    }
    await waitForVoices();
    clearKeepAlive();
    keepAliveRef.current = window.setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 8000);
    speakNextBrowser();
  }, [playing, speakNextBrowser, stop]);

  return { playing, activeLine, status, speak, stop };
}
