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
    plan: track.plan,
  }));
}
