#!/bin/bash
set -euo pipefail
cd /workspace
git status --short
echo "---"
git diff HEAD --stat || true
echo "---"
git diff HEAD || true
