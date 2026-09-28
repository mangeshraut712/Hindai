#!/usr/bin/env python3
"""Enforce the Gemma 4 Developer Agent zip contract (HARNESS_README.md).

Official wheels (adk-submission, adk-eval-core, swegemma) are not on PyPI.
This script encodes the competition limits from swegemma.config.ALLOWED_SUBMISSION_EXTENSIONS
and ToolRegistry's nine tools plus agent_tool.
"""

from __future__ import annotations

import argparse
import re
import sys
import zipfile
from pathlib import Path

COMPETITION_MODEL = "gemma-4-31b-it-qat-w4a16-ct"
ALLOWED_EXTENSIONS = {".yaml", ".yml", ".md", ".txt", ".py", ".json", ".safetensors"}
ROOT_CONFIG_NAMES = {"agent.yaml", "agent.yml", "root_agent.yaml", "root_agent.yml"}
CLOSED_TOOLS = {
    "run_command",
    "read_file",
    "edit_file",
    "write_file",
    "get_status",
    "submit_patch",
    "get_code_neighbors",
    "search_similar_code",
    "get_code_subgraph",
}
FORBIDDEN_GEN_FIELDS = {
    "tools",
    "system_instruction",
    "http_options",
    "safety_settings",
    "response_schema",
}
ALLOWED_GEN_FIELDS = {
    "temperature",
    "top_p",
    "top_k",
    "max_output_tokens",
    "presence_penalty",
    "frequency_penalty",
    "stop_sequences",
    "response_mime_type",
    "seed",
    "thinking_config",
}
ALLOWED_THINKING_FIELDS = {"thinking_budget", "thinking_level", "include_thoughts"}
ALLOWED_EVAL_KEYS = {"timeout_seconds", "max_tool_calls", "max_time_minutes", "max_turns"}
ALLOWED_INSTRUCTION_BRACES = {"problem_description"}
MAX_UNPACKED = 3 * 1024**3
MAX_FILES = 10_000
SKIP_FROM_SOURCE = {
    "README.md",
    "build_submission.py",
    "validate_submission.py",
}

TOOL_LINE = re.compile(r"^\s*-\s+([A-Za-z_][A-Za-z0-9_]*)\s*$")
MODEL_LINE = re.compile(r"^model:\s*(.+?)\s*$")
BRACE = re.compile(r"\{([^{}]+)\}")
KEY_LINE = re.compile(r"^([A-Za-z_][A-Za-z0-9_]*)\s*:")


class ValidationError(Exception):
    pass


def _read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def _top_keys(text: str) -> list[str]:
    keys: list[str] = []
    for line in text.splitlines():
        if not line or line.lstrip().startswith("#"):
            continue
        if line.startswith(" ") or line.startswith("\t"):
            continue
        match = KEY_LINE.match(line)
        if match:
            keys.append(match.group(1))
    return keys


def _models(text: str) -> list[str]:
    found: list[str] = []
    for line in text.splitlines():
        match = MODEL_LINE.match(line)
        if match:
            found.append(match.group(1).strip().strip("'\""))
    return found


def _tools(text: str) -> list[str]:
    names: list[str] = []
    in_tools = False
    for line in text.splitlines():
        if re.match(r"^tools:\s*$", line):
            in_tools = True
            continue
        if in_tools and KEY_LINE.match(line) and not line.startswith(" "):
            break
        if in_tools:
            if "agent_tool:" in line:
                continue
            match = TOOL_LINE.match(line)
            if match:
                names.append(match.group(1))
    return names


def _has_agent_tool(text: str) -> bool:
    return bool(re.search(r"^\s+agent_tool:\s*$", text, re.MULTILINE))


def _include_paths(text: str) -> list[str]:
    return re.findall(r"!include\s+(\S+)", text)


def _mapping_keys_after(text: str, header: str) -> list[str]:
    keys: list[str] = []
    in_block = False
    for line in text.splitlines():
        if re.match(rf"^{re.escape(header)}:\s*$", line):
            in_block = True
            continue
        if in_block:
            if line and not line.startswith(" ") and not line.startswith("\t") and not line.startswith("#"):
                break
            match = re.match(r"^\s+([A-Za-z_][A-Za-z0-9_]*)\s*:", line)
            if match:
                keys.append(match.group(1))
    return keys


def validate_files(files: dict[str, bytes]) -> None:
    if len(files) > MAX_FILES:
        raise ValidationError(f"Too many files: {len(files)} (max {MAX_FILES})")
    unpacked = sum(len(payload) for payload in files.values())
    if unpacked >= MAX_UNPACKED:
        raise ValidationError("Unpacked size must be below 3 GiB")

    for name in files:
        if name.startswith("/") or name.startswith("\\") or ".." in Path(name).parts:
            raise ValidationError(f"Illegal path in archive: {name}")
        suffix = Path(name).suffix.lower()
        if suffix not in ALLOWED_EXTENSIONS:
            raise ValidationError(f"Disallowed extension '{suffix}': {name}")

    roots = [Path(name).name for name in files if Path(name).parent.as_posix() in {".", ""}]
    root_configs = [name for name in files if Path(name).name in ROOT_CONFIG_NAMES and Path(name).parent.as_posix() in {".", ""}]
    if len(root_configs) == 0:
        raise ValidationError("Missing root agent config (agent.yaml)")
    if len(root_configs) > 1:
        raise ValidationError(f"Multiple root configs: {root_configs}")
    if "agent.yaml" not in files:
        raise ValidationError("agent.yaml must be at the zip root")

    stray = [name for name in roots if "agent" in name.lower() and name not in ROOT_CONFIG_NAMES | {"eval_config.yaml"}]
    if stray:
        raise ValidationError(f"Stray agent YAML at zip root: {stray}")

    models: list[str] = []
    for name, payload in files.items():
        if not name.endswith((".yaml", ".yml")):
            continue
        text = payload.decode("utf-8")
        models.extend(_models(text))
        for include in _include_paths(text):
            if include.startswith("/") or ".." in Path(include).parts:
                raise ValidationError(f"{name}: !include path traversal {include}")
        for tool in _tools(text):
            if tool not in CLOSED_TOOLS:
                raise ValidationError(f"{name}: unknown tool {tool!r}")
        if name.endswith("sampling.yaml") or "generate_content_config:" in text:
            gen_keys = _top_keys(text) if name.endswith("sampling.yaml") else _mapping_keys_after(text, "generate_content_config")
            for key in gen_keys:
                if key in FORBIDDEN_GEN_FIELDS:
                    raise ValidationError(f"{name}: forbidden generate_content_config field {key}")
                if name.endswith("sampling.yaml") and key not in ALLOWED_GEN_FIELDS:
                    raise ValidationError(f"{name}: unknown generate_content_config field {key}")
            thinking_keys = _mapping_keys_after(text, "thinking_config")
            if "thinking_level" in thinking_keys:
                raise ValidationError(f"{name}: omit thinking_level for vLLM; use include_thoughts + thinking_budget")
            for key in thinking_keys:
                if key not in ALLOWED_THINKING_FIELDS:
                    raise ValidationError(f"{name}: unknown thinking_config field {key}")
            if name.endswith("sampling.yaml"):
                if "include_thoughts" not in thinking_keys:
                    raise ValidationError(f"{name}: thinking_config must set include_thoughts")
                if "thinking_budget" not in thinking_keys:
                    raise ValidationError(f"{name}: thinking_config must set thinking_budget")

    unique_models = sorted(set(models))
    if unique_models != [COMPETITION_MODEL]:
        raise ValidationError(
            f"Every agent must declare exactly {COMPETITION_MODEL}, found {unique_models}"
        )

    eval_text = files.get("eval_config.yaml", b"").decode("utf-8")
    if not eval_text:
        raise ValidationError("eval_config.yaml is required")
    top = _top_keys(eval_text)
    if top != ["evaluation"]:
        raise ValidationError("eval_config.yaml must have a single top-level key evaluation:")
    eval_keys = set(_mapping_keys_after(eval_text, "evaluation"))
    extra = eval_keys - ALLOWED_EVAL_KEYS
    missing = ALLOWED_EVAL_KEYS - eval_keys
    if extra:
        raise ValidationError(f"eval_config.yaml unknown keys: {sorted(extra)}")
    if missing:
        raise ValidationError(f"eval_config.yaml missing keys: {sorted(missing)}")

    agent_text = files["agent.yaml"].decode("utf-8")
    if not _has_agent_tool(agent_text):
        # sub_agents is also allowed; require at least closed tools
        pass
    declared = set(_tools(agent_text))
    missing_tools = CLOSED_TOOLS - declared
    if missing_tools:
        raise ValidationError(f"agent.yaml missing closed tools: {sorted(missing_tools)}")

    for name, payload in files.items():
        if not name.endswith(".md"):
            continue
        text = payload.decode("utf-8")
        for match in BRACE.finditer(text):
            inner = match.group(1).strip()
            if inner not in ALLOWED_INSTRUCTION_BRACES:
                raise ValidationError(
                    f"{name}: curly braces {match.group(0)!r} are ADK state templates; escape or remove"
                )


def collect_source(root: Path) -> dict[str, bytes]:
    files: dict[str, bytes] = {}
    for path in sorted(root.rglob("*")):
        if path.is_symlink():
            raise ValidationError(f"Remove symlink: {path}")
        if not path.is_file():
            continue
        if any(part in {"__pycache__", ".DS_Store", "dist"} for part in path.parts):
            continue
        if path.name in SKIP_FROM_SOURCE:
            continue
        rel = path.relative_to(root).as_posix()
        files[rel] = path.read_bytes()
    return files


def collect_zip(archive: Path) -> dict[str, bytes]:
    with zipfile.ZipFile(archive) as zf:
        if zf.testzip() is not None:
            raise ValidationError("Corrupt zip")
        files: dict[str, bytes] = {}
        for info in zf.infolist():
            if info.is_dir():
                continue
            name = info.filename.replace("\\", "/")
            if name.endswith("/"):
                continue
            files[name] = zf.read(info)
        return files


def validate_path(target: Path) -> None:
    if target.is_dir():
        validate_files(collect_source(target))
        return
    if target.suffix == ".zip":
        validate_files(collect_zip(target))
        return
    raise ValidationError(f"Expected a directory or zip: {target}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "target",
        nargs="?",
        type=Path,
        default=Path(__file__).resolve().parent,
        help="Package directory or submission.zip",
    )
    args = parser.parse_args()
    try:
        validate_path(args.target)
    except ValidationError as exc:
        print(f"INVALID: {exc}", file=sys.stderr)
        return 1
    print(f"VALID: {args.target}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
