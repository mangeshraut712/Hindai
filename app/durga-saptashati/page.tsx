import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DurgaSaptashatiHome } from "@/components/durga-saptashati/durga-saptashati-home";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Durga Saptashati — दुर्गा सप्तशती · Devi Mahatmya",
  description:
    "Read Durga Saptashati / Devi Mahatmya as a Chandi patha: Kavacha, Argala, Kilaka, and thirteen adhyayas with original Hind AI katha-sar in Marathi and English.",
  alternates: { canonical: `${SITE_URL}/durga-saptashati` },
};

export default function DurgaSaptashatiIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <DurgaSaptashatiHome />
      </main>
      <Footer />
    </div>
  );
}
