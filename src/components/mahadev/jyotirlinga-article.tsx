import Image from "next/image";
import Link from "next/link";
import type { Jyotirlinga } from "@/lib/data/jyotirlingas";
import { JYOTIRLINGAS } from "@/lib/data/jyotirlingas";
import { publicUrl } from "@/lib/site";

function NeighborLinks({ current }: { current: Jyotirlinga }) {
  const index = JYOTIRLINGAS.findIndex((item) => item.slug === current.slug);
  const prev = index > 0 ? JYOTIRLINGAS[index - 1] : undefined;
  const next = index < JYOTIRLINGAS.length - 1 ? JYOTIRLINGAS[index + 1] : undefined;
  return (
    <div className="mt-10 flex flex-wrap justify-between gap-3 text-sm">
      {prev ? (
        <Link href={`/mahadev/${prev.slug}`} className="text-primary font-semibold">
          ← {prev.name}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/mahadev/${next.slug}`} className="text-primary font-semibold">
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
      <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
        Jyotirlinga {shrine.id} of 12 · {shrine.state}
      </p>
      <h1 className="mt-4 font-serif text-4xl">{shrine.name}</h1>
      <p className="font-devanagari text-primary mt-2 text-2xl">{shrine.sanskrit}</p>
      <p className="text-muted-foreground mt-2 text-sm">
        {shrine.location} · stotra region: {shrine.stotraPlace}
      </p>

      <figure className="border-border/60 mt-8 overflow-hidden rounded-2xl border">
        <Image
          src={publicUrl(shrine.image)}
          alt={`Artist impression for ${shrine.name} — not a photograph of the living temple`}
          width={1600}
          height={1200}
          className="h-auto w-full"
          priority
        />
        <figcaption className="bg-muted/40 text-muted-foreground px-4 py-3 text-xs leading-5">
          Artist impression generated for Hind AI. Not a photograph of the temple, priests, or
          pilgrims.
        </figcaption>
      </figure>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Puranic katha</h2>
        <p className="theme-note mt-3 text-sm font-medium">
          Tradition — Shiva Purana / local mahatmya, not a dated event
        </p>
        <p className="mt-3 text-base leading-8">{shrine.puranaStory}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Place and history</h2>
        <p className="text-primary mt-3 text-sm font-medium">Checkable geography and rebuilds</p>
        <p className="mt-3 text-base leading-8">{shrine.history}</p>
        <p className="mt-4 text-base leading-8">{shrine.significance}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">If you arrived today</h2>
        <p className="text-muted-foreground mt-3 text-sm font-medium">
          Pilgrimage as it is now — queues, seasons, roads — not a miracle story
        </p>
        <p className="mt-3 text-base leading-8">{shrine.today}</p>
        <p className="text-muted-foreground mt-4 text-sm">Usual season: {shrine.bestTimeToVisit}</p>
      </section>

      {shrine.otherClaims.length > 0 ? (
        <section className="theme-callout-strong mt-10 rounded-2xl p-5">
          <h2 className="font-serif text-2xl">Other living claims</h2>
          <p className="text-foreground/80 mt-2 text-sm leading-7">
            The Sanskrit verse names a region. More than one temple reads that region as itself.
            This page does not erase them.
          </p>
          <ul className="mt-4 space-y-3">
            {shrine.otherClaims.map((claim) => (
              <li key={claim.name}>
                <p className="text-foreground font-medium">
                  {claim.name} · {claim.place}
                </p>
                <p className="text-muted-foreground text-sm leading-6">{claim.note}</p>
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
        <p className="text-muted-foreground mt-4 text-sm">
          Nearby: {shrine.nearbyPlaces.join(", ")}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Sources</h2>
        <ul className="text-muted-foreground mt-3 list-disc space-y-1 pl-5 text-sm leading-7">
          {shrine.sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </section>

      <NeighborLinks current={shrine} />
      <p className="mt-8 text-sm">
        <Link href="/mahadev" className="text-primary font-semibold">
          ← All twelve
        </Link>
        {" · "}
        <Link href="/shivlilamrit" className="text-primary font-semibold">
          Shivlilamrit
        </Link>
      </p>
    </article>
  );
}
