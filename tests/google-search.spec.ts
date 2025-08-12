import { test, expect } from '@playwright/test';

test.describe.skip('Google Search Tests', () => {
  test('should be able to search for Playwright', async ({ page }) => {
    // Navigate to Google
    await page.goto('https://www.google.com');
    
    // Accept cookies if the dialog appears
    try {
      await page.getByRole('button', { name: /Accept all|I agree|Accept/i }).click({ timeout: 3000 });
    } catch (error) {
      // Cookie dialog might not appear, continue with the test
    }
    
    // Find the search input and type "Playwright"
    const searchInput = page.locator('input[name="q"]');
    await searchInput.fill('Playwright testing framework');
    
    // Press Enter to search
    await searchInput.press('Enter');
    
    // Wait for search results and verify
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h3')).toContainText(/Playwright/i);
  });

  test('should navigate to Playwright documentation', async ({ page }) => {
    await page.goto('https://www.google.com');
    
    // Accept cookies if needed
    try {
      await page.getByRole('button', { name: /Accept all|I agree|Accept/i }).click({ timeout: 3000 });
    } catch (error) {
      // Continue if no cookie dialog
    }
    
    // Search for Playwright
    await page.fill('input[name="q"]', 'Playwright documentation');
    await page.press('input[name="q"]', 'Enter');
    
    // Wait for results and click on the first Playwright link
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: /Playwright/i }).first().click();
    
    // Verify we're on the Playwright website
    await expect(page).toHaveURL(/playwright\.dev/);
  });
});
