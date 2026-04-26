import { NextRequest, NextResponse } from "next/server";
import { ScriptConverter } from "@/lib/sanskrit/scripts/converter";
import { Script } from "@/lib/sanskrit/scripts/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, fromScript, toScript } = body;

    if (!text || !fromScript || !toScript) {
      return NextResponse.json(
        { error: "Missing required parameters: text, fromScript, toScript" },
        { status: 400 }
      );
    }

    const result = ScriptConverter.convert(text, fromScript as Script, toScript as Script);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Script Converter API error:", error);
    return NextResponse.json({ error: "Failed to convert script" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const text = searchParams.get("text");

    if (text) {
      const detectedScript = ScriptConverter.detectScript(text);
      return NextResponse.json({ detectedScript });
    }

    const supportedScripts = ScriptConverter.getSupportedScripts();
    return NextResponse.json({ supportedScripts });
  } catch (error) {
    console.error("Script Converter API error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
