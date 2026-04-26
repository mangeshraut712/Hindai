import { NextRequest, NextResponse } from "next/server";
import { FEATURE_COVERAGE, STARTER_DATASET_NOTICE } from "@/lib/data/feature-coverage";
import {
  VISHNU_SAHASRANAMA,
  getNameByNumber,
  getNamesRange,
  searchNames,
} from "@/lib/data/vishnu-sahasranama";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const number = searchParams.get("number");
    const query = searchParams.get("q");
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (number) {
      const num = parseInt(number);
      if (isNaN(num)) {
        return NextResponse.json({ error: "Invalid number parameter" }, { status: 400 });
      }
      const name = getNameByNumber(num);
      if (!name) {
        return NextResponse.json({ error: "Name not found" }, { status: 404 });
      }
      return NextResponse.json({ name });
    }

    if (query) {
      const names = searchNames(query);
      return NextResponse.json({ names, total: names.length });
    }

    if (start && end) {
      const startNum = parseInt(start);
      const endNum = parseInt(end);
      if (isNaN(startNum) || isNaN(endNum)) {
        return NextResponse.json({ error: "Invalid range parameters" }, { status: 400 });
      }
      const names = getNamesRange(startNum, endNum);
      return NextResponse.json({ names, total: names.length });
    }

    return NextResponse.json({
      names: VISHNU_SAHASRANAMA,
      total: VISHNU_SAHASRANAMA.length,
      coverage: FEATURE_COVERAGE.vishnuSahasranama,
      notice: STARTER_DATASET_NOTICE,
    });
  } catch (error) {
    console.error("Vishnu Sahasranama API error:", error);
    return NextResponse.json({ error: "Failed to fetch names" }, { status: 500 });
  }
}
