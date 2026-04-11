import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 px-4 py-3">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center gap-4">
            <Skeleton className="hidden h-8 w-24 md:block" />
            <Skeleton className="hidden h-8 w-24 md:block" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Hero Skeleton */}
          <div className="space-y-4 text-center">
            <Skeleton className="mx-auto h-12 w-64" />
            <Skeleton className="mx-auto h-6 w-96" />
          </div>

          {/* Cards Skeleton */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-lg border p-6 space-y-4">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
