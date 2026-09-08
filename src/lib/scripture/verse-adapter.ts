import type { Commentary, Translation, VerseWithLayers, WordAnalysis } from "@/lib/database/schema";
import type { ScriptureVerse } from "@/types/scripture";

const EPOCH = new Date(0);

function wordEntries(verse: ScriptureVerse) {
  if (verse.padaArtha?.length) {
    return verse.padaArtha.map((entry) => ({
      word: entry.word,
      iast: entry.iast,
      meaning: entry.meaning,
    }));
  }

  return (verse.wordByWord || []).map((entry) => ({
    word: entry.sanskrit,
    iast: entry.iast,
    meaning: entry.meaning,
  }));
}

export function toVerseWithLayers(verse: ScriptureVerse): VerseWithLayers {
  const words: WordAnalysis[] = wordEntries(verse).map((entry, index) => ({
    id: `${verse.id}-w-${index + 1}`,
    verse_id: verse.id,
    position: index + 1,
    word_devanagari: entry.word,
    word_iast: entry.iast,
    lemma: entry.iast,
    meaning_en: entry.meaning,
    created_at: EPOCH,
  }));

  const translations: Translation[] = [
    {
      id: `${verse.id}-en`,
      verse_id: verse.id,
      lang: "en",
      translator_name: "Local index",
      text: verse.translation.en,
      created_at: EPOCH,
      updated_at: EPOCH,
    },
  ];

  if (verse.translation.hi) {
    translations.push({
      id: `${verse.id}-hi`,
      verse_id: verse.id,
      lang: "hi",
      translator_name: "Local index",
      text: verse.translation.hi,
      created_at: EPOCH,
      updated_at: EPOCH,
    });
  }

  const commentaries: Commentary[] = verse.commentary
    ? [
        {
          id: `${verse.id}-note`,
          verse_id: verse.id,
          acharya: "Traditional note",
          school: "general",
          text_en: verse.commentary,
          source: "local-index",
          created_at: EPOCH,
          updated_at: EPOCH,
        },
      ]
    : [];

  return {
    id: verse.id,
    scripture_id: verse.scriptureId,
    book: verse.mandala ?? 1,
    chapter: verse.chapter,
    verse_num: verse.verse,
    text_devanagari: verse.sanskrit,
    text_iast: verse.transliteration,
    meter: verse.meter,
    verified: true,
    created_at: EPOCH,
    updated_at: EPOCH,
    word_analysis: words,
    translations,
    commentaries,
    audio: [],
  };
}
