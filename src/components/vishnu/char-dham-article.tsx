import Image from "next/image";
import Link from "next/link";
import type { CharDhamSite } from "@/lib/data/char-dham";
import { CHAR_DHAM } from "@/lib/data/char-dham";
import { MiniPlaceMap } from "@/components/tirtha/sacred-map";
import { allMapMarkers } from "@/lib/data/tirtha-map";

export function CharDhamArticle({ shrine }: { shrine: CharDhamSite }) {
  const marker = allMapMarkers().find((item) => item.id === `char-dham:${shrine.slug}`);
  const index = CHAR_DHAM.findIndex((item) => item.slug === shrine.slug);
  const prev = index > 0 ? CHAR_DHAM[index - 1] : undefined;
  const next = index < CHAR_DHAM.length - 1 ? CHAR_DHAM[index + 1] : undefined;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Char Dham {shrine.id} of 4 · {shrine.state}
      </p>
      <h1 className="mt-4 font-serif text-4xl">{shrine.name}</h1>
      <p className="mt-2 font-devanagari text-2xl text-primary">{shrine.sanskrit}</p>
      <p className="mt-2 text-sm text-muted-foreground">{shrine.location}</p>

      <figure className="mt-8 overflow-hidden rounded-2xl border border-border/60">
        <Image
          src={shrine.image}
          alt={`Artist impression for ${shrine.name} — not a photograph of the living temple`}
          width={1600}
          height={900}
          className="h-auto w-full"
          priority
        />
        <figcaption className="bg-muted/40 px-4 py-3 text-xs leading-5 text-muted-foreground">
          Artist impression generated for Hind AI. Not a photograph of the temple, priests, or
          pilgrims.
        </figcaption>
      </figure>

      {marker ? (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60">
          <MiniPlaceMap marker={marker} />
        </div>
      ) : null}
      <section className="mt-10">
        <h2 className="font-serif text-2xl">Puranic katha</h2>
        <p className="theme-note mt-3 text-sm font-medium">Tradition — not a dated travelogue</p>
        <p className="mt-3 text-base leading-8">{shrine.puranaStory}</p>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-2xl">Place and history</h2>
        <p className="mt-3 text-base leading-8">{shrine.history}</p>
        <p className="mt-4 text-base leading-8">{shrine.circuitNote}</p>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-2xl">If you arrived today</h2>
        <p className="mt-3 text-base leading-8">{shrine.today}</p>
        {shrine.relatedPeetha ? (
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Shakta shrine on the same pin:{" "}
            <Link
              href={`/devi/${shrine.relatedPeetha.slug}`}
              className="font-semibold text-primary"
            >
              {shrine.relatedPeetha.name}
            </Link>
          </p>
        ) : null}
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-2xl">Sources</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
          {shrine.sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </section>
      <div className="mt-10 flex flex-wrap justify-between gap-3 text-sm">
        {prev ? (
          <Link href={`/vishnu/${prev.slug}`} className="font-semibold text-primary">
            ← {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/vishnu/${next.slug}`} className="font-semibold text-primary">
            {next.name} →
          </Link>
        ) : (
          <span />
        )}
      </div>
      <p className="mt-8 text-sm">
        <Link href="/katha/vishnu" className="font-semibold text-primary">
          Read Vishnu katha grantha →
        </Link>
      </p>
    </article>
  );
}
