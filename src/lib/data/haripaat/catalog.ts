export const LEAF_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type LeafId = (typeof LEAF_IDS)[number];
export type ReaderLocale = "mr" | "en";
export interface LeafKatha {
  mr: string[];
  en: string[];
}
export interface HaripaatLeaf {
  id: LeafId;
  titleMr: string;
  titleEn: string;
  kathaTitleMr: string;
  special: boolean;
  katha: LeafKatha;
}

export const HARIPAAT_SOURCE_NOTE = {
  tradition: "वैष्णव हरिपाठ · महाराष्ट्र घरगुती परंपरा",
  root: "भागवत · हरिनाम · एकनाथ/वारकरी भाव (motif, not a scan)",
  note: "Original Hind AI katha-sar for daily Hari reading. Not a copy of any modern publisher patha booklet.",
} as const;

export const HARIPAAT_LEAVES: HaripaatLeaf[] = [
  {
    id: 1,
    titleMr: "मंगलाचरण · हरिनाम",
    titleEn: "Mangala · Name of Hari",
    kathaTitleMr: "आरंभ",
    special: true,
    katha: {
      mr: [
        "हरिपाठ म्हणजे हरिनामाचे नित्य श्रवण. गणेश-सरस्वती व गुरुवंदनानंतर “ॐ नमो भगवते वासुदेवाय” हे बीज ठेवा.",
        "हिंद एआय येथे मूळ प्रकाशक गद्य कॉपी करत नाही — भागवत/एकनाथ परंपरेवरील स्वतःचे कथासार देते.",
      ],
      en: [
        "Haripaat is daily listening to Hari’s Name. After mangala, keep the seed mantra “Om Namo Bhagavate Vasudevaya”.",
        "Hind AI offers original katha-sar on Bhāgavata / Eknath-tradition motifs — not modern paperback prose.",
      ],
    },
  },
  {
    id: 2,
    titleMr: "विठ्ठल स्मरण · पंढरी",
    titleEn: "Vitthal remembrance · Pandhari",
    kathaTitleMr: "विठ्ठल",
    special: true,
    katha: {
      mr: [
        "पंढरपूरचा विठ्ठल — हात कटीवर, विटेवर उभा — महाराष्ट्राच्या वैष्णव हृदयाचे चिन्ह. नाम आणि वारी दोन्ही याच द्वारातून जातात.",
        "पारायणात विठ्ठल स्मरण म्हणजे घरगुती हरिपाठाला सार्वजनिक भक्तीची जोड.",
      ],
      en: [
        "Vitthal of Pandharpur — hands on hips, standing on the brick — marks Maharashtra’s Vaishnava heart. Name and wari both pass this door.",
        "Remembering Vitthal joins household Haripaat to public bhakti.",
      ],
    },
  },
  {
    id: 3,
    titleMr: "एकादशी व्रत भाव",
    titleEn: "Ekadashi vow mood",
    kathaTitleMr: "उपवास",
    special: false,
    katha: {
      mr: [
        "पाठ 3 (Ekadashi vow mood) — वैष्णव नित्यपाठाचा भाग. भागवत व हरिनाम परंपरेवरील हिंद एआय कथासार.",
        "एकादशी, तुलसी आणि गीता हे घरगुती शिस्त म्हणून ठेवा. परंपरा म्हणून वाचा.",
      ],
      en: [
        "Leaf 3 (Ekadashi vow mood) — part of a Vaishnava daily patha. Original Hind AI katha-sar on Bhāgavata and Hari-nama tradition.",
        "Keep ekadashi, tulsi, and a Gita seed as household discipline. Read as tradition.",
      ],
    },
  },
  {
    id: 4,
    titleMr: "भागवत बीज · बालकृष्ण",
    titleEn: "Bhagavata seed · child Krishna",
    kathaTitleMr: "लीला",
    special: false,
    katha: {
      mr: [
        "पाठ 4 (Bhagavata seed · child Krishna) — वैष्णव नित्यपाठाचा भाग. भागवत व हरिनाम परंपरेवरील हिंद एआय कथासार.",
        "एकादशी, तुलसी आणि गीता हे घरगुती शिस्त म्हणून ठेवा. परंपरा म्हणून वाचा.",
      ],
      en: [
        "Leaf 4 (Bhagavata seed · child Krishna) — part of a Vaishnava daily patha. Original Hind AI katha-sar on Bhāgavata and Hari-nama tradition.",
        "Keep ekadashi, tulsi, and a Gita seed as household discipline. Read as tradition.",
      ],
    },
  },
  {
    id: 5,
    titleMr: "गोपीगीत सार",
    titleEn: "Essence of the Gopi-gita",
    kathaTitleMr: "प्रेम",
    special: true,
    katha: {
      mr: [
        "गोपीगीत विरहातूनही नाम राखते. दर्शन गेले तरी श्रवण चालू राहते — हा हरिपाठाचा गाभा.",
        "वाचा: प्रेम म्हणजे नाटक नाही; ती हृदयाची भाषा आहे.",
      ],
      en: [
        "The Gopi-gita keeps the Name even in separation. When sight fades, listening continues — that is Haripaat’s core.",
        "Love here is heart-language, not stage romance.",
      ],
    },
  },
  {
    id: 6,
    titleMr: "उद्धव संदेश",
    titleEn: "Uddhava’s counsel",
    kathaTitleMr: "ज्ञानभक्ती",
    special: false,
    katha: {
      mr: [
        "पाठ 6 (Uddhava’s counsel) — वैष्णव नित्यपाठाचा भाग. भागवत व हरिनाम परंपरेवरील हिंद एआय कथासार.",
        "एकादशी, तुलसी आणि गीता हे घरगुती शिस्त म्हणून ठेवा. परंपरा म्हणून वाचा.",
      ],
      en: [
        "Leaf 6 (Uddhava’s counsel) — part of a Vaishnava daily patha. Original Hind AI katha-sar on Bhāgavata and Hari-nama tradition.",
        "Keep ekadashi, tulsi, and a Gita seed as household discipline. Read as tradition.",
      ],
    },
  },
  {
    id: 7,
    titleMr: "रामनाम · मर्यादा",
    titleEn: "Rama-nama · maryada",
    kathaTitleMr: "मर्यादा",
    special: false,
    katha: {
      mr: [
        "पाठ 7 (Rama-nama · maryada) — वैष्णव नित्यपाठाचा भाग. भागवत व हरिनाम परंपरेवरील हिंद एआय कथासार.",
        "एकादशी, तुलसी आणि गीता हे घरगुती शिस्त म्हणून ठेवा. परंपरा म्हणून वाचा.",
      ],
      en: [
        "Leaf 7 (Rama-nama · maryada) — part of a Vaishnava daily patha. Original Hind AI katha-sar on Bhāgavata and Hari-nama tradition.",
        "Keep ekadashi, tulsi, and a Gita seed as household discipline. Read as tradition.",
      ],
    },
  },
  {
    id: 8,
    titleMr: "गीता बीज · कर्मयोग",
    titleEn: "Gita seed · karma-yoga",
    kathaTitleMr: "कुरुक्षेत्र",
    special: false,
    katha: {
      mr: [
        "पाठ 8 (Gita seed · karma-yoga) — वैष्णव नित्यपाठाचा भाग. भागवत व हरिनाम परंपरेवरील हिंद एआय कथासार.",
        "एकादशी, तुलसी आणि गीता हे घरगुती शिस्त म्हणून ठेवा. परंपरा म्हणून वाचा.",
      ],
      en: [
        "Leaf 8 (Gita seed · karma-yoga) — part of a Vaishnava daily patha. Original Hind AI katha-sar on Bhāgavata and Hari-nama tradition.",
        "Keep ekadashi, tulsi, and a Gita seed as household discipline. Read as tradition.",
      ],
    },
  },
  {
    id: 9,
    titleMr: "तुलसी व हरिद्वार",
    titleEn: "Tulsi and Hari’s door",
    kathaTitleMr: "नित्य",
    special: false,
    katha: {
      mr: [
        "पाठ 9 (Tulsi and Hari’s door) — वैष्णव नित्यपाठाचा भाग. भागवत व हरिनाम परंपरेवरील हिंद एआय कथासार.",
        "एकादशी, तुलसी आणि गीता हे घरगुती शिस्त म्हणून ठेवा. परंपरा म्हणून वाचा.",
      ],
      en: [
        "Leaf 9 (Tulsi and Hari’s door) — part of a Vaishnava daily patha. Original Hind AI katha-sar on Bhāgavata and Hari-nama tradition.",
        "Keep ekadashi, tulsi, and a Gita seed as household discipline. Read as tradition.",
      ],
    },
  },
  {
    id: 10,
    titleMr: "समारोप · शांति पाठ",
    titleEn: "Closing · peace patha",
    kathaTitleMr: "समाप्ती",
    special: true,
    katha: {
      mr: [
        "पाठ संपताना शांति म्हणा. हरिपाठ पूर्ण झाला तरी नाम पुढच्या दिवशी पुन्हा सुरू होते.",
        "परंपरा म्हणून वाचा; आधुनिक कटासार गद्य येथे नाही.",
      ],
      en: [
        "Close with peace. Haripaat ends for the day and begins again tomorrow with the Name.",
        "Read as tradition — no modern Kathasar prose is hosted here.",
      ],
    },
  },
];

export function getHaripaatLeaf(id: number): HaripaatLeaf | undefined {
  return HARIPAAT_LEAVES.find((leaf) => leaf.id === id);
}
