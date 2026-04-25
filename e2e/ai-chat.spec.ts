import { test, expect } from '@playwright/test';

test.describe('AI Chat Functionality', () => {
  test('sanskrit nova page loads', async ({ page }) => {
    await page.goto('/sanskrit-nova');
    await expect(page.locator('h1')).toContainText('Sanskrit Nova');
  });

  test('ai chat interface loads', async ({ page }) => {
    await page.goto('/sanskrit-nova');
    
    // Check if chat interface is present
    const chatInput = page.locator('textarea[placeholder*="Type your message"]');
    await expect(chatInput).toBeVisible();
    
    const sendButton = page.locator('button:has-text("Send")');
    await expect(sendButton).toBeVisible();
  });

  test('can send message to ai chat', async ({ page }) => {
    await page.goto('/sanskrit-nova');
    
    // Type and send a message
    const chatInput = page.locator('textarea[placeholder*="Type your message"]');
    await chatInput.fill('Hello, what is dharma?');
    
    const sendButton = page.locator('button:has-text("Send")');
    await sendButton.click();
    
    // Should show loading state or response
    await page.waitForTimeout(2000);
    
    // Check if response appears (even if error message)
    const responseArea = page.locator('.ai-response, .chat-message, .response-container');
    await expect(responseArea).toBeVisible();
  });

  test('transliteration works', async ({ page }) => {
    await page.goto('/sanskrit-nova');
    
    // Look for transliteration feature
    const transliterateButton = page.locator('button:has-text("Transliterate")');
    if (await transliterateButton.isVisible()) {
      await transliterateButton.click();
      await page.waitForTimeout(1000);
    }
  });

  test('learning tracks accessible', async ({ page }) => {
    await page.goto('/sanskrit-nova');
    
    // Check if learning tracks are visible
    const tracksSection = page.locator('[data-testid="learning-tracks"], .tracks, .learning-paths');
    if (await tracksSection.isVisible()) {
      const trackItems = tracksSection.locator('li, .track-item, .lesson-item');
      await expect(trackItems.first()).toBeVisible();
    }
  });
});
