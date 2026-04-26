import { NextRequest, NextResponse } from "next/server";
import { FEATURE_COVERAGE, STARTER_DATASET_NOTICE } from "@/lib/data/feature-coverage";
import {
  ALL_DHATUS,
  getDhatuById,
  getDhatusByGana,
  searchDhatuByMeaning,
  searchDhatuByRoot,
} from "@/lib/sanskrit/dhatu/dhatus";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const root = searchParams.get("root");
    const meaning = searchParams.get("meaning");
    const id = searchParams.get("id");
    const ganah = searchParams.get("ganah");

    if (root) {
      const results = searchDhatuByRoot(root);
      return NextResponse.json({ dhatus: results, total: results.length });
    }

    if (meaning) {
      const results = searchDhatuByMeaning(meaning);
      return NextResponse.json({ dhatus: results, total: results.length });
    }

    if (id) {
      const dhatu = getDhatuById(id);
      if (!dhatu) {
        return NextResponse.json({ error: "Dhatu not found" }, { status: 404 });
      }
      return NextResponse.json({ dhatu });
    }

    if (ganah) {
      const results = getDhatusByGana(ganah);
      return NextResponse.json({ dhatus: results, total: results.length });
    }

    return NextResponse.json({
      dhatus: ALL_DHATUS,
      total: ALL_DHATUS.length,
      coverage: FEATURE_COVERAGE.dhatus,
      notice: STARTER_DATASET_NOTICE,
    });
  } catch (error) {
    console.error("Dhatu API error:", error);
    return NextResponse.json({ error: "Failed to search dhatus" }, { status: 500 });
  }
}
