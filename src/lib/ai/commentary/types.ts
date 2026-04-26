// Commentary-Aware AI Types
// System for providing different philosophical perspectives on scriptures

export type AcharyaPerspective =
  | "shankara"
  | "ramanuja"
  | "madhva"
  | "vallabha"
  | "nimbarka"
  | "chaitanya"
  | "general";

export interface CommentaryRequest {
  verse: string;
  scripture: string;
  perspective: AcharyaPerspective;
  question?: string;
}

export interface CommentaryResponse {
  perspective: AcharyaPerspective;
  acharyaName: string;
  school: string;
  commentary: string;
  keyPoints: string[];
  relatedConcepts: string[];
  sources: string[];
}

export interface AcharyaProfile {
  id: AcharyaPerspective;
  name: string;
  sanskrit: string;
  school: string;
  period: string;
  keyTeachings: string[];
  famousWorks: string[];
  corePhilosophy: string;
}
