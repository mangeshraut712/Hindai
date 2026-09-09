"use client";

import { useSearchParams } from "next/navigation";
import { PothiFolio } from "@/components/shivlilamrit/pothi-folio";
import { parseBookPage } from "@/lib/data/shivlilamrit/book";

export function BookReader({ fallbackPage }: { fallbackPage: number }) {
  const params = useSearchParams();
  const urlPage = parseBookPage(params.get("p") ?? undefined);
  const initialPage = params.get("p") ? urlPage : fallbackPage;
  return <PothiFolio initialPage={initialPage} />;
}
