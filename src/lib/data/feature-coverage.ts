import { AGAMAS } from "./agamas-tantras";
import { BRAHMA_SUTRAS } from "./brahma-sutras";
import { DEVI_MAHATMYA } from "./devi-mahatmya";
import { JYOTIRLINGAS } from "./jyotirlingas";
import { MAHABHARATA } from "./mahabharata";
import { ASHTAVAKRA_GITA, AVADHUTA_GITA, RIBHU_GITA } from "./minor-gitas";
import { NYAYA_SUTRAS } from "./nyaya-sutras";
import { RAMAYANA } from "./ramayana";
import { LALITA_SAHASRANAMA, SHIVA_SAHASRANAMA } from "./sahasranama-collection";
import { MAHAPURANAS, UPANISHADS } from "./scriptures";
import { SHAKTI_PEETHAS } from "./shakti-peethas";
import { SHODASHA_SAMSKARAS } from "./shodasha-samskaras";
import { VISHNU_SAHASRANAMA } from "./vishnu-sahasranama";
import { YOGA_SUTRAS } from "./yoga-sutras";
import { CANONICAL_COUNTS } from "./canonical-counts";
import { ALL_DHATUS } from "../sanskrit/dhatu/dhatus";
import { FLASHCARDS } from "../sanskrit/learning/flashcards";

export { CANONICAL_COUNTS };

export const FEATURE_COVERAGE = {
  upanishads: {
    canonical: CANONICAL_COUNTS.upanishads,
    indexed: UPANISHADS.length,
  },
  mahapuranas: {
    canonical: CANONICAL_COUNTS.mahapuranas,
    indexed: MAHAPURANAS.length,
  },
  yogaSutras: {
    canonical: CANONICAL_COUNTS.yogaSutras,
    indexed: YOGA_SUTRAS.length,
  },
  vishnuSahasranama: {
    canonical: CANONICAL_COUNTS.vishnuSahasranama,
    indexed: VISHNU_SAHASRANAMA.length,
  },
  lalitaSahasranama: {
    canonical: CANONICAL_COUNTS.lalitaSahasranama,
    indexed: LALITA_SAHASRANAMA.length,
  },
  shivaSahasranama: {
    canonical: CANONICAL_COUNTS.shivaSahasranama,
    indexed: SHIVA_SAHASRANAMA.length,
  },
  deviMahatmya: {
    canonical: CANONICAL_COUNTS.deviMahatmya,
    indexed: DEVI_MAHATMYA.length,
  },
  ramayana: {
    canonicalKandas: CANONICAL_COUNTS.ramayanaKandas,
    indexedVerses: RAMAYANA.length,
  },
  mahabharata: {
    canonicalParvas: CANONICAL_COUNTS.mahabharataParvas,
    indexedVerses: MAHABHARATA.length,
  },
  nyayaSutras: {
    indexed: NYAYA_SUTRAS.length,
  },
  brahmaSutras: {
    indexed: BRAHMA_SUTRAS.length,
  },
  shaktiPeethas: {
    canonical: CANONICAL_COUNTS.shaktiPeethas,
    indexed: SHAKTI_PEETHAS.length,
  },
  jyotirlingas: {
    canonical: CANONICAL_COUNTS.jyotirlingas,
    indexed: JYOTIRLINGAS.length,
  },
  samskaras: {
    canonical: CANONICAL_COUNTS.samskaras,
    indexed: SHODASHA_SAMSKARAS.length,
  },
  agamas: {
    canonicalShaiva: CANONICAL_COUNTS.shaivaAgamas,
    indexed: AGAMAS.length,
  },
  minorGitas: {
    indexed: ASHTAVAKRA_GITA.length + AVADHUTA_GITA.length + RIBHU_GITA.length,
  },
  dhatus: {
    target: CANONICAL_COUNTS.dhatusTarget,
    indexed: ALL_DHATUS.length,
  },
  learningFlashcards: {
    indexed: FLASHCARDS.length,
  },
} as const;

export const STARTER_DATASET_NOTICE =
  "This endpoint returns source-backed indexed records available in the app today; canonical corpus totals are shown separately when the stored dataset is still expanding.";
