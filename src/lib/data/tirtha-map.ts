import { ASHTAVINAYAK } from "./ashtavinayak";
import { CHAR_DHAM } from "./char-dham";
import { JYOTIRLINGAS } from "./jyotirlingas";
import {
  type MapMarker,
  type SacredTradition,
  type StoryTrail,
  JYOTIRLINGA_COORDS,
  isInSouthAsia,
} from "./sacred-geography";
import { SHAKTI_PEETHAS } from "./shakti-peethas";

function requireCoords(slug: string): { lat: number; lng: number } {
  const point = JYOTIRLINGA_COORDS[slug];
  if (!point) {
    throw new Error(`Missing Jyotirlinga coordinates for ${slug}`);
  }
  return point;
}

export function allMapMarkers(): MapMarker[] {
  const shaiva: MapMarker[] = JYOTIRLINGAS.map((item) => {
    const point = requireCoords(item.slug);
    return {
      id: `jyotirlinga:${item.slug}`,
      slug: item.slug,
      name: item.name,
      sanskrit: item.sanskrit,
      tradition: "shaiva" as const,
      kind: "jyotirlinga" as const,
      listStatus: "peetha-common" as const,
      lat: point.lat,
      lng: point.lng,
      href: `/mahadev/${item.slug}`,
      locationLabel: `${item.location}, ${item.state}`,
      storyBeat: item.story,
    };
  });

  const shakta: MapMarker[] = SHAKTI_PEETHAS.map((item) => ({
    id: `shakta:${item.slug}`,
    slug: item.slug,
    name: item.name,
    sanskrit: item.sanskrit,
    tradition: "shakta" as const,
    kind: item.listStatus === "major-yatra" ? ("devi-yatra" as const) : ("shakti-peetha" as const),
    listStatus: item.listStatus,
    lat: item.lat,
    lng: item.lng,
    href: `/devi/${item.slug}`,
    locationLabel: `${item.location}, ${item.country}`,
    storyBeat: item.story,
  }));

  const vaishnava: MapMarker[] = CHAR_DHAM.map((item) => ({
    id: `char-dham:${item.slug}`,
    slug: item.slug,
    name: item.name,
    sanskrit: item.sanskrit,
    tradition: "vaishnava" as const,
    kind: "char-dham" as const,
    listStatus: "peetha-common" as const,
    lat: item.lat,
    lng: item.lng,
    href: `/vishnu/${item.slug}`,
    locationLabel: `${item.location}, ${item.state}`,
    storyBeat: item.circuitNote,
  }));

  const ganapatya: MapMarker[] = ASHTAVINAYAK.map((item) => ({
    id: `ashtavinayak:${item.slug}`,
    slug: item.slug,
    name: item.name,
    sanskrit: item.sanskrit,
    tradition: "ganapatya" as const,
    kind: "ashtavinayak" as const,
    listStatus: "peetha-common" as const,
    lat: item.lat,
    lng: item.lng,
    href: `/ganesha/${item.slug}`,
    locationLabel: item.location,
    storyBeat: `Circuit halt ${item.circuitOrder} of 8.`,
  }));

  return [...shaiva, ...shakta, ...vaishnava, ...ganapatya];
}

export function markersForTradition(tradition: SacredTradition | "all"): MapMarker[] {
  const all = allMapMarkers();
  if (tradition === "all") {
    return all;
  }
  return all.filter((item) => item.tradition === tradition);
}

export const STORY_TRAILS: StoryTrail[] = [
  {
    id: "jyoti",
    title: "Twelve Jyotirlingas",
    tradition: "shaiva",
    note: "Stotra order, not a driving itinerary. Light-katha is Purana; pins are living temples.",
    markerIds: JYOTIRLINGAS.map((item) => `jyotirlinga:${item.slug}`),
  },
  {
    id: "sati",
    title: "Devi tirthas we actually index",
    tradition: "shakta",
    note: "Not a complete 51. Order is roughly west to east so the map reads as a journey, not as Sati’s body falling in sequence — that sequence is not recoverable as GPS.",
    markerIds: [
      "shakta:hinglaj",
      "shakta:ambaji",
      "shakta:jwalamukhi",
      "shakta:sharada-peeth",
      "shakta:vaishno-devi",
      "shakta:vindhyavasini",
      "shakta:vishalakshi",
      "shakta:kalighat",
      "shakta:tarapith",
      "shakta:kamakhya",
      "shakta:guhyeshwari",
      "shakta:vimala",
      "shakta:tara-tarini",
      "shakta:kolhapur-mahalakshmi",
      "shakta:kanchi-kamakshi",
      "shakta:kanyakumari",
    ],
  },
  {
    id: "char-dham",
    title: "Four-corners Char Dham",
    tradition: "vaishnava",
    note: CHAR_DHAM.map((item) => item.name).join(" → "),
    markerIds: CHAR_DHAM.map((item) => `char-dham:${item.slug}`),
  },
  {
    id: "ashtavinayak",
    title: "Ashtavinayak order",
    tradition: "ganapatya",
    note: "Maharashtra circuit as the books number it, starting at Morgaon.",
    markerIds: [...ASHTAVINAYAK]
      .sort((left, right) => left.circuitOrder - right.circuitOrder)
      .map((item) => `ashtavinayak:${item.slug}`),
  },
];

export function trailMarkers(trailId: string): MapMarker[] {
  const trail = STORY_TRAILS.find((item) => item.id === trailId);
  const all = allMapMarkers();
  if (!trail) {
    return [];
  }
  return trail.markerIds
    .map((id) => all.find((marker) => marker.id === id))
    .filter((marker): marker is MapMarker => marker !== undefined);
}

export function auditMapMarkers(): string[] {
  const problems: string[] = [];
  for (const marker of allMapMarkers()) {
    if (!isInSouthAsia(marker)) {
      problems.push(`${marker.id} is outside the South Asia window`);
    }
  }
  const ids = allMapMarkers().map((item) => item.id);
  if (new Set(ids).size !== ids.length) {
    problems.push("duplicate map marker ids");
  }
  return problems;
}
