"use client";

import { Sparkles } from "lucide-react";

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-muted/60 ${className || ""}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export default function AIGuideLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Skeleton */}
      <header className="bg-background/72 sticky top-0 z-50 w-full border-b border-border/60 px-4 py-3 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="size-11 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="hidden h-9 w-24 rounded-full lg:block" />
            <Skeleton className="hidden h-9 w-24 rounded-full lg:block" />
            <Skeleton className="hidden h-9 w-28 rounded-full sm:block" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="max-w-3xl space-y-6">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-16 w-full max-w-2xl" />
                <Skeleton className="h-16 w-full max-w-xl" />
                <Skeleton className="h-24 w-full max-w-lg" />
              </div>
              <div className="bg-card/84 rounded-[28px] border border-border/60 p-6 backdrop-blur-2xl lg:ml-auto">
                <Skeleton className="h-5 w-24 rounded-full" />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-12 rounded-[20px]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Section */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="bg-card/84 min-h-[500px] rounded-[28px] border border-border/60 p-6 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <Sparkles className="size-5 animate-pulse text-muted-foreground" />
                <Skeleton className="h-7 w-48" />
              </div>
              <div className="mt-6 space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="size-10 shrink-0 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4 rounded-lg" />
                      <Skeleton className="h-4 w-1/2 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-card/84 rounded-[28px] border border-border/60 p-6 backdrop-blur-2xl"
                >
                  <Skeleton className="size-11 rounded-full" />
                  <Skeleton className="mt-5 h-8 w-3/4" />
                  <Skeleton className="mt-3 h-16 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
