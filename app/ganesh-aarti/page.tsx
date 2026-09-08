import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GaneshaMurti } from "@/components/aarti/ganesha-murti";
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
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <span className="eyebrow">जय गणेश आरती संग्रह • Pune</span>
              <h1 className="section-title mt-6">Marathi Ganesh aartis, as a living book</h1>
              <p className="section-copy mt-5">
                A photographed Dagdusheth Halwai Trust pamphlet was used only as a checklist. The
                PDF is not on this site. {missingBefore.length} of these hymns were missing from
                Hind AI before; only Sukhakarta existed in unused data.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Cover photo in the pamphlet is the real gold-seated Dagdusheth murti with mushaka
                and crown. We do not copy that Trust photograph. The drawing here keeps the same
                shastric marks: four arms, ekadanta, modaka, goad, noose, and mouse.
              </p>
            </div>
            <div className="surface-panel flex items-center justify-center rounded-3xl p-6">
              <GaneshaMurti className="h-72 w-full text-primary" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl">Contents</h2>
          <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
            {GANESH_AARTI_SANGRAH.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/ganesh-aarti/${item.slug}`}
                  className="surface-panel block h-full rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {aartiKindLabel(item.kind)} · booklet p. {item.bookletPages}
                  </p>
                  <h3 className="mt-3 font-serif text-xl">{item.title}</h3>
                  <p className="mt-1 font-devanagari text-primary">{item.titleMr}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted-foreground">
            Temple hours follow{" "}
            <a
              className="underline underline-offset-4"
              href="https://www.dagdushethganpati.com/"
              rel="noreferrer"
              target="_blank"
            >
              dagdushethganpati.com
            </a>
            . The printed leaflet times are slightly older.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
