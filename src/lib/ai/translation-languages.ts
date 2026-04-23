export const TRANSLATION_LANGUAGES = [
  { id: "en", label: "English" },
  { id: "hi", label: "Hindi" },
  { id: "mr", label: "Marathi" },
  { id: "bn", label: "Bengali" },
  { id: "gu", label: "Gujarati" },
  { id: "pa", label: "Punjabi" },
  { id: "ta", label: "Tamil" },
  { id: "te", label: "Telugu" },
  { id: "kn", label: "Kannada" },
  { id: "ml", label: "Malayalam" },
] as const;

export type TranslationLanguage = (typeof TRANSLATION_LANGUAGES)[number]["id"];

export const DEFAULT_TRANSLATION_LANGUAGE: TranslationLanguage = "en";

export function resolveTranslationLanguage(
  input: string | undefined,
): TranslationLanguage {
  return (
    TRANSLATION_LANGUAGES.find((language) => language.id === input)?.id ||
    DEFAULT_TRANSLATION_LANGUAGE
  );
}

export function getTranslationLanguageLabel(
  languageId: TranslationLanguage,
): string {
  return (
    TRANSLATION_LANGUAGES.find((language) => language.id === languageId)
      ?.label || "English"
  );
}
