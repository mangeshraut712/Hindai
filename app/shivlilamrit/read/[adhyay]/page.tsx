import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PothiFolio } from "@/components/shivlilamrit/pothi-folio";
import { isChapterId } from "@/lib/data/shivlilamrit/catalog";
import { firstPageForSlug, slugFromAdhyayParam } from "@/lib/data/shivlilamrit/book";
import { getExtra, listPothi } from "@/lib/data/shivlilamrit/pothi";
import { SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ adhyay: string }>;
};

export function generateStaticParams() {
  return listPothi().map((entry) => ({ adhyay: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { adhyay } = await params;
  const extra = getExtra(adhyay);
  if (extra) {
    return {
      title: `${extra.titleEn} | Shivlilamrit`,
      description: extra.katha.en[0],
      alternates: { canonical: `${SITE_URL}/shivlilamrit/read/${adhyay}` },
    };
  }
  const id = Number(adhyay);
  if (!isChapterId(id)) {
    return { title: "Leaf not found | Hind AI" };
  }
  return {
    title: `Shivlilamrit adhyay ${id}`,
    alternates: { canonical: `${SITE_URL}/shivlilamrit/read/${id}` },
  };
}

export default async function ShivlilamritReadPage({ params }: PageProps) {
  const { adhyay } = await params;
  const slug = slugFromAdhyayParam(adhyay);
  if (!getExtra(slug) && !isChapterId(Number(slug))) {
    notFound();
  }
  return <PothiFolio initialPage={firstPageForSlug(slug)} />;
}
