import type { ReaderLocale } from "./catalog";
import { speechLangForLocale } from "./catalog";

/**
 * Spoken pauses and name hints for Indian TTS (Sarvam Bulbul) and browser voices.
 * This is a recitation glossary, not a trained neural model.
 */
const PAUSE = "। ";

const NAME_HINTS: Array<[RegExp, string]> = [
  [/शिवलीलामृत/g, "शिव लीला अमृत"],
  [/श्रीधर/g, "श्री धर"],
  [/रुद्राक्ष/g, "रुद्राक्ष"],
  [/भद्रसेन/g, "भद्र सेन"],
  [/महानंदा/g, "महा नंदा"],
  [/गोकर्ण/g, "गो कर्ण"],
  [/महाबळेश्वर/g, "महा बलेश्वर"],
  [/सिमंतिनी/g, "सीमंतिनी"],
];

export function prepareRecitation(text: string, locale: ReaderLocale): string {
  let spoken = text.replace(/॥/g, PAUSE).replace(/\s+/g, " ").trim();
  if (locale === "en" || locale === "roman") {
    return spoken;
  }
  for (const [pattern, replacement] of NAME_HINTS) {
    spoken = spoken.replace(pattern, replacement);
  }
  return spoken;
}

export function sarvamLanguage(locale: ReaderLocale): "mr-IN" | "hi-IN" | "en-IN" {
  switch (locale) {
    case "mr":
      return "mr-IN";
    case "en":
      return "en-IN";
    case "hi":
    case "roman":
      return "hi-IN";
    default: {
      const _exhaustive: never = locale;
      return _exhaustive;
    }
  }
}

export function browserSpeechLang(locale: ReaderLocale): string {
  return speechLangForLocale(locale);
}

export function sarvamSpeaker(locale: ReaderLocale): "ritu" | "shubh" {
  switch (locale) {
    case "en":
      return "shubh";
    case "mr":
    case "hi":
    case "roman":
      return "ritu";
    default: {
      const _exhaustive: never = locale;
      return _exhaustive;
    }
  }
}
