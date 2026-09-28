#!/usr/bin/env python3
"""Build competition submission.zip with agent.yaml at the archive root."""

from __future__ import annotations

import argparse
import hashlib
import stat
import zipfile
from pathlib import Path

REQUIRED = {
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
}

MAX_UNPACKED = 3 * 1024**3
SKIP_NAMES = {"__pycache__", ".DS_Store"}


def collect_files(root: Path) -> dict[str, Path]:
    files: dict[str, Path] = {}
    for path in root.rglob("*"):
        if path.is_symlink():
            raise SystemExit(f"Remove symlink before packing: {path}")
        if not path.is_file():
            continue
        if any(part in SKIP_NAMES for part in path.parts):
            continue
        rel = path.relative_to(root).as_posix()
        files[rel] = path
    return files


def build(root: Path, archive: Path) -> None:
    files = collect_files(root)
    missing = sorted(REQUIRED - set(files))
    if missing:
        raise SystemExit(f"Missing required files: {missing}")
    unpacked = sum(path.stat().st_size for path in files.values())
    if unpacked >= MAX_UNPACKED:
        raise SystemExit("The unpacked package must be below 3 GiB.")

    archive.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for name in sorted(files):
            info = zipfile.ZipInfo(name)
            info.create_system = 3
            mode = 0o755 if name.endswith((".sh", ".py")) else 0o644
            info.external_attr = (stat.S_IFREG | mode) << 16
            info.compress_type = zipfile.ZIP_DEFLATED
            zf.writestr(info, files[name].read_bytes())

    with zipfile.ZipFile(archive) as zf:
        if zf.testzip() is not None:
            raise SystemExit("Archive verification failed.")
        names = set(zf.namelist())
        missing_in_zip = sorted(REQUIRED - names)
        if missing_in_zip:
            raise SystemExit(f"Archive missing required paths: {missing_in_zip}")
        if "agent.yaml" not in names:
            raise SystemExit("agent.yaml must be at the zip root.")

    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    print(f"Archive: {archive}")
    print(f"Files: {len(files)}")
    print(f"SHA256: {digest}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--root",
        type=Path,
        default=Path(__file__).resolve().parent,
        help="Agent package directory",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=Path(__file__).resolve().parent.parent / "dist" / "submission.zip",
        help="Output zip path",
    )
    args = parser.parse_args()
    build(args.root, args.out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
