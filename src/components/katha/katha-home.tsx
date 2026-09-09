import Image from "next/image";
import Link from "next/link";
import { KATHA_GRANTHAS, KATHA_NOTE } from "@/lib/data/katha-grantha";

export function KathaHome() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <Image
          src="/katha/hero.png"
          alt="Artist impression of a sacred manuscript desk — not a photograph"
          width={1920}
          height={1080}
          className="h-[26rem] w-full object-cover sm:h-[32rem]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/88 to-black/55" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <p className="eyebrow">कथा ग्रन्थ · Story library</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-foreground sm:text-5xl">
            Book-depth god stories that stay on Hind AI
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {KATHA_NOTE}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl">Four granthas</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Read chapter by chapter. Each grantha links back to tirtha maps, festivals, and living
          practice pages so story never floats free of place.
        </p>
        <ul className="mt-10 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2">
          {KATHA_GRANTHAS.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/katha/${item.slug}`}
                className="surface-panel group block overflow-hidden rounded-2xl transition-transform hover:-translate-y-0.5"
              >
                <Image
                  src={item.heroImage}
                  alt={`Artist impression for ${item.title}`}
                  width={1200}
                  height={700}
                  className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="p-6">
                  <p className="font-devanagari text-primary">{item.sanskrit}</p>
                  <h3 className="mt-2 font-serif text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.tagline}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
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
