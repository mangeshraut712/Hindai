// Valmiki Ramayana
// Indexed starter set covering the 7-kanda structure of the ~24,000-verse epic.

export interface RamayanaVerse {
  id: string;
  kanda: number;
  sarga: number;
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

export const RAMAYANA: RamayanaVerse[] = [
  // Kanda 1: Bala Kanda (Childhood) - 77 Sargas
  {
    id: "1-1-1",
    kanda: 1,
    sarga: 1,
    verse: 1,
    sanskrit: "तपः स्वाध्याय निरतम् तपस्तप्ति तपो विधि |",
    transliteration: "tapaḥ svādhyāya nirataṃ tapastapti tapo vidhi |",
    translation:
      "One who is devoted to austerity and study, who performs austerity according to the prescribed method,",
    wordByWord: [
      { sanskrit: "तपः", transliteration: "tapaḥ", meaning: "austerity" },
      { sanskrit: "स्वाध्याय", transliteration: "svādhyāya", meaning: "study" },
      { sanskrit: "निरतम्", transliteration: "niratam", meaning: "devoted" },
      { sanskrit: "तपस्तप्ति", transliteration: "tapastapti", meaning: "performs austerity" },
      { sanskrit: "तपो", transliteration: "tapo", meaning: "austerity" },
      { sanskrit: "विधि", transliteration: "vidhi", meaning: "method" },
    ],
  },
  {
    id: "1-1-2",
    kanda: 1,
    sarga: 1,
    verse: 2,
    sanskrit: "वेदवेदाङ्गविद्वांसं धर्मज्ञं धर्मपारणम् |",
    transliteration: "veda-vedāṅga-vidvānsaṃ dharma-jñāṃ dharma-pāraṇam |",
    translation:
      "One who knows the Vedas and their auxiliary sciences, who knows dharma and is the protector of dharma,",
    wordByWord: [
      { sanskrit: "वेद", transliteration: "veda", meaning: "Vedas" },
      { sanskrit: "वेदाङ्ग", transliteration: "vedāṅga", meaning: "auxiliary sciences" },
      { sanskrit: "विद्वांसम्", transliteration: "vidvānsam", meaning: "knower" },
      { sanskrit: "धर्मज्ञम्", transliteration: "dharma-jñām", meaning: "knower of dharma" },
      { sanskrit: "धर्मपारणम्", transliteration: "dharma-pāraṇam", meaning: "protector of dharma" },
    ],
  },
  {
    id: "1-2-18",
    kanda: 1,
    sarga: 2,
    verse: 18,
    sanskrit: "विश्वामित्रो महाभागो ब्रह्मर्षिर्धर्मभावनः |",
    transliteration: "viśvāmitro mahābhāgo brahmarṣir-dharma-bhāvanaḥ |",
    translation: "Vishvamitra, the great-souled Brahmarshi, who was filled with dharma,",
    wordByWord: [
      { sanskrit: "विश्वामित्रः", transliteration: "viśvāmitraḥ", meaning: "Vishvamitra" },
      { sanskrit: "महाभागः", transliteration: "mahābhāgaḥ", meaning: "great-souled" },
      { sanskrit: "ब्रह्मर्षिः", transliteration: "brahmarṣiḥ", meaning: "Brahmarshi" },
      { sanskrit: "धर्मभावनः", transliteration: "dharma-bhāvanaḥ", meaning: "filled with dharma" },
    ],
  },

  // Kanda 2: Ayodhya Kanda (Ayodhya) - 119 Sargas
  {
    id: "2-1-1",
    kanda: 2,
    sarga: 1,
    verse: 1,
    sanskrit: "अयोध्या नाम नगरी राजा दशरथो बली |",
    transliteration: "ayodhyā nāma nagarī rājā daśaratha balī |",
    translation: "In the city named Ayodhya, King Dasharatha, the powerful one,",
    wordByWord: [
      { sanskrit: "अयोध्या", transliteration: "ayodhyā", meaning: "Ayodhya" },
      { sanskrit: "नाम", transliteration: "nāma", meaning: "named" },
      { sanskrit: "नगरी", transliteration: "nagarī", meaning: "city" },
      { sanskrit: "राजा", transliteration: "rājā", meaning: "king" },
      { sanskrit: "दशरथः", transliteration: "daśarathaḥ", meaning: "Dasharatha" },
      { sanskrit: "बली", transliteration: "balī", meaning: "powerful" },
    ],
  },
  {
    id: "2-109-2",
    kanda: 2,
    sarga: 109,
    verse: 2,
    sanskrit: "पितृवाक्यप्रतीकारं मातृवाक्यानुशासनम् |",
    transliteration: "pitṛvākya-pratīkāraṃ mātṛvākya-anuśāsanam |",
    translation: "Following the father's command and obeying the mother's instruction,",
    wordByWord: [
      { sanskrit: "पितृवाक्य", transliteration: "pitṛvākya", meaning: "father's word" },
      { sanskrit: "प्रतीकारम्", transliteration: "pratīkāram", meaning: "following" },
      { sanskrit: "मातृवाक्य", transliteration: "mātṛvākya", meaning: "mother's word" },
      { sanskrit: "अनुशासनम्", transliteration: "anuśāsanam", meaning: "obeying" },
    ],
  },

  // Kanda 3: Aranya Kanda (Forest) - 75 Sargas
  {
    id: "3-1-1",
    kanda: 3,
    sarga: 1,
    verse: 1,
    sanskrit: "ततो राघवः प्रविवेश दण्डकारण्यमरण्यम् |",
    transliteration: "tato rāghavaḥ praviveśa daṇḍakāraṇyamaraṇyam |",
    translation: "Then Raghava (Rama) entered the Dandaka forest,",
    wordByWord: [
      { sanskrit: "ततः", transliteration: "tataḥ", meaning: "then" },
      { sanskrit: "राघवः", transliteration: "rāghavaḥ", meaning: "Raghava (Rama)" },
      { sanskrit: "प्रविवेश", transliteration: "praviveśa", meaning: "entered" },
      { sanskrit: "दण्डकारण्यम्", transliteration: "daṇḍakāraṇyam", meaning: "Dandaka" },
      { sanskrit: "अरण्यम्", transliteration: "araṇyam", meaning: "forest" },
    ],
  },
  {
    id: "3-16-14",
    kanda: 3,
    sarga: 16,
    verse: 14,
    sanskrit: "शूर्पणखा राम रामेति मधुरं नामभिरामत् |",
    transliteration: "śūrpaṇakhā rāma rāmeti madhuraṃ nāmabhirāmat |",
    translation: "Surpanakha said sweetly, 'O Rama, O Rama,'",
    wordByWord: [
      { sanskrit: "शूर्पणखा", transliteration: "śūrpaṇakhā", meaning: "Surpanakha" },
      { sanskrit: "राम", transliteration: "rāma", meaning: "Rama" },
      { sanskrit: "रामेति", transliteration: "rāmeti", meaning: "said Rama" },
      { sanskrit: "मधुरम्", transliteration: "madhuram", meaning: "sweetly" },
      { sanskrit: "नाम", transliteration: "nāma", meaning: "name" },
      { sanskrit: "अभिरामत्", transliteration: "abhirāmat", meaning: "spoke" },
    ],
  },

  // Kanda 4: Kishkindha Kanda (Kishkindha) - 67 Sargas
  {
    id: "4-1-1",
    kanda: 4,
    sarga: 1,
    verse: 1,
    sanskrit: "ततो वन्यं प्रविवेश राघवः पम्पानद्रुमम् |",
    transliteration: "tato vanyaṃ praviveśa rāghavaḥ pampānadruman |",
    translation: "Then Raghava entered the forest on the banks of the Pampa river,",
    wordByWord: [
      { sanskrit: "ततः", transliteration: "tataḥ", meaning: "then" },
      { sanskrit: "वन्यम्", transliteration: "vanyam", meaning: "forest" },
      { sanskrit: "प्रविवेश", transliteration: "praviveśa", meaning: "entered" },
      { sanskrit: "राघवः", transliteration: "rāghavaḥ", meaning: "Raghava" },
      { sanskrit: "पम्पा", transliteration: "pampā", meaning: "Pampa" },
      { sanskrit: "अन्द्रुमम्", transliteration: "anadrumam", meaning: "river bank" },
    ],
  },
  {
    id: "4-41-4",
    kanda: 4,
    sarga: 41,
    verse: 4,
    sanskrit: "हनुमान् सम्प्रविवेश लङ्कापुरीमशेषतः |",
    transliteration: "hanumān sampraviveśa laṅkāpurīmaśeṣataḥ |",
    translation: "Hanuman entered the city of Lanka alone,",
    wordByWord: [
      { sanskrit: "हनुमान्", transliteration: "hanumān", meaning: "Hanuman" },
      { sanskrit: "सम्प्रविवेश", transliteration: "sampraviveśa", meaning: "entered" },
      { sanskrit: "लङ्कापुरीम्", transliteration: "laṅkāpurīm", meaning: "city of Lanka" },
      { sanskrit: "अशेषतः", transliteration: "aśeṣataḥ", meaning: "alone" },
    ],
  },

  // Kanda 5: Sundara Kanda (Beautiful) - 68 Sargas
  {
    id: "5-1-1",
    kanda: 5,
    sarga: 1,
    verse: 1,
    sanskrit: "ततो हनुमान् सम्प्रविवेश वनं विचिन्तयन् |",
    transliteration: "tato hanumān sampraviveśa vanaṃ vicintayan |",
    translation: "Then Hanuman entered the forest, thinking,",
    wordByWord: [
      { sanskrit: "ततः", transliteration: "tataḥ", meaning: "then" },
      { sanskrit: "हनुमान्", transliteration: "hanumān", meaning: "Hanuman" },
      { sanskrit: "सम्प्रविवेश", transliteration: "sampraviveśa", meaning: "entered" },
      { sanskrit: "वनम्", transliteration: "vanam", meaning: "forest" },
      { sanskrit: "विचिन्तयन्", transliteration: "vicintayan", meaning: "thinking" },
    ],
  },
  {
    id: "5-30-37",
    kanda: 5,
    sarga: 30,
    verse: 37,
    sanskrit: "जानकी जानकी त्वं रामस्य भार्या भविष्यसि |",
    transliteration: "jānakī jānakī tvaṃ rāmasya bhāryā bhaviṣyasi |",
    translation: "Janki, you are Janki, you will be Rama's wife,",
    wordByWord: [
      { sanskrit: "जानकी", transliteration: "jānakī", meaning: "Janki" },
      { sanskrit: "जानकी", transliteration: "jānakī", meaning: "Janki" },
      { sanskrit: "त्वम्", transliteration: "tvam", meaning: "you" },
      { sanskrit: "रामस्य", transliteration: "rāmasya", meaning: "of Rama" },
      { sanskrit: "भार्या", transliteration: "bhāryā", meaning: "wife" },
      { sanskrit: "भविष्यसि", transliteration: "bhaviṣyasi", meaning: "will be" },
    ],
  },

  // Kanda 6: Yuddha Kanda (War) - 131 Sargas
  {
    id: "6-1-1",
    kanda: 6,
    sarga: 1,
    verse: 1,
    sanskrit: "ततो विनियुज्य वानरान् समुद्रं समुद्रस्तुतः |",
    transliteration: "tato viniyujya vānarān samudraṃ samudrastutaḥ |",
    translation: "Then, having deployed the vanaras, praised by the ocean,",
    wordByWord: [
      { sanskrit: "ततः", transliteration: "tataḥ", meaning: "then" },
      { sanskrit: "विनियुज्य", transliteration: "viniyujya", meaning: "having deployed" },
      { sanskrit: "वानरान्", transliteration: "vānarān", meaning: "vanaras" },
      { sanskrit: "समुद्रम्", transliteration: "samudram", meaning: "ocean" },
      { sanskrit: "समुद्रस्तुतः", transliteration: "samudrastutaḥ", meaning: "praised by ocean" },
    ],
  },
  {
    id: "6-115-21",
    kanda: 6,
    sarga: 115,
    verse: 21,
    sanskrit: "रामो राजमणिः सर्वेषां देवानामिव वासवः |",
    transliteration: "rāmo rājamaṇiḥ sarveṣāṃ devānām iva vāsavaḥ |",
    translation: "Rama is the king of all, like Indra among the gods,",
    wordByWord: [
      { sanskrit: "रामः", transliteration: "rāmaḥ", meaning: "Rama" },
      { sanskrit: "राजमणिः", transliteration: "rājamaṇiḥ", meaning: "king" },
      { sanskrit: "सर्वेषाम्", transliteration: "sarveṣām", meaning: "of all" },
      { sanskrit: "देवानाम्", transliteration: "devānām", meaning: "of gods" },
      { sanskrit: "इव", transliteration: "iva", meaning: "like" },
      { sanskrit: "वासवः", transliteration: "vāsavaḥ", meaning: "Indra" },
    ],
  },

  // Kanda 7: Uttara Kanda (Later) - 111 Sargas
  {
    id: "7-1-1",
    kanda: 7,
    sarga: 1,
    verse: 1,
    sanskrit: "ततो रामो महातेजा अयोध्यां प्रत्यागतः |",
    transliteration: "tato rāmo mahātejā ayodhyāṃ pratyāgataḥ |",
    translation: "Then the great-souled Rama returned to Ayodhya,",
    wordByWord: [
      { sanskrit: "ततः", transliteration: "tataḥ", meaning: "then" },
      { sanskrit: "रामः", transliteration: "rāmaḥ", meaning: "Rama" },
      { sanskrit: "महातेजा", transliteration: "mahātejā", meaning: "great-souled" },
      { sanskrit: "अयोध्याम्", transliteration: "ayodhyām", meaning: "to Ayodhya" },
      { sanskrit: "प्रत्यागतः", transliteration: "pratyāgataḥ", meaning: "returned" },
    ],
  },
  {
    id: "7-111-1",
    kanda: 7,
    sarga: 111,
    verse: 1,
    sanskrit: "रामो दशरथस्य पुत्रः श्रीमान् विश्वधर्मकृत् |",
    transliteration: "rāmo daśarathasya putraḥ śrīmān viśvadharma-kṛt |",
    translation:
      "Rama, son of Dasharatha, the illustrious one, who established dharma throughout the world,",
    wordByWord: [
      { sanskrit: "रामः", transliteration: "rāmaḥ", meaning: "Rama" },
      { sanskrit: "दशरथस्य", transliteration: "daśarathasya", meaning: "of Dasharatha" },
      { sanskrit: "पुत्रः", transliteration: "putraḥ", meaning: "son" },
      { sanskrit: "श्रीमान्", transliteration: "śrīmān", meaning: "illustrious" },
      { sanskrit: "विश्व", transliteration: "viśva", meaning: "world" },
      { sanskrit: "धर्मकृत्", transliteration: "dharmakṛt", meaning: "establisher of dharma" },
    ],
  },
];

export function getVerseById(id: string): RamayanaVerse | undefined {
  return RAMAYANA.find((verse) => verse.id === id);
}

export function getVersesByKanda(kanda: number): RamayanaVerse[] {
  return RAMAYANA.filter((verse) => verse.kanda === kanda);
}

export function searchVerses(query: string): RamayanaVerse[] {
  const lowerQuery = query.toLowerCase();
  return RAMAYANA.filter(
    (verse) =>
      verse.sanskrit.includes(lowerQuery) ||
      verse.transliteration.includes(lowerQuery) ||
      verse.translation.toLowerCase().includes(lowerQuery)
  );
}

export const KANDA_TITLES = {
  1: "Bala Kanda - Childhood",
  2: "Ayodhya Kanda - Ayodhya",
  3: "Aranya Kanda - Forest",
  4: "Kishkindha Kanda - Kishkindha",
  5: "Sundara Kanda - Beautiful",
  6: "Yuddha Kanda - War",
  7: "Uttara Kanda - Later",
};

export const KANDA_DESCRIPTIONS = {
  1: "The story of Rama's birth, education, marriage to Sita, and exile",
  2: "Rama's life in Ayodhya, Kaikeyi's boons, and Rama's exile",
  3: "Rama, Sita, and Lakshmana in the forest; Surpanakha incident; Sita's abduction",
  4: "Rama meets Hanuman and Sugriva; search for Sita begins",
  5: "Hanuman's journey to Lanka; finding Sita; burning of Lanka",
  6: "Building the bridge; war with Ravana; victory; return to Ayodhya",
  7: "Rama's rule; Sita's exile; birth of Lava and Kusha; Sita's return to earth",
};
