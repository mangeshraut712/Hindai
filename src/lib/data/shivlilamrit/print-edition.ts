export const PRINT_KATHASAR = {
  titleMr: "सचित्र श्रीशिवलीलामृत कथासार",
  titleEn: "Sachitra Shri Shivlilamrit Kathasar",
  author: "Jitendranath Thakur",
  publisher: "Dharmik Prakashan Sanstha, Mumbai",
  composer: "संत श्रीधर स्वामी नाझरेकर",
  note: "Buy the illustrated print Kathasar from the publisher’s shops. Hind AI’s reader is Shridhar’s public-domain ovis and original Hind AI katha, not a scan of that paperback.",
} as const;

export interface PrintShopLink {
  id: "amazon-in" | "exotic-india" | "flipkart";
  label: string;
  href: string;
}

export const PRINT_SHOP_LINKS: PrintShopLink[] = [
  {
    id: "amazon-in",
    label: "Amazon India",
    href: "https://www.amazon.in/Shri-Shivleelamrut-Kathasar-Jitendranath-Thakur/dp/B07VLSYKL6",
  },
  {
    id: "exotic-india",
    label: "Exotic India",
    href: "https://www.exoticindiaart.com/book/details/shri-shiva-lila-amrit-kathasar-with-illustrations-marathi-nzv786/",
  },
  {
    id: "flipkart",
    label: "Flipkart (search)",
    href: "https://www.flipkart.com/search?q=shivlilamrit%20kathasar%20dharmik%20prakashan",
  },
];
