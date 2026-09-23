export type GranthalayDepth = "full" | "hymn" | "katha" | "place" | "catalog";

export type GranthalayMedium = "text" | "image" | "audio" | "ask";

export interface GranthalayShelf {
  title: string;
  sanskrit: string;
  href: string;
  depth: GranthalayDepth;
  note: string;
  media: GranthalayMedium[];
}

export interface GranthalayHall {
  id: string;
  title: string;
  sanskrit: string;
  description: string;
  image: string;
  imageAlt: string;
  shelves: GranthalayShelf[];
}

export const GRANTHALAY_HALLS: GranthalayHall[] = [
  {
    id: "pothi",
    title: "Reading room",
    sanskrit: "पोथी",
    description:
      "Books you can open and read now: Shridhar’s Marathi pothis and the Durga Saptashati patha.",
    image: "/shivlilamrit/cover.webp",
    imageAlt: "Artist impression of a manuscript cover for Shivlilamrit",
    shelves: [
      {
        title: "Shivlilamrit",
        sanskrit: "शिवलीलामृत",
        href: "/shivlilamrit",
        depth: "full",
        note: "15 adhyayas",
        media: ["text", "image", "ask"],
      },
      {
        title: "Harivijay",
        sanskrit: "हरिविजय",
        href: "/harivijay",
        depth: "full",
        note: "36 adhyayas",
        media: ["text", "image", "ask"],
      },
      {
        title: "Ramvijay",
        sanskrit: "रामविजय",
        href: "/ramvijay",
        depth: "full",
        note: "17 adhyayas",
        media: ["text", "image", "ask"],
      },
      {
        title: "Haripath",
        sanskrit: "हरिपाठ",
        href: "/haripaat",
        depth: "full",
        note: "10 leaves",
        media: ["text", "image", "ask"],
      },
      {
        title: "Durga Saptashati",
        sanskrit: "दुर्गासप्तशती",
        href: "/durga-saptashati",
        depth: "full",
        note: "16 patha leaves",
        media: ["text", "image", "audio", "ask"],
      },
    ],
  },
  {
    id: "stotra",
    title: "Hymns and aarti",
    sanskrit: "स्तोत्र",
    description: "Household recitation: full hymns, the Ganesh aarti sangrah, and spoken audio.",
    image: "/ganesh-aarti/hero.webp",
    imageAlt: "Artist impression for the Ganesh aarti collection",
    shelves: [
      {
        title: "Nine recitations",
        sanskrit: "पाठ",
        href: "/recite",
        depth: "hymn",
        note: "Chalisa, sahasranama, Atharvashirsha",
        media: ["text", "audio", "ask"],
      },
      {
        title: "Stotra library",
        sanskrit: "आरती",
        href: "/stotras",
        depth: "hymn",
        note: "Aartis and Gayatri",
        media: ["text", "ask"],
      },
      {
        title: "Ganesh Aarti Sangrah",
        sanskrit: "गणेश आरती",
        href: "/ganesh-aarti",
        depth: "hymn",
        note: "15 Marathi items",
        media: ["text", "image", "ask"],
      },
      {
        title: "Audio desk",
        sanskrit: "श्रवण",
        href: "/audio",
        depth: "hymn",
        note: "Listen to indexed verses",
        media: ["audio"],
      },
    ],
  },
  {
    id: "katha",
    title: "Katha",
    sanskrit: "कथा",
    description: "Short story granthas that stay tied to a deity, a place, and a festival.",
    image: "/katha/hero.webp",
    imageAlt: "Artist impression of a manuscript desk",
    shelves: [
      {
        title: "Mahadeva Katha",
        sanskrit: "महादेव",
        href: "/katha/mahadev",
        depth: "katha",
        note: "3 chapters",
        media: ["text", "image", "ask"],
      },
      {
        title: "Devi Katha",
        sanskrit: "देवी",
        href: "/katha/devi",
        depth: "katha",
        note: "3 chapters",
        media: ["text", "image", "ask"],
      },
      {
        title: "Vishnu Katha",
        sanskrit: "विष्णु",
        href: "/katha/vishnu",
        depth: "katha",
        note: "3 chapters",
        media: ["text", "image", "ask"],
      },
      {
        title: "Ganesha Katha",
        sanskrit: "गणेश",
        href: "/katha/ganesha",
        depth: "katha",
        note: "3 chapters",
        media: ["text", "image", "ask"],
      },
    ],
  },
  {
    id: "tirtha",
    title: "Tirtha",
    sanskrit: "तीर्थ",
    description: "Places you can open on the map: lingas, peethas, Char Dham, and Ashtavinayak.",
    image: "/mahadev/hero.webp",
    imageAlt: "Artist impression of Mahadeva",
    shelves: [
      {
        title: "Pilgrimage map",
        sanskrit: "नक्शा",
        href: "/pilgrimage",
        depth: "place",
        note: "All traditions",
        media: ["image", "text"],
      },
      {
        title: "Twelve Jyotirlingas",
        sanskrit: "ज्योतिर्लिङ्ग",
        href: "/mahadev",
        depth: "place",
        note: "12 places",
        media: ["image", "text"],
      },
      {
        title: "Shakti Peethas",
        sanskrit: "शक्तिपीठ",
        href: "/devi",
        depth: "place",
        note: "Indexed peethas",
        media: ["image", "text"],
      },
      {
        title: "Char Dham",
        sanskrit: "चार धाम",
        href: "/vishnu",
        depth: "place",
        note: "Badrinath, Puri, Dwarka, Rameswaram",
        media: ["image", "text"],
      },
      {
        title: "Ashtavinayak",
        sanskrit: "अष्टविनायक",
        href: "/ganesha",
        depth: "place",
        note: "8 forms",
        media: ["image", "text"],
      },
    ],
  },
  {
    id: "practice",
    title: "Festival and practice",
    sanskrit: "उत्सव",
    description: "The year, the sixteen samskaras, and a daily practice desk.",
    image: "/festivals/navaratri.webp",
    imageAlt: "Artist impression for Navaratri",
    shelves: [
      {
        title: "Festivals",
        sanskrit: "उत्सव",
        href: "/festivals",
        depth: "place",
        note: "23 utsavs",
        media: ["text", "image"],
      },
      {
        title: "Panchanga",
        sanskrit: "पञ्चाङ्ग",
        href: "/panchanga",
        depth: "place",
        note: "Today’s calendar",
        media: ["text"],
      },
      {
        title: "Daily sadhana",
        sanskrit: "साधना",
        href: "/sadhana",
        depth: "place",
        note: "Japa and sankalpa",
        media: ["text"],
      },
      {
        title: "Sixteen samskaras",
        sanskrit: "षोडश संस्कार",
        href: "/shodasha-samskaras",
        depth: "catalog",
        note: "Life-cycle rites",
        media: ["text", "ask"],
      },
    ],
  },
  {
    id: "shruti",
    title: "Name map",
    sanskrit: "श्रुति · स्मृति",
    description:
      "The wider catalog of Vedas, Upanishads, epics, and Puranas. These shelves name the corpus. Open a pothi or hymn above when you want the text itself.",
    image: "/devi/hero.webp",
    imageAlt: "Artist impression of Devi",
    shelves: [
      {
        title: "Vedas and Upanishads",
        sanskrit: "वेद",
        href: "/contents#vedas",
        depth: "catalog",
        note: "4 Vedas, 108 Upanishad names",
        media: ["text", "ask"],
      },
      {
        title: "Epics and Gita",
        sanskrit: "इतिहास",
        href: "/contents#epics",
        depth: "catalog",
        note: "Sample verses, not the full books",
        media: ["text", "ask"],
      },
      {
        title: "Eighteen Puranas",
        sanskrit: "पुराण",
        href: "/contents#puranas",
        depth: "catalog",
        note: "Names on the shelf",
        media: ["text", "ask"],
      },
      {
        title: "Ask Gemma",
        sanskrit: "प्रश्न",
        href: "/ai-guide",
        depth: "catalog",
        note: "Grounded in pages already here",
        media: ["ask"],
      },
    ],
  },
];

export function granthalayShelfCount(): number {
  return GRANTHALAY_HALLS.reduce((sum, hall) => sum + hall.shelves.length, 0);
}
