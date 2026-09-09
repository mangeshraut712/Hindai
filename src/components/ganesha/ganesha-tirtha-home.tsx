import Link from "next/link";
import { ASHTAVINAYAK, ASHTAVINAYAK_NOTE } from "@/lib/data/ashtavinayak";
import { GANESHA_DEEP } from "@/lib/data/tradition-deep";
import { SacredMap } from "@/components/tirtha/sacred-map";
import { TraditionDeepSection } from "@/components/tirtha/tradition-deep-section";
import { GurukulHero } from "@/components/gurukul/gurukul-media";

export function GaneshaTirthaHome() {
  return (
    <div>
      <GurukulHero
        src="/ganesha/hero.webp"
        alt="Artist impression of Ganesha — not a photograph"
        eyebrow="गणपति · Ashtavinayak"
        title="Eight Ganapatis as a Maharashtra circuit"
        copy={ASHTAVINAYAK_NOTE}
        actions={
          <Link
            href="/ganesh-aarti"
            className="inline-flex h-11 items-center rounded-full border border-border/70 bg-background/80 px-5 text-sm font-semibold backdrop-blur"
          >
            Marathi aarti book →
          </Link>
        }
      />
      <TraditionDeepSection title="Deeper Ganapatya knowledge" primers={GANESHA_DEEP} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SacredMap tradition="ganapatya" />
        <ol className="mt-10 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-2 md:gap-x-10">
          {ASHTAVINAYAK.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/ganesha/${item.slug}`}
                className="group block border-b border-border/70 py-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Halt {item.circuitOrder}
                </p>
                <h3 className="mt-1 font-serif text-xl group-hover:text-primary">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
              </Link>
            </li>
          ))}
        </ol>
        <div className="surface-panel mt-12 rounded-3xl p-8">
          <h2 className="font-serif text-2xl">Keep reading</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Eight roads need a story spine. Open the Ganesha katha grantha, then the Chaturthi
            festival page for clay ethics and visarjan duty.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/katha/ganesha"
              className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              Ganesha katha grantha
            </Link>
            <Link
              href="/festivals/ganesh-chaturthi"
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-semibold"
            >
              Ganesh Chaturthi
            </Link>
            <Link
              href="/ganesh-aarti"
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-semibold"
            >
              Marathi aarti
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
