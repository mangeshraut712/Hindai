import { MAP_VIEW } from "./south-asia-basemap";

export type SacredTradition = "shaiva" | "shakta" | "vaishnava" | "ganapatya";

export type PlaceKind =
  | "jyotirlinga"
  | "shakti-peetha"
  | "devi-yatra"
  | "char-dham"
  | "ashtavinayak";

export type ListStatus = "peetha-common" | "peetha-disputed" | "major-yatra";

export interface GeoPoint {
  lat: number;
  lng: number;
}

/** Display window for a static South Asia map. No map vendor, no live tiles. */
export const SOUTH_ASIA_BOUNDS = {
  minLat: MAP_VIEW.minLat,
  maxLat: MAP_VIEW.maxLat,
  minLng: MAP_VIEW.minLng,
  maxLng: MAP_VIEW.maxLng,
} as const;

export interface MapMarker {
  id: string;
  slug: string;
  name: string;
  sanskrit: string;
  tradition: SacredTradition;
  kind: PlaceKind;
  listStatus: ListStatus;
  lat: number;
  lng: number;
  href: string;
  locationLabel: string;
  storyBeat: string;
}

export interface StoryTrail {
  id: string;
  title: string;
  tradition: SacredTradition;
  note: string;
  markerIds: string[];
}

export function isInSouthAsia(point: GeoPoint): boolean {
  return (
    point.lat >= SOUTH_ASIA_BOUNDS.minLat &&
    point.lat <= SOUTH_ASIA_BOUNDS.maxLat &&
    point.lng >= SOUTH_ASIA_BOUNDS.minLng &&
    point.lng <= SOUTH_ASIA_BOUNDS.maxLng
  );
}

/** Equirectangular project into the Natural Earth basemap viewBox. */
export function projectSouthAsia(point: GeoPoint): { x: number; y: number } {
  const { minLat, maxLat, minLng, maxLng, width, height } = MAP_VIEW;
  return {
    x: ((point.lng - minLng) / (maxLng - minLng)) * width,
    y: ((maxLat - point.lat) / (maxLat - minLat)) * height,
  };
}

export const JYOTIRLINGA_COORDS: Record<string, GeoPoint> = {
  somnath: { lat: 20.888, lng: 70.401 },
  mallikarjuna: { lat: 16.074, lng: 78.868 },
  mahakaleshwar: { lat: 23.183, lng: 75.768 },
  omkareshwar: { lat: 22.241, lng: 76.151 },
  kedarnath: { lat: 30.735, lng: 79.067 },
  bhimashankar: { lat: 19.072, lng: 73.536 },
  vishwanath: { lat: 25.311, lng: 83.011 },
  trimbakeshwar: { lat: 19.932, lng: 73.531 },
  vaidyanath: { lat: 24.492, lng: 86.7 },
  nageshwar: { lat: 22.337, lng: 69.087 },
  rameshwaram: { lat: 9.288, lng: 79.317 },
  grishneshwar: { lat: 20.025, lng: 75.17 },
};

export const GEOGRAPHY_AUDIT_NOTE =
  "Pins use public shrine coordinates, not mythic coordinates. Puranic stories stay labelled as katha. Where lists disagree, the pin is still the living temple, and the dispute is in the article.";
