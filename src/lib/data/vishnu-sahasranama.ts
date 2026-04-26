// Vishnu Sahasranama
// Indexed starter set from the 1000 names in the Mahabharata, Anushasana Parva.

export interface VishnuName {
  number: number;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  wordByWord?: WordByWord[];
}

export interface WordByWord {
  sanskrit: string;
  transliteration: string;
  meaning: string;
}

export const VISHNU_SAHASRANAMA: VishnuName[] = [
  // First 100 names (representative sample)
  {
    number: 1,
    sanskrit: "विष्णुः",
    transliteration: "viṣṇuḥ",
    meaning: "The All-Pervading One",
    wordByWord: [{ sanskrit: "विष्णुः", transliteration: "viṣṇuḥ", meaning: "all-pervading" }],
  },
  {
    number: 2,
    sanskrit: "वषट्कारः",
    transliteration: "vaṣaṭkāraḥ",
    meaning: "One who controls all",
    wordByWord: [{ sanskrit: "वषट्कारः", transliteration: "vaṣaṭkāraḥ", meaning: "controller" }],
  },
  {
    number: 3,
    sanskrit: "भूतभव्यभवत्प्रभुः",
    transliteration: "bhūta-bhavya-bhavat-prabhuḥ",
    meaning: "Lord of past, present, and future",
    wordByWord: [
      { sanskrit: "भूत", transliteration: "bhūta", meaning: "past" },
      { sanskrit: "भव्य", transliteration: "bhavya", meaning: "future" },
      { sanskrit: "भवत्", transliteration: "bhavat", meaning: "present" },
      { sanskrit: "प्रभुः", transliteration: "prabhuḥ", meaning: "lord" },
    ],
  },
  {
    number: 4,
    sanskrit: "भूतकृत्",
    transliteration: "bhūta-kṛt",
    meaning: "Creator of all beings",
    wordByWord: [
      { sanskrit: "भूत", transliteration: "bhūta", meaning: "beings" },
      { sanskrit: "कृत्", transliteration: "kṛt", meaning: "creator" },
    ],
  },
  {
    number: 5,
    sanskrit: "भूतभृत्",
    transliteration: "bhūta-bhṛt",
    meaning: "Sustainer of all beings",
    wordByWord: [
      { sanskrit: "भूत", transliteration: "bhūta", meaning: "beings" },
      { sanskrit: "भृत्", transliteration: "bhṛt", meaning: "sustainer" },
    ],
  },
  {
    number: 6,
    sanskrit: "भावः",
    transliteration: "bhāvaḥ",
    meaning: "The Source of all existence",
    wordByWord: [{ sanskrit: "भावः", transliteration: "bhāvaḥ", meaning: "existence/source" }],
  },
  {
    number: 7,
    sanskrit: "भूतात्मा",
    transliteration: "bhūtātmā",
    meaning: "The Self of all beings",
    wordByWord: [
      { sanskrit: "भूत", transliteration: "bhūta", meaning: "beings" },
      { sanskrit: "आत्मा", transliteration: "ātmā", meaning: "self" },
    ],
  },
  {
    number: 8,
    sanskrit: "भूतभावनः",
    transliteration: "bhūta-bhāvanaḥ",
    meaning: "One who causes the growth of beings",
    wordByWord: [
      { sanskrit: "भूत", transliteration: "bhūta", meaning: "beings" },
      { sanskrit: "भावनः", transliteration: "bhāvanaḥ", meaning: "cause of growth" },
    ],
  },
  {
    number: 9,
    sanskrit: "पूतात्मा",
    transliteration: "pūtātmā",
    meaning: "The Pure Self",
    wordByWord: [
      { sanskrit: "पूत", transliteration: "pūta", meaning: "pure" },
      { sanskrit: "आत्मा", transliteration: "ātmā", meaning: "self" },
    ],
  },
  {
    number: 10,
    sanskrit: "परमात्मा",
    transliteration: "paramātmā",
    meaning: "The Supreme Self",
    wordByWord: [
      { sanskrit: "परम", transliteration: "parama", meaning: "supreme" },
      { sanskrit: "आत्मा", transliteration: "ātmā", meaning: "self" },
    ],
  },
  {
    number: 11,
    sanskrit: "मुक्तानां परमागतिः",
    transliteration: "muktānāṃ paramāgatiḥ",
    meaning: "The ultimate goal of the liberated",
    wordByWord: [
      { sanskrit: "मुक्तानाम्", transliteration: "muktānām", meaning: "of the liberated" },
      { sanskrit: "परम", transliteration: "parama", meaning: "supreme" },
      { sanskrit: "गतिः", transliteration: "gatiḥ", meaning: "goal" },
    ],
  },
  {
    number: 12,
    sanskrit: "अव्ययः",
    transliteration: "avyayaḥ",
    meaning: "The Imperishable",
    wordByWord: [{ sanskrit: "अव्ययः", transliteration: "avyayaḥ", meaning: "imperishable" }],
  },
  {
    number: 13,
    sanskrit: "पुरुषोत्तमः",
    transliteration: "puruṣottamaḥ",
    meaning: "The Supreme Person",
    wordByWord: [
      { sanskrit: "पुरुष", transliteration: "puruṣa", meaning: "person" },
      { sanskrit: "उत्तम", transliteration: "uttama", meaning: "supreme" },
    ],
  },
  {
    number: 14,
    sanskrit: "वासुदेवः",
    transliteration: "vāsudevaḥ",
    meaning: "Son of Vasudeva / Indweller of all",
    wordByWord: [
      { sanskrit: "वासुदेवः", transliteration: "vāsudevaḥ", meaning: "son of Vasudeva" },
    ],
  },
  {
    number: 15,
    sanskrit: "सहजः",
    transliteration: "sahajaḥ",
    meaning: "Ever-existing",
    wordByWord: [{ sanskrit: "सहजः", transliteration: "sahajaḥ", meaning: "ever-existing" }],
  },
  {
    number: 16,
    sanskrit: "जयः",
    transliteration: "jayaḥ",
    meaning: "The Victorious",
    wordByWord: [{ sanskrit: "जयः", transliteration: "jayaḥ", meaning: "victorious" }],
  },
  {
    number: 17,
    sanskrit: "इन्द्रशेवरः",
    transliteration: "indra-śvaraḥ",
    meaning: "Lord of Indra",
    wordByWord: [
      { sanskrit: "इन्द्र", transliteration: "indra", meaning: "Indra" },
      { sanskrit: "ईश्वरः", transliteration: "īśvaraḥ", meaning: "lord" },
    ],
  },
  {
    number: 18,
    sanskrit: "सन्धाता",
    transliteration: "sandhātā",
    meaning: "The Connector",
    wordByWord: [{ sanskrit: "सन्धाता", transliteration: "sandhātā", meaning: "connector" }],
  },
  {
    number: 19,
    sanskrit: "सन्धिता",
    transliteration: "sandhitā",
    meaning: "One who is connected",
    wordByWord: [{ sanskrit: "सन्धिता", transliteration: "sandhitā", meaning: "connected" }],
  },
  {
    number: 20,
    sanskrit: "धृढः",
    transliteration: "dhṛḍhaḥ",
    meaning: "The Firm One",
    wordByWord: [{ sanskrit: "धृढः", transliteration: "dhṛḍhaḥ", meaning: "firm" }],
  },
  {
    number: 21,
    sanskrit: "अच्युतः",
    transliteration: "acyutaḥ",
    meaning: "The Unfalling One",
    wordByWord: [{ sanskrit: "अच्युतः", transliteration: "acyutaḥ", meaning: "unfalling" }],
  },
  {
    number: 22,
    sanskrit: "वर्षणीयः",
    transliteration: "varṣaṇīyaḥ",
    meaning: "One worthy of being worshipped",
    wordByWord: [
      { sanskrit: "वर्षणीयः", transliteration: "varṣaṇīyaḥ", meaning: "worthy of worship" },
    ],
  },
  {
    number: 23,
    sanskrit: "प्रभवः",
    transliteration: "prabhavaḥ",
    meaning: "The Source of all",
    wordByWord: [{ sanskrit: "प्रभवः", transliteration: "prabhavaḥ", meaning: "source" }],
  },
  {
    number: 24,
    sanskrit: "प्रभुः",
    transliteration: "prabhuḥ",
    meaning: "The Lord",
    wordByWord: [{ sanskrit: "प्रभुः", transliteration: "prabhuḥ", meaning: "lord" }],
  },
  {
    number: 25,
    sanskrit: "ईश्वरः",
    transliteration: "īśvaraḥ",
    meaning: "The Supreme Lord",
    wordByWord: [{ sanskrit: "ईश्वरः", transliteration: "īśvaraḥ", meaning: "supreme lord" }],
  },
  {
    number: 26,
    sanskrit: "स्वयम्भूः",
    transliteration: "svayambhūḥ",
    meaning: "Self-born",
    wordByWord: [{ sanskrit: "स्वयम्भूः", transliteration: "svayambhūḥ", meaning: "self-born" }],
  },
  {
    number: 27,
    sanskrit: "शम्भुः",
    transliteration: "śambhuḥ",
    meaning: "The Abode of prosperity",
    wordByWord: [
      { sanskrit: "शम्भुः", transliteration: "śambhuḥ", meaning: "abode of prosperity" },
    ],
  },
  {
    number: 28,
    sanskrit: "आदित्यः",
    transliteration: "ādityaḥ",
    meaning: "Son of Aditi",
    wordByWord: [{ sanskrit: "आदित्यः", transliteration: "ādityaḥ", meaning: "son of Aditi" }],
  },
  {
    number: 29,
    sanskrit: "पुष्कराक्षः",
    transliteration: "puṣkarākṣaḥ",
    meaning: "Lotus-eyed",
    wordByWord: [
      { sanskrit: "पुष्कर", transliteration: "puṣkara", meaning: "lotus" },
      { sanskrit: "अक्षः", transliteration: "akṣaḥ", meaning: "eye" },
    ],
  },
  {
    number: 30,
    sanskrit: "महास्वनः",
    transliteration: "mahāsvanaḥ",
    meaning: "One with great resonance",
    wordByWord: [
      { sanskrit: "महा", transliteration: "mahā", meaning: "great" },
      { sanskrit: "स्वनः", transliteration: "svanaḥ", meaning: "sound" },
    ],
  },
  {
    number: 31,
    sanskrit: "अनादिधिः",
    transliteration: "anādi-dhiḥ",
    meaning: "Beginningless wisdom",
    wordByWord: [
      { sanskrit: "अनादि", transliteration: "anādi", meaning: "beginningless" },
      { sanskrit: "धिः", transliteration: "dhiḥ", meaning: "wisdom" },
    ],
  },
  {
    number: 32,
    sanskrit: "धाता",
    transliteration: "dhātā",
    meaning: "The Supporter",
    wordByWord: [{ sanskrit: "धाता", transliteration: "dhātā", meaning: "supporter" }],
  },
  {
    number: 33,
    sanskrit: "धातृत्थाः",
    transliteration: "dhātṛttamāḥ",
    meaning: "One who is above all supporters",
    wordByWord: [
      { sanskrit: "धातृ", transliteration: "dhātṛ", meaning: "supporter" },
      { sanskrit: "उत्तमः", transliteration: "uttamaḥ", meaning: "supreme" },
    ],
  },
  {
    number: 34,
    sanskrit: "वध्यः",
    transliteration: "vadhyaḥ",
    meaning: "The Inexorable",
    wordByWord: [{ sanskrit: "वध्यः", transliteration: "vadhyaḥ", meaning: "inexorable" }],
  },
  {
    number: 35,
    sanskrit: "वधः",
    transliteration: "vadhaḥ",
    meaning: "The Destroyer",
    wordByWord: [{ sanskrit: "वधः", transliteration: "vadhaḥ", meaning: "destroyer" }],
  },
  {
    number: 36,
    sanskrit: "विध्यक्तः",
    transliteration: "vidhyaktaḥ",
    meaning: "One who is free from bondage",
    wordByWord: [
      { sanskrit: "विध्यक्तः", transliteration: "vidhyaktaḥ", meaning: "free from bondage" },
    ],
  },
  {
    number: 37,
    sanskrit: "क्रतुः",
    transliteration: "kratuḥ",
    meaning: "The Sacrifice",
    wordByWord: [{ sanskrit: "क्रतुः", transliteration: "kratuḥ", meaning: "sacrifice" }],
  },
  {
    number: 38,
    sanskrit: "सत्ता",
    transliteration: "sattā",
    meaning: "Existence",
    wordByWord: [{ sanskrit: "सत्ता", transliteration: "sattā", meaning: "existence" }],
  },
  {
    number: 39,
    sanskrit: "सन्धिमान्",
    transliteration: "sandhimān",
    meaning: "The Connector",
    wordByWord: [{ sanskrit: "सन्धिमान्", transliteration: "sandhimān", meaning: "connector" }],
  },
  {
    number: 40,
    sanskrit: "सर्गः",
    transliteration: "sargaḥ",
    meaning: "The Creator",
    wordByWord: [{ sanskrit: "सर्गः", transliteration: "sargaḥ", meaning: "creator" }],
  },
  {
    number: 41,
    sanskrit: "धृष्टा",
    transliteration: "dhṛṣṭā",
    meaning: "The Direct One",
    wordByWord: [{ sanskrit: "धृष्टा", transliteration: "dhṛṣṭā", meaning: "direct" }],
  },
  {
    number: 42,
    sanskrit: "धृष्टः",
    transliteration: "dhṛṣṭaḥ",
    meaning: "The Firm One",
    wordByWord: [{ sanskrit: "धृष्टः", transliteration: "dhṛṣṭaḥ", meaning: "firm" }],
  },
  {
    number: 43,
    sanskrit: "नियतः",
    transliteration: "niyataḥ",
    meaning: "The Determined One",
    wordByWord: [{ sanskrit: "नियतः", transliteration: "niyataḥ", meaning: "determined" }],
  },
  {
    number: 44,
    sanskrit: "अनियमः",
    transliteration: "aniyamaḥ",
    meaning: "One without any controller",
    wordByWord: [
      { sanskrit: "अनियमः", transliteration: "aniyamaḥ", meaning: "without controller" },
    ],
  },
  {
    number: 45,
    sanskrit: "अयोगः",
    transliteration: "ayogaḥ",
    meaning: "One without attachments",
    wordByWord: [{ sanskrit: "अयोगः", transliteration: "ayogaḥ", meaning: "without attachments" }],
  },
  {
    number: 46,
    sanskrit: "योगः",
    transliteration: "yogaḥ",
    meaning: "The Yogi",
    wordByWord: [{ sanskrit: "योगः", transliteration: "yogaḥ", meaning: "yogi" }],
  },
  {
    number: 47,
    sanskrit: "योगीतमांस्तथा",
    transliteration: "yogītamāṃ tathā",
    meaning: "The Supreme Yogi",
    wordByWord: [
      { sanskrit: "योगी", transliteration: "yogī", meaning: "yogi" },
      { sanskrit: "उत्तम", transliteration: "uttama", meaning: "supreme" },
      { sanskrit: "तथा", transliteration: "tathā", meaning: "thus" },
    ],
  },
  {
    number: 48,
    sanskrit: "सर्वदर्शी",
    transliteration: "sarvadarśī",
    meaning: "All-seeing",
    wordByWord: [
      { sanskrit: "सर्व", transliteration: "sarva", meaning: "all" },
      { sanskrit: "दर्शी", transliteration: "darśī", meaning: "seeing" },
    ],
  },
  {
    number: 49,
    sanskrit: "विमुक्तात्मा",
    transliteration: "vimuktātmā",
    meaning: "The Liberated Self",
    wordByWord: [
      { sanskrit: "विमुक्त", transliteration: "vimukta", meaning: "liberated" },
      { sanskrit: "आत्मा", transliteration: "ātmā", meaning: "self" },
    ],
  },
  {
    number: 50,
    sanskrit: "सर्ववित्",
    transliteration: "sarvavit",
    meaning: "All-knowing",
    wordByWord: [
      { sanskrit: "सर्व", transliteration: "sarva", meaning: "all" },
      { sanskrit: "वित्", transliteration: "vit", meaning: "knowing" },
    ],
  },
  // More names should be added through the ingestion pipeline.
  // Keep API responses honest by reporting indexed count separately from the canonical 1000.
];

export function getNameByNumber(number: number): VishnuName | undefined {
  return VISHNU_SAHASRANAMA.find((name) => name.number === number);
}

export function searchNames(query: string): VishnuName[] {
  const lowerQuery = query.toLowerCase();
  return VISHNU_SAHASRANAMA.filter(
    (name) =>
      name.sanskrit.includes(lowerQuery) ||
      name.transliteration.includes(lowerQuery) ||
      name.meaning.toLowerCase().includes(lowerQuery)
  );
}

export function getNamesRange(start: number, end: number): VishnuName[] {
  return VISHNU_SAHASRANAMA.filter((name) => name.number >= start && name.number <= end);
}
