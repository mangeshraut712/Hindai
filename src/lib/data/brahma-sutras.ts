// Brahma Sutras (Vedanta Sutras) by Badarayana
// The foundational text of Vedanta philosophy, systematizing Upanishadic teachings

export interface BrahmaSutra {
  id: string;
  chapter: number;
  section: number;
  sutra: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  wordByWord?: WordByWord[];
  keyConcepts: string[];
}

export interface WordByWord {
  sanskrit: string;
  transliteration: string;
  meaning: string;
}

export const BRAHMA_SUTRAS: BrahmaSutra[] = [
  // Chapter 1: Samanvaya (Harmonization) - Establishing Brahman as the source of all
  {
    id: "1-1-1",
    chapter: 1,
    section: 1,
    sutra: 1,
    sanskrit: "अथातो ब्रह्मजिज्ञासा",
    transliteration: "athāto brahma-jijñāsā",
    translation: "Therefore, the inquiry into Brahman.",
    wordByWord: [
      { sanskrit: "अथ", transliteration: "atha", meaning: "therefore" },
      { sanskrit: "अतः", transliteration: "ataḥ", meaning: "from this" },
      { sanskrit: "ब्रह्म", transliteration: "brahma", meaning: "Brahman" },
      { sanskrit: "जिज्ञासा", transliteration: "jijñāsā", meaning: "inquiry" },
    ],
    keyConcepts: ["Brahman", "Inquiry", "Vedanta", "Knowledge"],
  },
  {
    id: "1-1-2",
    chapter: 1,
    section: 1,
    sutra: 2,
    sanskrit: "जन्माद्यस्य यतः",
    transliteration: "janmādyasya yataḥ",
    translation: "From which the origin, etc., of this (world).",
    wordByWord: [
      { sanskrit: "जन्म", transliteration: "janma", meaning: "origin" },
      { sanskrit: "आदि", transliteration: "ādi", meaning: "etc." },
      { sanskrit: "अस्य", transliteration: "asya", meaning: "of this" },
      { sanskrit: "यतः", transliteration: "yataḥ", meaning: "from which" },
    ],
    keyConcepts: ["Origin", "Creation", "Brahman", "Cause"],
  },
  {
    id: "1-1-3",
    chapter: 1,
    section: 1,
    sutra: 3,
    sanskrit: "शास्त्रयोनित्वात्",
    transliteration: "śāstra-yonitvāt",
    translation: "Because scripture is the source (of this knowledge).",
    wordByWord: [
      { sanskrit: "शास्त्र", transliteration: "śāstra", meaning: "scripture" },
      {
        sanskrit: "योनित्वात्",
        transliteration: "yonitvāt",
        meaning: "because of being the source",
      },
    ],
    keyConcepts: ["Scripture", "Authority", "Vedas", "Revelation"],
  },
  {
    id: "1-1-4",
    chapter: 1,
    section: 1,
    sutra: 4,
    sanskrit: "तत्तु समन्वयात्",
    transliteration: "tattu samanvayāt",
    translation: "But that (Brahman) is on account of harmony (of the scriptures).",
    wordByWord: [
      { sanskrit: "तत्", transliteration: "tat", meaning: "that" },
      { sanskrit: "तु", transliteration: "tu", meaning: "but" },
      { sanskrit: "समन्वयात्", transliteration: "samanvayāt", meaning: "on account of harmony" },
    ],
    keyConcepts: ["Harmony", "Scripture", "Consistency", "Brahman"],
  },

  // Chapter 2: Avirodha (Non-contradiction) - Refuting objections
  {
    id: "2-1-1",
    chapter: 2,
    section: 1,
    sutra: 1,
    sanskrit: "अनिर्वच्चनेदाद्यस्य तद्वादेष्टेरवाकशिरास्ते",
    transliteration: "anirvacanedyasya tadvādeṣṭeravākśirāste",
    translation:
      "If it be said that on account of the non-finality of the Vedic texts, the position of the smriti is superior, we say no, because of the Vedic texts being the source.",
    wordByWord: [
      {
        sanskrit: "अनिर्वच्चनेदात्",
        transliteration: "anirvacanedyāt",
        meaning: "on account of non-finality",
      },
      { sanskrit: "अस्य", transliteration: "asya", meaning: "of this" },
      { sanskrit: "तत्", transliteration: "tat", meaning: "that" },
      {
        sanskrit: "वादेष्टेरवाक्शिरास्ते",
        transliteration: "vādeṣṭeravākśirāste",
        meaning: "the position of smriti is superior",
      },
    ],
    keyConcepts: ["Vedas", "Smriti", "Authority", "Non-contradiction"],
  },
  {
    id: "2-2-1",
    chapter: 2,
    section: 2,
    sutra: 1,
    sanskrit: "यथोद्देशः स्थितलक्षणानाम्",
    transliteration: "yathoddeśaḥ sthitalakṣaṇānām",
    translation:
      "As the creation is stated, so is the dissolution, according to the characteristics.",
    wordByWord: [
      { sanskrit: "यथा", transliteration: "yathā", meaning: "as" },
      { sanskrit: "उद्देशः", transliteration: "uddeśaḥ", meaning: "stated" },
      { sanskrit: "स्थित", transliteration: "sthita", meaning: "sustained" },
      { sanskrit: "लक्षणानाम्", transliteration: "lakṣaṇānām", meaning: "of characteristics" },
    ],
    keyConcepts: ["Creation", "Dissolution", "Cycle", "Brahman"],
  },

  // Chapter 3: Sadhana (Means) - Methods to attain Brahman
  {
    id: "3-1-1",
    chapter: 3,
    section: 1,
    sutra: 1,
    sanskrit: "तत्त्वविचाराध्यानस्य तत्त्वज्ञानप्रयुक्तस्य",
    transliteration: "tattva-vicārādhyānasya tattva-jñāna-prayuktasya",
    translation:
      "For one who has the desire to inquire into the truth, the means is knowledge of the truth.",
    wordByWord: [
      { sanskrit: "तत्त्व", transliteration: "tattva", meaning: "truth" },
      { sanskrit: "विचार", transliteration: "vicāra", meaning: "inquiry" },
      { sanskrit: "अध्यानस्य", transliteration: "adhyānasya", meaning: "for one who has desire" },
      { sanskrit: "तत्त्वज्ञान", transliteration: "tattva-jñāna", meaning: "knowledge of truth" },
      { sanskrit: "प्रयुक्तस्य", transliteration: "prayuktasya", meaning: "connected with" },
    ],
    keyConcepts: ["Inquiry", "Knowledge", "Truth", "Meditation"],
  },
  {
    id: "3-2-1",
    chapter: 3,
    section: 2,
    sutra: 1,
    sanskrit: "तत्त्वज्ञानादेव तद्विरोधाद्दृष्टेश्च",
    transliteration: "tattva-jñānādeva tadvirodhāddṛṣṭeśca",
    translation:
      "From knowledge of the truth alone, not from that which is opposed to it, and from the sight (of the Self).",
    wordByWord: [
      {
        sanskrit: "तत्त्वज्ञानात्",
        transliteration: "tattva-jñānāt",
        meaning: "from knowledge of truth",
      },
      { sanskrit: "एव", transliteration: "eva", meaning: "alone" },
      { sanskrit: "तत्", transliteration: "tat", meaning: "that" },
      { sanskrit: "विरोधात्", transliteration: "virodhāt", meaning: "from opposition" },
      { sanskrit: "दृष्टेः", transliteration: "dṛṣṭeḥ", meaning: "from sight" },
      { sanskrit: "च", transliteration: "ca", meaning: "and" },
    ],
    keyConcepts: ["Knowledge", "Direct Experience", "Self-realization", "Liberation"],
  },

  // Chapter 4: Phala (Fruit) - Results of realization
  {
    id: "4-1-1",
    chapter: 4,
    section: 1,
    sutra: 1,
    sanskrit: "अनावृत्तिर्नामधर्मो विद्यादिष्टो निर्दिष्टः",
    transliteration: "anāvṛtirnāmadharmaḥ vidyādiṣṭo nirdiṣṭaḥ",
    translation:
      "Non-return is the result of the prescribed duties; it is established by scripture and reasoning.",
    wordByWord: [
      { sanskrit: "अनावृत्तिः", transliteration: "anāvṛttiḥ", meaning: "non-return" },
      { sanskrit: "नाम", transliteration: "nāma", meaning: "called" },
      { sanskrit: "अधर्मः", transliteration: "adharmaḥ", meaning: "not dharma" },
      {
        sanskrit: "विद्यादिष्टः",
        transliteration: "vidyādiṣṭaḥ",
        meaning: "established by knowledge",
      },
      { sanskrit: "निर्दिष्टः", transliteration: "nirdiṣṭaḥ", meaning: "prescribed" },
    ],
    keyConcepts: ["Liberation", "Non-return", "Moksha", "Knowledge"],
  },
  {
    id: "4-2-1",
    chapter: 4,
    section: 2,
    sutra: 1,
    sanskrit: "स्वाप्यानाम् अधिकरणाद्धर्मो विद्यादिष्टो निर्दिष्टः",
    transliteration: "svāpyānām adhikarānaddharmaḥ vidyādiṣṭo nirdiṣṭaḥ",
    translation:
      "For those who have attained liberation, there is no prescribed duty; it is established by knowledge.",
    wordByWord: [
      {
        sanskrit: "स्वाप्यानाम्",
        transliteration: "svāpyānām",
        meaning: "for those who have attained",
      },
      { sanskrit: "अधिकरणात्", transliteration: "adhikarānāt", meaning: "from position" },
      { sanskrit: "अधर्मः", transliteration: "adharmaḥ", meaning: "not dharma" },
      {
        sanskrit: "विद्यादिष्टः",
        transliteration: "vidyādiṣṭaḥ",
        meaning: "established by knowledge",
      },
      { sanskrit: "निर्दिष्टः", transliteration: "nirdiṣṭaḥ", meaning: "prescribed" },
    ],
    keyConcepts: ["Liberated", "No duties", "Freedom", "Knowledge"],
  },
];

export function getSutraById(id: string): BrahmaSutra | undefined {
  return BRAHMA_SUTRAS.find((sutra) => sutra.id === id);
}

export function getSutrasByChapter(chapter: number): BrahmaSutra[] {
  return BRAHMA_SUTRAS.filter((sutra) => sutra.chapter === chapter);
}

export function searchSutras(query: string): BrahmaSutra[] {
  const lowerQuery = query.toLowerCase();
  return BRAHMA_SUTRAS.filter(
    (sutra) =>
      sutra.sanskrit.includes(lowerQuery) ||
      sutra.transliteration.includes(lowerQuery) ||
      sutra.translation.toLowerCase().includes(lowerQuery) ||
      sutra.keyConcepts.some((concept) => concept.toLowerCase().includes(lowerQuery))
  );
}

export const CHAPTER_TITLES = {
  1: "Samanvaya - Harmonization",
  2: "Avirodha - Non-contradiction",
  3: "Sadhana - Means",
  4: "Phala - Fruit",
};

export const CHAPTER_DESCRIPTIONS = {
  1: "Establishes Brahman as the source of creation and harmonizes various Upanishadic statements",
  2: "Refutes objections to the existence and nature of Brahman",
  3: "Describes the methods and practices to attain realization of Brahman",
  4: "Explains the results and fruits of Self-realization and liberation",
};
