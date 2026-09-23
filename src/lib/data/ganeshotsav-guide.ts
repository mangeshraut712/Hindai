export interface GaneshDarshanStop {
  name: string;
  marathi: string;
  area: string;
  mapQuery: string;
  story: string;
  visitNote: string;
  sourceUrl: string;
  sourceLabel: string;
}

export const PUNE_STOPS: GaneshDarshanStop[] = [
  {
    name: "Kasba Ganpati",
    marathi: "कसबा गणपती · मानाचा पहिला",
    area: "Kasba Peth, near Lal Mahal",
    mapQuery: "Shri Kasba Ganpati Mandal Kasba Peth Pune",
    story:
      "Pune's gramdaivat and first Ganpati of honour. The district administration records the older shrine's association with Jijabai; the mandal dates its public festival to 1893.",
    visitNote:
      "Begin here for the ceremonial order. The shrine and festival mandap may have separate queues.",
    sourceUrl: "https://kasbaganpati.org/about-us/",
    sourceLabel: "Kasba Mandal history",
  },
  {
    name: "Tambdi Jogeshwari Ganpati",
    marathi: "तांबडी जोगेश्वरी · मानाचा दुसरा",
    area: "Budhwar Peth / Appa Balwant Chowk",
    mapQuery: "Tambdi Jogeshwari Ganpati Mandal Pune",
    story:
      "The second mandal of honour is associated with the old Tambdi Jogeshwari goddess temple. Its Ganeshotsav belongs to the early public-festival era.",
    visitNote:
      "Continue through the old peth lanes; follow the signed pedestrian queue rather than a car route.",
    sourceUrl:
      "https://pudhari.news/features/%E0%A4%AA%E0%A5%81%E0%A4%A3%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2-%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A4%BE%E0%A4%9A%E0%A4%BE-%E0%A4%A6%E0%A5%81%E0%A4%B8%E0%A4%B0%E0%A4%BE-%E0%A4%97%E0%A4%A3%E0%A4%AA%E0%A4%A4%E0%A5%80-%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80-%E0%A4%A4%E0%A4%BE%E0%A4%82%E0%A4%AC%E0%A4%A1%E0%A5%80-%E0%A4%9C%E0%A5%8B%E0%A4%97%E0%A5%87%E0%A4%B6%E0%A5%8D%E0%A4%B5%E0%A4%B0%E0%A5%80-%E0%A4%B8%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%B5%E0%A4%9C%E0%A4%A8%E0%A4%BF%E0%A4%95-%E0%A4%97%E0%A4%A3%E0%A5%87%E0%A4%B6%E0%A5%8B%E0%A4%A4%E0%A5%8D%E0%A4%B8%E0%A4%B5-%E0%A4%AE%E0%A4%82%E0%A4%A1%E0%A4%B3",
    sourceLabel: "Mandal history",
  },
  {
    name: "Dagdusheth Halwai Ganpati",
    marathi: "श्रीमंत दगडूशेठ हलवाई गणपती · अतिरिक्त थांबा",
    area: "Ganpati Bhavan, 250 Budhwar Peth",
    mapQuery: "Shrimant Dagdusheth Halwai Ganpati Ganpati Bhavan 250 Budhwar Peth Pune",
    story:
      "The Trust traces the shrine to Dagdusheth and Lakshmibai after the loss of their son during plague. Their neighbourhood celebration grew with Pune's public Ganeshotsav; the present Trust also runs social programmes.",
    visitNote:
      "This is an extra stop, not one of the Manache 5. Expect a separate, potentially long queue; the Trust lists daily aarti hours online.",
    sourceUrl: "https://www.dagdushethganpati.com/about",
    sourceLabel: "Dagdusheth Trust history",
  },
  {
    name: "Guruji Talim Ganpati",
    marathi: "गुरुजी तालीम · मानाचा तिसरा",
    area: "Laxmi Road, Budhwar Peth",
    mapQuery: "Guruji Talim Ganpati Mandal Laxmi Road Pune",
    story:
      "The third Ganpati of honour comes from the talim, or traditional training-ground, culture of the old city. Accounts of the mandal remember participation across communities.",
    visitNote:
      "The streets around Laxmi Road are narrow and busiest after evening lighting begins.",
    sourceUrl: "https://www.naad.live/mandals/guruji-talim-ganpati",
    sourceLabel: "Mandal guide",
  },
  {
    name: "Tulshibaug Ganpati",
    marathi: "तुळशीबाग गणपती · मानाचा चौथा",
    area: "Tulshibaug market, Budhwar Peth",
    mapQuery: "Tulshibaug Ganpati Mandal Pune",
    story:
      "The fourth Ganpati of honour belongs to the historic Tulshibaug market and temple precinct, where festival darshan meets Pune's everyday bazaar life.",
    visitNote: "Keep bags small and stay with the signed queue through the market lanes.",
    sourceUrl: "https://www.naad.live/ganeshotsav/manache-ganpati",
    sourceLabel: "Manache route guide",
  },
  {
    name: "Kesariwada Ganpati",
    marathi: "केसरीवाडा गणपती · मानाचा पाचवा",
    area: "Kesari Wada, Narayan Peth",
    mapQuery: "Kesari Wada Ganpati Narayan Peth Pune",
    story:
      "The fifth honour stop is linked to Lokmanya Tilak and the Kesari newspaper. A Government of India heritage account records Ganeshotsav programmes in the wada's courtyard.",
    visitNote: "End the honour circuit here. This is a separate location from Dagdusheth.",
    sourceUrl: "https://cmsadmin.amritmahotsav.nic.in/district-reopsitory-detail.htm?24878=",
    sourceLabel: "Government heritage account",
  },
];

export const MUMBAI_STOPS: GaneshDarshanStop[] = [
  {
    name: "Mumbaicha Raja · Ganesh Galli",
    marathi: "मुंबईचा राजा · गणेश गल्ली",
    area: "Ganesh Galli, Lalbaug",
    mapQuery: "Mumbaicha Raja Ganesh Galli Lalbaug Mumbai",
    story:
      "The Lalbaug Sarvajanik Utsav Mandal says it began in 1928. Its Ganesh Galli setting and changing mandap designs form a separate tradition from Lalbaugcha Raja.",
    visitNote: "Pair with Lalbaugcha Raja on foot, but treat each mandal's queue as independent.",
    sourceUrl: "https://mumbaicharaja.co/about",
    sourceLabel: "Mumbaicha Raja Mandal",
  },
  {
    name: "Lalbaugcha Raja",
    marathi: "लालबागचा राजा",
    area: "Lalbaug Market, Dr B. A. Road",
    mapQuery: "Lalbaugcha Raja Lalbaug Market Mumbai",
    story:
      "The mandal marks 2026 as its 93rd year and traces its social work to 1934. Its Mukh Darshan and Charan Sparsh lines are distinct.",
    visitNote:
      "For 2026, the mandal says Charan Sparsh closes at 6:00 am on 24 September and Mukh Darshan at 11:59 pm that day. Check its live update before leaving.",
    sourceUrl: "https://lalbaugcharaja.com/en/",
    sourceLabel: "Lalbaugcha Raja 2026 notice",
  },
  {
    name: "GSB Seva Mandal MahaGanapati",
    marathi: "जीएसबी सेवा मंडळ · किंग्स सर्कल",
    area: "Shree Sukriteendra Nagar, King's Circle",
    mapQuery: "GSB Seva Mandal Ganeshotsav King's Circle Mumbai",
    story:
      "The Trust says its MahaGanapati festival has run since 1955 and combines worship with charitable work.",
    visitNote:
      "Its 2026 public festival ran 14–18 September, so this stop is no longer open for the current 2026 festival.",
    sourceUrl: "https://gsbsevamandal.org/gsb-seva-mandal-ganeshotsav-celebration-2026",
    sourceLabel: "GSB 2026 notice",
  },
  {
    name: "Andhericha Raja",
    marathi: "अंधेरीचा राजा",
    area: "Azad Nagar, Andheri West",
    mapQuery: "Andhericha Raja Azad Nagar Andheri West Mumbai",
    story:
      "The Azad Nagar Samiti dates its festival to 1966, founded by industrial workers who had moved from the Lalbaug-Parel area.",
    visitNote:
      "A separate western-suburbs trip. The Samiti traditionally immerses its larger idol on the Sankashti after Anant Chaturdashi; confirm this year's procession notice.",
    sourceUrl: "https://www.andhericharaja.com/",
    sourceLabel: "Andhericha Raja Samiti",
  },
];

export const GANESHAI_TRACKS = ganeshaiSongs;
import ganeshaiSongs from "./ganeshotsav-songs.json";
