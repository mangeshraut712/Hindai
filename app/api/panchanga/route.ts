import { NextRequest, NextResponse } from "next/server";
import { PanchangaCalculator } from "@/lib/panchanga/calculator";
import { getUpcomingFestivals, getFestivalsForMonth } from "@/lib/panchanga/festivals";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get("date");
    const monthParam = searchParams.get("month");
    const yearParam = searchParams.get("year");
    const upcoming = searchParams.get("upcoming");

    // Get Panchanga for specific date
    if (dateParam) {
      const date = new Date(dateParam);
      if (isNaN(date.getTime())) {
        return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
      }
      const panchanga = PanchangaCalculator.getDate(date);
      return NextResponse.json({ panchanga });
    }

    // Get festivals for specific month
    if (monthParam && yearParam) {
      const month = parseInt(monthParam);
      const year = parseInt(yearParam);
      if (isNaN(month) || isNaN(year) || month < 0 || month > 11) {
        return NextResponse.json({ error: "Invalid month or year" }, { status: 400 });
      }
      const festivals = getFestivalsForMonth(year, month);
      return NextResponse.json({ festivals });
    }

    // Get upcoming festivals
    if (upcoming === "true") {
      const count = parseInt(searchParams.get("count") || "5");
      const festivals = getUpcomingFestivals(count);
      return NextResponse.json({ festivals });
    }

    // Default: return today's Panchanga
    const panchanga = PanchangaCalculator.getToday();
    const festivals = getUpcomingFestivals(5);

    return NextResponse.json({
      panchanga,
      upcomingFestivals: festivals,
    });
  } catch (error) {
    console.error("Panchanga API error:", error);
    return NextResponse.json({ error: "Failed to calculate Panchanga" }, { status: 500 });
  }
}
