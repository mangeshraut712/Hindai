"use client";

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-muted/60 relative overflow-hidden rounded-xl ${className || ""}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export default function PanchangaLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background/72 border-border/60 sticky top-0 z-50 w-full border-b px-4 py-3 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
          <Skeleton className="size-11 rounded-full" />
          <div className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-full" />
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-card/84 border-border/60 rounded-[28px] border p-6 backdrop-blur-2xl">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="mt-4 h-8 w-3/4" />
              <Skeleton className="mt-3 h-4 w-full" />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-xl" />
                ))}
              </div>
            </div>
            <div className="bg-card/84 border-border/60 rounded-[28px] border p-6 backdrop-blur-2xl">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="mt-4 h-32 w-full rounded-xl" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-3/4" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
