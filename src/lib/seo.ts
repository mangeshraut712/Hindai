// src/lib/seo.ts
import { Metadata } from "next";

export interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

// Organization structured data for Hind AI
export const organizationStructuredData: StructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hind AI",
  description: "AI-Powered Digital Library of Ancient Indian Scriptures",
  url: "https://hindai.dev",
  logo: "https://hindai.dev/og_home.png",
  sameAs: [
    "https://github.com/mangeshraut712/Hindai",
    "https://twitter.com/hindai_dev",
  ],
  founder: {
    "@type": "Person",
    name: "Hind AI Team",
  },
  foundingDate: "2026",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@hindai.dev",
    contactType: "customer service",
  },
};

// WebSite structured data
export const websiteStructuredData: StructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hind AI",
  description: "AI-Powered Digital Library of Ancient Indian Scriptures",
  url: "https://hindai.dev",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://hindai.dev/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// CreativeWork structured data for scriptures
export function generateScriptureStructuredData(
  scripture: {
    name: string;
    description: string;
    verses: number;
    author?: string;
    language: string;
  },
  verses?: Array<{
    number: number;
    text: string;
    translation?: string;
  }>,
): StructuredData {
  const structuredData: StructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: scripture.name,
    description: scripture.description,
    inLanguage: scripture.language,
    url: `https://hindai.dev/${scripture.name.toLowerCase().replace(/\s+/g, "-")}`,
    provider: {
      "@type": "Organization",
      name: "Hind AI",
      url: "https://hindai.dev",
    },
  };

  if (scripture.author) {
    structuredData.author = {
      "@type": "Person",
      name: scripture.author,
    };
  }

  if (verses && verses.length > 0) {
    structuredData.hasPart = verses.map((verse) => ({
      "@type": "CreativeWork",
      name: `Verse ${verse.number}`,
      text: verse.text,
      ...(verse.translation && { translationOfWork: verse.translation }),
    }));
  }

  return structuredData;
}

// FAQ structured data
export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>,
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Breadcrumb structured data
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>,
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// Utility function to merge structured data
export function mergeStructuredData(
  ...data: StructuredData[]
): StructuredData[] {
  return data;
}

// Enhanced metadata generation
export function generateMetadata(
  title: string,
  description: string,
  path: string = "",
  image?: string,
  structuredData?: StructuredData[],
): Metadata {
  const baseUrl = "https://hindai.dev";
  const url = path ? `${baseUrl}${path}` : baseUrl;
  const ogImage = image || `${baseUrl}/og_home.png`;

  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s | Hind AI`,
    },
    description,
    keywords: [
      "Hindu scriptures",
      "Bhagavad Gita",
      "Yoga Sutras",
      "Sanskrit",
      "Ancient wisdom",
      "AI spiritual guide",
      "Indian philosophy",
      "Vedanta",
      "Upanishads",
      "Ramayana",
      "Mahabharata",
    ],
    authors: [{ name: "Hind AI Team" }],
    creator: "Hind AI",
    publisher: "Hind AI",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Hind AI",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@hindai_dev",
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
    verification: {
      google: "your-google-site-verification-code",
    },
  };

  // Add structured data if provided
  if (structuredData && structuredData.length > 0) {
    metadata.other = {
      "application/ld+json": JSON.stringify(structuredData),
    };
  }

  return metadata;
}
