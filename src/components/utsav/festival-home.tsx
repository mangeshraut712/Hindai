import Image from "next/image";
import Link from "next/link";
import { UTSAV_NOTE, UTSAVS, upcomingUtsavs, utsavsByMonth } from "@/lib/data/utsav";

const MONTH_ORDER = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function formatCivil(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function FestivalHome() {
  const byMonth = utsavsByMonth();
  const upcoming = upcomingUtsavs(new Date("2026-09-08T00:00:00"), 4);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, color-mix(in oklab, var(--primary) 28%, transparent), transparent 55%), radial-gradient(ellipse at 80% 10%, color-mix(in oklab, #c45c26 22%, transparent), transparent 50%), linear-gradient(165deg, #1a120c 0%, #0c0a09 45%, #12161a 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="eyebrow text-amber-100/90">उत्सव · Festival calendar</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-amber-50 sm:text-5xl">
            Hindu festivals with origin, temple life, and honest do / don’t
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-amber-50/75 sm:text-base">
            {UTSAV_NOTE}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/panchanga"
              className="rounded-full bg-amber-100 px-5 py-2.5 text-sm font-semibold text-stone-900 transition hover:bg-white"
            >
              Open Panchanga
            </Link>
            <Link
              href="/pilgrimage"
              className="rounded-full border border-amber-100/40 px-5 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-amber-50/10"
            >
              Tirtha map
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl">Coming next on the 2026 civil calendar</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Deep articles — katha labelled as tradition, temple etiquette as living custom.
        </p>
        <ul className="mt-8 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
          {upcoming.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/festivals/${item.slug}`}
                className="surface-panel group flex h-full flex-col overflow-hidden rounded-2xl"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={`Artist impression for ${item.name}`}
                    width={1200}
                    height={700}
                    className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-40 items-end bg-gradient-to-br from-primary/25 via-amber-900/30 to-stone-900 p-5">
                    <p className="font-devanagari text-2xl text-amber-100/90">{item.sanskrit}</p>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {formatCivil(item.dateISO)}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl">{item.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.tagline}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl">Month by month</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Scroll the year. Each month holds the festivals we have researched in depth so far —
            more will arrive as the encyclopedia grows.
          </p>
          <div className="mt-10 space-y-12">
            {MONTH_ORDER.map((month) => {
              const items = byMonth.get(month);
              if (!items?.length) return null;
              return (
                <div key={month} id={month.toLowerCase()}>
                  <h3 className="font-serif text-2xl text-primary">{month}</h3>
                  <ul className="mt-5 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-2">
                    {items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/festivals/${item.slug}`}
                          className="block rounded-2xl border border-border/70 bg-card/60 p-5 transition hover:border-primary/40"
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h4 className="font-serif text-xl">{item.name}</h4>
                            <span className="text-xs text-muted-foreground">
                              {formatCivil(item.dateISO)}
                            </span>
                          </div>
                          <p className="mt-1 font-devanagari text-primary">{item.sanskrit}</p>
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            {item.summary}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl">All deep festival pages</h2>
        <ul className="mt-8 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {UTSAVS.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/festivals/${item.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/60 px-4 py-3 text-sm transition hover:border-primary/50"
              >
                <span className="font-medium">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.dateISO.slice(5)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
