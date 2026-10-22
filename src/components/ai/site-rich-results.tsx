"use client";

import Link from "next/link";
import { siteKindLabel, type SiteRetrieval } from "@/lib/ai/site-knowledge";

export function SiteRichResults({ retrieval }: { retrieval: SiteRetrieval }) {
  if (!retrieval.onSite) {
    return (
      <article
        className="border-border/70 bg-background mt-3 rounded-2xl border p-4"
        aria-label="Outside the library"
      >
        <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
          Hind AI · Outside this library
        </p>
        <h3 className="text-foreground mt-2 font-serif text-xl">{retrieval.query}</h3>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
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
          <article className="border-border/70 bg-background rounded-2xl border p-4">
            <p className="text-primary text-[11px] font-semibold tracking-[0.16em] uppercase">
              Hind AI · {siteKindLabel(hit.kind)} · {hit.href}
            </p>
            <h3 className="text-foreground mt-2 font-serif text-xl">{hit.title}</h3>
            {hit.titleSa ? (
              <p className="font-devanagari text-primary text-lg">{hit.titleSa}</p>
            ) : null}
            <p className="text-muted-foreground mt-2 text-sm leading-6">{hit.snippet}</p>
            <Link
              href={hit.href}
              className="text-primary mt-3 inline-flex text-sm font-semibold underline-offset-4 hover:underline"
            >
              Open {hit.title}
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
