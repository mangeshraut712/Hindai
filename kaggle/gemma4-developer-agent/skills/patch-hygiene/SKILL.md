---
name: patch-hygiene
description: Inspect the working tree and drop scratch files before submit_patch.
---

# Patch hygiene

Call this before submit_patch.

- submit_patch stages untracked files (git add -N .) then diffs. Scratch scripts left in /workspace become part of the patch.
- Put reproductions in /tmp.
- Do not commit. Do not rewrite tests to hide the bug.
- Keep the diff implementation-only.
