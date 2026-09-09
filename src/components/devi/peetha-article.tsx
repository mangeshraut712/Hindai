import Image from "next/image";
import Link from "next/link";
import type { ShaktiPeetha } from "@/lib/data/shakti-peethas";
import { SHAKTI_PEETHAS } from "@/lib/data/shakti-peethas";
import { MiniPlaceMap } from "@/components/tirtha/sacred-map";
import { allMapMarkers } from "@/lib/data/tirtha-map";

export function PeethaArticle({ shrine }: { shrine: ShaktiPeetha }) {
  const marker = allMapMarkers().find(
    (item) => item.slug === shrine.slug && item.tradition === "shakta"
  );
  const index = SHAKTI_PEETHAS.findIndex((item) => item.slug === shrine.slug);
  const prev = index > 0 ? SHAKTI_PEETHAS[index - 1] : undefined;
  const next = index < SHAKTI_PEETHAS.length - 1 ? SHAKTI_PEETHAS[index + 1] : undefined;
  const heroImage = shrine.image ?? "/devi/hero.png";

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Devi · {shrine.listStatus} · {shrine.country}
      </p>
      <h1 className="mt-4 font-serif text-4xl">{shrine.name}</h1>
      <p className="mt-2 font-devanagari text-2xl text-primary">{shrine.sanskrit}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {shrine.location} · {shrine.deviName}
      </p>

      <figure className="mt-8 overflow-hidden rounded-2xl border border-border/60">
        <Image
          src={heroImage}
          alt={`Artist impression for ${shrine.name} — not a photograph of the living shrine`}
          width={1600}
          height={900}
          className="h-auto w-full"
          priority
        />
        <figcaption className="bg-muted/40 px-4 py-3 text-xs leading-5 text-muted-foreground">
          {shrine.image
            ? "Artist impression generated for Hind AI for this place’s mood."
            : "Shared Devi artist impression — dedicated peetha art not yet generated for this pin."}{" "}
          Not a photograph of the temple, priests, or pilgrims.
        </figcaption>
      </figure>

      <p className="mt-6 rounded-2xl border border-border/60 bg-muted/25 px-4 py-3 text-sm leading-7 text-muted-foreground">
        <span className="font-semibold text-foreground">How to read this page: </span>
        Body-part notes and Purāṇic lines are tradition / list-dependent. History and “if you
        arrived today” are checkable place facts. List status says whether we call this a common
        peetha, a disputed assignment, or a major yatra only.
      </p>

      {marker ? (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60">
          <MiniPlaceMap marker={marker} />
        </div>
      ) : null}

      <section className="mt-10">
        <h2 className="font-serif text-2xl">What lists say fell here</h2>
        <p className="mt-3 text-sm font-medium text-amber-800 dark:text-amber-200">
          {shrine.bodyPart} — {shrine.bodyPartNote}
        </p>
        <p className="mt-3 text-base leading-8">{shrine.puranaStory}</p>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-2xl">Place and history</h2>
        <p className="mt-3 text-base leading-8">{shrine.history}</p>
        <p className="mt-4 text-base leading-8">{shrine.significance}</p>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-2xl">If you arrived today</h2>
        <p className="mt-3 text-base leading-8">{shrine.today}</p>
        <p className="mt-4 text-sm text-muted-foreground">Usual season: {shrine.bestTimeToVisit}</p>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-2xl">Living worship</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7">
          {shrine.rituals.map((ritual) => (
            <li key={ritual}>{ritual}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Bhairava pairing: {shrine.bhairavaName}
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
      <div className="mt-10 flex flex-wrap justify-between gap-3 text-sm">
        {prev ? (
          <Link href={`/devi/${prev.slug}`} className="font-semibold text-primary">
            ← {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/devi/${next.slug}`} className="font-semibold text-primary">
            {next.name} →
          </Link>
        ) : (
          <span />
        )}
      </div>
      <p className="mt-8 text-sm">
        <Link href="/devi" className="font-semibold text-primary">
          ← All Devi tirthas
        </Link>
        {" · "}
        <Link href="/katha/devi" className="font-semibold text-primary">
          Devi katha grantha
        </Link>
        {" · "}
        <Link href="/pilgrimage" className="font-semibold text-primary">
          Full map
        </Link>
      </p>
    </article>
  );
}
