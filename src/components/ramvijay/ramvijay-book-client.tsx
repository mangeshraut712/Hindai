"use client";

import { useSearchParams } from "next/navigation";
import { RamvijayReader } from "@/components/ramvijay/ramvijay-reader";
import { parseBookPage } from "@/lib/data/ramvijay/book";

export function RamvijayBookClient({ fallbackPage }: { fallbackPage: number }) {
  const params = useSearchParams();
  const urlPage = parseBookPage(params.get("p") ?? undefined);
  const initialPage = params.get("p") ? urlPage : fallbackPage;
  return <RamvijayReader initialPage={initialPage} />;
}
