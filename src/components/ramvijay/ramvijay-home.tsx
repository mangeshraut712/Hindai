import Image from "next/image";
import Link from "next/link";
import { RAMVIJAY_CHAPTERS, RAMVIJAY_SOURCE_NOTE } from "@/lib/data/ramvijay/catalog";
import { bookPath, firstPageForChapter, toDevanagariNumeral } from "@/lib/data/ramvijay/book";

export function RamvijayHome() {
  return (
    <div>
      <section className="pothi-garbha relative overflow-hidden border-b">
        <div className="pothi-rangoli absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8 lg:py-20">
          <div>
            <p className="eyebrow">
              ॐ श्रीरामाय नमः · Digital pothi · अध्याय १–
              {toDevanagariNumeral(RAMVIJAY_CHAPTERS.length)}
            </p>
            <h1 className="theme-ink-title mt-6 font-serif text-4xl sm:text-5xl">
              ॥ श्रीरामविजय ॥
            </h1>
            <p className="theme-ink-title mt-3 font-devanagari text-xl opacity-95">
              कथासार · रामायण आख्यान
            </p>
            <p className="theme-ink-copy mt-5 max-w-2xl text-base leading-7">
              Sant {RAMVIJAY_SOURCE_NOTE.composer}’s Marathi Rama grantha (
              {RAMVIJAY_SOURCE_NOTE.year}) — sister pothi to Harivijay and Shivlilamrit. Original
              Hind AI katha-sar in Marathi and English on the classical Rāmāyaṇa arc.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={bookPath(1)} className="theme-ink-cta theme-ink-cta-primary">
                Open the pothi
              </Link>
              <Link
                href={bookPath(firstPageForChapter(3))}
                className="theme-ink-cta theme-ink-cta-ghost"
              >
                अध्याय ३ · जन्म
              </Link>
              <a href="#ramvijay-anukramanika" className="theme-ink-cta theme-ink-cta-ghost">
                अनुक्रमणिका
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="pothi-paat w-full max-w-72 rotate-[-3deg]">
              <div className="overflow-hidden rounded-md bg-card px-4 py-6 text-center shadow-inner">
                <Image
                  src="/ramvijay/cover.webp"
                  alt="श्रीरामविजय — artist impression cover for Hind AI"
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
          <div id="ramvijay-anukramanika" className="scroll-mt-24 px-5 py-8 sm:px-8">
            <h2 className="text-center font-serif text-2xl text-primary">अनुक्रमणिका</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
              {RAMVIJAY_SOURCE_NOTE.oviCountNote}
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
                  {RAMVIJAY_CHAPTERS.map((chapter) => (
                    <tr key={chapter.id} className="border-b border-border/60 align-top">
                      <td className="py-3 pr-2 font-devanagari tabular-nums text-primary">
                        {toDevanagariNumeral(chapter.id)}
                      </td>
                      <td className="py-3 pr-2">
                        <Link
                          href={bookPath(firstPageForChapter(chapter.id))}
                          className="font-devanagari text-base leading-6 text-foreground hover:text-primary"
                        >
                          {chapter.titleMr}
                          {chapter.special ? " · मुख्य" : ""}
                        </Link>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {chapter.titleEn}
                        </p>
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href={bookPath(firstPageForChapter(chapter.id))}
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
          </div>
          <div className="border-t border-border/70 px-5 py-8 sm:px-8">
            <p className="text-center text-sm text-muted-foreground">
              <Link href="/harivijay" className="font-semibold text-primary">
                Harivijay
              </Link>
              {" · "}
              <Link href="/shivlilamrit" className="font-semibold text-primary">
                Shivlilamrit
              </Link>
              {" · "}
              <Link href="/vishnu" className="font-semibold text-primary">
                Vishnu tirtha
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
