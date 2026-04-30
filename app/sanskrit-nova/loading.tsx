"use client";

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-muted/60 ${className || ""}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export default function SanskritNovaLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background/72 sticky top-0 z-50 w-full border-b border-border/60 px-4 py-3 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
          <Skeleton className="size-11 rounded-full" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-10 w-full max-w-lg" />
            <Skeleton className="h-16 w-full max-w-xl" />
          </div>

          <div className="bg-card/84 min-h-[400px] rounded-[28px] border border-border/60 p-6 backdrop-blur-2xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-48 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
