/**
 * Sample Scripture Data for Demo
 *
 * This file contains sample verses from various Indian scriptures
 * for demonstration purposes in the hackathon.
 */

import { Scripture, ScriptureVerse } from "@/types/scripture";

export const scriptures: Scripture[] = [
  {
    id: "bhagavad-gita",
    name: "Bhagavad Gita",
    sanskritName: "भगवद्गीता",
    category: "philosophy",
    description:
      "The Song of God - A 700-verse dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra",
    totalChapters: 18,
    language: "Sanskrit",
    approximateDate: "~400 BCE - 200 CE",
    author: "Vyasa (traditionally attributed)",
    keyConcepts: ["Karma Yoga", "Bhakti", "Jnana", "Dharma", "Moksha"],
  },
  {
    id: "rigveda",
    name: "Rigveda",
    sanskritName: "ऋग्वेद",
    category: "veda",
    description: "The oldest sacred text of Hinduism, containing hymns to various deities",
    totalChapters: 10,
    language: "Vedic Sanskrit",
    approximateDate: "~1500 - 1200 BCE",
    keyConcepts: ["Cosmology", "Hymns", "Rituals", "Nature Worship"],
  },
  {
    id: "yoga-sutras",
    name: "Yoga Sutras",
    sanskritName: "योगसूत्र",
    category: "philosophy",
    description: "196 aphorisms on the theory and practice of Yoga by Patanjali",
    totalChapters: 4,
    language: "Sanskrit",
    approximateDate: "~400 CE",
    author: "Patanjali",
    keyConcepts: ["Ashtanga Yoga", "Samadhi", "Chitta Vritti", "Ishvara"],
  },
];

export const sampleVerses: ScriptureVerse[] = [
  {
    id: "rv-1-1-1",
    scriptureId: "rigveda",
    chapter: 1,
    verse: 1,
    sanskrit: "अ॒ग्निमी॑ळे पुरोहितं य॒ज्ञस्य॑ देवमृत्विजम् |\nहोतारं रत्नधातमम् ||",
    transliteration: "agnim īḷe purohitaṃ yajñasya devam ṛtvijam |\nhotāraṃ ratna-dhātamam ||",
    translation: {
      en: "I praise Agni, the priest, the divine minister of the sacrifice, the invoker, the bestower of treasures.",
      hi: "मैं अग्नि की स्तुति करता हूं, जो पुरोहित, यज्ञ के देव, ऋत्विज, होता और रत्नों के दाता हैं।",
    },
    keyTerms: ["Agni", "Yajna", "Hotr"],
  },
  {
    id: "rv-1-1-2",
    scriptureId: "rigveda",
    chapter: 1,
    verse: 2,
    sanskrit: "अ॒ग्निः पूर्वे॑भि॒र्ऋषि॑भि॒रीड्यो॒ नूत॑नैरु॒त |\nस दे॒वाँ एह व॑क्षति ||",
    transliteration: "agniḥ pūrvebhir ṛṣibhir īḍyo nūtanair uta |\nsa devāṁ eha vakṣati ||",
    translation: {
      en: "Agni has been praised by the ancient seers and is now praised by the new ones; he will bring the gods here.",
      hi: "अग्नि को पूर्व ऋषियों ने स्तुत किया और नए भी करते हैं; वह देवों को यहाँ लाएगा।",
    },
    keyTerms: ["Agni", "Rishi", "Deva"],
  },
  {
    id: "rv-1-1-3",
    scriptureId: "rigveda",
    chapter: 1,
    verse: 3,
    sanskrit: "अ॒ग्निना॑ र॒यिम॑श्नव॒त् पोष॑मे॒व दि॒वेदि॑वे |\nय॒शसं॑ वी॒रव॑त्तमम् ||",
    transliteration: "agninā rayim aśnavat poṣam eva divedive |\nyaśasam vīravattamam ||",
    translation: {
      en: "Through Agni, one obtains wealth, prosperity every day, glorious and most heroic.",
      hi: "अग्नि के द्वारा धन प्राप्त होता है, प्रतिदिन समृद्धि, यशस्वी और सबसे वीरतापूर्ण।",
    },
    keyTerms: ["Agni", "Raya", "Vira"],
  },
  {
    id: "rv-1-1-4",
    scriptureId: "rigveda",
    chapter: 1,
    verse: 4,
    sanskrit: "अग्ने॒ यं य॒ज्ञम॑ध्व॒रं वि॒श्वत॑: परि॒भूरसि॑ |\nस इद् दे॒वेषु॑ गच्छति ||",
    transliteration: "agne yam yajñam adhvaram viśvataḥ paribhūrasi |\nsa id deveṣu gacchati ||",
    translation: {
      en: "Agni, you encompass this sacrifice from all sides; it goes to the gods.",
      hi: "अग्नि, तुम इस यज्ञ को सभी ओर से घेरते हो; यह देवों के पास जाता है।",
    },
    keyTerms: ["Agni", "Yajna", "Deva"],
  },
  {
    id: "rv-1-1-5",
    scriptureId: "rigveda",
    chapter: 1,
    verse: 5,
    sanskrit: "अ॒ग्निर्होता॑ क॒विक्र॑तुः स॒त्यश्चि॒त्रश्र॑वस्तमः |\nदे॒वो दे॒वेभि॒रा ग॑मत् ||",
    transliteration: "agnir hotā kavikratuḥ satyaś citraśravastamaḥ |\ndevo devebhir ā gamat ||",
    translation: {
      en: "Agni, the priest with wise intent, truthful and most splendidly famous, the god comes with the gods.",
      hi: "अग्नि, जो होता है बुद्धिमान कार्य वाला, सच्चा और सबसे प्रसिद्ध, देव देवों के साथ आता है।",
    },
    keyTerms: ["Agni", "Hotr", "Deva"],
  },
  {
    id: "rv-1-1-6",
    scriptureId: "rigveda",
    chapter: 1,
    verse: 6,
    sanskrit: "यद॒ङ्ग दा॒शुषे॒ त्वमग्ने॑ भ॒द्रं क॑रि॒ष्यसि॑ |\nतवेत् तत् स॒त्यम॑ङ्गिरः ||",
    transliteration: "yad aṅga dāśuṣe tvam agne bhadram kariṣyasi |\ntavet tat satyam aṅgiraḥ ||",
    translation: {
      en: "When you, Agni, will do good for the worshipper, that will be truly yours, O Angiras.",
      hi: "जब तुम, अग्नि, उपासक के लिए भला करोगे, वह सच तुम्हारा होगा, हे अंगिरस।",
    },
    keyTerms: ["Agni", "Dashusha", "Angiras"],
  },
  {
    id: "rv-1-1-7",
    scriptureId: "rigveda",
    chapter: 1,
    verse: 7,
    sanskrit: "उप॑ त्वाग्ने दि॒वेदि॑वे॒ दोषा॑वस्तर्धि॒या व॒यम् |\nनमो॒ भर॑न्त॒ एम॑सि ||",
    transliteration: "upa tvāgne divedive doṣāvastardhiyā vayam |\nnamo bharanta emasi ||",
    translation: {
      en: "To you, Agni, every day, in the evening, we come with our thoughts, offering obeisance.",
      hi: "तुम्हारे पास, अग्नि, प्रतिदिन, शाम को हम अपनी बुद्धि से आते हैं, नमस्कार अर्पित करते हैं।",
    },
    keyTerms: ["Agni", "Nama", "Dhi"],
  },
  {
    id: "rv-1-1-8",
    scriptureId: "rigveda",
    chapter: 1,
    verse: 8,
    sanskrit: "राज॑न्तमध्व॒राणां॑ गो॒पामृ॒तस्य॒ दीदि॑विम् |\nवर्ध॑मानं॒ स्वे दमे॑ ||",
    transliteration: "rājantam adhvarāṇām gopām ṛtasya dīdivim |\nvardhamānam sve dame ||",
    translation: {
      en: "Shining ruler of sacrifices, protector of truth, radiant, growing in his own house.",
      hi: "यज्ञों का चमकता राजा, सत्य का रक्षक, दीप्तिमान, अपने घर में बढ़ता हुआ।",
    },
    keyTerms: ["Raja", "Gopa", "Rita"],
  },
  {
    id: "rv-1-1-9",
    scriptureId: "rigveda",
    chapter: 1,
    verse: 9,
    sanskrit: "स न॑: पि॒तेव॑ सू॒नवे ऽग्ने॑ सूपाय॒नो भ॑व |\nसच॑स्वा नः स्व॒स्तये॑ ||",
    transliteration: "sa naḥ piteva sūnave agne sūpāyano bhava |\nsacasvā naḥ svastaye ||",
    translation: {
      en: "Be for us, Agni, like a father to his son, easy to approach, be with us for our well-being.",
      hi: "हमारे लिए, अग्नि, पुत्र के लिए पिता की तरह बनो, आसानी से पहुँचने योग्य, हमारे कल्याण के लिए हमारे साथ रहो।",
    },
    keyTerms: ["Agni", "Pita", "Svasti"],
  },
  {
    id: "rv-1-2-1",
    scriptureId: "rigveda",
    chapter: 1,
    verse: 1,
    sanskrit: "वाय॒वा या॑हि दर्शते॒मे सोमा॒ अरं॑कृताः |\nतेषां॑ पाहि श्रु॒धी हव॑म् ||",
    transliteration: "vāyavā yāhi darśatem e soma aramkṛtāḥ |\nteṣām pāhi śrudhī havam ||",
    translation: {
      en: "O Vayu, come here to see; these Somas are prepared. Drink of them, hear our call.",
      hi: "हे वायु, यहाँ देखने के लिए आओ; ये सोम तैयार हैं। उनसे पीओ, हमारे आह्वान को सुनो।",
    },
    keyTerms: ["Vayu", "Soma", "Hav"],
  },
  {
    id: "bg-2-48",
    scriptureId: "bhagavad-gita",
    chapter: 2,
    verse: 48,
    sanskrit:
      "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय |\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ||",
    transliteration:
      "yoga-sthaḥ kuru karmāṇi saṅgaṃ tyaktvā dhanañjaya |\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṃ yoga ucyate ||",
    translation: {
      en: "Be steadfast in the performance of your duty, O Arjuna, abandoning attachment to success and failure. Such equanimity is called Yoga.",
      hi: "हे धनंजय! योग में स्थित होकर कर्म करो और आसक्ति को त्याग दो, सिद्धि और असिद्धि में समान रहो। यही समत्व योग कहलाता है।",
    },
    keyTerms: ["Yoga", "Samatva", "Sanga"],
    relatedVerses: ["bg-2-47"],
  },
  {
    id: "ys-1-2",
    scriptureId: "yoga-sutras",
    chapter: 1,
    verse: 2,
    sanskrit: "योगश्चित्तवृत्तिनिरोधः",
    transliteration: "yogaś citta-vṛtti-nirodhaḥ",
    translation: {
      en: "Yoga is the cessation of the fluctuations of the mind.",
      hi: "योग चित्त के वृत्तियों का निरोध है।",
    },
    commentary:
      "This is the core definition of Yoga. Chitta refers to the mind-field, vrittis are the thought-waves or modifications, and nirodha means control or cessation. Yoga is not physical exercise but mental discipline.",
    keyTerms: ["Chitta", "Vritti", "Nirodha"],
    relatedVerses: ["ys-1-1", "ys-1-3"],
  },
  {
    id: "ys-2-1",
    scriptureId: "yoga-sutras",
    chapter: 2,
    verse: 1,
    sanskrit: "तपःस्वाध्यायेश्वरप्रणिधानानि क्रियायोगः",
    transliteration: "tapaḥ-svādhyāy-eśvara-praṇidhānāni kriyā-yogaḥ",
    translation: {
      en: "Accepting pain as help for purification, study of spiritual books, and surrender to the Supreme constitute Yoga in practice.",
      hi: "तप, स्वाध्याय और ईश्वरप्रणिधान - ये क्रिया योग हैं।",
    },
    keyTerms: ["Tapas", "Svadhyaya", "Ishvara Pranidhana"],
    relatedVerses: ["ys-2-2"],
  },
  {
    id: "rv-1-1-1",
    scriptureId: "rigveda",
    chapter: 1,
    verse: 1,
    sanskrit: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् |\nहोतारं रत्नधातमम् ||",
    transliteration: "agnim īḷe purohitaṃ yajñasya devam ṛtvijam |\nhotāraṃ ratna-dhātamam ||",
    translation: {
      en: "I praise Agni, the priest, the divine minister of the sacrifice, the invoker, the bestower of treasures.",
      hi: "मैं अग्नि की स्तुति करता हूं, जो पुरोहित, यज्ञ के देव, ऋत्विज, होता और रत्नों के दाता हैं।",
    },
    keyTerms: ["Agni", "Yajna", "Hotr"],
  },
  // Mandala 2 - Family Book (Grhyasutra)
  {
    id: "rv-2-1-1",
    scriptureId: "rigveda",
    chapter: 2,
    verse: 1,
    sanskrit: "अ॒ग्निं दू॒तं पुरो॑हितं हो॒तारं वेद॑सा सदम् |\nदे॒वेभि॒र्दे॒वो अ॑स्तु नः ||",
    transliteration: "agnim dūtam purohitaṃ hotāram vedasā sadam |\n devebhir devo astu naḥ ||",
    translation: {
      en: "Agni, the messenger, the priest, the invoker, seated with knowledge, may the god be with us among the gods.",
      hi: "अग्नि, दूत, पुरोहित, होता, ज्ञान के साथ बैठा, देवों में देव हमारे साथ हो।",
    },
    keyTerms: ["Agni", "Duta", "Veda"],
  },
  // Mandala 3 - Family Book (Visvamitra)
  {
    id: "rv-3-62-10",
    scriptureId: "rigveda",
    chapter: 3,
    verse: 62,
    sanskrit: "एकं सत् विप्रा बहुधा वदन्ति |\nअग्निं यमं मातरिश्वानमाहुः ||",
    transliteration: "ekaṃ sat viprā bahudhā vadanti |\nagniṃ yamaṃ mātariśvānām āhuḥ ||",
    translation: {
      en: "Truth is one, the wise call it by many names - Agni, Yama, Matarishvan.",
      hi: "सत्य एक है, विद्वान उसे कई नामों से बुलाते हैं - अग्नि, यम, मातरिश्वन।",
    },
    keyTerms: ["Sat", "Ekam", "Agni", "Yama"],
  },
  // Mandala 4 - Family Book (Vamadeva)
  {
    id: "rv-4-58-1",
    scriptureId: "rigveda",
    chapter: 4,
    verse: 58,
    sanskrit: "श्रेयो अन्तो अद्य देवेषु विश्वस्य हितम् |\nउषसो या जागृहि प्राणैः ||",
    transliteration: "śreyo anto adya deveṣu viśvasya hitam |\nuṣaso yā jāgṛhi prāṇaiḥ ||",
    translation: {
      en: "The ultimate good, today among the gods, the welfare of the world, which the dawn awakens with life.",
      hi: "परम कल्याण, आज देवों में, विश्व का हित, जिसे उषा प्राणों से जगाती है।",
    },
    keyTerms: ["Shreya", "Deva", "Usha", "Prana"],
  },
  // Mandala 5 - Family Book (Atri)
  {
    id: "rv-5-51-15",
    scriptureId: "rigveda",
    chapter: 5,
    verse: 51,
    sanskrit: "गायत्रेण प्रतिमुञ्चामि त्वमग्ने |\nसोम्येण च रासना इन्द्रियेण च ||",
    transliteration: "gāyatreṇa pratimun̄cāmi tvam agne |\nsomyena ca rāsanā indriyena ca ||",
    translation: {
      en: "I release you, Agni, with the Gayatri meter, with the Soma, with the Rasa, with the Indra.",
      hi: "मैं तुम्हें, अग्नि, गायत्री छंद से, सोम से, रस से, इन्द्र से मुक्त करता हूं।",
    },
    keyTerms: ["Gayatri", "Soma", "Rasa", "Indra"],
  },
  // Mandala 6 - Family Book (Bharadvaja)
  {
    id: "rv-6-75-16",
    scriptureId: "rigveda",
    chapter: 6,
    verse: 75,
    sanskrit: "यदा ते देवा अविश्रुता नामधेया |\nतदा त्वं विश्वतो मिमितो वृषा ||",
    transliteration: "yadā te devā aviśrutā nāmadheyā |\ntadā tvaṃ viśvato mimito vṛṣā ||",
    translation: {
      en: "When the gods, unhearing, had no names, then you, O Bull, were called from everywhere.",
      hi: "जब देव, जो न सुनते थे, नाम रहित थे, तब तुम, हे वृषभ, सब ओर से बुलाए गए।",
    },
    keyTerms: ["Deva", "Vrisha", "Nama"],
  },
  // Mandala 7 - Family Book (Vasistha)
  {
    id: "rv-7-32-26",
    scriptureId: "rigveda",
    chapter: 7,
    verse: 32,
    sanskrit: "अ॒ग्निर्मू॒र्धा दि॒वि श्रि॑यो॒ अन्त॑रिक्षे॒धः |\nपृ॒थि॒व्या॒मु॒ष्यो॒ रोच॑ना ||",
    transliteration: "agnir mūrdhā divi śriyo antarikṣedhaḥ |\npṛthivyāmuṣyo rocanā ||",
    translation: {
      en: "Agni is the head of heaven, the glory in the atmosphere, the light on earth.",
      hi: "अग्नि स्वर्ग का शीर्ष है, अंतरिक्ष की शोभा, पृथ्वी पर प्रकाश।",
    },
    keyTerms: ["Agni", "Divi", "Antariksha", "Prithivi"],
  },
  // Mandala 8 - Family Book (Kanva)
  {
    id: "rv-8-100-11",
    scriptureId: "rigveda",
    chapter: 8,
    verse: 100,
    sanskrit: "इन्द्रं वृषाभमृषभं गोपामृतस्य |\nप्रवोचन्ति स्वधावः सदस्थाः ||",
    transliteration: "indraṃ vṛṣābham ṛṣabham gopām ṛtasya |\npravocanti svadhāvaḥ sadasthāḥ ||",
    translation: {
      en: "They call Indra the bull among bulls, the protector of truth, the self-ruling one.",
      hi: "वे इन्द्र को बैलों में बैल, सत्य के रक्षक, स्वयंशासी कहते हैं।",
    },
    keyTerms: ["Indra", "Vrisha", "Gopa", "Rta"],
  },
  // Mandala 9 - Soma Book
  {
    id: "rv-9-113-7",
    scriptureId: "rigveda",
    chapter: 9,
    verse: 113,
    sanskrit: "सोमेन सोममभिप्र नयामि |\nराजन्तमध्वराणां गोपामृतस्य ||",
    transliteration: "somena somam abhipra nayāmi |\nrājantam adhvarāṇām gopām ṛtasya ||",
    translation: {
      en: "With Soma, I lead Soma, the ruler of sacrifices, the protector of truth.",
      hi: "सोम के साथ, मैं सोम का नेतृत्व करता हूं, यज्ञों का राजा, सत्य का रक्षक।",
    },
    keyTerms: ["Soma", "Raja", "Gopa", "Rta"],
  },
  // Mandala 10 - Late Book (includes Purusha Sukta)
  {
    id: "rv-10-90-1",
    scriptureId: "rigveda",
    chapter: 10,
    verse: 90,
    sanskrit:
      "पुरुषः सूक्तमिदासीत् पुरुषाणां विश्वकर्मा |\nतदांशुः पुरुषात् पादोऽस्य विश्वा भूतानि त्रिपादस्यामृतं दिवि ||",
    transliteration:
      "puruṣaḥ sūktam idāsīt puruṣāṇāṃ viśvakarmā |\ntadāṃśuḥ puruṣāt pādo'sya viśvā bhūtāni tripādasyāmṛtaṃ divi ||",
    translation: {
      en: "The Purusha (Cosmic Being) has a thousand heads, a thousand eyes, a thousand feet. He pervaded the earth on all sides and extended beyond it as far as ten fingers.",
      hi: "पुरुष के हजार सिर, हजार आँखें, हजार पैर हैं। उसने पृथ्वी को सभी ओर से घेरा और दस उंगलियों तक उससे आगे बढ़ा।",
    },
    keyTerms: ["Purusha", "Vishvakarma", "Tripada", "Amrita"],
  },
  {
    id: "rv-10-90-2",
    scriptureId: "rigveda",
    chapter: 10,
    verse: 90,
    sanskrit:
      "त्रिपादूर्ध्व उदैत्पुरुषः पादोऽस्येहाभवत् पुनः |\nततो विष्वङ्क्योऽक्रामत् सशनो अश्रुगात् प्रजापतिः ||",
    transliteration:
      "tripādūrdhva udait puruṣaḥ pādo'syehābhavat punaḥ |\ntato viśvaṅkryo 'krāmat saśano aśrugāt prajāpatiḥ ||",
    translation: {
      en: "Three-fourths of Purusha went upward, one-fourth remained here. From that, he spread in all directions, eating and not eating, Prajapati.",
      hi: "पुरुष का तीन-चौथाई ऊपर गया, एक-चौथाई यहाँ रहा। उससे, वह सभी दिशाओं में फैला, खाता और न खाता, प्रजापति।",
    },
    keyTerms: ["Purusha", "Prajapati", "Tripada"],
  },
  {
    id: "rv-10-129-1",
    scriptureId: "rigveda",
    chapter: 10,
    verse: 129,
    sanskrit:
      "नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् |\nकिमावरीवः कुह कुश्यस्त शर्मण्नम्भः किमासीद्गहनं गभीरम् ||",
    transliteration:
      "nāsadāsīn no sadāsīt tadānīṃ nāsīd rajo no vyoma paro yat |\nkim āvarīvaḥ kuha kusyad śarman nambhaḥ kim āsīd gahanam gabhīram ||",
    translation: {
      en: "There was neither non-existence nor existence then. There was neither the realm of space nor the sky which is beyond. What was covering? Where? In whose protection? Was there water, bottomlessly deep?",
      hi: "तब न अस्तित्व था, न अनस्तित्व। न अंतरिक्ष था, न उससे परे आकाश। क्या ढका था? कहाँ? किसकी रक्षा में? क्या पानी था, अतल गहरा?",
    },
    keyTerms: ["Sat", "Asat", "Rajas", "Vyoma"],
  },
  {
    id: "rv-10-129-2",
    scriptureId: "rigveda",
    chapter: 10,
    verse: 129,
    sanskrit:
      "न मृत्युरासीदमृतं न तर्हि न रात्र्या अह्न असीत्प्रकेत |\nआनीदवातं स्वधया तदेकं तस्माद्धान्यन्न परः किं चनास ||",
    transliteration:
      "na mṛtyur āsīd amṛtaṃ na tarhi na rātryā ahan asīt praket |\nānīdavātaṃ svadhayā tad ekaṃ tasmād dhānyan na paraḥ kiṃ canāsa ||",
    translation: {
      en: "There was neither death nor immortality then. There was no distinguishing sign of night nor of day. That One breathed, windless, by its own impulse. Other than that, there was nothing beyond.",
      hi: "तब न मृत्यु थी, न अमृतता। न रात का निशान, न दिन का। वह एक स्वयं से, वायरहित, सांस लेता था। उसके अलावा, कुछ भी नहीं था।",
    },
    keyTerms: ["Mrityu", "Amrita", "Ratri", "Ahan"],
  },
  {
    id: "rv-10-191-4",
    scriptureId: "rigveda",
    chapter: 10,
    verse: 191,
    sanskrit: "समाने जन्त्रे समाने चित्ते |\nसमाने मनसि विचिकित्तस्मिन् ||",
    transliteration: "samāne janṭre samāne citte |\nsamāne manasi vicikitsasmin ||",
    translation: {
      en: "With common purpose, with common mind, with common thought, in common deliberation.",
      hi: "समान उद्देश्य से, समान चित्त से, समान विचार से, समान विचार-विमर्श में।",
    },
    keyTerms: ["Samana", "Jantra", "Chitta", "Manas"],
  },
];

/**
 * Get verses by scripture ID
 */
export function getVersesByScripture(scriptureId: string): ScriptureVerse[] {
  return sampleVerses.filter((v) => v.scriptureId === scriptureId);
}

/**
 * Get a specific verse
 */
export function getVerse(
  scriptureId: string,
  chapter: number,
  verse: number
): ScriptureVerse | undefined {
  return sampleVerses.find(
    (v) => v.scriptureId === scriptureId && v.chapter === chapter && v.verse === verse
  );
}

/**
 * Search verses by query
 */
export function searchVerses(query: string): ScriptureVerse[] {
  const lowerQuery = query.toLowerCase();
  return sampleVerses.filter(
    (v) =>
      v.translation.en.toLowerCase().includes(lowerQuery) ||
      v.sanskrit.includes(query) ||
      v.transliteration.toLowerCase().includes(lowerQuery) ||
      v.keyTerms.some((term) => term.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Gemma 4 Function Calling Tools
 */

// Tool: Search for specific verses
export function searchVerse(query: string): ScriptureVerse[] {
  return searchVerses(query).slice(0, 5); // Return top 5 matches
}

// Tool: Find related verses
export function findRelated(scriptureId: string, chapter: number, verse: number): ScriptureVerse[] {
  const baseVerse = getVerse(scriptureId, chapter, verse);
  if (!baseVerse) return [];

  // Find verses with similar keywords
  const related = sampleVerses.filter(
    (v) =>
      v.scriptureId !== scriptureId && v.keyTerms.some((term) => baseVerse.keyTerms.includes(term))
  );

  return related.slice(0, 3);
}

// Tool: Explain Sanskrit text
export function explainSanskrit(text: string): {
  transliteration: string;
  meaning: string;
  context: string;
} {
  // Simple mapping for demo - in production would use more sophisticated analysis
  const sanskritTerms: Record<
    string,
    { transliteration: string; meaning: string; context: string }
  > = {
    कर्म: {
      transliteration: "karma",
      meaning: "action, work, deed",
      context: "The law of cause and effect in Hindu philosophy",
    },
    योग: {
      transliteration: "yoga",
      meaning: "union, discipline",
      context: "Path to spiritual liberation through various practices",
    },
    धर्म: {
      transliteration: "dharma",
      meaning: "duty, righteousness, law",
      context: "Moral and ethical order that sustains society",
    },
    मोक्ष: {
      transliteration: "moksha",
      meaning: "liberation, freedom",
      context: "Release from the cycle of rebirth",
    },
    आत्मा: {
      transliteration: "atman",
      meaning: "soul, self",
      context: "The true self beyond physical form",
    },
  };

  // Check if text matches any known term
  for (const [sanskrit, explanation] of Object.entries(sanskritTerms)) {
    if (text.includes(sanskrit)) {
      return explanation;
    }
  }

  // Fallback
  return {
    transliteration: text, // Simplified - would use proper transliteration library
    meaning: "Sanskrit term",
    context: "Ancient Indian language term used in spiritual texts",
  };
}
