import Image from "next/image";
import Link from "next/link";
import {
  HARIVIJAY_CHAPTERS,
  HARIVIJAY_SOURCE_NOTE,
  PARAYAN_METHODS,
} from "@/lib/data/harivijay/catalog";
import { bookPath, firstPageForChapter, toDevanagariNumeral } from "@/lib/data/harivijay/book";
import { publicUrl } from "@/lib/site";

export function HarivijayHome() {
  return (
    <div>
      <section className="pothi-garbha relative overflow-hidden border-b">
        <div className="pothi-rangoli absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8 lg:py-20">
          <div>
            <p className="eyebrow">ॐ नमो भगवते वासुदेवाय · Digital pothi · अध्याय १–३६</p>
            <h1 className="theme-ink-title mt-6 font-serif text-4xl sm:text-5xl">
              ॥ श्रीहरिविजय ॥
            </h1>
            <p className="theme-ink-title font-devanagari mt-3 text-xl opacity-95">
              कथासार · कृष्णचरित्र · छत्तीस अध्याय
            </p>
            <p className="theme-ink-copy mt-5 max-w-2xl text-base leading-7">
              Sant {HARIVIJAY_SOURCE_NOTE.composer}’s Marathi ovi grantha (
              {HARIVIJAY_SOURCE_NOTE.year}) — the Vishnu/Krishna sister book to Shivlilamrit. Read
              original Hind AI katha-sar in Marathi or English on the classical Bhāgavata arc.
              Modern Kathasar paperbacks stay in copyright; we do not host that prose.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={bookPath(1)} className="theme-ink-cta theme-ink-cta-primary">
                Open the pothi
              </Link>
              <Link href="/haripaat" className="theme-ink-cta theme-ink-cta-ghost">
                Daily Haripaat →
              </Link>
              <Link
                href={bookPath(firstPageForChapter(4))}
                className="theme-ink-cta theme-ink-cta-ghost"
              >
                अध्याय ४ · जन्म
              </Link>
              <a href="#harivijay-anukramanika" className="theme-ink-cta theme-ink-cta-ghost">
                अनुक्रमणिका
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="pothi-paat w-full max-w-72 -rotate-3">
              <div className="bg-card overflow-hidden rounded-md px-4 py-6 text-center shadow-inner">
                <Image
                  src={publicUrl("/harivijay/cover.webp")}
                  alt="श्रीहरिविजय — artist impression cover for Hind AI"
                  width={768}
                  height={1024}
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
          <div id="harivijay-anukramanika" className="scroll-mt-24 px-5 py-8 sm:px-8">
            <h2 className="text-primary text-center font-serif text-2xl">अनुक्रमणिका</h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-center text-sm leading-6">
              {HARIVIJAY_SOURCE_NOTE.oviCountNote} Open a leaf for Hind AI katha — not a scan of a
              paperback.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="pothi-anukramanika w-full min-w-md border-collapse text-sm">
                <thead>
                  <tr className="border-foreground/80 border-b-2 text-left">
                    <th className="w-16 py-2 pr-2 font-semibold">अ. क्र.</th>
                    <th className="py-2 pr-2 font-semibold">अध्यायाचे नाव</th>
                    <th className="w-24 py-2 text-right font-semibold">वाचा</th>
                  </tr>
                </thead>
                <tbody>
                  {HARIVIJAY_CHAPTERS.map((chapter) => (
                    <tr key={chapter.id} className="border-border/60 border-b align-top">
                      <td className="font-devanagari text-primary py-3 pr-2 tabular-nums">
                        {toDevanagariNumeral(chapter.id)}
                      </td>
                      <td className="py-3 pr-2">
                        <Link
                          href={bookPath(firstPageForChapter(chapter.id))}
                          className="font-devanagari text-foreground hover:text-primary text-base leading-6"
                        >
                          {chapter.titleMr}
                          {chapter.special ? " · मुख्य" : ""}
                        </Link>
                        <p className="text-muted-foreground mt-1 text-xs leading-5">
                          {chapter.titleEn}
                        </p>
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href={bookPath(firstPageForChapter(chapter.id))}
                          className="text-primary text-xs font-semibold tracking-[0.12em] uppercase"
                        >
                          Open
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-border/70 border-t px-5 py-8 sm:px-8">
            <h2 className="font-serif text-2xl">Parayan</h2>
            <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
              {PARAYAN_METHODS.map((method) => (
                <li
                  key={method.id}
                  className="border-border/60 bg-background/60 rounded-2xl border p-5"
                >
                  <h3 className="font-serif text-xl">{method.title}</h3>
                  <p className="text-primary mt-1 text-sm font-medium">{method.titleEn}</p>
                  <p className="text-muted-foreground mt-3 text-sm leading-7">{method.bodyEn}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-border/70 border-t px-5 py-8 sm:px-8">
            <p className="text-muted-foreground text-center text-sm">
              <Link href="/shivlilamrit" className="text-primary font-semibold">
                Shivlilamrit
              </Link>
              {" · "}
              <Link href="/vishnu" className="text-primary font-semibold">
                Vishnu tirtha
              </Link>
              {" · "}
              <Link href="/katha/vishnu" className="text-primary font-semibold">
                Vishnu katha grantha
              </Link>
              {" · "}
              <Link href="/ramvijay" className="text-primary font-semibold">
                Ramvijay (next)
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
