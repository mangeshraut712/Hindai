export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b border-border/60 bg-background/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="size-11 animate-pulse rounded-full bg-primary/20" />
            <div className="h-6 w-24 animate-pulse rounded bg-primary/20" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-16 animate-pulse rounded-full bg-primary/20" />
            <div className="h-8 w-16 animate-pulse rounded-full bg-primary/20" />
            <div className="h-8 w-16 animate-pulse rounded-full bg-primary/20" />
          </div>
        </div>
      </div>

      <main className="flex-1">
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="h-8 w-48 animate-pulse rounded bg-primary/20" />
            <div className="mt-6 h-12 w-96 animate-pulse rounded bg-primary/20" />
            <div className="mt-5 h-6 w-full max-w-2xl animate-pulse rounded bg-primary/20" />
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex gap-4">
              <div className="h-12 w-48 animate-pulse rounded-full bg-primary/20" />
              <div className="h-12 w-48 animate-pulse rounded-full bg-primary/20" />
            </div>
            <div className="h-32 animate-pulse rounded-2xl border border-border/60 bg-primary/20" />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl border border-border/60 bg-primary/20" />
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="h-32 animate-pulse rounded bg-primary/20" />
        </div>
      </div>
    </div>
  );
}
