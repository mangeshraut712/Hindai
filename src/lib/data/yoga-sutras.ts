// Patanjali's Yoga Sutras
// Indexed starter set from the traditional 196-sutra Yoga philosophy text.

export interface YogaSutra {
  id: string;
  chapter: number;
  sutra: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  wordByWord: WordByWord[];
  commentary: string;
  keyConcepts: string[];
}

export interface WordByWord {
  sanskrit: string;
  transliteration: string;
  meaning: string;
}

export const YOGA_SUTRAS: YogaSutra[] = [
  // Chapter 1: Samadhi Pada (51 sutras)
  {
    id: "1-1",
    chapter: 1,
    sutra: 1,
    sanskrit: "अथ योगानुशासनम्",
    transliteration: "atha yoga-anuśāsanam",
    translation: "Now, the exposition of yoga.",
    wordByWord: [
      { sanskrit: "अथ", transliteration: "atha", meaning: "now" },
      { sanskrit: "योग", transliteration: "yoga", meaning: "yoga" },
      { sanskrit: "अनुशासनम्", transliteration: "anuśāsanam", meaning: "exposition/instruction" },
    ],
    commentary:
      "This opening sutra indicates that the study of yoga begins here, following preparatory practices.",
    keyConcepts: ["Yoga", "Instruction", "Beginning"],
  },
  {
    id: "1-2",
    chapter: 1,
    sutra: 2,
    sanskrit: "योगश्चित्तवृत्तिनिरोधः",
    transliteration: "yogaś-citta-vṛtti-nirodhaḥ",
    translation: "Yoga is the restraint of the modifications of the mind.",
    wordByWord: [
      { sanskrit: "योगः", transliteration: "yogaḥ", meaning: "yoga" },
      { sanskrit: "चित्त", transliteration: "citta", meaning: "mind/consciousness" },
      { sanskrit: "वृत्ति", transliteration: "vṛtti", meaning: "modification/fluctuation" },
      { sanskrit: "निरोधः", transliteration: "nirodhaḥ", meaning: "restraint/control" },
    ],
    commentary:
      "The definition of yoga: controlling the thought patterns of the mind to achieve stillness.",
    keyConcepts: ["Citta", "Vritti", "Nirodha", "Mind control"],
  },
  {
    id: "1-3",
    chapter: 1,
    sutra: 3,
    sanskrit: "तदा द्रष्टुः स्वरूपेऽवस्थानम्",
    transliteration: "tadā draṣṭuḥ sva-rūpe'vasthānam",
    translation: "Then the seer rests in its own true nature.",
    wordByWord: [
      { sanskrit: "तदा", transliteration: "tadā", meaning: "then" },
      { sanskrit: "द्रष्टुः", transliteration: "draṣṭuḥ", meaning: "the seer" },
      { sanskrit: "स्वरूप", transliteration: "sva-rūpe", meaning: "in its own form" },
      { sanskrit: "अवस्थानम्", transliteration: "avasthānam", meaning: "abiding/resting" },
    ],
    commentary:
      "When mental fluctuations cease, the true self (Purusha) is revealed in its natural state.",
    keyConcepts: ["Drishtu", "Svarupa", "Purusha", "Self-realization"],
  },
  {
    id: "1-4",
    chapter: 1,
    sutra: 4,
    sanskrit: "वृत्तिसारूप्यमितरत्र",
    transliteration: "vṛtti-sārūpyam-itaratra",
    translation: "Otherwise, the seer identifies with the modifications.",
    wordByWord: [
      { sanskrit: "वृत्ति", transliteration: "vṛtti", meaning: "modification" },
      {
        sanskrit: "सारूप्यम्",
        transliteration: "sārūpyam",
        meaning: "identification/assimilation",
      },
      { sanskrit: "इतरत्र", transliteration: "itaratra", meaning: "otherwise" },
    ],
    commentary: "When not in yoga, the seer mistakenly identifies with the changing mind patterns.",
    keyConcepts: ["Identification", "Misidentification", "Mind patterns"],
  },
  {
    id: "1-5",
    chapter: 1,
    sutra: 5,
    sanskrit: "वृत्तयः पञ्चतय्यः क्लिष्टाक्लिष्टाः",
    transliteration: "vṛttayaḥ pañcatayyaḥ kliṣṭākliṣṭāḥ",
    translation: "The modifications are five, afflicted and non-afflicted.",
    wordByWord: [
      { sanskrit: "वृत्तयः", transliteration: "vṛttayaḥ", meaning: "modifications" },
      { sanskrit: "पञ्चतय्यः", transliteration: "pañcatayyaḥ", meaning: "fivefold" },
      { sanskrit: "क्लिष्ट", transliteration: "kliṣṭa", meaning: "afflicted" },
      { sanskrit: "अक्लिष्ट", transliteration: "akliṣṭa", meaning: "non-afflicted" },
    ],
    commentary: "Mental modifications are of five types, either causing suffering or not.",
    keyConcepts: ["Five modifications", "Klishta", "Aklishta"],
  },
  {
    id: "1-6",
    chapter: 1,
    sutra: 6,
    sanskrit: "प्रमाणविपर्ययविकल्पनिद्रास्मृतयः",
    transliteration: "pramāṇa-viparyaya-vikalpa-nidrā-smṛtayaḥ",
    translation: "Right knowledge, misconception, conceptualization, sleep, and memory.",
    wordByWord: [
      { sanskrit: "प्रमाण", transliteration: "pramāṇa", meaning: "right knowledge" },
      { sanskrit: "विपर्यय", transliteration: "viparyaya", meaning: "misconception" },
      { sanskrit: "विकल्प", transliteration: "vikalpa", meaning: "conceptualization" },
      { sanskrit: "निद्रा", transliteration: "nidrā", meaning: "sleep" },
      { sanskrit: "स्मृतयः", transliteration: "smṛtayaḥ", meaning: "memories" },
    ],
    commentary:
      "The five types of mental modifications: perception, error, imagination, sleep, and memory.",
    keyConcepts: ["Pramana", "Viparyaya", "Vikalpa", "Nidra", "Smriti"],
  },
  {
    id: "1-7",
    chapter: 1,
    sutra: 7,
    sanskrit: "प्रत्यक्षानुमानागमाः प्रमाणानि",
    transliteration: "pratyakṣa-anumāna-āgamāḥ pramāṇāni",
    translation: "Direct perception, inference, and testimony are the sources of right knowledge.",
    wordByWord: [
      { sanskrit: "प्रत्यक्ष", transliteration: "pratyakṣa", meaning: "direct perception" },
      { sanskrit: "अनुमान", transliteration: "anumāna", meaning: "inference" },
      { sanskrit: "आगमाः", transliteration: "āgamāḥ", meaning: "testimony/scripture" },
      { sanskrit: "प्रमाणानि", transliteration: "pramāṇāni", meaning: "sources of knowledge" },
    ],
    commentary:
      "Valid knowledge comes from three sources: direct experience, logical inference, and reliable testimony.",
    keyConcepts: ["Pratyaksha", "Anumana", "Agama", "Knowledge sources"],
  },
  {
    id: "1-8",
    chapter: 1,
    sutra: 8,
    sanskrit: "विपर्ययो मिथ्याज्ञानमतद्रूपप्रतिष्ठम्",
    transliteration: "viparyayo mithyā-jñānam-atad-rūpa-pratiṣṭham",
    translation: "Misconception is false knowledge based on something not actually present.",
    wordByWord: [
      { sanskrit: "विपर्ययः", transliteration: "viparyayaḥ", meaning: "misconception" },
      { sanskrit: "मिथ्या", transliteration: "mithyā", meaning: "false" },
      { sanskrit: "ज्ञानम्", transliteration: "jñānam", meaning: "knowledge" },
      { sanskrit: "अतद्रूप", transliteration: "atad-rūpa", meaning: "not that form" },
      { sanskrit: "प्रतिष्ठम्", transliteration: "pratiṣṭham", meaning: "based on" },
    ],
    commentary:
      "Error or misconception is knowledge that doesn't correspond to reality, like seeing a rope as a snake.",
    keyConcepts: ["Error", "False knowledge", "Illusion"],
  },
  {
    id: "1-9",
    chapter: 1,
    sutra: 9,
    sanskrit: "शब्दज्ञानानुपाती वस्तुशून्यो विकल्पः",
    transliteration: "śabda-jñāna-anupātī vastu-śūnyo vikalpaḥ",
    translation: "Conceptualization follows verbal knowledge without actual object.",
    wordByWord: [
      { sanskrit: "शब्द", transliteration: "śabda", meaning: "word" },
      { sanskrit: "ज्ञान", transliteration: "jñāna", meaning: "knowledge" },
      { sanskrit: "अनुपाती", transliteration: "anupātī", meaning: "following" },
      { sanskrit: "वस्तु", transliteration: "vastu", meaning: "object" },
      { sanskrit: "शून्यः", transliteration: "śūnyaḥ", meaning: "empty" },
      { sanskrit: "विकल्पः", transliteration: "vikalpaḥ", meaning: "imagination" },
    ],
    commentary:
      "Imagination or fantasy is based on words with no corresponding reality, like a unicorn.",
    keyConcepts: ["Imagination", "Fantasy", "Verbal knowledge"],
  },
  {
    id: "1-10",
    chapter: 1,
    sutra: 10,
    sanskrit: "अभावप्रत्ययालम्बना तन्द्रा निद्रा",
    transliteration: "abhāva-pratyaya-ālambanā tandrā nidrā",
    translation: "Sleep is the modification based on the absence of content.",
    wordByWord: [
      { sanskrit: "अभाव", transliteration: "abhāva", meaning: "absence" },
      { sanskrit: "प्रत्यय", transliteration: "pratyaya", meaning: "content/idea" },
      { sanskrit: "आलम्बना", transliteration: "ālambanā", meaning: "supported by" },
      { sanskrit: "तन्द्रा", transliteration: "tandrā", meaning: "drowsiness" },
      { sanskrit: "निद्रा", transliteration: "nidrā", meaning: "sleep" },
    ],
    commentary:
      "Sleep is the mental state where there's no active content, a blank modification of mind.",
    keyConcepts: ["Sleep", "Absence", "Unconsciousness"],
  },
  {
    id: "1-11",
    chapter: 1,
    sutra: 11,
    sanskrit: "अनुभूतविषयासंप्रमोषः स्मृतिः",
    transliteration: "anubhūta-viṣayā-saṃpramoṣaḥ smṛtiḥ",
    translation: "Memory is the retention of experienced objects.",
    wordByWord: [
      { sanskrit: "अनुभूत", transliteration: "anubhūta", meaning: "experienced" },
      { sanskrit: "विषय", transliteration: "viṣaya", meaning: "object" },
      { sanskrit: "असंप्रमोषः", transliteration: "asaṃpramoṣaḥ", meaning: "not lost" },
      { sanskrit: "स्मृतिः", transliteration: "smṛtiḥ", meaning: "memory" },
    ],
    commentary:
      "Memory is the mental modification that retains impressions of past experiences without letting them fade.",
    keyConcepts: ["Memory", "Experience", "Retention"],
  },
  {
    id: "1-12",
    chapter: 1,
    sutra: 12,
    sanskrit: "अभ्यासवैराग्याभ्यां तन्निरोधः",
    transliteration: "abhyāsa-vairāgyābhyāṃ tan-nirodhaḥ",
    translation: "Their restraint is achieved through practice and detachment.",
    wordByWord: [
      { sanskrit: "अभ्यास", transliteration: "abhyāsa", meaning: "practice" },
      { sanskrit: "वैराग्य", transliteration: "vairāgya", meaning: "detachment" },
      { sanskrit: "अभ्याम्", transliteration: "abhyām", meaning: "by both" },
      { sanskrit: "तत्", transliteration: "tat", meaning: "their" },
      { sanskrit: "निरोधः", transliteration: "nirodhaḥ", meaning: "restraint" },
    ],
    commentary:
      "The five modifications are controlled through consistent practice and non-attachment.",
    keyConcepts: ["Abhyasa", "Vairagya", "Practice", "Detachment"],
  },
  {
    id: "1-13",
    chapter: 1,
    sutra: 13,
    sanskrit: "तत्र स्थितौ यत्नोऽभ्यासः",
    transliteration: "tatra sthitau yatno'bhhyāsaḥ",
    translation: "Practice is the effort to maintain steadiness.",
    wordByWord: [
      { sanskrit: "तत्र", transliteration: "tatra", meaning: "there" },
      { sanskrit: "स्थितौ", transliteration: "sthiti", meaning: "steadiness" },
      { sanskrit: "यत्नः", transliteration: "yatnaḥ", meaning: "effort" },
      { sanskrit: "अभ्यासः", transliteration: "abhyāsaḥ", meaning: "practice" },
    ],
    commentary:
      "Practice means consistent effort to maintain mental steadiness and prevent distractions.",
    keyConcepts: ["Effort", "Steadiness", "Consistent practice"],
  },
  {
    id: "1-14",
    chapter: 1,
    sutra: 14,
    sanskrit: "स तु दीर्घकालनैनन्तर्यसत्कारासेवितो दृढभूमिः",
    transliteration: "sa tu dīrgha-kāla-nairantarya-satkārāsevito dṛḍha-bhūmiḥ",
    translation:
      "It becomes firmly grounded when practiced for a long time, without break, and with devotion.",
    wordByWord: [
      { sanskrit: "सः", transliteration: "saḥ", meaning: "it" },
      { sanskrit: "तु", transliteration: "tu", meaning: "but" },
      { sanskrit: "दीर्घकाल", transliteration: "dīrgha-kāla", meaning: "long time" },
      { sanskrit: "नैरन्तर्य", transliteration: "nairantarya", meaning: "without interruption" },
      { sanskrit: "सत्कार", transliteration: "satkāra", meaning: "with devotion/attitude" },
      { sanskrit: "आसेवितः", transliteration: "āsevitaḥ", meaning: "practiced" },
      { sanskrit: "दृढभूमिः", transliteration: "dṛḍha-bhūmiḥ", meaning: "firmly grounded" },
    ],
    commentary:
      "Practice becomes effective only when done continuously for a long time with sincere dedication.",
    keyConcepts: ["Long time", "Continuity", "Devotion", "Firm foundation"],
  },
  {
    id: "1-15",
    chapter: 1,
    sutra: 15,
    sanskrit: "दृष्टानुश्रविकविषयवितृष्णस्य वशीकारसंज्ञे वैराग्यम्",
    transliteration: "dṛṣṭa-anuśravika-viṣaya-vitṛṣṇasy vaśīkāra-saṃjñe vairāgyam",
    translation: "Detachment is the mastery over craving for seen and heard objects.",
    wordByWord: [
      { sanskrit: "दृष्ट", transliteration: "dṛṣṭa", meaning: "seen" },
      { sanskrit: "अनुश्रविक", transliteration: "anuśravika", meaning: "heard/scriptural" },
      { sanskrit: "विषय", transliteration: "viṣaya", meaning: "objects/sense pleasures" },
      {
        sanskrit: "वितृष्णस्य",
        transliteration: "vitṛṣṇasya",
        meaning: "of one who has lost taste",
      },
      { sanskrit: "वशीकार", transliteration: "vaśīkāra", meaning: "mastery" },
      { sanskrit: "संज्ञे", transliteration: "saṃjñe", meaning: "in the perception of" },
      { sanskrit: "वैराग्यम्", transliteration: "vairāgyam", meaning: "detachment" },
    ],
    commentary:
      "Non-attachment is the conscious control over desire for sensory experiences, whether seen or heard about.",
    keyConcepts: ["Vairagya", "Detachment", "Sense control", "Desirelessness"],
  },
  {
    id: "1-16",
    chapter: 1,
    sutra: 16,
    sanskrit: "तत्परं पुरुषख्यातेर्गुणवैतृष्ण्यम्",
    transliteration: "tat-paraṃ puruṣa-khyāter-guṇa-vaitṛṣṇyam",
    translation:
      "The highest detachment is when one discerns the Purusha, becoming indifferent to the gunas.",
    wordByWord: [
      { sanskrit: "तत्परम्", transliteration: "tat-param", meaning: "that highest" },
      { sanskrit: "पुरुष", transliteration: "puruṣa", meaning: "spirit/soul" },
      { sanskrit: "ख्यातेः", transliteration: "khyāteḥ", meaning: "from the knowledge of" },
      { sanskrit: "गुण", transliteration: "guṇa", meaning: "qualities" },
      { sanskrit: "वैतृष्ण्यम्", transliteration: "vaitṛṣṇyam", meaning: "indifference" },
    ],
    commentary:
      "Supreme detachment comes from realizing the true self (Purusha) and losing interest in nature's qualities.",
    keyConcepts: ["Purusha", "Gunas", "Supreme detachment", "Self-knowledge"],
  },
  {
    id: "1-17",
    chapter: 1,
    sutra: 17,
    sanskrit: "वितर्कविचारसुखानुशूपी संस्कारसु योगः समाधिः",
    transliteration: "vitarka-vicāra-sukhānuśūpī saṃskārasu yogaḥ samādhiḥ",
    translation: "Samadhi has stages: reasoning, reflection, bliss, and pure I-am-ness.",
    wordByWord: [
      { sanskrit: "वितर्क", transliteration: "vitarka", meaning: "reasoning" },
      { sanskrit: "विचार", transliteration: "vicāra", meaning: "reflection" },
      { sanskrit: "सुख", transliteration: "sukha", meaning: "bliss" },
      { sanskrit: "अनुशूपी", transliteration: "anuśūpī", meaning: "I-am-ness" },
      { sanskrit: "संस्कार", transliteration: "saṃskāra", meaning: "impressions" },
      { sanskrit: "योगः", transliteration: "yogaḥ", meaning: "yoga" },
      { sanskrit: "समाधिः", transliteration: "samādhiḥ", meaning: "samadhi" },
    ],
    commentary:
      "Samadhi (absorption) progresses through four stages: with reasoning, with reflection, with bliss, and with pure ego-sense.",
    keyConcepts: ["Samadhi", "Vitarka", "Vicara", "Sukha", "Asmita"],
  },
  {
    id: "1-18",
    chapter: 1,
    sutra: 18,
    sanskrit: "विरामप्रत्ययाभ्यासपूर्वः संस्कारशेषोऽन्यः",
    transliteration: "virāma-pratyaya-abhyāsa-pūrvaḥ saṃskāra-śeṣo'nyaḥ",
    translation: "The other samadhi is preceded by practice of stopping all mental impressions.",
    wordByWord: [
      { sanskrit: "विराम", transliteration: "virāma", meaning: "stopping" },
      { sanskrit: "प्रत्यय", transliteration: "pratyaya", meaning: "mental content" },
      { sanskrit: "अभ्यास", transliteration: "abhyāsa", meaning: "practice" },
      { sanskrit: "पूर्वः", transliteration: "pūrvaḥ", meaning: "preceded by" },
      { sanskrit: "संस्कार", transliteration: "saṃskāra", meaning: "impressions" },
      { sanskrit: "शेषः", transliteration: "śeṣaḥ", meaning: "remainder" },
      { sanskrit: "अन्यः", transliteration: "anyaḥ", meaning: "other" },
    ],
    commentary:
      "The seedless samadhi (nirbija) comes from practice that leaves only residual impressions.",
    keyConcepts: ["Nirbija samadhi", "Seedless", "Impressions", "Practice"],
  },
  {
    id: "1-19",
    chapter: 1,
    sutra: 19,
    sanskrit: "भवप्रत्ययो विदेहप्रक्षतिर्भावाः",
    transliteration: "bhava-pratyayo videha-prakṣati-bhāvāḥ",
    translation: "Those whose mental content is birth are subject to physical existence.",
    wordByWord: [
      { sanskrit: "भव", transliteration: "bhava", meaning: "birth" },
      { sanskrit: "प्रत्ययः", transliteration: "pratyayaḥ", meaning: "mental content" },
      { sanskrit: "विदेह", transliteration: "videha", meaning: "bodiless" },
      { sanskrit: "प्रक्षति", transliteration: "prakṣati", meaning: "falling/descending" },
      { sanskrit: "भावाः", transliteration: "bhāvāḥ", meaning: "existences" },
    ],
    commentary: "Those who are attached to birth continue to be reborn in physical forms.",
    keyConcepts: ["Birth", "Rebirth", "Physical existence", "Attachment"],
  },
  {
    id: "1-20",
    chapter: 1,
    sutra: 20,
    sanskrit: "श्रद्धावीर्यस्मृतिसमाधप्रज्ञास्यालोकः",
    transliteration: "śraddhā-vīrya-smṛti-samādhi-prajñā-pūrvaka itareṣām",
    translation: "For others, it is preceded by faith, energy, memory, samadhi, and wisdom.",
    wordByWord: [
      { sanskrit: "श्रद्धा", transliteration: "śraddhā", meaning: "faith" },
      { sanskrit: "वीर्य", transliteration: "vīrya", meaning: "energy" },
      { sanskrit: "स्मृति", transliteration: "smṛti", meaning: "memory" },
      { sanskrit: "समाधि", transliteration: "samādhi", meaning: "concentration" },
      { sanskrit: "प्रज्ञा", transliteration: "prajñā", meaning: "wisdom" },
      { sanskrit: "पूर्वक", transliteration: "pūrvaka", meaning: "preceded by" },
      { sanskrit: "इतरेषाम्", transliteration: "itareṣām", meaning: "for others" },
    ],
    commentary:
      "For those not yet realized, samadhi is achieved through faith, vigor, memory, concentration, and discrimination.",
    keyConcepts: ["Shraddha", "Virya", "Smriti", "Samadhi", "Prajna"],
  },
  // More sutras should be added through the ingestion pipeline.
  // Keep API responses honest by reporting indexed count separately from the canonical 196.
];

// Chapter 2: Sadhana Pada (55 sutras) - Practice
// Chapter 3: Vibhuti Pada (56 sutras) - Powers
// Chapter 4: Kaivalya Pada (34 sutras) - Liberation

export function getSutraById(id: string): YogaSutra | undefined {
  return YOGA_SUTRAS.find((sutra) => sutra.id === id);
}

export function getSutrasByChapter(chapter: number): YogaSutra[] {
  return YOGA_SUTRAS.filter((sutra) => sutra.chapter === chapter);
}

export function searchSutras(query: string): YogaSutra[] {
  const lowerQuery = query.toLowerCase();
  return YOGA_SUTRAS.filter(
    (sutra) =>
      sutra.sanskrit.includes(lowerQuery) ||
      sutra.transliteration.includes(lowerQuery) ||
      sutra.translation.toLowerCase().includes(lowerQuery) ||
      sutra.keyConcepts.some((concept) => concept.toLowerCase().includes(lowerQuery))
  );
}

export const CHAPTER_TITLES = {
  1: "Samadhi Pada - On Absorption",
  2: "Sadhana Pada - On Practice",
  3: "Vibhuti Pada - On Powers",
  4: "Kaivalya Pada - On Liberation",
};
