#!/bin/bash
set -euo pipefail
cd /workspace
if [[ $# -eq 0 ]]; then
  echo "usage: run_pytest.sh PATH_OR_NODE [pytest args...]" >&2
  exit 2
fi
python -m pytest -q --tb=short "$@"
