import type { ChapterKatha, ChapterId, ShivlilamritChapter } from "./catalog";
import { SHIVLILAMRIT_CHAPTERS } from "./catalog";

export type PothiKind = "front" | "adhyay" | "back";

export interface PothiEntry {
  slug: string;
  kind: PothiKind;
  titleMr: string;
  titleEn: string;
  chapterId?: ChapterId;
}

export interface ExtraLeaf {
  slug: string;
  titleMr: string;
  titleEn: string;
  katha: ChapterKatha;
  verses: string[];
}

const extra = (
  slug: string,
  titleMr: string,
  titleEn: string,
  mr: string[],
  en: string[],
  verses: string[] = []
): ExtraLeaf => ({
  slug,
  titleMr,
  titleEn,
  katha: { mr, en },
  verses,
});

/**
 * Front/back leaves mapped from the photographed Kathasar अनुक्रमणिका
 * (Dharmik Prakashan 2024 paperback: ~327 printed pages / 170 camera spreads).
 * Wording here is original Hind AI + public-domain stotras — not the 2024 compiler's prose.
 */
export const POTHI_EXTRAS: ExtraLeaf[] = [
  extra(
    "nityapath",
    "नित्यपाठ व पारायणविधि",
    "How to read this pothi",
    [
      "छापील कथासारच्या सुरुवातीला नित्यपाठ व पारायणविधि आहे. ही पोथी पंधरा अध्याय आहे. सकाळी स्नान, ॐ नमः शिवाय, भस्म किंवा चंदन, बिल्व, दीप — मग एक अध्याय. पंधरा दिवसांत पूर्ण ग्रंथ.",
      "पूर्ण ग्रंथ न जमल्यास शेवटच्या बेचाळीस ओव्या नित्य वाचा. अकरावा अध्याय श्रद्धेने वाचणे रुद्रपठाच्या पुण्याशी जोडले जाते. अध्यायानंतर रुद्राक्षमालेवर ॐ नमः शिवाय १०८ जप.",
      "सोमवार, त्रयोदशी, प्रदोष, शिवरात्र हे मुख्य दिवस. सप्ताह: सोमवार १–२, मंगळवार ३–४, बुधवार ५–६, गुरुवार ७–८, शुक्रवार ९–१०, शनिवार ११–१२, रविवार १३–१५.",
    ],
    [
      "The photographed book opens with daily-reading rules. Fifteen adhyays; one a day after bath, namah shivaya, ash or sandal, bel, and a lamp.",
      "If the whole grantha will not fit the day, recite the forty-two closing ovis. Adhyay 11 is kept beside Rudra recitation. After a chapter, 108 namah shivaya on a rudraksha mala.",
      "Monday, trayodashi, pradosha, Shivaratri. Saptah: Mon 1–2, Tue 3–4, Wed 5–6, Thu 7–8, Fri 9–10, Sat 11–12, Sun 13–15.",
    ]
  ),
  extra(
    "phalashruti",
    "अध्यायवार फलश्रुती",
    "What each adhyay is read for",
    [
      "छापील पोथीत अध्याय १ ते १५ ची फलश्रुती तक्त्यात आहे. येथे तो तक्ता शब्दशः नाही — तो संपादकाचा आहे. खाली श्रावण वाचकांसाठी तोच क्रम, मूळ भाषेत.",
      "१ पापक्षय. २ मनाने श्रवण, जुने दोष. ३ रात्रीच्या पहिल्या प्रहरी, भूतबाधा व गृहस्थधर्म. ४ दारिद्र्य व शत्रुभय, स्मरणशक्ती. ५ प्रदोषासोबत हरवलेले वैभव. ६ स्त्रियांच्या वाचनात पती-पुत्रायुष्य. ७ सन्मार्ग व सद्गुरु. ८ विजय व बंधनमुक्ती. ९ ऋण व पूर्वापर दोष. १० संतती. ११ रुद्रपाठासमान, दुःखनाश. १२ व्यसन-रोग-दारिद्र्य. १३ शिव-विष्णू भक्ती. १४ घरची शांती. १५ श्रद्धा, गुरुकृपा, वेदान्त सुगम.",
      "एक दिवसात पूर्ण पोथी — ऐहिक व पारमार्थिक दोन्ही, अशी परंपरा. हे श्रद्धेचे वचन आहे, वैद्यकीय दावा नाही.",
    ],
    [
      "The paperback prints a chapter-by-chapter fruit table. That table is the compiler’s. This page keeps the same fifteen-fold order in original words for Shravan readers.",
      "1 clearing of sin. 2 mental hearing. 3 first watch of night, household duty. 4 poverty and fear. 5 pradosha and lost honour. 6 women’s reading for the family’s life-span. 7 a true teacher. 8 victory. 9 old debts. 10 children. 11 equal to Rudra recitation. 12 addiction and illness. 13 Shiva-Vishnu bhakti. 14 a peaceful house. 15 faith and Vedanta made easier.",
      "Reading the whole pothi in one day is a traditional sankalpa, not a medical claim.",
    ]
  ),
  extra(
    "nitya-ovis",
    "नित्यपाठाच्या बेचाळीस ओव्या",
    "Forty-two daily ovis",
    [
      "छापील ग्रंथाच्या शेवटी नित्यपाठाच्या सुमारे बेचाळीस ओव्या आहेत. येथे श्रीधरस्वामींच्या पंधराव्या अध्यायातील शेवटच्या ओव्या दिल्या आहेत — सार्वजनिक परंपरेतील ओवी, २०२४ च्या गद्य कथासाराच्या नक्कल नाही.",
      "स्नानानंतर या ओव्या मोठ्याने वाचा. हा संक्षेप आहे; श्रावणात शक्य तो पूर्ण अध्याय वाचा.",
    ],
    [
      "The paperback closes with about forty-two ovis for daily use. Here you get the last ovis of Shridhar’s fifteenth adhyay — public-domain verse, not the 2024 Kathasar prose.",
      "Read them aloud after bath. They are a short path, not a reason to skip the full adhyay in Shravan.",
    ]
  ),
  extra(
    "jyotirlinga",
    "परिशिष्ट — बारा ज्योतिर्लिंग",
    "Twelve Jyotirlingas",
    [
      "छापील कथासारात बारा ज्योतिर्लिंगांची माहिती परिशिष्ट आहे. खाली पारंपरिक नावे — सोमनाथ, मल्लिकार्जुन, महाकाल, ॐकारेश्वर, केदार, भीमाशंकर, काशी विश्वनाथ, त्र्यंबकेश्वर, वैद्यनाथ, नागनाथ, रामेश्वर, घृष्णेश्वर.",
      "श्रावणात एका दिवशी एक ज्योतिर्लिंगाचे नामस्मरण करून अध्याय वाचा.",
    ],
    [
      "The paperback’s third appendix lists the twelve Jyotirlingas. The names below are the traditional set.",
      "In Shravan, remember one linga a day while you read.",
    ],
    [
      "सौराष्ट्रे सोमनाथं च श्रीशैले मल्लिकार्जुनम्",
      "उज्जयिन्यां महाकालम् ॐकारममलेश्वरम्",
      "पर्ल्यां वैद्यनाथं च डाकिन्यां भीमशंकरम्",
      "सेतुबंधे तु रामेशं नागेशं दारुकावने",
      "वाराणस्यां तु विश्वेशं त्र्यंबकं गौतमीतटे",
      "हिमालये तु केदारं घुश्मेशं च शिवालये",
      "एतानि ज्योतिर्लिंगानि सायं प्रातः पठेन्नरः",
      "सप्तजन्मकृतं पापं स्मरणेन विनश्यति",
    ]
  ),
  extra(
    "namavali",
    "श्रीशिव अष्टोत्तरशत नामावली",
    "108 names of Shiva",
    [
      "छापील पोथीच्या शेवटी अष्टोत्तरशत नामावली आहे. ही पारंपरिक नावे आहेत; प्रकाशनाची मांडणी कॉपी केलेली नाही.",
    ],
    [
      "The paperback prints a 108-name list at the back. These are the traditional names, not that publisher’s layout.",
    ],
    [
      "ॐ शिवाय नमः",
      "ॐ महेश्वराय नमः",
      "ॐ शंभवे नमः",
      "ॐ पिनाकिने नमः",
      "ॐ शशिशेखराय नमः",
      "ॐ वामदेवाय नमः",
      "ॐ विरूपाक्षाय नमः",
      "ॐ कपर्दिने नमः",
      "ॐ नीलकंठाय नमः",
      "ॐ शूलपाणये नमः",
      "ॐ त्रिलोचनाय नमः",
      "ॐ भस्मांगरागाय नमः",
      "ॐ महेशाय नमः",
      "ॐ गिरीशाय नमः",
      "ॐ मृत्युंजयाय नमः",
      "ॐ क्रतुध्वंसिने नमः",
      "ॐ दक्षिणामूर्तये नमः",
      "ॐ त्रिपुरान्तकाय नमः",
      "ॐ वृषवाहनाय नमः",
      "ॐ व्योमकेशाय नमः",
      "ॐ भीमप्रभवे नमः",
      "ॐ उमापतये नमः",
      "ॐ गंगाधराय नमः",
      "ॐ पशुपतये नमः",
      "ॐ संकराय नमः",
      "ॐ साम्बाय नमः",
      "ॐ सदाशिवाय नमः",
      "ॐ रुद्राय नमः",
      "ॐ विश्वेश्वराय नमः",
    ]
  ),
  extra(
    "aarti",
    "शंकराची आरती",
    "Shankar aarti",
    [
      "छापील पुस्तकात शंकराची आरती परिशिष्टात आहे. येथे महाराष्ट्रात गाजली जाणारी सार्वजनिक आरती आहे.",
    ],
    [
      "The paperback prints a Shiva aarti in the back matter. This is the public Maharashtrian aarti, not a scan of that page.",
    ],
    [
      "जय शिव ओंकारा, ॐ जय शिव ओंकारा । ब्रह्मा विष्णु सदाशिव, अर्द्धांगी धारा ॥",
      "एकानन चतुरानन पंचानन राजे । हंसासन गरुड़ासन वृषवाहन राजे ॥",
      "दो भुज चार चतुर्भुज दस भुज अति सोहे । त्रिगुण रूप निरखत त्रिभुवन जन मोहे ॥",
      "अक्षमाला वनमाला मुण्डमाला धारी । चन्दन मृगमद सोहै भाले शशिधारी ॥",
      "श्वेताम्बर पीताम्बर बाघम्बर अंगे । ब्रह्मादिक सनकादिक भूतादिक संगे ॥",
      "कर के मध्य कमण्डल चक्र त्रिशूलधारी । सुखकारी दुखहारी जगपालन कारी ॥",
      "ॐ जय शिव ओंकारा । ब्रह्मा विष्णु सदाशिव, अर्द्धांगी धारा ॥",
    ]
  ),
  extra(
    "manas-puja",
    "शिवमानसपूजा",
    "Mental worship of Shiva",
    [
      "आदि शंकराचार्यांची मानसपूजा सार्वजनिक स्तोत्र आहे. छापील कथासारच्या शेवटी ती छापलेली आहे; येथे मूळ संस्कृत ओळी.",
    ],
    [
      "Shankara’s manasa puja is a public-domain stotra printed at the back of the paperback. The Sanskrit here is the traditional hymn.",
    ],
    [
      "रत्नैः कल्पितमासनं हिमजलैः स्नानं च दिव्याम्बरम्",
      "नानारत्नविभूषितं मृगमदामोदाङ्कितं चन्दनम्",
      "जातीचम्पकबिल्वपत्ररचितं पुष्पं च धूपं तथा",
      "दीपं देव दयानिधे पशुपते हृत्कल्पितं गृह्यताम्",
    ]
  ),
  extra(
    "daridrya",
    "दारिद्र्यदुःखदहन शिवस्तोत्रम्",
    "Stotra that burns the sorrow of want",
    ["वसिष्ठ-प्रोक्त दारिद्र्यदहन स्तोत्र सार्वजनिक आहे. छापील पुस्तकात ते परिशिष्टात येते."],
    [
      "The Daridrya-duhkha-dahana stotra is a public Sanskrit hymn; the paperback reprints it in the appendix.",
    ],
    [
      "विश्वेश्वराय नरकार्णवतारणाय कर्णामृताय शशिशेखराधरणाय",
      "कर्पूरकान्तिधवलाय महाप्रभवाय दारिद्र्यदुःखदहनाय नमः शिवाय",
      "गौरीप्रियाय रजनीशकलाधराय कालान्तकाय भुजगाधिपकङ्कणाय",
      "गङ्गाधराय गजराजविमर्दनाय दारिद्र्यदुःखदहनाय नमः शिवाय",
    ]
  ),
  extra(
    "raksha",
    "शिवरक्षास्तोत्रम्",
    "Shiva raksha stotra",
    [
      "याज्ञवल्क्यप्रोक्त शिवरक्षास्तोत्र सार्वजनिक आहे. छापील कथासारच्या शेवटच्या पानांवर ते संपूर्ण छापले आहे.",
    ],
    ["Yajnavalkya’s Shiva-raksha stotra is public domain. The photographed book ends with it."],
    [
      "चरितं देवदेवस्य महादेवस्य पावनम्",
      "अपारं परमोदारं चतुर्वर्गस्य साधनम्",
      "येनेदं पठितं नित्यं शिवरात्रौ विशेषतः",
      "दुःस्वप्नं दुर्निमित्तं च न भवेन्नात्र संशयः",
      "इति श्रीयाज्ञवल्क्यप्रोक्तं शिवरक्षास्तोत्रं संपूर्णम्",
    ]
  ),
];

export function listPothi(): PothiEntry[] {
  const front: PothiEntry[] = [
    { slug: "nityapath", kind: "front", titleMr: "नित्यपाठ व पारायणविधि", titleEn: "How to read" },
    { slug: "phalashruti", kind: "front", titleMr: "फलश्रुती", titleEn: "Fruits of reading" },
  ];
  const adhyays: PothiEntry[] = SHIVLILAMRIT_CHAPTERS.map((chapter: ShivlilamritChapter) => ({
    slug: String(chapter.id),
    kind: "adhyay" as const,
    titleMr: chapter.titleMr,
    titleEn: chapter.titleEn,
    chapterId: chapter.id,
  }));
  const back: PothiEntry[] = POTHI_EXTRAS.filter(
    (item) => item.slug !== "nityapath" && item.slug !== "phalashruti"
  ).map((item) => ({
    slug: item.slug,
    kind: "back" as const,
    titleMr: item.titleMr,
    titleEn: item.titleEn,
  }));
  return [...front, ...adhyays, ...back];
}

export function getExtra(slug: string): ExtraLeaf | undefined {
  return POTHI_EXTRAS.find((item) => item.slug === slug);
}

export function neighborSlugs(slug: string): { prev?: PothiEntry; next?: PothiEntry } {
  const all = listPothi();
  const index = all.findIndex((item) => item.slug === slug);
  if (index < 0) {
    return {};
  }
  return {
    prev: index > 0 ? all[index - 1] : undefined,
    next: index < all.length - 1 ? all[index + 1] : undefined,
  };
}
