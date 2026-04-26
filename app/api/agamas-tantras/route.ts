import { NextRequest, NextResponse } from "next/server";
import { FEATURE_COVERAGE, STARTER_DATASET_NOTICE } from "@/lib/data/feature-coverage";
import {
  AGAMAS,
  getAgamaById,
  getAgamasByCategory,
  getAgamasByTradition,
  searchAgamas,
} from "@/lib/data/agamas-tantras";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const tradition = searchParams.get("tradition");
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    if (id) {
      const num = parseInt(id);
      if (isNaN(num)) {
        return NextResponse.json({ error: "Invalid id parameter" }, { status: 400 });
      }
      const agama = getAgamaById(num);
      if (!agama) {
        return NextResponse.json({ error: "Agama not found" }, { status: 404 });
      }
      return NextResponse.json({ agama });
    }

    if (tradition) {
      if (tradition !== "Shaiva" && tradition !== "Vaishnava") {
        return NextResponse.json(
          { error: "Invalid tradition parameter. Use 'Shaiva' or 'Vaishnava'" },
          { status: 400 }
        );
      }
      const agamas = getAgamasByTradition(tradition as "Shaiva" | "Vaishnava");
      return NextResponse.json({ agamas, total: agamas.length });
    }

    if (category) {
      const agamas = getAgamasByCategory(category);
      return NextResponse.json({ agamas, total: agamas.length });
    }

    if (query) {
      const agamas = searchAgamas(query);
      return NextResponse.json({ agamas, total: agamas.length });
    }

    return NextResponse.json({
      agamas: AGAMAS,
      total: AGAMAS.length,
      coverage: FEATURE_COVERAGE.agamas,
      notice: STARTER_DATASET_NOTICE,
    });
  } catch (error) {
    console.error("Agamas & Tantras API error:", error);
    return NextResponse.json({ error: "Failed to fetch agamas" }, { status: 500 });
  }
}
