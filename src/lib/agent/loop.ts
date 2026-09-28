import {
  COMPETITION_MODEL,
  type AgentBackendName,
  type AgentRunResult,
  type AgentStep,
} from "./types";
import { parseToolCall } from "./parse-tool-call";
import { nextMockToolCall } from "./mock-policy";
import { executeHarnessTool, type AgentWorkspace } from "./workspace";

export type AgentModel = {
  backend: AgentBackendName;
  model: string;
  complete: (prompt: string) => Promise<string>;
};

export function createMockModel(): AgentModel {
  return {
    backend: "mock",
    model: "hindai-mock-policy",
    async complete() {
      return "";
    },
  };
}

export async function runDeveloperAgent(options: {
  issue: string;
  workspace: AgentWorkspace;
  model?: AgentModel;
  maxTurns?: number;
}): Promise<AgentRunResult> {
  const model = options.model ?? createMockModel();
  const maxTurns = options.maxTurns ?? 80;
  const steps: AgentStep[] = [];
  let stoppedReason: AgentRunResult["stoppedReason"] = "max_turns";
  let finalMessage = "";

  for (let turn = 0; turn < maxTurns; turn += 1) {
    if (options.workspace.toolCalls >= options.workspace.maxToolCalls) {
      stoppedReason = "max_turns";
      break;
    }

    let thought = "";
    let call = nextMockToolCall(options.workspace, steps);

    if (model.backend !== "mock") {
      const transcript = steps
        .map((step) => {
          const called = step.call
            ? `${step.call.name} ${JSON.stringify(step.call.arguments)}`
            : "(no tool)";
          return `Thought: ${step.thought}\nCall: ${called}\nObservation: ${step.observation?.output ?? ""}`;
        })
        .join("\n\n");
      const prompt = [
        `Issue:\n${options.issue}`,
        transcript ? `Trace so far:\n${transcript}` : "No tools used yet.",
        'Reply with a short thought and a <tool_call> JSON block {"name","arguments"}.',
      ].join("\n\n");
      const completion = await model.complete(prompt);
      thought = completion.slice(0, 400);
      call = parseToolCall(completion) ?? call;
      if (!call && completion.trim()) {
        finalMessage = completion.trim();
        stoppedReason = "empty_response";
        break;
      }
    } else {
      thought = call ? `mock:${call.name}` : "mock:stop";
    }

    if (!call) {
      stoppedReason = "empty_response";
      break;
    }

    const observation = executeHarnessTool(options.workspace, call.name, call.arguments);
    steps.push({
      thought,
      call,
      observation: { name: call.name, ok: observation.ok, output: observation.output },
    });

    if (call.name === "submit_patch") {
      stoppedReason = "submit_patch";
      finalMessage = observation.output.startsWith("NO_PATCH")
        ? "Submitted with no file changes."
        : "Submitted a workspace patch.";
      break;
    }
  }

  return {
    backend: model.backend,
    model: model.backend === "mock" ? model.model : COMPETITION_MODEL,
    submitted: stoppedReason === "submit_patch",
    patch: options.workspace.submittedPatch ?? "",
    steps,
    finalMessage,
    stoppedReason,
  };
}
