import { MetadataRoute } from "next";
import { listPublicSitemapEntries, sitemapLoc } from "@/lib/public-sitemap";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return listPublicSitemapEntries().map((entry) => ({
    url: sitemapLoc(entry.path),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
