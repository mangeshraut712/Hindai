import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

type Hsl = { h: number; s: number; l: number };

function readLightTheme(): string {
  const css = readFileSync(join(process.cwd(), "src/index.css"), "utf8");
  const start = css.indexOf("One Hind AI light theme");
  const end = css.indexOf("One Hind AI dark theme");
  assert.ok(start >= 0 && end > start);
  return css.slice(start, end);
}

function readHsl(css: string, name: string): Hsl {
  const match = css.match(new RegExp(`${name}:\\s*([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%`));
  assert.ok(match, name);
  return {
    h: Number(match[1]),
    s: Number(match[2]) / 100,
    l: Number(match[3]) / 100,
  };
}

function channel(value: number): number {
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hsl: Hsl): number {
  const c = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s;
  const x = c * (1 - Math.abs(((hsl.h / 60) % 2) - 1));
  const m = hsl.l - c / 2;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (hsl.h < 60) [red, green, blue] = [c, x, 0];
  else if (hsl.h < 120) [red, green, blue] = [x, c, 0];
  else if (hsl.h < 180) [red, green, blue] = [0, c, x];
  else if (hsl.h < 240) [red, green, blue] = [0, x, c];
  else if (hsl.h < 300) [red, green, blue] = [x, 0, c];
  else [red, green, blue] = [c, 0, x];
  return 0.2126 * channel(red + m) + 0.7152 * channel(green + m) + 0.0722 * channel(blue + m);
}

function contrast(foreground: Hsl, background: Hsl): number {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

test("light theme button and link colors meet WCAG AA", () => {
  const css = readLightTheme();
  const background = readHsl(css, "--background");
  const primary = readHsl(css, "--primary");
  const primaryForeground = readHsl(css, "--primary-foreground");
  const accent = readHsl(css, "--accent");
  const accentForeground = readHsl(css, "--accent-foreground");
  const destructive = readHsl(css, "--destructive");
  const destructiveForeground = readHsl(css, "--destructive-foreground");

  assert.ok(contrast(primaryForeground, primary) >= 4.5);
  assert.ok(contrast(accentForeground, accent) >= 4.5);
  assert.ok(contrast(destructiveForeground, destructive) >= 4.5);
  assert.ok(contrast(primary, background) >= 4.5);
  assert.ok(contrast(readHsl(css, "--saffron"), primaryForeground) >= 4.5);
  assert.ok(contrast(readHsl(css, "--marigold"), accentForeground) >= 4.5);
});
