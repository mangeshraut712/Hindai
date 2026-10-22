import Link from "next/link";
import {
  DURGA_SAPTASHATI_LEAVES,
  DURGA_SAPTASHATI_SOURCE_NOTE,
  PARAYAN_METHODS,
  charitraLabel,
} from "@/lib/data/durga-saptashati/catalog";
import { bookPath, firstPageForLeaf, toDevanagariNumeral } from "@/lib/data/durga-saptashati/book";
import { GurukulHero } from "@/components/gurukul/gurukul-media";
import { publicUrl } from "@/lib/site";

export function DurgaSaptashatiHome() {
  return (
    <div>
      <GurukulHero
        src={publicUrl("/durga-saptashati/cover.webp")}
        alt="Artist impression of Goddess Durga for Durga Saptashati — not a photograph of a living murti"
        eyebrow="ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे · दुर्गा सप्तशती"
        title="Devi Mahatmya as a living Chandi patha"
        copy={`${DURGA_SAPTASHATI_SOURCE_NOTE.tradition}. ${DURGA_SAPTASHATI_SOURCE_NOTE.note} ${DURGA_SAPTASHATI_SOURCE_NOTE.verseNote}`}
        actions={
          <>
            <Link
              href={bookPath(1)}
              className="bg-primary text-primary-foreground inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold"
            >
              Open the pothi
            </Link>
            <Link
              href={bookPath(firstPageForLeaf(4))}
              className="border-border/70 bg-background/80 inline-flex h-11 items-center rounded-full border px-5 text-sm font-semibold backdrop-blur-sm"
            >
              अध्याय १ · मधु-कैटभ
            </Link>
            <Link
              href="/recite/durga-saptashati"
              className="border-border/70 bg-background/80 inline-flex h-11 items-center rounded-full border px-5 text-sm font-semibold backdrop-blur-sm"
            >
              Recite the full path
            </Link>
            <Link
              href="/festivals/sharad-navaratri"
              className="border-border/70 bg-background/80 inline-flex h-11 items-center rounded-full border px-5 text-sm font-semibold backdrop-blur-sm"
            >
              Sharad Navaratri →
            </Link>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="pothi-ebook-book">
          <div id="durga-saptashati-anukramanika" className="scroll-mt-24 px-5 py-8 sm:px-8">
            <h2 className="text-primary text-center font-serif text-2xl">अनुक्रमणिका</h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-center text-sm leading-6">
              Three angas, then thirteen adhyayas across Prathama · Madhyama · Uttama caritas. Open
              a leaf for Hind AI katha-sar — not a publisher’s Sanskrit scan.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="pothi-anukramanika w-full min-w-md border-collapse text-sm">
                <thead>
                  <tr className="border-foreground/80 border-b-2 text-left">
                    <th className="w-16 py-2 pr-2 font-semibold">क्र.</th>
                    <th className="py-2 pr-2 font-semibold">पाठाचे नाव</th>
                    <th className="w-28 py-2 pr-2 font-semibold">चरित्र</th>
                    <th className="w-24 py-2 text-right font-semibold">वाचा</th>
                  </tr>
                </thead>
                <tbody>
                  {DURGA_SAPTASHATI_LEAVES.map((leaf) => (
                    <tr key={leaf.id} className="border-border/60 border-b align-top">
                      <td className="font-devanagari text-primary py-3 pr-2 tabular-nums">
                        {toDevanagariNumeral(leaf.id)}
                      </td>
                      <td className="py-3 pr-2">
                        <Link
                          href={bookPath(firstPageForLeaf(leaf.id))}
                          className="font-devanagari text-foreground hover:text-primary text-base leading-6"
                        >
                          {leaf.titleMr}
                          {leaf.special ? " · मुख्य" : ""}
                        </Link>
                        <p className="text-muted-foreground mt-1 text-xs leading-5">
                          {leaf.titleEn}
                        </p>
                      </td>
                      <td className="text-muted-foreground py-3 pr-2 text-xs">
                        {charitraLabel(leaf.charitra)}
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href={bookPath(firstPageForLeaf(leaf.id))}
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl">How households read it</h2>
        <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
          {PARAYAN_METHODS.map((method) => (
            <li key={method.id} className="border-border/70 border-t pt-5">
              <h3 className="font-serif text-xl">{method.titleMr}</h3>
              <p className="text-primary mt-1 text-xs tracking-[0.14em] uppercase">
                {method.titleEn}
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-7">{method.bodyEn}</p>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground mt-10 text-sm">
          Also open{" "}
          <Link href="/devi" className="text-primary font-semibold">
            Devi tirtha
          </Link>{" "}
          and{" "}
          <Link href="/katha/devi" className="text-primary font-semibold">
            Devi katha grantha
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
