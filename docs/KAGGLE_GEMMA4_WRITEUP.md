# Hind AI developer agent — paper-track writeup draft

**Title:** Hind AI: a declarative Gemma 4 repository-repair agent with an inspectable offline loop  
**Subtitle:** Prompt, skill, and tool-use engineering on `gemma-4-31b-it-qat-w4a16-ct` without claiming hidden-test scores  
**Track:** Google — The Gemma 4 Developer Agent Paper Track  
**Word budget:** keep the Kaggle paste under 3,000 words. This draft is shorter.

## Abstract

The Gemma 4 Developer Agent Competition evaluates autonomous patches with a SWE-bench-style pass rate on hidden Python repositories. The permitted model is `gemma-4-31b-it-qat-w4a16-ct`. Hind AI is an existing grounded scripture-study product; this work adds a competition-legal ADK agent package (system prompt, read-only analyzer subagent, navigation/pytest/hygiene skills, sampling and eval limits) plus an in-repository mock loop that exercises the same tool names on a synthetic zero-limit bug. We do not report hosted leaderboard numbers. We report that the zip layout validator and the mock loop's fixture repair succeed in this repository's unit tests.

## Introduction

Coding agents fail not only at "writing the fix" but at localization, malformed edits, leftover scratch files, and budget exhaustion. Holding the base model fixed makes those procedure choices the experimental variables. Hind AI's public site remains a static gurukul; the contest artifact is `kaggle/gemma4-developer-agent/`, packed so `agent.yaml` sits at the zip root.

## Method

**Agent.** One root `LlmAgent` on the required checkpoint. Instructions require restating expected behavior, hybrid localization (graph tools after a symbol is known; `rg`/skill scripts when graphs are empty), minimal `edit_file`, focused tests, hygiene, then `submit_patch`. Thinking mode is off (`include_thoughts: false`) as a baseline, matching a documented ADK bridge behavior reported in secondary harness notes.

**Subagent.** `code_analyzer` is read-only (no edit/write/submit). It exists to separate localization from mutation.

**Skills.** `repo_navigation` (bounded grep), `focused_pytest` (offline pytest invocation), `patch_hygiene` (status/diff before submit). Scripts are intended for `run_skill_script` inside the host sandbox.

**Limits.** `eval_config.yaml` sets 300s command timeout, 40 tool calls, 3 minutes, 80 turns. These are starting budgets, not measured optima.

**No LoRA in this baseline.** Adapters are allowed but we do not ship invented weights. Fine-tuning remains future work after official local eval.

**Offline loop.** `src/lib/agent` implements harness-shaped tools on an in-memory workspace. Default `HINDAI_AGENT_BACKEND=mock` is a deterministic policy, not Gemma. Optional OpenRouter (`google/gemma-4-31b-it:free`) or Ollama can drive the same tools via a `<tool_call>` JSON protocol. GitHub Pages Worker demo always uses mock (no sandbox shell).

## Experiments

Ran in this cloud workspace:

- Unit tests including package inspection, tool-call parsing, mock fixture repair, and `build_submission.py` zip membership.
- Typecheck, lint, and (when executed in CI) Pages export / Playwright.

Not run: Kaggle 22.42 GB dataset, `swebench-sandbox` Docker, hosted 31B QAT, hidden tests. Therefore **no resolution rate is claimed**.

The synthetic issue is the classic `value or default` trap: explicit `0` must not become `10`. The mock policy searches, reads `query/limits.py`, edits to `default if value is None else value`, runs the simulated pytest, and submits a diff. That demonstrates the loop, not generalization.

## Related work

SWE-bench (Jimenez et al., ICLR 2024); SWE-agent ACI (Yang et al., 2024); ReAct (Yao et al., ICLR 2023); mini-SWE-agent; Google ADK Agent Config; competition Overview/Data pages.

## Limitations

YAML `sub_agents` / `agent_tool` wiring may need a one-line fix after downloading official `sample_submission/`. Graph tools can be empty. Mock success is not Gemma success. Public GitHub of this package is public sharing; we include no competition snapshots.

## Citations

Elan Markowitz et al. Google - The Gemma 4 Developer Agent Competition. Kaggle, 2026. https://www.kaggle.com/competitions/gemma-4-developer-agent

Elan Markowitz et al. Google - The Gemma 4 Developer Agent Paper Track. Kaggle, 2026. https://www.kaggle.com/competitions/gemma-4-developer-agent-paper
