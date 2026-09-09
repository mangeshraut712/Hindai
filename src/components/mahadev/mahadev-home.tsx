import Image from "next/image";
import Link from "next/link";
import { JYOTIRLINGAS } from "@/lib/data/jyotirlingas";
import { MAHADEV_FACTS, MAHADEV_NAMES, MAHADEV_SOURCE_NOTE } from "@/lib/data/mahadev";
import { MAHADEV_DEEP } from "@/lib/data/tradition-deep";
import { bookPath, firstPageForSlug } from "@/lib/data/shivlilamrit/book";
import { SacredMap } from "@/components/tirtha/sacred-map";
import { TraditionDeepSection } from "@/components/tirtha/tradition-deep-section";

export function MahadevHome() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <Image
          src="/mahadev/hero.png"
          alt="Artist impression of Mahadeva in Himalayan twilight — not a photograph"
          width={1920}
          height={1080}
          className="h-[28rem] w-full object-cover sm:h-[34rem]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-black/55" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <p className="eyebrow">ॐ नमः शिवाय · Mahadeva</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-foreground sm:text-5xl">
            Shiva as the tradition actually speaks — names, light, and twelve places
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {MAHADEV_SOURCE_NOTE}
          </p>
        </div>
      </section>

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

      <TraditionDeepSection
        title="Deeper Shaiva knowledge"
        primers={MAHADEV_DEEP}
      />

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
        <ul className="mt-10 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {JYOTIRLINGAS.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/mahadev/${item.slug}`}
                className="surface-panel block overflow-hidden rounded-2xl transition-transform hover:-translate-y-0.5"
              >
                <Image
                  src={item.image}
                  alt={`Artist impression for ${item.name} — not a photograph of the temple`}
                  width={1200}
                  height={900}
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {item.id} · {item.state}
                  </p>
                  <h3 className="mt-2 font-serif text-xl">{item.name}</h3>
                  <p className="font-devanagari text-primary">{item.sanskrit}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.location}</p>
                  {item.otherClaims.length > 0 ? (
                    <p className="mt-3 text-xs text-amber-800 dark:text-amber-200">
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
