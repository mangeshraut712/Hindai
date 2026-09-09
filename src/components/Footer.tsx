"use client";

import Link from "next/link";
import { EXPLORE_DESTINATIONS, SITE_NAV_GROUPS } from "@/lib/site-nav";

type FooterColumn = {
  id: string;
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
};

/** Order packs better on 2–3 column viewports (tall beside tall, short beside short). */
function footerColumns(): FooterColumn[] {
  const byId = new Map(
    SITE_NAV_GROUPS.map((group) => [
      group.id,
      {
        id: group.id,
        title: group.label,
        links: group.items.map((item) => ({ href: item.href, label: item.label })),
      } satisfies FooterColumn,
    ])
  );

  const take = (id: string): FooterColumn => {
    const column = byId.get(id);
    if (!column) {
      throw new Error(`Missing footer nav group: ${id}`);
    }
    return column;
  };

  return [
    take("places"),
    take("practice"),
    take("learn"),
    take("more"),
    {
      id: "library",
      title: "Library",
      links: [
        { href: "/contents", label: "Catalog" },
        { href: "/shivlilamrit", label: "Shivlilamrit" },
        { href: "/haripaat", label: "Haripaat" },
        { href: "/harivijay", label: "Harivijay" },
        { href: "/ramvijay", label: "Ramvijay" },
      ],
    },
    take("ask-ai"),
  ];
}

function FooterLinkColumn({ title, links }: Omit<FooterColumn, "id">) {
  return (
    <div className="min-w-0">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-2 list-none space-y-1 p-0">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm leading-5 text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const columns = footerColumns();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--primary)/0.1),transparent_32%),radial-gradient(circle_at_80%_0%,hsl(var(--accent)/0.08),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-devanagari text-sm tracking-[0.28em] text-primary">
            सत्यमेव जयते · नमस्ते · ॐ
          </p>
          <h2 className="mt-2.5 font-serif text-2xl font-semibold tracking-[-0.025em] text-foreground sm:text-3xl">
            Know where to go
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Library for texts, Places for tirthas, Practice for daily rites, Ask AI for questions,
            Learn for Sanskrit and paths.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE_DESTINATIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-border bg-card px-3 py-2.5 transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{item.hint}</p>
            </Link>
          ))}
        </div>

        <nav
          aria-label="Footer"
          className="mt-6 grid grid-cols-2 items-start gap-x-4 gap-y-5 sm:mt-7 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-6 lg:grid-cols-6 lg:gap-x-4 lg:gap-y-0"
        >
          {columns.map((column) => (
            <FooterLinkColumn key={column.id} title={column.title} links={column.links} />
          ))}
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl justify-center px-4 py-3.5 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Hind AI. Designed for
            reflection, reading, and inquiry.
          </p>
        </div>
      </div>
    </footer>
  );
}
