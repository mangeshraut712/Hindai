"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Language, Translation } from "./types";
import { TRANSLATIONS } from "./translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  dictionary: Translation[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SUPPORTED_LANGUAGES: Language[] = ["English", "Hindi", "Marathi", "Tamil", "Telugu"];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("English");

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
