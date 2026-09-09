import Image from "next/image";
import Link from "next/link";
import type { Jyotirlinga } from "@/lib/data/jyotirlingas";
import { JYOTIRLINGAS } from "@/lib/data/jyotirlingas";

function NeighborLinks({ current }: { current: Jyotirlinga }) {
  const index = JYOTIRLINGAS.findIndex((item) => item.slug === current.slug);
  const prev = index > 0 ? JYOTIRLINGAS[index - 1] : undefined;
  const next = index < JYOTIRLINGAS.length - 1 ? JYOTIRLINGAS[index + 1] : undefined;
  return (
    <div className="mt-10 flex flex-wrap justify-between gap-3 text-sm">
      {prev ? (
        <Link href={`/mahadev/${prev.slug}`} className="font-semibold text-primary">
          ← {prev.name}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/mahadev/${next.slug}`} className="font-semibold text-primary">
          {next.name} →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

export function JyotirlingaArticle({ shrine }: { shrine: Jyotirlinga }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Jyotirlinga {shrine.id} of 12 · {shrine.state}
      </p>
      <h1 className="mt-4 font-serif text-4xl">{shrine.name}</h1>
      <p className="mt-2 font-devanagari text-2xl text-primary">{shrine.sanskrit}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {shrine.location} · stotra region: {shrine.stotraPlace}
      </p>

      <figure className="mt-8 overflow-hidden rounded-2xl border border-border/60">
        <Image
          src={shrine.image}
          alt={`Artist impression for ${shrine.name} — not a photograph of the living temple`}
          width={1600}
          height={1200}
          className="h-auto w-full"
          priority
        />
        <figcaption className="bg-muted/40 px-4 py-3 text-xs leading-5 text-muted-foreground">
          Artist impression generated for Hind AI. Not a photograph of the temple, priests, or
          pilgrims.
        </figcaption>
      </figure>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Puranic katha</h2>
        <p className="mt-3 text-sm font-medium text-amber-800 dark:text-amber-200">
          Tradition — Shiva Purana / local mahatmya, not a dated event
        </p>
        <p className="mt-3 text-base leading-8">{shrine.puranaStory}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Place and history</h2>
        <p className="mt-3 text-sm font-medium text-primary">Checkable geography and rebuilds</p>
        <p className="mt-3 text-base leading-8">{shrine.history}</p>
        <p className="mt-4 text-base leading-8">{shrine.significance}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">If you arrived today</h2>
        <p className="mt-3 text-sm font-medium text-muted-foreground">
          Pilgrimage as it is now — queues, seasons, roads — not a miracle story
        </p>
        <p className="mt-3 text-base leading-8">{shrine.today}</p>
        <p className="mt-4 text-sm text-muted-foreground">Usual season: {shrine.bestTimeToVisit}</p>
      </section>

      {shrine.otherClaims.length > 0 ? (
        <section className="mt-10 rounded-2xl border border-amber-500/35 bg-amber-950/35 p-5 text-foreground dark:border-amber-400/30 dark:bg-amber-950/40">
          <h2 className="font-serif text-2xl">Other living claims</h2>
          <p className="mt-2 text-sm leading-7 text-foreground/80">
            The Sanskrit verse names a region. More than one temple reads that region as itself.
            This page does not erase them.
          </p>
          <ul className="mt-4 space-y-3">
            {shrine.otherClaims.map((claim) => (
              <li key={claim.name}>
                <p className="font-medium text-foreground">
                  {claim.name} · {claim.place}
                </p>
                <p className="text-sm leading-6 text-muted-foreground">{claim.note}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Living worship</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7">
          {shrine.rituals.map((ritual) => (
            <li key={ritual}>{ritual}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Nearby: {shrine.nearbyPlaces.join(", ")}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Sources</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
          {shrine.sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </section>

      <NeighborLinks current={shrine} />
      <p className="mt-8 text-sm">
        <Link href="/mahadev" className="font-semibold text-primary">
          ← All twelve
        </Link>
        {" · "}
        <Link href="/shivlilamrit" className="font-semibold text-primary">
          Shivlilamrit
        </Link>
      </p>
    </article>
  );
}
