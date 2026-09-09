import Image from "next/image";
import Link from "next/link";
import { ASHTAVINAYAK, ASHTAVINAYAK_NOTE } from "@/lib/data/ashtavinayak";
import { GANESHA_DEEP } from "@/lib/data/tradition-deep";
import { SacredMap } from "@/components/tirtha/sacred-map";
import { TraditionDeepSection } from "@/components/tirtha/tradition-deep-section";

export function GaneshaTirthaHome() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <Image
          src="/ganesha/hero.png"
          alt="Artist impression of Ganesha — not a photograph"
          width={1920}
          height={1080}
          className="h-[28rem] w-full object-cover sm:h-[34rem]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-black/55" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <p className="eyebrow">गणपति · Ashtavinayak</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-foreground sm:text-5xl">
            Eight Ganapatis as a Maharashtra circuit
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{ASHTAVINAYAK_NOTE}</p>
          <p className="mt-4 text-sm">
            <Link href="/ganesh-aarti" className="font-semibold text-primary">
              Marathi aarti book →
            </Link>
          </p>
        </div>
      </section>
      <TraditionDeepSection title="Deeper Ganapatya knowledge" primers={GANESHA_DEEP} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SacredMap tradition="ganapatya" />
        <ol className="mt-10 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
          {ASHTAVINAYAK.map((item) => (
            <li key={item.slug}>
              <Link href={`/ganesha/${item.slug}`} className="surface-panel block rounded-2xl p-5">
                <p className="text-xs font-semibold text-primary">Halt {item.circuitOrder}</p>
                <h3 className="mt-2 font-serif text-xl">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
              </Link>
            </li>
          ))}
        </ol>
        <div className="mt-12 surface-panel rounded-3xl p-8">
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
