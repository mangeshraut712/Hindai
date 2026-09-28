import { createMockModel, runDeveloperAgent } from "../../../src/lib/agent/loop";
import { createZeroLimitWorkspace, ZERO_LIMIT_ISSUE } from "../../../src/lib/agent/fixtures";

export async function runWorkerAgentDemo(issue: string) {
  const workspace = createZeroLimitWorkspace();
  const result = await runDeveloperAgent({
    issue: issue.trim() || ZERO_LIMIT_ISSUE,
    workspace,
    model: createMockModel(),
  });
  return {
    issue: issue.trim() || ZERO_LIMIT_ISSUE,
    demoWorkspace: "zero-limit fixture (in-memory; no host shell)",
    ...result,
    note: "Worker demo always uses the mock policy. Kaggle scores submission.zip on gemma-4-31b-it-qat-w4a16-ct.",
  };
}
