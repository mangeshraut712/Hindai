import { NextRequest, NextResponse } from "next/server";
import { FEATURE_COVERAGE, STARTER_DATASET_NOTICE } from "@/lib/data/feature-coverage";
import {
  SHAKTI_PEETHAS,
  getShaktiPeethaById,
  getShaktiPeethaByName,
  getShaktiPeethasByCountry,
  getShaktiPeethasByState,
  searchShaktiPeethas,
} from "@/lib/data/shakti-peethas";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const country = searchParams.get("country");
    const state = searchParams.get("state");
    const query = searchParams.get("q");

    if (id) {
      const num = parseInt(id);
      if (isNaN(num)) {
        return NextResponse.json({ error: "Invalid id parameter" }, { status: 400 });
      }
      const peetha = getShaktiPeethaById(num);
      if (!peetha) {
        return NextResponse.json({ error: "Shakti Peetha not found" }, { status: 404 });
      }
      return NextResponse.json({ peetha });
    }

    if (name) {
      const peetha = getShaktiPeethaByName(name);
      if (!peetha) {
        return NextResponse.json({ error: "Shakti Peetha not found" }, { status: 404 });
      }
      return NextResponse.json({ peetha });
    }

    if (country) {
      const peethas = getShaktiPeethasByCountry(country);
      return NextResponse.json({ peethas, total: peethas.length });
    }

    if (state) {
      const peethas = getShaktiPeethasByState(state);
      return NextResponse.json({ peethas, total: peethas.length });
    }

    if (query) {
      const peethas = searchShaktiPeethas(query);
      return NextResponse.json({ peethas, total: peethas.length });
    }

    return NextResponse.json({
      peethas: SHAKTI_PEETHAS,
      total: SHAKTI_PEETHAS.length,
      coverage: FEATURE_COVERAGE.shaktiPeethas,
      notice: STARTER_DATASET_NOTICE,
    });
  } catch (error) {
    console.error("Shakti Peethas API error:", error);
    return NextResponse.json({ error: "Failed to fetch shakti peethas" }, { status: 500 });
  }
}
