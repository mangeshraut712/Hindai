import type { AgentWorkspace } from "./workspace";
import type { AgentStep, ToolCall } from "./types";

function alreadyCalled(steps: AgentStep[], name: string): boolean {
  return steps.some((step) => step.call?.name === name);
}

function lastOutput(steps: AgentStep[]): string {
  return steps.at(-1)?.observation?.output ?? "";
}

/**
 * Deterministic localization/repair policy used when no Gemma endpoint is
 * configured. It still goes through harness tools. It is not a substitute for
 * hosted `gemma-4-31b-it-qat-w4a16-ct` scoring.
 */
export function nextMockToolCall(workspace: AgentWorkspace, steps: AgentStep[]): ToolCall | null {
  if (workspace.submittedPatch !== null) {
    return null;
  }

  if (!alreadyCalled(steps, "get_status")) {
    return { name: "get_status", arguments: {} };
  }

  if (!alreadyCalled(steps, "search_similar_code")) {
    return { name: "search_similar_code", arguments: { query: "normalize_limit", k: 5 } };
  }

  if (!alreadyCalled(steps, "run_command")) {
    return { name: "run_command", arguments: { command: "rg -n limit" } };
  }

  if (!alreadyCalled(steps, "get_code_neighbors")) {
    return {
      name: "get_code_neighbors",
      arguments: { node: "query.limits.normalize_limit" },
    };
  }

  if (!alreadyCalled(steps, "load_skill_resource")) {
    return { name: "load_skill_resource", arguments: { name: "search-tips.md" } };
  }

  if (!alreadyCalled(steps, "read_file")) {
    const grep = lastOutput(steps);
    const fromGrep = grep.match(/([\w./]+limits\.py):/);
    const filepath = fromGrep?.[1] ?? "query/limits.py";
    return { name: "read_file", arguments: { filepath, start_line: 1, end_line: 40 } };
  }

  const source = workspace.files.get("query/limits.py") ?? "";
  if (/return\s+value\s+or\s+default/.test(source) && !alreadyCalled(steps, "edit_file")) {
    return {
      name: "edit_file",
      arguments: {
        filepath: "query/limits.py",
        old_string: "    return value or default",
        new_string: "    return default if value is None else value",
      },
    };
  }

  const ranPytest = steps.some(
    (step) =>
      step.call?.name === "run_command" && String(step.call.arguments.command).includes("pytest")
  );
  if (!ranPytest) {
    return {
      name: "run_command",
      arguments: { command: "python -m pytest -q tests/test_limits.py" },
    };
  }

  if (!alreadyCalled(steps, "run_skill_script")) {
    return { name: "run_skill_script", arguments: { script: "patch_hygiene/scripts/hygiene.sh" } };
  }

  return { name: "submit_patch", arguments: {} };
}
