import { createMemoryWorkspace, type AgentWorkspace } from "./workspace";

export const ZERO_LIMIT_ISSUE = `Setting a limit to zero unexpectedly restores the default limit. An omitted limit should use the default, but an explicit zero should remain zero.`;

const LIMITS_PY = `def normalize_limit(value, default=10):
    return value or default
`;

export function createZeroLimitWorkspace(): AgentWorkspace {
  return createMemoryWorkspace({
    files: {
      "query/limits.py": LIMITS_PY,
      "query/options.py": `from query.limits import normalize_limit

def parse_options(raw_limit, default=10):
    return {"limit": normalize_limit(raw_limit, default)}
`,
      "tests/test_limits.py": `from query.limits import normalize_limit

def test_explicit_zero():
    assert normalize_limit(0) == 0

def test_omitted():
    assert normalize_limit(None) == 10

def test_ordinary():
    assert normalize_limit(5) == 5
`,
    },
    nodes: [
      {
        id: "query.limits.normalize_limit",
        name: "normalize_limit",
        path: "query/limits.py",
        text: LIMITS_PY,
      },
      {
        id: "query.options.parse_options",
        name: "parse_options",
        path: "query/options.py",
        text: "parse_options",
      },
    ],
    edges: [
      {
        source: "query.options.parse_options",
        target: "query.limits.normalize_limit",
        type: "calls",
      },
    ],
  });
}

export function isZeroLimitFixed(workspace: AgentWorkspace): boolean {
  const source = workspace.files.get("query/limits.py") ?? "";
  return source.includes("value is None") && !/return\s+value\s+or\s+default/.test(source);
}
