// Internationalization Types for Regional Language Support

export interface Translation {
  id: string;
  sanskrit: string;
  transliteration: string;
  language: Language;
  translation: string;
  context?: string;
}

export type Language =
  | "Hindi"
  | "Marathi"
  | "Tamil"
  | "Telugu"
  | "Kannada"
  | "Malayalam"
  | "Gujarati"
  | "Bengali"
  | "Odia"
  | "Punjabi"
  | "English";

export interface LanguageInfo {
  code: string;
  name: Language;
  nativeName: string;
  script: string;
  direction: "ltr" | "rtl";
}
