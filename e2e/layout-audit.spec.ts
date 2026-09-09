import { test, expect, type Page } from "@playwright/test";

const ROUTES = [
  "/",
  "/contents",
  "/sadhana",
  "/stotras",
  "/ganesh-aarti",
  "/ganesh-aarti/sukhakarta-dukhaharta",
  "/shivlilamrit",
  "/shivlilamrit/book?p=1",
  "/shivlilamrit/book?p=2",
  "/ai-guide",
  "/dharma",
  "/learning",
  "/sanskrit-nova",
  "/sanskrit-tools",
  "/panchanga",
  "/philosophies",
  "/frameworks",
  "/pilgrimage",
  "/mahadev",
  "/mahadev/somnath",
  "/devi",
  "/devi/kamakhya",
  "/vishnu",
  "/ganesha",
  "/audio",
  "/quiz",
  "/daily",
  "/study-paths",
  "/community",
  "/guide",
  "/preface",
  "/structure",
  "/vision",
  "/projects",
];

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
] as const;

type LayoutFinding = {
  route: string;
  kind: "page-overflow-x" | "viewport-spill";
  detail: string;
};

async function collectLayoutFindings(page: Page, route: string): Promise<LayoutFinding[]> {
  return page.evaluate(
    ({ routeName }) => {
      const findings: LayoutFinding[] = [];
      const vw = document.documentElement.clientWidth;
      if (document.documentElement.scrollWidth > vw + 3) {
        findings.push({
          route: routeName,
          kind: "page-overflow-x",
          detail: `document ${document.documentElement.scrollWidth}px > ${vw}px`,
        });
      }

      const skip = new Set(["HTML", "BODY", "SCRIPT", "STYLE", "LINK", "META", "HEAD"]);
      const seen = new Set<string>();
      for (const el of Array.from(document.querySelectorAll("body *"))) {
        if (skip.has(el.tagName)) {
          continue;
        }
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
          continue;
        }
        if (style.position === "fixed" || style.position === "sticky") {
          continue;
        }
        const rect = el.getBoundingClientRect();
        if (rect.width < 24 || rect.height < 12) {
          continue;
        }
        if (rect.right <= vw + 4 && rect.left >= -4) {
          continue;
        }
        let current: Element | null = el.parentElement;
        let trapped = false;
        while (current) {
          const parentStyle = window.getComputedStyle(current);
          const ox = parentStyle.overflowX;
          if (ox === "auto" || ox === "scroll" || ox === "hidden" || ox === "clip") {
            trapped = true;
            break;
          }
          current = current.parentElement;
        }
        if (trapped) {
          continue;
        }
        const cls = typeof el.className === "string" ? el.className.slice(0, 90) : el.tagName;
        const key = `${el.tagName}:${cls}:${Math.round(rect.right)}`;
        if (seen.has(key)) {
          continue;
        }
        seen.add(key);
        findings.push({
          route: routeName,
          kind: "viewport-spill",
          detail: `${el.tagName}.${cls} left=${Math.round(rect.left)} right=${Math.round(rect.right)} vw=${vw} “${(el.textContent || "").replace(/\s+/g, " ").slice(0, 48)}”`,
        });
        if (findings.length > 12) {
          break;
        }
      }
      return findings;
    },
    { routeName: route }
  );
}

test.describe("Layout audit", () => {
  for (const viewport of VIEWPORTS) {
    test(`${viewport.name} pages stay inside the viewport`, async ({ page }) => {
      test.setTimeout(240000);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const all: LayoutFinding[] = [];
      for (const route of ROUTES) {
        const response = await page.goto(route, { waitUntil: "domcontentloaded" });
        expect(response?.ok() ?? false, `${route} HTTP`).toBeTruthy();
        await page.waitForTimeout(200);
        all.push(...(await collectLayoutFindings(page, route)));
      }
      expect(all, JSON.stringify(all, null, 2)).toEqual([]);
    });
  }
});
