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
    description:
      "The oldest sacred text of Hinduism, containing hymns to various deities",
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
    description:
      "196 aphorisms on the theory and practice of Yoga by Patanjali",
    totalChapters: 4,
    language: "Sanskrit",
    approximateDate: "~400 CE",
    author: "Patanjali",
    keyConcepts: ["Ashtanga Yoga", "Samadhi", "Chitta Vritti", "Ishvara"],
  },
];

export const sampleVerses: ScriptureVerse[] = [
  {
    id: "bg-2-47",
    scriptureId: "bhagavad-gita",
    chapter: 2,
    verse: 47,
    sanskrit:
      "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||",
    transliteration:
      "karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||",
    translation: {
      en: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.",
      hi: "कर्म करने मात्र में तुम्हारा अधिकार है, फलों में कभी नहीं। तुम कर्मफल के हेतु मत बनो, न ही अकर्म में आसक्ति हो।",
    },
    keyTerms: ["Karma", "Phala", "Sanga"],
    relatedVerses: ["bg-3-19", "bg-5-12"],
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
    transliteration:
      "agnim īḷe purohitaṃ yajñasya devam ṛtvijam |\nhotāraṃ ratna-dhātamam ||",
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
  verse: number,
): ScriptureVerse | undefined {
  return sampleVerses.find(
    (v) =>
      v.scriptureId === scriptureId &&
      v.chapter === chapter &&
      v.verse === verse,
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
      v.keyTerms.some((term) => term.toLowerCase().includes(lowerQuery)),
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
export function findRelated(
  scriptureId: string,
  chapter: number,
  verse: number,
): ScriptureVerse[] {
  const baseVerse = getVerse(scriptureId, chapter, verse);
  if (!baseVerse) return [];

  // Find verses with similar keywords
  const related = sampleVerses.filter(
    (v) =>
      v.scriptureId !== scriptureId &&
      v.keyTerms.some((term) => baseVerse.keyTerms.includes(term)),
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
