// Dhatu (Verb Root) Types

export interface Dhatu {
  id: string;
  root: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  ganah: Gana;
  pada: Pada;
  artha: string;
  examples: DhatuExample[];
}

export interface DhatuExample {
  sanskrit: string;
  transliteration: string;
  meaning: string;
}

export type Gana =
  | "Bhvadi"
  | "Adadi"
  | "Juhotyadi"
  | "Divadi"
  | "Svadi"
  | "Tudadi"
  | "Rudhadi"
  | "Tanadi"
  | "Kryadi"
  | "Curadi";

export type Pada = "Parasmaipada" | "Atmanepada" | "Ubhayapada";

export interface DhatuSearchResult {
  dhatus: Dhatu[];
  total: number;
}
