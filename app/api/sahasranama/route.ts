import { NextRequest, NextResponse } from "next/server";
import {
  LALITA_SAHASRANAMA,
  SHIVA_SAHASRANAMA,
  getLalitaNameByNumber,
  getShivaNameByNumber,
  searchLalitaNames,
  searchShivaNames,
} from "@/lib/data/sahasranama-collection";
import { FEATURE_COVERAGE, STARTER_DATASET_NOTICE } from "@/lib/data/feature-coverage";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type"); // "lalita" or "shiva"
    const number = searchParams.get("number");
    const query = searchParams.get("q");

    if (!type) {
      return NextResponse.json({
        collections: {
          lalita: {
            names: LALITA_SAHASRANAMA,
            total: LALITA_SAHASRANAMA.length,
            coverage: FEATURE_COVERAGE.lalitaSahasranama,
          },
          shiva: {
            names: SHIVA_SAHASRANAMA,
            total: SHIVA_SAHASRANAMA.length,
            coverage: FEATURE_COVERAGE.shivaSahasranama,
          },
        },
        notice: STARTER_DATASET_NOTICE,
      });
    }

    if (type !== "lalita" && type !== "shiva") {
      return NextResponse.json({ error: "Invalid type. Use 'lalita' or 'shiva'" }, { status: 400 });
    }

    if (number) {
      const num = parseInt(number);
      if (isNaN(num)) {
        return NextResponse.json({ error: "Invalid number parameter" }, { status: 400 });
      }
      const name = type === "lalita" ? getLalitaNameByNumber(num) : getShivaNameByNumber(num);
      if (!name) {
        return NextResponse.json({ error: "Name not found" }, { status: 404 });
      }
      return NextResponse.json({ name, type });
    }

    if (query) {
      const names = type === "lalita" ? searchLalitaNames(query) : searchShivaNames(query);
      return NextResponse.json({ names, type, total: names.length });
    }

    const names = type === "lalita" ? LALITA_SAHASRANAMA : SHIVA_SAHASRANAMA;
    const coverage =
      type === "lalita" ? FEATURE_COVERAGE.lalitaSahasranama : FEATURE_COVERAGE.shivaSahasranama;
    return NextResponse.json({
      names,
      type,
      total: names.length,
      coverage,
      notice: STARTER_DATASET_NOTICE,
    });
  } catch (error) {
    console.error("Sahasranama API error:", error);
    return NextResponse.json({ error: "Failed to fetch names" }, { status: 500 });
  }
}
