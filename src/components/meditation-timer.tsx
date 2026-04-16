// src/components/meditation-timer.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  const [currentPhase, setCurrentPhase] = useState<
    "inhale" | "hold" | "exhale"
  >("inhale");

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
      const audioContext = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        400,
        audioContext.currentTime + 0.5,
      );

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 1,
      );

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
    <Card className={`mx-auto w-full max-w-md ${className}`}>
      <CardContent className="p-6">
        <div className="space-y-6 text-center">
          {/* Title */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Meditation Timer</h3>
            <p className="text-sm text-muted-foreground">
              {getPhaseInstruction()} • 4-4-4 Breathing
            </p>
          </div>

          {/* Timer Display */}
          <div className="space-y-4">
            <div className="font-mono text-6xl font-bold">
              {formatTime(timeLeft)}
            </div>

            {/* Progress Circle */}
            <div className="relative mx-auto h-32 w-32">
              <svg
                className="h-full w-full -rotate-90 transform"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted-foreground/20"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  className="text-orange-500 transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`h-4 w-4 rounded-full transition-colors ${
                    currentPhase === "inhale"
                      ? "bg-green-500"
                      : currentPhase === "hold"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Duration Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Duration: {duration} minutes
            </label>
            <Slider
              value={[duration]}
              onValueChange={(value: number[]) =>
                !isActive && setDuration(value[0])
              }
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
              <Button onClick={handleStart} size="lg" className="gap-2">
                <Play className="h-4 w-4" />
                Start
              </Button>
            ) : (
              <>
                <Button
                  onClick={handlePause}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <Pause className="h-4 w-4" />
                  {isPaused ? "Resume" : "Pause"}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </>
            )}

            <Button
              onClick={() => setSoundEnabled(!soundEnabled)}
              variant="ghost"
              size="lg"
              className="gap-2"
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Instructions */}
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>🫁 Follow the 4-4-4 breathing pattern</p>
            <p>🔔 Bell sound at completion</p>
            <p>⏸️ Pause anytime to continue later</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
