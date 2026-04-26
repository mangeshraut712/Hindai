import { test, expect } from '@playwright/test';

test.describe('AI Guide Page Layout Tests', () => {
  test('should load AI guide page successfully', async ({ page }) => {
    await page.goto('/ai-guide');
    await expect(page).toHaveTitle(/AI Guide|Guru|Hind AI/);
  });

  test('should have proper layout for chat interface', async ({ page }) => {
    await page.goto('/ai-guide');
    
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/ai-guide');
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/ai-guide');
    await page.waitForLoadState('networkidle');
    
    if (errors.length > 0) {
      console.error('Console errors found:', errors);
    }
    expect(errors.length).toBe(0);
  });
});
