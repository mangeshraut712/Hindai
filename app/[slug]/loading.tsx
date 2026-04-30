"use client";

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-muted/60 ${className || ""}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export default function ScriptureLoading() {
  return (
    <div className="flex min-h-screen flex-col">
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
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:px-8">
            <div className="max-w-4xl space-y-8">
              <Skeleton className="h-7 w-40 rounded-full" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-16 w-full max-w-lg sm:h-20" />
                <Skeleton className="h-24 w-full max-w-xl" />
              </div>
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>
            </div>
            <div className="bg-card/84 rounded-[28px] border border-border/60 p-6 backdrop-blur-2xl">
              <Skeleton className="h-5 w-32 rounded-full" />
              <Skeleton className="mt-4 h-12 w-full" />
              <Skeleton className="mt-3 h-16 w-full" />
              <div className="mt-6 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-[22px]" />
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <Skeleton className="h-10 w-32 rounded-full" />
                <Skeleton className="h-10 w-36 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-10">
            <div className="max-w-3xl space-y-4">
              <Skeleton className="h-5 w-32 rounded-full" />
              <Skeleton className="h-14 w-full max-w-md sm:h-16" />
              <Skeleton className="h-20 w-full max-w-xl" />
            </div>
            <Skeleton className="h-[400px] w-full rounded-[28px]" />
          </div>
        </section>
      </main>
    </div>
  );
}
