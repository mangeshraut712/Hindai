// src/components/voice-search.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@vercel/analytics";

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
  placeholder?: string;
  className?: string;
}

export function VoiceSearch({
  onResult,
  placeholder: _placeholder = "Speak to search...",
  className,
}: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if (
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      setIsSupported(true);

      // Initialize speech recognition
      const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-IN,en-US"; // Support English with Indian accent

      recognition.onstart = () => {
        setIsListening(true);
        track("voice_search_started");
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(finalTranscript);
          onResult(finalTranscript);
          track("voice_search_result", {
            transcript: finalTranscript,
            length: finalTranscript.length,
          });
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        track("voice_search_error", { error: event.error });
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(finalTranscript);
          onResult(finalTranscript);
          track("voice_search_result", {
            transcript: finalTranscript,
            length: finalTranscript.length,
          });
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        track("voice_search_error", { error: event.error });
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onResult]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript("");
      recognitionRef.current.start();
    }
  };

  if (!isSupported) {
    return null; // Hide if not supported
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleListening}
        disabled={!isSupported}
        className={`gap-2 transition-colors ${
          isListening
            ? "border-red-300 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-700 dark:bg-red-950 dark:text-red-300"
            : "hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 dark:hover:border-orange-700 dark:hover:bg-orange-950"
        }`}
        aria-label={isListening ? "Stop voice search" : "Start voice search"}
        aria-pressed={isListening}
      >
        {isListening ? (
          <>
            <MicOff className="h-4 w-4" />
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <Mic className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">{isListening ? "Listening..." : "Voice"}</span>
      </Button>

      {transcript && (
        <div className="max-w-xs truncate text-sm text-muted-foreground" title={transcript}>
          &ldquo;{transcript}&rdquo;
        </div>
      )}
    </div>
  );
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}
