// 51 Shakti Peethas - Sacred Abodes of Goddess Shakti
// The places where parts of Sati's body fell when Lord Shiva carried her corpse

export interface ShaktiPeetha {
  id: number;
  name: string;
  sanskrit: string;
  bodyPart: string;
  location: string;
  state: string;
  country: string;
  deviName: string;
  bhairavaName: string;
  story: string;
  significance: string;
  rituals: string[];
  bestTimeToVisit: string;
}

export const SHAKTI_PEETHAS: ShaktiPeetha[] = [
  {
    id: 1,
    name: "Kamakhya",
    sanskrit: "कामाख्या",
    bodyPart: "Yoni (reproductive organ)",
    location: "Guwahati",
    state: "Assam",
    country: "India",
    deviName: "Kamakhya",
    bhairavaName: "Umananda",
    story:
      "Sati's yoni fell here when Shiva was carrying her corpse. The temple is one of the most important Shakti Peethas and is associated with tantric practices.",
    significance:
      "One of the most important tantric temples. It represents the creative power of the Goddess. The temple is unique as it has no idol but a natural rock formation representing the yoni.",
    rituals: [
      "Ambubachi Mela (annual festival)",
      "Tantric worship",
      "Animal sacrifice (now symbolic)",
      "Offering of red flowers and sindoor",
    ],
    bestTimeToVisit: "June (Ambubachi Mela)",
  },
  {
    id: 2,
    name: "Tarapith",
    sanskrit: "तारापीठ",
    bodyPart: "Eyes",
    location: "Tarapith",
    state: "West Bengal",
    country: "India",
    deviName: "Tara",
    bhairavaName: "Bhairava",
    story:
      "Sati's eyes fell here. The temple is dedicated to Tara, a fierce form of the Goddess who is worshipped for protection and liberation.",
    significance:
      "Important center of Shakti worship and tantric practices. Tara is worshipped as the guiding light who helps devotees cross the ocean of existence.",
    rituals: [
      "Tantric worship",
      "Chanting of Tara mantras",
      "Offering of red flowers",
      "Night worship (Shravan month)",
    ],
    bestTimeToVisit: "July-August (Shravan month)",
  },
  {
    id: 3,
    name: "Kalighat",
    sanskrit: "कालीघाट",
    bodyPart: "Right toes",
    location: "Kolkata",
    state: "West Bengal",
    country: "India",
    deviName: "Kali",
    bhairavaName: "Nakuleshwar",
    story:
      "Sati's right toes fell here. The temple is dedicated to Kali, the fierce form of the Goddess who destroys ignorance and ego.",
    significance:
      "One of the most famous Kali temples. Kali is worshipped as the destroyer of evil and the liberator of souls. The temple is associated with the legend of Sati's toes falling here.",
    rituals: [
      "Morning and evening aarti",
      "Offering of red hibiscus flowers",
      "Animal sacrifice (now symbolic)",
      "Chanting of Kali mantras",
    ],
    bestTimeToVisit: "October-November (Kali Puja)",
  },
  {
    id: 4,
    name: "Jwalamukhi",
    sanskrit: "ज्वालामुखी",
    bodyPart: "Tongue",
    location: "Jwalamukhi",
    state: "Himachal Pradesh",
    country: "India",
    deviName: "Jwalamukhi",
    bhairavaName: "Vaidyanath",
    story:
      "Sati's tongue fell here, manifesting as eternal flames. The temple has no idol but natural flames that have been burning for centuries.",
    significance:
      "Unique temple with eternal flames representing the Goddess's fiery tongue. The flames are believed to be manifestations of the Goddess's power.",
    rituals: [
      "Offering ghee to the flames",
      "Navratri celebrations",
      "Chanting of Devi mantras",
      "Circumambulation of the temple",
    ],
    bestTimeToVisit: "March-April and September-October (Navratri)",
  },
  {
    id: 5,
    name: "Vaishno Devi",
    sanskrit: "वैष्णो देवी",
    bodyPart: "Head",
    location: "Katra",
    state: "Jammu & Kashmir",
    country: "India",
    deviName: "Vaishno Devi",
    bhairavaName: "Bhairava Nath",
    story:
      "Sati's head fell here. The cave temple is one of the most visited pilgrimage sites in India, with devotees trekking 13 km to reach it.",
    significance:
      "One of the most important pilgrimage sites. The Goddess is worshipped in three forms: Mahakali, Mahalakshmi, and Mahasaraswati. The cave is believed to be the abode of the Goddess.",
    rituals: [
      "Trek to the cave",
      "Offering of chunri and coconuts",
      "Chanting of Jai Mata Di",
      "Participating in aarti",
    ],
    bestTimeToVisit: "March-April and September-November",
  },
  {
    id: 6,
    name: "Hinglaj",
    sanskrit: "हिंगलाज",
    bodyPart: "Brahmarandhra (crown of head)",
    location: "Hingol National Park",
    state: "Balochistan",
    country: "Pakistan",
    deviName: "Hinglaj Mata",
    bhairavaName: "Bhimlochan",
    story:
      "Sati's brahmarandhra fell here. The temple is located in a remote area of Balochistan and is one of the most important Shakti Peethas in Pakistan.",
    significance:
      "One of the most important Shakti Peethas in Pakistan. The temple is located in a remote desert area and is visited by Hindu pilgrims from India and Pakistan.",
    rituals: [
      "Offering of coconuts and red flowers",
      "Chanting of Devi mantras",
      "Circumambulation of the temple",
      "Fasting during Navratri",
    ],
    bestTimeToVisit: "March-April (Navratri)",
  },
  {
    id: 7,
    name: "Shakumbhari Devi",
    sanskrit: "शाकुम्भरी देवी",
    bodyPart: "Head",
    location: "Saharanpur",
    state: "Uttar Pradesh",
    country: "India",
    deviName: "Shakumbhari Devi",
    bhairavaName: "Bhim",
    story:
      "Sati's head fell here. The Goddess is worshipped as Shakumbhari, the provider of vegetables and sustenance during droughts.",
    significance:
      "The Goddess is believed to provide sustenance during times of drought. The temple is associated with the legend of the Goddess saving devotees from famine.",
    rituals: [
      "Offering of vegetables and fruits",
      "Chanting of Devi mantras",
      "Navratri celebrations",
      "Fasting during Navratri",
    ],
    bestTimeToVisit: "March-April and September-October (Navratri)",
  },
  {
    id: 8,
    name: "Maa Chintpurni",
    sanskrit: "चिंतपूर्णी",
    bodyPart: "Feet",
    location: "Una",
    state: "Himachal Pradesh",
    country: "India",
    deviName: "Chintpurni",
    bhairavaName: "Chintamani",
    story:
      "Sati's feet fell here. The Goddess is worshipped as Chintpurni, the fulfiller of wishes and remover of worries.",
    significance:
      "The Goddess is believed to fulfill all wishes and remove worries. Devotees come here to seek blessings for the fulfillment of their desires.",
    rituals: [
      "Offering of chunri and coconuts",
      "Chanting of Devi mantras",
      "Participating in aarti",
      "Circumambulation of the temple",
    ],
    bestTimeToVisit: "March-April and September-October (Navratri)",
  },
  {
    id: 9,
    name: "Naina Devi",
    sanskrit: "नैना देवी",
    bodyPart: "Eyes",
    location: "Bilaspur",
    state: "Himachal Pradesh",
    country: "India",
    deviName: "Naina Devi",
    bhairavaName: "Bhairava",
    story:
      "Sati's eyes fell here. The temple is located on a hilltop and offers panoramic views of the surrounding area.",
    significance:
      "The Goddess is worshipped as Naina Devi, the goddess of eyes. Devotees come here to seek blessings for good eyesight and protection.",
    rituals: [
      "Offering of red flowers",
      "Chanting of Devi mantras",
      "Participating in aarti",
      "Trek to the hilltop temple",
    ],
    bestTimeToVisit: "March-April and September-October (Navratri)",
  },
  {
    id: 10,
    name: "Mansa Devi",
    sanskrit: "मनसा देवी",
    bodyPart: "Mind",
    location: "Panchkula",
    state: "Haryana",
    country: "India",
    deviName: "Mansa Devi",
    bhairavaName: "Shiva",
    story:
      "Sati's mind fell here. The Goddess is worshipped as Mansa Devi, the fulfiller of wishes and controller of the mind.",
    significance:
      "The Goddess is believed to control the mind and fulfill wishes. Devotees come here to seek blessings for mental peace and fulfillment of desires.",
    rituals: [
      "Rope-way to the temple",
      "Offering of coconuts and flowers",
      "Chanting of Devi mantras",
      "Participating in aarti",
    ],
    bestTimeToVisit: "March-April and September-October (Navratri)",
  },
  // More Shakti Peethas should be added through the ingestion pipeline.
  // API responses report indexed count separately from the traditional 51.
];

export function getShaktiPeethaById(id: number): ShaktiPeetha | undefined {
  return SHAKTI_PEETHAS.find((peetha) => peetha.id === id);
}

export function getShaktiPeethaByName(name: string): ShaktiPeetha | undefined {
  return SHAKTI_PEETHAS.find(
    (peetha) => peetha.name.toLowerCase() === name.toLowerCase() || peetha.sanskrit === name
  );
}

export function getShaktiPeethasByCountry(country: string): ShaktiPeetha[] {
  return SHAKTI_PEETHAS.filter((peetha) => peetha.country.toLowerCase() === country.toLowerCase());
}

export function getShaktiPeethasByState(state: string): ShaktiPeetha[] {
  return SHAKTI_PEETHAS.filter((peetha) => peetha.state.toLowerCase() === state.toLowerCase());
}

export function searchShaktiPeethas(query: string): ShaktiPeetha[] {
  const lowerQuery = query.toLowerCase();
  return SHAKTI_PEETHAS.filter(
    (peetha) =>
      peetha.name.toLowerCase().includes(lowerQuery) ||
      peetha.sanskrit.includes(lowerQuery) ||
      peetha.location.toLowerCase().includes(lowerQuery) ||
      peetha.state.toLowerCase().includes(lowerQuery) ||
      peetha.country.toLowerCase().includes(lowerQuery) ||
      peetha.bodyPart.toLowerCase().includes(lowerQuery) ||
      peetha.deviName.toLowerCase().includes(lowerQuery)
  );
}
