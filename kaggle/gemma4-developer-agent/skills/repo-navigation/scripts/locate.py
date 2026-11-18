#!/usr/bin/env python3
"""Search /workspace for identifiers using directory-pruned traversal. Offline."""

from __future__ import annotations

import os
import sys
from pathlib import Path

SKIP_DIRS = {
    ".git",
    ".hg",
    ".svn",
    ".venv",
    "venv",
    "env",
    "node_modules",
    "__pycache__",
    ".pytest_cache",
    ".mypy_cache",
    ".ruff_cache",
    ".tox",
    "dist",
    "build",
}
ALLOWED_SUFFIXES = {
    ".py",
    ".pyi",
    ".toml",
    ".cfg",
    ".ini",
    ".yaml",
    ".yml",
    ".json",
    ".txt",
    ".md",
}
MAX_HITS = 40
MAX_FILE_HITS = 8


def workspace_root() -> Path:
    return Path(os.environ.get("WORKSPACE_ROOT", "/workspace"))


def should_skip_dir(name: str) -> bool:
    return name in SKIP_DIRS or name.endswith(".egg-info")


def iter_candidate_files(root: Path):
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = sorted(d for d in dirnames if not should_skip_dir(d))
        base = Path(dirpath)
        for fname in sorted(filenames):
            candidate = base / fname
            if candidate.suffix in ALLOWED_SUFFIXES and candidate.is_file():
                yield candidate


def search(needles: list[str], root: Path | None = None) -> None:
    target_root = root or workspace_root()
    lowered_needles = [n.lower() for n in needles if n]
    hits = 0
    for path in iter_candidate_files(target_root):
        if hits >= MAX_HITS:
            print(f"# truncated after {MAX_HITS} hits")
            return
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        rel = path.relative_to(target_root).as_posix()
        file_hits = 0
        for index, line in enumerate(text.splitlines(), start=1):
            if file_hits >= MAX_FILE_HITS:
                break
            lowered = line.lower()
            if any(needle in lowered for needle in lowered_needles):
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
