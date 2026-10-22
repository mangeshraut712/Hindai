import Image from "next/image";
import Link from "next/link";
import { RAMVIJAY_CHAPTERS, RAMVIJAY_SOURCE_NOTE } from "@/lib/data/ramvijay/catalog";
import { bookPath, firstPageForChapter, toDevanagariNumeral } from "@/lib/data/ramvijay/book";
import { publicUrl } from "@/lib/site";

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
            <p className="theme-ink-title font-devanagari mt-3 text-xl opacity-95">
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
            <div className="pothi-paat w-full max-w-72 -rotate-3">
              <div className="bg-card overflow-hidden rounded-md px-4 py-6 text-center shadow-inner">
                <Image
                  src={publicUrl("/ramvijay/cover.webp")}
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
            <h2 className="text-primary text-center font-serif text-2xl">अनुक्रमणिका</h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-center text-sm leading-6">
              {RAMVIJAY_SOURCE_NOTE.oviCountNote}
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
                  {RAMVIJAY_CHAPTERS.map((chapter) => (
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
            <p className="text-muted-foreground text-center text-sm">
              <Link href="/harivijay" className="text-primary font-semibold">
                Harivijay
              </Link>
              {" · "}
              <Link href="/shivlilamrit" className="text-primary font-semibold">
                Shivlilamrit
              </Link>
              {" · "}
              <Link href="/vishnu" className="text-primary font-semibold">
                Vishnu tirtha
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
