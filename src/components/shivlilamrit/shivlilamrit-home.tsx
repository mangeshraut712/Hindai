import Image from "next/image";
import Link from "next/link";
import { PrintBookShop } from "@/components/shivlilamrit/print-book-shop";
import {
  PARAYAN_METHODS,
  SHIVLILAMRIT_CHAPTERS,
  SHIVLILAMRIT_SOURCE_NOTE,
} from "@/lib/data/shivlilamrit/catalog";
import { bookPath, firstPageForSlug, toDevanagariNumeral } from "@/lib/data/shivlilamrit/book";
import { listPothi } from "@/lib/data/shivlilamrit/pothi";
import { FREE_KATHASAR_PDF } from "@/lib/data/shivlilamrit/print-edition";

export function ShivlilamritHome() {
  const extras = listPothi().filter((entry) => entry.kind !== "adhyay");

  return (
    <div>
      <section className="pothi-garbha relative overflow-hidden border-b">
        <div className="pothi-rangoli absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8 lg:py-20">
          <div>
            <p className="eyebrow">ॐ नमः शिवाय · Digital pothi · अध्याय १–१५</p>
            <h1 className="theme-ink-title mt-6 font-serif text-4xl sm:text-5xl">
              ॥ श्रीशिवलीलामृत ॥
            </h1>
            <p className="theme-ink-title mt-3 font-devanagari text-xl opacity-95">
              कथासार · अध्याय पहिला ते पंधरावा
            </p>
            <p className="theme-ink-copy mt-5 max-w-2xl text-base leading-7">
              Sant {SHIVLILAMRIT_SOURCE_NOTE.composer}’s Marathi ovi grantha (
              {SHIVLILAMRIT_SOURCE_NOTE.year}). Read or hear public-domain ovis with original Hind
              AI katha-sar, or download the free PDF ({FREE_KATHASAR_PDF.sizeLabel}). The 2024
              illustrated Kathasar paperback stays in copyright — buy print below; we do not host
              that publisher’s prose.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={bookPath(1)} className="theme-ink-cta theme-ink-cta-primary">
                Open the pothi
              </Link>
              <a
                href={FREE_KATHASAR_PDF.hrefEn}
                download={FREE_KATHASAR_PDF.downloadEn}
                className="theme-ink-cta theme-ink-cta-ghost"
                data-testid="ebook-pdf-hero"
              >
                Download PDF
              </a>
              <Link
                href={bookPath(firstPageForSlug("11"))}
                className="theme-ink-cta theme-ink-cta-ghost"
              >
                अध्याय ११ · रुद्र
              </Link>
              <a href="#shivlilamrit-anukramanika" className="theme-ink-cta theme-ink-cta-ghost">
                अनुक्रमणिका
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="pothi-paat w-full max-w-72 rotate-[-3deg]">
              <div className="overflow-hidden rounded-md bg-card px-4 py-6 text-center shadow-inner">
                <Image
                  src="/shivlilamrit/cover.webp"
                  alt="सचित्र श्रीशिवलीलामृत कथासार — cover art"
                  width={634}
                  height={951}
                  className="mx-auto h-auto w-full max-w-56 rounded-sm object-contain"
                  unoptimized
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="pothi-ebook-book">
          <div id="shivlilamrit-anukramanika" className="scroll-mt-24 px-5 py-8 sm:px-8">
            <h2 className="text-center font-serif text-2xl text-primary">अनुक्रमणिका</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
              Photographed print order. Open a leaf to read ovis and Hind AI katha — not a scan of
              the paperback.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="pothi-anukramanika w-full min-w-[28rem] border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-foreground/80 text-left">
                    <th className="w-16 py-2 pr-2 font-semibold">अ. क्र.</th>
                    <th className="py-2 pr-2 font-semibold">अध्यायाचे नाव</th>
                    <th className="w-24 py-2 text-right font-semibold">वाचा</th>
                  </tr>
                </thead>
                <tbody>
                  {SHIVLILAMRIT_CHAPTERS.map((chapter) => (
                    <tr key={chapter.id} className="border-b border-border/60 align-top">
                      <td className="py-3 pr-2 font-devanagari tabular-nums text-primary">
                        {toDevanagariNumeral(chapter.id)}
                      </td>
                      <td className="py-3 pr-2">
                        <Link
                          href={bookPath(firstPageForSlug(String(chapter.id)))}
                          className="font-devanagari text-base leading-6 text-foreground hover:text-primary"
                        >
                          {chapter.titleMr}
                          {chapter.special ? " · रुद्र" : ""}
                        </Link>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {chapter.titleEn}
                        </p>
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href={bookPath(firstPageForSlug(String(chapter.id)))}
                          className="text-xs font-semibold uppercase tracking-[0.12em] text-primary"
                        >
                          Open
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mt-10 font-serif text-xl">Front matter and closing</h3>
            <ul className="mt-4 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2">
              {extras.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={bookPath(firstPageForSlug(entry.slug))}
                    className="block rounded-xl border border-border/60 px-4 py-3 transition hover:border-primary/40"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      {entry.kind === "front" ? "Front" : "Closing"}
                    </p>
                    <p className="mt-1 font-devanagari text-primary">{entry.titleMr}</p>
                    <p className="text-sm text-muted-foreground">{entry.titleEn}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border/70 px-5 py-8 sm:px-8">
            <h2 className="font-serif text-2xl">Parayan for Shravan</h2>
            <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
              {PARAYAN_METHODS.map((method) => (
                <li
                  key={method.id}
                  className="rounded-2xl border border-border/60 bg-background/60 p-5"
                >
                  <h3 className="font-serif text-xl">{method.title}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{method.titleEn}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{method.bodyEn}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border/70 px-5 py-8 sm:px-8">
            <PrintBookShop compact />
            <p className="mt-8 text-center text-sm text-muted-foreground">
              <Link href="/mahadev" className="font-semibold text-primary">
                12 Jyotirlingas
              </Link>
              {" · "}
              <Link href="/katha/mahadev" className="font-semibold text-primary">
                Mahadev katha grantha
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
