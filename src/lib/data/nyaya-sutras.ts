// Nyaya Sutras - Gautama's Logic System
// The foundational text of Nyaya (Hindu logic) philosophy

export interface NyayaSutra {
  id: string;
  chapter: number;
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

export const NYAYA_SUTRAS: NyayaSutra[] = [
  // Chapter 1: Pratyaksha (Perception) - 40 sutras
  {
    id: "1-1",
    chapter: 1,
    sutra: 1,
    sanskrit: "अतः तत्त्वज्ञाननिर्वाणाय धर्मस्य |",
    transliteration: "ataḥ tattvajñānanirvāṇāya dharmasya |",
    translation: "Therefore, the study of truth is for the liberation of the soul.",
    wordByWord: [
      { sanskrit: "अतः", transliteration: "ataḥ", meaning: "therefore" },
      { sanskrit: "तत्त्व", transliteration: "tattva", meaning: "truth" },
      { sanskrit: "ज्ञान", transliteration: "jñāna", meaning: "knowledge" },
      { sanskrit: "निर्वाणाय", transliteration: "nirvāṇāya", meaning: "for liberation" },
      { sanskrit: "धर्मस्य", transliteration: "dharmasya", meaning: "of dharma" },
    ],
    keyConcepts: ["Tattva", "Jnana", "Nirvana", "Dharma"],
  },
  {
    id: "1-2",
    chapter: 1,
    sutra: 2,
    sanskrit: "प्रमाणप्रमेयवाक्यसमयानयान्वयातर्कसंशयोपयोगवादजवादानुमानागमाभावाः प्रमाणानि |",
    transliteration:
      "pramāṇa-prameya-vākya-samaya-nyāya-anvaya-tarka-saṃśaya-upayoga-vāda-javāda-anumāna-āgamābhāvāḥ pramāṇāni |",
    translation:
      "Perception, inference, comparison, testimony, postulation, application, discussion, refutation, cavil, and fallacy are the means of valid knowledge.",
    wordByWord: [
      { sanskrit: "प्रमाण", transliteration: "pramāṇa", meaning: "perception" },
      { sanskrit: "प्रमेय", transliteration: "prameya", meaning: "inference" },
      { sanskrit: "वाक्य", transliteration: "vākya", meaning: "comparison" },
      { sanskrit: "समय", transliteration: "samaya", meaning: "testimony" },
      { sanskrit: "न्याय", transliteration: "nyāya", meaning: "postulation" },
      { sanskrit: "अन्वय", transliteration: "anvaya", meaning: "application" },
      { sanskrit: "तर्क", transliteration: "tarka", meaning: "discussion" },
      { sanskrit: "संशय", transliteration: "saṃśaya", meaning: "doubt" },
      { sanskrit: "उपयोग", transliteration: "upayoga", meaning: "purpose" },
      { sanskrit: "वाद", transliteration: "vāda", meaning: "disputation" },
      { sanskrit: "जवाद", transliteration: "javāda", meaning: "cavil" },
      { sanskrit: "अनुमान", transliteration: "anumāna", meaning: "inference" },
      { sanskrit: "आगम", transliteration: "āgama", meaning: "testimony" },
      { sanskrit: "अभावाः", transliteration: "abhāvāḥ", meaning: "absence" },
      { sanskrit: "प्रमाणानि", transliteration: "pramāṇāni", meaning: "means of knowledge" },
    ],
    keyConcepts: ["Pramana", "Prameya", "Vakya", "Samaya", "Nyaya", "Anvaya", "Tarka", "Samsaya"],
  },
  {
    id: "1-3",
    chapter: 1,
    sutra: 3,
    sanskrit: "इन्द्रियार्थसन्निकर्षोप्युदयाभावविशेषानुवित्तो दृष्टम् |",
    transliteration: "indriyārthasannikarṣopyudayābhāvaviśeṣānuvitto dṛṣṭam |",
    translation:
      "Perception is the contact of sense organs with objects, not contradicted by other means of knowledge.",
    wordByWord: [
      { sanskrit: "इन्द्रिय", transliteration: "indriya", meaning: "sense organ" },
      { sanskrit: "अर्थ", transliteration: "artha", meaning: "object" },
      { sanskrit: "सन्निकर्ष", transliteration: "sannikarṣa", meaning: "contact" },
      { sanskrit: "उपि", transliteration: "upi", meaning: "also" },
      { sanskrit: "उदय", transliteration: "udaya", meaning: "arising" },
      { sanskrit: "अभाव", transliteration: "abhāva", meaning: "absence" },
      { sanskrit: "विशेष", transliteration: "viśeṣa", meaning: "distinction" },
      { sanskrit: "अनुवित्तः", transliteration: "anuvittaḥ", meaning: "not contradicted" },
      { sanskrit: "दृष्टम्", transliteration: "dṛṣṭam", meaning: "perception" },
    ],
    keyConcepts: ["Indriya", "Artha", "Sannikarsha", "Drishta"],
  },
  {
    id: "1-4",
    chapter: 1,
    sutra: 4,
    sanskrit: "तद्विशेषानुवित्तोऽनुमानम् |",
    transliteration: "tadviśeṣānuvitto'numānam |",
    translation: "Inference is based on the presence of specific characteristics.",
    wordByWord: [
      { sanskrit: "तत्", transliteration: "tat", meaning: "that" },
      { sanskrit: "विशेष", transliteration: "viśeṣa", meaning: "characteristic" },
      { sanskrit: "अनुवित्तः", transliteration: "anuvittaḥ", meaning: "based on" },
      { sanskrit: "अनुमानम्", transliteration: "anumānam", meaning: "inference" },
    ],
    keyConcepts: ["Vishesha", "Anumana"],
  },
  {
    id: "1-5",
    chapter: 1,
    sutra: 5,
    sanskrit: "प्रत्यक्षं तर्कानुमानागमाभ्याम् अनुमानम् |",
    transliteration: "pratyakṣaṃ tarkānumānāgamābhyām anumānam |",
    translation: "Inference is based on perception, reasoning, and testimony.",
    wordByWord: [
      { sanskrit: "प्रत्यक्षम्", transliteration: "pratyakṣam", meaning: "perception" },
      { sanskrit: "तर्क", transliteration: "tarka", meaning: "reasoning" },
      { sanskrit: "अनुमान", transliteration: "anumāna", meaning: "inference" },
      { sanskrit: "आगम", transliteration: "āgama", meaning: "testimony" },
      { sanskrit: "अभ्याम्", transliteration: "abhyām", meaning: "from" },
      { sanskrit: "अनुमानम्", transliteration: "anumānam", meaning: "inference" },
    ],
    keyConcepts: ["Pratyaksha", "Tarka", "Anumana", "Agama"],
  },

  // Chapter 2: Prameya (Objects of Knowledge) - 68 sutras
  {
    id: "2-1",
    chapter: 2,
    sutra: 1,
    sanskrit: "आत्मशरीरेन्द्रियार्थेषु बुद्धिसंज्ञाप्रयत्नदोषप्रेत्यक्षेषु दुःखजन्ममृत्याः |",
    transliteration:
      "ātma-śarīrendriyārtheṣu buddhi-saṃjñā-prayatna-doṣa-pretyakṣeṣu duḥkha-janma-mṛtyāḥ |",
    translation:
      "Self, body, senses, objects, intellect, consciousness, effort, faults, results, suffering, birth, and death are the objects of knowledge.",
    wordByWord: [
      { sanskrit: "आत्मा", transliteration: "ātmā", meaning: "self" },
      { sanskrit: "शरीर", transliteration: "śarīra", meaning: "body" },
      { sanskrit: "इन्द्रिय", transliteration: "indriya", meaning: "senses" },
      { sanskrit: "अर्थ", transliteration: "artha", meaning: "objects" },
      { sanskrit: "बुद्धि", transliteration: "buddhi", meaning: "intellect" },
      { sanskrit: "संज्ञा", transliteration: "saṃjñā", meaning: "consciousness" },
      { sanskrit: "प्रयत्न", transliteration: "prayatna", meaning: "effort" },
      { sanskrit: "दोष", transliteration: "doṣa", meaning: "faults" },
      { sanskrit: "प्रेत्यक्ष", transliteration: "pretyakṣa", meaning: "results" },
      { sanskrit: "दुःख", transliteration: "duḥkha", meaning: "suffering" },
      { sanskrit: "जन्म", transliteration: "janma", meaning: "birth" },
      { sanskrit: "मृत्युः", transliteration: "mṛtyuḥ", meaning: "death" },
    ],
    keyConcepts: [
      "Atma",
      "Sharira",
      "Indriya",
      "Artha",
      "Buddhi",
      "Sangya",
      "Duhkha",
      "Janma",
      "Mrityu",
    ],
  },
  {
    id: "2-2",
    chapter: 2,
    sutra: 2,
    sanskrit: "आत्मा शरीराधिष्ठानम् |",
    transliteration: "ātmā śarīrādhiṣṭhānam |",
    translation: "The self is the abode of the body.",
    wordByWord: [
      { sanskrit: "आत्मा", transliteration: "ātmā", meaning: "self" },
      { sanskrit: "शरीर", transliteration: "śarīra", meaning: "body" },
      { sanskrit: "अधिष्ठानम्", transliteration: "adhiṣṭhānam", meaning: "abode" },
    ],
    keyConcepts: ["Atma", "Sharira", "Adhisthana"],
  },

  // Chapter 3: Vakya (Comparison) - 32 sutras
  {
    id: "3-1",
    chapter: 3,
    sutra: 1,
    sanskrit: "उपमानं तद्विशेषसमानेन अर्थेन अर्थज्ञानम् |",
    transliteration: "upamānaṃ tadviśeṣasamānena arthena arthajñānam |",
    translation:
      "Comparison is the knowledge of an object through its similarity with another object.",
    wordByWord: [
      { sanskrit: "उपमानम्", transliteration: "upamānam", meaning: "comparison" },
      { sanskrit: "तत्", transliteration: "tat", meaning: "that" },
      { sanskrit: "विशेष", transliteration: "viśeṣa", meaning: "similarity" },
      { sanskrit: "समानेन", transliteration: "samānena", meaning: "with similar" },
      { sanskrit: "अर्थेन", transliteration: "arthena", meaning: "with object" },
      { sanskrit: "अर्थज्ञानम्", transliteration: "arthajñānam", meaning: "knowledge of object" },
    ],
    keyConcepts: ["Upamana", "Vishesha", "Samana", "Artha"],
  },

  // Chapter 4: Samaya (Testimony) - 33 sutras
  {
    id: "4-1",
    chapter: 4,
    sutra: 1,
    sanskrit: "आप्तोपदेशः शब्दः |",
    transliteration: "āptopadeśaḥ śabdaḥ |",
    translation: "Testimony is the instruction of a trustworthy person.",
    wordByWord: [
      { sanskrit: "आप्त", transliteration: "āpta", meaning: "trustworthy" },
      { sanskrit: "उपदेशः", transliteration: "upadeśaḥ", meaning: "instruction" },
      { sanskrit: "शब्दः", transliteration: "śabdaḥ", meaning: "word/testimony" },
    ],
    keyConcepts: ["Apta", "Upadesha", "Shabda"],
  },

  // Chapter 5: Avayava (Parts of Argument) - 44 sutras
  {
    id: "5-1",
    chapter: 5,
    sutra: 1,
    sanskrit: "प्रतिज्ञा हेतुः उदाहरणम् उपनयः निगमनं वाक्यं समस्या प्रतिस्थानम् |",
    transliteration: "pratijñā hetuḥ udāharaṇam upanayaḥ nigamanaṃ vākyaṃ samasyā pratisthānam |",
    translation:
      "Proposition, reason, example, application, conclusion, and refutation are the parts of an argument.",
    wordByWord: [
      { sanskrit: "प्रतिज्ञा", transliteration: "pratijñā", meaning: "proposition" },
      { sanskrit: "हेतुः", transliteration: "hetuḥ", meaning: "reason" },
      { sanskrit: "उदाहरणम्", transliteration: "udāharaṇam", meaning: "example" },
      { sanskrit: "उपनयः", transliteration: "upanayaḥ", meaning: "application" },
      { sanskrit: "निगमनम्", transliteration: "nigamanam", meaning: "conclusion" },
      { sanskrit: "वाक्यम्", transliteration: "vākyam", meaning: "statement" },
      { sanskrit: "समस्या", transliteration: "samasyā", meaning: "problem" },
      { sanskrit: "प्रतिस्थानम्", transliteration: "pratisthānam", meaning: "refutation" },
    ],
    keyConcepts: ["Pratijna", "Hetu", "Udaharana", "Upanaya", "Nigamana", "Samasya", "Pratisthana"],
  },
];

export function getSutraById(id: string): NyayaSutra | undefined {
  return NYAYA_SUTRAS.find((sutra) => sutra.id === id);
}

export function getSutrasByChapter(chapter: number): NyayaSutra[] {
  return NYAYA_SUTRAS.filter((sutra) => sutra.chapter === chapter);
}

export function searchSutras(query: string): NyayaSutra[] {
  const lowerQuery = query.toLowerCase();
  return NYAYA_SUTRAS.filter(
    (sutra) =>
      sutra.sanskrit.includes(lowerQuery) ||
      sutra.transliteration.includes(lowerQuery) ||
      sutra.translation.toLowerCase().includes(lowerQuery) ||
      sutra.keyConcepts.some((concept) => concept.toLowerCase().includes(lowerQuery))
  );
}

export const CHAPTER_TITLES = {
  1: "Pratyaksha - Perception",
  2: "Prameya - Objects of Knowledge",
  3: "Vakya - Comparison",
  4: "Samaya - Testimony",
  5: "Avayava - Parts of Argument",
};
