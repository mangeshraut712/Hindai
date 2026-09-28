export const COMPETITION_MODEL = "gemma-4-31b-it-qat-w4a16-ct";

/** Closed ToolRegistry names the Kaggle compiler accepts (plus `agent_tool`). */
export const KAGGLE_CLOSED_TOOLS = [
  "run_command",
  "read_file",
  "edit_file",
  "write_file",
  "get_status",
  "submit_patch",
  "get_code_neighbors",
  "search_similar_code",
  "get_code_subgraph",
] as const;

export const HARNESS_TOOLS = [
  ...KAGGLE_CLOSED_TOOLS,
  "run_skill_script",
  "load_skill_resource",
] as const;

export type HarnessToolName = (typeof HARNESS_TOOLS)[number];

export type AgentBackendName = "mock" | "openrouter" | "ollama";

export type ToolCall = {
  name: HarnessToolName;
  arguments: Record<string, unknown>;
};

export type ToolObservation = {
  name: HarnessToolName;
  ok: boolean;
  output: string;
};

export type AgentStep = {
  thought: string;
  call: ToolCall | null;
  observation: ToolObservation | null;
};

export type AgentRunResult = {
  backend: AgentBackendName;
  model: string;
  submitted: boolean;
  patch: string;
  steps: AgentStep[];
  finalMessage: string;
  stoppedReason: "submit_patch" | "max_turns" | "empty_response" | "error";
};

export type GraphNode = {
  id: string;
  name: string;
  text: string;
  path: string;
};

export type GraphEdge = {
  source: string;
  target: string;
  type: string;
};

export function isHarnessToolName(value: string): value is HarnessToolName {
  return (HARNESS_TOOLS as readonly string[]).includes(value);
}

export function exhaustiveTool(_tool: never): never {
  throw new Error(`Unhandled harness tool: ${String(_tool)}`);
}
