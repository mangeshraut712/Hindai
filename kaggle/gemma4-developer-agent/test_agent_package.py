#!/usr/bin/env python3
"""Unit tests for the Hind AI Gemma 4 Developer Agent package and skill scripts."""

from __future__ import annotations

import importlib.util
import io
import os
import subprocess
import sys
import tempfile
import unittest
from contextlib import redirect_stdout
from pathlib import Path

PACK_ROOT = Path(__file__).resolve().parent
if str(PACK_ROOT) not in sys.path:
    sys.path.insert(0, str(PACK_ROOT))

import build_submission  # noqa: E402
import validate_submission as vs  # noqa: E402


def _load_script(rel_path: str, module_name: str):
    path = PACK_ROOT / rel_path
    spec = importlib.util.spec_from_file_location(module_name, path)
    assert spec and spec.loader
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


locate_mod = _load_script("skills/repo-navigation/scripts/locate.py", "skill_locate")
pytest_mod = _load_script("skills/focused-pytest/scripts/run_pytest.py", "skill_run_pytest")
hygiene_mod = _load_script("skills/patch-hygiene/scripts/hygiene.py", "skill_hygiene")


class AgentPackageTests(unittest.TestCase):
    def test_build_and_validate_submission_excludes_dev_files(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            out_zip = Path(tmp) / "submission.zip"
            buf = io.StringIO()
            with redirect_stdout(buf):
                build_submission.build(PACK_ROOT, out_zip)
            self.assertTrue(out_zip.is_file())
            vs.validate_path(out_zip)
            packed = vs.collect_zip(out_zip)
            self.assertIn("agent.yaml", packed)
            self.assertNotIn("test_agent_package.py", packed)
            self.assertNotIn("build_submission.py", packed)
            self.assertNotIn("validate_submission.py", packed)

    def test_validator_rejects_wrong_model_and_unescaped_braces(self) -> None:
        files = vs.collect_source(PACK_ROOT)
        bad_model = dict(files)
        bad_model["agent.yaml"] = files["agent.yaml"].replace(
            vs.COMPETITION_MODEL.encode(), b"gemma-4-9b-it"
        )
        with self.assertRaises(vs.ValidationError):
            vs.validate_files(bad_model)

        bad_brace = dict(files)
        bad_brace["prompts/system.md"] = files["prompts/system.md"] + b"\nBad {untrusted_var}\n"
        with self.assertRaises(vs.ValidationError):
            vs.validate_files(bad_brace)

    def test_locate_prunes_skipped_directories_and_finds_tokens(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / ".git").mkdir()
            (root / ".git" / "ignored.py").write_text("def target_symbol(): pass\n", encoding="utf-8")
            (root / ".venv").mkdir()
            (root / ".venv" / "vendored.py").write_text("target_symbol = 1\n", encoding="utf-8")
            (root / "pkg.egg-info").mkdir()
            (root / "pkg.egg-info" / "SOURCES.txt").write_text("target_symbol\n", encoding="utf-8")
            (root / "src").mkdir()
            (root / "src" / "solver.py").write_text("def target_symbol(x):\n    return x + 1\n", encoding="utf-8")

            buf = io.StringIO()
            with redirect_stdout(buf):
                locate_mod.search(["target_symbol"], root=root)
            out = buf.getvalue().strip().splitlines()
            self.assertEqual(out, ["src/solver.py:1:def target_symbol(x):"])

    def test_locate_prioritizes_python_sources_ahead_of_docs_and_ci(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            docs = root / "docs"
            docs.mkdir()
            for idx in range(12):
                content = "\n".join(f"needle_token doc line {j}" for j in range(6))
                (docs / f"guide_{idx:02d}.md").write_text(content + "\n", encoding="utf-8")
            pkg = root / "zebrapkg"
            pkg.mkdir()
            (pkg / "core.py").write_text("def needle_token():\n    return True\n", encoding="utf-8")

            buf = io.StringIO()
            with redirect_stdout(buf):
                locate_mod.search(["needle_token"], root=root)
            lines = buf.getvalue().strip().splitlines()
            self.assertEqual(lines[0], "zebrapkg/core.py:1:def needle_token():")

    def test_run_pytest_builds_pythonpath_with_src_and_root(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "src").mkdir()
            pp = pytest_mod.build_pythonpath(root, "/existing/path")
            parts = pp.split(os.pathsep)
            self.assertEqual(parts[:3], [str(root / "src"), str(root), "/existing/path"])

    def test_hygiene_flags_untracked_scratch_and_protected_files(self) -> None:
        porcelain = "\n".join(
            [
                " M pkg/module.py",
                "?? repro_tmp.py",
                " M tests/conftest.py",
                "R  tests/sub/conftest.py -> tests/sub/helpers.py",
                "R  pytest.ini -> pytest.bak",
                "?? pkg/module.py.orig",
            ]
        )
        warnings = hygiene_mod.inspect_status_lines(porcelain)
        self.assertEqual(len(warnings), 6)
        self.assertTrue(any("repro_tmp.py" in w for w in warnings))
        self.assertEqual(sum(1 for w in warnings if "conftest.py" in w), 2)
        self.assertTrue(any("pytest.ini" in w for w in warnings))
        self.assertTrue(any("module.py.orig" in w for w in warnings))

        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            subprocess.run(["git", "init", "-q"], cwd=root, check=True)
            subprocess.run(["git", "config", "user.email", "t@example.com"], cwd=root, check=True)
            subprocess.run(["git", "config", "user.name", "Test"], cwd=root, check=True)
            (root / "mod.py").write_text("x = 1\n", encoding="utf-8")
            subprocess.run(["git", "add", "mod.py"], cwd=root, check=True)
            subprocess.run(["git", "commit", "-qm", "init"], cwd=root, check=True)
            (root / "scratch.py").write_text("print(1)\n", encoding="utf-8")

            old_env = os.environ.get("WORKSPACE_ROOT")
            os.environ["WORKSPACE_ROOT"] = str(root)
            try:
                buf = io.StringIO()
                with redirect_stdout(buf):
                    rc = hygiene_mod.main()
                self.assertEqual(rc, 0)
                self.assertIn("[HYGIENE WARNING]", buf.getvalue())
            finally:
                if old_env is None:
                    os.environ.pop("WORKSPACE_ROOT", None)
                else:
                    os.environ["WORKSPACE_ROOT"] = old_env


if __name__ == "__main__":
    unittest.main()
