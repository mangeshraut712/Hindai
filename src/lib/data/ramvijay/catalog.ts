export const CHAPTER_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] as const;

export type ChapterId = (typeof CHAPTER_IDS)[number];
export type ReaderLocale = "mr" | "en";

export interface ChapterKatha {
  mr: string[];
  en: string[];
}
export interface RamvijayChapter {
  id: ChapterId;
  titleMr: string;
  titleEn: string;
  kathaTitleMr: string;
  special: boolean;
  katha: ChapterKatha;
}

export const RAMVIJAY_SOURCE_NOTE = {
  composer: "संत श्रीधर स्वामी नाझरेकर",
  year: "शके १६२५ · इ.स. सुमारे १७०३",
  metre: "ओवी",
  root: "वाल्मीकि रामायण — मराठी ओवी आख्यान",
  oviCountNote:
    "Shridhar’s Ramvijay is the Rama sister-grantha to Harivijay and Shivlilamrit. Hind AI ships katha-sar leaves first; public-domain ovis can follow.",
} as const;

export const RAMVIJAY_CHAPTERS: RamvijayChapter[] = [
  {
    id: 1,
    titleMr: "मंगलाचरण · रामकथाबीज",
    titleEn: "Mangala · seed of Rama katha",
    kathaTitleMr: "ग्रंथारंभ",
    special: true,
    katha: {
      mr: [
        "श्रीधरस्वामी रामविजय मंगलाचरणाने उघडतात — गणेश, सरस्वती, गुरु आणि रघुकुलस्मरण.",
        "हिंद एआय: ही कथासार मूळ ओव्यांची जागा नाही; परंपरेवरील स्वतःचे सार आहे. आधुनिक कटासार गद्य कॉपी नाही.",
      ],
      en: [
        "Shridhar opens Ramvijay with mangalacharan — Ganesha, Saraswati, guru, and the Raghu line.",
        "Hind AI: original katha-sar on classical motifs, not modern Kathasar paperback prose.",
      ],
    },
  },
  {
    id: 2,
    titleMr: "अयोध्या · दशरथ पुत्रेष्टि",
    titleEn: "Ayodhya · Dasharatha’s yajna",
    kathaTitleMr: "जन्मपूर्व",
    special: false,
    katha: {
      mr: [
        "अध्याय 2 (Ayodhya · Dasharatha’s yajna) — श्रीधरस्वामींच्या रामविजय परंपरेतील रामायण आख्यान.",
        "हिंद एआय मूळ ओवीपट जोडेपर्यंत स्वतःचे द्विभाषिक कथासार देते. आधुनिक प्रकाशक गद्य येथे नाही.",
      ],
      en: [
        "Adhyay 2 (Ayodhya · Dasharatha’s yajna) follows Shridhar’s Ramvijay retelling of the Rāmāyaṇa arc.",
        "Hind AI supplies original bilingual katha-sar until public-domain ovis are layered. No modern publisher prose.",
      ],
    },
  },
  {
    id: 3,
    titleMr: "रामजन्म · चतुःपुत्र",
    titleEn: "Birth of the four princes",
    kathaTitleMr: "जन्म",
    special: true,
    katha: {
      mr: [
        "अयोध्येत राम, भरत, लक्ष्मण, शत्रुघ्न जन्म घेतात — मर्यादा पुरुषोत्तमाची कथा सुरू.",
        "रामनवमीचा उत्सव याच बीजाची आठवण ठेवतो. परंपरा म्हणून वाचा.",
      ],
      en: [
        "In Ayodhya Rama, Bharata, Lakshmana, and Shatrughna are born — Maryada Purushottama’s arc begins.",
        "Rama Navami remembers that seed. Read as tradition.",
      ],
    },
  },
  {
    id: 4,
    titleMr: "विश्वामित्र · ताटकावध",
    titleEn: "Vishvamitra · Tataka",
    kathaTitleMr: "गुरुयात्रा",
    special: false,
    katha: {
      mr: [
        "अध्याय 4 (Vishvamitra · Tataka) — श्रीधरस्वामींच्या रामविजय परंपरेतील रामायण आख्यान.",
        "हिंद एआय मूळ ओवीपट जोडेपर्यंत स्वतःचे द्विभाषिक कथासार देते. आधुनिक प्रकाशक गद्य येथे नाही.",
      ],
      en: [
        "Adhyay 4 (Vishvamitra · Tataka) follows Shridhar’s Ramvijay retelling of the Rāmāyaṇa arc.",
        "Hind AI supplies original bilingual katha-sar until public-domain ovis are layered. No modern publisher prose.",
      ],
    },
  },
  {
    id: 5,
    titleMr: "अहल्योद्धार · जनकपुरी",
    titleEn: "Ahalya · Janaka’s city",
    kathaTitleMr: "मिथिला",
    special: false,
    katha: {
      mr: [
        "अध्याय 5 (Ahalya · Janaka’s city) — श्रीधरस्वामींच्या रामविजय परंपरेतील रामायण आख्यान.",
        "हिंद एआय मूळ ओवीपट जोडेपर्यंत स्वतःचे द्विभाषिक कथासार देते. आधुनिक प्रकाशक गद्य येथे नाही.",
      ],
      en: [
        "Adhyay 5 (Ahalya · Janaka’s city) follows Shridhar’s Ramvijay retelling of the Rāmāyaṇa arc.",
        "Hind AI supplies original bilingual katha-sar until public-domain ovis are layered. No modern publisher prose.",
      ],
    },
  },
  {
    id: 6,
    titleMr: "सीता स्वयंवर · धनुर्भंग",
    titleEn: "Sita swayamvara · bow broken",
    kathaTitleMr: "पाणिग्रहण",
    special: true,
    katha: {
      mr: [
        "अध्याय 6 (Sita swayamvara · bow broken) — श्रीधरस्वामींच्या रामविजय परंपरेतील रामायण आख्यान.",
        "हिंद एआय मूळ ओवीपट जोडेपर्यंत स्वतःचे द्विभाषिक कथासार देते. आधुनिक प्रकाशक गद्य येथे नाही.",
      ],
      en: [
        "Adhyay 6 (Sita swayamvara · bow broken) follows Shridhar’s Ramvijay retelling of the Rāmāyaṇa arc.",
        "Hind AI supplies original bilingual katha-sar until public-domain ovis are layered. No modern publisher prose.",
      ],
    },
  },
  {
    id: 7,
    titleMr: "परशुराम संवाद",
    titleEn: "Parashurama encounter",
    kathaTitleMr: "क्षत्रधर्म",
    special: false,
    katha: {
      mr: [
        "अध्याय 7 (Parashurama encounter) — श्रीधरस्वामींच्या रामविजय परंपरेतील रामायण आख्यान.",
        "हिंद एआय मूळ ओवीपट जोडेपर्यंत स्वतःचे द्विभाषिक कथासार देते. आधुनिक प्रकाशक गद्य येथे नाही.",
      ],
      en: [
        "Adhyay 7 (Parashurama encounter) follows Shridhar’s Ramvijay retelling of the Rāmāyaṇa arc.",
        "Hind AI supplies original bilingual katha-sar until public-domain ovis are layered. No modern publisher prose.",
      ],
    },
  },
  {
    id: 8,
    titleMr: "केकई वर · वनवास",
    titleEn: "Kaikeyi’s boons · exile",
    kathaTitleMr: "वनगमन",
    special: true,
    katha: {
      mr: [
        "केकईच्या वरांनी राम वनवास स्वीकारतात — वचनभंग न करता राज्य सोडण्याची कथा.",
        "सार: धर्म म्हणजे कठीण क्षणीही माप राखणे.",
      ],
      en: [
        "Kaikeyi’s boons send Rama to the forest — keeping a father’s word over a throne.",
        "Dharma here is keeping measure when it costs.",
      ],
    },
  },
  {
    id: 9,
    titleMr: "चित्रकूट · भरत भेट",
    titleEn: "Chitrakuta · Bharata",
    kathaTitleMr: "भ्रातृप्रेम",
    special: false,
    katha: {
      mr: [
        "अध्याय 9 (Chitrakuta · Bharata) — श्रीधरस्वामींच्या रामविजय परंपरेतील रामायण आख्यान.",
        "हिंद एआय मूळ ओवीपट जोडेपर्यंत स्वतःचे द्विभाषिक कथासार देते. आधुनिक प्रकाशक गद्य येथे नाही.",
      ],
      en: [
        "Adhyay 9 (Chitrakuta · Bharata) follows Shridhar’s Ramvijay retelling of the Rāmāyaṇa arc.",
        "Hind AI supplies original bilingual katha-sar until public-domain ovis are layered. No modern publisher prose.",
      ],
    },
  },
  {
    id: 10,
    titleMr: "दंडकारण्य · शूर्पणखा",
    titleEn: "Dandaka · Shurpanakha",
    kathaTitleMr: "वनलीला",
    special: false,
    katha: {
      mr: [
        "अध्याय 10 (Dandaka · Shurpanakha) — श्रीधरस्वामींच्या रामविजय परंपरेतील रामायण आख्यान.",
        "हिंद एआय मूळ ओवीपट जोडेपर्यंत स्वतःचे द्विभाषिक कथासार देते. आधुनिक प्रकाशक गद्य येथे नाही.",
      ],
      en: [
        "Adhyay 10 (Dandaka · Shurpanakha) follows Shridhar’s Ramvijay retelling of the Rāmāyaṇa arc.",
        "Hind AI supplies original bilingual katha-sar until public-domain ovis are layered. No modern publisher prose.",
      ],
    },
  },
  {
    id: 11,
    titleMr: "सीताहरण · जटायु",
    titleEn: "Sita abducted · Jatayu",
    kathaTitleMr: "शोकाग्नि",
    special: true,
    katha: {
      mr: [
        "अध्याय 11 (Sita abducted · Jatayu) — श्रीधरस्वामींच्या रामविजय परंपरेतील रामायण आख्यान.",
        "हिंद एआय मूळ ओवीपट जोडेपर्यंत स्वतःचे द्विभाषिक कथासार देते. आधुनिक प्रकाशक गद्य येथे नाही.",
      ],
      en: [
        "Adhyay 11 (Sita abducted · Jatayu) follows Shridhar’s Ramvijay retelling of the Rāmāyaṇa arc.",
        "Hind AI supplies original bilingual katha-sar until public-domain ovis are layered. No modern publisher prose.",
      ],
    },
  },
  {
    id: 12,
    titleMr: "किष्किंधा · हनुमानमैत्री",
    titleEn: "Kishkindha · Hanuman",
    kathaTitleMr: "सुग्रीव",
    special: false,
    katha: {
      mr: [
        "अध्याय 12 (Kishkindha · Hanuman) — श्रीधरस्वामींच्या रामविजय परंपरेतील रामायण आख्यान.",
        "हिंद एआय मूळ ओवीपट जोडेपर्यंत स्वतःचे द्विभाषिक कथासार देते. आधुनिक प्रकाशक गद्य येथे नाही.",
      ],
      en: [
        "Adhyay 12 (Kishkindha · Hanuman) follows Shridhar’s Ramvijay retelling of the Rāmāyaṇa arc.",
        "Hind AI supplies original bilingual katha-sar until public-domain ovis are layered. No modern publisher prose.",
      ],
    },
  },
  {
    id: 13,
    titleMr: "हनुमान लंकाप्रवेश",
    titleEn: "Hanuman enters Lanka",
    kathaTitleMr: "संजीवनीबीज",
    special: true,
    katha: {
      mr: [
        "अध्याय 13 (Hanuman enters Lanka) — श्रीधरस्वामींच्या रामविजय परंपरेतील रामायण आख्यान.",
        "हिंद एआय मूळ ओवीपट जोडेपर्यंत स्वतःचे द्विभाषिक कथासार देते. आधुनिक प्रकाशक गद्य येथे नाही.",
      ],
      en: [
        "Adhyay 13 (Hanuman enters Lanka) follows Shridhar’s Ramvijay retelling of the Rāmāyaṇa arc.",
        "Hind AI supplies original bilingual katha-sar until public-domain ovis are layered. No modern publisher prose.",
      ],
    },
  },
  {
    id: 14,
    titleMr: "सेतु · लंका युद्ध",
    titleEn: "Bridge · war on Lanka",
    kathaTitleMr: "युद्ध",
    special: false,
    katha: {
      mr: [
        "अध्याय 14 (Bridge · war on Lanka) — श्रीधरस्वामींच्या रामविजय परंपरेतील रामायण आख्यान.",
        "हिंद एआय मूळ ओवीपट जोडेपर्यंत स्वतःचे द्विभाषिक कथासार देते. आधुनिक प्रकाशक गद्य येथे नाही.",
      ],
      en: [
        "Adhyay 14 (Bridge · war on Lanka) follows Shridhar’s Ramvijay retelling of the Rāmāyaṇa arc.",
        "Hind AI supplies original bilingual katha-sar until public-domain ovis are layered. No modern publisher prose.",
      ],
    },
  },
  {
    id: 15,
    titleMr: "रावणावध · अग्निपरीक्षा",
    titleEn: "Ravana slain · fire ordeal",
    kathaTitleMr: "विजय",
    special: true,
    katha: {
      mr: [
        "अध्याय 15 (Ravana slain · fire ordeal) — श्रीधरस्वामींच्या रामविजय परंपरेतील रामायण आख्यान.",
        "हिंद एआय मूळ ओवीपट जोडेपर्यंत स्वतःचे द्विभाषिक कथासार देते. आधुनिक प्रकाशक गद्य येथे नाही.",
      ],
      en: [
        "Adhyay 15 (Ravana slain · fire ordeal) follows Shridhar’s Ramvijay retelling of the Rāmāyaṇa arc.",
        "Hind AI supplies original bilingual katha-sar until public-domain ovis are layered. No modern publisher prose.",
      ],
    },
  },
  {
    id: 16,
    titleMr: "अयोध्या आगमन · राज्यभिषेक",
    titleEn: "Return · coronation",
    kathaTitleMr: "रामराज्य",
    special: true,
    katha: {
      mr: [
        "सीता-रामाचे अयोध्या आगमन आणि राज्यभिषेक — दिवाळीच्या दीपामागे असलेली परतण्याची कथा.",
        "रामराज्य म्हणजे केवळ नारा नाही; जबाबदारीची कल्पना आहे.",
      ],
      en: [
        "Return to Ayodhya and coronation — the homecoming behind many Diwali lamps.",
        "Rama-rajya is not only a slogan; it is an idea of responsible rule.",
      ],
    },
  },
  {
    id: 17,
    titleMr: "उत्तरकांड बीज · फलश्रुति",
    titleEn: "Uttara seed · phalashruti",
    kathaTitleMr: "समारोप",
    special: false,
    katha: {
      mr: [
        "अध्याय 17 (Uttara seed · phalashruti) — श्रीधरस्वामींच्या रामविजय परंपरेतील रामायण आख्यान.",
        "हिंद एआय मूळ ओवीपट जोडेपर्यंत स्वतःचे द्विभाषिक कथासार देते. आधुनिक प्रकाशक गद्य येथे नाही.",
      ],
      en: [
        "Adhyay 17 (Uttara seed · phalashruti) follows Shridhar’s Ramvijay retelling of the Rāmāyaṇa arc.",
        "Hind AI supplies original bilingual katha-sar until public-domain ovis are layered. No modern publisher prose.",
      ],
    },
  },
];

export function getRamvijayChapter(id: number): RamvijayChapter | undefined {
  return RAMVIJAY_CHAPTERS.find((chapter) => chapter.id === id);
}
