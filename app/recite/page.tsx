import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RECITATIONS, recitationVerseCount } from "@/lib/data/recitations/catalog";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recitations",
  description:
    "Full original recitations: Hanuman Chalisa, Vishnu Sahasranama, Kanakadhara Stotram, Shiva Shatakam, Kala Bhairava Ashtakam, Ganapati Atharvashirsha, Santana Gopala, Durga Saptashati, and Aditya Hridayam.",
  alternates: { canonical: `${SITE_URL}/recite` },
};

export default function ReciteIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="eyebrow">पाठ · Recitation</p>
            <h1 className="section-title mt-4">Full hymns for difficult days</h1>
            <p className="section-copy mt-5">
              Each page is the original text, verse by verse, with IAST for pronunciation and a
              browser voice that can read the section aloud. English on the Hanuman Chalisa and
              Ganapati Atharvashirsha explains the verses. The other hymns are here to be recited
              in the original.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-3xl space-y-4 px-4 py-12 sm:px-6 lg:px-8">
          <ul className="space-y-4">
            {RECITATIONS.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/recite/${item.slug}`}
                  className="surface-panel block rounded-2xl p-5 transition-colors hover:border-primary/40"
                >
                  <p className="text-sm text-primary">{item.occasion}</p>
                  <h2 className="mt-2 font-serif text-2xl">{item.title}</h2>
                  <p className="mt-1 font-devanagari text-lg text-muted-foreground">{item.titleSa}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.summary}</p>
                  <p className="mt-3 text-xs font-semibold tracking-[0.16em] text-muted-foreground">
                    {item.deity} · {recitationVerseCount(item)} verses
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
