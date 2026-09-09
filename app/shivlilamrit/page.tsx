import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShivlilamritHome } from "@/components/shivlilamrit/shivlilamrit-home";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Shivlilamrit — श्रीशिवलीलामृत digital pothi",
  description:
    "Read or listen to Sant Shridhar Swami’s Shivlilamrit: Marathi ovis with Hind AI katha-sar, sticky anukramanika for adhyay 1–15, Rudra chapter 11, and closing stotras.",
  alternates: {
    canonical: `${SITE_URL}/shivlilamrit`,
  },
};

export default function ShivlilamritIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ShivlilamritHome />
      </main>
      <Footer />
    </div>
  );
}
