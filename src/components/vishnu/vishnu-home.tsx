import Image from "next/image";
import Link from "next/link";
import { CHAR_DHAM, CHAR_DHAM_ORDER_NOTE } from "@/lib/data/char-dham";
import { VISHNU_DEEP } from "@/lib/data/tradition-deep";
import { SacredMap } from "@/components/tirtha/sacred-map";
import { TraditionDeepSection } from "@/components/tirtha/tradition-deep-section";
import { GurukulHero } from "@/components/gurukul/gurukul-media";
import { publicUrl } from "@/lib/site";

export function VishnuHome() {
  return (
    <div>
      <GurukulHero
        src={publicUrl("/vishnu/hero.webp")}
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
                className="group border-border/70 grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b py-5"
              >
                <Image
                  src={publicUrl(item.image)}
                  alt={`Artist impression for ${item.name}`}
                  width={280}
                  height={200}
                  className="h-24 w-28 rounded-lg object-cover"
                  sizes="112px"
                />
                <div>
                  <p className="text-primary text-[11px] font-semibold tracking-[0.16em] uppercase">
                    Char Dham {item.id}
                  </p>
                  <h3 className="group-hover:text-primary mt-1 font-serif text-xl">{item.name}</h3>
                  <p className="font-devanagari text-primary">{item.sanskrit}</p>
                  <p className="text-muted-foreground mt-1 text-sm">{item.location}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="surface-panel mt-12 rounded-3xl p-8">
          <h2 className="font-serif text-2xl">Keep reading</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-7">
            Char Dham is the map. Harivijay and Ramvijay are Shridhar’s Marathi pothis for Krishna
            and Rama; the Vishnu katha grantha stays the short English spine.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/harivijay"
              className="bg-primary text-primary-foreground inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold"
            >
              Harivijay pothi
            </Link>
            <Link
              href="/ramvijay"
              className="border-border inline-flex h-11 items-center rounded-full border px-6 text-sm font-semibold"
            >
              Ramvijay pothi
            </Link>
            <Link
              href="/haripaat"
              className="border-border inline-flex h-11 items-center rounded-full border px-6 text-sm font-semibold"
            >
              Haripaat
            </Link>
            <Link
              href="/katha/vishnu"
              className="border-border inline-flex h-11 items-center rounded-full border px-6 text-sm font-semibold"
            >
              Vishnu katha grantha
            </Link>
            <Link
              href="/festivals/janmashtami"
              className="border-border inline-flex h-11 items-center rounded-full border px-6 text-sm font-semibold"
            >
              Janmashtami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
