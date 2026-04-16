export type ScriptureItem = {
  slug: string;
  name: string;
  sanskrit: string;
  category: string;
  description: string;
  highlight: string;
  href: string;
  language?: string;
  approximateDate?: string;
  keyConcepts?: string[];
  readingLens?: string;
};

export type ScriptureSection = {
  id: string;
  title: string;
  description: string;
  items: ScriptureItem[];
};

export const scriptureSections: ScriptureSection[] = [
  {
    id: "vedas",
    title: "Vedas",
    description:
      "Foundational hymns, rituals, and philosophical seeds from the oldest Sanskrit tradition.",
    items: [
      {
        slug: "rigveda",
        name: "Rigveda",
        sanskrit: "ऋग्वेद",
        category: "Veda",
        description:
          "The oldest layer of Vedic poetry, invocation, and cosmic imagination.",
        highlight: "Hymns, cosmology, praise",
        href: "/rigveda/",
        language: "Vedic Sanskrit",
        approximateDate: "~1500–1200 BCE",
        keyConcepts: ["Cosmology", "Hymns", "Ritual", "Nature"],
        readingLens:
          "Begin with the opening hymns and treat the text as poetic cosmology, not only ritual material.",
      },
    ],
  },
  {
    id: "epics",
    title: "Epics",
    description:
      "Narratives of duty, exile, war, devotion, kinship, and the moral pressure of action.",
    items: [
      {
        slug: "mahabharata",
        name: "Mahabharata",
        sanskrit: "महाभारत",
        category: "Epic",
        description:
          "A civilizational epic about dharma under impossible human conditions.",
        highlight: "Dharma, statecraft, war",
        href: "/mahabharata/",
        language: "Sanskrit",
        approximateDate: "~400 BCE–400 CE",
        keyConcepts: ["Dharma", "Politics", "War", "Kinship"],
        readingLens:
          "Use it as a text of ethical tension: the interesting questions are usually the unresolved ones.",
      },
      {
        slug: "ramayana",
        name: "Ramayana",
        sanskrit: "रामायण",
        category: "Epic",
        description:
          "The journey of Rama, Sita, Lakshmana, and Hanuman through love and duty.",
        highlight: "Exile, devotion, kingship",
        href: "/ramayana/",
        language: "Sanskrit",
        approximateDate: "~500 BCE–100 BCE",
        keyConcepts: ["Devotion", "Kingship", "Exile", "Dharma"],
        readingLens:
          "Read it as both a narrative and a study in conduct, relationship, and rule.",
      },
      {
        slug: "bhagavad-gita",
        name: "Bhagavad Gita",
        sanskrit: "श्रीमद्भगवद्गीता",
        category: "Dialogue",
        description:
          "Krishna’s teaching on action, devotion, knowledge, and inner steadiness.",
        highlight: "Karma, yoga, liberation",
        href: "/bhagavad-gita/",
        language: "Sanskrit",
        approximateDate: "~400 BCE–200 CE",
        keyConcepts: ["Karma Yoga", "Bhakti", "Jnana", "Moksha"],
        readingLens:
          "The Gita works best as guided dialogue: question, crisis, instruction, then lived application.",
      },
    ],
  },
  {
    id: "puranas",
    title: "Puranas",
    description:
      "Mythic, devotional, and narrative worlds that make metaphysics emotionally legible.",
    items: [
      {
        slug: "srimad-bhagavatam",
        name: "Srimad Bhagavatam",
        sanskrit: "श्रीमद्भागवतम्",
        category: "Purana",
        description:
          "A devotional universe centered on Krishna, bhakti, and divine play.",
        highlight: "Bhakti, Krishna, cosmic story",
        href: "/srimad-bhagavatam/",
        language: "Sanskrit",
        approximateDate: "~900–1000 CE",
        keyConcepts: ["Bhakti", "Krishna", "Narrative theology"],
        readingLens:
          "Enter through story, but notice how devotion is used as an interpretive framework for metaphysics.",
      },
      {
        slug: "markandeya-purana",
        name: "Markandeya Purana",
        sanskrit: "मार्कण्डेय पुराण",
        category: "Purana",
        description:
          "A wide-ranging Purana that contains the celebrated Devi Mahatmyam.",
        highlight: "Myth, cycles, goddess traditions",
        href: "/markandeya-purana/",
        language: "Sanskrit",
        approximateDate: "~250–500 CE",
        keyConcepts: ["Mythic cycles", "Devi", "Narrative memory"],
        readingLens:
          "Useful for readers who want to understand how goddess traditions sit inside the wider Purana universe.",
      },
      {
        slug: "devi-mahatmyam",
        name: "Devi Mahatmyam",
        sanskrit: "देवीमहात्म्यम्",
        category: "Shakta",
        description:
          "A luminous text of the Divine Mother, power, protection, and cosmic balance.",
        highlight: "Shakti, victory, protection",
        href: "/devi-mahatmyam/",
        language: "Sanskrit",
        approximateDate: "~400–600 CE",
        keyConcepts: ["Shakti", "Protection", "Cosmic order"],
        readingLens:
          "Approach it through symbolism and theology, not only mythology.",
      },
    ],
  },
  {
    id: "philosophy",
    title: "Philosophy & Practice",
    description:
      "Texts that turn reflection inward: mind, yoga, conduct, and liberation as lived discipline.",
    items: [
      {
        slug: "yoga-sutras",
        name: "Yoga Sutras",
        sanskrit: "योगसूत्र",
        category: "Philosophy",
        description:
          "Patanjali’s concise aphorisms on mind, discipline, practice, and the stilling of mental fluctuation.",
        highlight: "Mind, discipline, stillness",
        href: "/yoga-sutras/",
        language: "Sanskrit",
        approximateDate: "~400 CE",
        keyConcepts: ["Ashtanga Yoga", "Chitta", "Nirodha", "Samadhi"],
        readingLens:
          "Best approached slowly, aphorism by aphorism. Each sutra is compressed philosophy, not casual prose.",
      },
      {
        slug: "yoga-vasishtha",
        name: "Yoga Vasishtha",
        sanskrit: "योगवसिष्ठ",
        category: "Philosophy",
        description:
          "A vast contemplative dialogue on mind, reality, freedom, and awakened perception.",
        highlight: "Mind, non-duality, inquiry",
        href: "/yoga-vasishtha/",
        language: "Sanskrit",
        approximateDate: "~10th century CE",
        keyConcepts: ["Mind", "Non-duality", "Inquiry"],
        readingLens:
          "Best used for slow reflective reading. The argument unfolds through stories and repeated philosophical pressure.",
      },
      {
        slug: "manu-smriti",
        name: "Manu Smriti",
        sanskrit: "मनुस्मृति",
        category: "Dharma",
        description:
          "An influential dharma text on conduct, society, and moral order.",
        highlight: "Law, ethics, social duty",
        href: "/manu-smriti/",
        language: "Sanskrit",
        approximateDate: "~200 BCE–200 CE",
        keyConcepts: ["Law", "Ethics", "Social order"],
        readingLens:
          "Read historically and critically, with awareness of commentary and contested interpretation.",
      },
      {
        slug: "parashara",
        name: "Parashara Smriti",
        sanskrit: "पराशर स्मृति",
        category: "Dharma",
        description:
          "A dharma text often read for guidance in later historical periods and household life.",
        highlight: "Conduct, ritual, household life",
        href: "/parashara/",
        language: "Sanskrit",
        approximateDate: "~1st millennium CE",
        keyConcepts: ["Conduct", "Ritual", "Household life"],
        readingLens:
          "Useful when comparing how lived dharma gets adapted across social and historical contexts.",
      },
    ],
  },
];

export const scriptureCatalog = scriptureSections.flatMap(
  (section) => section.items,
);

export const featuredScriptures = scriptureCatalog.slice(0, 6);

export const headerScriptures = scriptureCatalog.slice(0, 5);

export function getScriptureCatalogItem(slug: string) {
  return scriptureCatalog.find((item) => item.slug === slug);
}
