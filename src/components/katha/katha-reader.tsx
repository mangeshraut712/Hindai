import Image from "next/image";
import Link from "next/link";
import type { KathaGrantha } from "@/lib/data/katha-grantha";
import { KATHA_GRANTHAS } from "@/lib/data/katha-grantha";

export function KathaReader({ grantha }: { grantha: KathaGrantha }) {
  const index = KATHA_GRANTHAS.findIndex((item) => item.slug === grantha.slug);
  const prev = index > 0 ? KATHA_GRANTHAS[index - 1] : undefined;
  const next = index < KATHA_GRANTHAS.length - 1 ? KATHA_GRANTHAS[index + 1] : undefined;

  return (
    <article>
      <section className="relative overflow-hidden border-b border-border/60">
        <Image
          src={grantha.heroImage}
          alt={`Artist impression for ${grantha.title} — not a photograph`}
          width={1920}
          height={1080}
          className="h-[22rem] w-full object-cover sm:h-[28rem]"
          priority
        />
        <div className="theme-media-veil absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-4 pb-10 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Katha grantha
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{grantha.title}</h1>
          <p className="mt-2 font-devanagari text-2xl text-primary">{grantha.sanskrit}</p>
          <p className="mt-3 text-sm text-muted-foreground">{grantha.tagline}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="theme-callout rounded-2xl px-4 py-3 text-sm leading-7">{grantha.note}</p>

        <nav className="mt-10" aria-label="Chapter list">
          <h2 className="font-serif text-2xl">Chapters</h2>
          <ol className="mt-4 space-y-2">
            {grantha.chapters.map((chapter, i) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  className="flex items-baseline justify-between gap-3 rounded-xl border border-border/60 px-4 py-3 text-sm transition hover:border-primary/40"
                >
                  <span>
                    <span className="text-muted-foreground">{i + 1}. </span>
                    {chapter.title}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    ~{chapter.readingMinutes} min
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-14 space-y-16">
          {grantha.chapters.map((chapter, i) => (
            <section key={chapter.id} id={chapter.id} className="scroll-mt-28">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Chapter {i + 1}
              </p>
              <h2 className="mt-2 font-serif text-3xl">{chapter.title}</h2>
              <p className="mt-2 font-devanagari text-xl text-primary">{chapter.sanskrit}</p>
              <div className="mt-6 space-y-5">
                {chapter.body.map((para) => (
                  <p key={para.slice(0, 48)} className="text-base leading-8 text-foreground/90">
                    {para}
                  </p>
                ))}
              </div>
              <ul className="mt-6 list-disc space-y-1 pl-5 text-xs leading-6 text-muted-foreground">
                {chapter.sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            href={grantha.relatedHref}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Open tirtha home
          </Link>
          <Link
            href="/festivals"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
          >
            Festival calendar
          </Link>
          <Link
            href="/katha"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
          >
            All granthas
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3 text-sm">
          {prev ? (
            <Link href={`/katha/${prev.slug}`} className="font-semibold text-primary">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/katha/${next.slug}`} className="font-semibold text-primary">
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </article>
  );
}
