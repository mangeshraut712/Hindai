import { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "Hind AI - Your Digital Gurukul for Ancient Wisdom | AI-Powered Scripture Study",
  description:
    "🕉️ Explore Vedas, Upanishads, Bhagavad Gita & more with AI-powered guidance. Learn Sanskrit, Hindi, and English. Interactive spiritual learning with Google Gemma 4. From Knowledge (Jnana) to Liberation (Moksha).",
  keywords: [
    "Hind AI",
    "Vedas",
    "Upanishads",
    "Bhagavad Gita",
    "Sanskrit",
    "Hindi",
    "Spiritual learning",
    "AI-powered scripture",
    "Digital Gurukul",
    "Ancient wisdom",
    "Sanatana Dharma",
    "Yoga",
    "Meditation",
    "Gemma 4",
  ],
  authors: [{ name: "Hind AI Team" }],
  creator: "Hind AI",
  publisher: "Hind AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hindai-nine.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      hi: "/hi",
      sa: "/sa",
    },
  },
  openGraph: {
    title: "Hind AI - Digital Gurukul of Sanatana Dharma",
    description:
      "🕉️ Your personal AI Guru for ancient Indian wisdom. Interactive learning, guided paths, and spiritual insights powered by Google Gemma 4.",
    url: "https://hindai-nine.vercel.app",
    siteName: "Hind AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hind AI - Digital Gurukul for Ancient Wisdom",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hind AI - Digital Gurukul for Ancient Wisdom",
    description:
      "🕉️ AI-powered spiritual learning platform. Explore Vedas, Upanishads, Gita & more with intelligent guidance.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Page() {
  return <HomePage />;
}
