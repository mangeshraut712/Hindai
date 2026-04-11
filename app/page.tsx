import { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "Hind AI - Your Digital Gurukul for Ancient Wisdom",
  description:
    "🕉️ Welcome to your AI-powered spiritual companion. Explore Vedas, Upanishads, Gita & more with intelligent guidance. From Knowledge (Jnana) to Liberation (Moksha).",
  openGraph: {
    title: "Hind AI - Digital Gurukul of Sanatana Dharma",
    description:
      "🕉️ Your personal AI Guru for ancient Indian wisdom. Interactive learning, guided paths, and spiritual insights.",
    url: "https://hindai.dev",
  },
};

export default function Page() {
  return <HomePage />;
}
