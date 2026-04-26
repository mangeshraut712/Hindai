import { NextRequest, NextResponse } from "next/server";
import { FEATURE_COVERAGE } from "@/lib/data/feature-coverage";
import {
  JYOTIRLINGAS,
  getJyotirlingaById,
  getJyotirlingaByName,
  getJyotirlingasByState,
  searchJyotirlingas,
} from "@/lib/data/jyotirlingas";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const state = searchParams.get("state");
    const query = searchParams.get("q");

    if (id) {
      const num = parseInt(id);
      if (isNaN(num)) {
        return NextResponse.json({ error: "Invalid id parameter" }, { status: 400 });
      }
      const jyotirlinga = getJyotirlingaById(num);
      if (!jyotirlinga) {
        return NextResponse.json({ error: "Jyotirlinga not found" }, { status: 404 });
      }
      return NextResponse.json({ jyotirlinga });
    }

    if (name) {
      const jyotirlinga = getJyotirlingaByName(name);
      if (!jyotirlinga) {
        return NextResponse.json({ error: "Jyotirlinga not found" }, { status: 404 });
      }
      return NextResponse.json({ jyotirlinga });
    }

    if (state) {
      const jyotirlingas = getJyotirlingasByState(state);
      return NextResponse.json({ jyotirlingas, total: jyotirlingas.length });
    }

    if (query) {
      const jyotirlingas = searchJyotirlingas(query);
      return NextResponse.json({ jyotirlingas, total: jyotirlingas.length });
    }

    return NextResponse.json({
      jyotirlingas: JYOTIRLINGAS,
      total: JYOTIRLINGAS.length,
      coverage: FEATURE_COVERAGE.jyotirlingas,
    });
  } catch (error) {
    console.error("Jyotirlingas API error:", error);
    return NextResponse.json({ error: "Failed to fetch jyotirlingas" }, { status: 500 });
  }
}
