// Hindu Festivals Data
// Major festivals with dates, puja vidhi, and significance

import { Festival, FestivalType } from "./types";

export const FESTIVALS: Festival[] = [
  {
    id: "makar-sankranti",
    name: "Makar Sankranti",
    sanskrit: "मकर संक्रांति",
    date: new Date("2026-01-14"),
    type: "Sankranti",
    description: "Harvest festival celebrating the transition of Sun into Capricorn",
    pujaVidhi:
      "Take holy bath, offer water to Sun God, donate til (sesame seeds), prepare khichdi, fly kites",
    significance:
      "Marks the beginning of Uttarayana (sun's northward journey), considered auspicious for new beginnings",
    regional: ["Punjab (Lohri)", "Tamil Nadu (Pongal)", "Gujarat (Uttarayan)", "Assam (Bihu)"],
  },
  {
    id: "vasant-panchami",
    name: "Vasant Panchami",
    sanskrit: "वसंत पंचमी",
    date: new Date("2026-01-23"),
    type: "Major",
    description: "Festival of Goddess Saraswati, marking arrival of spring",
    pujaVidhi:
      "Wear yellow clothes, worship Saraswati with flowers, books, and instruments, start new learning",
    significance:
      "Birthday of Goddess Saraswati, considered most auspicious day to begin education and arts",
  },
  {
    id: "maha-shivaratri",
    name: "Maha Shivaratri",
    sanskrit: "महा शिवरात्रि",
    date: new Date("2026-02-15"),
    type: "Vrat",
    description: "The great night of Lord Shiva",
    pujaVidhi:
      "Observe fast, perform Shiva puja at four prahars (watches), offer bilva leaves, chant Om Namah Shivaya",
    significance:
      "Night when Shiva performed Tandava, observing vrat grants liberation and fulfills desires",
  },
  {
    id: "holi",
    name: "Holi",
    sanskrit: "होली",
    date: new Date("2026-03-04"),
    type: "Major",
    description: "Festival of colors celebrating the victory of good over evil",
    pujaVidhi:
      "Holika Dahan bonfire, play with colors, distribute sweets, visit friends and family",
    significance: "Celebrates Prahlad's devotion and Holika's destruction, marks arrival of spring",
  },
  {
    id: "ram-navami",
    name: "Ram Navami",
    sanskrit: "राम नवमी",
    date: new Date("2026-03-26"),
    type: "Jayanti",
    description: "Birthday of Lord Rama",
    pujaVidhi:
      "Read Ramayana, perform Rama puja, offer flowers and fruits, chant Rama nama, observe fast",
    significance:
      "Birth of Lord Rama, the 7th avatar of Vishnu, embodiment of dharma and ideal man",
  },
  {
    id: "hanuman-jayanti",
    name: "Hanuman Jayanti",
    sanskrit: "हनुमान जयंती",
    date: new Date("2026-04-01"),
    type: "Jayanti",
    description: "Birthday of Lord Hanuman",
    pujaVidhi:
      "Visit Hanuman temple, offer sindoor and garlands, recite Hanuman Chalisa, observe fast",
    significance:
      "Birth of Hanuman, the devoted servant of Rama, symbol of strength, devotion, and celibacy",
  },
  {
    id: "akshaya-tritiya",
    name: "Akshaya Tritiya",
    sanskrit: "अक्षय तृतीया",
    date: new Date("2026-04-19"),
    type: "Major",
    description: "Day of eternal prosperity",
    pujaVidhi: "Buy gold, donate to charity, worship Lakshmi and Kubera, start new ventures",
    significance:
      "Most auspicious day for new beginnings, any good deed done on this day yields infinite merit",
  },
  {
    id: "buddha-purnima",
    name: "Buddha Purnima",
    sanskrit: "बुद्ध पूर्णिमा",
    date: new Date("2026-05-01"),
    type: "Major",
    description: "Birth, enlightenment, and death of Buddha",
    pujaVidhi:
      "Visit Buddhist temples, meditate, offer prayers, practice non-violence and compassion",
    significance:
      "Triple blessed day - Buddha's birth, enlightenment (Nirvana), and passing (Parinirvana)",
  },
  {
    id: "guru-purnima",
    name: "Guru Purnima",
    sanskrit: "गुरु पूर्णिमा",
    date: new Date("2026-07-29"),
    type: "Major",
    description: "Day to honor spiritual teachers",
    pujaVidhi:
      "Offer prayers to guru, seek blessings, perform padapuja (worship of guru's feet), donate to ashram",
    significance:
      "Birthday of Ved Vyasa, day to express gratitude to spiritual teachers who guide us to enlightenment",
  },
  {
    id: "raksha-bandhan",
    name: "Raksha Bandhan",
    sanskrit: "रक्षा बंधन",
    date: new Date("2026-08-28"),
    type: "Major",
    description: "Festival celebrating brother-sister bond",
    pujaVidhi: "Sisters tie rakhi on brothers' wrists, brothers give gifts and promise protection",
    significance: "Symbol of love, protection, and duty between siblings, strengthens family bonds",
  },
  {
    id: "janmashtami",
    name: "Janmashtami",
    sanskrit: "जन्माष्टमी",
    date: new Date("2026-09-04"),
    type: "Jayanti",
    description: "Birthday of Lord Krishna",
    pujaVidhi:
      "Fast until midnight, bathe Krishna idol, offer butter, milk, and sweets, chant Krishna bhajans",
    significance: "Birth of Krishna, the 8th avatar of Vishnu, who delivered the Bhagavad Gita",
  },
  {
    id: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    sanskrit: "गणेश चतुर्थी",
    date: new Date("2026-09-14"),
    type: "Major",
    description: "Birthday of Lord Ganesha",
    pujaVidhi:
      "Install Ganesha idol, perform puja for 10 days, offer modak, chant Ganesh mantras, visarjan on Anant Chaturdashi",
    significance: "Birth of Ganesha, remover of obstacles, god of wisdom and beginnings",
  },
  {
    id: "onam",
    name: "Onam",
    sanskrit: "ओणम",
    date: new Date("2026-08-26"),
    type: "Regional",
    description: "Kerala harvest festival",
    pujaVidhi:
      "Create pookalam (flower rangoli), prepare Onam Sadya (feast), boat races, Kathakali performances",
    significance: "Celebrates King Mahabali's return, marks harvest season in Kerala",
    regional: ["Kerala"],
  },
  {
    id: "navratri",
    name: "Navratri",
    sanskrit: "नवरात्रि",
    date: new Date("2026-10-11"),
    type: "Major",
    description: "Nine nights worshiping Goddess Durga",
    pujaVidhi:
      "Install kalash, worship nine forms of Durga, fast, chant Durga mantras, perform Kanya Pujan on Ashtami and Navami",
    significance: "Celebrates victory of Durga over Mahishasura, nine forms of Goddess worshipped",
  },
  {
    id: "dussehra",
    name: "Dussehra",
    sanskrit: "दशहरा",
    date: new Date("2026-10-20"),
    type: "Major",
    description: "Victory of good over evil",
    pujaVidhi: "Perform Durga visarjan, worship weapons (Shastra Puja), burn effigies of Ravana",
    significance:
      "Victory of Rama over Ravana, end of Navratri, symbolizes triumph of dharma over adharma",
  },
  {
    id: "karwa-chauth",
    name: "Karwa Chauth",
    sanskrit: "करवा चौथ",
    date: new Date("2026-10-29"),
    type: "Vrat",
    description: "Fast for longevity of husbands",
    pujaVidhi:
      "Women fast without water, worship moon, break fast after moonrise, exchange gifts with mothers-in-law",
    significance: "Fast observed by married women for longevity and well-being of their husbands",
  },
  {
    id: "diwali",
    name: "Diwali",
    sanskrit: "दीपावली",
    date: new Date("2026-11-08"),
    type: "Major",
    description: "Festival of lights",
    pujaVidhi:
      "Light diyas, perform Lakshmi-Ganesh puja, burst fireworks, distribute sweets, clean and decorate homes",
    significance: "Return of Rama to Ayodhya after 14 years exile, victory of light over darkness",
  },
  {
    id: "govardhan-puja",
    name: "Govardhan Puja",
    sanskrit: "गोवर्धन पूजा",
    date: new Date("2026-11-09"),
    type: "Major",
    description: "Worship of Govardhan Hill",
    pujaVidhi:
      "Create Govardhan from cow dung, worship Krishna as Govardhan, offer Annakut (food mountain)",
    significance: "Krishna lifted Govardhan Hill to protect villagers from Indra's wrath",
  },
  {
    id: "bhai-dooj",
    name: "Bhai Dooj",
    sanskrit: "भाई दूज",
    date: new Date("2026-11-11"),
    type: "Major",
    description: "Brother-sister festival",
    pujaVidhi:
      "Sisters perform tilak ceremony on brothers, brothers give gifts and promise protection",
    significance:
      "Celebrates bond between brother and sister, Yama visited his sister Yamuna on this day",
  },
  {
    id: "chhath-puja",
    name: "Chhath Puja",
    sanskrit: "छठ पूजा",
    date: new Date("2026-11-15"),
    type: "Vrat",
    description: "Worship of Sun God",
    pujaVidhi:
      "36-hour fast, stand in water offering arghya to rising and setting sun, eat only prasad",
    significance:
      "Ancient Hindu festival dedicated to Sun God and Chhathi Maiya, mainly celebrated in Bihar and Jharkhand",
    regional: ["Bihar", "Jharkhand", "Uttar Pradesh"],
  },
];

export function getFestivalsForMonth(year: number, month: number): Festival[] {
  return FESTIVALS.filter((festival) => {
    const festivalDate = new Date(festival.date);
    return festivalDate.getFullYear() === year && festivalDate.getMonth() === month;
  }).sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function getUpcomingFestivals(count: number = 5): Festival[] {
  const today = new Date();
  return FESTIVALS.filter((festival) => festival.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, count);
}

export function getFestivalById(id: string): Festival | undefined {
  return FESTIVALS.find((festival) => festival.id === id);
}
