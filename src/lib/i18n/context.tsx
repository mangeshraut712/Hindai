"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Language, Translation } from "./types";
import { TRANSLATIONS } from "./translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  dictionary: Translation[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SUPPORTED_LANGUAGES: Language[] = ["English", "Hindi", "Marathi", "Tamil", "Telugu"];
const LANGUAGE_STORAGE_KEY = "hindai-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>("Marathi");

  useEffect(() => {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.includes(saved as Language)) {
      updateLanguage(saved as Language);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    updateLanguage(lang);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dictionary: TRANSLATIONS }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export { SUPPORTED_LANGUAGES };
