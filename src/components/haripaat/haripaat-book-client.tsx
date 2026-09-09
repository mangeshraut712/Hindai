"use client";

import { useSearchParams } from "next/navigation";
import { HaripaatReader } from "@/components/haripaat/haripaat-reader";
import { parseBookPage } from "@/lib/data/haripaat/book";

export function HaripaatBookClient({ fallbackPage }: { fallbackPage: number }) {
  const params = useSearchParams();
  const urlPage = parseBookPage(params.get("p") ?? undefined);
  const initialPage = params.get("p") ? urlPage : fallbackPage;
  return <HaripaatReader initialPage={initialPage} />;
}
