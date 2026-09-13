import { listAshtavinayakSlugs } from "@/lib/data/ashtavinayak";
import { listCharDhamSlugs } from "@/lib/data/char-dham";
import { listGaneshAartiSlugs } from "@/lib/data/ganesh-aarti-sangrah";
import { listJyotirlingaSlugs } from "@/lib/data/jyotirlingas";
import { kathaSlugs } from "@/lib/data/katha-grantha";
import { listShaktiPeethaSlugs } from "@/lib/data/shakti-peethas";
import { utsavSlugs } from "@/lib/data/utsav";
import { listPothi } from "@/lib/data/shivlilamrit/pothi";
import { scriptureCatalog } from "@/lib/scripture-catalog";
import { absolutePageUrl } from "@/lib/site";

export type PublicSitemapEntry = {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

const STATIC_PAGES: PublicSitemapEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/ai-guide", changeFrequency: "weekly", priority: 0.9 },
  { path: "/guide", changeFrequency: "weekly", priority: 0.9 },
  { path: "/sadhana", changeFrequency: "daily", priority: 0.9 },
  { path: "/contents", changeFrequency: "weekly", priority: 0.9 },
  { path: "/daily", changeFrequency: "daily", priority: 0.8 },
  { path: "/structure", changeFrequency: "monthly", priority: 0.8 },
  { path: "/preface", changeFrequency: "monthly", priority: 0.8 },
  { path: "/study-paths", changeFrequency: "weekly", priority: 0.8 },
  { path: "/sanskrit-nova", changeFrequency: "weekly", priority: 0.8 },
  { path: "/vision", changeFrequency: "weekly", priority: 0.8 },
  { path: "/dharma", changeFrequency: "weekly", priority: 0.8 },
  { path: "/learning", changeFrequency: "weekly", priority: 0.8 },
  { path: "/sanskrit-tools", changeFrequency: "weekly", priority: 0.8 },
  { path: "/philosophies", changeFrequency: "monthly", priority: 0.7 },
  { path: "/frameworks", changeFrequency: "monthly", priority: 0.7 },
  { path: "/pilgrimage", changeFrequency: "monthly", priority: 0.7 },
  { path: "/mahadev", changeFrequency: "monthly", priority: 0.8 },
  { path: "/devi", changeFrequency: "monthly", priority: 0.8 },
  { path: "/vishnu", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ganesha", changeFrequency: "monthly", priority: 0.75 },
  { path: "/audio", changeFrequency: "monthly", priority: 0.7 },
  { path: "/quiz", changeFrequency: "weekly", priority: 0.7 },
  { path: "/community", changeFrequency: "monthly", priority: 0.6 },
  { path: "/panchanga", changeFrequency: "daily", priority: 0.8 },
  { path: "/festivals", changeFrequency: "weekly", priority: 0.85 },
  { path: "/katha", changeFrequency: "weekly", priority: 0.85 },
  { path: "/stotras", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ganesh-aarti", changeFrequency: "monthly", priority: 0.8 },
  { path: "/shivlilamrit", changeFrequency: "monthly", priority: 0.8 },
  { path: "/shivlilamrit/book", changeFrequency: "monthly", priority: 0.85 },
  { path: "/haripaat", changeFrequency: "monthly", priority: 0.8 },
  { path: "/haripaat/book", changeFrequency: "monthly", priority: 0.8 },
  { path: "/harivijay", changeFrequency: "monthly", priority: 0.8 },
  { path: "/harivijay/book", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ramvijay", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ramvijay/book", changeFrequency: "monthly", priority: 0.8 },
];

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.endsWith("/") ? withSlash.slice(0, -1) : withSlash;
}

function uniqueByPath(entries: PublicSitemapEntry[]): PublicSitemapEntry[] {
  const seen = new Set<string>();
  const out: PublicSitemapEntry[] = [];
  for (const entry of entries) {
    const path = normalizePath(entry.path);
    if (seen.has(path)) continue;
    seen.add(path);
    out.push({ ...entry, path });
  }
  return out;
}

export function listPublicSitemapEntries(): PublicSitemapEntry[] {
  const nested: PublicSitemapEntry[] = [
    ...listJyotirlingaSlugs().map((slug) => ({
      path: `/mahadev/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...listShaktiPeethaSlugs().map((slug) => ({
      path: `/devi/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...listCharDhamSlugs().map((slug) => ({
      path: `/vishnu/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...listAshtavinayakSlugs().map((slug) => ({
      path: `/ganesha/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...utsavSlugs().map((slug) => ({
      path: `/festivals/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...kathaSlugs().map((slug) => ({
      path: `/katha/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...listGaneshAartiSlugs().map((slug) => ({
      path: `/ganesh-aarti/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...listPothi().map((entry) => ({
      path: `/shivlilamrit/read/${entry.slug}`,
      changeFrequency: "monthly" as const,
      priority: entry.slug === "11" ? 0.85 : 0.7,
    })),
    ...scriptureCatalog.map((item) => ({
      path: item.href,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return uniqueByPath([...STATIC_PAGES, ...nested]);
}

export function sitemapLoc(path: string): string {
  return absolutePageUrl(path);
}
