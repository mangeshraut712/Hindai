#!/usr/bin/env python3
"""Print git status and diff from /workspace. Offline. No network."""

from __future__ import annotations

import os
import subprocess
import sys


def run(args: list[str]) -> None:
    completed = subprocess.run(args, check=False)
    if completed.returncode != 0:
        raise SystemExit(completed.returncode)


def main() -> int:
    os.chdir("/workspace")
    run(["git", "status", "--short"])
    print("---")
    subprocess.run(["git", "diff", "HEAD", "--stat"], check=False)
    print("---")
    subprocess.run(["git", "diff", "HEAD"], check=False)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
