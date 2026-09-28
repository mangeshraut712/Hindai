---
name: repo_navigation
description: Locate symbols and files in /workspace without relying on graph tools.
---

# Repo navigation

Use this skill when `search_similar_code` or graph lookups fail, return empty, or you only have prose from the issue.

## Workflow

1. Extract identifiers, API names, error strings, and test names from the issue.
2. Run the bundled script to grep the tree.
3. Open the shortest unique file range with `read_file`.
4. If the hit is a wrapper, follow imports and callers with `rg` or `get_code_neighbors`.

Do not print entire repositories. Prefer `*.py` source over docs and vendored trees.
