// Panchanga (Hindu Calendar) Types

export interface Panchanga {
  date: Date;
  tithi: Tithi;
  nakshatra: Nakshatra;
  yoga: Yoga;
  karana: Karana;
  vara: Vara;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
}

export interface Tithi {
  name: string;
  sanskrit: string;
  number: number; // 1-15 (Pratipada to Purnima/Amavasya)
  paksha: Paksha;
  endTime: string;
}

export type Paksha = "Shukla" | "Krishna";

export interface Nakshatra {
  name: string;
  sanskrit: string;
  number: number; // 1-27
  lord: string;
  endTime: string;
}

export interface Yoga {
  name: string;
  sanskrit: string;
  number: number; // 1-27
}

export interface Karana {
  name: string;
  sanskrit: string;
  number: number; // 1-11
}

export type Vara =
  | "Ravivara"
  | "Somavara"
  | "Mangalavara"
  | "Budhavara"
  | "Guruvara"
  | "Shukravara"
  | "Shanivara";

export interface Festival {
  id: string;
  name: string;
  sanskrit: string;
  date: Date;
  type: FestivalType;
  description: string;
  pujaVidhi: string;
  significance: string;
  regional?: string[];
}

export type FestivalType = "Major" | "Minor" | "Regional" | "Vrat" | "Jayanti" | "Sankranti";

export interface Muhurta {
  name: string;
  sanskrit: string;
  startTime: string;
  endTime: string;
  type: MuhurtaType;
  quality: "Excellent" | "Good" | "Fair" | "Avoid";
}

export type MuhurtaType =
  | "Abhijit"
  | "Brahma"
  | "Vijaya"
  | "Amrita"
  | "Shubha"
  | "Labha"
  | "Uttama";
