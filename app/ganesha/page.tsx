import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GaneshaTirthaHome } from "@/components/ganesha/ganesha-tirtha-home";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Ganesha — Ashtavinayak map",
  description:
    "The eight Maharashtra Ashtavinayak shrines in traditional circuit order, with coordinates on Hind AI’s South Asia map.",
  alternates: { canonical: `${SITE_URL}/ganesha` },
};

export default function GaneshaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <GaneshaTirthaHome />
      </main>
      <Footer />
    </div>
  );
}
