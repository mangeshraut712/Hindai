"use client";

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-muted/60 ${className || ""}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export default function ContentsLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/72 px-4 py-3 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
          <Skeleton className="size-11 rounded-full" />
          <div className="flex items-center gap-3">
            <Skeleton className="hidden h-9 w-24 rounded-full lg:block" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-4">
            <Skeleton className="h-6 w-40 rounded-full" />
            <Skeleton className="h-12 w-full max-w-lg" />
            <Skeleton className="h-16 w-full max-w-xl" />
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="rounded-[28px] border border-border/60 bg-card/84 p-6 backdrop-blur-2xl"
              >
                <Skeleton className="h-5 w-24" />
                <Skeleton className="mt-3 h-7 w-3/4" />
                <Skeleton className="mt-2 h-14 w-full" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
