import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { join } from "node:path";
import { test } from "node:test";

const require = createRequire(join(process.cwd(), "package.json"));
const { prefixPublicAssetContent } = require("./scripts/prefix-public-asset-paths.js") as {
  prefixPublicAssetContent: (content: string, basePath: string, includeQuoted: boolean) => string;
};

test("GitHub Pages prefix rewrites media, manifest, and hydration script", () => {
  const html = [
    '<img src="/logo.webp" alt="" />',
    '<link rel="manifest" href="/manifest.json"/>',
    '<script src="/strip-injected-dom-attrs.js"></script>',
    '<script src="/_next/static/chunk.js"></script>',
    '<img src="/Hindai/logo.webp" alt="" />',
  ].join("");

  const out = prefixPublicAssetContent(html, "/Hindai", true);
  assert.match(out, /src="\/Hindai\/logo\.webp"/);
  assert.match(out, /href="\/Hindai\/manifest\.json"/);
  assert.match(out, /src="\/Hindai\/strip-injected-dom-attrs\.js"/);
  assert.match(out, /src="\/_next\/static\/chunk\.js"/);
  assert.equal((out.match(/\/Hindai\/logo\.webp/g) ?? []).length, 2);
});
