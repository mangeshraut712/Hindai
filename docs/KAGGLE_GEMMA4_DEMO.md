# Demo script (no fabricated footage)

Record only what actually runs. Do not overlay fake pass rates.

## 3-minute local demo

1. `npm install && npm test` — show the agent unit tests pass, including zip packing.
2. Open `/developer-agent` (`npm run dev`). Click **Run on demo workspace**.
3. Scroll the tool trace: `get_status` → `search_similar_code` → `rg` → neighbors → read → edit → pytest → hygiene → `submit_patch`.
4. Show the diff containing `return default if value is None else value`.
5. Open `kaggle/gemma4-developer-agent/agent.yaml` and point at `model: gemma-4-31b-it-qat-w4a16-ct`.
6. Run `npm run kaggle:pack` and list zip contents (`python3 -c "import zipfile; print(zipfile.ZipFile('kaggle/dist/submission.zip').namelist()[:8])"`).

## What not to show as "results"

- Hidden-test or public-leaderboard percentages you did not obtain from Kaggle.
- Screenshots of other people's notebooks.
- Workers AI 26B as if it were the contest checkpoint.

## After Mangesh accepts Kaggle rules (optional later clip)

Download data, run the official harness on one public `instance_id`, show a real trajectory. That clip is stronger than the fixture demo.
