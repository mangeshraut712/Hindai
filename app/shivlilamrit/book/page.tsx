import type { Metadata } from "next";
import { PothiFolio } from "@/components/shivlilamrit/pothi-folio";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Shivlilamrit pothi",
  description:
    "Sequential folio reader for Shivlilamrit, with page numbers and listen-through recitation.",
  alternates: { canonical: `${SITE_URL}/shivlilamrit/book` },
};

export default function ShivlilamritBookPage() {
  return <PothiFolio initialPage={1} />;
}
