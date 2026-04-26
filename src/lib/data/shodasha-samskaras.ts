// Shodasha Samskaras - 16 Rites of Passage in Hinduism
// The sacraments that mark important stages in a person's life

export interface Samskara {
  id: number;
  name: string;
  sanskrit: string;
  meaning: string;
  timing: string;
  description: string;
  rituals: string[];
  significance: string;
  modernPractice: string;
}

export const SHODASHA_SAMSKARAS: Samskara[] = [
  {
    id: 1,
    name: "Garbhadhana",
    sanskrit: "गर्भाधान",
    meaning: "Conception",
    timing: "Before conception",
    description:
      "A ritual performed to ensure the conception of a healthy and virtuous child. It involves prayers and mantras for divine blessings.",
    rituals: [
      "Prayers for healthy offspring",
      "Mantra chanting",
      "Offering to deities",
      "Couple's purification",
    ],
    significance:
      "Ensures spiritual and physical well-being of the future child. Marks the beginning of the journey of life.",
    modernPractice:
      "Couples may perform prayers or visit temples before planning conception. Some families maintain traditional practices.",
  },
  {
    id: 2,
    name: "Pumsavana",
    sanskrit: "पुंसवन",
    meaning: "Male fetus protection",
    timing: "2nd or 3rd month of pregnancy",
    description:
      "A ritual performed to ensure the birth of a male child and protect the fetus. It involves specific mantras and offerings.",
    rituals: [
      "Mantra chanting for male child",
      "Offering to deities",
      "Special diet for mother",
      "Protective rituals",
    ],
    significance:
      "Traditionally important for ensuring lineage continuation. Focuses on protection of the unborn child.",
    modernPractice:
      "Often modified to prayers for healthy child regardless of gender. Some families maintain traditional practices.",
  },
  {
    id: 3,
    name: "Simantonnayana",
    sanskrit: "सीमन्तोन्नयन",
    meaning: "Parting the hair",
    timing: "4th to 7th month of pregnancy",
    description:
      "A ceremony to part the pregnant woman's hair, symbolizing the well-being of mother and child. It's a celebration of pregnancy.",
    rituals: ["Hair parting ceremony", "Gifts to mother", "Feasting", "Blessings from elders"],
    significance:
      "Celebrates the pregnancy and ensures protection of mother and child. Marks the visible growth of pregnancy.",
    modernPractice:
      "Often celebrated as baby shower or godh bharai. Family and friends gather to bless the expectant mother.",
  },
  {
    id: 4,
    name: "Jatakarma",
    sanskrit: "जातकर्म",
    meaning: "Birth ceremony",
    timing: "Immediately after birth",
    description:
      "Rituals performed immediately after the birth of a child to welcome the newborn and ensure their well-being.",
    rituals: [
      "Honey and ghee on tongue",
      "Whispering of mantras in ear",
      "Naming ceremony preparation",
      "Protection rituals",
    ],
    significance:
      "Welcomes the child into the world and invokes divine blessings. Marks the beginning of earthly life.",
    modernPractice:
      "Simplified version often performed in hospitals. Families may perform traditional rituals at home.",
  },
  {
    id: 5,
    name: "Namakarana",
    sanskrit: "नामकरण",
    meaning: "Naming ceremony",
    timing: "11th or 12th day after birth",
    description:
      "The formal naming ceremony where the child is given a name based on nakshatra (birth star) and family traditions.",
    rituals: [
      "Horoscope preparation",
      "Name selection based on nakshatra",
      "Naming ceremony",
      "Feasting and celebration",
    ],
    significance:
      "Gives the child their identity. The name is believed to influence the child's personality and destiny.",
    modernPractice:
      "Widely practiced in traditional families. Names may be chosen based on modern preferences alongside traditional methods.",
  },
  {
    id: 6,
    name: "Nishkramana",
    sanskrit: "निष्क्रमण",
    meaning: "First outing",
    timing: "3rd or 4th month after birth",
    description:
      "The child's first outing from home, usually to a temple, to introduce them to the outside world and seek divine blessings.",
    rituals: [
      "First visit to temple",
      "Sun worship",
      "Exposure to moonlight",
      "Blessings from elders",
    ],
    significance:
      "Introduces the child to the world and divine presence. Marks the beginning of social interaction.",
    modernPractice:
      "Families take babies to temples or religious places for first outing. Often combined with vaccination visits.",
  },
  {
    id: 7,
    name: "Annaprashana",
    sanskrit: "अन्नप्राशन",
    meaning: "First solid food",
    timing: "6th month after birth",
    description:
      "The ceremony of giving the child solid food for the first time, marking the transition from milk to solids.",
    rituals: [
      "Feeding first solid food",
      "Offering to deities",
      "Feasting",
      "Blessings from elders",
    ],
    significance:
      "Marks an important developmental milestone. Ensures proper nutrition and growth.",
    modernPractice:
      "Widely celebrated as a family gathering. The first food is often rice pudding (kheer) or similar.",
  },
  {
    id: 8,
    name: "Chudakarana",
    sanskrit: "चूडाकरण",
    meaning: "Tonsure",
    timing: "1st to 3rd year",
    description:
      "The first haircut ceremony, where the child's hair is shaved off as an offering to deities.",
    rituals: ["Head shaving", "Offering hair to deity", "Bathing ceremony", "Feasting"],
    significance:
      "Symbolizes purification and removal of past karma. Marks the child's growth and development.",
    modernPractice:
      "Often performed at temples like Tirupati. Some families maintain traditional practices at home.",
  },
  {
    id: 9,
    name: "Karnavedha",
    sanskrit: "कर्णवेध",
    meaning: "Ear piercing",
    timing: "1st to 3rd year",
    description:
      "The ear piercing ceremony, traditionally done for both boys and girls, though now mainly for girls.",
    rituals: ["Ear piercing", "Offering to deities", "Blessings", "Feasting"],
    significance:
      "Believed to have health benefits and spiritual significance. Marks cultural identity.",
    modernPractice:
      "Mainly performed for girls. Often done at jewelry shops or by traditional practitioners.",
  },
  {
    id: 10,
    name: "Vidyarambha",
    sanskrit: "विद्यारम्भ",
    meaning: "Beginning of education",
    timing: "3rd to 5th year",
    description:
      "The ceremony marking the beginning of formal education, where the child learns to write their first letters.",
    rituals: [
      "Writing first letters",
      "Worship of Saraswati",
      "Offering of books",
      "Blessings from teachers",
    ],
    significance:
      "Marks the beginning of the educational journey. Invokes blessings for academic success.",
    modernPractice:
      "Often celebrated on Vijay Dashami (Dussehra). Children start formal education or join preschool.",
  },
  {
    id: 11,
    name: "Upanayana",
    sanskrit: "उपनयन",
    meaning: "Sacred thread ceremony",
    timing: "8th to 12th year (for boys)",
    description:
      "The investiture ceremony where the sacred thread (yajnopavita) is given, marking the beginning of Vedic studies.",
    rituals: [
      "Wearing sacred thread",
      "Gayatri mantra initiation",
      "Fire ritual (homa)",
      "Blessings from guru",
    ],
    significance:
      "Marks the beginning of formal spiritual education. The sacred thread symbolizes the three debts (to rishis, gods, and ancestors).",
    modernPractice:
      "Mainly practiced by Brahmin families. Some communities have modified or discontinued this practice.",
  },
  {
    id: 12,
    name: "Vedarambha",
    sanskrit: "वेदारम्भ",
    meaning: "Beginning of Vedic study",
    timing: "After Upanayana",
    description:
      "The formal beginning of Vedic studies, where the student starts learning the Vedas under a guru.",
    rituals: ["Start of Vedic recitation", "Guru puja", "Daily rituals", "Study of scriptures"],
    significance:
      "Marks the beginning of serious spiritual education. Essential for preserving Vedic knowledge.",
    modernPractice:
      "Rarely practiced in its traditional form. Some families send children to Vedic schools or gurukulas.",
  },
  {
    id: 13,
    name: "Keshanta",
    sanskrit: "केशान्त",
    meaning: "First shave of beard",
    timing: "16th to 20th year",
    description:
      "The ceremony of shaving the beard for the first time, marking the transition to adulthood.",
    rituals: ["Beard shaving", "Bathing ceremony", "Offering to deities", "Feasting"],
    significance:
      "Marks the transition from childhood to adulthood. Symbolizes maturity and responsibility.",
    modernPractice:
      "Rarely performed as a formal ceremony. Young men simply start shaving when they reach puberty.",
  },
  {
    id: 14,
    name: "Samavartana",
    sanskrit: "समावर्तन",
    meaning: "Completion of education",
    timing: "After completion of Vedic studies",
    description: "The graduation ceremony marking the completion of Vedic studies under a guru.",
    rituals: ["Final bath", "Offering to guru", "Return to family", "Feasting"],
    significance:
      "Marks the completion of formal education. The student is now ready to enter household life.",
    modernPractice:
      "Replaced by modern graduation ceremonies. Some traditional gurukulas maintain this practice.",
  },
  {
    id: 15,
    name: "Vivaha",
    sanskrit: "विवाह",
    meaning: "Marriage",
    timing: "Adulthood",
    description:
      "The marriage ceremony, one of the most important samskaras, uniting two individuals in a sacred bond.",
    rituals: [
      "Kanyadaan (giving away daughter)",
      "Saptapadi (seven steps)",
      "Mangalsutra tying",
      "Fire ritual (homa)",
    ],
    significance:
      "Marks the beginning of household life (grihastha ashrama). Creates a sacred bond between husband and wife.",
    modernPractice:
      "Widely practiced with various regional customs. Often elaborate multi-day celebrations.",
  },
  {
    id: 16,
    name: "Antyeshti",
    sanskrit: "अन्त्येष्टि",
    meaning: "Last rites",
    timing: "After death",
    description:
      "The funeral rites performed after death to ensure the soul's peaceful journey to the afterlife.",
    rituals: ["Cremation", "Offering to ancestors", "Post-death ceremonies", "Annual remembrance"],
    significance:
      "Ensures the peaceful transition of the soul. Provides closure for the family and honors the deceased.",
    modernPractice:
      "Cremation is the primary method. Post-death ceremonies (shraddha) are still observed by many families.",
  },
];

export function getSamskaraById(id: number): Samskara | undefined {
  return SHODASHA_SAMSKARAS.find((samskara) => samskara.id === id);
}

export function getSamskaraByName(name: string): Samskara | undefined {
  return SHODASHA_SAMSKARAS.find(
    (samskara) => samskara.name.toLowerCase() === name.toLowerCase() || samskara.sanskrit === name
  );
}

export function searchSamskaras(query: string): Samskara[] {
  const lowerQuery = query.toLowerCase();
  return SHODASHA_SAMSKARAS.filter(
    (samskara) =>
      samskara.name.toLowerCase().includes(lowerQuery) ||
      samskara.sanskrit.includes(lowerQuery) ||
      samskara.meaning.toLowerCase().includes(lowerQuery) ||
      samskara.description.toLowerCase().includes(lowerQuery)
  );
}
