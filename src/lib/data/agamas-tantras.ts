// Shaiva Agamas and Vaishnava Pancharatra Agamas
// Indexed starter set for texts containing temple rituals, philosophy, and practices.

export interface Agama {
  id: number;
  name: string;
  sanskrit: string;
  tradition: "Shaiva" | "Vaishnava";
  category: string;
  description: string;
  keyTeachings: string[];
  practices: string[];
  significance: string;
}

export const AGAMAS: Agama[] = [
  // Shaiva Agamas - indexed starter records from the traditional 28.
  {
    id: 1,
    name: "Kamika Agama",
    sanskrit: "कामिक आगम",
    tradition: "Shaiva",
    category: "Temple Architecture",
    description:
      "One of the principal Shaiva Agamas dealing with temple construction, iconography, and worship rituals.",
    keyTeachings: [
      "Temple construction principles",
      "Iconography of Shiva",
      "Daily worship rituals",
      "Festival ceremonies",
    ],
    practices: [
      "Daily puja procedures",
      "Temple consecration",
      "Festival celebrations",
      "Sacred geometry",
    ],
    significance:
      "Fundamental text for Shaiva temple architecture and worship. Provides detailed guidelines for temple construction.",
  },
  {
    id: 2,
    name: "Yogaja Agama",
    sanskrit: "योगज आगम",
    tradition: "Shaiva",
    category: "Yoga & Philosophy",
    description: "Focuses on the yogic practices and philosophical aspects of Shaivism.",
    keyTeachings: ["Kundalini yoga", "Chakra system", "Meditation techniques", "Shaiva philosophy"],
    practices: ["Meditation", "Mantra chanting", "Yoga asanas", "Pranayama"],
    significance:
      "Emphasizes the practical aspects of yoga within Shaivism. Connects physical practices with spiritual goals.",
  },
  {
    id: 3,
    name: "Cintya Agama",
    sanskrit: "चिन्त्य आगम",
    tradition: "Shaiva",
    category: "Philosophy",
    description:
      "Deals with the philosophical aspects of Shaivism, particularly the nature of Shiva and the soul.",
    keyTeachings: [
      "Nature of Shiva",
      "Soul's relationship with Shiva",
      "Liberation (moksha)",
      "Cosmology",
    ],
    practices: ["Philosophical study", "Meditation on Shiva", "Self-inquiry", "Scriptural study"],
    significance:
      "Provides the philosophical foundation for Shaiva practices. Explores the nature of reality and consciousness.",
  },
  {
    id: 4,
    name: "Karana Agama",
    sanskrit: "करण आगम",
    tradition: "Shaiva",
    category: "Temple Rituals",
    description: "Details the ritual procedures for temple worship and ceremonies.",
    keyTeachings: [
      "Ritual procedures",
      "Mantra usage",
      "Sacred fire rituals",
      "Offering procedures",
    ],
    practices: [
      "Daily temple rituals",
      "Special ceremonies",
      "Fire rituals (homa)",
      "Mantra chanting",
    ],
    significance:
      "Essential for temple priests performing rituals. Provides detailed instructions for all ceremonies.",
  },
  {
    id: 5,
    name: "Ajita Agama",
    sanskrit: "अजित आगम",
    tradition: "Shaiva",
    category: "General",
    description:
      "A comprehensive Agama covering various aspects of Shaiva philosophy and practice.",
    keyTeachings: [
      "Comprehensive Shaiva teachings",
      "Temple rituals",
      "Philosophy",
      "Yoga practices",
    ],
    practices: ["Temple worship", "Meditation", "Mantra chanting", "Yoga"],
    significance:
      "Provides a holistic approach to Shaiva practice. Covers both theoretical and practical aspects.",
  },
  // Vaishnava Pancharatra Agamas - indexed starter records.
  {
    id: 6,
    name: "Vishnu Tantra",
    sanskrit: "विष्णु तन्त्र",
    tradition: "Vaishnava",
    category: "General",
    description:
      "One of the principal Pancharatra texts dealing with Vishnu worship and philosophy.",
    keyTeachings: [
      "Nature of Vishnu",
      "Temple worship",
      "Devotional practices",
      "Vaishnava philosophy",
    ],
    practices: ["Temple puja", "Mantra chanting", "Devotional singing", "Fasting on Ekadashi"],
    significance: "Fundamental text for Vaishnava temple worship. Emphasizes devotion to Vishnu.",
  },
  {
    id: 7,
    name: "Narada Pancharatra",
    sanskrit: "नारद पांचरात्र",
    tradition: "Vaishnava",
    category: "Philosophy",
    description: "Attributed to sage Narada, this text covers Vaishnava philosophy and practices.",
    keyTeachings: ["Vaishnava philosophy", "Devotion (bhakti)", "Temple rituals", "Ethical living"],
    practices: [
      "Devotional worship",
      "Chanting of Vishnu names",
      "Temple visits",
      "Study of scriptures",
    ],
    significance: "Connects philosophy with practical devotion. Emphasizes the path of bhakti.",
  },
  {
    id: 8,
    name: "Hayagriva Tantra",
    sanskrit: "हयग्रीव तन्त्र",
    tradition: "Vaishnava",
    category: "Knowledge",
    description:
      "Deals with the horse-headed form of Vishnu, associated with knowledge and wisdom.",
    keyTeachings: ["Divine knowledge", "Wisdom", "Learning", "Sacred texts"],
    practices: [
      "Worship of Hayagriva",
      "Study of scriptures",
      "Chanting of mantras",
      "Teaching and learning",
    ],
    significance: "Patron deity of knowledge and learning. Worshipped by students and scholars.",
  },
  {
    id: 9,
    name: "Lakshmi Tantra",
    sanskrit: "लक्ष्मी तन्त्र",
    tradition: "Vaishnava",
    category: "Prosperity",
    description: "Focuses on the worship of Lakshmi, the goddess of wealth and prosperity.",
    keyTeachings: ["Prosperity and wealth", "Divine grace", "Abundance", "Spiritual wealth"],
    practices: [
      "Worship of Lakshmi",
      "Charity and generosity",
      "Prosperity rituals",
      "Friday worship",
    ],
    significance:
      "Emphasizes both material and spiritual prosperity. Lakshmi is worshipped for abundance in all aspects of life.",
  },
  {
    id: 10,
    name: "Sri Vaishnava Samhita",
    sanskrit: "श्री वैष्णव संहिता",
    tradition: "Vaishnava",
    category: "Temple Rituals",
    description: "Comprehensive text on Sri Vaishnava temple rituals and practices.",
    keyTeachings: ["Temple construction", "Icon worship", "Daily rituals", "Festival ceremonies"],
    practices: [
      "Daily temple puja",
      "Festival celebrations",
      "Processional deities",
      "Archana ceremonies",
    ],
    significance:
      "Essential for Sri Vaishnava temple priests. Provides detailed ritual procedures.",
  },
];

export function getAgamaById(id: number): Agama | undefined {
  return AGAMAS.find((agama) => agama.id === id);
}

export function getAgamasByTradition(tradition: "Shaiva" | "Vaishnava"): Agama[] {
  return AGAMAS.filter((agama) => agama.tradition === tradition);
}

export function getAgamasByCategory(category: string): Agama[] {
  return AGAMAS.filter((agama) => agama.category.toLowerCase() === category.toLowerCase());
}

export function searchAgamas(query: string): Agama[] {
  const lowerQuery = query.toLowerCase();
  return AGAMAS.filter(
    (agama) =>
      agama.name.toLowerCase().includes(lowerQuery) ||
      agama.sanskrit.includes(lowerQuery) ||
      agama.category.toLowerCase().includes(lowerQuery) ||
      agama.description.toLowerCase().includes(lowerQuery)
  );
}
