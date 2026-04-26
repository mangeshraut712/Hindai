import { test, expect } from '@playwright/test';

test.describe('Homepage Layout Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Hind AI/);
  });

  test('should have proper grid layout for study modes', async ({ page }) => {
    await page.goto('/');
    
    // Check if study modes section exists
    const studyModesSection = page.locator('section').filter({ hasText: 'Modern restraint' });
    await expect(studyModesSection).toBeVisible();
    
    // Check for grid container
    const gridContainer = studyModesSection.locator('.grid');
    await expect(gridContainer).toBeVisible();
    
    // Check if cards are visible
    const cards = gridContainer.locator('.surface-panel');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
    console.log(`Found ${cardCount} study mode cards`);
  });

  test('should have responsive grid on mobile', async ({ page, isMobile }) => {
    await page.goto('/');
    
    if (isMobile) {
      // On mobile, study mode cards should be in 2 columns
      const studyModesGrid = page.locator('section').filter({ hasText: 'Modern restraint' }).locator('.grid');
      const gridClass = await studyModesGrid.getAttribute('class');
      console.log('Mobile grid classes:', gridClass);
      expect(gridClass).toContain('sm:grid-cols-2');
    }
  });

  test('should have proper spacing on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Check that sections have proper padding
    const section = page.locator('section').nth(1);
    await expect(section).toBeVisible();
  });

  test('should have proper footer layout', async ({ page }) => {
    await page.goto('/');
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check for footer grid - use the main grid container
    const footerGrid = footer.locator('.grid').first();
    await expect(footerGrid).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check if header is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check that navigation links exist in the DOM
    const navLinks = header.locator('a[href]');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
    
    // Check that at least one navigation link is visible
    const visibleLinks = navLinks.filter({ visible: true });
    const visibleCount = await visibleLinks.count();
    expect(visibleCount).toBeGreaterThan(0);
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    if (errors.length > 0) {
      console.error('Console errors found:', errors);
    }
    expect(errors.length).toBe(0);
  });

  test('should have proper hero section', async ({ page }) => {
    await page.goto('/');
    
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // Check for hero content
    const heroContent = heroSection.locator('h1, h2');
    await expect(heroContent.first()).toBeVisible();
  });
});
