"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  CircleDot,
  History,
  Minus,
  RotateCcw,
  Save,
  Sparkles,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type MantraPreset = {
  id: string;
  name: string;
  devanagari: string;
  meaning: string;
  focus: string;
};

type SessionEntry = {
  id: string;
  mantraId: string;
  mantraName: string;
  count: number;
  goal: number;
  completedAt: string;
};

const STORAGE_KEY = "hind-ai-sadhana-counter";
const HISTORY_KEY = "hind-ai-sadhana-history";

const mantraPresets: MantraPreset[] = [
  {
    id: "om-namah-shivaya",
    name: "Om Namah Shivaya",
    devanagari: "ॐ नमः शिवाय",
    meaning: "I bow to Shiva, the auspicious inner consciousness.",
    focus: "Calm, discipline, inner steadiness",
  },
  {
    id: "hare-krishna",
    name: "Hare Krishna Mahamantra",
    devanagari: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे",
    meaning: "A devotional remembrance of Krishna and divine grace.",
    focus: "Bhakti, joy, devotional attention",
  },
  {
    id: "gayatri",
    name: "Gayatri Mantra",
    devanagari: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं",
    meaning: "A prayer for illumination, wisdom, and clarity.",
    focus: "Morning practice, study, clarity",
  },
  {
    id: "mahamrityunjaya",
    name: "Mahamrityunjaya Mantra",
    devanagari: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्",
    meaning: "A prayer associated with healing, courage, and resilience.",
    focus: "Healing, protection, strength",
  },
];

const goals = [27, 54, 108, 216, 1008];

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

const indianDateTimeFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
});

function formatDate(value: string) {
  return indianDateTimeFormat.format(new Date(value));
}

export function MantraCounter() {
  const [selectedMantraId, setSelectedMantraId] = useState(mantraPresets[0].id);
  const [goal, setGoal] = useState(108);
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<SessionEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const selectedMantra = useMemo(
    () => mantraPresets.find((mantra) => mantra.id === selectedMantraId) ?? mantraPresets[0],
    [selectedMantraId]
  );

  const progress = Math.min(100, Math.round((count / goal) * 100));
  const remaining = Math.max(goal - count, 0);
  const malaRounds = Math.floor(count / 108);

  useEffect(() => {
    const savedCounter = readJson(STORAGE_KEY, {
      selectedMantraId: mantraPresets[0].id,
      goal: 108,
      count: 0,
    });
    setSelectedMantraId(savedCounter.selectedMantraId);
    setGoal(savedCounter.goal);
    setCount(savedCounter.count);
    setHistory(readJson<SessionEntry[]>(HISTORY_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    const handleSetActiveMantra = (e: Event) => {
      const customEvent = e as CustomEvent<{ mantraId: string }>;
      if (customEvent.detail && customEvent.detail.mantraId) {
        setSelectedMantraId(customEvent.detail.mantraId);
        setCount(0);
      }
    };

    window.addEventListener("set-active-mantra", handleSetActiveMantra);
    return () => {
      window.removeEventListener("set-active-mantra", handleSetActiveMantra);
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedMantraId,
        goal,
        count,
      })
    );
  }, [count, goal, hydrated, selectedMantraId]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history, hydrated]);

  const increment = () => {
    const nextCount = count + 1;
    setCount(nextCount);

    trackEvent("sadhana_count_incremented", {
      mantra_id: selectedMantraId,
      count: nextCount,
      goal,
    });

    if (nextCount === 1) {
      trackEvent("sadhana_session_started", {
        mantra_id: selectedMantraId,
        goal,
      });
    }

    if ([27, 54, 108, 216, 1008].includes(nextCount)) {
      trackEvent("sadhana_milestone_reached", {
        mantra_id: selectedMantraId,
        count: nextCount,
      });
    }
  };

  const decrement = () => {
    setCount((current) => Math.max(0, current - 1));
  };

  const resetSession = () => {
    setCount(0);
    trackEvent("sadhana_session_reset", {
      mantra_id: selectedMantraId,
      goal,
    });
  };

  const completeSession = () => {
    if (count === 0) {
      return;
    }

    const entry: SessionEntry = {
      id: `${Date.now()}`,
      mantraId: selectedMantra.id,
      mantraName: selectedMantra.name,
      count,
      goal,
      completedAt: new Date().toISOString(),
    };

    setHistory((current) => [entry, ...current].slice(0, 8));
    setCount(0);
    trackEvent("sadhana_session_completed", {
      mantra_id: selectedMantra.id,
      count,
      goal,
      completed: count >= goal,
    });
  };

  const selectMantra = (mantraId: string) => {
    setSelectedMantraId(mantraId);
    trackEvent("sadhana_mantra_selected", { mantra_id: mantraId });
  };

  const selectGoal = (nextGoal: number) => {
    setGoal(nextGoal);
    trackEvent("sadhana_goal_changed", {
      mantra_id: selectedMantraId,
      goal: nextGoal,
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]" data-hydrated={hydrated}>
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border/60">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="eyebrow">Digital japa mala</p>
              <CardTitle className="mt-4 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
                {selectedMantra.name}
              </CardTitle>
              <p className="mt-3 font-devanagari text-3xl leading-snug text-primary">
                {selectedMantra.devanagari}
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm text-muted-foreground">
              <span className="block text-[11px] uppercase tracking-[0.24em]">Focus</span>
              <span className="mt-1 block text-foreground">{selectedMantra.focus}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
            {selectedMantra.meaning} Use this counter like a simple mala: tap once per chant, set
            your sankalpa, and save completed sessions locally on this device.
          </p>

          <div className="rounded-[28px] border border-primary/20 bg-primary/5 p-5 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  Current count
                </p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="font-serif text-7xl font-semibold leading-none text-foreground sm:text-8xl">
                    <span data-testid="sadhana-count">{count}</span>
                  </span>
                  <span className="pb-3 text-sm text-muted-foreground">of {goal}</span>
                </div>
              </div>
              <Button
                type="button"
                size="xl"
                variant="premium"
                onClick={increment}
                className="min-h-20 text-xl"
                aria-label={`Add one chant for ${selectedMantra.name}`}
              >
                <CircleDot className="size-6" />
                Chant
              </Button>
            </div>

            <div className="mt-7 space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{progress}% complete</span>
                <span>{remaining} remaining</span>
              </div>
              <Progress value={progress} className="h-3 bg-background/80" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-background/70 p-4">
                <Target className="mb-3 size-4 text-primary" />
                <p className="text-2xl font-semibold">{goal}</p>
                <p className="text-xs text-muted-foreground">Sankalpa goal</p>
              </div>
              <div className="rounded-2xl bg-background/70 p-4">
                <Sparkles className="mb-3 size-4 text-primary" />
                <p className="text-2xl font-semibold">{malaRounds}</p>
                <p className="text-xs text-muted-foreground">Full 108 malas</p>
              </div>
              <div className="rounded-2xl bg-background/70 p-4">
                <CheckCircle2 className="mb-3 size-4 text-primary" />
                <p className="text-2xl font-semibold">{history.length}</p>
                <p className="text-xs text-muted-foreground">Saved sessions</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={decrement} disabled={count === 0}>
              <Minus className="size-4" />
              Undo
            </Button>
            <Button type="button" variant="outline" onClick={resetSession} disabled={count === 0}>
              <RotateCcw className="size-4" />
              Reset
            </Button>
            <Button type="button" onClick={completeSession} disabled={count === 0}>
              <Save className="size-4" />
              Save session
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Target className="size-5 text-primary" />
              Choose goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {goals.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectGoal(option)}
                  className={cn(
                    "rounded-2xl border px-3 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50",
                    goal === option
                      ? "border-primary/50 bg-primary/15 text-primary"
                      : "border-border/70 bg-background/70 text-foreground hover:bg-secondary/70"
                  )}
                  aria-pressed={goal === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="size-5 text-primary" />
              Mantra library
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mantraPresets.map((mantra) => (
              <button
                key={mantra.id}
                type="button"
                onClick={() => selectMantra(mantra.id)}
                className={cn(
                  "w-full rounded-[22px] border p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50",
                  selectedMantraId === mantra.id
                    ? "border-primary/50 bg-primary/10"
                    : "border-border/70 bg-background/70 hover:bg-secondary/70"
                )}
                aria-pressed={selectedMantraId === mantra.id}
              >
                <span className="block text-sm font-semibold text-foreground">{mantra.name}</span>
                <span className="mt-1 block font-devanagari text-sm text-primary">
                  {mantra.devanagari}
                </span>
                <span className="mt-2 block text-xs leading-5 text-muted-foreground">
                  {mantra.focus}
                </span>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <History className="size-5 text-primary" />
              Recent sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <div className="space-y-3">
                {history.map((session) => (
                  <div
                    key={session.id}
                    className="rounded-2xl border border-border/70 bg-background/70 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold">{session.mantraName}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {session.count}/{session.goal} chants
                        </p>
                      </div>
                      <CalendarDays className="size-4 text-primary" />
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {formatDate(session.completedAt)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-6 text-muted-foreground">
                Save your first session to build a local practice history.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
