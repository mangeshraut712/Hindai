export const PRINT_KATHASAR = {
  titleMr: "सचित्र श्रीशिवलीलामृत कथासार",
  titleEn: "Sachitra Shri Shivlilamrit Kathasar",
  author: "Jitendranath Thakur",
  publisher: "Dharmik Prakashan Sanstha, Mumbai",
  composer: "संत श्रीधर स्वामी नाझरेकर",
  note: "Buy the illustrated print Kathasar from the publisher’s shops. Hind AI’s on-site reader and free PDF are Shridhar’s public-domain ovis with original Hind AI katha-sar — not a scan of that paperback’s typeset prose.",
} as const;

/** Free Hind AI ebook PDF hosted under public/ebook/ (~22MB). */
export const FREE_KATHASAR_PDF = {
  titleMr: "श्रीशिवलीलामृत कथासार · अध्याय १ ते १५",
  titleEn: "Shivlilamrut Kathasar · Adhyay 1 to 15",
  sizeLabel: "~22 MB",
  note: "Free download of the Hind AI ebook PDF (adhyay 1–15). One file under an English path; the Marathi button only changes the suggested download filename.",
  /** Stable ASCII path — primary download href. */
  hrefEn: "/ebook/Shivlilamrut_Kathasar_Adhyay_1_to_15.pdf",
  /** Devanagari filename alias (same bytes). */
  hrefMr: "/ebook/Shivlilamrut_Kathasar_Adhyay_1_to_15.pdf",
  downloadEn: "Shivlilamrut_Kathasar_Adhyay_1_to_15.pdf",
  downloadMr: "श्रीशिवलीलामृत_कथासार_अध्याय_१_ते_१५.pdf",
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
