import type { Metadata, Viewport } from "next";
import { Inter, Domine, Martel } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import "@/index.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const domine = Domine({
  subsets: ["latin"],
  variable: "--font-domine",
  display: "swap",
});

const martel = Martel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-martel",
  display: "swap",
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
        url: "/og_home.png",
        width: 1200,
        height: 630,
        alt: "Hind AI - Ancient Indian Scriptures with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hind AI - AI-Powered Digital Library",
    description:
      "Discover ancient Indian wisdom through AI-powered exploration.",
    images: ["/og_home.png"],
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
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for WebSite */}
        <script
          type="application/ld+json"
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hind AI",
              url: "https://hindai.dev",
              logo: "https://hindai.dev/logo.png",
              sameAs: [
                "https://github.com/hindai/hindai",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                url: "https://hindai.dev/preface",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${domine.variable} ${martel.variable} min-h-screen bg-background font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
