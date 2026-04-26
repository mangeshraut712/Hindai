// Dhatu (Verb Root) Dictionary
// Indexed starter records for Sanskrit verb roots.

import { Dhatu } from "./types";

export const DHATUS: Dhatu[] = [
  // Bhvadi Gana (1st Gana)
  {
    id: "bh-u",
    root: "भू",
    sanskrit: "भू",
    transliteration: "bhū",
    meaning: "to be, exist, become",
    ganah: "Bhvadi",
    pada: "Ubhayapada",
    artha: "existence, being, becoming",
    examples: [
      { sanskrit: "भवति", transliteration: "bhavati", meaning: "he/she/it is" },
      { sanskrit: "भविष्यति", transliteration: "bhaviṣyati", meaning: "he/she/it will be" },
      { sanskrit: "अभूत्", transliteration: "abhūt", meaning: "was" },
    ],
  },
  {
    id: "gam",
    root: "गम्",
    sanskrit: "गम्",
    transliteration: "gam",
    meaning: "to go",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "movement, going",
    examples: [
      { sanskrit: "गच्छति", transliteration: "gacchati", meaning: "he/she/it goes" },
      { sanskrit: "अगच्छत्", transliteration: "agacchat", meaning: "went" },
    ],
  },
  {
    id: "stha",
    root: "स्था",
    sanskrit: "स्था",
    transliteration: "sthā",
    meaning: "to stand",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "standing, remaining",
    examples: [
      { sanskrit: "तिष्ठति", transliteration: "tiṣṭhati", meaning: "he/she/it stands" },
      { sanskrit: "अत्थात्", transliteration: "athāt", meaning: "stood" },
    ],
  },
  {
    id: "pa-th",
    root: "पथ्",
    sanskrit: "पथ्",
    transliteration: "path",
    meaning: "to go, fall",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "going, falling",
    examples: [
      { sanskrit: "पतति", transliteration: "patati", meaning: "he/she/it falls" },
      { sanskrit: "अपतत्", transliteration: "apatat", meaning: "fell" },
    ],
  },
  {
    id: "vad",
    root: "वद्",
    sanskrit: "वद्",
    transliteration: "vad",
    meaning: "to speak",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "speaking, saying",
    examples: [
      { sanskrit: "वदति", transliteration: "vadati", meaning: "he/she/it speaks" },
      { sanskrit: "अवदत्", transliteration: "avadat", meaning: "spoke" },
    ],
  },
  {
    id: "brav",
    root: "ब्रू",
    sanskrit: "ब्रू",
    transliteration: "brū",
    meaning: "to speak, tell",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "speaking, telling",
    examples: [
      { sanskrit: "ब्रवीति", transliteration: "bravīti", meaning: "he/she/it tells" },
      { sanskrit: "अब्रवीत्", transliteration: "abravīt", meaning: "told" },
    ],
  },
  {
    id: "dhan",
    root: "धन्",
    sanskrit: "धन्",
    transliteration: "dhan",
    meaning: "to hold, support",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "holding, supporting",
    examples: [
      { sanskrit: "धनति", transliteration: "dhanati", meaning: "he/she/it holds" },
      { sanskrit: "अधनत्", transliteration: "adhanat", meaning: "held" },
    ],
  },
  {
    id: "jan",
    root: "जन्",
    sanskrit: "जन्",
    transliteration: "jan",
    meaning: "to be born, produce",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "birth, production",
    examples: [
      { sanskrit: "जायते", transliteration: "jāyate", meaning: "is born" },
      { sanskrit: "अजायत", transliteration: "ajāyata", meaning: "was born" },
    ],
  },
  {
    id: "han",
    root: "हन्",
    sanskrit: "हन्",
    transliteration: "han",
    meaning: "to kill, strike",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "killing, striking",
    examples: [
      { sanskrit: "हन्ति", transliteration: "hanti", meaning: "he/she/it kills" },
      { sanskrit: "अहनत्", transliteration: "ahanat", meaning: "killed" },
    ],
  },
  {
    id: "da",
    root: "दा",
    sanskrit: "दा",
    transliteration: "dā",
    meaning: "to give",
    ganah: "Bhvadi",
    pada: "Ubhayapada",
    artha: "giving",
    examples: [
      { sanskrit: "ददाति", transliteration: "dadāti", meaning: "he/she/it gives" },
      { sanskrit: "अदात्", transliteration: "adāt", meaning: "gave" },
    ],
  },
  {
    id: "kr",
    root: "कृ",
    sanskrit: "कृ",
    transliteration: "kṛ",
    meaning: "to do, make",
    ganah: "Bhvadi",
    pada: "Ubhayapada",
    artha: "doing, making",
    examples: [
      { sanskrit: "करोति", transliteration: "karoti", meaning: "he/she/it does" },
      { sanskrit: "अकरोत्", transliteration: "akarot", meaning: "did" },
    ],
  },
  {
    id: "pa-ch",
    root: "पच्",
    sanskrit: "पच्",
    transliteration: "pac",
    meaning: "to cook, digest",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "cooking, digesting",
    examples: [
      { sanskrit: "पचति", transliteration: "pacati", meaning: "he/she/it cooks" },
      { sanskrit: "अपचत्", transliteration: "apacat", meaning: "cooked" },
    ],
  },
  {
    id: "pib",
    root: "पिब्",
    sanskrit: "पिब्",
    transliteration: "pib",
    meaning: "to drink",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "drinking",
    examples: [
      { sanskrit: "पिबति", transliteration: "pibati", meaning: "he/she/it drinks" },
      { sanskrit: "अपीबत्", transliteration: "apībat", meaning: "drank" },
    ],
  },
  {
    id: "vid",
    root: "विद्",
    sanskrit: "विद्",
    transliteration: "vid",
    meaning: "to know",
    ganah: "Bhvadi",
    pada: "Ubhayapada",
    artha: "knowing, knowledge",
    examples: [
      { sanskrit: "वेत्ति", transliteration: "vetti", meaning: "he/she/it knows" },
      { sanskrit: "अवेत्", transliteration: "avet", meaning: "knew" },
    ],
  },
  {
    id: "sidh",
    root: "सिध्",
    sanskrit: "सिध्",
    transliteration: "sidh",
    meaning: "to succeed, accomplish",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "success, accomplishment",
    examples: [
      { sanskrit: "सिध्यति", transliteration: "sidhyati", meaning: "he/she/it succeeds" },
      { sanskrit: "असिद्यत्", transliteration: "asidhyat", meaning: "succeeded" },
    ],
  },
  {
    id: "yaj",
    root: "यज्",
    sanskrit: "यज्",
    transliteration: "yaj",
    meaning: "to worship, sacrifice",
    ganah: "Bhvadi",
    pada: "Ubhayapada",
    artha: "worship, sacrifice",
    examples: [
      { sanskrit: "यजति", transliteration: "yajati", meaning: "he/she/it worships" },
      { sanskrit: "अयजत्", transliteration: "ayajat", meaning: "worshipped" },
    ],
  },
  {
    id: "vraj",
    root: "व्रज्",
    sanskrit: "व्रज्",
    transliteration: "vraj",
    meaning: "to go, approach",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "going, approaching",
    examples: [
      { sanskrit: "व्रजति", transliteration: "vrajati", meaning: "he/she/it goes" },
      { sanskrit: "अव्रजत्", transliteration: "avrajat", meaning: "went" },
    ],
  },
  {
    id: "shr",
    root: "श्र",
    sanskrit: "श्र",
    transliteration: "śr",
    meaning: "to hear, listen",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "hearing, listening",
    examples: [
      { sanskrit: "शृणोति", transliteration: "śṛṇoti", meaning: "he/she/it hears" },
      { sanskrit: "अशृणोत्", transliteration: "aśṛṇot", meaning: "heard" },
    ],
  },
  {
    id: "drish",
    root: "दृश्",
    sanskrit: "दृश्",
    transliteration: "dṛś",
    meaning: "to see",
    ganah: "Bhvadi",
    pada: "Ubhayapada",
    artha: "seeing, vision",
    examples: [
      { sanskrit: "पश्यति", transliteration: "paśyati", meaning: "he/she/it sees" },
      { sanskrit: "अपश्यत्", transliteration: "apaśyat", meaning: "saw" },
    ],
  },
  {
    id: "snih",
    root: "स्निह्",
    sanskrit: "स्निह्",
    transliteration: "snih",
    meaning: "to love, be attached",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "love, attachment",
    examples: [
      { sanskrit: "स्निह्यति", transliteration: "snihyati", meaning: "he/she/it loves" },
      { sanskrit: "अस्निह्यत्", transliteration: "asnihyat", meaning: "loved" },
    ],
  },

  // Adadi Gana (2nd Gana)
  {
    id: "ad",
    root: "अद्",
    sanskrit: "अद्",
    transliteration: "ad",
    meaning: "to eat",
    ganah: "Adadi",
    pada: "Parasmaipada",
    artha: "eating",
    examples: [
      { sanskrit: "अत्ति", transliteration: "atti", meaning: "he/she/it eats" },
      { sanskrit: "अदत्", transliteration: "adat", meaning: "ate" },
    ],
  },
  {
    id: "kship",
    root: "क्षिप्",
    sanskrit: "क्षिप्",
    transliteration: "kṣip",
    meaning: "to throw, scatter",
    ganah: "Adadi",
    pada: "Parasmaipada",
    artha: "throwing, scattering",
    examples: [
      { sanskrit: "क्षिपति", transliteration: "kṣipati", meaning: "he/she/it throws" },
      { sanskrit: "अक्षिपत्", transliteration: "akṣipat", meaning: "threw" },
    ],
  },
  {
    id: "lip",
    root: "लिप्",
    sanskrit: "लिप्",
    transliteration: "lip",
    meaning: "to anoint, smear",
    ganah: "Adadi",
    pada: "Parasmaipada",
    artha: "anointing, smearing",
    examples: [
      { sanskrit: "लिप्यति", transliteration: "lipyati", meaning: "he/she/it anoints" },
      { sanskrit: "अलिप्यत्", transliteration: "alipyat", meaning: "anointed" },
    ],
  },

  // Juhotyadi Gana (3rd Gana)
  {
    id: "hu",
    root: "हु",
    sanskrit: "हु",
    transliteration: "hu",
    meaning: "to sacrifice, offer",
    ganah: "Juhotyadi",
    pada: "Parasmaipada",
    artha: "sacrifice, offering",
    examples: [
      { sanskrit: "होति", transliteration: "hoti", meaning: "he/she/it sacrifices" },
      { sanskrit: "अहोत्", transliteration: "ahot", meaning: "sacrificed" },
    ],
  },
  {
    id: "gru",
    root: "ग्रु",
    sanskrit: "ग्रु",
    transliteration: "gru",
    meaning: "to swallow",
    ganah: "Juhotyadi",
    pada: "Parasmaipada",
    artha: "swallowing",
    examples: [
      { sanskrit: "ग्रावणाति", transliteration: "grāvaṇāti", meaning: "he/she/it swallows" },
      { sanskrit: "अग्रावणात्", transliteration: "agrāvaṇāt", meaning: "swallowed" },
    ],
  },

  // Divadi Gana (4th Gana)
  {
    id: "div",
    root: "दिव्",
    sanskrit: "दिव्",
    transliteration: "div",
    meaning: "to play, gamble",
    ganah: "Divadi",
    pada: "Parasmaipada",
    artha: "playing, gambling",
    examples: [
      { sanskrit: "द्युते", transliteration: "dyute", meaning: "he/she/it plays" },
      { sanskrit: "अद्युत", transliteration: "adyuta", meaning: "played" },
    ],
  },
  {
    id: "sridh",
    root: "सृध्",
    sanskrit: "सृध्",
    transliteration: "sṛdh",
    meaning: "to go, move",
    ganah: "Divadi",
    pada: "Parasmaipada",
    artha: "going, moving",
    examples: [
      { sanskrit: "सरति", transliteration: "sarati", meaning: "he/she/it goes" },
      { sanskrit: "असरत्", transliteration: "asarat", meaning: "went" },
    ],
  },

  // Svadi Gana (5th Gana)
  {
    id: "su",
    root: "सु",
    sanskrit: "सु",
    transliteration: "su",
    meaning: "to press, squeeze",
    ganah: "Svadi",
    pada: "Parasmaipada",
    artha: "pressing, squeezing",
    examples: [
      { sanskrit: "सुनोति", transliteration: "sunoti", meaning: "he/she/it presses" },
      { sanskrit: "असुनोत्", transliteration: "asunot", meaning: "pressed" },
    ],
  },

  // Tudadi Gana (6th Gana)
  {
    id: "tud",
    root: "तुद्",
    sanskrit: "तुद्",
    transliteration: "tud",
    meaning: "to push, strike",
    ganah: "Tudadi",
    pada: "Parasmaipada",
    artha: "pushing, striking",
    examples: [
      { sanskrit: "तुद्यति", transliteration: "tudyati", meaning: "he/she/it pushes" },
      { sanskrit: "अतुद्यत्", transliteration: "atudyat", meaning: "pushed" },
    ],
  },
  {
    id: "shudh",
    root: "शुद्",
    sanskrit: "शुद्",
    transliteration: "śudh",
    meaning: "to purify",
    ganah: "Tudadi",
    pada: "Parasmaipada",
    artha: "purifying",
    examples: [
      { sanskrit: "शोधयति", transliteration: "śodhayati", meaning: "he/she/it purifies" },
      { sanskrit: "अशोधयत्", transliteration: "aśodhayat", meaning: "purified" },
    ],
  },

  // Rudhadi Gana (7th Gana)
  {
    id: "rudh",
    root: "रुध्",
    sanskrit: "रुध्",
    transliteration: "rudh",
    meaning: "to obstruct, prevent",
    ganah: "Rudhadi",
    pada: "Ubhayapada",
    artha: "obstructing, preventing",
    examples: [
      { sanskrit: "रोधति", transliteration: "rodhati", meaning: "he/she/it obstructs" },
      { sanskrit: "अरोधत्", transliteration: "arodhat", meaning: "obstructed" },
    ],
  },
  {
    id: "vrudh",
    root: "वृध्",
    sanskrit: "वृध्",
    transliteration: "vṛdh",
    meaning: "to grow, increase",
    ganah: "Rudhadi",
    pada: "Parasmaipada",
    artha: "growing, increasing",
    examples: [
      { sanskrit: "वर्धते", transliteration: "vardhate", meaning: "it grows" },
      { sanskrit: "अवर्धत", transliteration: "avardhata", meaning: "grew" },
    ],
  },

  // Tanadi Gana (8th Gana)
  {
    id: "tan",
    root: "तन्",
    sanskrit: "तन्",
    transliteration: "tan",
    meaning: "to stretch, extend",
    ganah: "Tanadi",
    pada: "Parasmaipada",
    artha: "stretching, extending",
    examples: [
      { sanskrit: "तनोति", transliteration: "tanoti", meaning: "he/she/it stretches" },
      { sanskrit: "अतनोत्", transliteration: "atanot", meaning: "stretched" },
    ],
  },

  // Kryadi Gana (9th Gana)
  {
    id: "krin",
    root: "क्रीण्",
    sanskrit: "क्रीण्",
    transliteration: "krīṇ",
    meaning: "to buy",
    ganah: "Kryadi",
    pada: "Parasmaipada",
    artha: "buying",
    examples: [
      { sanskrit: "क्रीणाति", transliteration: "krīṇāti", meaning: "he/she/it buys" },
      { sanskrit: "अक्रीणात्", transliteration: "akrīṇāt", meaning: "bought" },
    ],
  },

  // Curadi Gana (10th Gana)
  {
    id: "cur",
    root: "चुर्",
    sanskrit: "चुर्",
    transliteration: "cur",
    meaning: "to steal",
    ganah: "Curadi",
    pada: "Parasmaipada",
    artha: "stealing",
    examples: [
      { sanskrit: "चोरयति", transliteration: "corayati", meaning: "he/she/it steals" },
      { sanskrit: "अचोरयत्", transliteration: "acorayat", meaning: "stole" },
    ],
  },
  {
    id: "bhram",
    root: "भ्रम्",
    sanskrit: "भ्रम्",
    transliteration: "bhram",
    meaning: "to wander, roam",
    ganah: "Curadi",
    pada: "Parasmaipada",
    artha: "wandering, roaming",
    examples: [
      { sanskrit: "भ्रामयति", transliteration: "bhramayati", meaning: "he/she/it wanders" },
      { sanskrit: "अभ्रामयत्", transliteration: "abhramayat", meaning: "wandered" },
    ],
  },
];

// Additional common roots (expanded collection)
export const ADDITIONAL_DHATUS: Dhatu[] = [
  {
    id: "nam",
    root: "नम्",
    sanskrit: "नम्",
    transliteration: "nam",
    meaning: "to bow, salute",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "bowing, saluting",
    examples: [
      { sanskrit: "नमति", transliteration: "namati", meaning: "he/she/it bows" },
      { sanskrit: "अनमत्", transliteration: "anamat", meaning: "bowed" },
    ],
  },
  {
    id: "smar",
    root: "स्मर्",
    sanskrit: "स्मर्",
    transliteration: "smar",
    meaning: "to remember",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "remembering",
    examples: [
      { sanskrit: "स्मरति", transliteration: "smarati", meaning: "he/she/it remembers" },
      { sanskrit: "अस्मरत्", transliteration: "asmarat", meaning: "remembered" },
    ],
  },
  {
    id: "man",
    root: "मन्",
    sanskrit: "मन्",
    transliteration: "man",
    meaning: "to think",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "thinking",
    examples: [
      { sanskrit: "मन्यते", transliteration: "manyate", meaning: "he/she/it thinks" },
      { sanskrit: "अमन्यत", transliteration: "amanyata", meaning: "thought" },
    ],
  },
  {
    id: "dhya",
    root: "ध्यै",
    sanskrit: "ध्यै",
    transliteration: "dhyai",
    meaning: "to meditate",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "meditating",
    examples: [
      { sanskrit: "ध्यायति", transliteration: "dhyāyati", meaning: "he/she/it meditates" },
      { sanskrit: "अध्यायत्", transliteration: "adhyāyat", meaning: "meditated" },
    ],
  },
  {
    id: "pooj",
    root: "पूज्",
    sanskrit: "पूज्",
    transliteration: "pūj",
    meaning: "to worship",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "worshipping",
    examples: [
      { sanskrit: "पूजयति", transliteration: "pūjayati", meaning: "he/she/it worships" },
      { sanskrit: "अपूजयत्", transliteration: "apūjayat", meaning: "worshipped" },
    ],
  },
  {
    id: "arch",
    root: "अर्च्",
    sanskrit: "अर्च्",
    transliteration: "arc",
    meaning: "to worship, honor",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "worshipping, honoring",
    examples: [
      { sanskrit: "अर्चयति", transliteration: "arcayati", meaning: "he/she/it worships" },
      { sanskrit: "अनर्चयत्", transliteration: "anarcayat", meaning: "worshipped" },
    ],
  },
  {
    id: "upas",
    root: "उपस्",
    sanskrit: "उपस्",
    transliteration: "upas",
    meaning: "to sit near, worship",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "sitting near, worshipping",
    examples: [
      { sanskrit: "उपासते", transliteration: "upāsate", meaning: "he/she/it worships" },
      { sanskrit: "अनुपासत", transliteration: "anupāsata", meaning: "worshipped" },
    ],
  },
  {
    id: "pra-nam",
    root: "प्र-नम्",
    sanskrit: "प्रणम्",
    transliteration: "pra-nam",
    meaning: "to bow down",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "bowing down",
    examples: [
      { sanskrit: "प्रणमति", transliteration: "praṇamati", meaning: "he/she/it bows down" },
      { sanskrit: "अप्रणमत्", transliteration: "apraṇamat", meaning: "bowed down" },
    ],
  },
  {
    id: "vand",
    root: "वन्द्",
    sanskrit: "वन्द्",
    transliteration: "vand",
    meaning: "to salute, praise",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "saluting, praising",
    examples: [
      { sanskrit: "वन्दते", transliteration: "vandate", meaning: "he/she/it salutes" },
      { sanskrit: "अवन्दत", transliteration: "avandata", meaning: "saluted" },
    ],
  },
  {
    id: "stuv",
    root: "स्तुव्",
    sanskrit: "स्तुव्",
    transliteration: "stuv",
    meaning: "to praise",
    ganah: "Bhvadi",
    pada: "Parasmaipada",
    artha: "praising",
    examples: [
      { sanskrit: "स्तुवति", transliteration: "stuvati", meaning: "he/she/it praises" },
      { sanskrit: "अस्तुवत्", transliteration: "astuvat", meaning: "praised" },
    ],
  },
];

// Combine all dhatus
export const ALL_DHATUS = [...DHATUS, ...ADDITIONAL_DHATUS];

// Search functions
export function searchDhatuByRoot(root: string): Dhatu[] {
  return ALL_DHATUS.filter(
    (dhatu) => dhatu.root.includes(root) || dhatu.transliteration.includes(root)
  );
}

export function searchDhatuByMeaning(meaning: string): Dhatu[] {
  return ALL_DHATUS.filter(
    (dhatu) => dhatu.meaning.includes(meaning) || dhatu.artha.includes(meaning)
  );
}

export function getDhatuById(id: string): Dhatu | undefined {
  return ALL_DHATUS.find((dhatu) => dhatu.id === id);
}

export function getDhatusByGana(ganah: string): Dhatu[] {
  return ALL_DHATUS.filter((dhatu) => dhatu.ganah === ganah);
}
