import { test, expect } from '@playwright/test';

test.describe('Basic Navigation', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Hind AI/);
    await expect(page.locator('h1')).toContainText('Hind AI');
  });

  test('navigation menu works', async ({ page }) => {
    await page.goto('/');
    
    // Test main navigation links
    await page.click('text=Contents');
    await expect(page).toHaveURL(/.*contents/);
    
    await page.click('text=AI Guide');
    await expect(page).toHaveURL(/.*ai-guide/);
    
    await page.click('text=Sanskrit Nova');
    await expect(page).toHaveURL(/.*sanskrit-nova/);
  });

  test('scripture pages load', async ({ page }) => {
    await page.goto('/');
    
    // Test scripture navigation
    await page.click('text=Bhagavad Gita');
    await expect(page).toHaveURL(/.*bhagavad-gita/);
    await expect(page.locator('h1')).toContainText('Bhagavad Gita');
    
    await page.click('text=Rigveda');
    await expect(page).toHaveURL(/.*rigveda/);
    await expect(page.locator('h1')).toContainText('Rigveda');
  });

  test('search functionality', async ({ page }) => {
    await page.goto('/search');
    
    // Check search input exists
    const searchInput = page.locator('input[placeholder*="search"]');
    await expect(searchInput).toBeVisible();
    
    // Test search
    await searchInput.fill('dharma');
    await page.keyboard.press('Enter');
    
    // Should navigate or show results
    await page.waitForTimeout(1000);
  });

  test('responsive design', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.mobile-menu')).toBeHidden();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('nav')).toBeVisible();
  });
});
