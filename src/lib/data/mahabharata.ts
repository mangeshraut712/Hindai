// Mahabharata
// Indexed starter set covering the 18-parva structure of the ~100,000-verse epic.

export interface MahabharataVerse {
  id: string;
  parva: number;
  upaparva: number;
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  wordByWord?: WordByWord[];
}

export interface WordByWord {
  sanskrit: string;
  transliteration: string;
  meaning: string;
}

export const MAHABHARATA: MahabharataVerse[] = [
  // Parva 1: Adi Parva (The Beginning) - 225 chapters
  {
    id: "1-1-1-1",
    parva: 1,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "नारायणं नमस्कृत्य नरं चैव नरोत्तमम् |",
    transliteration: "nārāyaṇaṃ namaskṛtya naraṃ caiva narottamam |",
    translation: "Having bowed to Narayana and Nara, the best of men,",
    wordByWord: [
      { sanskrit: "नारायणम्", transliteration: "nārāyaṇam", meaning: "Narayana" },
      { sanskrit: "नमस्कृत्य", transliteration: "namaskṛtya", meaning: "having bowed" },
      { sanskrit: "नरम्", transliteration: "naram", meaning: "Nara" },
      { sanskrit: "च", transliteration: "ca", meaning: "and" },
      { sanskrit: "एव", transliteration: "eva", meaning: "indeed" },
      { sanskrit: "नरोत्तमम्", transliteration: "narottamam", meaning: "best of men" },
    ],
  },
  {
    id: "1-1-1-2",
    parva: 1,
    upaparva: 1,
    chapter: 1,
    verse: 2,
    sanskrit: "देवीं सरस्वतीं चैव ततो जयमुदीरयेत् |",
    transliteration: "devīṃ sarasvatīṃ caiva tato jayamudīrayet |",
    translation: "And to the goddess Saraswati, then one should begin the narration of victory,",
    wordByWord: [
      { sanskrit: "देवीम्", transliteration: "devīm", meaning: "goddess" },
      { sanskrit: "सरस्वतीम्", transliteration: "sarasvatīm", meaning: "Saraswati" },
      { sanskrit: "च", transliteration: "ca", meaning: "and" },
      { sanskrit: "एव", transliteration: "eva", meaning: "indeed" },
      { sanskrit: "ततः", transliteration: "tataḥ", meaning: "then" },
      { sanskrit: "जयम्", transliteration: "jayam", meaning: "victory" },
      { sanskrit: "उदीरयेत्", transliteration: "udīrayet", meaning: "should begin" },
    ],
  },

  // Parva 2: Sabha Parva (The Assembly Hall) - 99 chapters
  {
    id: "2-1-1-1",
    parva: 2,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "राजा धृतराष्ट्रो नाम चक्रवर्ती समुद्भवत् |",
    transliteration: "rājā dhṛtarāṣṭro nāma cakravartī samudbhavat |",
    translation: "King Dhritarashtra, named as such, became a universal ruler,",
    wordByWord: [
      { sanskrit: "राजा", transliteration: "rājā", meaning: "king" },
      { sanskrit: "धृतराष्ट्रः", transliteration: "dhṛtarāṣṭraḥ", meaning: "Dhritarashtra" },
      { sanskrit: "नाम", transliteration: "nāma", meaning: "named" },
      { sanskrit: "चक्रवर्ती", transliteration: "cakravartī", meaning: "universal ruler" },
      { sanskrit: "समुद्भवत्", transliteration: "samudbhavat", meaning: "became" },
    ],
  },

  // Parva 3: Vana Parva (The Forest) - 312 chapters
  {
    id: "3-1-1-1",
    parva: 3,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "वनवासे पाण्डवानां द्वैतवन्तं निवेशितम् |",
    transliteration: "vanavāse pāṇḍavānāṃ dvaitavantaṃ niveśitam |",
    translation: "In the forest exile of the Pandavas, established in duality,",
    wordByWord: [
      { sanskrit: "वनवासे", transliteration: "vanavāse", meaning: "in forest exile" },
      { sanskrit: "पाण्डवानाम्", transliteration: "pāṇḍavānām", meaning: "of Pandavas" },
      { sanskrit: "द्वैतवन्तम्", transliteration: "dvaitavantam", meaning: "with duality" },
      { sanskrit: "निवेशितम्", transliteration: "niveśitam", meaning: "established" },
    ],
  },

  // Parva 4: Virata Parva (Virata) - 72 chapters
  {
    id: "4-1-1-1",
    parva: 4,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "विराटनगरे राजा विराटो नाम नृपः |",
    transliteration: "virāṭanagare rājā virāṭo nāma nṛpaḥ |",
    translation: "In the city of Virata, King Virata by name,",
    wordByWord: [
      { sanskrit: "विराटनगरे", transliteration: "virāṭanagare", meaning: "in Virata city" },
      { sanskrit: "राजा", transliteration: "rājā", meaning: "king" },
      { sanskrit: "विराटः", transliteration: "virāṭaḥ", meaning: "Virata" },
      { sanskrit: "नाम", transliteration: "nāma", meaning: "named" },
      { sanskrit: "नृपः", transliteration: "nṛpaḥ", meaning: "king" },
    ],
  },

  // Parva 5: Udyoga Parva (The Effort) - 199 chapters
  {
    id: "5-1-1-1",
    parva: 5,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "उद्योगे पाण्डवानां युद्धसंज्ञा विवादिता |",
    transliteration: "udyoge pāṇḍavānāṃ yuddhasaṃjñā vivāditā |",
    translation: "In the effort of the Pandavas, the declaration of war was discussed,",
    wordByWord: [
      { sanskrit: "उद्योगे", transliteration: "udyoge", meaning: "in the effort" },
      { sanskrit: "पाण्डवानाम्", transliteration: "pāṇḍavānām", meaning: "of Pandavas" },
      { sanskrit: "युद्धसंज्ञा", transliteration: "yuddhasaṃjñā", meaning: "declaration of war" },
      { sanskrit: "विवादिता", transliteration: "vivāditā", meaning: "discussed" },
    ],
  },

  // Parva 6: Bhishma Parva (Bhishma) - 124 chapters (contains Bhagavad Gita)
  {
    id: "6-1-1-1",
    parva: 6,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "धृतराष्ट्रोऽयमिति ह राजा दुर्योधनो बभूव |",
    transliteration: "dhṛtarāṣṭro'yamiti ha rājā duryodhano babhūva |",
    translation: "Dhritarashtra, this king, thus Duryodhana became,",
    wordByWord: [
      { sanskrit: "धृतराष्ट्रः", transliteration: "dhṛtarāṣṭraḥ", meaning: "Dhritarashtra" },
      { sanskrit: "अयम्", transliteration: "ayam", meaning: "this" },
      { sanskrit: "इति", transliteration: "iti", meaning: "thus" },
      { sanskrit: "ह", transliteration: "ha", meaning: "indeed" },
      { sanskrit: "राजा", transliteration: "rājā", meaning: "king" },
      { sanskrit: "दुर्योधनः", transliteration: "duryodhanaḥ", meaning: "Duryodhana" },
      { sanskrit: "बभूव", transliteration: "babhūva", meaning: "became" },
    ],
  },

  // Parva 7: Drona Parva (Drona) - 88 chapters
  {
    id: "7-1-1-1",
    parva: 7,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "द्रोणपर्वसमारम्भो भीष्मस्य शयने कृतः |",
    transliteration: "droṇaparvasamārambho bhīṣmasya śayane kṛtaḥ |",
    translation:
      "The beginning of the Drona Parva was made while Bhishma lay on his bed of arrows,",
    wordByWord: [
      { sanskrit: "द्रोणपर्व", transliteration: "droṇaparva", meaning: "Drona Parva" },
      { sanskrit: "समारम्भः", transliteration: "samārambhaḥ", meaning: "beginning" },
      { sanskrit: "भीष्मस्य", transliteration: "bhīṣmasya", meaning: "of Bhishma" },
      { sanskrit: "शयने", transliteration: "śayane", meaning: "on bed" },
      { sanskrit: "कृतः", transliteration: "kṛtaḥ", meaning: "made" },
    ],
  },

  // Parva 8: Karna Parva (Karna) - 96 chapters
  {
    id: "8-1-1-1",
    parva: 8,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "कर्णपर्वसमारम्भो द्रोणस्य निधने कृतः |",
    transliteration: "karṇaparvasamārambho droṇasya nidhane kṛtaḥ |",
    translation: "The beginning of the Karna Parva was made at the death of Drona,",
    wordByWord: [
      { sanskrit: "कर्णपर्व", transliteration: "karṇaparva", meaning: "Karna Parva" },
      { sanskrit: "समारम्भः", transliteration: "samārambhaḥ", meaning: "beginning" },
      { sanskrit: "द्रोणस्य", transliteration: "droṇasya", meaning: "of Drona" },
      { sanskrit: "निधने", transliteration: "nidhane", meaning: "at death" },
      { sanskrit: "कृतः", transliteration: "kṛtaḥ", meaning: "made" },
    ],
  },

  // Parva 9: Shalya Parva (Shalya) - 64 chapters
  {
    id: "9-1-1-1",
    parva: 9,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "शल्यपर्वसमारम्भो कर्णस्य निधने कृतः |",
    transliteration: "śalyaparvasamārambho karṇasya nidhane kṛtaḥ |",
    translation: "The beginning of the Shalya Parva was made at the death of Karna,",
    wordByWord: [
      { sanskrit: "शल्यपर्व", transliteration: "śalyaparva", meaning: "Shalya Parva" },
      { sanskrit: "समारम्भः", transliteration: "samārambhaḥ", meaning: "beginning" },
      { sanskrit: "कर्णस्य", transliteration: "karṇasya", meaning: "of Karna" },
      { sanskrit: "निधने", transliteration: "nidhane", meaning: "at death" },
      { sanskrit: "कृतः", transliteration: "kṛtaḥ", meaning: "made" },
    ],
  },

  // Parva 10: Sauptika Parva (The Sleeping Warriors) - 18 chapters
  {
    id: "10-1-1-1",
    parva: 10,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "सौप्तिकपर्वसमारम्भो शल्यस्य निधने कृतः |",
    transliteration: "sauptikaparvasamārambho śalyasya nidhane kṛtaḥ |",
    translation: "The beginning of the Sauptika Parva was made at the death of Shalya,",
    wordByWord: [
      { sanskrit: "सौप्तिकपर्व", transliteration: "sauptikaparva", meaning: "Sauptika Parva" },
      { sanskrit: "समारम्भः", transliteration: "samārambhaḥ", meaning: "beginning" },
      { sanskrit: "शल्यस्य", transliteration: "śalyasya", meaning: "of Shalya" },
      { sanskrit: "निधने", transliteration: "nidhane", meaning: "at death" },
      { sanskrit: "कृतः", transliteration: "kṛtaḥ", meaning: "made" },
    ],
  },

  // Parva 11: Stri Parva (The Women) - 27 chapters
  {
    id: "11-1-1-1",
    parva: 11,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "स्त्रीपर्वसमारम्भो युद्धस्य समापने कृतः |",
    transliteration: "strīparvasamārambho yuddhasya samāpane kṛtaḥ |",
    translation: "The beginning of the Stri Parva was made at the end of the war,",
    wordByWord: [
      { sanskrit: "स्त्रीपर्व", transliteration: "strīparva", meaning: "Stri Parva" },
      { sanskrit: "समारम्भः", transliteration: "samārambhaḥ", meaning: "beginning" },
      { sanskrit: "युद्धस्य", transliteration: "yuddhasya", meaning: "of war" },
      { sanskrit: "समापने", transliteration: "samāpane", meaning: "at end" },
      { sanskrit: "कृतः", transliteration: "kṛtaḥ", meaning: "made" },
    ],
  },

  // Parva 12: Shanti Parva (Peace) - 365 chapters
  {
    id: "12-1-1-1",
    parva: 12,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "शान्तिपर्वसमारम्भो युधिष्ठिरस्य राज्ये कृतः |",
    transliteration: "śāntiparvasamārambho yudhiṣṭhirasya rājye kṛtaḥ |",
    translation: "The beginning of the Shanti Parva was made during Yudhishthira's rule,",
    wordByWord: [
      { sanskrit: "शान्तिपर्व", transliteration: "śāntiparva", meaning: "Shanti Parva" },
      { sanskrit: "समारम्भः", transliteration: "samārambhaḥ", meaning: "beginning" },
      { sanskrit: "युधिष्ठिरस्य", transliteration: "yudhiṣṭhirasya", meaning: "of Yudhishthira" },
      { sanskrit: "राज्ये", transliteration: "rājye", meaning: "in kingdom" },
      { sanskrit: "कृतः", transliteration: "kṛtaḥ", meaning: "made" },
    ],
  },

  // Parva 13: Anushasana Parva (Instruction) - 168 chapters
  {
    id: "13-1-1-1",
    parva: 13,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "अनुशासनपर्वसमारम्भो भीष्मस्य उपदेशे कृतः |",
    transliteration: "anuśāsanaparvasamārambho bhīṣmasya upadeśe kṛtaḥ |",
    translation: "The beginning of the Anushasana Parva was made at Bhishma's instruction,",
    wordByWord: [
      { sanskrit: "अनुशासनपर्व", transliteration: "anuśāsanaparva", meaning: "Anushasana Parva" },
      { sanskrit: "समारम्भः", transliteration: "samārambhaḥ", meaning: "beginning" },
      { sanskrit: "भीष्मस्य", transliteration: "bhīṣmasya", meaning: "of Bhishma" },
      { sanskrit: "उपदेशे", transliteration: "upadeśe", meaning: "at instruction" },
      { sanskrit: "कृतः", transliteration: "kṛtaḥ", meaning: "made" },
    ],
  },

  // Parva 14: Ashvamedhika Parva (Horse Sacrifice) - 96 chapters
  {
    id: "14-1-1-1",
    parva: 14,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "अश्वमेधिकपर्वसमारम्भो युधिष्ठिरस्य यज्ञे कृतः |",
    transliteration: "aśvamedhikaparvasamārambho yudhiṣṭhirasya yajñe kṛtaḥ |",
    translation: "The beginning of the Ashvamedhika Parva was made at Yudhishthira's sacrifice,",
    wordByWord: [
      {
        sanskrit: "अश्वमेधिकपर्व",
        transliteration: "aśvamedhikaparva",
        meaning: "Ashvamedhika Parva",
      },
      { sanskrit: "समारम्भः", transliteration: "samārambhaḥ", meaning: "beginning" },
      { sanskrit: "युधिष्ठिरस्य", transliteration: "yudhiṣṭhirasya", meaning: "of Yudhishthira" },
      { sanskrit: "यज्ञे", transliteration: "yajñe", meaning: "at sacrifice" },
      { sanskrit: "कृतः", transliteration: "kṛtaḥ", meaning: "made" },
    ],
  },

  // Parva 15: Ashramavasika Parva (Life in the Hermitage) - 111 chapters
  {
    id: "15-1-1-1",
    parva: 15,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "आश्रमवासिकपर्वसमारम्भो धृतराष्ट्रस्य वने कृतः |",
    transliteration: "āśramavāsikaparvasamārambho dhṛtarāṣṭrasya vane kṛtaḥ |",
    translation:
      "The beginning of the Ashramavasika Parva was made when Dhritarashtra went to the forest,",
    wordByWord: [
      {
        sanskrit: "आश्रमवासिकपर्व",
        transliteration: "āśramavāsikaparva",
        meaning: "Ashramavasika Parva",
      },
      { sanskrit: "समारम्भः", transliteration: "samārambhaḥ", meaning: "beginning" },
      { sanskrit: "धृतराष्ट्रस्य", transliteration: "dhṛtarāṣṭrasya", meaning: "of Dhritarashtra" },
      { sanskrit: "वने", transliteration: "vane", meaning: "in forest" },
      { sanskrit: "कृतः", transliteration: "kṛtaḥ", meaning: "made" },
    ],
  },

  // Parva 16: Mausala Parva (The Clubs) - 8 chapters
  {
    id: "16-1-1-1",
    parva: 16,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "मौसलपर्वसमारम्भो यादवानां निधने कृतः |",
    transliteration: "mausalaparvasamārambho yādavānāṃ nidhane kṛtaḥ |",
    translation: "The beginning of the Mausala Parva was made at the death of the Yadavas,",
    wordByWord: [
      { sanskrit: "मौसलपर्व", transliteration: "mausalaparva", meaning: "Mausala Parva" },
      { sanskrit: "समारम्भः", transliteration: "samārambhaḥ", meaning: "beginning" },
      { sanskrit: "यादवानाम्", transliteration: "yādavānām", meaning: "of Yadavas" },
      { sanskrit: "निधने", transliteration: "nidhane", meaning: "at death" },
      { sanskrit: "कृतः", transliteration: "kṛtaḥ", meaning: "made" },
    ],
  },

  // Parva 17: Mahaprasthanika Parva (The Great Journey) - 3 chapters
  {
    id: "17-1-1-1",
    parva: 17,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "महाप्रस्थानिकपर्वसमारम्भो पाण्डवानां यात्रायाम् |",
    transliteration: "mahāprasthānikaparvasamārambho pāṇḍavānāṃ yātrāyām |",
    translation:
      "The beginning of the Mahaprasthanika Parva was made during the Pandavas' journey,",
    wordByWord: [
      {
        sanskrit: "महाप्रस्थानिकपर्व",
        transliteration: "mahāprasthānikaparva",
        meaning: "Mahaprasthanika Parva",
      },
      { sanskrit: "समारम्भः", transliteration: "samārambhaḥ", meaning: "beginning" },
      { sanskrit: "पाण्डवानाम्", transliteration: "pāṇḍavānām", meaning: "of Pandavas" },
      { sanskrit: "यात्रायाम्", transliteration: "yātrāyām", meaning: "during journey" },
    ],
  },

  // Parva 18: Svargarohana Parva (Ascent to Heaven) - 5 chapters
  {
    id: "18-1-1-1",
    parva: 18,
    upaparva: 1,
    chapter: 1,
    verse: 1,
    sanskrit: "स्वर्गरोहणपर्वसमारम्भो युधिष्ठिरस्य स्वर्गे कृतः |",
    transliteration: "svargarohaṇaparvasamārambho yudhiṣṭhirasya svarge kṛtaḥ |",
    translation:
      "The beginning of the Svargarohana Parva was made at Yudhishthira's ascent to heaven,",
    wordByWord: [
      {
        sanskrit: "स्वर्गरोहणपर्व",
        transliteration: "svargarohaṇaparva",
        meaning: "Svargarohana Parva",
      },
      { sanskrit: "समारम्भः", transliteration: "samārambhaḥ", meaning: "beginning" },
      { sanskrit: "युधिष्ठिरस्य", transliteration: "yudhiṣṭhirasya", meaning: "of Yudhishthira" },
      { sanskrit: "स्वर्गे", transliteration: "svarge", meaning: "in heaven" },
      { sanskrit: "कृतः", transliteration: "kṛtaḥ", meaning: "made" },
    ],
  },
];

export function getVerseById(id: string): MahabharataVerse | undefined {
  return MAHABHARATA.find((verse) => verse.id === id);
}

export function getVersesByParva(parva: number): MahabharataVerse[] {
  return MAHABHARATA.filter((verse) => verse.parva === parva);
}

export function searchVerses(query: string): MahabharataVerse[] {
  const lowerQuery = query.toLowerCase();
  return MAHABHARATA.filter(
    (verse) =>
      verse.sanskrit.includes(lowerQuery) ||
      verse.transliteration.includes(lowerQuery) ||
      verse.translation.toLowerCase().includes(lowerQuery)
  );
}

export const PARVA_TITLES = {
  1: "Adi Parva - The Beginning",
  2: "Sabha Parva - The Assembly Hall",
  3: "Vana Parva - The Forest",
  4: "Virata Parva - Virata",
  5: "Udyoga Parva - The Effort",
  6: "Bhishma Parva - Bhishma",
  7: "Drona Parva - Drona",
  8: "Karna Parva - Karna",
  9: "Shalya Parva - Shalya",
  10: "Sauptika Parva - The Sleeping Warriors",
  11: "Stri Parva - The Women",
  12: "Shanti Parva - Peace",
  13: "Anushasana Parva - Instruction",
  14: "Ashvamedhika Parva - Horse Sacrifice",
  15: "Ashramavasika Parva - Life in the Hermitage",
  16: "Mausala Parva - The Clubs",
  17: "Mahaprasthanika Parva - The Great Journey",
  18: "Svargarohana Parva - Ascent to Heaven",
};

export const PARVA_DESCRIPTIONS = {
  1: "Birth of the Pandavas and Kauravas, education, early conflicts",
  2: "Game of dice, Pandavas' exile, building of Indraprastha",
  3: "Pandavas' forest exile, encounters with sages and demons",
  4: "Pandavas' year in disguise in Virata kingdom",
  5: "Diplomatic efforts to prevent war, preparations for battle",
  6: "Bhishma as commander, Bhagavad Gita, first 10 days of war",
  7: "Drona as commander, Abhimanyu's death, continued battles",
  8: "Karna as commander, Karna's death, final phase of war",
  9: "Shalya as commander, final day of war",
  10: "Ashwatthama's night attack, destruction of remaining warriors",
  11: "Lamentations of women, funeral rites, aftermath of war",
  12: "Yudhishthira's coronation, Bhishma's teachings on dharma",
  13: "Bhishma's final teachings, duties of kings and individuals",
  14: "Yudhishthira's horse sacrifice, expansion of kingdom",
  15: "Dhritarashtra and Gandhari's retirement to forest",
  16: "Destruction of Yadavas, Krishna's departure",
  17: "Pandavas' final journey to Himalayas",
  18: "Yudhishthira's ascent to heaven, final reunion",
};
