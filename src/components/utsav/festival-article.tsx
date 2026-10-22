import Image from "next/image";
import Link from "next/link";
import type { UtsavEntry } from "@/lib/data/utsav";
import { UTSAVS } from "@/lib/data/utsav";
import { publicUrl } from "@/lib/site";

function formatCivil(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function NeighborLinks({ current }: { current: UtsavEntry }) {
  const index = UTSAVS.findIndex((item) => item.slug === current.slug);
  const prev = index > 0 ? UTSAVS[index - 1] : undefined;
  const next = index < UTSAVS.length - 1 ? UTSAVS[index + 1] : undefined;
  return (
    <div className="mt-12 flex flex-wrap justify-between gap-3 text-sm">
      {prev ? (
        <Link href={`/festivals/${prev.slug}`} className="text-primary font-semibold">
          ← {prev.name}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/festivals/${next.slug}`} className="text-primary font-semibold">
          {next.name} →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

export function FestivalArticle({ festival }: { festival: UtsavEntry }) {
  return (
    <article>
      <section className="border-border/60 relative overflow-hidden border-b">
        {festival.image ? (
          <Image
            src={publicUrl(festival.image)}
            alt={`Artist impression for ${festival.name} — not a photograph`}
            width={1920}
            height={1080}
            className="h-88 w-full object-cover sm:h-112"
            priority
          />
        ) : (
          <div
            className="h-72 w-full sm:h-88"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary) / 0.35), hsl(var(--background)) 55%, hsl(var(--muted)))",
            }}
          />
        )}
        <div className="theme-media-veil absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-4 pb-10 sm:px-6">
          <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
            {festival.monthLabel} · {festival.tradition} · {festival.kind}
          </p>
          <h1 className="text-foreground mt-3 font-serif text-4xl sm:text-5xl">{festival.name}</h1>
          <p className="font-devanagari text-primary mt-2 text-2xl">{festival.sanskrit}</p>
          <p className="text-muted-foreground mt-3 text-sm">{formatCivil(festival.dateISO)}</p>
          <p className="text-muted-foreground mt-1 text-xs">{festival.lunarHint}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="border-border/60 bg-muted/25 text-muted-foreground rounded-2xl border px-4 py-3 text-sm leading-7">
          <span className="text-foreground font-semibold">How to read this page: </span>
          Katha = scripture / oral tradition. Living practice and temple notes = custom that varies
          by place. Civil dates move with the panchanga — confirm locally when a tithi straddles two
          sunrises.
        </p>
        <p className="text-foreground/90 mt-8 text-lg leading-8">{festival.tagline}</p>
        <p className="text-muted-foreground mt-4 text-base leading-8">{festival.summary}</p>

        <section className="mt-12">
          <h2 className="font-serif text-2xl">Origin / katha</h2>
          <p className="theme-note mt-3 text-sm font-medium">
            Tradition — Purāṇa, itihāsa, or oral mahātmya — not a dated news report
          </p>
          <p className="mt-3 text-base leading-8">{festival.katha}</p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl">Living practice</h2>
          <p className="text-primary mt-3 text-sm font-medium">How people actually keep the day</p>
          <p className="mt-3 text-base leading-8">{festival.livingPractice}</p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl">In the temple</h2>
          <p className="text-muted-foreground mt-3 text-sm font-medium">
            What a first-time visitor usually meets
          </p>
          <p className="mt-3 text-base leading-8">{festival.inTheTemple}</p>
        </section>

        <section className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5">
            <h2 className="font-serif text-xl text-emerald-100">Do</h2>
            <ul className="text-foreground/90 mt-4 list-disc space-y-2 pl-5 text-sm leading-7">
              {festival.doList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5">
            <h2 className="font-serif text-xl text-rose-100">Don’t</h2>
            <ul className="text-foreground/90 mt-4 list-disc space-y-2 pl-5 text-sm leading-7">
              {festival.dontList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl">Fun facts</h2>
          <ul className="mt-4 space-y-3">
            {festival.funFacts.map((fact) => (
              <li
                key={fact}
                className="border-border/60 bg-muted/30 rounded-xl border px-4 py-3 text-sm leading-7"
              >
                {fact}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl">Regions</h2>
          <p className="text-muted-foreground mt-3 text-sm leading-7">
            {festival.regions.join(" · ")}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl">Keep learning on Hind AI</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {festival.relatedHrefs.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="border-border/70 hover:border-primary/50 inline-flex rounded-full border px-4 py-2 text-sm font-medium transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/festivals"
                className="border-primary/40 text-primary inline-flex rounded-full border px-4 py-2 text-sm font-medium"
              >
                All festivals
              </Link>
            </li>
          </ul>
        </section>

        <section className="border-border/60 bg-muted/20 mt-12 rounded-2xl border p-5">
          <h2 className="font-serif text-xl">Sources</h2>
          <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
            {festival.sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </section>

        <NeighborLinks current={festival} />
      </div>
    </article>
  );
}
