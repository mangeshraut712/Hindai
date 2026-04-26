import { NextRequest, NextResponse } from "next/server";
import { FEATURE_COVERAGE } from "@/lib/data/feature-coverage";
import {
  SHODASHA_SAMSKARAS,
  getSamskaraById,
  getSamskaraByName,
  searchSamskaras,
} from "@/lib/data/shodasha-samskaras";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const query = searchParams.get("q");

    if (id) {
      const num = parseInt(id);
      if (isNaN(num)) {
        return NextResponse.json({ error: "Invalid id parameter" }, { status: 400 });
      }
      const samskara = getSamskaraById(num);
      if (!samskara) {
        return NextResponse.json({ error: "Samskara not found" }, { status: 404 });
      }
      return NextResponse.json({ samskara });
    }

    if (name) {
      const samskara = getSamskaraByName(name);
      if (!samskara) {
        return NextResponse.json({ error: "Samskara not found" }, { status: 404 });
      }
      return NextResponse.json({ samskara });
    }

    if (query) {
      const samskaras = searchSamskaras(query);
      return NextResponse.json({ samskaras, total: samskaras.length });
    }

    return NextResponse.json({
      samskaras: SHODASHA_SAMSKARAS,
      total: SHODASHA_SAMSKARAS.length,
      coverage: FEATURE_COVERAGE.samskaras,
    });
  } catch (error) {
    console.error("Shodasha Samskaras API error:", error);
    return NextResponse.json({ error: "Failed to fetch samskaras" }, { status: 500 });
  }
}
