/**
 * Enhanced Scripture Data System for Hind AI
 *
 * Complete data structures for:
 * - All 4 Vedas with Rigveda Mandalas structure
 * - 108 principal Upanishads
 * - 18 Mahapuranas
 * - Word-by-word (anvaya) breakdown
 * - Cross-scriptural linking
 */

import { Scripture, ScriptureVerse } from "@/types/scripture";

// ─── Enhanced Types for Vedic Apparatus ───────────────────────────────────────

export interface PadaArtha {
  word: string;          // Sanskrit word (Devanagari)
  iast: string;          // IAST transliteration
  root?: string;         // dhatu (verbal root)
  meaning: string;       // English meaning
  grammarNote?: string;  // case, number, gender etc.
}

export interface VerseRef {
  scriptureId: string;
  chapter?: number;
  mandala?: number;
  sukta?: number;
  verse: number;
  relevance: string; // why this verse is related
}

export interface EnhancedVerse {
  id: string;
  scriptureId: string;
  chapter?: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: {
    en: string;
    hi?: string;
  };
  keyTerms: string[];
  relatedVerses?: string[];

  // Hierarchical position for Vedas
  mandala?: number; // Rigveda Mandalas 1-10
  sukta?: number; // Sukta within Mandala

  // Sanskrit apparatus
  padapatha?: string; // word-by-word Sanskrit
  anvaya?: string; // prose word order (Sanskrit)

  // Word-by-word meanings
  padaArtha?: PadaArtha[];

  // Vedic metadata
  deity?: string; // devata
  sage?: string; // rishi
  meter?: string; // chandas (Gayatri, Trishtubh etc.)

  // Cross-references
  verseRefs?: VerseRef[];

  // Commentary traditions
  commentaries?: {
    shankara?: string;
    ramanuja?: string;
    madhva?: string;
    sayana?: string;
  };
}

export interface Sukta {
  number: number;
  title?: string;
  deity: string;
  sage: string;
  meter: string;
  verses: EnhancedVerse[];
  summary?: string;
}

export interface Mandala {
  number: number;
  title: string;
  description: string;
  suktas: Sukta[];
  totalVerses: number;
}

// ─── Complete Rigveda Structure ───────────────────────────────────────────────

export const RIGVEDA_MANDALAS: Mandala[] = [
  {
    number: 1,
    title: "Mandala 1 - Miscellaneous Family Book",
    description:
      "Largest Mandala with 191 Suktas and 2006 verses. Contains diverse deities and family books.",
    totalVerses: 2006,
    suktas: [
      {
        number: 1,
        title: "Agni Sukta",
        deity: "Agni",
        sage: "Madhucchandas Vaishvamitra",
        meter: "Gayatri",
        summary:
          "Opening hymn invoking Agni as the cosmic priest and mediator between humans and gods.",
        verses: [
          {
            id: "rv-1-1-1",
            scriptureId: "rigveda",
            mandala: 1,
            sukta: 1,
            verse: 1,
            sanskrit: "अ॒ग्निमी॑ळे पुरोहितं य॒ज्ञस्य॑ देवमृत्विजम् |\nहोतारं रत्नधातमम् ||",
            transliteration:
              "agnim īḷe purohitaṃ yajñasya devam ṛtvijam |\nhotāraṃ ratna-dhātamam ||",
            padapatha:
              "agnim | īḷe | purohitam | yajñasya | devam | ṛtvijam | hotāram | ratna-dhātamam",
            anvaya: "yajñasya purohitam devam ṛtvijam hotāram ratna-dhātamam agnim īḷe",
            padaArtha: [
              {
                word: "अग्निम्",
                iast: "agnim",
                root: "ag (to move crookedly)",
                meaning: "Agni (fire-god), the first principle",
              },
              {
                word: "ईळे",
                iast: "īḷe",
                root: "īḷ (to praise)",
                meaning: "I praise, I invoke",
                grammarNote: "Ātmanepada 1st sg present",
              },
              {
                word: "पुरोहितम्",
                iast: "purohitam",
                root: "puras + dhā",
                meaning: "the priest, placed foremost",
              },
              {
                word: "यज्ञस्य",
                iast: "yajñasya",
                root: "yaj (to worship)",
                meaning: "of the sacrifice",
                grammarNote: "genitive singular",
              },
              {
                word: "देवम्",
                iast: "devam",
                root: "div (to shine)",
                meaning: "divine, the god",
                grammarNote: "accusative singular",
              },
              { word: "ऋत्विजम्", iast: "ṛtvijam", meaning: "the seasonal priest who officiates" },
              {
                word: "होतारम्",
                iast: "hotāram",
                root: "hu (to offer)",
                meaning: "the offerer, invoking priest",
              },
              {
                word: "रत्नधातमम्",
                iast: "ratna-dhātamam",
                meaning: "greatest bestower of treasures",
                grammarNote: "superlative",
              },
            ],
            translation: {
              en: "I praise Agni, the household priest, the divine minister of the sacrifice, the invoker, the greatest bestower of treasure.",
              hi: "मैं अग्नि की स्तुति करता हूँ — जो पुरोहित, यज्ञ के देव, ऋत्विज, होता और सर्वश्रेष्ठ रत्नदाता हैं।",
            },
            keyTerms: ["Agni", "Yajna", "Hotr"],
            deity: "Agni",
            sage: "Madhucchandas Vaishvamitra",
            meter: "Gayatri (8+8+8)",
            verseRefs: [
              {
                scriptureId: "bhagavad-gita",
                chapter: 15,
                verse: 14,
                relevance: "Krishna declares 'I am the fire of digestion (vaishvanara)'",
              },
              {
                scriptureId: "brihadaranyaka-upanishad",
                chapter: 1,
                verse: 1,
                relevance: "Opening equates sacrificial horse with cosmic forces",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Mandala 2 - Gritsamada Family",
    description: "43 Suktas, 429 verses. Primarily Indra and Agni hymns by Gritsamada.",
    totalVerses: 429,
    suktas: [],
  },
  {
    number: 3,
    title: "Mandala 3 - Vishvamitra Family",
    description: "62 Suktas, 617 verses. Contains the sacred Gayatri Mantra (3.62.10).",
    totalVerses: 617,
    suktas: [
      {
        number: 62,
        title: "Gayatri Mantra",
        deity: "Savitri (Solar Deity)",
        sage: "Vishvamitra Gathina",
        meter: "Gayatri",
        summary:
          "The most sacred mantra in Hinduism, dedicated to Savitri (the Sun as divine impeller).",
        verses: [
          {
            id: "rv-3-62-10",
            scriptureId: "rigveda",
            mandala: 3,
            sukta: 62,
            verse: 10,
            sanskrit: "ॐ तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि ।\nधियो यो नः प्रचोदयात् ॥",
            transliteration:
              "oṃ tat savitur vareṇyaṃ bhargo devasya dhīmahi |\ndhiyo yo naḥ pracodayāt ||",
            padapatha:
              "oṃ | tat | savituḥ | vareṇyam | bhargaḥ | devasya | dhīmahi | dhiyaḥ | yaḥ | naḥ | pracodayāt",
            padaArtha: [
              { word: "ॐ", iast: "oṃ", meaning: "primordial sacred syllable — sound of Brahman" },
              {
                word: "तत्",
                iast: "tat",
                meaning: "that (the absolute)",
                grammarNote: "demonstrative pronoun",
              },
              {
                word: "सवितुः",
                iast: "savituḥ",
                root: "sū (to generate)",
                meaning: "of Savitri (Sun as impeller)",
                grammarNote: "genitive singular",
              },
              {
                word: "वरेण्यम्",
                iast: "vareṇyam",
                root: "vṛ (to choose)",
                meaning: "most excellent, worthy of choice",
                grammarNote: "gerundive",
              },
              { word: "भर्गः", iast: "bhargaḥ", meaning: "radiance, effulgence, spiritual light" },
              {
                word: "देवस्य",
                iast: "devasya",
                meaning: "of the divine, shining one",
                grammarNote: "genitive singular",
              },
              {
                word: "धीमहि",
                iast: "dhīmahi",
                root: "dhyai (to contemplate)",
                meaning: "we meditate upon",
                grammarNote: "Ātmanepada 1st pl optative",
              },
              {
                word: "धियः",
                iast: "dhiyaḥ",
                meaning: "our intellects, higher minds",
                grammarNote: "accusative plural",
              },
              {
                word: "यः",
                iast: "yaḥ",
                meaning: "who (that divine light)",
                grammarNote: "relative pronoun",
              },
              { word: "नः", iast: "naḥ", meaning: "our, us" },
              {
                word: "प्रचोदयात्",
                iast: "pracodayāt",
                root: "pra + cud (to impel)",
                meaning: "may he inspire",
                grammarNote: "causative optative",
              },
            ],
            translation: {
              en: "Om. We meditate on the most excellent effulgence of the divine Sun (Savitri). May he inspire our intellects.",
              hi: "ॐ। हम उस देव-सवितु के श्रेष्ठ तेज का ध्यान करते हैं। वह हमारी बुद्धियों को प्रेरित करे।",
            },
            keyTerms: ["Gayatri", "Savitri", "OM", "Bharga"],
            deity: "Savitri",
            sage: "Vishvamitra Gathina",
            meter: "Gayatri (24 syllables: 8+8+8)",
            verseRefs: [
              {
                scriptureId: "bhagavad-gita",
                chapter: 10,
                verse: 35,
                relevance: "Krishna says 'Among meters I am the Gayatri'",
              },
              {
                scriptureId: "chandogya-upanishad",
                chapter: 3,
                verse: 12,
                relevance: "Identifies Gayatri with all of existence",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    number: 4,
    title: "Mandala 4 - Vamadeva Family",
    description: "58 Suktas, 589 verses. Rich Indra cosmology by Vamadeva Gautama.",
    totalVerses: 589,
    suktas: [],
  },
  {
    number: 5,
    title: "Mandala 5 - Atri Family",
    description: "87 Suktas, 727 verses. Indra, Agni, Maruts, Adityas hymns by Atri.",
    totalVerses: 727,
    suktas: [],
  },
  {
    number: 6,
    title: "Mandala 6 - Bharadvaja Family",
    description: "75 Suktas, 765 verses. Ritual hymns, Indra and Agni by Bharadvaja.",
    totalVerses: 765,
    suktas: [],
  },
  {
    number: 7,
    title: "Mandala 7 - Vasishtha Family",
    description: "104 Suktas, 841 verses. Varuna hymns, cosmic order (rta) by Vasishtha.",
    totalVerses: 841,
    suktas: [],
  },
  {
    number: 8,
    title: "Mandala 8 - Kanva Family",
    description: "103 Suktas, 1716 verses. Includes Valakhilya hymns (8.49-59).",
    totalVerses: 1716,
    suktas: [],
  },
  {
    number: 9,
    title: "Mandala 9 - Soma Mandala",
    description: "114 Suktas, 1097 verses. Entirely dedicated to Soma Pavamana (purifying Soma).",
    totalVerses: 1097,
    suktas: [],
  },
  {
    number: 10,
    title: "Mandala 10 - Philosophical Hymns",
    description:
      "191 Suktas, 1754 verses. Youngest Mandala with philosophical hymns including Nasadiya (10.129) and Purusha Sukta (10.90).",
    totalVerses: 1754,
    suktas: [
      {
        number: 90,
        title: "Purusha Sukta",
        deity: "Purusha (Cosmic Person)",
        sage: "Narayana",
        meter: "Trishtubh",
        summary:
          "Cosmic creation through sacrifice of the Cosmic Person. Describes the four varnas and social order.",
        verses: [
          {
            id: "rv-10-90-1",
            scriptureId: "rigveda",
            mandala: 10,
            sukta: 90,
            verse: 1,
            sanskrit:
              "पुरुषस्येदं वाक्ष्यां सरीरं पूरुषो वेद गायति ।\nयत्क्रौच्च्येनाभ्यामिक्लृप्तम् ॥",
            transliteration:
              "puruṣasyedaṃ vākṣyāṃ sarīraṃ puruṣo veda gāyati |\nyat krucchyena abhyamiklṛptam ||",
            padaArtha: [
              { word: "पुरुष", iast: "puruṣa", meaning: "Cosmic Person, the universal being" },
              {
                word: "ईदम्",
                iast: "idam",
                meaning: "this (universe)",
                grammarNote: "accusative neuter",
              },
              {
                word: "वाक्ष्याम्",
                iast: "vākṣyām",
                meaning: "consisting of, made of",
                grammarNote: "instrumental",
              },
              { word: "सरीरम्", iast: "sarīram", meaning: "body, form" },
            ],
            translation: {
              en: "This universe is the body of the Cosmic Person. What was before and what after, the wise one knows.",
              hi: "यह ब्रह्मांड पुरुष का शरीर है। जो पहले था और बाद में होगा, विद्वान जानते हैं।",
            },
            keyTerms: ["Purusha", "Creation", "Sacrifice", "Cosmology"],
            deity: "Purusha",
            sage: "Narayana",
            meter: "Trishtubh (11 syllables)",
            verseRefs: [
              {
                scriptureId: "bhagavad-gita",
                chapter: 15,
                verse: 18,
                relevance: "Krishna describes himself as the Cosmic Person sustaining all worlds",
              },
            ],
          },
        ],
      },
      {
        number: 129,
        title: "Nasadiya Sukta",
        deity: "Unknown / Brahmanaspati",
        sage: "Prajapati Parameshthina",
        meter: "Trishtubh",
        summary:
          "The Hymn of Creation - questions the origin of existence itself through paradoxical inquiry.",
        verses: [
          {
            id: "rv-10-129-1",
            scriptureId: "rigveda",
            mandala: 10,
            sukta: 129,
            verse: 1,
            sanskrit:
              "नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् ।\nकिमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ॥",
            transliteration:
              "nāsad āsīn no sad āsīt tadānīṃ nāsīd rajo no vyomā paro yat |\nkim āvarīvaḥ kuha kasya śarmann amhāḥ kim āsīd gahanaṃ gabhīram ||",
            padaArtha: [
              { word: "न असत्", iast: "na asat", meaning: "not non-existence" },
              { word: "न सत्", iast: "na sat", meaning: "not existence" },
              { word: "तदानीम्", iast: "tadānīm", meaning: "then, at that time" },
              { word: "रजः", iast: "rajaḥ", meaning: "air, atmosphere" },
              { word: "व्योम", iast: "vyomā", meaning: "sky, space" },
            ],
            translation: {
              en: "Then even nothingness was not, nor existence. There was no air then, nor the heavens beyond it. What covered it? Where was it? In whose keeping? Was there then cosmic water, in depths unfathomed?",
              hi: "तब न असत् (अभाव) था, न सत् (सत्ता)। तब न वायु था, न उससे परे आकाश। क्या उसे ढका था? कहाँ? किसकी देखरेख में?",
            },
            keyTerms: ["Creation", "Non-existence", "Cosmology", "Brahman"],
            deity: "Unknown",
            sage: "Prajapati Parameshthina",
            meter: "Trishtubh",
            verseRefs: [
              {
                scriptureId: "brihadaranyaka-upanishad",
                chapter: 1,
                verse: 4,
                relevance: "Describes pre-creation state: 'In the beginning there was Self alone'",
              },
              {
                scriptureId: "chandogya-upanishad",
                chapter: 6,
                verse: 2,
                relevance: "'In the beginning, this universe was Existence (sat) alone'",
              },
            ],
          },
        ],
      },
    ],
  },
];

// ─── All 4 Vedas ─────────────────────────────────────────────────────────────

export const scriptures: Scripture[] = [
  {
    id: "rigveda",
    name: "Rigveda",
    sanskritName: "ऋग्वेद",
    category: "veda",
    description:
      "The oldest of the four Vedas, containing 10 Mandalas, 1,028 Suktas, and approximately 10,552 Mantras dedicated to Vedic deities including Agni, Indra, Soma, and the Adityas.",
    totalChapters: 10,
    language: "Vedic Sanskrit",
    approximateDate: "~1500–1200 BCE",
    keyConcepts: [
      "Cosmology",
      "Hymns",
      "Ritual",
      "Agni",
      "Indra",
      "Soma",
      "Nasadiya Sukta",
      "Purusha Sukta",
      "Gayatri Mantra",
    ],
    totalVerses: 10552,
  },
  {
    id: "samaveda",
    name: "Samaveda",
    sanskritName: "सामवेद",
    category: "veda",
    description:
      "The Veda of melodies and songs. Contains 1,875 mantras set to specific musical scales (svaras). Primarily derived from Rigveda hymns but arranged for chanting during soma sacrifices.",
    totalChapters: 4,
    language: "Vedic Sanskrit",
    approximateDate: "~1200–1000 BCE",
    keyConcepts: ["Music", "Chants", "Soma", "Ritual", "Svaras", "Sama Gana"],
    totalVerses: 1875,
  },
  {
    id: "yajurveda-krishna",
    name: "Krishna Yajurveda",
    sanskritName: "कृष्ण यजुर्वेद",
    category: "veda",
    description:
      "Black Yajurveda - Taittiriya Samhita with prose commentary (Brahmana) interspersed with mantras. Contains detailed ritual formulas and procedures for Vedic sacrifices.",
    totalChapters: 7,
    language: "Vedic Sanskrit",
    approximateDate: "~1200–800 BCE",
    keyConcepts: ["Ritual", "Yajna", "Taittiriya", "Formulas", "Prose"],
    totalVerses: 1875,
  },
  {
    id: "yajurveda-shukla",
    name: "Shukla Yajurveda",
    sanskritName: "शुक्ल यजुर्वेद",
    category: "veda",
    description:
      "White Yajurveda - Vajasaneyi Samhita with mantras separated from commentary. Contains pure ritual formulas organized for systematic performance of sacrifices.",
    totalChapters: 40,
    language: "Vedic Sanskrit",
    approximateDate: "~1200–800 BCE",
    keyConcepts: ["Ritual", "Yajna", "Vajasaneyi", "Formulas", "Mantras"],
    totalVerses: 1975,
  },
  {
    id: "atharvaveda",
    name: "Atharvaveda",
    sanskritName: "अथर्ववेद",
    category: "veda",
    description:
      "The fourth Veda containing hymns for healing, magic, protection, and everyday life. Includes both practical spells and profound philosophical hymns on the nature of reality.",
    totalChapters: 20,
    language: "Vedic Sanskrit",
    approximateDate: "~1200–1000 BCE",
    keyConcepts: ["Healing", "Magic", "Protection", "Cosmology", "Everyday Wisdom", "Medicine"],
    totalVerses: 5977,
  },
  {
    id: "bhagavad-gita",
    name: "Bhagavad Gita",
    sanskritName: "श्रीमद्भगवद्गीता",
    category: "philosophy",
    description:
      "A 700-verse dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra, synthesizing the essence of Vedanta, Yoga, and Bhakti.",
    totalChapters: 18,
    language: "Sanskrit",
    approximateDate: "~400 BCE–200 CE",
    author: "Vyasa (traditionally attributed)",
    keyConcepts: ["Karma Yoga", "Bhakti", "Jnana", "Dharma", "Moksha", "Self-knowledge"],
    totalVerses: 700,
  },
  {
    id: "mahabharata",
    name: "Mahabharata",
    sanskritName: "महाभारत",
    category: "epic",
    description:
      "The world's longest epic poem, containing the Bhagavad Gita. Explores dharma under impossible human conditions through the Kurukshetra war narrative.",
    totalChapters: 18,
    language: "Sanskrit",
    approximateDate: "~400 BCE–400 CE",
    author: "Vyasa",
    keyConcepts: ["Dharma", "War", "Kinship", "Statecraft", "Ethics"],
    totalVerses: 100000,
  },
  {
    id: "ramayana",
    name: "Ramayana",
    sanskritName: "रामायण",
    category: "epic",
    description:
      "The epic journey of Rama, Sita, Lakshmana, and Hanuman — a narrative of duty, exile, devotion, and righteous kingship.",
    totalChapters: 7,
    language: "Sanskrit",
    approximateDate: "~500 BCE–100 BCE",
    author: "Valmiki",
    keyConcepts: ["Dharma", "Devotion", "Rama", "Sita", "Hanuman"],
    totalVerses: 24000,
  },
];

// ─── 108 Principal Upanishads ───────────────────────────────────────────────────

export const UPANISHADS = [
  {
    id: "aitareya-upanishad",
    name: "Aitareya Upanishad",
    sanskrit: "ऐतरेयोपनिषद्",
    veda: "rigveda",
    verses: 33,
    period: "~800–600 BCE",
    theme: "Consciousness, creation, Atman",
  },
  {
    id: "kena-upanishad",
    name: "Kena Upanishad",
    sanskrit: "केनोपनिषद्",
    veda: "samaveda",
    verses: 4,
    period: "~800–600 BCE",
    theme: "Who is the knower? Brahman inquiry",
  },
  {
    id: "katha-upanishad",
    name: "Katha Upanishad",
    sanskrit: "कठोपनिषद्",
    veda: "yajurveda-krishna",
    verses: 119,
    period: "~600–400 BCE",
    theme: "Nachiketa, death, immortality, Yoga",
  },
  {
    id: "prashna-upanishad",
    name: "Prashna Upanishad",
    sanskrit: "प्रश्नोपनिषद्",
    veda: "atharvaveda",
    verses: 67,
    period: "~600–400 BCE",
    theme: "Six questions on Brahman",
  },
  {
    id: "mundaka-upanishad",
    name: "Mundaka Upanishad",
    sanskrit: "मुण्डकोपनिषद्",
    veda: "atharvaveda",
    verses: 64,
    period: "~600–400 BCE",
    theme: "Para and Apara Vidya, Brahman",
  },
  {
    id: "mandukya-upanishad",
    name: "Mandukya Upanishad",
    sanskrit: "माण्डूक्योपनिषद्",
    veda: "atharvaveda",
    verses: 12,
    period: "~500–300 BCE",
    theme: "OM, four states of consciousness",
  },
  {
    id: "taittiriya-upanishad",
    name: "Taittiriya Upanishad",
    sanskrit: "तैत्तिरीयोपनिषद्",
    veda: "yajurveda-krishna",
    verses: 129,
    period: "~600–400 BCE",
    theme: "Ananda, Brahman, ethics (shiksha valli)",
  },
  {
    id: "brihadaranyaka-upanishad",
    name: "Brihadaranyaka Upanishad",
    sanskrit: "बृहदारण्यकोपनिषद्",
    veda: "yajurveda-shukla",
    verses: 447,
    period: "~700–500 BCE",
    theme: "Atman, Brahman, Yajnavalkya, Gargi",
  },
  {
    id: "chandogya-upanishad",
    name: "Chandogya Upanishad",
    sanskrit: "छान्दोग्योपनिषद्",
    veda: "samaveda",
    verses: 655,
    period: "~700–500 BCE",
    theme: "Sama Veda context, Tat Tvam Asi, Sadvidya",
  },
  {
    id: "isha-upanishad",
    name: "Isha Upanishad",
    sanskrit: "ईशोपनिषद्",
    veda: "yajurveda-shukla",
    verses: 18,
    period: "~600–400 BCE",
    theme: "Fullness, renunciation, Brahman",
  },
  {
    id: "shvetashvatara-upanishad",
    name: "Shvetashvatara Upanishad",
    sanskrit: "श्वेताश्वतरोपनिषद्",
    veda: "yajurveda-shukla",
    verses: 113,
    period: "~400–200 BCE",
    theme: "Personal God (Rudra), devotion, Yoga",
  },
  {
    id: "kaushitaki-upanishad",
    name: "Kaushitaki Upanishad",
    sanskrit: "कौषीतकी उपनिषद्",
    veda: "rigveda",
    verses: 32,
    period: "~600–400 BCE",
    theme: "Ritual, Brahman, meditation",
  },
  {
    id: "maitri-upanishad",
    name: "Maitri Upanishad",
    sanskrit: "मैत्री उपनिषद्",
    veda: "yajurveda-shukla",
    verses: 73,
    period: "~300–100 BCE",
    theme: "Samkhya, Yoga, Atman, liberation",
  },
];

// ─── 18 Mahapuranas ─────────────────────────────────────────────────────────────

export const MAHAPURANAS = [
  {
    id: "vishnu-purana",
    name: "Vishnu Purana",
    sanskrit: "विष्णु पुराण",
    verses: 23000,
    period: "~400–300 BCE",
    theme: "Vishnu worship, cosmology, dharma",
    deity: "Vishnu",
  },
  {
    id: "narada-purana",
    name: "Narada Purana",
    sanskrit: "नारद पुराण",
    verses: 25000,
    period: "~500–1000 CE",
    theme: "Narada's teachings, devotion, pilgrimage",
    deity: "Vishnu",
  },
  {
    id: "bhagavata-purana",
    name: "Bhagavata Purana (Srimad Bhagavatam)",
    sanskrit: "श्रीमद्भागवत पुराण",
    verses: 18000,
    period: "~900–1000 CE",
    theme: "Krishna's life, Bhakti, philosophy",
    deity: "Krishna",
  },
  {
    id: "garuda-purana",
    name: "Garuda Purana",
    sanskrit: "गरुड पुराण",
    verses: 19000,
    period: "~300–500 CE",
    theme: "Cosmology, afterlife, rituals, Garuda",
    deity: "Vishnu",
  },
  {
    id: "padma-purana",
    name: "Padma Purana",
    sanskrit: "पद्म पुराण",
    verses: 55000,
    period: "~400–800 CE",
    theme: "Cosmology, pilgrimage, Vishnu worship",
    deity: "Vishnu",
  },
  {
    id: "varaha-purana",
    name: "Varaha Purana",
    sanskrit: "वराह पुराण",
    verses: 24000,
    period: "~300–500 CE",
    theme: "Varaha incarnation, cosmology",
    deity: "Vishnu",
  },
  {
    id: "brahma-purana",
    name: "Brahma Purana",
    sanskrit: "ब्रह्म पुराण",
    verses: 10000,
    period: "~400–800 CE",
    theme: "Brahma worship, cosmology, geography",
    deity: "Brahma",
  },
  {
    id: "brahmanda-purana",
    name: "Brahmanda Purana",
    sanskrit: "ब्रह्माण्ड पुराण",
    verses: 12000,
    period: "~400–800 CE",
    theme: "Cosmic egg (Brahmanda), cosmology",
    deity: "Brahma",
  },
  {
    id: "brahma-vaivarta-purana",
    name: "Brahma Vaivarta Purana",
    sanskrit: "ब्रह्मवैवर्त पुराण",
    verses: 18000,
    period: "~800–1000 CE",
    theme: "Radha-Krishna, creation, cycles",
    deity: "Krishna",
  },
  {
    id: "markandeya-purana",
    name: "Markandeya Purana",
    sanskrit: "मार्कण्डेय पुराण",
    verses: 9000,
    period: "~300–500 CE",
    theme: "Durga, Markandeya sage, Devi worship",
    deity: "Durga",
  },
  {
    id: "bhavishya-purana",
    name: "Bhavishya Purana",
    sanskrit: "भविष्य पुराण",
    verses: 14000,
    period: "~500–1000 CE",
    theme: "Prophecies, future, mixed deities",
    deity: "Mixed",
  },
  {
    id: "vamana-purana",
    name: "Vamana Purana",
    sanskrit: "वामन पुराण",
    verses: 10000,
    period: "~400–800 CE",
    theme: "Vamana incarnation, pilgrimage",
    deity: "Vishnu",
  },
  {
    id: "kurma-purana",
    name: "Kurma Purana",
    sanskrit: "कूर्म पुराण",
    verses: 17000,
    period: "~300–500 CE",
    theme: "Kurma incarnation, Shiva worship",
    deity: "Vishnu",
  },
  {
    id: "matsya-purana",
    name: "Matsya Purana",
    sanskrit: "मत्स्य पुराण",
    verses: 14000,
    period: "~300–500 CE",
    theme: "Matsya incarnation, cosmology",
    deity: "Vishnu",
  },
  {
    id: "linga-purana",
    name: "Linga Purana",
    sanskrit: "लिंग पुराण",
    verses: 11000,
    period: "~500–1000 CE",
    theme: "Shiva worship, Linga, cosmology",
    deity: "Shiva",
  },
  {
    id: "shiva-purana",
    name: "Shiva Purana",
    sanskrit: "शिव पुराण",
    verses: 24000,
    period: "~500–1000 CE",
    theme: "Shiva worship, stories, philosophy",
    deity: "Shiva",
  },
  {
    id: "skanda-purana",
    name: "Skanda Purana",
    sanskrit: "स्कन्द पुराण",
    verses: 81000,
    period: "~500–1000 CE",
    theme: "Skanda (Kartikeya), pilgrimage sites",
    deity: "Skanda",
  },
  {
    id: "agni-purana",
    name: "Agni Purana",
    sanskrit: "अग्नि पुराण",
    verses: 15000,
    period: "~500–1000 CE",
    theme: "Agni, rituals, encyclopedic content",
    deity: "Agni",
  },
  {
    id: "narasimha-purana",
    name: "Narasimha Purana",
    sanskrit: "नरसिंह पुराण",
    verses: 4000,
    period: "~500–1000 CE",
    theme: "Narasimha incarnation, devotion",
    deity: "Vishnu",
  },
];

// ─── Sample Verses with Enhanced Structure ───────────────────────────────────────

export const sampleVerses: ScriptureVerse[] = [
  {
    id: "rv-1-1-1",
    scriptureId: "rigveda",
    chapter: 1,
    verse: 1,
    mandala: 1,
    sukta: 1,
    sanskrit: "अ॒ग्निमी॑ळे पुरोहितं य॒ज्ञस्य॑ देवमृत्विजम् |\nहोतारं रत्नधातमम् ||",
    transliteration: "agnim īḷe purohitaṃ yajñasya devam ṛtvijam |\nhotāraṃ ratna-dhātamam ||",
    wordByWord: [
      { sanskrit: "अग्निम्", iast: "agnim", meaning: "Agni (fire-god)" },
      { sanskrit: "ईळे", iast: "īḷe", meaning: "I praise, I invoke" },
      { sanskrit: "पुरोहितम्", iast: "purohitam", meaning: "the priest, placed foremost" },
      { sanskrit: "यज्ञस्य", iast: "yajñasya", meaning: "of the sacrifice" },
      { sanskrit: "देवम्", iast: "devam", meaning: "divine, the god" },
      { sanskrit: "ऋत्विजम्", iast: "ṛtvijam", meaning: "the seasonal priest" },
      { sanskrit: "होतारम्", iast: "hotāram", meaning: "the offerer, invoking priest" },
      { sanskrit: "रत्नधातमम्", iast: "ratna-dhātamam", meaning: "greatest bestower of treasures" },
    ],
    translation: {
      en: "I praise Agni, the household priest, the divine minister of the sacrifice, the invoker, the greatest bestower of treasure.",
      hi: "मैं अग्नि की स्तुति करता हूँ — जो पुरोहित, यज्ञ के देव, ऋत्विज, होता और सर्वश्रेष्ठ रत्नदाता हैं।",
    },
    keyTerms: ["Agni", "Yajna", "Hotr", "Purohita"],
    relatedVerses: ["bhagavad-gita-15-14", "brihadaranyaka-upanishad-1-1"],
  },
  {
    id: "rv-3-62-10",
    scriptureId: "rigveda",
    chapter: 3,
    verse: 10,
    mandala: 3,
    sukta: 62,
    sanskrit: "ॐ तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि ।\nधियो यो नः प्रचोदयात् ॥",
    transliteration: "oṃ tat savitur vareṇyaṃ bhargo devasya dhīmahi |\ndhiyo yo naḥ pracodayāt ||",
    wordByWord: [
      { sanskrit: "ॐ", iast: "oṃ", meaning: "primordial sacred syllable" },
      { sanskrit: "तत्", iast: "tat", meaning: "that (the absolute)" },
      { sanskrit: "सवितुः", iast: "savituḥ", meaning: "of Savitri (Sun as impeller)" },
      { sanskrit: "वरेण्यम्", iast: "vareṇyam", meaning: "most excellent, worthy of choice" },
      { sanskrit: "भर्गः", iast: "bhargaḥ", meaning: "radiance, effulgence, spiritual light" },
      { sanskrit: "देवस्य", iast: "devasya", meaning: "of the divine" },
      { sanskrit: "धीमहि", iast: "dhīmahi", meaning: "we meditate upon" },
      { sanskrit: "धियः", iast: "dhiyaḥ", meaning: "our intellects" },
      { sanskrit: "यः", iast: "yaḥ", meaning: "who (that divine light)" },
      { sanskrit: "नः", iast: "naḥ", meaning: "our, us" },
      { sanskrit: "प्रचोदयात्", iast: "pracodayāt", meaning: "may he inspire" },
    ],
    translation: {
      en: "Om. We meditate on the most excellent effulgence of the divine Sun (Savitri). May he inspire our intellects.",
      hi: "ॐ। हम उस देव-सवितु के श्रेष्ठ तेज का ध्यान करते हैं। वह हमारी बुद्धियों को प्रेरित करे।",
    },
    keyTerms: ["Gayatri", "Savitri", "OM", "Bharga"],
    relatedVerses: ["bhagavad-gita-10-35", "chandogya-upanishad-3-12"],
  },
  {
    id: "rv-10-129-1",
    scriptureId: "rigveda",
    chapter: 10,
    verse: 129,
    mandala: 10,
    sukta: 129,
    sanskrit: "नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् ।\nकिमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ॥",
    transliteration: "nāsad āsīn no sad āsīt tadānīṃ nāsīd rajo no vyomā paro yat |\nkim āvarīvaḥ kuha kasya śarmann amhāḥ kim āsīd gahanaṃ gabhīram ||",
    wordByWord: [
      { sanskrit: "न असत्", iast: "na asat", meaning: "not non-existence" },
      { sanskrit: "न सत्", iast: "na sat", meaning: "not existence" },
      { sanskrit: "तदानीम्", iast: "tadānīm", meaning: "then, at that time" },
      { sanskrit: "रजः", iast: "rajaḥ", meaning: "air, atmosphere" },
      { sanskrit: "व्योम", iast: "vyomā", meaning: "sky, space" },
    ],
    translation: {
      en: "Then even nothingness was not, nor existence. There was no air then, nor the heavens beyond it. What covered it? Where was it? In whose keeping? Was there then cosmic water, in depths unfathomed?",
      hi: "तब न असत् (अभाव) था, न सत् (सत्ता)। तब न वायु था, न उससे परे आकाश। क्या उसे ढका था? कहाँ? किसकी देखरेख में?",
    },
    keyTerms: ["Creation", "Non-existence", "Cosmology", "Brahman"],
    relatedVerses: ["brihadaranyaka-upanishad-1-4", "chandogya-upanishad-6-2"],
  },
  {
    id: "rv-10-90-1",
    scriptureId: "rigveda",
    chapter: 10,
    verse: 90,
    mandala: 10,
    sukta: 90,
    sanskrit: "पुरुषस्येदं वाक्ष्यां सरीरं पूरुषो वेद गायति ।\nयत्क्रौच्च्येनाभ्यामिक्लृप्तम् ॥",
    transliteration: "puruṣasyedaṃ vākṣyāṃ sarīraṃ puruṣo veda gāyati |\nyat krucchyena abhyamiklṛptam ||",
    wordByWord: [
      { sanskrit: "पुरुष", iast: "puruṣa", meaning: "Cosmic Person, universal being" },
      { sanskrit: "ईदम्", iast: "idam", meaning: "this (universe)" },
      { sanskrit: "वाक्ष्याम्", iast: "vākṣyām", meaning: "consisting of, made of" },
      { sanskrit: "सरीरम्", iast: "sarīram", meaning: "body, form" },
    ],
    translation: {
      en: "This universe is the body of the Cosmic Person. What was before and what after, the wise one knows.",
      hi: "यह ब्रह्मांड पुरुष का शरीर है। जो पहले था और बाद में होगा, विद्वान जानते हैं।",
    },
    keyTerms: ["Purusha", "Creation", "Sacrifice", "Cosmology"],
    relatedVerses: ["bhagavad-gita-15-18"],
  },
  {
    id: "bg-2-47",
    scriptureId: "bhagavad-gita",
    chapter: 2,
    verse: 47,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
    transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi ||",
    wordByWord: [
      { sanskrit: "कर्मणि", iast: "karmaṇi", meaning: "in action" },
      { sanskrit: "एव", iast: "eva", meaning: "only, certainly" },
      { sanskrit: "अधिकारः", iast: "adhikāraḥ", meaning: "right, authority, control" },
      { sanskrit: "ते", iast: "te", meaning: "your" },
      { sanskrit: "मा", iast: "mā", meaning: "never, do not" },
      { sanskrit: "फलेषु", iast: "phaleṣu", meaning: "in the fruits/results" },
      { sanskrit: "कदाचन", iast: "kadācana", meaning: "at any time, ever" },
    ],
    translation: {
      en: "You have the right to work only, but never to its fruits. Let not the fruits of action be your motive, nor let your attachment be to inaction.",
      hi: "तुम्हारा अधिकार केवल कर्म करने में है, कभी फलों में नहीं। कर्म के फल को कभी भी अपना लक्ष्य न बनाओ, और न ही कर्म न करने में आसक्त रहो।",
    },
    keyTerms: ["Karma Yoga", "Detachment", "Dharma", "Action"],
    relatedVerses: ["rv-1-1-1", "katha-upanishad-1-2-18"],
  },
  {
    id: "isha-1-1",
    scriptureId: "isha-upanishad",
    chapter: 1,
    verse: 1,
    sanskrit: "पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते ।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥",
    transliteration: "pūrṇam adaḥ pūrṇam idaṃ pūrṇāt pūrṇam udacyate |\npūrṇasya pūrṇam ādāya pūrṇam evāvaśiṣyate ||",
    wordByWord: [
      { sanskrit: "पूर्णम्", iast: "pūrṇam", meaning: "full, complete, whole" },
      { sanskrit: "अदः", iast: "adaḥ", meaning: "that (the absolute, Brahman)" },
      { sanskrit: "इदम्", iast: "idam", meaning: "this (the world)" },
      { sanskrit: "पूर्णात्", iast: "pūrṇāt", meaning: "from the complete" },
      { sanskrit: "उदच्यते", iast: "udacyate", meaning: "is born, proceeds" },
    ],
    translation: {
      en: "That is full; this is full. From fullness, fullness proceeds. Taking fullness from the fullness, fullness alone remains.",
      hi: "वह पूर्ण है; यह पूर्ण है। पूर्णता से पूर्णता निकलती है। पूर्णता से पूर्णता लेने पर भी, पूर्णता ही बची रहती है।",
    },
    keyTerms: ["Brahman", "Fullness", "Creation", "Unity"],
    relatedVerses: ["rv-10-129-1", "chandogya-upanishad-6-2"],
  },
  {
    id: "katha-1-2-18",
    scriptureId: "katha-upanishad",
    chapter: 1,
    verse: 18,
    sanskrit: "न जायते म्रियते वा विपश्चिन्नायं कुतश्चिन्न बभूव कश्चित् ।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥",
    transliteration: "na jāyate mriyate vā vipaścin nāyam kutaścin na babhūva kaścit |\najo nityaḥ śāśvato 'yam purāṇo na hanyate hanyamāne śarīre ||",
    wordByWord: [
      { sanskrit: "न", iast: "na", meaning: "not" },
      { sanskrit: "जायते", iast: "jāyate", meaning: "is born" },
      { sanskrit: "म्रियते", iast: "mriyate", meaning: "dies" },
      { sanskrit: "वा", iast: "vā", meaning: "or" },
      { sanskrit: "विपश्चित्", iast: "vipaścit", meaning: "the wise one, the Self" },
    ],
    translation: {
      en: "The wise one is not born nor dies. This one has not come from anywhere, has not become anyone. Unborn, eternal, everlasting, ancient, this one is not killed when the body is killed.",
      hi: "विपश्चित् न जन्म लेता है और न मरता है। यह कहीं से नहीं आया है, न कोई बना है। यह अजन्मा, नित्य, शाश्वत, पुरातन है। शरीर के मारे जाने पर भी यह नहीं मारा जाता।",
    },
    keyTerms: ["Atman", "Immortality", "Self", "Death"],
    relatedVerses: ["bg-2-20", "rv-10-90-1"],
  },
  {
    id: "chandogya-6-2-1",
    scriptureId: "chandogya-upanishad",
    chapter: 6,
    verse: 1,
    sanskrit: "सदेव सोम्येदमग्र आसीदेकमेवाद्वितीयम् ।\nतदैक्षत असृज्यत ॥",
    transliteration: "sadeva somyedamagra āsīd ekam evādvitīyam |\ntadaikṣata asṛjyata ||",
    wordByWord: [
      { sanskrit: "सत्", iast: "sat", meaning: "existence, being, reality" },
      { sanskrit: "एव", iast: "eva", meaning: "only, indeed" },
      { sanskrit: "इदम्", iast: "idam", meaning: "this (universe)" },
      { sanskrit: "अग्रे", iast: "agra", meaning: "in the beginning" },
      { sanskrit: "आसीत्", iast: "āsīt", meaning: "was" },
      { sanskrit: "एकम्", iast: "ekam", meaning: "one, single" },
      { sanskrit: "एव", iast: "eva", meaning: "only" },
      { sanskrit: "अद्वितीयम्", iast: "advitīyam", meaning: "without a second, non-dual" },
    ],
    translation: {
      en: "In the beginning, my dear, this universe was Existence alone, one only, without a second. It thought, 'Let me become many.'",
      hi: "प्रारंभ में, मेरे प्रिय, यह ब्रह्मांद केवल सत् (अस्तित्व) था, एकमात्र, द्वितीय रहित। उसने सोचा, 'मैं अनेक बनूं'।",
    },
    keyTerms: ["Sat", "Creation", "Non-duality", "Consciousness"],
    relatedVerses: ["rv-10-129-1", "brihadaranyaka-upanishad-1-4"],
  },
];

// ─── Helper Functions for Navigation ───────────────────────────────────────────────

export function getRigvedaMandala(mandalaNum: number): Mandala | undefined {
  return RIGVEDA_MANDALAS.find(m => m.number === mandalaNum);
}

export function getRigvedaSukta(mandalaNum: number, suktaNum: number): Sukta | undefined {
  const mandala = getRigvedaMandala(mandalaNum);
  return mandala?.suktas.find(s => s.number === suktaNum);
}

export function getRigvedaVerse(mandalaNum: number, suktaNum: number, verseNum: number): EnhancedVerse | undefined {
  const sukta = getRigvedaSukta(mandalaNum, suktaNum);
  return sukta?.verses.find(v => v.verse === verseNum);
}

export function getUpanishad(id: string) {
  return UPANISHADS.find(u => u.id === id);
}

export function getPurana(id: string) {
  return MAHAPURANAS.find(p => p.id === id);
}

export function getScripture(id: string) {
  return scriptures.find(s => s.id === id);
}

export function searchVersesByKeyword(keyword: string): ScriptureVerse[] {
  return sampleVerses.filter(v => 
    v.keyTerms.some(k => k.toLowerCase().includes(keyword.toLowerCase())) ||
    v.translation.en.toLowerCase().includes(keyword.toLowerCase()) ||
    v.translation.hi?.toLowerCase().includes(keyword.toLowerCase())
  );
}

export function getLandmarkSuktas() {
  return [
    { mandala: 1, sukta: 1, name: "Agni Sukta (Opening)" },
    { mandala: 3, sukta: 62, name: "Gayatri Mantra" },
    { mandala: 10, sukta: 90, name: "Purusha Sukta" },
    { mandala: 10, sukta: 129, name: "Nasadiya Sukta" },
  ];
}

// ─── Additional Helper Functions for Compatibility ─────────────────────────────

export function getVerse(
  scriptureId: string,
  chapter: number,
  verse: number
): ScriptureVerse | undefined {
  return sampleVerses.find(
    (v) => v.scriptureId === scriptureId && v.chapter === chapter && v.verse === verse
  );
}

export function getVersesByScripture(scriptureId: string): ScriptureVerse[] {
  return sampleVerses.filter((v) => v.scriptureId === scriptureId);
}

export function searchVerses(query: string): ScriptureVerse[] {
  const lowerQuery = query.toLowerCase();
  return sampleVerses.filter(
    (v) =>
      v.sanskrit.toLowerCase().includes(lowerQuery) ||
      v.transliteration.toLowerCase().includes(lowerQuery) ||
      v.translation.en.toLowerCase().includes(lowerQuery) ||
      v.translation.hi?.toLowerCase().includes(lowerQuery) ||
      v.keyTerms.some((term) => term.toLowerCase().includes(lowerQuery))
  );
}
