#!/usr/bin/env python3
"""Search /workspace for identifiers. Offline. No network."""

from __future__ import annotations

import os
import sys
from pathlib import Path

ROOT = Path("/workspace")
SKIP_DIRS = {
    ".git",
    ".venv",
    "venv",
    "node_modules",
    "__pycache__",
    ".pytest_cache",
    "dist",
    "build",
}
MAX_HITS = 40
MAX_FILE_HITS = 8


def should_skip(path: Path) -> bool:
    return any(part in SKIP_DIRS for part in path.parts)


def search(needles: list[str]) -> None:
    hits = 0
    for path in ROOT.rglob("*"):
        if hits >= MAX_HITS:
            print(f"# truncated after {MAX_HITS} hits")
            return
        if not path.is_file() or should_skip(path):
            continue
        if path.suffix not in {".py", ".pyi", ".toml", ".cfg", ".ini", ".txt", ".md"}:
            continue
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        rel = path.relative_to(ROOT).as_posix()
        file_hits = 0
        for index, line in enumerate(text.splitlines(), start=1):
            if file_hits >= MAX_FILE_HITS:
                break
            lowered = line.lower()
            if any(needle.lower() in lowered for needle in needles):
                print(f"{rel}:{index}:{line.strip()[:200]}")
                hits += 1
                file_hits += 1
                if hits >= MAX_HITS:
                    print(f"# truncated after {MAX_HITS} hits")
                    return
    if hits == 0:
        print("# no hits")


def main() -> int:
    needles = [item.strip() for item in sys.argv[1:] if item.strip()]
    if not needles:
        extra = os.environ.get("SKILL_QUERY", "").strip()
        needles = [part for part in extra.split() if part]
    if not needles:
        print("usage: locate.py TOKEN [TOKEN ...]")
        return 2
    search(needles)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
