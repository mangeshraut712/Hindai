import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import {
  Manrope,
  Cormorant_Garamond,
  Noto_Serif_Devanagari,
  Noto_Sans_Devanagari,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { LanguageProvider } from "@/lib/i18n/context";
import { PageProgress } from "@/components/page-progress";
import { ErrorBoundary } from "@/components/error-boundary";
import { PageTransition } from "@/components/page-transition";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import "@/index.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600"],
  display: "swap",
  preload: false,
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "700"],
  variable: "--font-devanagari",
  display: "swap",
  preload: false,
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600"],
  variable: "--font-hindi",
  display: "swap",
  preload: false,
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["400", "600"],
  variable: "--font-tamil",
  display: "swap",
  preload: false,
});

const notoSansTelugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["400", "600"],
  variable: "--font-telugu",
  display: "swap",
  preload: false,
});

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
    icon: [{ url: "/favicon.ico" }],
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
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://hindai.dev" />
        <link rel="dns-prefetch" href="https://vercel.com" />

        {/* Inline critical CSS to prevent FOUC */}
        <style
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              * { box-sizing: border-box; }
              html { scroll-behavior: smooth; }
              body { margin: 0; padding: 0; }
            `,
          }}
        />

        {/* Structured Data for WebSite */}
        <script
          type="application/ld+json"
          defer
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Hind AI",
              alternateName: ["HindAI", "Hind AI Digital Library"],
              url: "https://hindai.dev",
              description:
                "AI-powered digital museum of ancient Indian scriptures including Vedas, Upanishads, Puranas, and Epics.",
              inLanguage: ["en", "hi", "sa"],
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://hindai.dev/contents?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          defer
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hind AI",
              url: "https://hindai.dev",
              logo: "https://hindai.dev/logo.png",
              sameAs: ["https://github.com/mangeshraut712/Hindai"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                url: "https://hindai.dev/preface",
              },
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${manrope.variable} ${cormorant.variable} ${notoSerifDevanagari.variable} ${notoSansDevanagari.variable} ${notoSansTamil.variable} ${notoSansTelugu.variable} relative min-h-screen bg-background font-sans antialiased`}
      >
        <Suspense fallback={null}>
          <PageProgress />
        </Suspense>
        <ServiceWorkerRegistration />
        <ErrorBoundary>
          <LanguageProvider>
            <Providers>
              <PageTransition>{children}</PageTransition>
            </Providers>
          </LanguageProvider>
        </ErrorBoundary>
        {process.env.VERCEL === "1" && (
          <Suspense fallback={null}>
            <Analytics />
            <SpeedInsights />
          </Suspense>
        )}
      </body>
    </html>
  );
}
