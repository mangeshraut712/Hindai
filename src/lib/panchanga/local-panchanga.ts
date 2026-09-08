import { PanchangaCalculator } from "@/lib/panchanga/calculator";
import { getUpcomingFestivals } from "@/lib/panchanga/festivals";
import type { Festival, Panchanga } from "@/lib/panchanga/types";

export function getLocalPanchanga(date: Date): Panchanga {
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }
  return PanchangaCalculator.getDate(date);
}

export function getLocalUpcomingFestivals(count = 6): Festival[] {
  return getUpcomingFestivals(count);
}
