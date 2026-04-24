// src/components/meditation-timer.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { track } from "@vercel/analytics";

interface MeditationTimerProps {
  className?: string;
}

export function MeditationTimer({ className }: MeditationTimerProps) {
  const [duration, setDuration] = useState(5); // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60); // seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<"inhale" | "hold" | "exhale">("inhale");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const _audioRef = useRef<HTMLAudioElement | null>(null);
  const bellAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleTimerComplete = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    if (soundEnabled && bellAudioRef.current) {
      bellAudioRef.current.play().catch(() => {
        // Fallback: create a simple beep using Web Audio API
        createBellSound();
      });
    }
    track("meditation_completed", { duration });
  }, [soundEnabled, duration]);

  useEffect(() => {
    // Initialize audio (using Web Audio API for bell sounds)
    if (typeof window !== "undefined") {
      bellAudioRef.current = new Audio("/bell.mp3"); // You'll need to add a bell sound file
      bellAudioRef.current.volume = 0.3;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            handleTimerComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, isPaused, handleTimerComplete]);

  // Breathing guide effect
  useEffect(() => {
    if (isActive && !isPaused) {
      const breathingCycle = () => {
        // 4-4-4 breathing: 4s inhale, 4s hold, 4s exhale
        const cycleTime = Date.now() % 12000; // 12 second cycle

        if (cycleTime < 4000) {
          setCurrentPhase("inhale");
        } else if (cycleTime < 8000) {
          setCurrentPhase("hold");
        } else {
          setCurrentPhase("exhale");
        }
      };

      const breathingInterval = setInterval(breathingCycle, 100);
      return () => clearInterval(breathingInterval);
    }
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    track("meditation_started", { duration });
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    track("meditation_paused", { paused: !isPaused });
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(duration * 60);
    track("meditation_reset");
  };

  const createBellSound = () => {
    if (typeof window !== "undefined" && window.AudioContext) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case "inhale":
        return "Breathe In";
      case "hold":
        return "Hold";
      case "exhale":
        return "Breathe Out";
      default:
        return "Relax";
    }
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <div className={`surface-panel mx-auto w-full max-w-md p-7 ${className}`}>
      <div className="relative z-10 space-y-7 text-center">
        {/* Title */}
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
            Dhyana Timer
          </p>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">Meditation</h3>
          <p className="text-sm text-muted-foreground">
            {getPhaseInstruction()} <span className="mx-1 text-border">|</span> 4-4-4 Breathing
          </p>
        </div>

        {/* Timer Display */}
        <div className="space-y-5">
          <div className="font-serif text-6xl font-semibold tracking-[-0.04em] text-foreground">
            {formatTime(timeLeft)}
          </div>

          {/* Progress Circle */}
          <div className="relative mx-auto h-36 w-36">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-muted-foreground/15"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="text-primary transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`size-5 rounded-full shadow-lg transition-all duration-700 ${
                  currentPhase === "inhale"
                    ? "scale-110 bg-emerald-500 shadow-emerald-500/30"
                    : currentPhase === "hold"
                      ? "scale-100 bg-amber-400 shadow-amber-400/30"
                      : "scale-75 bg-sky-500 shadow-sky-500/30"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Duration Selector */}
        <div className="space-y-3 px-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-semibold text-foreground">{duration} min</span>
          </div>
          <Slider
            value={[duration]}
            onValueChange={(value: number[]) => !isActive && setDuration(value[0])}
            min={1}
            max={60}
            step={1}
            className="w-full"
            disabled={isActive}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-2">
          {!isActive ? (
            <Button onClick={handleStart} variant="premium" size="lg" className="gap-2">
              <Play className="h-4 w-4" />
              Begin
            </Button>
          ) : (
            <>
              <Button onClick={handlePause} variant="outline" size="lg" className="gap-2">
                <Pause className="h-4 w-4" />
                {isPaused ? "Resume" : "Pause"}
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </>
          )}

          <Button
            onClick={() => setSoundEnabled(!soundEnabled)}
            variant="ghost"
            size="icon"
            className="size-10 rounded-full"
            aria-label={soundEnabled ? "Disable bell sound" : "Enable bell sound"}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-primary" />
            ) : (
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>

        {/* Instructions */}
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <p>Follow the 4-4-4 breathing pattern</p>
          <p>Bell sound marks completion</p>
          <p>Pause anytime to continue later</p>
        </div>
      </div>
    </div>
  );
}
