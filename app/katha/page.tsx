import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KathaHome } from "@/components/katha/katha-home";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Katha grantha — deep god stories for Hind AI",
  description:
    "Original Hind AI book-style chapters on Mahadeva, Devi, Vishnu, and Ganesha — tradition labelled as tradition, linked to tirthas and festivals.",
  alternates: { canonical: `${SITE_URL}/katha` },
};

export default function KathaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <KathaHome />
      </main>
      <Footer />
    </div>
  );
}
