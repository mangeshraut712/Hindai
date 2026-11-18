#!/usr/bin/env python3
"""Run a focused pytest selection from /workspace. Offline. No network."""

from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path


def build_pythonpath(root: Path, existing: str = "") -> str:
    entries: list[str] = []
    src_dir = root / "src"
    if src_dir.is_dir():
        entries.append(str(src_dir))
    entries.append(str(root))
    if existing:
        entries.extend(part for part in existing.split(os.pathsep) if part)
    seen: set[str] = set()
    ordered: list[str] = []
    for item in entries:
        if item not in seen:
            seen.add(item)
            ordered.append(item)
    return os.pathsep.join(ordered)


def main(argv: list[str] | None = None) -> int:
    args = sys.argv[1:] if argv is None else argv
    if not args:
        print("usage: run_pytest.py PATH_OR_NODE [pytest args...]", file=sys.stderr)
        return 2
    root = Path(os.environ.get("WORKSPACE_ROOT", "/workspace")).resolve()
    env = os.environ.copy()
    env["PYTHONPATH"] = build_pythonpath(root, env.get("PYTHONPATH", ""))
    command = [
        sys.executable,
        "-m",
        "pytest",
        "-q",
        "--tb=short",
        "-r",
        "fE",
        *args,
    ]
    completed = subprocess.run(command, cwd=root, env=env, check=False)
    return int(completed.returncode)


if __name__ == "__main__":
    raise SystemExit(main())
