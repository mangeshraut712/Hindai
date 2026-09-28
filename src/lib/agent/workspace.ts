import { exhaustiveTool, type GraphEdge, type GraphNode, type HarnessToolName } from "./types";

export type MemoryFile = {
  content: string;
};

export type AgentWorkspace = {
  files: Map<string, string>;
  originalFiles: Record<string, string>;
  nodes: GraphNode[];
  edges: GraphEdge[];
  submittedPatch: string | null;
  toolCalls: number;
  maxToolCalls: number;
  runCommand: (command: string) => string;
};

function normalizePath(filepath: string): string {
  return filepath.replace(/^\/workspace\/?/, "").replace(/^\.\//, "");
}

function sliceLines(content: string, startLine?: number, endLine?: number): string {
  const lines = content.split("\n");
  const start = Math.max(1, startLine ?? 1);
  const end = Math.min(lines.length, endLine ?? start + 149);
  return lines
    .slice(start - 1, end)
    .map((line, index) => `${start + index}|${line}`)
    .join("\n");
}

export function createMemoryWorkspace(options: {
  files: Record<string, string>;
  nodes?: GraphNode[];
  edges?: GraphEdge[];
  maxToolCalls?: number;
}): AgentWorkspace {
  const originalFiles = { ...options.files };
  const files = new Map(Object.entries(originalFiles));
  const nodes = options.nodes ?? [];
  const edges = options.edges ?? [];

  const workspace: AgentWorkspace = {
    files,
    originalFiles,
    nodes,
    edges,
    submittedPatch: null,
    toolCalls: 0,
    maxToolCalls: options.maxToolCalls ?? 40,
    runCommand(command: string): string {
      const trimmed = command.trim();
      if (trimmed.startsWith("ls") || trimmed === "find . -name '*.py'") {
        return [...files.keys()].sort().join("\n");
      }
      if (trimmed.startsWith("git status")) {
        return workspace.submittedPatch ? "M query/limits.py" : "";
      }
      if (trimmed.startsWith("git diff")) {
        return diffWorkspace(files, originalFiles);
      }
      const grep = trimmed.match(/^(?:rg|grep)\s+(?:-n\s+)?['"]?([^'"]+)['"]?/);
      if (grep) {
        return grepFiles(files, grep[1]);
      }
      if (trimmed.includes("pytest") || trimmed.startsWith("python")) {
        return evaluatePythonFixture(files);
      }
      return `command not simulated in the in-memory workspace: ${trimmed.slice(0, 120)}`;
    },
  };

  return workspace;
}

function grepFiles(files: Map<string, string>, needle: string): string {
  const hits: string[] = [];
  for (const [path, content] of files) {
    content.split("\n").forEach((line, index) => {
      if (line.toLowerCase().includes(needle.toLowerCase())) {
        hits.push(`${path}:${index + 1}:${line.trim()}`);
      }
    });
  }
  return hits.slice(0, 40).join("\n") || "# no hits";
}

function diffWorkspace(current: Map<string, string>, original: Record<string, string>): string {
  const chunks: string[] = [];
  const paths = new Set([...current.keys(), ...Object.keys(original)]);
  for (const path of [...paths].sort()) {
    const before = original[path] ?? "";
    const after = current.get(path) ?? "";
    if (before === after) continue;
    chunks.push(`--- a/${path}\n+++ b/${path}`);
    const beforeLines = before.split("\n");
    const afterLines = after.split("\n");
    const max = Math.max(beforeLines.length, afterLines.length);
    for (let i = 0; i < max; i += 1) {
      const left = beforeLines[i];
      const right = afterLines[i];
      if (left === right) continue;
      if (left !== undefined) chunks.push(`-${left}`);
      if (right !== undefined) chunks.push(`+${right}`);
    }
  }
  return chunks.join("\n");
}

function evaluatePythonFixture(files: Map<string, string>): string {
  const source = files.get("query/limits.py") ?? "";
  const usesOrDefault = /return\s+\w+\s+or\s+\w+/.test(source);
  if (usesOrDefault) {
    return "FAILED tests/test_limits.py::test_explicit_zero - assert 10 == 0";
  }
  if (source.includes("if value is None") || source.includes("value is None")) {
    return "3 passed in 0.01s";
  }
  return "FAILED tests/test_limits.py (behavior not recognized)";
}

export function executeHarnessTool(
  workspace: AgentWorkspace,
  name: HarnessToolName,
  args: Record<string, unknown>
): { ok: boolean; output: string } {
  workspace.toolCalls += 1;
  switch (name) {
    case "run_command": {
      const command = String(args.command ?? "");
      return { ok: true, output: workspace.runCommand(command) };
    }
    case "read_file": {
      const filepath = normalizePath(String(args.filepath ?? ""));
      const content = workspace.files.get(filepath);
      if (content === undefined) {
        return { ok: false, output: `file not found: ${filepath}` };
      }
      const start = typeof args.start_line === "number" ? args.start_line : undefined;
      const end = typeof args.end_line === "number" ? args.end_line : undefined;
      return { ok: true, output: sliceLines(content, start, end) };
    }
    case "edit_file": {
      const filepath = normalizePath(String(args.filepath ?? ""));
      const oldString = String(args.old_string ?? "");
      const newString = String(args.new_string ?? "");
      const allowMultiple = Boolean(args.allow_multiple);
      const content = workspace.files.get(filepath);
      if (!content) {
        return { ok: false, output: `file not found: ${filepath}` };
      }
      const count = content.split(oldString).length - 1;
      if (count === 0) {
        return { ok: false, output: "old_string not found" };
      }
      if (count > 1 && !allowMultiple) {
        return { ok: false, output: `old_string matched ${count} times` };
      }
      workspace.files.set(filepath, content.split(oldString).join(newString));
      return { ok: true, output: `updated ${filepath}` };
    }
    case "write_file": {
      const filepath = normalizePath(String(args.filepath ?? ""));
      workspace.files.set(filepath, String(args.content ?? ""));
      return { ok: true, output: `wrote ${filepath}` };
    }
    case "get_status": {
      return {
        ok: true,
        output: `tool_calls=${workspace.toolCalls}/${workspace.maxToolCalls} patch=${
          workspace.submittedPatch ? "ready" : "none"
        }`,
      };
    }
    case "submit_patch": {
      workspace.submittedPatch = diffWorkspace(workspace.files, workspace.originalFiles);
      return {
        ok: true,
        output: workspace.submittedPatch ? workspace.submittedPatch : "NO_PATCH",
      };
    }
    case "get_code_neighbors": {
      const node = String(args.node ?? "");
      const related = workspace.edges.filter(
        (edge) => edge.source === node || edge.target === node
      );
      if (related.length === 0) {
        return { ok: true, output: "no neighbors (graph missing or node unknown)" };
      }
      return {
        ok: true,
        output: related.map((edge) => `${edge.source} -${edge.type}-> ${edge.target}`).join("\n"),
      };
    }
    case "search_similar_code": {
      const query = String(args.query ?? "");
      const k = typeof args.k === "number" ? args.k : 10;
      const matches = workspace.nodes
        .filter(
          (node) =>
            node.id.toLowerCase().includes(query.toLowerCase()) ||
            node.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, k);
      if (matches.length === 0) {
        return {
          ok: true,
          output: "no indexed symbols matched; search_similar_code needs a node id or suffix",
        };
      }
      return { ok: true, output: matches.map((node) => `${node.id}\t${node.path}`).join("\n") };
    }
    case "get_code_subgraph": {
      const raw = args.nodes;
      const ids = Array.isArray(raw) ? raw.map(String) : [String(raw ?? "")];
      const subset = workspace.edges.filter(
        (edge) => ids.includes(edge.source) && ids.includes(edge.target)
      );
      return {
        ok: true,
        output:
          subset.map((edge) => `${edge.source} -> ${edge.target}`).join("\n") || "empty subgraph",
      };
    }
    case "run_skill_script": {
      const script = String(args.script ?? args.command ?? "");
      if (script.includes("locate")) {
        const tokens = String(args.query ?? args.args ?? "limit").split(/\s+/);
        return { ok: true, output: grepFiles(workspace.files, tokens[0] ?? "limit") };
      }
      if (script.includes("pytest")) {
        return { ok: true, output: evaluatePythonFixture(workspace.files) };
      }
      if (script.includes("hygiene")) {
        return { ok: true, output: workspace.runCommand("git status") };
      }
      return { ok: true, output: `skill script noted: ${script}` };
    }
    case "load_skill_resource": {
      return {
        ok: true,
        output:
          "search_similar_code needs an indexed symbol. Graph files may be empty; fall back to rg.",
      };
    }
    default:
      return exhaustiveTool(name);
  }
}
