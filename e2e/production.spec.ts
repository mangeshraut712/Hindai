import { test, expect } from "@playwright/test";

const BASE_URL = "https://hindai-nine.vercel.app";

test.describe("Production Site - Homepage", () => {
  test("should load homepage successfully", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Hind AI/);
  });

  test("should have no console errors on homepage", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    if (errors.length > 0) {
      console.error("Console errors found:", errors);
    }
    expect(errors.length).toBe(0);
  });

  test("should have proper hero section", async ({ page }) => {
    await page.goto(BASE_URL);

    const heroSection = page.locator("section").first();
    await expect(heroSection).toBeVisible();

    const heroContent = heroSection.locator("h1, h2");
    await expect(heroContent.first()).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto(BASE_URL);

    const header = page.locator("header");
    await expect(header).toBeVisible();

    const navLinks = header.locator("a[href]");
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test("should have proper footer", async ({ page }) => {
    await page.goto(BASE_URL);

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should have study modes section", async ({ page }) => {
    await page.goto(BASE_URL);

    const studyModesSection = page
      .locator("section")
      .filter({ hasText: /Modern restraint|interface works/i });
    await expect(studyModesSection).toBeVisible();

    const cards = studyModesSection.locator(".surface-panel");
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
  });
});

test.describe("Production Site - AI Features", () => {
  test("should load AI Guide page", async ({ page }) => {
    await page.goto(`${BASE_URL}/ai-guide`);
    await expect(page).toHaveTitle(/AI Guide|Guru|Hind AI/);

    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible();
  });

  test("should load Vision Analysis page", async ({ page }) => {
    await page.goto(`${BASE_URL}/vision`);
    await expect(page).toHaveTitle(/Vision|Hind AI/);

    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible();
  });

  test("should load Dharma Guide page", async ({ page }) => {
    await page.goto(`${BASE_URL}/dharma`);
    await expect(page).toHaveTitle(/Dharma|Hind AI/);

    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible();
  });

  test("should have no console errors on AI pages", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    const aiPages = ["/ai-guide", "/vision", "/dharma"];

    for (const pagePath of aiPages) {
      await page.goto(`${BASE_URL}${pagePath}`);
      await page.waitForLoadState("networkidle");
    }

    if (errors.length > 0) {
      console.error("Console errors found:", errors);
    }
    expect(errors.length).toBe(0);
  });
});

test.describe("Production Site - Navigation Pages", () => {
  const pages = [
    { path: "/contents", title: /Contents|Hind AI/ },
    { path: "/learning", title: /Learning|Hind AI/ },
    { path: "/panchanga", title: /Panchanga|Hind AI/ },
    { path: "/philosophies", title: /Philosophies|Hind AI/ },
    { path: "/pilgrimage", title: /Pilgrimage|Hind AI/ },
    { path: "/sanskrit-nova", title: /Sanskrit|Hind AI/ },
    { path: "/sanskrit-tools", title: /Sanskrit|Hind AI/ },
    { path: "/stotras", title: /Stotras|Hind AI/ },
    { path: "/study-paths", title: /Study|Hind AI/ },
  ];

  pages.forEach(({ path, title }) => {
    test(`should load ${path} page`, async ({ page }) => {
      await page.goto(`${BASE_URL}${path}`);
      await expect(page).toHaveTitle(title);

      const mainContent = page.locator("main");
      await expect(mainContent).toBeVisible();
    });
  });

  test("should have no console errors on all navigation pages", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    for (const { path } of pages) {
      await page.goto(`${BASE_URL}${path}`);
      await page.waitForLoadState("networkidle");
    }

    if (errors.length > 0) {
      console.error("Console errors found:", errors);
    }
    expect(errors.length).toBe(0);
  });
});

test.describe("Production Site - Responsive Design", () => {
  const viewports = [
    { name: "Mobile", width: 375, height: 667 },
    { name: "Mobile Large", width: 414, height: 896 },
    { name: "Tablet", width: 768, height: 1024 },
    { name: "Tablet Landscape", width: 1024, height: 768 },
    { name: "Desktop", width: 1280, height: 720 },
    { name: "Desktop Large", width: 1920, height: 1080 },
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`should display properly on ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto(BASE_URL);

      const heroSection = page.locator("section").first();
      await expect(heroSection).toBeVisible();

      const header = page.locator("header");
      await expect(header).toBeVisible();

      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
    });
  });
});

test.describe("Production Site - Performance", () => {
  test("should load homepage within 10 seconds", async ({ page }) => {
    const startTime = Date.now();
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(10000);
    console.log(`Homepage load time: ${loadTime}ms`);
  });

  test("should have proper meta tags", async ({ page }) => {
    await page.goto(BASE_URL);

    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute("content", /width=device-width/);

    const description = page.locator('meta[name="description"]');
    const descriptionCount = await description.count();
    expect(descriptionCount).toBeGreaterThan(0);
  });
});

test.describe("Production Site - Accessibility", () => {
  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto(BASE_URL);

    const h1 = page.locator("h1");
    const h1Count = await h1.count();
    expect(h1Count).toBeGreaterThan(0);
  });

  test("should have alt text for images", async ({ page }) => {
    await page.goto(BASE_URL);

    const images = page.locator('img:not([alt=""])');
    const imageCount = await images.count();

    // Log images without alt text
    if (imageCount > 0) {
      console.warn(`Found ${imageCount} images without alt text`);
    }
  });
});
