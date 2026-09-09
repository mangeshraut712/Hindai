import type { TraditionPrimer } from "@/lib/data/tradition-deep";

const KIND_LABEL: Record<TraditionPrimer["kind"], string> = {
  katha: "Katha · tradition",
  practice: "Living practice",
  geography: "Geography · checkable",
  etiquette: "Temple etiquette",
  fun: "Fun fact",
};

export function TraditionDeepSection({
  title,
  primers,
}: {
  title: string;
  primers: TraditionPrimer[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="font-serif text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
        Depth without fake certainty — stories labelled as stories, places labelled as places.
      </p>
      <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
        {primers.map((item) => (
          <li key={item.id} className="surface-panel rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {KIND_LABEL[item.kind]}
            </p>
            <h3 className="mt-2 font-serif text-xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
