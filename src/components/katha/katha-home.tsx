import Image from "next/image";
import Link from "next/link";
import { KATHA_GRANTHAS, KATHA_NOTE } from "@/lib/data/katha-grantha";
import { GurukulHero } from "@/components/gurukul/gurukul-media";

export function KathaHome() {
  return (
    <div>
      <GurukulHero
        src="/katha/hero.webp"
        alt="Artist impression of a sacred manuscript desk — not a photograph"
        eyebrow="कथा ग्रन्थ · Story library"
        title="Book-depth god stories that stay on Hind AI"
        copy={KATHA_NOTE}
        imageClassName="h-[26rem] sm:h-[32rem]"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl">Four granthas</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Read chapter by chapter. Each grantha links back to tirtha maps, festivals, and living
          practice pages so story never floats free of place.
        </p>
        <ul className="mt-10 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-2 md:gap-x-10">
          {KATHA_GRANTHAS.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/katha/${item.slug}`}
                className="group grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-border/70 py-5"
              >
                <Image
                  src={item.heroImage}
                  alt={`Artist impression for ${item.title}`}
                  width={280}
                  height={200}
                  className="h-24 w-28 rounded-lg object-cover"
                  sizes="112px"
                />
                <div>
                  <p className="font-devanagari text-primary">{item.sanskrit}</p>
                  <h3 className="mt-1 font-serif text-2xl group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {item.tagline}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {item.chapters.length} chapters
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
