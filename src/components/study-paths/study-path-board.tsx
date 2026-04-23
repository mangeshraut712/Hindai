"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bookmark, CheckCircle2, Download, GraduationCap, Share2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { studyPaths } from "@/lib/study-paths";

const STORAGE_KEY = "hindai.study-path-progress";

type SavedState = Record<
  string,
  {
    saved: boolean;
    completedStepIds: string[];
  }
>;

export function StudyPathBoard() {
  const [savedState, setSavedState] = useState<SavedState>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSavedState(JSON.parse(raw));
      }
    } catch {
      setSavedState({});
    }
  }, []);

  const persist = (next: SavedState) => {
    setSavedState(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const sharePath = async (pathId: string) => {
    const url = `${window.location.origin}/study-paths/#${pathId}`;
    if (navigator.share) {
      await navigator.share({
        title: "Hind AI Study Path",
        text: "Explore this guided study path on Hind AI.",
        url,
      });
      return;
    }

    await navigator.clipboard.writeText(url);
  };

  const exportPath = async (path: (typeof paths)[number]) => {
    const exportText = [
      path.title,
      path.summary,
      `Audience: ${path.audience}`,
      `Duration: ${path.duration}`,
      `Goal: ${path.goal}`,
      "",
      ...path.steps.map(
        (step, index) =>
          `${index + 1}. ${step.title}\n${step.description}\nOpen: ${window.location.origin}${step.href}`
      ),
    ].join("\n\n");

    await navigator.clipboard.writeText(exportText);
  };

  const paths = useMemo(
    () =>
      studyPaths.map((path) => {
        const state = savedState[path.id] || {
          saved: false,
          completedStepIds: [],
        };
        return {
          ...path,
          saved: state.saved,
          completedStepIds: state.completedStepIds,
          progress: Math.round((state.completedStepIds.length / path.steps.length) * 100),
        };
      }),
    [savedState]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {paths.map((path) => {
        const audienceIcon =
          path.audience === "teacher" ? (
            <Users className="size-5" />
          ) : (
            <GraduationCap className="size-5" />
          );

        return (
          <div key={path.id} id={path.id} className="surface-panel p-6">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {audienceIcon}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={path.saved ? "premium" : "outline"}
                    size="sm"
                    onClick={() =>
                      persist({
                        ...savedState,
                        [path.id]: {
                          saved: !path.saved,
                          completedStepIds: path.completedStepIds,
                        },
                      })
                    }
                  >
                    <Bookmark className="size-4" />
                    {path.saved ? "Saved" : "Save path"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => sharePath(path.id)}>
                    <Share2 className="size-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => exportPath(path)}>
                    <Download className="size-4" />
                    Export
                  </Button>
                </div>
              </div>

              <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                {path.audience} • {path.duration}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                {path.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{path.summary}</p>
              <p className="text-foreground/84 mt-3 text-sm leading-7">{path.goal}</p>

              <div className="mt-5 rounded-full border border-border/60 bg-background/75 px-4 py-2 text-xs text-muted-foreground">
                Progress: {path.progress}% complete
              </div>

              <div className="mt-6 space-y-3">
                {path.steps.map((step) => {
                  const completed = path.completedStepIds.includes(step.id);
                  return (
                    <div
                      key={step.id}
                      className="rounded-[22px] border border-border/60 bg-background/75 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{step.title}</p>
                          <p className="mt-2 text-xs leading-6 text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                        {completed ? <CheckCircle2 className="mt-0.5 size-5 text-primary" /> : null}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={step.href}>Open step</Link>
                        </Button>
                        <Button
                          variant={completed ? "secondary" : "ghost"}
                          size="sm"
                          onClick={() => {
                            const nextCompleted = completed
                              ? path.completedStepIds.filter((id) => id !== step.id)
                              : [...path.completedStepIds, step.id];

                            persist({
                              ...savedState,
                              [path.id]: {
                                saved: path.saved,
                                completedStepIds: nextCompleted,
                              },
                            });
                          }}
                        >
                          {completed ? "Undo" : "Mark complete"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
