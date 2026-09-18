export const LEAF_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] as const;
export type LeafId = (typeof LEAF_IDS)[number];
export type ReaderLocale = "mr" | "en";

/** Three caritas of Devi Mahatmya, plus the three patha angas recited before the adhyayas. */
export type Charitra = "anga" | "prathama" | "madhyama" | "uttama";

export type LeafKind = "anga" | "adhyay";

export interface LeafKatha {
  mr: string[];
  en: string[];
}

export interface SaptashatiLeaf {
  id: LeafId;
  kind: LeafKind;
  /** Traditional adhyay number 1–13 when kind is adhyay; else null. */
  adhyay: number | null;
  titleMr: string;
  titleEn: string;
  kathaTitleMr: string;
  charitra: Charitra;
  special: boolean;
  katha: LeafKatha;
}

export const DURGA_SAPTASHATI_SOURCE_NOTE = {
  tradition: "दुर्गा सप्तशती · देवी माहात्म्य · मार्कण्डेय पुराण",
  root: "मार्कण्डेय पुराण — अध्याय ८१–९३ (परंपरा)",
  verseNote:
    "पारंपरिक गणना: सुमारे ७०० मंत्र (सप्तशती). घरगुती चंडीपाठात आधी कवच-अर्गल-कीलक, मग तेरा अध्याय.",
  note: "Original Hind AI katha-sar for Navaratri / Chandi patha. Not a scan of any modern publisher’s verse edition or commentary.",
} as const;

export const PARAYAN_METHODS = [
  {
    id: "navaratri-nine",
    titleMr: "नवरात्र · नऊ दिवस",
    titleEn: "Nine days of Sharad Navaratri",
    bodyEn:
      "Day 1–3: Prathama + Madhyama (angas + adhyay 1–4). Day 4–6: Uttama through Raktabija (5–8). Day 7–9: Nishumbha–Shumbha, Narayani stuti, and phalashruti (9–13). Keep a lamp; recite aloud if the household can.",
  },
  {
    id: "one-adhyay",
    titleMr: "रोज एक अध्याय",
    titleEn: "One adhyay a day",
    bodyEn:
      "Sixteen leaves including the three angas. Useful outside Navaratri when you want a slow Chandi cycle.",
  },
  {
    id: "charitra-focus",
    titleMr: "चरित्रानुसार",
    titleEn: "By charitra",
    bodyEn:
      "Prathama (Madhu-Kaitabha), Madhyama (Mahisha), Uttama (Shumbha-Nishumbha). Recite one carita completely on a single seated sitting.",
  },
] as const;

/**
 * Markandeya Purana Devi Mahatmya motifs + living Chandi-patha angas.
 * Site text is original Hind AI katha-sar — not a publisher’s Sanskrit edition.
 */
export const DURGA_SAPTASHATI_LEAVES: SaptashatiLeaf[] = [
  {
    id: 1,
    kind: "anga",
    adhyay: null,
    titleMr: "देवी कवचम्",
    titleEn: "Devi Kavacham",
    kathaTitleMr: "कवच",
    charitra: "anga",
    special: true,
    katha: {
      mr: [
        "कवच म्हणजे देवीच्या नामांनी अंग-अंग रक्षण. चंडीपाठ सुरू करण्यापूर्वी वाचा — ही सजावट नाही, पाठविधीची पहिली भिंत आहे.",
        "हिंद एआय सार: भीती कमी करण्यासाठी नाव घाला; कवच म्हणजे हृदयाची ढाल, लष्करी चिलखत नाही.",
      ],
      en: [
        "The Kavacha invokes the Mother’s names over each limb before Chandi patha — the first wall of the rite, not decoration.",
        "Hind AI’s point: Name is a shield for the heart. This is protection-as-prayer, not a military claim.",
      ],
    },
  },
  {
    id: 2,
    kind: "anga",
    adhyay: null,
    titleMr: "अर्गला स्तोत्रम्",
    titleEn: "Argala Stotram",
    kathaTitleMr: "अर्गला",
    charitra: "anga",
    special: false,
    katha: {
      mr: [
        "अर्गला म्हणजे ‘अडथळा काढणे’. स्तोत्रात देवीकडे विघ्न-हरण आणि सिद्धि-दान मागितले जाते — पाठ सुरू होण्याआधीचा दुसरा द्वार.",
        "वाचा: अर्गला म्हणजे अहंकाराचे कुलूप उघडणे; यश म्हणजे नावात स्थिर राहणे.",
      ],
      en: [
        "Argala means removing the bolt. The hymn asks the Mother to clear obstacles and grant steadiness before the chapters begin.",
        "Read it as unlocking ego’s latch — success here means staying with the Name.",
      ],
    },
  },
  {
    id: 3,
    kind: "anga",
    adhyay: null,
    titleMr: "कीलकम्",
    titleEn: "Kilakam",
    kathaTitleMr: "कीलक",
    charitra: "anga",
    special: false,
    katha: {
      mr: [
        "कीलक म्हणजे ‘कील ठोकणे’ — पाठाला बळकटी. परंपरेत कवच-अर्गलानंतर कीलक वाचून मग देवीमाहात्म्याचे अध्याय सुरू होतात.",
        "हिंद एआय: कीलक म्हणजे संकल्पाची खूंटी. वाचन फक्त कानाला नाही — हृदयाला बांधून ठेवा.",
      ],
      en: [
        "Kilaka ‘pins’ the patha — after Kavacha and Argala, tradition begins the thirteen adhyayas of Devi Mahatmya.",
        "Hind AI: treat Kilaka as the peg of intention. Bind the hearing to the heart.",
      ],
    },
  },
  {
    id: 4,
    kind: "adhyay",
    adhyay: 1,
    titleMr: "मधु-कैटभ वध · प्रथम चरित्र",
    titleEn: "Madhu–Kaitabha · first carita",
    kathaTitleMr: "प्रथम चरित्र",
    charitra: "prathama",
    special: true,
    katha: {
      mr: [
        "मार्कण्डेय ऋषी राजा सुरथा आणि वैश्य समाधीला देवीमाहात्म्य सांगतात. विष्णूच्या योगनिद्रेत मधु-कैटभ ब्रह्म्याच्या तपाला त्रास देतात.",
        "योगनिद्रा / महामाया हीच देवी — ती जागी होते, असुरांचा नाश होतो. पहिले चरित्र म्हणजे: अज्ञान आणि अहंकाराच्या गाठी कापणाऱ्या शक्तीचे दर्शन.",
        "सार: देवी केवळ युद्धाची नाही — ती विष्णूच्या शांतीतील जागृती आहे.",
      ],
      en: [
        "Markandeya tells King Suratha and the merchant Samadhi the Devi Mahatmya. In Vishnu’s yoga-nidra, Madhu and Kaitabha harass Brahma’s tapas.",
        "Yoga-nidra / Mahamaya herself is the Goddess — she wakes, and the asuras fall. The first carita shows power that cuts ignorance and pride.",
        "Point: Devi is not only battlefield force — she is wakefulness inside Vishnu’s rest.",
      ],
    },
  },
  {
    id: 5,
    kind: "adhyay",
    adhyay: 2,
    titleMr: "महिषासुर उदय · मध्य चरित्र आरंभ",
    titleEn: "Rise of Mahisha · middle carita opens",
    kathaTitleMr: "महिष",
    charitra: "madhyama",
    special: false,
    katha: {
      mr: [
        "मध्य चरित्रात महिषासुर देवांना पराभूत करतो. देवांचे तेज एकत्र होऊन देवीचा रूप धारण करते — सिंहवाहिनी दुर्गा.",
        "ही कथा स्त्री-देवतेची ‘उत्पत्ती’ नाही; ती संयुक्त तेजाचे दर्शन आहे. वाचा: एकाकी अहंकाराविरुद्ध एकत्र शक्ती.",
      ],
      en: [
        "In the middle carita Mahisha defeats the gods. Their combined tejas becomes the Goddess — Durga on the lion.",
        "This is not a biography of a goddess’s birth; it is combined radiance. Read it as shared strength against solitary pride.",
      ],
    },
  },
  {
    id: 6,
    kind: "adhyay",
    adhyay: 3,
    titleMr: "महिषासुर युद्ध",
    titleEn: "War with Mahisha",
    kathaTitleMr: "संग्राम",
    charitra: "madhyama",
    special: false,
    katha: {
      mr: [
        "देवी आणि महिषाची लढाई विस्ताराने येते — आयुधे, सैन्य, माया. महिष रूप बदलतो; देवी स्थिर राहते.",
        "सार: बाह्य शत्रू बदलू शकतो, पण अंतर्यामीचा महिष म्हणजे अविद्या — त्याला नाव आणि धैर्याने सामोरे जा.",
      ],
      en: [
        "The war with Mahisha unfolds through weapons, armies, and illusion. He changes forms; the Goddess remains steady.",
        "Outer enemies shift shape; the inner Mahisha is avidya — meet it with Name and courage.",
      ],
    },
  },
  {
    id: 7,
    kind: "adhyay",
    adhyay: 4,
    titleMr: "महिषासुर वध · शक्रादि स्तुति",
    titleEn: "Fall of Mahisha · praise of the gods",
    kathaTitleMr: "विजय",
    charitra: "madhyama",
    special: true,
    katha: {
      mr: [
        "महिषाचा वध होतो; देवांची स्तुति सुरू होते. मध्य चरित्र येथे पूर्ण — विजय म्हणजे केवळ युद्धांत नाही, स्तवनातही.",
        "नवरात्रात हा भाग शक्ती-दिवसांशी जोडला जातो. हिंद एआय: विजयानंतर नम्रता — स्तुति हा विजयाचा भाग आहे.",
      ],
      en: [
        "Mahisha falls; the gods’ hymn begins. The middle carita closes — victory lives in praise as much as in battle.",
        "Navaratri often ties this arc to days of Shakti. Hind AI: after victory, humility — stuti is part of the win.",
      ],
    },
  },
  {
    id: 8,
    kind: "adhyay",
    adhyay: 5,
    titleMr: "शुम्भ-निशुम्भ · उत्तम चरित्र",
    titleEn: "Shumbha–Nishumbha · final carita",
    kathaTitleMr: "उत्तम चरित्र",
    charitra: "uttama",
    special: true,
    katha: {
      mr: [
        "उत्तम चरित्रात शुम्भ-निशुम्भ हिमालयात देवीचे रूप ऐकतात आणि दूत पाठवतात. देवी हसते — अहंकाराचे दूत हसण्याजोगे असतात.",
        "आरंभ: सौंदर्य आणि शक्ती एकत्र; मागणी म्हणजे ताबा — देवी म्हणते, जो जिंकेल तोच मला घेईल.",
      ],
      en: [
        "In the final carita Shumbha and Nishumbha hear of the Goddess in the Himalaya and send messengers. She laughs — pride’s envoys deserve laughter.",
        "Opening theme: beauty and power together; demand is control — she answers that only the one who wins may claim her.",
      ],
    },
  },
  {
    id: 9,
    kind: "adhyay",
    adhyay: 6,
    titleMr: "धूम्रलोचन वध",
    titleEn: "Fall of Dhumralochana",
    kathaTitleMr: "धूम्रलोचन",
    charitra: "uttama",
    special: false,
    katha: {
      mr: [
        "धूम्रलोचन देवीला बांधून आणायला येतो; हुंकाराने त्याचा नाश होतो. छोटा अध्याय, मोठा संदेश: क्रोधाचा धूर स्वच्छ नावाने फुटतो.",
        "वाचा: धूम्रलोचन म्हणजे धुंद दृष्टी — स्पष्ट नामस्मरणाने ती दूर होते.",
      ],
      en: [
        "Dhumralochana comes to bind the Goddess; her roar destroys him. A short chapter with a sharp lesson: rage-smoke clears before a clean Name.",
        "Read Dhumralochana as smoky sight — clear remembrance removes it.",
      ],
    },
  },
  {
    id: 10,
    kind: "adhyay",
    adhyay: 7,
    titleMr: "चण्ड-मुण्ड · चामुण्डा",
    titleEn: "Chanda–Munda · Chamunda",
    kathaTitleMr: "चामुण्डा",
    charitra: "uttama",
    special: true,
    katha: {
      mr: [
        "चण्ड-मुण्ड येतात; काली/चामुण्डा प्रकट होते. भीषण रूप म्हणजे हिंसा नाही — ते अत्याचाराच्या गाठी तोडणारे रूप आहे.",
        "परंपरा: चामुण्डा भीतीचे रूप दाखवून भीती संपवते. हिंद एआय: रागाला नाव द्या, त्याला आरशात बघा, मग सोडा.",
      ],
      en: [
        "Chanda and Munda arrive; Kali / Chamunda appears. Fierce form is not cruelty for its own sake — it cuts knots of oppression.",
        "Tradition: Chamunda ends fear by facing it. Hind AI: name the rage, see it, then release it.",
      ],
    },
  },
  {
    id: 11,
    kind: "adhyay",
    adhyay: 8,
    titleMr: "रक्तबीज वध",
    titleEn: "Fall of Raktabija",
    kathaTitleMr: "रक्तबीज",
    charitra: "uttama",
    special: true,
    katha: {
      mr: [
        "रक्तबीजाच्या प्रत्येक थेंबातून नवा असुर उगवतो. काली रक्त पान करते — बीज वाढू देत नाही. ही कथा रक्तपाताची नसून वासनेच्या पुनरावृत्तीची आहे.",
        "सार: जो दोष पुन्हा-पुन्हा उगवतो, त्याला फक्त दडपू नका — त्याचे बीज सुकवा. नाम आणि साक्षित्व हे कालीचे काम घरात करते.",
      ],
      en: [
        "Every drop of Raktabija sprouts a new asura. Kali drinks the blood so the seed cannot multiply — a story about repeating craving, not gore for its own sake.",
        "Point: what keeps regrowing must have its seed dried. Name and witness do Kali’s household work.",
      ],
    },
  },
  {
    id: 12,
    kind: "adhyay",
    adhyay: 9,
    titleMr: "निशुम्भ वध",
    titleEn: "Fall of Nishumbha",
    kathaTitleMr: "निशुम्भ",
    charitra: "uttama",
    special: false,
    katha: {
      mr: [
        "निशुम्भ युद्धात पडतो. शुम्भ एकटा राहतो — अहंकाराचा जोडीदार गेल्यावरही अहंकार लढतो.",
        "वाचा: नात्यातील दुष्ट जोडी सुटल्यावरही स्वतःचा शुम्भ उरतो; त्याला शेवटच्या अध्यायात सामोरे जा.",
      ],
      en: [
        "Nishumbha falls in battle. Shumbha remains alone — even after pride’s partner is gone, pride still fights.",
        "When a toxic pair breaks, one’s own Shumbha may remain; meet him in the last war.",
      ],
    },
  },
  {
    id: 13,
    kind: "adhyay",
    adhyay: 10,
    titleMr: "शुम्भ वध",
    titleEn: "Fall of Shumbha",
    kathaTitleMr: "शुम्भ",
    charitra: "uttama",
    special: true,
    katha: {
      mr: [
        "शुम्भाचा वध — उत्तम चरित्रातील युद्धांचा शेवट. देवी एकटी राहूनही पूर्ण आहे; सहयोगी शक्ती तिच्यात परत येतात.",
        "सार: अंतिम विजय बाह्य सैन्याचा नाही — एकाग्र शक्तीचा आहे. नवरात्र संपताना हा अध्याय स्मरणात ठेवा.",
      ],
      en: [
        "Shumbha falls — the last war of the final carita. The Goddess is complete even alone; attendant powers return into her.",
        "Final victory is not hired armies — it is gathered power. Remember this chapter as Navaratri closes.",
      ],
    },
  },
  {
    id: 14,
    kind: "adhyay",
    adhyay: 11,
    titleMr: "नारायणी स्तुति",
    titleEn: "Narayani Stuti",
    kathaTitleMr: "स्तुति",
    charitra: "uttama",
    special: true,
    katha: {
      mr: [
        "देवांची नारायणी स्तुति — अनेक नामे, एक शक्ती. स्तोत्र म्हणजे यादी नव्हे; प्रत्येक नाव एक गुण आणि एक प्रार्थना आहे.",
        "हिंद एआय: स्तुति वाचताना एक नाव निवडा आणि दिवसभर धरा. सप्तशतीचा हृदयमंच येथे आहे.",
      ],
      en: [
        "The gods’ Narayani Stuti — many names, one Shakti. The hymn is not a checklist; each name is a quality and a prayer.",
        "Hind AI: pick one name from the stuti and carry it through the day. This is the heart-stage of the Saptashati.",
      ],
    },
  },
  {
    id: 15,
    kind: "adhyay",
    adhyay: 12,
    titleMr: "फलश्रुति · देवीचे वचन",
    titleEn: "Phalashruti · the Goddess’s promise",
    kathaTitleMr: "फलश्रुति",
    charitra: "uttama",
    special: false,
    katha: {
      mr: [
        "फलश्रुतीत श्रवण-पठनाचे फळ सांगितले जाते. परंपरा आशीर्वाद देते — हिंद एआय वैद्यकीय किंवा आर्थिक हमी देत नाही.",
        "वाचा: फळ म्हणजे भीती कमी होणे, धैर्य वाढणे, आणि देवीच्या नावात विश्रांती.",
      ],
      en: [
        "Phalashruti names fruits of hearing and reciting. Tradition offers blessing — Hind AI does not promise medical or financial outcomes.",
        "Read ‘fruit’ as less fear, more courage, and rest in the Mother’s Name.",
      ],
    },
  },
  {
    id: 16,
    kind: "adhyay",
    adhyay: 13,
    titleMr: "सुरथ-समाधी · अनुग्रह",
    titleEn: "Suratha–Samadhi · grace",
    kathaTitleMr: "अनुग्रह",
    charitra: "uttama",
    special: true,
    katha: {
      mr: [
        "राजा सुरथ आणि वैश्य समाधी देवीच्या कृपेने आपापल्या मार्गावर परततात — राज्य आणि विरक्ती दोन्ही देवीच्या छत्राखाली.",
        "ग्रंथसमारोप: माहात्म्य ऐकून जीवन बदलते. हिंद एआय कथासार संपते इथे; पूर्ण संस्कृत सप्तशती मंत्रपाठ वेगळ्या सार्वजनिक-डोमेन स्रोतातून लवकरच थर-थर जोडता येईल.",
        "शेवटचा नमन: या देवी, नवरात्र आणि नित्यपाठ दोन्हीत राहा.",
      ],
      en: [
        "King Suratha and merchant Samadhi return to their paths by the Goddess’s grace — kingship and renunciation both under her canopy.",
        "Closing: hearing the Mahatmya changes a life. Hind AI’s katha-sar ends here; full Sanskrit mantra layers can arrive later from public-domain sources only.",
        "Final bow: Mother, stay in Navaratri and in ordinary days.",
      ],
    },
  },
];

export function getLeafById(id: LeafId): SaptashatiLeaf | undefined {
  return DURGA_SAPTASHATI_LEAVES.find((leaf) => leaf.id === id);
}

export function charitraLabel(charitra: Charitra): string {
  switch (charitra) {
    case "anga":
      return "Anga · पाठअंग";
    case "prathama":
      return "Prathama carita";
    case "madhyama":
      return "Madhyama carita";
    case "uttama":
      return "Uttama carita";
    default: {
      const _exhaustive: never = charitra;
      return _exhaustive;
    }
  }
}
