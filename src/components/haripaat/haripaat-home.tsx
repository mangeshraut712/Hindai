import Image from "next/image";
import Link from "next/link";
import { HARIPAAT_LEAVES, HARIPAAT_SOURCE_NOTE } from "@/lib/data/haripaat/catalog";
import { bookPath, firstPageForLeaf, toDevanagariNumeral } from "@/lib/data/haripaat/book";
import { GurukulHero } from "@/components/gurukul/gurukul-media";

export function HaripaatHome() {
  return (
    <div>
      <GurukulHero
        src="/haripaat/hero.webp"
        alt="Artist impression of Vitthal/Krishna for Haripaat — not a photograph of a living murti"
        eyebrow="ॐ नमो भगवते वासुदेवाय · हरिपाठ"
        title="Daily Hari patha for the household"
        copy={`${HARIPAAT_SOURCE_NOTE.tradition}. ${HARIPAAT_SOURCE_NOTE.note} Root motifs: ${HARIPAAT_SOURCE_NOTE.root}.`}
        actions={
          <>
            <Link
              href={bookPath(1)}
              className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              Open Haripaat
            </Link>
            <Link
              href="/harivijay"
              className="inline-flex h-11 items-center rounded-full border border-border/70 bg-background/80 px-5 text-sm font-semibold backdrop-blur"
            >
              Harivijay pothi →
            </Link>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="pothi-ebook-book">
          <div id="haripaat-anukramanika" className="scroll-mt-24 px-5 py-8 sm:px-8">
            <h2 className="text-center font-serif text-2xl text-primary">अनुक्रमणिका</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
              Ten leaves for a short daily cycle. Read one leaf at dawn or on ekadashi evening.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="pothi-anukramanika w-full min-w-[28rem] border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-foreground/80 text-left">
                    <th className="w-16 py-2 pr-2 font-semibold">क्र.</th>
                    <th className="py-2 pr-2 font-semibold">पाठाचे नाव</th>
                    <th className="w-24 py-2 text-right font-semibold">वाचा</th>
                  </tr>
                </thead>
                <tbody>
                  {HARIPAAT_LEAVES.map((leaf) => (
                    <tr key={leaf.id} className="border-b border-border/60 align-top">
                      <td className="py-3 pr-2 font-devanagari tabular-nums text-primary">
                        {toDevanagariNumeral(leaf.id)}
                      </td>
                      <td className="py-3 pr-2">
                        <Link
                          href={bookPath(firstPageForLeaf(leaf.id))}
                          className="font-devanagari text-base leading-6 text-foreground hover:text-primary"
                        >
                          {leaf.titleMr}
                          {leaf.special ? " · मुख्य" : ""}
                        </Link>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{leaf.titleEn}</p>
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href={bookPath(firstPageForLeaf(leaf.id))}
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
          <div className="flex justify-center border-t border-border/70 px-5 py-8">
            <Image
              src="/haripaat/cover.webp"
              alt="Haripaat cover — artist impression"
              width={480}
              height={640}
              className="h-auto w-40 rounded-md object-contain opacity-90"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
