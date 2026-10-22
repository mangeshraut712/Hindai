import {
  FREE_KATHASAR_PDF,
  PRINT_KATHASAR,
  PRINT_SHOP_LINKS,
} from "@/lib/data/shivlilamrit/print-edition";

export function PrintBookShop({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "mt-6 space-y-6 text-sm" : "space-y-8"}>
      <div className={compact ? undefined : "surface-panel rounded-2xl p-6"}>
        <h2 className={compact ? "font-medium" : "font-serif text-2xl"}>Download the free PDF</h2>
        <p
          className={
            compact ? "mt-1 opacity-80" : "text-muted-foreground mt-3 max-w-3xl text-sm leading-7"
          }
        >
          {FREE_KATHASAR_PDF.titleMr} ({FREE_KATHASAR_PDF.sizeLabel}). {FREE_KATHASAR_PDF.note}
        </p>
        <ul className={`m-0 flex list-none flex-wrap gap-2 p-0 ${compact ? "mt-3" : "mt-5"}`}>
          <li>
            <a
              href={FREE_KATHASAR_PDF.hrefEn}
              download={FREE_KATHASAR_PDF.downloadEn}
              className="bg-primary text-primary-foreground inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold hover:opacity-95"
              data-testid="ebook-pdf-en"
            >
              Download PDF (English filename)
            </a>
          </li>
          <li>
            <a
              href={FREE_KATHASAR_PDF.hrefMr}
              download={FREE_KATHASAR_PDF.downloadMr}
              className="border-border bg-background hover:bg-secondary inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium"
              data-testid="ebook-pdf-mr"
            >
              PDF · मराठी नाव
            </a>
          </li>
        </ul>
      </div>

      <div className={compact ? undefined : "surface-panel rounded-2xl p-6"}>
        <h2 className={compact ? "font-medium" : "font-serif text-2xl"}>Buy the print Kathasar</h2>
        <p
          className={
            compact ? "mt-1 opacity-80" : "text-muted-foreground mt-3 max-w-3xl text-sm leading-7"
          }
        >
          {PRINT_KATHASAR.titleMr} · {PRINT_KATHASAR.author} · {PRINT_KATHASAR.publisher}.{" "}
          {PRINT_KATHASAR.note}
        </p>
        <ul className={`m-0 flex list-none flex-wrap gap-2 p-0 ${compact ? "mt-3" : "mt-5"}`}>
          {PRINT_SHOP_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border bg-background hover:bg-secondary inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium"
                data-testid={`print-shop-${link.id}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
