import { MetadataRoute } from "next";
import { listAshtavinayakSlugs } from "@/lib/data/ashtavinayak";
import { listCharDhamSlugs } from "@/lib/data/char-dham";
import { listGaneshAartiSlugs } from "@/lib/data/ganesh-aarti-sangrah";
import { listJyotirlingaSlugs } from "@/lib/data/jyotirlingas";
import { kathaSlugs } from "@/lib/data/katha-grantha";
import { listShaktiPeethaSlugs } from "@/lib/data/shakti-peethas";
import { utsavSlugs } from "@/lib/data/utsav";
import { listPothi } from "@/lib/data/shivlilamrit/pothi";
import { scriptureCatalog } from "@/lib/scripture-catalog";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const baseUrl = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/ai-guide`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sadhana`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contents`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/daily`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sadhana`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/structure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/preface`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/study-paths`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sanskrit-nova`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vision`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dharma`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learning`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sanskrit-tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/philosophies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/frameworks`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pilgrimage`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mahadev`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...listJyotirlingaSlugs().map((slug) => ({
      url: `${baseUrl}/mahadev/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/devi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...listShaktiPeethaSlugs().map((slug) => ({
      url: `${baseUrl}/devi/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    {
      url: `${baseUrl}/vishnu`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...listCharDhamSlugs().map((slug) => ({
      url: `${baseUrl}/vishnu/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/ganesha`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...listAshtavinayakSlugs().map((slug) => ({
      url: `${baseUrl}/ganesha/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/audio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/panchanga`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/festivals`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...utsavSlugs().map((slug) => ({
      url: `${baseUrl}/festivals/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/katha`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...kathaSlugs().map((slug) => ({
      url: `${baseUrl}/katha/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${baseUrl}/stotras`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ganesh-aarti`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...listGaneshAartiSlugs().map((slug) => ({
      url: `${baseUrl}/ganesh-aarti/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/shivlilamrit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shivlilamrit/book`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...listPothi().map((entry) => ({
      url: `${baseUrl}/shivlilamrit/read/${entry.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: entry.slug === "11" ? 0.85 : 0.7,
    })),
    ...scriptureCatalog.map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
