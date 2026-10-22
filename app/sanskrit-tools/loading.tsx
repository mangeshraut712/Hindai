export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-border/60 bg-background/80 border-b backdrop-blur-2xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 size-11 animate-pulse rounded-full" />
            <div className="bg-primary/20 h-6 w-24 animate-pulse rounded" />
          </div>
          <div className="flex gap-2">
            <div className="bg-primary/20 h-8 w-16 animate-pulse rounded-full" />
            <div className="bg-primary/20 h-8 w-16 animate-pulse rounded-full" />
            <div className="bg-primary/20 h-8 w-16 animate-pulse rounded-full" />
          </div>
        </div>
      </div>

      <main id="main-content" className="flex-1">
        <section className="border-border/60 border-b">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="bg-primary/20 h-8 w-48 animate-pulse rounded" />
            <div className="bg-primary/20 mt-6 h-12 w-96 animate-pulse rounded" />
            <div className="bg-primary/20 mt-5 h-6 w-full max-w-2xl animate-pulse rounded" />
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="border-border/60 bg-primary/20 h-40 animate-pulse rounded-2xl border"
                />
              ))}
            </div>
            <div className="border-border/60 bg-primary/20 mt-8 h-96 animate-pulse rounded-2xl border" />
          </div>
        </section>
      </main>

      <div className="border-border/60 border-t">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-primary/20 h-32 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
