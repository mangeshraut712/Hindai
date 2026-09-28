import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { COMPETITION_MODEL, HARNESS_TOOLS } from "./types";

export const AGENT_PACKAGE_ROOT = join(process.cwd(), "kaggle/gemma4-developer-agent");

export const REQUIRED_PACKAGE_FILES = [
  "agent.yaml",
  "eval_config.yaml",
  "configs/sampling.yaml",
  "prompts/system.md",
  "prompts/analyzer.md",
  "sub_agents/code_analyzer.yaml",
  "skills/repo_navigation/SKILL.md",
  "skills/repo_navigation/scripts/locate.py",
  "skills/repo_navigation/resources/search-tips.md",
  "skills/focused_pytest/SKILL.md",
  "skills/focused_pytest/scripts/run_pytest.sh",
  "skills/patch_hygiene/SKILL.md",
  "skills/patch_hygiene/scripts/hygiene.sh",
  "build_submission.py",
] as const;

function listFiles(dir: string, acc: string[] = [], prefix = ""): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "__pycache__" || name === ".DS_Store") continue;
    const path = join(dir, name);
    const rel = prefix ? `${prefix}/${name}` : name;
    if (statSync(path).isDirectory()) {
      listFiles(path, acc, rel);
    } else {
      acc.push(rel);
    }
  }
  return acc;
}

export function inspectAgentPackage(root = AGENT_PACKAGE_ROOT) {
  const yaml = existsSync(join(root, "agent.yaml"))
    ? readFileSync(join(root, "agent.yaml"), "utf8")
    : "";
  const files = existsSync(root) ? listFiles(root) : [];
  return {
    root,
    files,
    yaml,
    hasAgentYaml: files.includes("agent.yaml"),
    usesCompetitionModel: yaml.includes(COMPETITION_MODEL),
    declaresHarnessTools: HARNESS_TOOLS.filter((tool) => yaml.includes(tool)),
    missing: REQUIRED_PACKAGE_FILES.filter((file) => !existsSync(join(root, file))),
  };
}
