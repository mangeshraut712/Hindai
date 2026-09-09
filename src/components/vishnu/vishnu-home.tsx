import Image from "next/image";
import Link from "next/link";
import { CHAR_DHAM, CHAR_DHAM_ORDER_NOTE } from "@/lib/data/char-dham";
import { VISHNU_DEEP } from "@/lib/data/tradition-deep";
import { SacredMap } from "@/components/tirtha/sacred-map";
import { TraditionDeepSection } from "@/components/tirtha/tradition-deep-section";

export function VishnuHome() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <Image
          src="/vishnu/hero.png"
          alt="Artist impression of Vishnu — not a photograph"
          width={1920}
          height={1080}
          className="h-[28rem] w-full object-cover sm:h-[34rem]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-black/55" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <p className="eyebrow">ॐ नमो नारायणाय · Vishnu</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-foreground sm:text-5xl">
            Four corners of the peninsula — Char Dham as places, not a slogan
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            {CHAR_DHAM_ORDER_NOTE}
          </p>
        </div>
      </section>
      <TraditionDeepSection title="Deeper Vaishnava knowledge" primers={VISHNU_DEEP} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SacredMap tradition="vaishnava" />
        <ul className="mt-10 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
          {CHAR_DHAM.map((item) => (
            <li key={item.slug}>
              <Link href={`/vishnu/${item.slug}`} className="surface-panel block overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={`Artist impression for ${item.name}`}
                  width={1200}
                  height={700}
                  className="h-40 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    Char Dham {item.id}
                  </p>
                  <h3 className="mt-2 font-serif text-xl">{item.name}</h3>
                  <p className="font-devanagari text-primary">{item.sanskrit}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.location}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 surface-panel rounded-3xl p-8">
          <h2 className="font-serif text-2xl">Keep reading</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Char Dham is the map. The Vishnu katha grantha is the story spine — avatara, Rama,
            Krishna, and why ekadashi still matters.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/katha/vishnu"
              className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
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
