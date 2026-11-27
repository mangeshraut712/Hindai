"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { UtsavEntry } from "@/lib/data/utsav";
import { publicUrl } from "@/lib/site";
import { formatCivil, visibleUpcoming } from "./upcoming";

const UPCOMING_COUNT = 4;

/**
 * "Coming next" list for the festivals home.
 *
 * This must be a client component. The page is `force-static` and the site is
 * exported with `output: "export"`, so a `new Date()` in the server render is
 * the build date and the list would stay frozen until the next deploy. The
 * build-time list is rendered first so the first client render matches the
 * server HTML; the visitor's own date is applied after mount.
 */
export function UpcomingFestivals({ built }: { built: UtsavEntry[] }) {
  const [upcoming, setUpcoming] = useState<UtsavEntry[]>(built);

  useEffect(() => {
    setUpcoming(visibleUpcoming({ built, visitorNow: new Date(), count: UPCOMING_COUNT }));
  }, [built]);

  return (
    <ul className="mt-8 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-2 md:gap-x-10">
      {upcoming.map((item) => (
        <li key={item.slug}>
          <Link
            href={`/festivals/${item.slug}`}
            className="group border-border/70 grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b py-5"
          >
            {item.image ? (
              <Image
                src={publicUrl(item.image)}
                alt={`Artist impression for ${item.name}`}
                width={280}
                height={200}
                className="h-24 w-28 rounded-lg object-cover"
                sizes="112px"
              />
            ) : (
              <div className="bg-muted flex h-24 w-28 items-center justify-center rounded-lg">
                <p className="font-devanagari text-primary text-lg">{item.sanskrit}</p>
              </div>
            )}
            <div>
              <p className="text-primary text-[11px] font-semibold tracking-[0.16em] uppercase">
                {formatCivil(item.dateISO)}
              </p>
              <h3 className="group-hover:text-primary mt-1 font-serif text-xl">{item.name}</h3>
              <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-6">
                {item.tagline}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
