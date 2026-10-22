import Image from "next/image";
import Link from "next/link";
import type { AshtavinayakSite } from "@/lib/data/ashtavinayak";
import { ASHTAVINAYAK } from "@/lib/data/ashtavinayak";
import { MiniPlaceMap } from "@/components/tirtha/sacred-map";
import { allMapMarkers } from "@/lib/data/tirtha-map";
import { publicUrl } from "@/lib/site";

export function AshtavinayakArticle({ shrine }: { shrine: AshtavinayakSite }) {
  const marker = allMapMarkers().find((item) => item.id === `ashtavinayak:${shrine.slug}`);
  const ordered = [...ASHTAVINAYAK].sort((left, right) => left.circuitOrder - right.circuitOrder);
  const index = ordered.findIndex((item) => item.slug === shrine.slug);
  const prev = index > 0 ? ordered[index - 1] : undefined;
  const next = index < ordered.length - 1 ? ordered[index + 1] : undefined;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
        Ashtavinayak {shrine.circuitOrder} of 8
      </p>
      <h1 className="mt-4 font-serif text-4xl">{shrine.name}</h1>
      <p className="font-devanagari text-primary mt-2 text-2xl">{shrine.sanskrit}</p>
      <p className="text-muted-foreground mt-2 text-sm">{shrine.location}</p>

      <figure className="border-border/60 mt-8 overflow-hidden rounded-2xl border">
        <Image
          src={publicUrl("/ganesha/hero.webp")}
          alt={`Artist impression for ${shrine.name} circuit mood — not a photograph`}
          width={1600}
          height={900}
          className="h-auto w-full"
          priority
        />
        <figcaption className="bg-muted/40 text-muted-foreground px-4 py-3 text-xs leading-5">
          Shared Ashtavinayak artist impression for Hind AI. Not a photograph of this specific
          village murti.
        </figcaption>
      </figure>

      {marker ? (
        <div className="border-border/60 mt-8 overflow-hidden rounded-2xl border">
          <MiniPlaceMap marker={marker} />
        </div>
      ) : null}

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Local katha</h2>
        <p className="theme-note mt-3 text-sm font-medium">
          Tradition — Maharashtra mahātmya, not a dated news report
        </p>
        <p className="mt-3 text-base leading-8">{shrine.puranaStory}</p>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-2xl">Place</h2>
        <p className="mt-3 text-base leading-8">{shrine.history}</p>
        <p className="mt-4 text-base leading-8">{shrine.today}</p>
      </section>
      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5">
          <h2 className="font-serif text-xl text-emerald-100">Do</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7">
            {shrine.doList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5">
          <h2 className="font-serif text-xl text-rose-100">Don’t</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7">
            {shrine.dontList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-2xl">Sources</h2>
        <ul className="text-muted-foreground mt-3 list-disc pl-5 text-sm">
          {shrine.sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </section>
      <div className="mt-10 flex flex-wrap justify-between gap-3 text-sm">
        {prev ? (
          <Link href={`/ganesha/${prev.slug}`} className="text-primary font-semibold">
            ← {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/ganesha/${next.slug}`} className="text-primary font-semibold">
            {next.name} →
          </Link>
        ) : (
          <span />
        )}
      </div>
      <p className="mt-8 text-sm">
        <Link href="/katha/ganesha" className="text-primary font-semibold">
          Read Ganesha katha grantha →
        </Link>
      </p>
    </article>
  );
}
