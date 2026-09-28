# Kaggle submission package — Hind AI developer agent

This directory is the **competition artifact** for
[Google - The Gemma 4 Developer Agent Competition](https://www.kaggle.com/competitions/gemma-4-developer-agent).

Scoring is SWE-bench style: the harness compiles `agent.yaml` into a Google ADK
agent, runs it on hidden Python issues, and scores the fraction of patches that
pass held-out tests. A notebook, demo video, or Hind AI webpage is **not** the
leaderboard submission. See `docs/KAGGLE_GEMMA4.md`.

## Pack

```bash
python3 kaggle/gemma4-developer-agent/build_submission.py
# writes kaggle/gemma4-developer-agent/dist/submission.zip with agent.yaml at the zip root
python3 kaggle/gemma4-developer-agent/validate_submission.py \
  kaggle/gemma4-developer-agent/dist/submission.zip
```

Upload `kaggle/gemma4-developer-agent/dist/submission.zip` on the competition
Submit page (Kaggle account must have accepted the rules). Limit: 1 submission
per day. Do not zip this whole git directory; the packer excludes README and
Python pack/validate scripts.

## Model

Every `LlmAgent` uses **`gemma-4-31b-it-qat-w4a16-ct`**. The host loads this
checkpoint. Do not swap in Workers AI 26B, OpenRouter aliases, or other Gemma
sizes in this YAML. Optional LoRA directories would go under `adapters/` and
are **not** included in this baseline (no invented weights).

## Local checks without the 22 GB dataset

```bash
npm test                 # package validation + in-memory fixture agent
npm run kaggle:pack      # zip layout
```

Live hosted eval needs the Kaggle dataset, Docker sandbox, and GPUs described
in `HARNESS_README.md` (dataset file; download requires accepting competition
rules). This repo does **not** vendor that dataset.
