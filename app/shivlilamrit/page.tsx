import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShivaLingam } from "@/components/shivlilamrit/shiva-lingam";
import {
  PARAYAN_METHODS,
  SHIVLILAMRIT_SOURCE_NOTE,
} from "@/lib/data/shivlilamrit/catalog";
import { bookPath, firstPageForSlug } from "@/lib/data/shivlilamrit/book";
import { listPothi } from "@/lib/data/shivlilamrit/pothi";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shivlilamrit — all-India Shravan pothi",
  description:
    "Read or listen to Sant Shridhar Swami’s Shivlilamrit: Marathi, Hindi, English, and Roman, in a mandir-like digital pothi. Fifteen adhyays, Rudra chapter 11, and closing stotras.",
  alternates: {
    canonical: `${SITE_URL}/shivlilamrit`,
  },
};

export default function ShivlilamritIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="pothi-garbha relative overflow-hidden border-b border-amber-700/40">
          <div className="pothi-rangoli absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
            <div>
              <span className="eyebrow text-amber-200/90">ॐ नमः शिवाय · All India · Read or listen</span>
              <h1 className="mt-6 font-serif text-4xl text-amber-50 sm:text-5xl">Shivlilamrit Kathasar, as a living pothi</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-amber-100/85">
                Marathi ovis stay the heart of this grantha. Hindi katha, English notes, and Roman
                (IAST) make the same fifteen adhyays usable from Kashmir to Kanyakumari. Open it
                like a puja paat: diya, ghanta, and a leaf you can read or hear.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-amber-100/70">
                {SHIVLILAMRIT_SOURCE_NOTE.composer} wrote the ovi grantha in {SHIVLILAMRIT_SOURCE_NOTE.year}.
                This digital book follows the photographed अनुक्रमणिका: nityapath, phalashruti,
                adhyay 1–15, forty-two daily ovis, Jyotirlinga, 108 names, manas-puja, aarti, and
                closing stotras. Adhyay 11 stays the Rudra chapter. The 2024 Kathasar paperback is
                still in copyright — we mapped its order from your photos, then filled the reader
                with Shridhar’s public-domain ovis and original Hind AI katha-sar.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={bookPath(1)}
                  className="inline-flex h-11 items-center rounded-full bg-amber-300 px-7 text-sm font-semibold text-stone-900"
                >
                  Open the pothi
                </Link>
                <Link
                  href={bookPath(firstPageForSlug("11"))}
                  className="inline-flex h-11 items-center rounded-full border border-amber-200/40 px-7 text-sm font-semibold text-amber-50"
                >
                  Start adhyay 11
                </Link>
                <Link
                  href={bookPath(firstPageForSlug("nitya-ovis"))}
                  className="inline-flex h-11 items-center rounded-full border border-amber-200/40 px-7 text-sm font-semibold text-amber-50"
                >
                  Listen daily ovis
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="pothi-paat w-72 rotate-[-4deg]">
                <div className="pothi-leaf px-5 py-8 text-center">
                  <ShivaLingam className="mx-auto h-40 w-full text-primary" />
                  <p className="mt-4 font-devanagari text-xl">सचित्र श्रीशिवलीलामृत कथासार</p>
                  <p className="mt-2 font-serif text-sm">Mandir paat · २७८० ovis · MR · HI · EN</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl">Parayan for Shravan</h2>
          <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
            {PARAYAN_METHODS.map((method) => (
              <li key={method.id} className="surface-panel rounded-2xl p-5">
                <h3 className="font-serif text-xl">{method.title}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{method.titleEn}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{method.body}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{method.bodyEn}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl">Entire pothi, in print order</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Same sequence as the photographed अनुक्रमणिका. Ovis remain Marathi; katha is also in
            Hindi and English, with Roman for anyone who can hear the sound but not the script.
            Chapter titles match your book (Priyavrata–Gokarna in adhyay 3, Simantini in 6,
            Bhadrasen in 11).
          </p>
          <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
            {listPothi().map((entry, index) => (
              <li key={entry.slug}>
                <Link
                  href={bookPath(firstPageForSlug(entry.slug))}
                  className="surface-panel block h-full rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {index + 1} · {entry.kind}
                    {entry.chapterId === 11 ? " · Rudra" : ""}
                  </p>
                  <h3 className="mt-3 font-serif text-xl">{entry.titleEn}</h3>
                  <p className="mt-1 font-devanagari text-primary">{entry.titleMr}</p>
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
