import Image from "next/image";
import Link from "next/link";
import { UTSAV_NOTE, UTSAVS, upcomingUtsavs, utsavsByMonth } from "@/lib/data/utsav";
import { GurukulHero } from "@/components/gurukul/gurukul-media";
import { publicUrl } from "@/lib/site";

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
      <GurukulHero
        src={publicUrl("/festivals/navaratri.webp")}
        alt="Artist impression of Navaratri lamp and Devi mood — not a temple photograph"
        eyebrow="उत्सव · Festival calendar"
        title="Hindu festivals with origin, temple life, and honest do / don’t"
        copy={UTSAV_NOTE}
        actions={
          <>
            <Link
              href="/panchanga"
              className="bg-primary text-primary-foreground inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold"
            >
              Open Panchanga
            </Link>
            <Link
              href="/pilgrimage"
              className="border-border/70 bg-background/80 inline-flex h-11 items-center rounded-full border px-5 text-sm font-semibold backdrop-blur-sm"
            >
              Tirtha map
            </Link>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl">Coming next on the 2026 civil calendar</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-7">
          Deep articles — katha labelled as tradition, temple etiquette as living custom.
        </p>
        <ul className="mt-8 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-2 md:gap-x-10">
          {upcoming.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/festivals/${item.slug}`}
                className="group border-border/70 grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b py-5"
              >
                {item.image ? (
                  <Image
                    src={publicUrl(item.image)}
                    alt={`Artist impression for ${item.name}`}
                    width={280}
                    height={200}
                    className="h-24 w-28 rounded-lg object-cover"
                    sizes="112px"
                  />
                ) : (
                  <div className="bg-muted flex h-24 w-28 items-center justify-center rounded-lg">
                    <p className="font-devanagari text-primary text-lg">{item.sanskrit}</p>
                  </div>
                )}
                <div>
                  <p className="text-primary text-[11px] font-semibold tracking-[0.16em] uppercase">
                    {formatCivil(item.dateISO)}
                  </p>
                  <h3 className="group-hover:text-primary mt-1 font-serif text-xl">{item.name}</h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-6">
                    {item.tagline}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-border/60 bg-muted/20 border-y">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl">Month by month</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-7">
            Scroll the year. Each month holds the festivals we have researched in depth so far —
            more will arrive as the encyclopedia grows.
          </p>
          <div className="mt-10 space-y-12">
            {MONTH_ORDER.map((month) => {
              const items = byMonth.get(month);
              if (!items?.length) return null;
              return (
                <div key={month} id={month.toLowerCase()}>
                  <h3 className="text-primary font-serif text-2xl">{month}</h3>
                  <ul className="mt-5 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-2">
                    {items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/festivals/${item.slug}`}
                          className="border-border/60 hover:border-primary/40 block border-b py-4 transition"
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h4 className="font-serif text-xl">{item.name}</h4>
                            <span className="text-muted-foreground text-xs">
                              {formatCivil(item.dateISO)}
                            </span>
                          </div>
                          <p className="font-devanagari text-primary mt-1">{item.sanskrit}</p>
                          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-6">
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
                className="border-border/60 hover:border-primary/50 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm transition"
              >
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground text-xs">{item.dateISO.slice(5)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
