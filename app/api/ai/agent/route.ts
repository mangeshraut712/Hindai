import { NextResponse } from "next/server";
import {
  createConfiguredAgentModel,
  createZeroLimitWorkspace,
  runDeveloperAgent,
  ZERO_LIMIT_ISSUE,
} from "@/lib/agent";

export const runtime = "nodejs";

type AgentRequest = {
  issue?: string;
  demo?: boolean;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as AgentRequest;
    const issue = (body.issue || "").trim() || ZERO_LIMIT_ISSUE;
    const workspace = createZeroLimitWorkspace();
    const result = await runDeveloperAgent({
      issue,
      workspace,
      model: createConfiguredAgentModel(),
    });

    return NextResponse.json({
      issue,
      demoWorkspace: "zero-limit fixture (in-memory; no host shell)",
      ...result,
      note:
        result.backend === "mock"
          ? "HINDAI_AGENT_BACKEND=mock. Hosted Kaggle scoring uses gemma-4-31b-it-qat-w4a16-ct, not this mock."
          : `Live backend ${result.backend}. Kaggle still scores only submission.zip on the hosted model.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Developer agent failed." },
      { status: 500 }
    );
  }
}
