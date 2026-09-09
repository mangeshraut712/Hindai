import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HaripaatHome } from "@/components/haripaat/haripaat-home";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Haripaat — हरिपाठ daily Hari reading",
  description:
    "Daily Vaishnava Haripaat leaves with original Hind AI katha-sar in Marathi and English — companion to Harivijay and Ganesh aarti.",
  alternates: { canonical: `${SITE_URL}/haripaat` },
};

export default function HaripaatIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HaripaatHome />
      </main>
      <Footer />
    </div>
  );
}
