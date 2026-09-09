import type { Metadata, Viewport } from "next";
import { Manrope, Cormorant_Garamond, Noto_Serif_Devanagari } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import Script from "next/script";
import { Providers } from "./providers";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { LanguageProvider } from "@/lib/i18n/context";
import { PageProgress } from "@/components/page-progress";
import { ErrorBoundary } from "@/components/error-boundary";
import { PageTransition } from "@/components/page-transition";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { SITE_URL } from "@/lib/site";
import "@/index.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600"],
  display: "swap",
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  authors: [{ name: "Hind AI Team", url: SITE_URL }],
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
    url: SITE_URL,
    siteName: "Hind AI",
    title: "Hind AI - AI-Powered Digital Library of Ancient Indian Scriptures",
    description:
      "Discover ancient Indian wisdom through AI-powered exploration. A modern digital library for Vedas, Upanishads, Epics, and Puranas.",
    images: [
      {
        url: "/Home.webp",
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
    images: ["/Home.webp"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-IN": SITE_URL,
      "hi-IN": SITE_URL,
      "sa-IN": SITE_URL,
    },
  },
  category: "Education",
  classification: "Religious & Spiritual",
  icons: {
    icon: [{ url: "/logo.webp", type: "image/webp" }],
    apple: [{ url: "/logo.webp", sizes: "180x180" }],
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
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0f131a" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${manrope.variable} ${cormorant.variable} ${devanagari.variable} relative scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Resource hints */}
        <link rel="dns-prefetch" href={SITE_URL} />

        {/* Inline critical CSS — mirrors token themes before hydration */}
        <style suppressHydrationWarning>
          {`
            * { box-sizing: border-box; }
            html { scroll-behavior: smooth; color-scheme: light; }
            html.dark { color-scheme: dark; }
            body {
              margin: 0;
              padding: 0;
              background: hsl(40 18% 98%);
              color: hsl(222 30% 12%);
            }
            html.dark body {
              background: hsl(222 28% 7%);
              color: hsl(40 28% 96%);
            }
          `}
        </style>
      </head>
      <body
        suppressHydrationWarning
        className="relative min-h-screen bg-background font-sans antialiased"
      >
        <Script src="/strip-injected-dom-attrs.js" strategy="beforeInteractive" />
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <PageProgress />
        </Suspense>
        <ServiceWorkerRegistration />
        <LanguageProvider>
          <Providers>
            <ErrorBoundary>
              <PageTransition>{children}</PageTransition>
            </ErrorBoundary>
          </Providers>
        </LanguageProvider>
        {process.env.VERCEL && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
