import Image from "next/image";
import Link from "next/link";
import { SHAKTI_PEETHAS } from "@/lib/data/shakti-peethas";
import { CANONICAL_COUNTS } from "@/lib/data/canonical-counts";
import { DEVI_DEEP } from "@/lib/data/tradition-deep";
import { SacredMap } from "@/components/tirtha/sacred-map";
import { TraditionDeepSection } from "@/components/tirtha/tradition-deep-section";
import { GurukulHero } from "@/components/gurukul/gurukul-media";

export function DeviHome() {
  const peethas = SHAKTI_PEETHAS.filter((item) => item.listStatus !== "major-yatra");
  const yatras = SHAKTI_PEETHAS.filter((item) => item.listStatus === "major-yatra");

  return (
    <div>
      <GurukulHero
        src="/devi/hero.webp"
        alt="Artist impression of Devi — not a photograph"
        eyebrow="शक्त्यै नमः · Devi"
        title="Shakti Peethas we can locate — and yatras we will not fake as peethas"
        copy={`Printed books name ${CANONICAL_COUNTS.shaktiPeethas} peethas. Lists disagree. Hind AI indexes ${SHAKTI_PEETHAS.length} living places with coordinates, then labels which ones are common peethas, disputed assignments, or popular yatras only.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl">Location-wise katha</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          The Daksha-yajna story is one katha. It does not give a GPS order for Sati’s body. Use the
          Devi story trail to move west to east across indexed pins.
        </p>
        <div className="mt-8">
          <SacredMap tradition="shakta" />
        </div>
      </section>

      <TraditionDeepSection title="Deeper Śākta knowledge" primers={DEVI_DEEP} />

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl">Indexed peethas and disputed peethas</h2>
        <ul className="mt-8 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3">
          {peethas.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/devi/${item.slug}`}
                className="group grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 border-b border-border/70 py-4"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={`Artist impression for ${item.name}`}
                    width={240}
                    height={180}
                    className="h-20 w-[6.5rem] rounded-lg object-cover"
                    sizes="104px"
                  />
                ) : (
                  <div className="h-20 w-[6.5rem] rounded-lg bg-muted" />
                )}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {item.country} · {item.listStatus}
                  </p>
                  <h3 className="mt-1 font-serif text-lg group-hover:text-primary">{item.name}</h3>
                  <p className="font-devanagari text-sm text-primary">{item.sanskrit}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl">Major yatras, not forced into the 51</h2>
        <ul className="mt-8 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-2 md:gap-x-10">
          {yatras.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/devi/${item.slug}`}
                className="group grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-border/70 py-5"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={`Artist impression for ${item.name}`}
                    width={280}
                    height={200}
                    className="h-24 w-28 rounded-lg object-cover"
                    sizes="112px"
                  />
                ) : (
                  <div className="h-24 w-28 rounded-lg bg-muted" />
                )}
                <div>
                  <h3 className="font-serif text-xl group-hover:text-primary">{item.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {item.bodyPartNote}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-3xl p-8 sm:p-10">
          <h2 className="font-serif text-3xl">Keep reading</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Tirtha pins are only half the map. Open the Devi katha grantha for hymn-depth story,
            then return here for place pages.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/katha/devi"
              className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              Devi katha grantha
            </Link>
            <Link
              href="/festivals/sharad-navaratri"
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-semibold"
            >
              Sharad Navaratri
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
