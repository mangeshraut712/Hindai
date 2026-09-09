"use client";

import { useSearchParams } from "next/navigation";
import { HarivijayReader } from "@/components/harivijay/harivijay-reader";
import { parseBookPage } from "@/lib/data/harivijay/book";

export function HarivijayBookClient({ fallbackPage }: { fallbackPage: number }) {
  const params = useSearchParams();
  const urlPage = parseBookPage(params.get("p") ?? undefined);
  const initialPage = params.get("p") ? urlPage : fallbackPage;
  return <HarivijayReader initialPage={initialPage} />;
}
