"use client";

import { useSearchParams } from "next/navigation";
import { DurgaSaptashatiReader } from "@/components/durga-saptashati/durga-saptashati-reader";
import { parseBookPage } from "@/lib/data/durga-saptashati/book";

export function DurgaSaptashatiBookClient({ fallbackPage }: { fallbackPage: number }) {
  const params = useSearchParams();
  const urlPage = parseBookPage(params.get("p") ?? undefined);
  const initialPage = params.get("p") ? urlPage : fallbackPage;
  return <DurgaSaptashatiReader initialPage={initialPage} />;
}
