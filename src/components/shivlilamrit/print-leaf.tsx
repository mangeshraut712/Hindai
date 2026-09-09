import Image from "next/image";
import { type Folio, contentsRows, toDevanagariNumeral } from "@/lib/data/shivlilamrit/book";
import type { ReaderLocale } from "@/lib/data/shivlilamrit/catalog";
import { oviDisplay } from "@/lib/data/shivlilamrit/locales";

const BOOK_NAME = "श्रीशिवलीलामृत कथासार";

export function PrintLeaf({
  folio,
  locale,
  heading,
  kathaLines,
  ovis,
  ovisLoading,
  activeLine,
  onJump,
  onStartAdhyay1,
  lineOffset = 0,
}: {
  folio: Folio;
  locale: ReaderLocale;
  heading: string;
  kathaLines: string[];
  ovis: Array<{ n: number; text: string }>;
  ovisLoading: boolean;
  activeLine: number | null;
  onJump: (page: number) => void;
  onStartAdhyay1: () => void;
  lineOffset?: number;
}) {
  const mark = (index: number) =>
    activeLine === lineOffset + index ? "pothi-ovi-active" : undefined;
  if (folio.kind === "cover") {
    return (
      <div className="pdf-sheet pdf-cover">
        <h1 className="sr-only">सचित्र श्रीशिवलीलामृत</h1>
        <Image
          src="/shivlilamrit/cover.webp"
          alt="सचित्र श्रीशिवलीलामृत कथासार"
          width={634}
          height={951}
          className="pdf-cover-art"
          unoptimized
          priority
        />
        <button type="button" className="pdf-start" onClick={onStartAdhyay1}>
          Start adhyay 1
        </button>
      </div>
    );
  }

  return (
    <article className="pdf-sheet">
      <p className="pdf-running font-devanagari">
        {folio.kind === "contents"
          ? "* अनुक्रमणिका *"
          : folio.chapterId
            ? `॥ ${BOOK_NAME} · अध्याय ${toDevanagariNumeral(folio.chapterId)} ॥`
            : `* ${BOOK_NAME} *`}
      </p>

      {folio.kind === "title" ? (
        <div className="pdf-title">
          <p>॥ {BOOK_NAME} ॥</p>
          <p>नवीन सुधारित आवृत्ती</p>
          <p>संत श्रीधर स्वामी नाझरेकर</p>
        </div>
      ) : null}

      {folio.kind === "contents" ? (
        <ol className="pdf-toc font-devanagari">
          {contentsRows().map((row) => (
            <li key={`${row.slug}-${row.page}`}>
              <button type="button" className="pdf-toc-row" onClick={() => onJump(row.page)}>
                <span>{row.titleMr}</span>
                <span className="pdf-toc-dots" />
                <span>{toDevanagariNumeral(row.page)}</span>
              </button>
            </li>
          ))}
        </ol>
      ) : null}

      {folio.kind === "katha" ? (
        <div className="pdf-story font-devanagari">
          {folio.chapterId ? (
            <p className="pdf-chapter">
              ॥ अध्याय {toDevanagariNumeral(folio.chapterId)} ॥{folio.special ? " रुद्र" : ""}
            </p>
          ) : null}
          <h1>{heading}</h1>
          {kathaLines.map((para, index) => (
            <p key={`k-${index}`} className={mark(index)}>
              {para}
            </p>
          ))}
        </div>
      ) : null}

      {folio.kind === "ovis" ? (
        <div className="pdf-story font-devanagari">
          {folio.chapterId ? (
            <p className="pdf-chapter">
              ॥ अध्याय {toDevanagariNumeral(folio.chapterId)} · ओव्या ॥
              {folio.special ? " रुद्र" : ""}
            </p>
          ) : null}
          <h1>{heading}</h1>
          {ovisLoading ? <p className="pdf-muted">Loading ovis…</p> : null}
          {!ovisLoading && ovis.length === 0 ? (
            <p className="pdf-muted">No ovis on this leaf.</p>
          ) : null}
          {ovis.map((ovi, index) => (
            <p key={ovi.n} className={mark(index)}>
              {oviDisplay(ovi.text, locale)} ॥{ovi.n}॥
            </p>
          ))}
        </div>
      ) : null}
    </article>
  );
}
