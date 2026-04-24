import { Skeleton } from "@/components/ui/skeleton";

function ShimmerBlock({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-muted/60 ${className || ""}`}>
      <div className="via-white/8 absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent to-transparent" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Skeleton */}
      <header className="bg-background/72 sticky top-0 z-50 w-full border-b border-border/60 px-4 py-3 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <ShimmerBlock className="size-11 rounded-full" />
            <div className="space-y-1.5">
              <ShimmerBlock className="h-5 w-24" />
              <ShimmerBlock className="h-3 w-20" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShimmerBlock className="hidden h-9 w-24 rounded-full lg:block" />
            <ShimmerBlock className="hidden h-9 w-24 rounded-full lg:block" />
            <ShimmerBlock className="hidden h-9 w-28 rounded-full sm:block" />
            <ShimmerBlock className="h-9 w-9 rounded-full" />
            <ShimmerBlock className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </header>

      {/* Hero Skeleton */}
      <section className="hero-mesh relative overflow-hidden border-b border-border/60">
        <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
        <div className="hero-sun -left-20 top-10 size-56 opacity-80" aria-hidden="true" />
        <div className="hero-sun right-0 top-20 size-72 opacity-60" aria-hidden="true" />

        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-end gap-14 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.9fr)] lg:px-8">
          <div className="relative z-10 max-w-3xl space-y-8">
            <ShimmerBlock className="h-7 w-40 rounded-full" />
            <div className="space-y-4">
              <ShimmerBlock className="h-4 w-48" />
              <ShimmerBlock className="h-4 w-56" />
              <ShimmerBlock className="h-16 w-full max-w-lg sm:h-20 lg:h-24" />
              <ShimmerBlock className="h-24 w-full max-w-xl" />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ShimmerBlock className="h-12 w-48 rounded-full" />
              <ShimmerBlock className="h-12 w-36 rounded-full" />
            </div>
            <div className="flex flex-wrap gap-8 border-t border-border/60 pt-7">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <ShimmerBlock className="h-3 w-16" />
                  <ShimmerBlock className="h-8 w-12" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pb-6 lg:pb-0">
            <div className="surface-panel p-8 md:p-10">
              <div className="relative z-10 space-y-6">
                <ShimmerBlock className="h-5 w-32 rounded-full" />
                <ShimmerBlock className="h-24 w-full max-w-md" />
                <ShimmerBlock className="h-16 w-full max-w-sm" />
                <div className="mt-10 space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <ShimmerBlock key={i} className="h-12 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <main className="flex-1 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-24">
          {/* Section 1 */}
          <div className="space-y-12">
            <div className="max-w-3xl space-y-4">
              <ShimmerBlock className="h-5 w-32 rounded-full" />
              <ShimmerBlock className="h-14 w-full max-w-md sm:h-16" />
              <ShimmerBlock className="h-20 w-full max-w-xl" />
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="surface-panel p-7">
                  <div className="relative z-10 space-y-5">
                    <ShimmerBlock className="size-12 rounded-full" />
                    <div className="space-y-3">
                      <ShimmerBlock className="h-8 w-3/4" />
                      <ShimmerBlock className="h-16 w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl space-y-4">
                <ShimmerBlock className="h-5 w-36 rounded-full" />
                <ShimmerBlock className="h-14 w-full max-w-lg sm:h-16" />
              </div>
              <ShimmerBlock className="h-10 w-32 rounded-full" />
            </div>
            <div className="surface-panel">
              <div className="relative z-10 space-y-0">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="relative grid gap-5 px-6 py-6 md:grid-cols-[160px_minmax(0,1fr)_180px] md:items-end md:px-8"
                  >
                    <ShimmerBlock className="h-4 w-20" />
                    <div className="space-y-2">
                      <ShimmerBlock className="h-5 w-48" />
                      <ShimmerBlock className="h-8 w-3/4 max-w-sm" />
                      <ShimmerBlock className="h-14 w-full max-w-xl" />
                    </div>
                    <div className="flex items-center justify-between gap-4 md:justify-end">
                      <ShimmerBlock className="h-4 w-24" />
                      <ShimmerBlock className="size-4 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
