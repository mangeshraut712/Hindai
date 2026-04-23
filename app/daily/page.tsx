import type { Metadata } from "next";
import DailyWisdomClient from "./daily-client";

export const metadata: Metadata = {
  title: "Daily Wisdom",
  description:
    "Begin each day with timeless wisdom from the Vedas, Upanishads, and Bhagavad Gita. A new teaching, meditation prompt, and Sanskrit verse every day.",
  openGraph: {
    title: "Daily Wisdom | Hind AI",
    description:
      "🕉️ Start your day with ancient Indian wisdom — a new verse, commentary, and meditation prompt daily.",
  },
};

export default function DailyWisdomPage() {
  return <DailyWisdomClient />;
}
