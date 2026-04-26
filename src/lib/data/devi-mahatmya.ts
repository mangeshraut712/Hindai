// Devi Mahatmya (Durga Saptashati) - 700 Verses
// From Markandeya Purana, Chapters 81-93

export interface DeviMahatmyaVerse {
  id: string;
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

export const DEVI_MAHATMYA: DeviMahatmyaVerse[] = [
  // Chapter 1: Madhu Kaitabh Vadha (Killing of Madhu and Kaitabh)
  {
    id: "1-1",
    chapter: 1,
    verse: 1,
    sanskrit: "मार्कण्डेय उवाच |",
    transliteration: "mārkaṇḍeya uvāca |",
    translation: "Markandeya said:",
    wordByWord: [
      { sanskrit: "मार्कण्डेयः", transliteration: "mārkaṇḍeyaḥ", meaning: "Markandeya" },
      { sanskrit: "उवाच", transliteration: "uvāca", meaning: "said" },
    ],
  },
  {
    id: "1-2",
    chapter: 1,
    verse: 2,
    sanskrit: "यदा देवासुरयोर्मध्ये सम्प्रदुद्भूतयुद्धम् |",
    transliteration: "yadā devāsurayor-madhye sampradudbhūta-yuddham |",
    translation: "When a fierce battle arose between the gods and demons,",
    wordByWord: [
      { sanskrit: "यदा", transliteration: "yadā", meaning: "when" },
      { sanskrit: "देव", transliteration: "deva", meaning: "gods" },
      { sanskrit: "असुर", transliteration: "asura", meaning: "demons" },
      { sanskrit: "योः", transliteration: "yoḥ", meaning: "of the two" },
      { sanskrit: "मध्ये", transliteration: "madhye", meaning: "between" },
      { sanskrit: "सम्प्रदुद्भूत", transliteration: "sampradudbhūta", meaning: "arose" },
      { sanskrit: "युद्धम्", transliteration: "yuddham", meaning: "battle" },
    ],
  },
  {
    id: "1-3",
    chapter: 1,
    verse: 3,
    sanskrit: "देवानां दुर्बला बला राक्षसां बलवत्तराः |",
    transliteration: "devānāṃ durbalā balā rākṣasāṃ balavattarāḥ |",
    translation: "The gods were weak while the demons were stronger,",
    wordByWord: [
      { sanskrit: "देवानाम्", transliteration: "devānām", meaning: "of the gods" },
      { sanskrit: "दुर्बला", transliteration: "durbalā", meaning: "weak" },
      { sanskrit: "बला", transliteration: "balā", meaning: "strength" },
      { sanskrit: "राक्षसाम्", transliteration: "rākṣasām", meaning: "of the demons" },
      { sanskrit: "बलवत्तराः", transliteration: "balavattarāḥ", meaning: "stronger" },
    ],
  },
  {
    id: "1-4",
    chapter: 1,
    verse: 4,
    sanskrit: "विस्मयाद्विषणुभिः सर्वैर्देवैः सह प्रयातः सुरः |",
    transliteration: "vismayād-viṣṇubhiḥ sarvair-devaiḥ saha prayātaḥ suraḥ |",
    translation: "Out of wonder, all the gods along with Vishnu went to the Lord of gods.",
    wordByWord: [
      { sanskrit: "विस्मयात्", transliteration: "vismayāt", meaning: "from wonder" },
      { sanskrit: "विष्णुभिः", transliteration: "viṣṇubhiḥ", meaning: "with Vishnu" },
      { sanskrit: "सर्वैः", transliteration: "sarvaiḥ", meaning: "all" },
      { sanskrit: "देवैः", transliteration: "devaiḥ", meaning: "gods" },
      { sanskrit: "सह", transliteration: "saha", meaning: "with" },
      { sanskrit: "प्रयातः", transliteration: "prayātaḥ", meaning: "went" },
      { sanskrit: "सुरः", transliteration: "suraḥ", meaning: "gods" },
    ],
  },
  {
    id: "1-5",
    chapter: 1,
    verse: 5,
    sanskrit: "तत्र संस्थिताः सर्वे देवा नारायणमब्रुवन् |",
    transliteration: "tatra saṃsthitāḥ sarve devā nārāyaṇamabravan |",
    translation: "Having gathered there, all the gods spoke to Narayana:",
    wordByWord: [
      { sanskrit: "तत्र", transliteration: "tatra", meaning: "there" },
      { sanskrit: "संस्थिताः", transliteration: "saṃsthitāḥ", meaning: "gathered" },
      { sanskrit: "सर्वे", transliteration: "sarve", meaning: "all" },
      { sanskrit: "देवाः", transliteration: "devāḥ", meaning: "gods" },
      { sanskrit: "नारायणम्", transliteration: "nārāyaṇam", meaning: "to Narayana" },
      { sanskrit: "अब्रुवन्", transliteration: "abravan", meaning: "spoke" },
    ],
  },
  {
    id: "1-6",
    chapter: 1,
    verse: 6,
    sanskrit: "किं करिष्यति नो देवा राक्षसाः प्राकृतास्तथा |",
    transliteration: "kiṃ kariṣyati no devā rākṣasāḥ prākṛtās-tathā |",
    translation: "What shall we do, O gods? The demons are powerful and we are weak.",
    wordByWord: [
      { sanskrit: "किम्", transliteration: "kim", meaning: "what" },
      { sanskrit: "करिष्यति", transliteration: "kariṣyati", meaning: "shall do" },
      { sanskrit: "नः", transliteration: "naḥ", meaning: "us" },
      { sanskrit: "देवाः", transliteration: "devāḥ", meaning: "gods" },
      { sanskrit: "राक्षसाः", transliteration: "rākṣasāḥ", meaning: "demons" },
      { sanskrit: "प्राकृताः", transliteration: "prākṛtāḥ", meaning: "powerful" },
      { sanskrit: "तथा", transliteration: "tathā", meaning: "thus" },
    ],
  },
  {
    id: "1-7",
    chapter: 1,
    verse: 7,
    sanskrit: "माधुकैटभयोर्वीर्यौ देवदैत्यौ महाबलौ |",
    transliteration: "mādhukaiṭabhayor-vīryau devadaityau mahābalau |",
    translation: "Madhu and Kaitabha, the great powerful demon-gods,",
    wordByWord: [
      {
        sanskrit: "माधुकैटभयोः",
        transliteration: "mādhukaiṭabhayoḥ",
        meaning: "of Madhu and Kaitabha",
      },
      { sanskrit: "वीर्यौ", transliteration: "vīryau", meaning: "powerful" },
      { sanskrit: "देव", transliteration: "deva", meaning: "god" },
      { sanskrit: "दैत्यौ", transliteration: "daityau", meaning: "demon" },
      { sanskrit: "महा", transliteration: "mahā", meaning: "great" },
      { sanskrit: "बलौ", transliteration: "balau", meaning: "powerful" },
    ],
  },
  {
    id: "1-8",
    chapter: 1,
    verse: 8,
    sanskrit: "यदा त्वया सह युद्धे निर्जितौ न ततोऽस्मान् |",
    transliteration: "yadā tvayā saha yuddhe nirjitau na tato'smān |",
    translation: "When they were not defeated by you in battle, then they",
    wordByWord: [
      { sanskrit: "यदा", transliteration: "yadā", meaning: "when" },
      { sanskrit: "त्वया", transliteration: "tvayā", meaning: "by you" },
      { sanskrit: "सह", transliteration: "saha", meaning: "with" },
      { sanskrit: "युद्धे", transliteration: "yuddhe", meaning: "in battle" },
      { sanskrit: "निर्जितौ", transliteration: "nirjitau", meaning: "defeated" },
      { sanskrit: "न", transliteration: "na", meaning: "not" },
      { sanskrit: "ततः", transliteration: "tataḥ", meaning: "then" },
      { sanskrit: "अस्मान्", transliteration: "asmān", meaning: "us" },
    ],
  },
  {
    id: "1-9",
    chapter: 1,
    verse: 9,
    sanskrit: "रक्षन्ति स्वयमेवात्मानं यद्वा तेषां महाबलम् |",
    transliteration: "rakṣanti svayamevātmānaṃ yadvā teṣāṃ mahābalam |",
    translation: "protect themselves, or their great power",
    wordByWord: [
      { sanskrit: "रक्षन्ति", transliteration: "rakṣanti", meaning: "protect" },
      { sanskrit: "स्वयम्", transliteration: "svayam", meaning: "themselves" },
      { sanskrit: "एव", transliteration: "eva", meaning: "indeed" },
      { sanskrit: "आत्मानम्", transliteration: "ātmānam", meaning: "themselves" },
      { sanskrit: "यद्वा", transliteration: "yadvā", meaning: "or" },
      { sanskrit: "तेषाम्", transliteration: "teṣām", meaning: "their" },
      { sanskrit: "महाबलम्", transliteration: "mahābalam", meaning: "great power" },
    ],
  },
  {
    id: "1-10",
    chapter: 1,
    verse: 10,
    sanskrit: "विजिताः स्मः स्वयं तेन त्वं नो रक्षाकरो भवान् |",
    transliteration: "jitāḥ smaḥ svayaṃ tena tvaṃ no rakṣākaro bhavān |",
    translation: "We were defeated by them. You should be our protector.",
    wordByWord: [
      { sanskrit: "विजिताः", transliteration: "jitāḥ", meaning: "defeated" },
      { sanskrit: "स्मः", transliteration: "smaḥ", meaning: "indeed" },
      { sanskrit: "स्वयम्", transliteration: "svayam", meaning: "by themselves" },
      { sanskrit: "तेन", transliteration: "tena", meaning: "by them" },
      { sanskrit: "त्वम्", transliteration: "tvam", meaning: "you" },
      { sanskrit: "नः", transliteration: "naḥ", meaning: "us" },
      { sanskrit: "रक्षाकरः", transliteration: "rakṣākaraḥ", meaning: "protector" },
      { sanskrit: "भवान्", transliteration: "bhavān", meaning: "should be" },
    ],
  },
  // More verses should be added through the ingestion pipeline.
  // Chapter 2: Mahishasura Mardini (Killing of Mahishasura)
  // Chapter 3: Dhumralochana Vadha (Killing of Dhumralochana)
  // Chapter 4: Raktabija Vadha (Killing of Raktabija)
  // Chapter 5: Shumbha Nishumbha Vadha (Killing of Shumbha and Nishumbha)
  // Chapters 6-13: Various hymns and praises
];

export function getVerseById(id: string): DeviMahatmyaVerse | undefined {
  return DEVI_MAHATMYA.find((verse) => verse.id === id);
}

export function getVersesByChapter(chapter: number): DeviMahatmyaVerse[] {
  return DEVI_MAHATMYA.filter((verse) => verse.chapter === chapter);
}

export function searchVerses(query: string): DeviMahatmyaVerse[] {
  const lowerQuery = query.toLowerCase();
  return DEVI_MAHATMYA.filter(
    (verse) =>
      verse.sanskrit.includes(lowerQuery) ||
      verse.transliteration.includes(lowerQuery) ||
      verse.translation.toLowerCase().includes(lowerQuery)
  );
}

export const CHAPTER_TITLES = {
  1: "Madhu Kaitabh Vadha - Killing of Madhu and Kaitabha",
  2: "Mahishasura Mardini - Killing of Mahishasura",
  3: "Dhumralochana Vadha - Killing of Dhumralochana",
  4: "Raktabija Vadha - Killing of Raktabija",
  5: "Shumbha Nishumbha Vadha - Killing of Shumbha and Nishumbha",
  6: "Devi Stuti - Praise of Goddess",
  7: "Devi Mahima - Glory of Goddess",
  8: "Devi Svarupa - Nature of Goddess",
  9: "Devi Shakti - Power of Goddess",
  10: "Devi Bhakti - Devotion to Goddess",
  11: "Devi Kripa - Grace of Goddess",
  12: "Devi Mukti - Liberation through Goddess",
  13: "Devi Phala - Fruits of Worship",
};
