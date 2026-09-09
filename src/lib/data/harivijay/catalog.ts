export const CHAPTER_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31, 32, 33, 34, 35, 36,
] as const;

export type ChapterId = (typeof CHAPTER_IDS)[number];

export type ReaderLocale = "mr" | "en";

export type StoryBeat =
  | "gokul"
  | "mathura"
  | "birth"
  | "vrindavan"
  | "govardhan"
  | "rasa"
  | "dwarka"
  | "kurukshetra"
  | "prabhas"
  | "close";

export interface ChapterKatha {
  mr: string[];
  en: string[];
}

export interface HarivijayChapter {
  id: ChapterId;
  titleMr: string;
  titleEn: string;
  kathaTitleMr: string;
  beat: StoryBeat;
  special: boolean;
  katha: ChapterKatha;
}

export const HARIVIJAY_SOURCE_NOTE = {
  composer: "संत श्रीधर स्वामी नाझरेकर",
  year: "शके १६२४ · इ.स. सुमारे १७०२",
  metre: "ओवी",
  root: "भागवत · पद्म पुराण — कृष्णचरित्र आख्यान",
  oviCountNote:
    "पारंपरिक गणना: ३६ अध्याय, सुमारे ८१३९ ओव्या. चातुर्मासात रोज एक अध्याय किंवा नऊ दिवसांत चार-चार अध्याय असे पारायण होते.",
} as const;

/**
 * Modern print Kathasar editions are reference-only.
 * Site text: original Hind AI katha-sar retelling public-domain Shridhar / Purāṇa motifs.
 * Full ovi verse layers may be added later from public-domain sources only.
 */
export const HARIVIJAY_CHAPTERS: HarivijayChapter[] = [
  {
    id: 1,
    titleMr: "मंगलाचरण · गणेश-सरस्वती वंदन",
    titleEn: "Mangala · Ganesha and Saraswati",
    kathaTitleMr: "ग्रंथारंभ",
    beat: "gokul",
    special: false,
    katha: {
      mr: [
        "श्रीधरस्वामी गणेश, सरस्वती आणि गुरुवंदनानंतर हरिविजय ग्रंथ आरंभ करतात. ओवी परंपरेत मंगलाचरण म्हणजे विघ्नहर्त्याचे स्मरण आणि वाणीची शुद्धी.",
        "हिंद एआयचा सार: ग्रंथ वाचण्यापूर्वी नमस्कार — नाव, गुरु आणि श्रोतृभाव. ही सुरुवात विधी आहे, सजावट नाही.",
      ],
      en: [
        "Shridhar opens Harivijay with homage to Ganesha, Saraswati, and the guru — the classic Marathi ovi mangalacharan.",
        "Hind AI’s point: begin with Name, teacher, and a listening heart. The opening is rite, not decoration.",
      ],
    },
  },
  {
    id: 2,
    titleMr: "पृथ्वीची तक्रार · हरिअवतार योजना",
    titleEn: "Earth’s plea · plan of descent",
    kathaTitleMr: "अवतारसंकल्प",
    beat: "mathura",
    special: false,
    katha: {
      mr: [
        "अध्याय 2 (Earth’s plea · plan of descent) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 2 (Earth’s plea · plan of descent) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 3,
    titleMr: "वसुदेव-देवकी · कंसाची भीती",
    titleEn: "Vasudeva–Devaki · Kamsa’s fear",
    kathaTitleMr: "मथुरेतील तुरुंग",
    beat: "mathura",
    special: false,
    katha: {
      mr: [
        "अध्याय 3 (Vasudeva–Devaki · Kamsa’s fear) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 3 (Vasudeva–Devaki · Kamsa’s fear) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 4,
    titleMr: "कृष्णजन्म · यमुनापार गोकुळ",
    titleEn: "Birth of Krishna · night to Gokul",
    kathaTitleMr: "जन्माष्टमी",
    beat: "birth",
    special: true,
    katha: {
      mr: [
        "मथुरेच्या तुरुंगात देवकीच्या पोटी कृष्ण जन्म घेतो — परंपरेनुसार अर्धरात्रीचा अवतार. वसुदेव यमुना ओलांडून बाळाला गोकुळात नंद-यशोदाकडे नेतात.",
        "हिंद एआयचा सार: जन्म म्हणजे केवळ उत्सव नाही; तो जोखमीत उतरणारा परमार्थ आहे. जन्माष्टमीचा अर्धरात्री पालना याच कथेची आठवण ठेवतो.",
      ],
      en: [
        "In Mathura’s prison Devaki bears Krishna — tradition’s midnight descent. Vasudeva crosses the Yamuna and places the child with Nanda and Yashoda in Gokul.",
        "Hind AI’s point: birth here is not only festival cheer; it is the Absolute entering risk. Janmashtami’s midnight cradle remembers that claim.",
      ],
    },
  },
  {
    id: 5,
    titleMr: "पूतनावध",
    titleEn: "Putana slain",
    kathaTitleMr: "बाळरक्षण",
    beat: "gokul",
    special: false,
    katha: {
      mr: [
        "अध्याय 5 (Putana slain) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 5 (Putana slain) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 6,
    titleMr: "शकटासुर · तृणावर्त",
    titleEn: "Shakatasura and Trinavarta",
    kathaTitleMr: "बालरक्षण",
    beat: "gokul",
    special: false,
    katha: {
      mr: [
        "अध्याय 6 (Shakatasura and Trinavarta) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 6 (Shakatasura and Trinavarta) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 7,
    titleMr: "नामकरण · नंद-यशोदा आनंद",
    titleEn: "Naming rites · Nanda–Yashoda joy",
    kathaTitleMr: "नाममहिमा",
    beat: "gokul",
    special: false,
    katha: {
      mr: [
        "अध्याय 7 (Naming rites · Nanda–Yashoda joy) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 7 (Naming rites · Nanda–Yashoda joy) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 8,
    titleMr: "यमलार्जुन · उलूखल बंधन",
    titleEn: "Yamalarjuna · the mortar bond",
    kathaTitleMr: "मातृस्नेह",
    beat: "gokul",
    special: false,
    katha: {
      mr: [
        "अध्याय 8 (Yamalarjuna · the mortar bond) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 8 (Yamalarjuna · the mortar bond) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 9,
    titleMr: "वत्सासुर · बकासुर",
    titleEn: "Vatsasura and Bakasura",
    kathaTitleMr: "वनलीला",
    beat: "vrindavan",
    special: false,
    katha: {
      mr: [
        "अध्याय 9 (Vatsasura and Bakasura) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 9 (Vatsasura and Bakasura) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 10,
    titleMr: "अघासुरवध",
    titleEn: "Aghasura slain",
    kathaTitleMr: "कृपासिंहासन",
    beat: "vrindavan",
    special: false,
    katha: {
      mr: [
        "अध्याय 10 (Aghasura slain) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 10 (Aghasura slain) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 11,
    titleMr: "ब्रह्मदेवाची वत्सचोरी",
    titleEn: "Brahma steals the calves",
    kathaTitleMr: "मायाभेद",
    beat: "vrindavan",
    special: false,
    katha: {
      mr: [
        "अध्याय 11 (Brahma steals the calves) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 11 (Brahma steals the calves) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 12,
    titleMr: "धेनुकासुर",
    titleEn: "Dhenukasura",
    kathaTitleMr: "तालवन",
    beat: "vrindavan",
    special: false,
    katha: {
      mr: [
        "अध्याय 12 (Dhenukasura) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 12 (Dhenukasura) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 13,
    titleMr: "कालियामर्दन",
    titleEn: "Kaliya subdued",
    kathaTitleMr: "यमुनालीला",
    beat: "vrindavan",
    special: true,
    katha: {
      mr: [
        "यमुनेतील कालिया नागाच्या फणावर कृष्ण नृत्य करतो — विषरक्त नदी पुन्हा निर्मळ होते, अशी भागवत परंपरा.",
        "सार: भीतीच्या डोकेफणीवरही लय शक्य आहे. यमुना आज प्रदूषणाची परीक्षा देते; कथा दया व धैर्याची आठवण ठेवते.",
      ],
      en: [
        "On Kaliya’s hoods Krishna dances until the poisoned Yamuna clears — Bhāgavata tradition.",
        "The teaching: rhythm is possible even on fear’s hoods. Today’s Yamuna asks for care; the story remembers courage with mercy.",
      ],
    },
  },
  {
    id: 14,
    titleMr: "प्रलंबासुर · दावाग्नि",
    titleEn: "Pralamba and the forest fire",
    kathaTitleMr: "सखा-रक्षण",
    beat: "vrindavan",
    special: false,
    katha: {
      mr: [
        "अध्याय 14 (Pralamba and the forest fire) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 14 (Pralamba and the forest fire) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 15,
    titleMr: "गोवर्धनोद्धारण",
    titleEn: "Lifting Govardhan",
    kathaTitleMr: "गोवर्धन",
    beat: "govardhan",
    special: true,
    katha: {
      mr: [
        "इंद्राच्या यज्ञाऐवजी गोवर्धन व गोरसाचा मान ठेवा, असे गोपाल शिकवतो. पर्वत उचलण्याची लीला म्हणजे निसर्ग व गाव यांच्या रक्षणाची कथा.",
        "गोवर्धन पूजेचा आजचा रिवाज याच बीजातून उगवतो — परंपरा म्हणून वाचा; हवामानशास्त्र म्हणून नाही.",
      ],
      en: [
        "Instead of Indra’s sacrifice, the cowherd teaches honour for Govardhan and the wealth of cows. Lifting the hill is a story of shelter for land and village.",
        "Today’s Govardhan Puja grows from that seed — read it as tradition, not as meteorology.",
      ],
    },
  },
  {
    id: 16,
    titleMr: "इंद्रयाग निषेध · गोरस महिमा",
    titleEn: "Rejecting Indra’s yajna · cow wealth",
    kathaTitleMr: "गोपालधर्म",
    beat: "govardhan",
    special: false,
    katha: {
      mr: [
        "इंद्राच्या यज्ञाऐवजी गोवर्धन व गोरसाचा मान ठेवा, असे गोपाल शिकवतो. पर्वत उचलण्याची लीला म्हणजे निसर्ग व गाव यांच्या रक्षणाची कथा.",
        "गोवर्धन पूजेचा आजचा रिवाज याच बीजातून उगवतो — परंपरा म्हणून वाचा; हवामानशास्त्र म्हणून नाही.",
      ],
      en: [
        "Instead of Indra’s sacrifice, the cowherd teaches honour for Govardhan and the wealth of cows. Lifting the hill is a story of shelter for land and village.",
        "Today’s Govardhan Puja grows from that seed — read it as tradition, not as meteorology.",
      ],
    },
  },
  {
    id: 17,
    titleMr: "रासलीला · वंशीनाद",
    titleEn: "Rasa · the flute call",
    kathaTitleMr: "मधुरा भक्ती",
    beat: "rasa",
    special: true,
    katha: {
      mr: [
        "वंशीचा नाद ऐकून गोपी धावत येतात. रास म्हणजे प्रेमाची कक्षा — ऐहिक नात्यांच्या पलीकडे भक्तीचा वेग.",
        "विरह आणि गोपीगीत शिकवतात: दर्शन गेल्यावरही नाम राहते. ही कथा नाट्य नाही; ती हृदयाची भाषा आहे.",
      ],
      en: [
        "The flute calls; the gopis run. Rasa is devotion’s orbit beyond ordinary ties.",
        "Separation and the Gopi-gita teach that when sight fades, the Name remains. This is heart-language, not stage romance.",
      ],
    },
  },
  {
    id: 18,
    titleMr: "गोपीगीत · विरह",
    titleEn: "Gopi-gita · separation",
    kathaTitleMr: "प्रेमविरह",
    beat: "rasa",
    special: false,
    katha: {
      mr: [
        "वंशीचा नाद ऐकून गोपी धावत येतात. रास म्हणजे प्रेमाची कक्षा — ऐहिक नात्यांच्या पलीकडे भक्तीचा वेग.",
        "विरह आणि गोपीगीत शिकवतात: दर्शन गेल्यावरही नाम राहते. ही कथा नाट्य नाही; ती हृदयाची भाषा आहे.",
      ],
      en: [
        "The flute calls; the gopis run. Rasa is devotion’s orbit beyond ordinary ties.",
        "Separation and the Gopi-gita teach that when sight fades, the Name remains. This is heart-language, not stage romance.",
      ],
    },
  },
  {
    id: 19,
    titleMr: "सुदर्शन · अक्रूर आगमन",
    titleEn: "Sudarshana · Akrura arrives",
    kathaTitleMr: "मथुरा बोलावणे",
    beat: "mathura",
    special: false,
    katha: {
      mr: [
        "अध्याय 19 (Sudarshana · Akrura arrives) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 19 (Sudarshana · Akrura arrives) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 20,
    titleMr: "मथुरागमन · रजक-मालिकार",
    titleEn: "Entry to Mathura",
    kathaTitleMr: "नगरलीला",
    beat: "mathura",
    special: false,
    katha: {
      mr: [
        "अध्याय 20 (Entry to Mathura) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 20 (Entry to Mathura) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 21,
    titleMr: "कुवलयापीड · मल्लयुद्ध",
    titleEn: "Kuvalayapida · wrestling hall",
    kathaTitleMr: "कंसाचा दरबार",
    beat: "mathura",
    special: false,
    katha: {
      mr: [
        "अध्याय 21 (Kuvalayapida · wrestling hall) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 21 (Kuvalayapida · wrestling hall) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 22,
    titleMr: "कंसावध · उग्रसेन राज्य",
    titleEn: "Kamsa slain · Ugrasena crowned",
    kathaTitleMr: "अन्यायाचा अंत",
    beat: "mathura",
    special: true,
    katha: {
      mr: [
        "मथुरेच्या मल्लशालेत कंसाचा अंत होतो आणि उग्रसेनाला राज्य मिळते — अन्यायाच्या सिंहासनावरून धर्माची परतफेड.",
        "सार: अवतार केवळ बाललीला नाही; तो राजसत्तेच्या हिंसेला थोपवतो. तरीही द्वारकेकडे वाट पुढे चालू राहते.",
      ],
      en: [
        "In Mathura’s arena Kamsa falls and Ugrasena is crowned — dharma reclaiming a violent throne.",
        "Avatar is not only childhood play; it confronts state cruelty. The road still continues toward Dwaraka.",
      ],
    },
  },
  {
    id: 23,
    titleMr: "गुरु सांदिपनि · विद्या",
    titleEn: "Guru Sandipani · learning",
    kathaTitleMr: "गुरुसेवा",
    beat: "dwarka",
    special: false,
    katha: {
      mr: [
        "अध्याय 23 (Guru Sandipani · learning) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 23 (Guru Sandipani · learning) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 24,
    titleMr: "जरासंध · द्वारकानिर्माण",
    titleEn: "Jarasandha · founding Dwaraka",
    kathaTitleMr: "समुद्रातील नगर",
    beat: "dwarka",
    special: false,
    katha: {
      mr: [
        "अध्याय 24 (Jarasandha · founding Dwaraka) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 24 (Jarasandha · founding Dwaraka) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 25,
    titleMr: "रुक्मिणीहरण",
    titleEn: "Rukmini’s wedding flight",
    kathaTitleMr: "पाणिग्रहण",
    beat: "dwarka",
    special: true,
    katha: {
      mr: [
        "रुक्मिणी कृष्णाची पत्रे पाठवते; हरि तिला रथातून नेतो — स्वयंवरातील राजकीय खेळाऐवजी भक्तीची निवड, अशी परंपरा.",
        "सार: विवाह येथे करार व प्रेम दोन्ही आहे. द्वारकेच्या गृहस्थलीलांचा हा द्वार आहे.",
      ],
      en: [
        "Rukmini writes; Krishna arrives by chariot — tradition reads devotion choosing against a political swayamvara game.",
        "Marriage here is covenant and love. It opens the householder lilas of Dwaraka.",
      ],
    },
  },
  {
    id: 26,
    titleMr: "सत्यभामा · नरकासुर",
    titleEn: "Satyabhama · Narakasura",
    kathaTitleMr: "स्वर्गमुक्ती",
    beat: "dwarka",
    special: false,
    katha: {
      mr: [
        "अध्याय 26 (Satyabhama · Narakasura) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 26 (Satyabhama · Narakasura) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 27,
    titleMr: "स्यामंतकमणि · जांबवंत",
    titleEn: "Syamantaka · Jambavan",
    kathaTitleMr: "सत्यपरीक्षा",
    beat: "dwarka",
    special: false,
    katha: {
      mr: [
        "अध्याय 27 (Syamantaka · Jambavan) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 27 (Syamantaka · Jambavan) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 28,
    titleMr: "उषा-अनिरुद्ध · बाणासुर",
    titleEn: "Usha–Aniruddha · Banasura",
    kathaTitleMr: "शिव-हरि संवाद",
    beat: "dwarka",
    special: false,
    katha: {
      mr: [
        "अध्याय 28 (Usha–Aniruddha · Banasura) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 28 (Usha–Aniruddha · Banasura) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 29,
    titleMr: "राजसूय · शिशुपालवध",
    titleEn: "Rajasuya · Shishupala",
    kathaTitleMr: "धर्मसभा",
    beat: "kurukshetra",
    special: false,
    katha: {
      mr: [
        "अध्याय 29 (Rajasuya · Shishupala) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 29 (Rajasuya · Shishupala) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 30,
    titleMr: "पाण्डवमैत्री · गीतोपदेश बीज",
    titleEn: "Friendship with Pandavas · Gita seed",
    kathaTitleMr: "कुरुक्षेत्रपूर्व",
    beat: "kurukshetra",
    special: false,
    katha: {
      mr: [
        "अध्याय 30 (Friendship with Pandavas · Gita seed) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 30 (Friendship with Pandavas · Gita seed) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 31,
    titleMr: "उद्धव · गोकुळ उपदेश",
    titleEn: "Uddhava · message to Gokul",
    kathaTitleMr: "ज्ञानभक्ती",
    beat: "vrindavan",
    special: false,
    katha: {
      mr: [
        "अध्याय 31 (Uddhava · message to Gokul) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 31 (Uddhava · message to Gokul) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 32,
    titleMr: "मुसल शाप · यादवक्षय बीज",
    titleEn: "The iron club curse",
    kathaTitleMr: "कालधर्म",
    beat: "dwarka",
    special: false,
    katha: {
      mr: [
        "अध्याय 32 (The iron club curse) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 32 (The iron club curse) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 33,
    titleMr: "प्रभास · यादवसंहार",
    titleEn: "Prabhasa · Yadava end",
    kathaTitleMr: "संहार",
    beat: "dwarka",
    special: false,
    katha: {
      mr: [
        "अध्याय 33 (Prabhasa · Yadava end) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 33 (Prabhasa · Yadava end) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 34,
    titleMr: "कृष्णनिर्याण",
    titleEn: "Krishna’s departure",
    kathaTitleMr: "लीलासमाप्ती",
    beat: "prabhas",
    special: true,
    katha: {
      mr: [
        "प्रभास क्षेत्री बाण लागून कृष्ण देह सोडतात — महाभारत/भागवत परंपरेतील लीलासमाप्ती.",
        "सार: अवतार संपतो; नाम व धर्म शिकवण राहते. शोकानंतरही गीता व भक्ती वाचत राहा.",
      ],
      en: [
        "At Prabhasa an arrow ends the embodied play — itihāsa / Bhāgavata tradition of departure.",
        "The avatar ends; Name and teaching remain. After grief, keep reading Gita and bhakti.",
      ],
    },
  },
  {
    id: 35,
    titleMr: "अर्जुन · द्वारका रक्षण · परीक्षित",
    titleEn: "Arjuna’s charge · Parikshit",
    kathaTitleMr: "उत्तरकथा",
    beat: "mathura",
    special: false,
    katha: {
      mr: [
        "अध्याय 35 (Arjuna’s charge · Parikshit) — श्रीधरस्वामींच्या हरिविजय परंपरेतील कृष्णचरित्राचा हा भाग भागवत/पद्म पुराणाच्या आख्यानाशी जुळतो.",
        "हिंद एआय येथे मूळ ओव्यांऐवजी स्वतःचे कथासार देते: परंपरा म्हणून वाचा, आधुनिक कटासार गद्य म्हणून कॉपी करू नका. पूर्ण ओवीपट लवकरच सार्वजनिक-डोमेन स्रोतातून जोडला जाईल.",
      ],
      en: [
        "Adhyay 35 (Arjuna’s charge · Parikshit) sits in Shridhar’s Harivijay arc of Krishna’s life, aligned with Bhāgavata / Padma story tradition.",
        "Hind AI offers an original katha-sar here — tradition, not a scan of modern Kathasar prose. Full public-domain ovi text will layer in as digitisation lands.",
      ],
    },
  },
  {
    id: 36,
    titleMr: "फलश्रुति · नाममहिमा समारोप",
    titleEn: "Phalashruti · closing praise of the Name",
    kathaTitleMr: "पारायण पूर्ण",
    beat: "close",
    special: true,
    katha: {
      mr: [
        "फलश्रुति सांगते: हरिनाम व हरिकथा श्रवणाने चित्त शांत होते. पारायण पूर्ण झाल्यावर शांतितेचा नमस्कार करा.",
        "हिंद एआय: आधुनिक कटासार पुस्तकातील गद्य येथे नाही — फक्त मूळ परंपरेवरील स्वतःचे कथासार व पुढे सार्वजनिक-डोमेन ओव्या.",
      ],
      en: [
        "Phalashruti: hearing Hari’s Name and story settles the mind. Close pāṭha with a bow of peace.",
        "Hind AI hosts original katha-sar on classical motifs — not modern Kathasar paperback prose. Public-domain ovis can layer later.",
      ],
    },
  },
];

export const PARAYAN_METHODS = [
  {
    id: "daily-one",
    title: "रोज एक अध्याय · छत्तीस दिवस",
    titleEn: "One adhyay a day · thirty-six days",
    bodyEn:
      "Start on a Marathi month pratipada; finish by the next month’s shashthi. Common in Chaturmas household reading.",
  },
  {
    id: "nine-day",
    title: "नऊ दिवस · रोज चार अध्याय",
    titleEn: "Nine days · four adhyays daily",
    bodyEn: "A shorter intensive pāṭha when time is tight. Keep mangalacharan before day one.",
  },
] as const;

/** Canonical media only — no duplicate copies under /harivijay/beat-*. */
export const BEAT_IMAGE: Record<StoryBeat, string> = {
  gokul: "/festivals/janmashtami.webp",
  mathura: "/harivijay/cover.webp",
  birth: "/festivals/janmashtami.webp",
  vrindavan: "/harivijay/cover.webp",
  govardhan: "/festivals/govardhan-puja.webp",
  rasa: "/harivijay/cover.webp",
  dwarka: "/vishnu/char-dham/dwarka.webp",
  kurukshetra: "/harivijay/cover.webp",
  prabhas: "/vishnu/hero.webp",
  close: "/harivijay/cover.webp",
};

export function getHarivijayChapter(id: number): HarivijayChapter | undefined {
  return HARIVIJAY_CHAPTERS.find((chapter) => chapter.id === id);
}
