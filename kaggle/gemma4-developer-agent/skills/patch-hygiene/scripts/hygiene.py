#!/usr/bin/env python3
"""Print git status, hygiene warnings, and diff from /workspace. Offline."""

from __future__ import annotations

import os
import subprocess
from pathlib import Path

PROTECTED_BASENAMES = {"pytest.ini", "conftest.py"}


def inspect_status_lines(porcelain: str) -> list[str]:
    warnings: list[str] = []
    for raw in porcelain.splitlines():
        if len(raw) < 4:
            continue
        code = raw[:2]
        raw_rel = raw[3:].strip()
        if " -> " in raw_rel:
            old_rel, rel = (part.strip().strip('"') for part in raw_rel.split(" -> ", 1))
            touched_paths = [old_rel, rel]
        else:
            rel = raw_rel.strip('"')
            touched_paths = [rel]

        name = Path(rel).name
        if code == "??":
            warnings.append(f"untracked scratch file must be removed before submit_patch: {rel}")
        seen_protected: set[str] = set()
        for candidate in touched_paths:
            cand_name = Path(candidate).name
            if cand_name in PROTECTED_BASENAMES and cand_name not in seen_protected:
                seen_protected.add(cand_name)
                warnings.append(f"harness configuration modified ({cand_name}): {raw_rel}")
        if name.endswith((".pyc", ".pyo", ".orig", ".rej")):
            warnings.append(f"artifact/backup file present in workspace: {rel}")
    return warnings


def main() -> int:
    root = Path(os.environ.get("WORKSPACE_ROOT", "/workspace")).resolve()
    status = subprocess.run(
        ["git", "status", "--porcelain"],
        cwd=root,
        capture_output=True,
        text=True,
        check=False,
    )
    if status.returncode != 0:
        if status.stderr:
            print(status.stderr.strip())
        return int(status.returncode)

    if status.stdout.strip():
        print(status.stdout.rstrip())
    else:
        print("# working tree clean (no patch yet)")

    warnings = inspect_status_lines(status.stdout)
    if warnings:
        print("---")
        for item in warnings:
            print(f"[HYGIENE WARNING] {item}")

    print("---")
    subprocess.run(["git", "diff", "HEAD", "--stat"], cwd=root, check=False)
    print("---")
    subprocess.run(["git", "diff", "HEAD"], cwd=root, check=False)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
