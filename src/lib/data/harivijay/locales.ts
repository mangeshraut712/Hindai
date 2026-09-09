import type { ReaderLocale } from "./catalog";

export function readerLocaleLabel(locale: ReaderLocale): string {
  switch (locale) {
    case "mr":
      return "मराठी";
    case "en":
      return "English";
    default: {
      const _exhaustive: never = locale;
      return _exhaustive;
    }
  }
}

export function speechLang(locale: ReaderLocale): string {
  switch (locale) {
    case "mr":
      return "mr-IN";
    case "en":
      return "en-IN";
    default: {
      const _exhaustive: never = locale;
      return _exhaustive;
    }
  }
}
