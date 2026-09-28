---
name: focused_pytest
description: Run a small pytest selection inside the offline sandbox.
---

# Focused pytest

Use after an edit when the task allows pytest. Do not treat this as the hidden verifier.

## Workflow

1. Identify existing tests near the changed module (`test_*.py`, `*_test.py`).
2. Run the bundled script with a path or `-k` expression.
3. If pytest is disabled in the task prompt, stop and use `python -c` assertions instead.
4. A pass here is evidence for the agent, not the competition score.
