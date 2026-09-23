"use client";

import Link from "next/link";
import { siteKindLabel, type SiteRetrieval } from "@/lib/ai/site-knowledge";

export function SiteRichResults({ retrieval }: { retrieval: SiteRetrieval }) {
  if (!retrieval.onSite) {
    return (
      <article
        className="mt-3 rounded-2xl border border-border/70 bg-background p-4"
        aria-label="Outside the library"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Hind AI · Outside this library
        </p>
        <h3 className="mt-2 font-serif text-xl text-foreground">{retrieval.query}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          There is no page for this on Hind AI. The note below is general study help. It is not a
          verse from the library.
        </p>
      </article>
    );
  }

  return (
    <ul className="mt-3 space-y-3" aria-label="Pages on Hind AI">
      {retrieval.hits.map((hit) => (
        <li key={hit.href}>
          <article className="rounded-2xl border border-border/70 bg-background p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              Hind AI · {siteKindLabel(hit.kind)} · {hit.href}
            </p>
            <h3 className="mt-2 font-serif text-xl text-foreground">{hit.title}</h3>
            {hit.titleSa ? (
              <p className="font-devanagari text-lg text-primary">{hit.titleSa}</p>
            ) : null}
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{hit.snippet}</p>
            <Link
              href={hit.href}
              className="mt-3 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Open {hit.title}
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
