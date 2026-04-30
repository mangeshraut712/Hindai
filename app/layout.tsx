import type { Metadata, Viewport } from "next";
// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { LanguageProvider } from "@/lib/i18n/context";
// import { PageProgress } from "@/components/page-progress";
// import { ErrorBoundary } from "@/components/error-boundary";
// import { PageTransition } from "@/components/page-transition";
// import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import "@/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hindai.dev"),
  title: {
    default: "Hind AI - AI-Powered Digital Library of Ancient Indian Scriptures",
    template: "%s | Hind AI",
  },
  description:
    "Discover ancient Indian wisdom through AI-powered exploration. A modern digital library for Vedas, Upanishads, Epics, and Puranas with intelligent insights.",
  keywords: [
    "Hind AI",
    "Vedas",
    "Rigveda",
    "Mahabharata",
    "Ramayana",
    "Bhagavad Gita",
    "Srimad Bhagavatam",
    "Devi Mahatmyam",
    "Manu Smriti",
    "Yoga Vasishtha",
    "Sanskrit",
    "Hindi",
    "Ancient Indian Texts",
    "Hindu Scriptures",
    "Indian Philosophy",
    "Dharma",
    "Sanatan Dharma",
    "AI",
    "Machine Learning",
    "Digital Library",
  ],
  authors: [{ name: "Hind AI Team", url: "https://hindai.dev" }],
  creator: "Hind AI",
  publisher: "Hind AI",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN", "sa_IN"],
    url: "https://hindai.dev",
    siteName: "Hind AI",
    title: "Hind AI - AI-Powered Digital Library of Ancient Indian Scriptures",
    description:
      "Discover ancient Indian wisdom through AI-powered exploration. A modern digital library for Vedas, Upanishads, Epics, and Puranas.",
    images: [
      {
        url: "/Home.png",
        width: 1200,
        height: 630,
        alt: "Hind AI - Ancient Indian Scriptures with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hind AI - AI-Powered Digital Library",
    description: "Discover ancient Indian wisdom through AI-powered exploration.",
    images: ["/Home.png"],
  },
  alternates: {
    canonical: "https://hindai.dev",
    languages: {
      "en-IN": "https://hindai.dev",
      "hi-IN": "https://hindai.dev",
      "sa-IN": "https://hindai.dev",
    },
  },
  category: "Education",
  classification: "Religious & Spiritual",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#16110d" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="relative scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Google Fonts — preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Cormorant+Garamond:wght@400;600&family=Noto+Serif+Devanagari:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* Resource hints */}
        <link rel="dns-prefetch" href="https://hindai.dev" />

        {/* Inline critical CSS — font variables + FOUC prevention */}
        <style
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              * { box-sizing: border-box; }
              html { scroll-behavior: smooth; }
              body { margin: 0; padding: 0; }
              :root {
                --font-manrope: 'Manrope', system-ui, -apple-system, sans-serif;
                --font-cormorant: 'Cormorant Garamond', Georgia, serif;
                --font-devanagari: 'Noto Serif Devanagari', serif;
              }
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="relative min-h-screen bg-background font-sans antialiased"
      >
        <LanguageProvider>
          <Providers>{children}</Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
