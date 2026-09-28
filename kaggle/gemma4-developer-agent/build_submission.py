#!/usr/bin/env python3
"""Build competition submission.zip with agent.yaml at the archive root."""

from __future__ import annotations

import argparse
import hashlib
import stat
import zipfile
from pathlib import Path

from validate_submission import SKIP_FROM_SOURCE, ValidationError, collect_source, validate_files

REQUIRED = {
    "agent.yaml",
    "eval_config.yaml",
    "configs/sampling.yaml",
    "prompts/system.md",
    "prompts/analyzer.md",
    "sub_agents/code_analyzer.yaml",
    "sub_agents/analyzer.md",
    "sub_agents/sampling.yaml",
    "skills/repo-navigation/SKILL.md",
    "skills/repo-navigation/scripts/locate.py",
    "skills/repo-navigation/resources/search-tips.md",
    "skills/focused-pytest/SKILL.md",
    "skills/focused-pytest/scripts/run_pytest.py",
    "skills/patch-hygiene/SKILL.md",
    "skills/patch-hygiene/scripts/hygiene.py",
}

def build(root: Path, archive: Path) -> None:
    files = collect_source(root)
    missing = sorted(REQUIRED - set(files))
    if missing:
        raise SystemExit(f"Missing required files: {missing}")
    try:
        validate_files(files)
    except ValidationError as exc:
        raise SystemExit(f"Submission failed harness contract: {exc}") from exc

    archive.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for name in sorted(files):
            info = zipfile.ZipInfo(name)
            info.create_system = 3
            mode = 0o755 if name.endswith(".py") else 0o644
            info.external_attr = (stat.S_IFREG | mode) << 16
            info.compress_type = zipfile.ZIP_DEFLATED
            zf.writestr(info, files[name])

    with zipfile.ZipFile(archive) as zf:
        if zf.testzip() is not None:
            raise SystemExit("Archive verification failed.")
        names = set(zf.namelist())
        missing_in_zip = sorted(REQUIRED - names)
        if missing_in_zip:
            raise SystemExit(f"Archive missing required paths: {missing_in_zip}")
        leaked = sorted(name for name in names if Path(name).name in SKIP_FROM_SOURCE)
        if leaked:
            raise SystemExit(f"Archive contains packer files: {leaked}")
        if "agent.yaml" not in names:
            raise SystemExit("agent.yaml must be at the zip root.")
        packed = {name: zf.read(name) for name in zf.namelist() if not name.endswith("/")}

    try:
        validate_files(packed)
    except ValidationError as exc:
        raise SystemExit(f"Packed zip failed harness contract: {exc}") from exc

    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    print(f"Archive: {archive}")
    print(f"Files: {len(files)}")
    print(f"SHA256: {digest}")
    for name in sorted(files):
        print(name)


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
        default=Path(__file__).resolve().parent / "dist" / "submission.zip",
        help="Output zip path",
    )
    args = parser.parse_args()
    build(args.root, args.out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
