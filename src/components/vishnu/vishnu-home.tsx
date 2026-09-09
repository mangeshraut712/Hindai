import Image from "next/image";
import Link from "next/link";
import { CHAR_DHAM, CHAR_DHAM_ORDER_NOTE } from "@/lib/data/char-dham";
import { VISHNU_DEEP } from "@/lib/data/tradition-deep";
import { SacredMap } from "@/components/tirtha/sacred-map";
import { TraditionDeepSection } from "@/components/tirtha/tradition-deep-section";
import { GurukulHero } from "@/components/gurukul/gurukul-media";

export function VishnuHome() {
  return (
    <div>
      <GurukulHero
        src="/vishnu/hero.webp"
        alt="Artist impression of Vishnu — not a photograph"
        eyebrow="ॐ नमो नारायणाय · Vishnu"
        title="Four corners of the peninsula — Char Dham as places, not a slogan"
        copy={CHAR_DHAM_ORDER_NOTE}
      />
      <TraditionDeepSection title="Deeper Vaishnava knowledge" primers={VISHNU_DEEP} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SacredMap tradition="vaishnava" />
        <ul className="mt-10 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-2 md:gap-x-10">
          {CHAR_DHAM.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/vishnu/${item.slug}`}
                className="group grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-border/70 py-5"
              >
                <Image
                  src={item.image}
                  alt={`Artist impression for ${item.name}`}
                  width={280}
                  height={200}
                  className="h-24 w-28 rounded-lg object-cover"
                  sizes="112px"
                />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    Char Dham {item.id}
                  </p>
                  <h3 className="mt-1 font-serif text-xl group-hover:text-primary">{item.name}</h3>
                  <p className="font-devanagari text-primary">{item.sanskrit}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="surface-panel mt-12 rounded-3xl p-8">
          <h2 className="font-serif text-2xl">Keep reading</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Char Dham is the map. Harivijay and Ramvijay are Shridhar’s Marathi pothis for Krishna
            and Rama; the Vishnu katha grantha stays the short English spine.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/harivijay"
              className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              Harivijay pothi
            </Link>
            <Link
              href="/ramvijay"
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-semibold"
            >
              Ramvijay pothi
            </Link>
            <Link
              href="/haripaat"
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-semibold"
            >
              Haripaat
            </Link>
            <Link
              href="/katha/vishnu"
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-semibold"
            >
              Vishnu katha grantha
            </Link>
            <Link
              href="/festivals/janmashtami"
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-semibold"
            >
              Janmashtami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
