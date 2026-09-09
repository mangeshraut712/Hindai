import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookReader } from "@/components/shivlilamrit/book-reader";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Shivlilamrit pothi",
  description:
    "Sequential folio reader for Shivlilamrit, with page numbers and listen-through recitation.",
  alternates: { canonical: `${SITE_URL}/shivlilamrit/book` },
};

function BookFallback() {
  return <p className="p-8 text-center text-sm text-muted-foreground">Opening pothi…</p>;
}

export default function ShivlilamritBookPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<BookFallback />}>
          <BookReader fallbackPage={1} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
