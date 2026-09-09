import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HarivijayHome } from "@/components/harivijay/harivijay-home";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Harivijay — श्रीहरिविजय digital pothi",
  description:
    "Read Sant Shridhar Swami’s Harivijay Krishna grantha arc with original Hind AI katha-sar in Marathi and English — sister pothi to Shivlilamrit.",
  alternates: {
    canonical: `${SITE_URL}/harivijay`,
  },
};

export default function HarivijayIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HarivijayHome />
      </main>
      <Footer />
    </div>
  );
}
