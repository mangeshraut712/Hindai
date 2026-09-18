import { DURGA_SAPTASHATI_LEAVES, LEAF_IDS, type LeafId, type SaptashatiLeaf } from "./catalog";

export type DurgaSaptashatiPage =
  | { kind: "cover"; page: 1 }
  | { kind: "contents"; page: 2 }
  | { kind: "leaf"; page: number; leaf: SaptashatiLeaf };

const FIRST_LEAF = 3;

export function toDevanagariNumeral(n: number): string {
  return String(n).replace(/\d/g, (d) => "०१२३४५६७८९"[Number(d)] ?? d);
}

export function folioCount(): number {
  return 2 + LEAF_IDS.length;
}

export function bookPath(page: number): string {
  return `/durga-saptashati/book?p=${page}`;
}

export function firstPageForLeaf(id: LeafId): number {
  return FIRST_LEAF + (id - 1);
}

export function parseBookPage(raw: string | undefined): number {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(Math.floor(n), folioCount());
}

export function getPage(page: number): DurgaSaptashatiPage {
  const p = parseBookPage(String(page));
  if (p === 1) return { kind: "cover", page: 1 };
  if (p === 2) return { kind: "contents", page: 2 };
  const leaf = DURGA_SAPTASHATI_LEAVES[p - FIRST_LEAF];
  if (!leaf) return { kind: "cover", page: 1 };
  return { kind: "leaf", page: p, leaf };
}

export function nextPage(page: number): number | null {
  const p = parseBookPage(String(page));
  return p < folioCount() ? p + 1 : null;
}

export function prevPage(page: number): number | null {
  const p = parseBookPage(String(page));
  return p > 1 ? p - 1 : null;
}

export function pageLabel(page: DurgaSaptashatiPage): string {
  switch (page.kind) {
    case "cover":
      return "Cover";
    case "contents":
      return "अनुक्रमणिका";
    case "leaf":
      if (page.leaf.kind === "adhyay" && page.leaf.adhyay !== null) {
        return `अध्याय ${toDevanagariNumeral(page.leaf.adhyay)}`;
      }
      return page.leaf.titleMr;
    default: {
      const _exhaustive: never = page;
      return _exhaustive;
    }
  }
}
