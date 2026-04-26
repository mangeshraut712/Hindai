// Multi-Script Sanskrit Support Types
// Support for Devanagari, Grantha, Sharada, Bengali, and other scripts

export interface ScriptConversion {
  original: string;
  originalScript: Script;
  targetScript: Script;
  converted: string;
}

export type Script =
  | "Devanagari"
  | "Grantha"
  | "Sharada"
  | "Bengali"
  | "Gurmukhi"
  | "Gujarati"
  | "Odia"
  | "Tamil"
  | "Telugu"
  | "Kannada"
  | "Malayalam"
  | "Latin"
  | "IAST";

export interface ScriptInfo {
  name: Script;
  nativeName: string;
  region: string;
  usage: string;
  unicodeRange: string;
}
