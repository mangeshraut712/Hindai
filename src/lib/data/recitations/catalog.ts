import { GANAPATI_BOOKLET_VERSES } from "@/lib/data/ganapati-atharvashirsha-booklet";
import { STOTRA_TEXTS } from "@/lib/data/stotra-texts";
import { transliterateToIast } from "@/lib/sanskrit/transliteration";
import type { Recitation, RecitationSection, RecitationVerse } from "./types";
import adityaHridayam from "./texts/aditya-hridayam.json";
import durgaSaptashati from "./texts/durga-saptashati.json";
import kalabhairava from "./texts/kalabhairava-ashtakam.json";
import kanakadhara from "./texts/kanakadhara.json";
import santanaGopala from "./texts/santana-gopala.json";
import shivaShatakam from "./texts/shiva-shatakam.json";
import vishnuSahasranama from "./texts/vishnu-sahasranama.json";

interface SourceVerse {
  label: string;
  original: string;
}

interface SourceSection {
  id: string;
  title: string;
  titleEn: string;
  verses: SourceVerse[];
}

interface SourceFile {
  sections: SourceSection[];
}

interface RecitationSeed {
  slug: string;
  title: string;
  titleSa: string;
  deity: string;
  occasion: string;
  summary: string;
  sourceNote: string;
  sections: RecitationSection[];
}

const SANSKRIT_DOCS = "https://sanskritdocuments.org";

function numberedVerses(
  verses: Array<Pick<RecitationVerse, "label" | "original" | "iast" | "english" | "note">>
): RecitationVerse[] {
  return verses.map((verse, index) => ({
    number: index + 1,
    label: verse.label,
    original: verse.original,
    iast: verse.iast,
    english: verse.english,
    note: verse.note,
  }));
}

function fromSource(file: SourceFile): RecitationSection[] {
  return file.sections.map((section) => ({
    id: section.id,
    title: section.title,
    titleEn: section.titleEn,
    verses: numberedVerses(
      section.verses.map((verse) => ({
        label: verse.label,
        original: verse.original,
        iast: transliterateToIast(verse.original),
        english: "",
        note: "",
      }))
    ),
  }));
}

function hanumanSections(): RecitationSection[] {
  const text = STOTRA_TEXTS["hanuman-chalisa"];
  return [
    {
      id: "chalisa",
      title: "श्री हनुमान चालीसा",
      titleEn: "Hanuman Chalisa",
      verses: numberedVerses(
        text.verses.map((verse) => ({
          label: String(verse.number),
          original: verse.sanskrit,
          iast: verse.transliteration,
          english: verse.translation,
          note: "",
        }))
      ),
    },
  ];
}

function atharvashirshaSections(): RecitationSection[] {
  return [
    {
      id: "upanishad",
      title: "॥ अथ गणपति-अथर्वशीर्षम् ॥",
      titleEn: "Ganapati Atharvashirsha",
      verses: numberedVerses(
        GANAPATI_BOOKLET_VERSES.map((verse) => ({
          label: verse.label ?? (verse.number === 0 ? "" : String(verse.number)),
          original: verse.original,
          iast: verse.iast,
          english: verse.english,
          note: verse.meaning,
        }))
      ),
    },
  ];
}

const SEEDS: RecitationSeed[] = [
  {
    slug: "hanuman-chalisa",
    title: "Hanuman Chalisa",
    titleSa: "हनुमान चालीसा",
    deity: "Hanuman",
    occasion: "When you feel powerless",
    summary:
      "Tulsidas’s forty chaupais, with the opening dohas and the closing doha, in the Awadhi text kept for recitation.",
    sourceNote:
      "The complete Chalisa already stored in Hind AI: two opening dohas, forty chaupais, and the closing doha. English is an explanatory sense of each verse.",
    sections: hanumanSections(),
  },
  {
    slug: "vishnu-sahasranama",
    title: "Vishnu Sahasranama",
    titleSa: "विष्णुसहस्रनामस्तोत्रम्",
    deity: "Vishnu",
    occasion: "When you feel stuck",
    summary:
      "The Mahabharata recitation: Bhishma’s opening, the preliminary nyasa, the thousand names, and the phalashruti.",
    sourceNote: `Devanagari follows the Mahabharata Anushasana Parva text published at ${SANSKRIT_DOCS}/doc_vishhnu/vsahasranew.html. IAST is a transliteration for pronunciation.`,
    sections: fromSource(vishnuSahasranama),
  },
  {
    slug: "kanakadhara-stotram",
    title: "Kanakadhara Stotram",
    titleSa: "कनकधारास्तोत्रम्",
    deity: "Lakshmi",
    occasion: "When money is tight",
    summary:
      "Shankaracharya’s hymn asking Lakshmi’s glance for prosperity. The eighteen-verse stotra is first; shlokas 19–25 follow as they appear in other printed texts.",
    sourceNote: `Devanagari follows ${SANSKRIT_DOCS}/doc_devii/kanaka.html. The prose note after the shlokas is not part of the recitation. IAST is a transliteration.`,
    sections: fromSource(kanakadhara),
  },
  {
    slug: "shiva-shatakam",
    title: "Shiva Shatakam",
    titleSa: "शिवशतकम्",
    deity: "Shiva",
    occasion: "When the mind is restless",
    summary:
      "The Shiva Shatakam that begins “शिवं गौरीश्लिष्टम्”, through verse 100 and the closing verses printed with that hymn.",
    sourceNote: `Devanagari follows shivashatakam 1 at ${SANSKRIT_DOCS}/doc_shiva/shivashatakam1.html. IAST is a transliteration.`,
    sections: fromSource(shivaShatakam),
  },
  {
    slug: "kalabhairava-ashtakam",
    title: "Kala Bhairava Ashtakam",
    titleSa: "कालभैरवाष्टकम्",
    deity: "Kala Bhairava",
    occasion: "When fear or heaviness will not lift",
    summary:
      "The eight verses beginning “देवराजसेव्यमानपावनांघ्रिपङ्कजम्”, with the phalashruti that closes the recitation.",
    sourceNote: `Devanagari follows ${SANSKRIT_DOCS}/doc_shiva/kaalabhairava.html. IAST is a transliteration.`,
    sections: fromSource(kalabhairava),
  },
  {
    slug: "ganapati-atharvashirsha",
    title: "Ganapati Atharvashirsha",
    titleSa: "गणपत्यथर्वशीर्षम्",
    deity: "Ganesha",
    occasion: "When the household is in trouble",
    summary:
      "The full Ganapati Atharvashirsha as printed in the Dagdusheth booklet: numbered sections 1–14, with the opening and closing shanti.",
    sourceNote:
      "Devanagari follows the photographed booklet, pages 8–10. IAST is a transliteration. English and Marathi notes explain the text; they are not part of the Upanishad.",
    sections: atharvashirshaSections(),
  },
  {
    slug: "santana-gopala",
    title: "Santana Gopala",
    titleSa: "सन्तानगोपालमन्त्रम्",
    deity: "Krishna",
    occasion: "When you are hoping for a child",
    summary:
      "The Santana Gopala mantra, देवकीसुत गोविन्द, and the Harivamsha stotra recited with it.",
    sourceNote: `The mantra follows ${SANSKRIT_DOCS}/doc_vishhnu/santAnagopAlakRRiShNamantram.html. The stotra follows ${SANSKRIT_DOCS}/doc_vishhnu/santaanagopaala.html. IAST is a transliteration.`,
    sections: fromSource(santanaGopala),
  },
  {
    slug: "durga-saptashati",
    title: "Durga Saptashati",
    titleSa: "दुर्गासप्तशती",
    deity: "Durga",
    occasion: "When health is failing",
    summary:
      "The Chandi path in Devanagari: opening meditation, Argala, Kilaka, Devi Kavacha, the thirteen adhyayas, the apology stotra, and the Devi sukta.",
    sourceNote: `Devanagari follows the path text at ${SANSKRIT_DOCS}/doc_devii/durga700.html. The katha pages at /durga-saptashati remain a story guide. This page is the recitation. IAST is a transliteration.`,
    sections: fromSource(durgaSaptashati),
  },
  {
    slug: "aditya-hridayam",
    title: "Aditya Hridayam",
    titleSa: "आदित्यहृदयम्",
    deity: "Surya",
    occasion: "When you want your place in the world to be honored",
    summary:
      "Agastya’s hymn to the Sun from the Yuddha Kanda, verses 1–31, followed by the nyasa some households recite before it.",
    sourceNote: `Devanagari follows ${SANSKRIT_DOCS}/doc_z_misc_navagraha/adityahriday.html, one copy of the hymn. IAST is a transliteration.`,
    sections: fromSource(adityaHridayam),
  },
];

export const RECITATIONS: Recitation[] = SEEDS;

export function listRecitationSlugs(): string[] {
  return RECITATIONS.map((item) => item.slug);
}

export function getRecitation(slug: string): Recitation | undefined {
  return RECITATIONS.find((item) => item.slug === slug);
}

export function recitationVerseCount(item: Recitation): number {
  return item.sections.reduce((sum, section) => sum + section.verses.length, 0);
}

export function recitationPlainText(item: Recitation): string {
  return item.sections
    .flatMap((section) => section.verses.map((verse) => verse.original))
    .join("\n");
}
