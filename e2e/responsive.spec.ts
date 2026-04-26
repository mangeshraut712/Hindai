import { test, expect } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Mobile Large', width: 414, height: 896 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Desktop', width: 1280, height: 720 },
    { name: 'Desktop Large', width: 1920, height: 1080 },
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`should display properly on ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      
      // Check that main sections are visible
      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();
      
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });
  });

  test('should have proper mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // On mobile, navigation might be in a hamburger menu
    const navLinks = header.locator('a[href]');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('should have proper tablet layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Check that study modes grid is visible
    const studyModesSection = page.locator('section').filter({ hasText: 'Modern restraint' });
    await expect(studyModesSection).toBeVisible();
    
    const gridContainer = studyModesSection.locator('.grid');
    await expect(gridContainer).toBeVisible();
  });

  test('should have proper desktop layout', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Check that all sections are properly spaced
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThan(3);
  });
});
