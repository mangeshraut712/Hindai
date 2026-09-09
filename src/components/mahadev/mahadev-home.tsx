import Image from "next/image";
import Link from "next/link";
import { JYOTIRLINGAS } from "@/lib/data/jyotirlingas";
import { MAHADEV_FACTS, MAHADEV_NAMES, MAHADEV_SOURCE_NOTE } from "@/lib/data/mahadev";
import { MAHADEV_DEEP } from "@/lib/data/tradition-deep";
import { bookPath, firstPageForSlug } from "@/lib/data/shivlilamrit/book";
import { SacredMap } from "@/components/tirtha/sacred-map";
import { TraditionDeepSection } from "@/components/tirtha/tradition-deep-section";
import { GurukulHero } from "@/components/gurukul/gurukul-media";

export function MahadevHome() {
  return (
    <div>
      <GurukulHero
        src="/mahadev/hero.webp"
        alt="Artist impression of Mahadeva in Himalayan twilight — not a photograph"
        eyebrow="ॐ नमः शिवाय · Mahadeva"
        title="Shiva as the tradition actually speaks — names, light, and twelve places"
        copy={MAHADEV_SOURCE_NOTE}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl">What can be said without inventing</h2>
        <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
          {MAHADEV_FACTS.map((fact) => (
            <li key={fact.title} className="surface-panel rounded-2xl p-5">
              <h3 className="font-serif text-xl">{fact.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{fact.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <TraditionDeepSection title="Deeper Shaiva knowledge" primers={MAHADEV_DEEP} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl">Where the twelve sit</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Stotra order as a story trail. Pins are living temples, not mythical light-columns.
        </p>
        <div className="mt-8">
          <SacredMap tradition="shaiva" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl">Names you will hear</h2>
        <ul className="mt-8 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {MAHADEV_NAMES.map((item) => (
            <li key={item.name} className="rounded-2xl border border-border/70 p-4">
              <p className="font-serif text-lg">{item.name}</p>
              <p className="font-devanagari text-primary">{item.sanskrit}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.sense}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl">Twelve Jyotirlingas</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Each card is a researched shrine page: Puranic katha, then history, then what a visit
              is like now. Paintings are labelled art, not temple photography.
            </p>
          </div>
          <Link href="/shivlilamrit" className="text-sm font-semibold text-primary">
            Read Shivlilamrit →
          </Link>
        </div>
        <ul className="mt-10 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-2 md:gap-x-10">
          {JYOTIRLINGAS.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/mahadev/${item.slug}`}
                className="group grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-border/70 py-5"
              >
                <Image
                  src={item.image}
                  alt={`Artist impression for ${item.name} — not a photograph of the temple`}
                  width={280}
                  height={200}
                  className="h-24 w-28 rounded-lg object-cover"
                  sizes="112px"
                />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {item.id} · {item.state}
                  </p>
                  <h3 className="mt-1 font-serif text-xl group-hover:text-primary">{item.name}</h3>
                  <p className="font-devanagari text-primary">{item.sanskrit}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
                  {item.otherClaims.length > 0 ? (
                    <p className="theme-note mt-2 text-xs">
                      More than one living temple claims this name
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-3xl p-8 sm:p-10">
          <h2 className="font-serif text-3xl">Read the Marathi grantha</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Hind AI’s Shivlilamrit reader keeps Sant Shridhar’s public-domain ovis and original Hind
            AI katha. It is not the copyrighted 2024 Kathasar paperback.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={bookPath(1)}
              className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              Open the pothi
            </Link>
            <Link
              href={bookPath(firstPageForSlug("1"))}
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-semibold"
            >
              Start adhyay 1
            </Link>
            <Link
              href="/festivals/maha-shivaratri"
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-semibold"
            >
              Maha Shivaratri deep page
            </Link>
            <Link
              href="/katha/mahadev"
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-semibold"
            >
              Mahadeva katha grantha
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
