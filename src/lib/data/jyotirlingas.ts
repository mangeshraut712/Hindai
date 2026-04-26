// 12 Jyotirlingas - Sacred Abodes of Lord Shiva
// The 12 holy shrines where Lord Shiva appeared as a column of light

export interface Jyotirlinga {
  id: number;
  name: string;
  sanskrit: string;
  location: string;
  state: string;
  story: string;
  significance: string;
  rituals: string[];
  bestTimeToVisit: string;
  nearbyPlaces: string[];
}

export const JYOTIRLINGAS: Jyotirlinga[] = [
  {
    id: 1,
    name: "Somnath",
    sanskrit: "सोमनाथ",
    location: "Prabhas Patan",
    state: "Gujarat",
    story:
      "The first Jyotirlinga, Somnath was established by the Moon God (Soma) who worshipped Shiva to be freed from a curse. Lord Shiva appeared as a column of light to bless him.",
    significance:
      "Considered the most sacred of all Jyotirlingas, it represents the eternal nature of Shiva. It has been destroyed and rebuilt multiple times throughout history.",
    rituals: [
      "Abhishekam with water and milk",
      "Rudrabhishekam",
      "Offering of bilva leaves",
      "Chanting of Shiva mantras",
      "Evening aarti",
    ],
    bestTimeToVisit: "October to March (winter months)",
    nearbyPlaces: ["Dwarka", "Porbandar", "Gir National Park"],
  },
  {
    id: 2,
    name: "Mallikarjuna",
    sanskrit: "मल्लिकार्जुन",
    location: "Srisailam",
    state: "Andhra Pradesh",
    story:
      "Shiva and Parvati appeared as Mallikarjuna and Bhramaramba to their son Kartikeya who was angry after losing a competition to Ganesha.",
    significance:
      "One of the 18 Shakti Peethas as well, representing the union of Shiva and Shakti. It is one of the few temples where both Shiva and Parvati are worshipped together.",
    rituals: [
      "Abhishekam with various sacred substances",
      "Archana with 108 names",
      "Offering of red flowers",
      "Circumambulation (pradakshina)",
    ],
    bestTimeToVisit: "February to March (Maha Shivaratri)",
    nearbyPlaces: ["Nagarjuna Sagar Dam", "Nagarjunakonda", "Ethipothala Falls"],
  },
  {
    id: 3,
    name: "Mahakaleshwar",
    sanskrit: "महाकालेश्वर",
    location: "Ujjain",
    state: "Madhya Pradesh",
    story:
      "Lord Shiva appeared as a column of light to defeat the demon Dushana who was tormenting devotees. The lingam here is believed to be swayambhu (self-manifested).",
    significance:
      "The only Jyotirlinga facing south (Dakshinamurti). It is associated with time (Kala) and is believed to grant liberation from the cycle of birth and death.",
    rituals: [
      "Bhasma Aarti (ash ritual) at dawn",
      "Rudrabhishekam",
      "Offering of bilva leaves",
      "Chanting of Mahamrityunjaya mantra",
    ],
    bestTimeToVisit: "February to March (Maha Shivaratri)",
    nearbyPlaces: ["Kal Bhairav Temple", "Ram Ghat", "Bhartrihari Caves"],
  },
  {
    id: 4,
    name: "Omkareshwar",
    sanskrit: "ओंकारेश्वर",
    location: "Mandhata Island",
    state: "Madhya Pradesh",
    story:
      "The island is shaped like the Om symbol (ॐ). Shiva appeared here to bless the mountain Mandhata who performed severe penance.",
    significance:
      "The temple is located on an island in the Narmada River. The shape of the island resembles the sacred Om symbol, making it spiritually significant.",
    rituals: [
      "Narmada parikrama (circumambulation)",
      "Abhishekam with Narmada water",
      "Offering of coconut and fruits",
      "Meditation on the banks of Narmada",
    ],
    bestTimeToVisit: "September to March",
    nearbyPlaces: ["Maheshwar", "Mandu", "Ahilya Fort"],
  },
  {
    id: 5,
    name: "Kedarnath",
    sanskrit: "केदारनाथ",
    location: "Kedarnath",
    state: "Uttarakhand",
    story:
      "After the Mahabharata war, the Pandavas sought Shiva's forgiveness. Shiva appeared as a bull and dived into the earth, leaving his hump at Kedarnath.",
    significance:
      "One of the Char Dham pilgrimage sites. The temple is at a high altitude and is surrounded by snow-capped peaks. It is believed to grant liberation.",
    rituals: [
      "Abhishekam with Ganga water",
      "Offering of flowers and fruits",
      "Chanting of Shiva mantras",
      "Parikrama of the temple",
    ],
    bestTimeToVisit: "May to June and September to October",
    nearbyPlaces: ["Badrinath", "Gangotri", "Yamunotri", "Vasuki Tal"],
  },
  {
    id: 6,
    name: "Bhimashankar",
    sanskrit: "भीमाशंकर",
    location: "Bhimashankar",
    state: "Maharashtra",
    story:
      "Shiva appeared to defeat the demon Bhima who was tormenting sages. The demon was the son of Kumbhakarna (brother of Ravana).",
    significance:
      "Located in the Sahyadri hills, surrounded by dense forests. The temple is known for its beautiful architecture and peaceful surroundings.",
    rituals: [
      "Abhishekam with water and milk",
      "Offering of bilva leaves",
      "Chanting of Rudram",
      "Trekking to the temple",
    ],
    bestTimeToVisit: "August to February",
    nearbyPlaces: ["Mumbai", "Pune", "Lonavala", "Malshej Ghat"],
  },
  {
    id: 7,
    name: "Kashi Vishwanath",
    sanskrit: "काशी विश्वनाथ",
    location: "Varanasi",
    state: "Uttar Pradesh",
    story:
      "Shiva established himself as a column of light in Kashi (Varanasi) to prove his supremacy. The city is believed to be the spiritual capital of India.",
    significance:
      "The most sacred city in Hinduism. It is believed that dying in Kashi grants liberation (moksha). The temple has been destroyed and rebuilt multiple times.",
    rituals: [
      "Morning and evening aarti",
      "Abhishekam with Ganga water",
      "Offering of flowers and bilva leaves",
      "Ganga aarti at Dashashwamedh Ghat",
    ],
    bestTimeToVisit: "October to March",
    nearbyPlaces: ["Sarnath", "Ghats of Varanasi", "Sankat Mochan Hanuman Temple"],
  },
  {
    id: 8,
    name: "Trimbakeshwar",
    sanskrit: "त्र्यम्बकेश्वर",
    location: "Trimbak",
    state: "Maharashtra",
    story:
      "Shiva appeared here to bless the sage Gautama who was accused of killing a cow. The Godavari River originates from this place.",
    significance:
      "The source of the Godavari River, the longest river in peninsular India. The temple is unique for having three lingams representing Brahma, Vishnu, and Shiva.",
    rituals: [
      "Abhishekam with Godavari water",
      "Pind daan (ancestral rites)",
      "Offering of coconut and bilva leaves",
      "Bathing in the Kushavarta Kund",
    ],
    bestTimeToVisit: "February to March (Maha Shivaratri)",
    nearbyPlaces: ["Nashik", "Saptashrungi", "Shirdi"],
  },
  {
    id: 9,
    name: "Vaidyanath",
    sanskrit: "वैद्यनाथ",
    location: "Deoghar",
    state: "Jharkhand",
    story:
      "Ravana worshipped Shiva and offered his ten heads one by one. Pleased, Shiva appeared as Vaidyanath (Lord of Physicians) and healed him.",
    significance:
      "One of the most important Shiva temples. It is believed that Ravana worshipped here. The temple is also associated with healing and health.",
    rituals: [
      "Abhishekam with water and milk",
      "Offering of bilva leaves",
      "Chanting of Shiva mantras",
      "Kanwar Yatra (pilgrimage with water)",
    ],
    bestTimeToVisit: "July to August (Shravan month)",
    nearbyPlaces: ["Baidyanath Dham", "Nandan Pahar", "Tapovan"],
  },
  {
    id: 10,
    name: "Nageshwar",
    sanskrit: "नागेश्वर",
    location: "Dwarka",
    state: "Gujarat",
    story:
      "Shiva appeared as Nageshwar to save his devotee Supriya from the demon Daruka who lived in the sea and captured devotees.",
    significance:
      "Also known as Nagnath. The temple is located near Dwarka, one of the Char Dham sites. It is believed to protect devotees from evil forces.",
    rituals: [
      "Abhishekam with water and milk",
      "Offering of bilva leaves",
      "Chanting of Shiva mantras",
      "Visit to Dwarkadhish Temple",
    ],
    bestTimeToVisit: "October to March",
    nearbyPlaces: ["Dwarka", "Bet Dwarka", "Rukmini Temple"],
  },
  {
    id: 11,
    name: "Rameshwaram",
    sanskrit: "रामेश्वर",
    location: "Rameswaram Island",
    state: "Tamil Nadu",
    story:
      "Rama worshipped Shiva here before going to Lanka to rescue Sita. He established the lingam and worshipped it to seek blessings for victory.",
    significance:
      "One of the Char Dham pilgrimage sites. The temple is one of the 12 Jyotirlingas and one of the 275 Paadal Petra Sthalams. It is associated with the Ramayana.",
    rituals: [
      "Abhishekam with water from 22 theerthams",
      "Offering of bilva leaves",
      "Chanting of Shiva mantras",
      "Bathing in the 22 sacred wells",
    ],
    bestTimeToVisit: "October to April",
    nearbyPlaces: ["Dhanushkodi", "Pamban Bridge", "Gandhamadana Parvatam"],
  },
  {
    id: 12,
    name: "Grishneshwar",
    sanskrit: "गृष्णेश्वर",
    location: "Verul",
    state: "Maharashtra",
    story:
      "Shiva appeared to bless the devotee Kusuma who was killed by her husband's first wife but was revived by Shiva's grace.",
    significance:
      "The last of the 12 Jyotirlingas. The temple is known for its beautiful architecture and is located near the Ellora Caves, a UNESCO World Heritage Site.",
    rituals: [
      "Abhishekam with water and milk",
      "Offering of bilva leaves",
      "Chanting of Shiva mantras",
      "Visit to Ellora Caves",
    ],
    bestTimeToVisit: "October to March",
    nearbyPlaces: ["Ellora Caves", "Aurangabad", "Daulatabad Fort"],
  },
];

export function getJyotirlingaById(id: number): Jyotirlinga | undefined {
  return JYOTIRLINGAS.find((jyotirlinga) => jyotirlinga.id === id);
}

export function getJyotirlingaByName(name: string): Jyotirlinga | undefined {
  return JYOTIRLINGAS.find(
    (jyotirlinga) =>
      jyotirlinga.name.toLowerCase() === name.toLowerCase() || jyotirlinga.sanskrit === name
  );
}

export function getJyotirlingasByState(state: string): Jyotirlinga[] {
  return JYOTIRLINGAS.filter(
    (jyotirlinga) => jyotirlinga.state.toLowerCase() === state.toLowerCase()
  );
}

export function searchJyotirlingas(query: string): Jyotirlinga[] {
  const lowerQuery = query.toLowerCase();
  return JYOTIRLINGAS.filter(
    (jyotirlinga) =>
      jyotirlinga.name.toLowerCase().includes(lowerQuery) ||
      jyotirlinga.sanskrit.includes(lowerQuery) ||
      jyotirlinga.location.toLowerCase().includes(lowerQuery) ||
      jyotirlinga.state.toLowerCase().includes(lowerQuery) ||
      jyotirlinga.story.toLowerCase().includes(lowerQuery)
  );
}
