export type SanskritTrack = {
  slug: string;
  title: string;
  titleHi: string;
  level: string;
  levelHi: string;
  duration: string;
  durationHi: string;
  focus: string;
  focusHi: string;
  plan: string[];
  planHi: string[];
};

export const sanskritTracks: SanskritTrack[] = [
  {
    slug: "sanskrit-foundations",
    title: "Sanskrit Foundations",
    titleHi: "संस्कृत आधार",
    level: "Beginner",
    levelHi: "शुरुआती",
    duration: "2 weeks",
    durationHi: "2 सप्ताह",
    focus: "Script basics, pronunciation, and essential vocabulary.",
    focusHi: "लिपि मूल बातें, उच्चारण, और आवश्यक शब्दावली।",
    plan: [
      "Read the vowel and consonant groups aloud.",
      "Practice short Devanagari words with transliteration.",
      "Ask Gemma 4 for one example sentence per root word.",
    ],
    planHi: [
      "स्वर और व्यंजन समूहों को बोलकर पढ़ें।",
      "लिप्यंतरण के साथ छोटे देवनागरी शब्दों का अभ्यास करें।",
      "हर मूल शब्द के लिए Gemma 4 से एक उदाहरण वाक्य पूछें।",
    ],
  },
  {
    slug: "spoken-sanskrit",
    title: "Spoken Sanskrit",
    titleHi: "संवाद अभ्यास",
    level: "Practice",
    levelHi: "अभ्यास",
    duration: "3 weeks",
    durationHi: "3 सप्ताह",
    focus: "Greetings, simple prompts, and study dialogue aligned with the tutor.",
    focusHi: "अभिवादन, सरल वाक्य, और ट्यूटर के साथ संवाद अभ्यास।",
    plan: [
      "Practice greetings and classroom phrases.",
      "Ask Gemma 4 to correct one short sentence.",
      "Build a daily two-line Sanskrit dialogue.",
    ],
    planHi: [
      "अभिवादन और कक्षा के छोटे वाक्यों का अभ्यास करें।",
      "Gemma 4 से एक छोटा वाक्य सुधारने को कहें।",
      "प्रतिदिन दो पंक्तियों का संस्कृत संवाद बनाएं।",
    ],
  },
  {
    slug: "gita-guided-reading",
    title: "Bhagavad Gita Guided Reading",
    titleHi: "भगवद् गीता निर्देशित पठन",
    level: "Intermediate",
    levelHi: "मध्यवर्ती",
    duration: "4 weeks",
    durationHi: "4 सप्ताह",
    focus: "Verse-by-verse study with transliteration and explanation.",
    focusHi: "लिप्यंतरण और व्याख्या के साथ श्लोक-दर-श्लोक अध्ययन।",
    plan: [
      "Choose one verse and identify key terms.",
      "Use Gemma 4 to compare translation nuance.",
      "Write a short reflection before moving to the next verse.",
    ],
    planHi: [
      "एक श्लोक चुनें और मुख्य शब्द पहचानें।",
      "अनुवाद के भावांतर की तुलना के लिए Gemma 4 का उपयोग करें।",
      "अगले श्लोक से पहले छोटा चिंतन लिखें।",
    ],
  },
  {
    slug: "grammar-lab",
    title: "Grammar Lab",
    titleHi: "व्याकरण प्रयोगशाला",
    level: "Advanced",
    levelHi: "उन्नत",
    duration: "Ongoing",
    durationHi: "निरंतर",
    focus: "Sandhi, compounds, morphology, and syntax analysis.",
    focusHi: "संधि, समास, रूपविज्ञान और वाक्य विश्लेषण।",
    plan: [
      "Paste a phrase and request pada breakdown.",
      "Identify case, number, gender, and verbal root where possible.",
      "Ask Gemma 4 to explain uncertainties instead of guessing.",
    ],
    planHi: [
      "एक वाक्यांश चिपकाएं और पद-विभाग मांगें।",
      "जहां संभव हो विभक्ति, वचन, लिंग, और धातु पहचानें।",
      "अनुमान के बजाय अनिश्चितताओं को समझाने के लिए Gemma 4 से पूछें।",
    ],
  },
];

export function getLocalizedSanskritTracks(lang: string | null) {
  const useHindi = lang === "hi";

  return sanskritTracks.map((track) => ({
    slug: track.slug,
    title: useHindi ? track.titleHi : track.title,
    level: useHindi ? track.levelHi : track.level,
    duration: useHindi ? track.durationHi : track.duration,
    focus: useHindi ? track.focusHi : track.focus,
    plan: useHindi ? track.planHi : track.plan,
  }));
}
