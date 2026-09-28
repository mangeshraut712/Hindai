#!/usr/bin/env python3
"""Run a focused pytest selection from /workspace. Offline. No network."""

from __future__ import annotations

import os
import subprocess
import sys


def main() -> int:
    if len(sys.argv) < 2:
        print("usage: run_pytest.py PATH_OR_NODE [pytest args...]", file=sys.stderr)
        return 2
    os.chdir("/workspace")
    command = [sys.executable, "-m", "pytest", "-q", "--tb=short", *sys.argv[1:]]
    completed = subprocess.run(command, check=False)
    return int(completed.returncode)


if __name__ == "__main__":
    raise SystemExit(main())
