import { PRINT_KATHASAR, PRINT_SHOP_LINKS } from "@/lib/data/shivlilamrit/print-edition";

export function PrintBookShop({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "mt-6 text-sm" : "surface-panel mt-10 rounded-2xl p-6"}>
      <h2 className={compact ? "font-medium" : "font-serif text-2xl"}>Buy the print Kathasar</h2>
      <p
        className={
          compact ? "mt-1 opacity-80" : "mt-3 max-w-3xl text-sm leading-7 text-muted-foreground"
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
              className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-4 text-sm font-medium hover:bg-secondary"
              data-testid={`print-shop-${link.id}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
