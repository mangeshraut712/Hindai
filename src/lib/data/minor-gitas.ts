// Minor Gitas - Ashtavakra Gita, Avadhuta Gita, Ribhu Gita
// Philosophical texts focusing on non-dualism (Advaita Vedanta)

export interface GitaVerse {
  id: string;
  gita: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  wordByWord?: WordByWord[];
}

export interface WordByWord {
  sanskrit: string;
  transliteration: string;
  meaning: string;
}

// Ashtavakra Gita - Dialogue between King Janaka and sage Ashtavakra
export const ASHTAVAKRA_GITA: GitaVerse[] = [
  {
    id: "ashtavakra-1-1",
    gita: "Ashtavakra Gita",
    chapter: 1,
    verse: 1,
    sanskrit: "वस्त्रान्तरे निर्मुक्तायां यथा देहादिषु देहिनाम् |",
    transliteration: "vastrāntare niruktāyāṃ yathā dehādiṣu dehinām |",
    translation:
      "As a snake sheds its skin, so should the wise one shed the body without attachment.",
    wordByWord: [
      { sanskrit: "वस्त्र", transliteration: "vastra", meaning: "cloth/skin" },
      { sanskrit: "अन्तरे", transliteration: "antare", meaning: "within" },
      { sanskrit: "निर्मुक्तायाम्", transliteration: "nirmuktāyām", meaning: "freed" },
      { sanskrit: "यथा", transliteration: "yathā", meaning: "as" },
      { sanskrit: "देह", transliteration: "deha", meaning: "body" },
      { sanskrit: "आदिषु", transliteration: "ādiṣu", meaning: "etc." },
      { sanskrit: "देहिनाम्", transliteration: "dehinām", meaning: "of embodied beings" },
    ],
  },
  {
    id: "ashtavakra-1-2",
    gita: "Ashtavakra Gita",
    chapter: 1,
    verse: 2,
    sanskrit: "तथा शरीरे स्वस्थायां निर्विकल्पो निराश्रयः |",
    transliteration: "tathā śarīre svasthāyāṃ nirvikalpo nirāśrayaḥ |",
    translation:
      "So too, when the body is healthy, the wise one should be without thought and without support.",
    wordByWord: [
      { sanskrit: "तथा", transliteration: "tathā", meaning: "thus" },
      { sanskrit: "शरीरे", transliteration: "śarīre", meaning: "in body" },
      { sanskrit: "स्वस्थायाम्", transliteration: "svasthāyām", meaning: "when healthy" },
      { sanskrit: "निर्विकल्पः", transliteration: "nirvikalpaḥ", meaning: "without thought" },
      { sanskrit: "निराश्रयः", transliteration: "nirāśrayaḥ", meaning: "without support" },
    ],
  },
  {
    id: "ashtavakra-2-1",
    gita: "Ashtavakra Gita",
    chapter: 2,
    verse: 1,
    sanskrit: "यदा त्वं सर्वभूतेषु भवसि निर्विकल्पः |",
    transliteration: "yadā tvaṃ sarvabhūteṣu bhavasi nirvikalpaḥ |",
    translation: "When you are without thought in all beings, you will attain liberation.",
    wordByWord: [
      { sanskrit: "यदा", transliteration: "yadā", meaning: "when" },
      { sanskrit: "त्वम्", transliteration: "tvam", meaning: "you" },
      { sanskrit: "सर्वभूतेषु", transliteration: "sarvabhūteṣu", meaning: "in all beings" },
      { sanskrit: "भवसि", transliteration: "bhavasi", meaning: "become" },
      { sanskrit: "निर्विकल्पः", transliteration: "nirvikalpaḥ", meaning: "without thought" },
    ],
  },
];

// Avadhuta Gita - Teachings of Dattatreya to Yajnavalkya
export const AVADHUTA_GITA: GitaVerse[] = [
  {
    id: "avadhuta-1-1",
    gita: "Avadhuta Gita",
    chapter: 1,
    verse: 1,
    sanskrit: "ब्रह्मा विष्णुः शिवः इति एकमेवाहुर्न द्वितीयम् |",
    transliteration: "brahmā viṣṇuḥ śivaḥ iti ekamevāhur na dvitīyam |",
    translation: "Brahma, Vishnu, Shiva - they speak of one only, not two.",
    wordByWord: [
      { sanskrit: "ब्रह्मा", transliteration: "brahmā", meaning: "Brahma" },
      { sanskrit: "विष्णुः", transliteration: "viṣṇuḥ", meaning: "Vishnu" },
      { sanskrit: "शिवः", transliteration: "śivaḥ", meaning: "Shiva" },
      { sanskrit: "इति", transliteration: "iti", meaning: "thus" },
      { sanskrit: "एकम्", transliteration: "ekam", meaning: "one" },
      { sanskrit: "एव", transliteration: "eva", meaning: "only" },
      { sanskrit: "आहुः", transliteration: "āhuḥ", meaning: "they say" },
      { sanskrit: "न", transliteration: "na", meaning: "not" },
      { sanskrit: "द्वितीयम्", transliteration: "dvitīyam", meaning: "second" },
    ],
  },
  {
    id: "avadhuta-1-2",
    gita: "Avadhuta Gita",
    chapter: 1,
    verse: 2,
    sanskrit: "अहं ब्रह्मास्मि न त्वं इति ज्ञानम् अविधिः क्रमात् |",
    transliteration: "ahaṃ brahmāsmi na tvaṃ iti jñānam avidhiḥ kramāt |",
    translation: "I am Brahman, not you - this knowledge is not according to proper order.",
    wordByWord: [
      { sanskrit: "अहम्", transliteration: "aham", meaning: "I" },
      { sanskrit: "ब्रह्म", transliteration: "brahma", meaning: "Brahman" },
      { sanskrit: "अस्मि", transliteration: "asmi", meaning: "am" },
      { sanskrit: "न", transliteration: "na", meaning: "not" },
      { sanskrit: "त्वम्", transliteration: "tvam", meaning: "you" },
      { sanskrit: "इति", transliteration: "iti", meaning: "thus" },
      { sanskrit: "ज्ञानम्", transliteration: "jñānam", meaning: "knowledge" },
      { sanskrit: "अविधिः", transliteration: "avidhiḥ", meaning: "not proper" },
      { sanskrit: "क्रमात्", transliteration: "kramāt", meaning: "according to order" },
    ],
  },
  {
    id: "avadhuta-2-1",
    gita: "Avadhuta Gita",
    chapter: 2,
    verse: 1,
    sanskrit: "गुरुर्न अपि तन्माता न तातः न च दैवतम् |",
    transliteration: "gurur na api tanmātā n tātaḥ na ca daivatam |",
    translation: "The guru is not my father, nor is the father a deity.",
    wordByWord: [
      { sanskrit: "गुरुः", transliteration: "guruḥ", meaning: "guru" },
      { sanskrit: "न", transliteration: "na", meaning: "not" },
      { sanskrit: "अपि", transliteration: "api", meaning: "even" },
      { sanskrit: "तन्माता", transliteration: "tanmātā", meaning: "my father" },
      { sanskrit: "न", transliteration: "na", meaning: "not" },
      { sanskrit: "तातः", transliteration: "tātaḥ", meaning: "father" },
      { sanskrit: "न", transliteration: "na", meaning: "not" },
      { sanskrit: "च", transliteration: "ca", meaning: "and" },
      { sanskrit: "दैवतम्", transliteration: "daivatam", meaning: "deity" },
    ],
  },
];

// Ribhu Gita - Dialogue between sage Ribhu and Nidagha
export const RIBHU_GITA: GitaVerse[] = [
  {
    id: "ribhu-1-1",
    gita: "Ribhu Gita",
    chapter: 1,
    verse: 1,
    sanskrit: "श्रीरिभुः निदाघाय उवाच |",
    transliteration: "śrīribhuḥ nidāghāya uvāca |",
    translation: "Sage Ribhu spoke to Nidagha.",
    wordByWord: [
      { sanskrit: "श्री", transliteration: "śrī", meaning: "auspicious" },
      { sanskrit: "रिभुः", transliteration: "ribhuḥ", meaning: "Ribhu" },
      { sanskrit: "निदाघाय", transliteration: "nidāghāya", meaning: "to Nidagha" },
      { sanskrit: "उवाच", transliteration: "uvāca", meaning: "spoke" },
    ],
  },
  {
    id: "ribhu-1-2",
    gita: "Ribhu Gita",
    chapter: 1,
    verse: 2,
    sanskrit: "त्वमेवाहमिति ज्ञानम् नित्यम् अनुचिन्तयेत् |",
    transliteration: "tvaṃ evāhamiti jñānam nityam anucintayet |",
    translation: "One should constantly contemplate the knowledge: You are I.",
    wordByWord: [
      { sanskrit: "त्वम्", transliteration: "tvam", meaning: "you" },
      { sanskrit: "एव", transliteration: "eva", meaning: "only" },
      { sanskrit: "अहम्", transliteration: "aham", meaning: "I" },
      { sanskrit: "इति", transliteration: "iti", meaning: "thus" },
      { sanskrit: "ज्ञानम्", transliteration: "jñānam", meaning: "knowledge" },
      { sanskrit: "नित्यम्", transliteration: "nityam", meaning: "always" },
      { sanskrit: "अनुचिन्तयेत्", transliteration: "anucintayet", meaning: "should contemplate" },
    ],
  },
  {
    id: "ribhu-2-1",
    gita: "Ribhu Gita",
    chapter: 2,
    verse: 1,
    sanskrit: "सर्वं ब्रह्मैव तत्त्वेन न भिन्नम् न च भिन्नकम् |",
    transliteration: "sarvaṃ brahmaiva tattvena na bhinnaṃ na ca bhinnakam |",
    translation: "Everything is Brahman in truth, not different, not causing difference.",
    wordByWord: [
      { sanskrit: "सर्वम्", transliteration: "sarvam", meaning: "everything" },
      { sanskrit: "ब्रह्म", transliteration: "brahma", meaning: "Brahman" },
      { sanskrit: "एव", transliteration: "eva", meaning: "indeed" },
      { sanskrit: "तत्त्वेन", transliteration: "tattvena", meaning: "in truth" },
      { sanskrit: "न", transliteration: "na", meaning: "not" },
      { sanskrit: "भिन्नम्", transliteration: "bhinnaṃ", meaning: "different" },
      { sanskrit: "न", transliteration: "na", meaning: "not" },
      { sanskrit: "च", transliteration: "ca", meaning: "and" },
      { sanskrit: "भिन्नकम्", transliteration: "bhinnakam", meaning: "causing difference" },
    ],
  },
];

export function getVerseById(id: string): GitaVerse | undefined {
  return [...ASHTAVAKRA_GITA, ...AVADHUTA_GITA, ...RIBHU_GITA].find((verse) => verse.id === id);
}

export function getVersesByGita(gita: string): GitaVerse[] {
  const gitaMap: Record<string, GitaVerse[]> = {
    "Ashtavakra Gita": ASHTAVAKRA_GITA,
    "Avadhuta Gita": AVADHUTA_GITA,
    "Ribhu Gita": RIBHU_GITA,
  };
  return gitaMap[gita] || [];
}

export function searchVerses(query: string): GitaVerse[] {
  const lowerQuery = query.toLowerCase();
  return [...ASHTAVAKRA_GITA, ...AVADHUTA_GITA, ...RIBHU_GITA].filter(
    (verse) =>
      verse.sanskrit.includes(lowerQuery) ||
      verse.transliteration.includes(lowerQuery) ||
      verse.translation.toLowerCase().includes(lowerQuery)
  );
}

export const GITA_TITLES = {
  "Ashtavakra Gita": "Ashtavakra Gita - Dialogue between Janaka and Ashtavakra",
  "Avadhuta Gita": "Avadhuta Gita - Teachings of Dattatreya",
  "Ribhu Gita": "Ribhu Gita - Dialogue between Ribhu and Nidagha",
};

export const GITA_DESCRIPTIONS = {
  "Ashtavakra Gita":
    "A dialogue between King Janaka and the young sage Ashtavakra, focusing on non-dual philosophy and detachment",
  "Avadhuta Gita":
    "Teachings of Dattatreya to Yajnavalkya, emphasizing the non-dual nature of reality and the path of the avadhuta (renunciate)",
  "Ribhu Gita":
    "A dialogue between sage Ribhu and his disciple Nidagha, teaching the realization of Brahman in all things",
};
