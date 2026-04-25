import { NextRequest, NextResponse } from "next/server";
import { getLocalizedSanskritTracks } from "@/lib/sanskrit/tracks";

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang");

  return NextResponse.json(getLocalizedSanskritTracks(lang));
}
