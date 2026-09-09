import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GurukulHero } from "@/components/gurukul/gurukul-media";
import { GANESH_AARTI_SANGRAH, aartiKindLabel } from "@/lib/data/ganesh-aarti-sangrah";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ganesh Marathi Aarti Sangrah",
  description:
    "Read and listen to the Dagdusheth Halwai Marathi Ganesh aarti collection: Sukhakarta, Devi, Shiva, Vitthal, Datta, Atharvashirsha, and temple prayers, with English and IAST.",
  alternates: {
    canonical: `${SITE_URL}/ganesh-aarti`,
  },
};

export default function GaneshAartiIndexPage() {
  const missingBefore = GANESH_AARTI_SANGRAH.filter((item) => !item.onSiteBefore);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <GurukulHero
          src="/ganesh-aarti/hero.webp"
          alt="Artist impression of four-armed Ganesha with mushaka — not a photograph of a living murti"
          eyebrow="जय गणेश आरती संग्रह · Pune"
          title="Marathi Ganesh aartis, as a living book"
          copy={`A photographed Dagdusheth Halwai Trust pamphlet was used only as a checklist. The PDF is not on this site. ${missingBefore.length} of these hymns were missing from Hind AI before. The portrait keeps shastric marks: four arms, ekadanta, modaka, goad, noose, and mouse.`}
          actions={
            <Link
              href="/ganesha"
              className="inline-flex h-11 items-center rounded-full border border-border/70 bg-background/80 px-5 text-sm font-semibold backdrop-blur"
            >
              Ashtavinayak map →
            </Link>
          }
        />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl">Contents</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Open any hymn for Devanagari, IAST, English, and meaning layers.
          </p>
          <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
            {GANESH_AARTI_SANGRAH.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/ganesh-aarti/${item.slug}`}
                  className="group block h-full border-b border-border/70 py-5 transition hover:border-primary/50"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {aartiKindLabel(item.kind)} · {item.deity}
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-foreground group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-devanagari text-primary">{item.titleMr}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {item.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
