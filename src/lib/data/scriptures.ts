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
    id: "isha-1-3",
    scriptureId: "isha-upanishad",
    chapter: 1,
    verse: 3,
    sanskrit: "अ॒सु॒र्या॒ नाम॑ ते लो॒का अ॒न्धेना॑ तम॒सावृ॑ताः |\nताꣳस्ते॑ प्रे॒त्याभि॑गच्छ॒न्त्य॒ल्पमे॑धा॒सो जनाः॑ ||",
    transliteration: "asuryā nāma te lokā andhenā tamasāvṛtāḥ |\ntāṁs te pretyābhigacchanti alpamedhāso janāḥ ||",
    translation: {
      en: "Those worlds of the Asuras are enveloped in blinding darkness. Those people who are of little intelligence go to them after death.",
      hi: "असुरों के वे लोक अंधकार से आवृत हैं। जो लोग कम बुद्धि वाले हैं, वे मृत्यु के बाद उनमें जाते हैं।",
    },
    keyTerms: ["Asurya", "Loka", "Tamas"],
  },
  {
    id: "katha-1-2-18",
    scriptureId: "katha-upanishad",
    chapter: 1,
    verse: 18,
    sanskrit: "न जायते म्रियते वा विपश्चि॒न्नायं कुतश्चि॒न्न बभूव कश्चित् |\nअजो नित्यः शाश्वतोऽयं पुराणो॒ न हन्यते हन्यमाने शरीरे ||",
    transliteration: "na jāyate mriyate vā vipaścin nāyam kutaścin na babhūva kaścit |\najo nityaḥ śāśvato 'yam purāṇo na hanyate hanyamāne śarīre ||",
    translation: {
      en: "The wise one is not born nor dies. This one has not come from anywhere, has not become anyone. Unborn, eternal, everlasting, ancient, this one is not killed when the body is killed.",
      hi: "विपश्चित् न जन्म लेता है और न मरता है। यह कहीं से नहीं आया है, न कोई बना है। यह अजन्मा, नित्य, शाश्वत, पुरातन है। शरीर के मारे जाने पर भी यह नहीं मारा जाता।",
    },
    keyTerms: ["Vipashcit", "Aj", "Shashvat"],
  },
  {
    id: "katha-1-2-20",
    scriptureId: "katha-upanishad",
    chapter: 1,
    verse: 20,
    sanskrit: "अणोरणीयान्महतो महीया॑नात्मास्य जन्तो॒र्निहितो गुहायाम् |\nतमक्रतुः पश्यति वीतशोको॒ धातुप्रसादान्महिमानमात्मनः ||",
    transliteration: "aṇor aṇīyān mahato mahīyān ātmāsya jantor nihito guhāyām |\ntam akratuḥ paśyati vīta-śoko dhātu-prasādān mahimānam ātmanaḥ ||",
    translation: {
      en: "Smaller than the smallest, greater than the greatest, the Self of this being is placed in the heart of the creature. The one free from desire sees the majesty of the Self through the grace of the Creator, free from sorrow.",
      hi: "सबसे छोटे से भी छोटा, सबसे बड़े से भी बड़ा, इस जीव का आत्मा हृदय में स्थित है। इच्छाओं से मुक्त पुरुष रचयिता की कृपा से आत्मा की महिमा को देखता है, शोक से मुक्त होकर।",
    },
    keyTerms: ["Atman", "Mahiman", "Guhayam"],
  },
  {
    id: "katha-1-2-23",
    scriptureId: "katha-upanishad",
    chapter: 1,
    verse: 23,
    sanskrit: "न तत्र सूर्यो भाति न चन्द्रतारकं॒ नेमा विद्युतो भान्ति कुतोऽयमग्निः |\nतमेव भान्तमनुभाति सर्वं॒ तस्य भासा सर्वमिदं विभाति ||",
    transliteration: "na tatra sūryo bhāti na candra-tārakam nemā vidyuto bhānti kuto 'yam agniḥ |\ntam eva bhāntam anu-bhāti sarvam tasya bhāsā sarvam idaṃ vibhāti ||",
    translation: {
      en: "There the sun does not shine, nor the moon and stars, nor these lightnings, and much less this fire. Everything shines following that shining one; by its light all this shines.",
      hi: "वहाँ सूर्य नहीं चमकता, न चंद्रमा और तारे, न ये बिजलियाँ, और यह अग्नि तो दूर की बात। वह चमकता है और उसके अनुसरण में सब चमकता है। उसकी चमक से यह सब चमकता है।",
    },
    keyTerms: ["Bhasa", "Tejas", "Prakash"],
  },
  {
    id: "katha-2-1-1",
    scriptureId: "katha-upanishad",
    chapter: 2,
    verse: 1,
    sanskrit: "पराञ्चि खानि व्यतृणत्स्वयंभू॒स्तस्मात्पराङ्पश्यति नान्तरात्मन् |\nकश्चिद्धीरः प्रत्यगात्मानमैक्ष॒दावृत्तचक्षुरमृतत्वमिच्छन् ||",
    transliteration: "parāñci khāni vyatṛṇat svayambhūs tasmāt parāṅ paśyati nāntar-ātman |\nkaścid dhīraḥ pratyag-ātmānam aikṣad āvṛtta-cakṣur amṛtatvam icchan ||",
    translation: {
      en: "The Self-existent pierced the openings outward; therefore one looks outward, not at the inner Self. Some wise man, desiring immortality, with inverted eye looked at the inner Self.",
      hi: "स्वयंभू ने छिद्रों को बाहर की ओर भेदा; इसलिए मनुष्य बाहर देखता है, भीतर के आत्मा को नहीं। कोई बुद्धिमान पुरुष अमरत्व चाहकर, उल्टी हुई दृष्टि से भीतर के आत्मा को देखता है।",
    },
    keyTerms: ["Pratyag", "Atman", "Amritatva"],
  },
  {
    id: "katha-2-3-1",
    scriptureId: "katha-upanishad",
    chapter: 2,
    verse: 1,
    sanskrit: "द्वे विद्ये वेदितव्ये इति ह स्म यद्द्वे विद्ये वेदितव्ये |\nपराचैवापराऽप्युक्ता परा चैवापरा च ||",
    transliteration: "dve vidye veditavye iti ha sma yad dve vidye veditavye |\nparā caivāparāpy uktā parā caivāparā ca ||",
    translation: {
      en: "Two knowledges are to be known, they say-two knowledges are to be known: the higher and the lower. The higher and the lower are spoken of.",
      hi: "दो विद्याएँ जानने योग्य हैं, ऐसा कहा जाता है - दो विद्याएँ जानने योग्य हैं: परा और अपरा। परा और अपरा दोनों कही गई हैं।",
    },
    keyTerms: ["Para Vidya", "Apara Vidya", "Jnana"],
  },
  {
    id: "rv-2-1-1",
    scriptureId: "rigveda",
    chapter: 2,
    verse: 1,
    sanskrit: "अ॒ग्निमी॑ळे पु॒रोहि॑तं य॒ज्ञस्य॑ दे॒वमृत्विज॑म् |\nहोतारं॑ रत्न॒धात॑मम् ||",
    transliteration: "agnim īḷe purohitaṃ yajñasya devam ṛtvijam |\nhotāraṃ ratna-dhātamam ||",
    translation: {
      en: "I praise Agni, the priest, the divine minister of the sacrifice, the invoker, the bestower of treasures.",
      hi: "मैं अग्नि की स्तुति करता हूं, जो पुरोहित, यज्ञ के देव, ऋत्विज, होता और रत्नों के दाता हैं।",
    },
    keyTerms: ["Agni", "Yajna", "Hotr"],
  },
  {
    id: "rv-3-1-1",
    scriptureId: "rigveda",
    chapter: 3,
    verse: 1,
    sanskrit: "अ॒ग्निं नरो॒ दीधि॑तिभिररण्योर्हस्त॑च्युती जनयन्त प्रश॒स्तम् ||",
    transliteration: "agnim naro dīdhitibhir araṇyor hastacyutī janayanta praśastam ||",
    translation: {
      en: "Men with their insights generate the praised Agni from the forest with hand-held friction.",
      hi: "मनुष्य अपनी बुद्धि से हाथ से घर्षण करके वन से प्रसिद्ध अग्नि को उत्पन्न करते हैं।",
    },
    keyTerms: ["Agni", "Nara", "Araṇya"],
  },
  {
    id: "rv-4-1-1",
    scriptureId: "rigveda",
    chapter: 4,
    verse: 1,
    sanskrit: "अ॒ग्निं दू॒तं वृ॑णीमहे॒ होता॑रं विश्व॒वेद॑सम् |\nअ॒स्य य॒ज्ञस्य॑ सु॒क्रतुम् ||",
    transliteration: "agnim dūtam vṛṇīmahe hotāram viśva-vedasam |\nasya yajñasya sukrtum ||",
    translation: {
      en: "We choose Agni as messenger, the priest who knows all, the well-performer of this sacrifice.",
      hi: "हम अग्नि को दूत के रूप में चुनते हैं, जो सब कुछ जानने वाला होता है, इस यज्ञ का अच्छा कार्यकर्ता।",
    },
    keyTerms: ["Agni", "Duta", "Hotr"],
  },
  {
    id: "rv-5-1-1",
    scriptureId: "rigveda",
    chapter: 5,
    verse: 1,
    sanskrit: "प्र देवं॑ देव्या धिय॒ आ व॑ह॒ होता॑रं स॒य्याज्य॑म् ||",
    transliteration: "pra devam devyā dhiyā ā vaha hotāram syājyam ||",
    translation: {
      en: "Bring forward the divine priest with divine insight, worthy of being invoked together.",
      hi: "दिव्य बुद्धि के साथ दिव्य पुरोहित को आगे लाओ, जो साथ में आह्वान करने योग्य है।",
    },
    keyTerms: ["Deva", "Dhi", "Hotr"],
  },
  {
    id: "rv-6-1-1",
    scriptureId: "rigveda",
    chapter: 6,
    verse: 1,
    sanskrit:
      "अ॒ग्निं होता॑रं प्र॒वृणे॒ जना॑नां॒ होता॑रं विश्व॒वेद॑सम् |\nस हि ष्मा॒ राजा॒ कृपा॑वाँ ऋ॒तावा॑ ||",
    transliteration:
      "agnim hotāram pravṛṇe janānāṃ hotāram viśva-vedasam |\nsa hi ṣmā rājā kṛpāvāṁ ṛtāvā ||",
    translation: {
      en: "I choose Agni as the priest of peoples, the priest who knows all. For he is indeed the king, compassionate, and truthful.",
      hi: "मैं अग्नि को लोगों का पुरोहित चुनता हूं, जो सब कुछ जानने वाला पुरोहित है। क्योंकि वह वास्तव में राजा है, दयालु और सच्चा।",
    },
    keyTerms: ["Agni", "Hotr", "Raja"],
  },
  {
    id: "rv-7-1-1",
    scriptureId: "rigveda",
    chapter: 7,
    verse: 1,
    sanskrit:
      "मे॒धाति॑थिं धा॒न्यं१ वा॑सयिष्ट धे॒नुं च॒ विश्व॑दोगाम् |\nप्र॒जाव॑न्तं र॒यिं न॑शत् ||",
    transliteration:
      "medhātithiṃ dhānyam vā vayṣṭha dhenum ca viśva-dogām |\nprajāvantam rayim naśat ||",
    translation: {
      en: "May he settle the guest with grain, and the all-giving cow. May he obtain wealth with offspring.",
      hi: "वह अतिथि को धान्य के साथ बसाए, और सब कुछ देने वाली गाय को। वह संतान के साथ धन प्राप्त करे।",
    },
    keyTerms: ["Medhatithi", "Dhanya", "Raya"],
  },
  {
    id: "rv-8-1-1",
    scriptureId: "rigveda",
    chapter: 8,
    verse: 1,
    sanskrit:
      "इन्द्रं॒ म॒तिर॑हूय॒ग्मा दे॒वं मर्ता॑सो अ॒स्माकं॑ य॒ज्ञम् |\nअ॒स्माकं॑ वृत्र॒हन्त॑मं पु॒रां॒द॒रं श॑क्रमु॒त्थिषु॑ ||",
    transliteration:
      "indram matir ahūyagmā devaṃ martāso asmākam yajñam |\nasmākam vṛtra-hantamam purāṁ-daram śakram utthiṣu ||",
    translation: {
      en: "The hymn calls Indra, the god, our sacrifice. Our most Vritra-slaying, fort-destroying, mighty one in battles.",
      hi: "स्तुति इंद्र को बुलाती है, जो देव है, हमारा यज्ञ। हमारा सबसे वृत्र-वध करने वाला, गढ़ तोड़ने वाला, युद्धों में शक्तिशाली।",
    },
    keyTerms: ["Indra", "Vritra", "Shakra"],
  },
  {
    id: "rv-9-1-1",
    scriptureId: "rigveda",
    chapter: 9,
    verse: 1,
    sanskrit: "प्र सोमा॑सो मद॒च्युता॒ अत्य॑नूषत॒ पवि॑त्रा॒सः ।\nइन्दुं॒ विश्वा॒ अवी॑वृधन् ||",
    transliteration: "pra somāso mada-cyutā atyanūṣata pavitrāsaḥ |\nindum viśvā avīvṛdhan ||",
    translation: {
      en: "The Somas, not deprived of ecstasy, have surged forward through the filters. They have increased the drop everywhere.",
      hi: "सोम, जो आनंद से वंचित नहीं हैं, पवित्रों के माध्यम से आगे बढ़े हैं। उन्होंने सब जगह बूँद को बढ़ाया है।",
    },
    keyTerms: ["Soma", "Pavitra", "Indu"],
  },
  {
    id: "rv-10-1-1",
    scriptureId: "rigveda",
    chapter: 10,
    verse: 1,
    sanskrit: "अ॒ग्निमी॑ळे पु॒रोहि॑तं य॒ज्ञस्य॑ दे॒वमृत्विज॑म् |\nहोतारं॑ रत्न॒धात॑मम् ||",
    transliteration: "agnim īḷe purohitaṃ yajñasya devam ṛtvijam |\nhotāraṃ ratna-dhātamam ||",
    translation: {
      en: "I praise Agni, the priest, the divine minister of the sacrifice, the invoker, the bestower of treasures.",
      hi: "मैं अग्नि की स्तुति करता हूं, जो पुरोहित, यज्ञ के देव, ऋत्विज, होता और रत्नों के दाता हैं।",
    },
    keyTerms: ["Agni", "Yajna", "Hotr"],
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
    id: "bg-2-47",
    scriptureId: "bhagavad-gita",
    chapter: 2,
    verse: 47,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||",
    transliteration:
      "karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||",
    translation: {
      en: "You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, nor be attached to inaction.",
      hi: "तुम्हें कर्म करने का अधिकार है, परंतु कर्मों के फलों में कभी नहीं। कर्मों के फलों का कारण मत बनो और अकर्म में आसक्त मत हो।",
    },
    keyTerms: ["Karma", "Phala", "Adhikara"],
    relatedVerses: ["bg-2-48", "bg-3-19"],
  },
  {
    id: "bg-2-11",
    scriptureId: "bhagavad-gita",
    chapter: 2,
    verse: 11,
    sanskrit:
      "श्रीभगवानुवाच |\nअशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे |\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः ||",
    transliteration:
      "śrī-bhagavān uvāca |\naśocyān anvaśocas tvaṃ prajñā-vādānś ca bhāṣase |\ngatāsūn agatāsūṁś ca nānuśocanti paṇḍitāḥ ||",
    translation: {
      en: "The Blessed Lord said: You speak like a wise man, but you grieve for what is not worthy of grief. The wise lament neither for the living nor for the dead.",
      hi: "श्री भगवान बोले: तुम शोक करने योग्य के लिए शोक करते हो और ज्ञानी पुरुषों की तरह बातें करते हो। ज्ञानी पुरुष न जीवित के लिए शोक करते हैं और न मृत के लिए।",
    },
    keyTerms: ["Shoka", "Pandita", "Jnana"],
    relatedVerses: ["bg-2-12", "bg-2-13"],
  },
  {
    id: "bg-2-20",
    scriptureId: "bhagavad-gita",
    chapter: 2,
    verse: 20,
    sanskrit:
      "न जायते म्रियते वा कदाचि॒न्नायं भूत्वा भविता वा न भूयः |\nअजो नित्यः शाश्वतोऽयं पुराणो॒ न हन्यते हन्यमाने शरीरे ||",
    transliteration:
      "na jāyate mriyate vā kadācin nāyam bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato 'yam purāṇo na hanyate hanyamāne śarīre ||",
    translation: {
      en: "For the soul there is never birth nor death. Nor, having once been, does it ever cease to be. Unborn, eternal, constant and ancient, it is not killed when the body is killed.",
      hi: "आत्मा का कभी जन्म नहीं होता और न मृत्यु। न वह कभी उत्पन्न होकर फिर नष्ट होता है। वह अजन्मा, नित्य, सनातन और पुरातन है। शरीर के मारे जाने पर भी वह नहीं मारा जाता।",
    },
    keyTerms: ["Atman", "Aj", "Nitya"],
    relatedVerses: ["bg-2-21", "bg-2-22"],
  },
  {
    id: "bg-4-7",
    scriptureId: "bhagavad-gita",
    chapter: 4,
    verse: 7,
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत |\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ||",
    transliteration:
      "yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṃ sṛjāmy aham ||",
    translation: {
      en: "Whenever and wherever there is a decline in righteousness, O Arjuna, and a predominant rise of unrighteousness, then I manifest Myself.",
      hi: "हे भारत! जब-जब धर्म की हानि और अधर्म का प्रादुर्भाव होता है, तब-तब मैं अपने को प्रकट करता हूं।",
    },
    keyTerms: ["Dharma", "Adharma", "Avatara"],
    relatedVerses: ["bg-4-8", "bg-4-9"],
  },
  {
    id: "bg-6-5",
    scriptureId: "bhagavad-gita",
    chapter: 6,
    verse: 5,
    sanskrit:
      "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् |\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ||",
    transliteration:
      "uddhared ātmanātmānaṃ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||",
    translation: {
      en: "One must elevate oneself by one's own mind, not degrade oneself. The mind is the friend of the conditioned soul, and his enemy as well.",
      hi: "मनुष्य को चाहिए कि वह अपने मन से अपने को ऊपर उठाए, नीचा न गिराए। क्योंकि मन ही जीव का मित्र है और मन ही शत्रु भी।",
    },
    keyTerms: ["Atman", "Manas", "Bandhu"],
    relatedVerses: ["bg-6-6", "bg-6-7"],
  },
  {
    id: "bg-9-26",
    scriptureId: "bhagavad-gita",
    chapter: 9,
    verse: 26,
    sanskrit:
      "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति |\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ||",
    transliteration:
      "patraṃ puṣpaṃ phalaṃ toyaṃ yo me bhaktyā prayacchati |\ntad ahaṃ bhakty-upahṛtam aśnāmi prayatātmanaḥ ||",
    translation: {
      en: "Whoever offers Me with devotion a leaf, a flower, a fruit, or water, I accept that offering from the pure-hearted devotee.",
      hi: "जो कोई भक्ति से पत्र, पुष्प, फल या जल मुझे अर्पण करता है, उस शुद्ध हृदय भक्त का वह भक्ति समर्पित भोजन मैं ग्रहण करता हूं।",
    },
    keyTerms: ["Bhakti", "Prasad", "Puja"],
    relatedVerses: ["bg-9-27", "bg-9-28"],
  },
  {
    id: "bg-12-13",
    scriptureId: "bhagavad-gita",
    chapter: 12,
    verse: 13,
    sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च |\nनिर्ममो निरहंकारः समदुःखसुखः क्षमी ||",
    transliteration:
      "adveṣṭā sarva-bhūtānāṃ maitraḥ karuṇa eva ca |\nniḥ-mamo nir-aham-kāraḥ sama-duḥkha-sukhaḥ kṣamī ||",
    translation: {
      en: "One who is not envious but who is a kind friend to all living entities, who does not think himself a proprietor, who is free from false ego, who is equal in both happiness and distress, who is always satisfied and engaged in devotional service with determination, whose mind and intelligence are in full control-these are qualities of one situated in divine consciousness.",
      hi: "सर्व भूतों से द्वेष न करने वाला, सबका मित्र और दयालु, ममता और अहंकार से रहित, सुख-दुःख में समान रहने वाला और क्षमावान।",
    },
    keyTerms: ["Adveshta", "Maitra", "Nirmama"],
    relatedVerses: ["bg-12-14", "bg-12-15"],
  },
  {
    id: "bg-15-1",
    scriptureId: "bhagavad-gita",
    chapter: 15,
    verse: 1,
    sanskrit:
      "श्रीभगवानुवाच |\nऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम् |\nछन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित् ||",
    transliteration:
      "śrī-bhagavān uvāca |\nūrdhva-mūlam adhaḥ-śākham aśvattham prāhur avyayam |\ncchandāṁsi yasya parṇāni yas tam veda sa veda-vit ||",
    translation: {
      en: "The Blessed Lord said: They speak of an eternal ashvattha tree with its roots above and branches below. Its leaves are the Vedic hymns. One who knows this tree is the knower of the Vedas.",
      hi: "श्री भगवान बोले: ऊपर जड़ वाला और नीचे शाखाओं वाला अश्वत्थ वृक्ष को अव्यय कहते हैं। उसकी पत्तियां वेद हैं। जो इसको जानता है, वह वेदों को जानता है।",
    },
    keyTerms: ["Ashvattha", "Veda", "Jnana"],
    relatedVerses: ["bg-15-2", "bg-15-3"],
  },
  {
    id: "bg-18-66",
    scriptureId: "bhagavad-gita",
    chapter: 18,
    verse: 66,
    sanskrit:
      "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज |\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ||",
    transliteration:
      "sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja |\naham tvā sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||",
    translation: {
      en: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
      hi: "सर्व धर्मों को त्याग कर मेरे ही शरण में आओ। मैं तुम्हें सब पापों से मुक्त कर दूंगा। मत शोक करो।",
    },
    keyTerms: ["Sarana", "Moksha", "Prapatti"],
    relatedVerses: ["bg-18-65", "bg-18-67"],
  },
  {
    id: "isha-1-1",
    scriptureId: "isha-upanishad",
    chapter: 1,
    verse: 1,
    sanskrit:
      "ईशा॒वास्यमिदं॒ सर्वं॒ यत्किं॒च जग॑त्यां जग॒त् |\nतेन॑ त्य॒क्तेन॑ भुञ्जीथा॒ मा गृ॒धः कस्य॑ स्वि॒द्धन॑म् ||",
    transliteration:
      "īśāvāsyam idaṃ sarvaṃ yat kiñca jagatyāṃ jagat |\ntenatyaktena bhuñjīthā mā gṛdhaḥ kasyasvid dhanam ||",
    translation: {
      en: "All this whatsoever moves on the earth is to be covered by the Lord. Protect yourself through that detachment. Do not covet anybody's wealth.",
      hi: "यह सब जो कुछ भी पृथ्वी पर चलता है, ईश्वर से आवृत है। उस त्याग से अपने को रक्षा करो। किसी की संपत्ति की लालसा मत करो।",
    },
    keyTerms: ["Isha", "Sarvam", "Tyaga"],
  },
  {
    id: "isha-1-2",
    scriptureId: "isha-upanishad",
    chapter: 1,
    verse: 2,
    sanskrit:
      "कुर्व॑न्ने॒वे॒ह कर्मा॑णि जिजी॑विषे॒च्छतं॒ समा॑: |\nए॒वं त्वयि॒ ना॒न्यथे॒तोऽस्ति॒ न कर्म॑ लि॒प्यते॑ नरे ||",
    transliteration:
      "kurvann eveha karmāṇi jijīviṣec chatam samāḥ |\nevaṃ tvayi nānyatheto'sti na karma lipyate nare ||",
    translation: {
      en: "One should desire to live in this world for a hundred years performing karma. Thus for you there is no other way. Karma does not bind the man.",
      hi: "कर्म करते हुए इस संसार में सौ वर्ष जीवित रहने की इच्छा करनी चाहिए। इस प्रकार आपके लिए कोई दूसरा मार्ग नहीं है। कर्म मनुष्य को नहीं बांधता।",
    },
    keyTerms: ["Karma", "Jivana", "Lipyate"],
  },
  {
    id: "isha-1-3",
    scriptureId: "isha-upanishad",
    chapter: 1,
    verse: 3,
    sanskrit:
      "अ॒सु॒र्या॒ नाम॑ ते लो॒का अ॒न्धेना॑ तम॒सावृ॑ताः |\nताꣳस्ते॑ प्रे॒त्याभि॑गच्छ॒न्त्य॒ल्पमे॑धा॒सो जनाः॑ ||",
    transliteration:
      "asuryā nāma te lokā andhenā tamasāvṛtāḥ |\ntāṁs te pretyābhigacchanti alpamedhāso janāḥ ||",
    translation: {
      en: "Those worlds of the Asuras are enveloped in blinding darkness. Those people who are of little intelligence go to them after death.",
      hi: "असुरों के वे लोक अंधकार से आवृत हैं। जो लोग कम बुद्धि वाले हैं, वे मृत्यु के बाद उनमें जाते हैं।",
    },
    keyTerms: ["Asurya", "Loka", "Tamas"],
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
