import type { Metadata } from "next";
import { PothiFolio } from "@/components/shivlilamrit/pothi-folio";
import { parseBookPage } from "@/lib/data/shivlilamrit/book";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shivlilamrit pothi",
  description: "Sequential folio reader for Shivlilamrit, with page numbers and listen-through recitation.",
  alternates: { canonical: `${SITE_URL}/shivlilamrit/book` },
};

type PageProps = {
  searchParams: Promise<{ p?: string }>;
};

export default async function ShivlilamritBookPage({ searchParams }: PageProps) {
  const { p } = await searchParams;
  return <PothiFolio initialPage={parseBookPage(p)} />;
}
