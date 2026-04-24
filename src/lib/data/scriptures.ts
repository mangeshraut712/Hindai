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
