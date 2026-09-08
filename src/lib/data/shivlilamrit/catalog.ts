export const CHAPTER_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const;

export type ChapterId = (typeof CHAPTER_IDS)[number];

export type ReaderTheme = "mandir" | "paper" | "sepia" | "night";

export type ReaderLocale = "mr" | "hi" | "en" | "roman";

export interface ChapterKatha {
  mr: string[];
  hi?: string[];
  en: string[];
}

export interface ShivlilamritChapter {
  id: ChapterId;
  titleMr: string;
  titleEn: string;
  kathaTitleMr: string;
  shravan: string;
  saptahDay: string;
  special: boolean;
  katha: ChapterKatha;
}

export const SHIVLILAMRIT_SOURCE_NOTE = {
  composer: "संत श्रीधर स्वामी नाझरेकर",
  year: "१७१८ (बारामती, काशी विश्वेश्वर परिसर)",
  metre: "ओवी",
  root: "स्कंद पुराण — ब्रह्मोत्तर खंड, काही भाग लिंग व शिव पुराण",
  oviCountNote: "पारंपरिक गणना चौदा अध्यायांत सुमारे २४५३ ओव्या; पंधरावा अध्याय सार/कवी-निवेदन म्हणून ग्रंथपारायणात वाचला जातो.",
} as const;

/**
 * Photographed 2024 Kathasar (Thakur / Dharmik Prakashan) is reference-only.
 * Site text: public-domain Shridhar ovis + original Hind AI katha-sar.
 */
export const SHIVLILAMRIT_CHAPTERS: ShivlilamritChapter[] = [
  {
    id: 1,
    titleMr: "शिवमाहात्म्य व दाशार्ह राजाचा उद्धार",
    titleEn: "Shiva’s greatness and King Dasharha",
    kathaTitleMr: "पंचाक्षरी मंत्राने राजोद्धार",
    shravan: "पहिल्या सोमवारी अध्याय १. पंचाक्षरी जपाने पारायण सुरू करा.",
    saptahDay: "सोमवार",
    special: false,
    katha: {
      mr: [
        "श्रीधरस्वामी गणेश, शारदा आणि गुरुवंदनानंतर शिवाच्या निर्गुण-सगुण रूपाचे स्तवन करतात. ओवी स्कंदपुराणातील ब्रह्मोत्तर कथेला मराठीत आणते.",
        "दाशार्ह राजा काम व राज्याभिमानाने अधोगतीकडे जातो. पंचाक्षरी उपासक कलावतीच्या संगतीने त्याला आपले पाप कळते. गर्गमुनींकडून शिवदीक्षा घेऊन तो पंचाक्षरी जपतो आणि उद्धार पावतो.",
        "अध्यायाचा सार: शिव केवळ मंदिरात नाही — नाम, गुरु आणि पश्चात्ताप हेच द्वार आहे."
      ],
      en: [
        "Shridhar opens with homage to Ganesha, Sharada, and the guru, then praises Shiva beyond and within form. The ovis retell the Brahmottara khanda in Marathi.",
        "King Dasharha falls through desire and pride. Meeting Kalavati, a Panchakshari devotee, he sees his own sin, takes Shiva-diksha from Gargamuni, and is lifted by the five-syllable name.",
        "The chapter’s point is simple: the door is the Name, a teacher, and honest repentance.",
      ],
    },
  },
  {
    id: 2,
    titleMr: "पारधी आख्यान व माघी शिवरात्र",
    titleEn: "The hunter’s story and Magha Shivaratri",
    kathaTitleMr: "अज्ञानानेही झालेले शिवपूजन",
    shravan: "माघ कृष्ण चतुर्दशी / महाशिवरात्रीला हा अध्याय श्रवण करा.",
    saptahDay: "सोमवार",
    special: false,
    katha: {
      mr: [
        "व्याध किंवा पारधी रात्री बिल्ववृक्षावर चढून शिकारीची वाट पाहतो. पाने खाली पडतात, पाणी झिरपते — नकळत शिवलिंगाची पूजा घडते.",
        "त्या एका जागरणाने त्याचे पूर्वदोष नाहीसे होतात. शिवरात्रीचा महिमा येथे ‘हेतू नसतानाही श्रद्धेचे फळ’ असा सांगितला आहे.",
        "श्रावणात हा पाठ शिकवतो: नियम, बिल्व, जागरण — आणि दया.",
      ],
      en: [
        "A hunter waits in a bel tree. Leaves and water fall on a linga below. Without knowing it, he has kept a Shivaratri vigil.",
        "That unwitting worship burns his past. Magha Shivaratri is praised as fruit even when the mind did not plan puja.",
        "In Shravan the lesson is bel, vigil, and a softer heart toward every living being.",
      ],
    },
  },
  {
    id: 3,
    titleMr: "प्रियव्रत राजाची कथा, श्रीगोकर्णमहाबळेश्वर महात्म्य",
    titleEn: "King Priyavrata and Gokarna Mahabaleshwar",
    kathaTitleMr: "आत्मलिंग समुद्रतीरी स्थिर",
    shravan: "छापील पोथीत अध्याय तिसरा येथे सुरू होतो. गोकर्ण दर्शन मनात ठेवा.",
    saptahDay: "मंगळवार",
    special: false,
    katha: {
      mr: [
        "तुमच्या छापील कथासारात अध्याय तिसऱ्याचे शीर्षक प्रियव्रत राजा आणि श्रीगोकर्णमहाबळेश्वर आहे — वेबवरील काही याद्यांतील कल्मषपाद नाही.",
        "प्रियव्रत राजाची कथा आत्मलिंग व रावणाच्या उचलण्याच्या लीलेशी जोडली जाते. लिंग गोकर्णी महाबळेश्वर रूपाने स्थिर होते. पश्चिम समुद्राचे हे क्षेत्र ज्योतिर्लिंग-महिमा म्हणून वाचा.",
        "श्रावणात हा अध्याय तीर्थ म्हणून वाचा: शरीर गोकर्णी न गेले तरी नामाने क्षेत्र जवळ येते.",
      ],
      en: [
        "In the photographed Kathasar, adhyay 3 is Priyavrata and Gokarna Mahabaleshwar — not the web list that put Kalmashapada here.",
        "Priyavrata’s tale meets the Atmalinga and Ravana’s attempt to lift it. The linga stays as Mahabaleshwar on the western shore.",
        "Read it in Shravan as a pilgrimage of the name when the body cannot go to Gokarna.",
      ],
    },
  },
  {
    id: 4,
    titleMr: "चित्रसेन-कुमुद्वती, चंद्रसेन-श्रीकर",
    titleEn: "Chitrasena–Kumudvati; Chandrasena–Shrikar",
    kathaTitleMr: "प्रदक्षिणा आणि दांपत्यभक्ती",
    shravan: "मंदिरात किंवा घरी लिंगाला शांत प्रदक्षिणा करा.",
    saptahDay: "मंगळवार",
    special: false,
    katha: {
      mr: [
        "विमर्षण आणि कुमुद्वतीच्या कथेत शिवलिंगाची प्रदक्षिणा हा मुख्य उपाय आहे. यंत्र नाही, गर्व नाही — फक्त पावलांनी केलेले स्मरण.",
        "सार: शरीर फिरते तसे मनही शिवाभोवती फिरू द्या. श्रावणातील रोजची छोटी प्रदक्षिणा या अध्यायाचे साधे फळ आहे."
      ],
      en: [
        "The story of Vimarshana and Kumudvati turns on pradakshina — walking around the linga with a quiet mind.",
        "Let the mind circle Shiva as the feet do. A short daily circumambulation in Shravan is this chapter lived, not only read.",
      ],
    },
  },
  {
    id: 5,
    titleMr: "धर्मगुप्त आख्यान",
    titleEn: "The Dharmagupta narrative",
    kathaTitleMr: "प्रदोष व हरवलेले वैभव",
    shravan: "प्रदोषकाळी (त्रयोदशी संध्या) अध्याय ५ वाचा किंवा ऐका.",
    saptahDay: "बुधवार",
    special: false,
    katha: {
      mr: [
        "प्रदोष म्हणजे त्रयोदशीच्या संध्यकाळी शिवपूजा. सत्यरथ-इंदुमती आख्यान सांगते की दारिद्र्य, राज्यापहरण आणि अपमान यांवर प्रदोषव्रत कसे उत्तर देते.",
        "दीप, नैवेद्य, क्षमा आणि दांपत्य एकत्र बसून केलेले स्मरण — हा या अध्यायाचा घरगुती धर्म आहे.",
      ],
      en: [
        "Pradosha is Shiva worship at twilight on trayodashi. Satyaratha and Indumati show the vrat answering poverty and exile.",
        "Lamp, naivedya, forgiveness, and a couple sitting together: that is the household dharma of this chapter.",
      ],
    },
  },
  {
    id: 6,
    titleMr: "सिमंतिनी आख्यान",
    titleEn: "The Simantini narrative",
    kathaTitleMr: "सोमवार व्रताचे घर",
    shravan: "श्रावण सोमवार हा अध्याय वाचण्याचा मुख्य दिवस.",
    saptahDay: "बुधवार",
    special: false,
    katha: {
      mr: [
        "चित्रांगद-सिमंतिनी कथा सोमवार व्रताचा महिमा सांगते. उपवास केवळ अन्नाचा नसतो; तो वाणी आणि संगतीचाही असतो.",
        "श्रावणातील सोमवार: बिल्व, पंचाक्षरी, शांत भोजन किंवा उपवास, आणि या ओव्यांचे श्रवण. सिमंतिनीची श्रद्धा राज्याहून मोठी दाखवली आहे.",
      ],
      en: [
        "Chitrangada and Simantini teach the Monday vow. The fast is of speech and company, not only of food.",
        "Shravan Mondays: bel, Panchakshari, a quiet meal or fast, and these ovis. Simantini’s faith is drawn larger than a throne.",
      ],
    },
  },
  {
    id: 7,
    titleMr: "सुमेधा-सोमदत्त, मदन-पिंगला, सुमती-भद्रायू",
    titleEn: "Sumedha–Somadatta, Madana–Pingala, Sumati–Bhadrayu",
    kathaTitleMr: "पुत्रप्राप्ती आणि शिवभक्ती",
    shravan: "कुटुंबासोबत वाचन: व्रताचे फळ घरभर पसरावे.",
    saptahDay: "गुरुवार",
    special: false,
    katha: {
      mr: [
        "सुमेधा-मदन आणि सुमतीच्या कथा संतती, सत्य आणि शिवभक्ती एकत्र गुंफतात. भद्रायू आख्यानाची बीजे येथे पडतात.",
        "ग्रंथ सांगतो: मागितलेले फळ येते, पण फळापेक्षा भक्त-भाव टिकवणे कठीण आणि श्रेष्ठ.",
      ],
      en: [
        "Sumedha, Madana, and Sumati braid children, truth, and Shiva-bhakti. Bhadrayu’s longer tale is seeded here.",
        "Wishes may be granted; keeping devotion after the wish is harder, and higher.",
      ],
    },
  },
  {
    id: 8,
    titleMr: "भद्रायू आख्यान",
    titleEn: "The Bhadrayu narrative",
    kathaTitleMr: "राजपुत्राचे शिवपरीक्षण",
    shravan: "लांब कथा: एका बैठकीत शांतपणे वाचा.",
    saptahDay: "गुरुवार",
    special: false,
    katha: {
      mr: [
        "भद्रायूच्या आयुष्यात राज्य, विरह, युद्ध आणि शिवकृपा एकामागून एक येतात. श्रीधर ओवीत चित्रदर्शी वर्णन करतात, म्हणून हा अध्याय कीर्तनसत्रासारखा वाटतो.",
        "सार: संकट काळ शिवभक्ती तपासतो; नाम सोडू नये.",
      ],
      en: [
        "Bhadrayu walks through kingship, separation, battle, and grace. Shridhar’s pictures make the chapter feel like a kirtan night.",
        "Crisis tests bhakti. The instruction is not to drop the Name.",
      ],
    },
  },
  {
    id: 9,
    titleMr: "ब्रह्मराक्षस, ब्राह्मण व शबर दांपत्य उद्धार",
    titleEn: "Brahmarakshasa, and the Shabara couple",
    kathaTitleMr: "भस्मधारणा आणि अस्पृश्य भक्ती",
    shravan: "विभूती धारण करणारे हा अध्याय विशेष मानीत.",
    saptahDay: "शुक्रवार",
    special: false,
    katha: {
      mr: [
        "वामदेव आणि ब्रह्मराक्षस कथा भस्म-महिमा उघडते: राख अहंकार जाळते. शबर पती-पत्नीच्या भक्तीने श्रीधर दाखवतात की जात नाही, भाव आहे.",
        "श्रावणात भस्म म्हणजे नाटक नव्हे; ते स्मशान-सत्य — सर्व देह एके दिवशी राख.",
      ],
      en: [
        "Vamadeva and the brahmarakshasa teach vibhuti: ash burns pride. The Shabara couple’s devotion is caste-blind in Shridhar’s telling.",
        "In Shravan, ash is not costume. It is the cremation-ground truth that every body returns to dust.",
      ],
    },
  },
  {
    id: 10,
    titleMr: "शारदा आख्यान",
    titleEn: "The Sharada narrative",
    kathaTitleMr: "गौरी-शंकर एक व्रत",
    shravan: "मंगळागौरी / उमामहेश्वर दिनी हा अध्याय.",
    saptahDay: "शुक्रवार",
    special: false,
    katha: {
      mr: [
        "शारदा आणि पद्मनाभ उमामहेश्वर व्रताने संसार व मोक्ष दोन्हीकडे वळतात. शिव-पार्वतीची जोडी येथे गृहस्थाश्रमाचा आदर्श आहे.",
        "स्त्री-पुरुष दोघेही व्रताचे अधिकारी — महाराष्ट्रातील शिवलीलामृत पारायणाची ही मोकळीक श्रीधर परंपरेत स्पष्ट आहे.",
      ],
      en: [
        "Sharada and Padmanabha turn toward both household life and liberation through the Umamaheshvara vow. Shiva-Parvati is the pattern for the home.",
        "Women and men both may read this grantha. That openness is part of why Maharashtra kept the parayan alive.",
      ],
    },
  },
  {
    id: 11,
    titleMr: "रुद्राक्ष-माहात्म्य, भद्रसेन आख्यान",
    titleEn: "Rudraksha mahatmya and Bhadrasen",
    kathaTitleMr: "अकरावा — श्रवणाचा हृदय-अध्याय",
    shravan: "एकादशी, प्रदोष, महाशिवरात्री किंवा श्रावण सोमवारी अध्याय ११ तीनदा श्रवण करण्याची प्रथा आहे.",
    saptahDay: "शनिवार",
    special: true,
    katha: {
      mr: [
        "श्रीधर स्वामींनी अकराव्याला रुद्र-अध्याय मानले. सूत शौनकांना सांगतात: रुद्राक्ष व भस्म धारण करणारे त्रिजगतात धन्य. सहस्र रुद्राक्ष, दंडीवर सोळा-सोळा, शिखेत एक, मनगटी बारा, कंठी बत्तीस, मस्तकी चोवीस, कर्णी सहा, गळ्यात १०८ — हे पारंपरिक धारणविधान ओव्यांत येते. एकमुखी पूज्य; पंच, षट्, अष्ट व चतुर्दशमुखांचे फल श्रुति-पुराणपरंपरेतील आहे.",
        "काश्मीरचा राजा भद्रसेन आणि त्याचा प्रधान पुण्यात्मे. राजपुत्र सुधर्म व प्रधानपुत्र तारक लहानपणीच वस्त्र-आभूषण टाकून रुद्राक्ष-भस्म घेतात, शिवलीलामृत ऐकतात. राजे चिंता करतात: हे राज्य कसे सांभाळतील? कुलगुरू पराशर येतात आणि पूर्वजन्म सांगतात.",
        "नंदिग्रामी महानंदा — वेश्या म्हणून गणली जाते, पण पतिव्रता, सोमवार-प्रदोष-शिवरात्र, अन्नछत्र, श्रावणात कोटी लिंगपूजा. ती कुक्कुट व मर्कट पाळते, गळ्यात रुद्राक्ष बांधते, नृत्यागारात लिंग ठेवून शिवलीलामृत गाते. शिव सौदागर वेषाने येतो, दिव्य कंकण व लिंग देतो. अग्नी लागताच ती पशूंना सोडते; लिंग जळाले असे वाटताच सौदागर अग्निप्रवेश करतो, महानंदा सर्व दान करून त्याच्यामागे उडी घेते. शिव प्रगट होतात.",
        "कुक्कुट-मर्कट वनात जातात, पुढे सुधर्म-तारक होतात — म्हणून मुले रुद्राक्ष सोडत नाहीत. अकराव्याचे श्रवण रुद्रपठाच्या पुण्याशी जोडले जाते. श्रावणात हा अध्याय विशेषतः स्त्रिया, व्यापारी, कलाकार आणि ‘मी पात्र नाही’ वाटणाऱ्या सर्वांसाठी लिहिला आहे: महानंदाची पात्रता तिच्या दान, जागर व लिंगप्रेमात होती.",
      ],
      en: [
        "Shridhar treats the eleventh as the Rudra chapter. Suta tells Shaunaka: those who wear rudraksha and vibhuti are blessed. The ovis list traditional wearing — thousands, sixteen per staff, one in the shikha, twelve on the wrist, thirty-two at the throat, twenty-four around the head, six at the ears, a 108-bead mala — and praise one-faced beads and other mukhis as the Puranas do.",
        "In Kashmir, King Bhadrasen and his minister have sons, Sudharma and Tarak, who throw off jewels for rudraksha and ash and listen to Shivlilamrit. The fathers worry about the throne. Kulaguru Parashara arrives and tells the previous life.",
        "In Nandigrama, Mahananda is counted a courtesan yet lives as a pativrata: Monday, Pradosha, Shivaratri, feeding halls, crores of lingas in Shravan. She keeps a rooster and a monkey, ties rudraksha on them, and sings this very grantha before a linga in her dance-hall. Shiva comes as a merchant with a bracelet and a blazing linga. Fire tests her: she frees the animals; when the linga seems lost the merchant enters the fire and she gives away her wealth and follows. Shiva appears.",
        "The birds-and-beasts become the two princes — which is why the boys will not remove rudraksha. Hearing adhyay 11 is classically linked to the merit of Rudra recitation. Shravan keeps this chapter for anyone who thinks they are ‘unfit’: Mahananda’s fitness was gift, vigil, and love of the linga.",
      ],
    },
  },
  {
    id: 12,
    titleMr: "बहुला उद्धार, भस्मासुर-वध",
    titleEn: "Bahula’s deliverance and the fall of Bhasmasura",
    kathaTitleMr: "गाय, सत्य, भस्म",
    shravan: "अहिंसा आठवण: बहुला गायेच्या कथेने दिन सुरू करा.",
    saptahDay: "शनिवार",
    special: false,
    katha: {
      mr: [
        "बहुला गाय आणि तिच्या रक्षकांची कथा सत्य व अहिंसेवर उभी आहे. भस्मासुराची कथा दाखवते की वरही अहंकाराला भस्म करतो.",
        "शिवाची राख देणारी आणि राखेने स्वतःला जाळणारी शक्ती एकच आहे — विवेकाने धारण करा.",
      ],
      en: [
        "Bahula the cow stands for truth and non-harm. Bhasmasura shows a boon that burns the proud.",
        "The same ash that marks a devotee can consume arrogance. Wear it with viveka.",
      ],
    },
  },
  {
    id: 13,
    titleMr: "दक्षयज्ञ, त्रिपुर, पार्वती-परिणय व स्कंद",
    titleEn: "Daksha’s yajna, Tripura, the marriage, Skanda",
    kathaTitleMr: "क्रोध-यज्ञ ते कुमार",
    shravan: "श्रावण शुक्रवार / गौरी-शंकर कथा म्हणून हा अध्याय.",
    saptahDay: "रविवार",
    special: false,
    katha: {
      mr: [
        "दक्षाचा यज्ञ अहंकाराचा यज्ञ ठरतो. सती-लीला, त्रिपुरासुर संहार, हिमालयकन्या पार्वतीचा विवाह, स्कंद जन्म व तारकासुर — हे पुराणभार श्रीधर ओवीत सामावतात.",
        "घरगुती पाठ: अपमान सोसणे (दक्ष), काम जिंकणे (त्रिपुर), तपाने शिव मिळवणे (पार्वती), सेवेने शत्रु नाश (स्कंद).",
      ],
      en: [
        "Daksha’s sacrifice becomes a rite of pride. Sati, the burning of Tripura, Parvati’s marriage, Skanda, and Taraka fill the chapter.",
        "A household reading: swallow insult (Daksha), master desire (Tripura), win Shiva by tapas (Parvati), serve until the inner enemy falls (Skanda).",
      ],
    },
  },
  {
    id: 14,
    titleMr: "भिक्षेस पार्वती, श्रियाळ-चांगूणा सत्त्वपरीक्षा",
    titleEn: "Parvati as a beggar; Shriyal and Changuna",
    kathaTitleMr: "कठोर भक्तीची कसोटी",
    shravan: "पारायण समाप्तीच्या आधीचा भावपूर्ण अध्याय.",
    saptahDay: "रविवार",
    special: false,
    katha: {
      mr: [
        "पार्वती भिल्ल रूपाने भक्तांची परीक्षा पाहते. श्रियाळ-चांगूणा आख्यान महाराष्ट्रात अत्यंत प्रसिद्ध: पुत्रही शिवासाठी अर्पण, आणि शिव पुत्र परत देतात.",
        "हे क्रूर नाही — ‘सर्वस्व शिव’ या भावाने वाचले तर कथा करुणेची होते. मुलांना भीती दाखवू नका; भाव समजावून सांगा.",
      ],
      en: [
        "Parvati tests devotees as a Bhil woman. The Shriyal–Changuna story is famous in Maharashtra: a child offered, a child restored.",
        "Read it as ‘everything is Shiva’s,’ not as cruelty. Tell children the compassion, not the shock.",
      ],
    },
  },
  {
    id: 15,
    titleMr: "शंकराचार्य आख्यान, कवीचे निवेदन",
    titleEn: "Shankaracharya’s story and the poet’s dedication",
    kathaTitleMr: "उद्यापन व नित्यपाठ",
    shravan: "सप्ताहाच्या शेवटच्या रात्री किंवा सोमवारी पूर्ण ग्रंथाचे समर्पण.",
    saptahDay: "रविवार रात्र / उद्यापन",
    special: false,
    katha: {
      mr: [
        "पंधरावा अध्याय अनेक परंपरेत सार, शंकराचार्य-स्तव, फलश्रुती आणि श्रीधरांचे निवेदन म्हणून वाचला जातो. काही अभ्यासक म्हणतात तो नंतर जोडला; पारायणमात्र तो ग्रंथाचा शेवट मानते.",
        "वेळ नसताना ग्रंथाच्या शेवटी येणाऱ्या सुमारे बेचाळीस ओव्यांचे नित्यपठण पूर्ण पारायणाचे पुण्य देते, अशी महाराष्ट्रातील चाल आहे. पारायणानंतर ॐ नमः शिवाय १०८ जप व नैवेद्य — हे उद्यापन साधे ठेवा.",
      ],
      en: [
        "The fifteenth is read as essence, phalashruti, and Shridhar’s closing. Some historians treat it as later; parayan still ends here.",
        "When time is short, Maharashtra recites about forty-two closing ovis daily as a stand-in for the whole book. After the week: 108 namah shivaya and a simple naivedya.",
      ],
    },
  },
];

export const PARAYAN_METHODS = [
  {
    id: "shravan-15",
    title: "श्रावण पंधरा दिवस",
    titleEn: "Fifteen days of Shravan",
    body: "पंधरा दिवस, दररोज एक अध्याय. सोमवार १ पासून सुरू करणे सोईस्कर. अकरावा एकादशी किंवा प्रदोषाला तीनदा श्रवण करण्याची चाल आहे.",
    bodyEn: "One adhyay a day for fifteen days. Monday start is common. Adhyay 11 is often heard three times on ekadashi or pradosha.",
  },
  {
    id: "saptah",
    title: "सप्ताह पारायण",
    titleEn: "Seven-day parayan",
    body: "सोमवार १–२, मंगळवार ३–४, बुधवार ५–६, गुरुवार ७–८, शुक्रवार ९–१०, शनिवार ११–१२, रविवार १३–१४, रात्री १५ व उद्यापन. दीप तेवत ठेवा; मोठ्याने वाचन चालते.",
    bodyEn: "Mon 1–2 through Sun 13–14, chapter 15 at night, then udyapan. Keep a lamp; reading aloud is the custom.",
  },
  {
    id: "adhyay-11",
    title: "केवळ अकरावा",
    titleEn: "Adhyay 11 alone",
    body: "रोज अकरावा तीनदा, किंवा शिवरात्री/श्रावण सोमवार एकाग्र श्रवण. परंपरा म्हणते एकादश रुद्र प्रसन्न होतात — हे श्रद्धेचे वचन आहे, वैद्यकीय दावा नाही.",
    bodyEn: "Hear the eleventh three times daily, or once with full attention on Shivaratri or a Shravan Monday. Tradition links it to Rudra — faith, not a medical claim.",
  },
  {
    id: "nitya-42",
    title: "नित्य बेचाळीस ओव्या",
    titleEn: "Forty-two daily ovis",
    body: "पूर्ण ग्रंथ न जमल्यास शेवटच्या सुमारे ४२ ओव्या स्नानानंतर वाचा. हा संक्षेप आहे, पर्याय नाही की ग्रंथ वाचू नये.",
    bodyEn: "If the whole grantha will not fit the day, recite about forty-two closing ovis after a bath. This is a short path, not a reason to skip the book.",
  },
] as const;

export function isChapterId(value: number): value is ChapterId {
  return CHAPTER_IDS.includes(value as ChapterId);
}

export function getChapter(id: ChapterId): ShivlilamritChapter {
  const chapter = SHIVLILAMRIT_CHAPTERS.find((item) => item.id === id);
  if (!chapter) {
    throw new Error(`Unknown Shivlilamrit chapter ${id}`);
  }
  return chapter;
}

export function listChapterIds(): ChapterId[] {
  return [...CHAPTER_IDS];
}

export function readerThemeLabel(theme: ReaderTheme): string {
  switch (theme) {
    case "mandir":
      return "Mandir";
    case "paper":
      return "Paper";
    case "sepia":
      return "Sepia";
    case "night":
      return "Night";
    default: {
      const _exhaustive: never = theme;
      return _exhaustive;
    }
  }
}

export function readerLocaleLabel(locale: ReaderLocale): string {
  switch (locale) {
    case "mr":
      return "मराठी";
    case "hi":
      return "हिन्दी";
    case "en":
      return "English";
    case "roman":
      return "Roman";
    default: {
      const _exhaustive: never = locale;
      return _exhaustive;
    }
  }
}

export function speechLangForLocale(locale: ReaderLocale): string {
  switch (locale) {
    case "mr":
      return "mr-IN";
    case "hi":
      return "hi-IN";
    case "en":
      return "en-IN";
    case "roman":
      return "hi-IN";
    default: {
      const _exhaustive: never = locale;
      return _exhaustive;
    }
  }
}
