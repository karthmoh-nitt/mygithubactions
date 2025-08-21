import { test, expect } from '@playwright/test';
import { config, getTenantUrl } from '../config/environment';

test.describe('Project 3 - Example Tests', () => {
  test('has title', async ({ page }) => {
    // Use configuration for the base URL
    await page.goto(config.baseUrl);

    // Expect a title "to contain" a substring.
    // await expect(page).toHaveTitle(/Playwright/);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `homepage-${config.environment}-${config.tenantId}.png` });
  });

  test('get started link', async ({ page }) => {
    // Use configuration for the base URL
    await page.goto(config.baseUrl);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `get-started-${config.environment}-${config.tenantId}.png` });

    // // Click the get started link.
    // await page.getByRole('link', { name: 'Get started' }).click();

    // // Expects page to have a heading with the name of Installation.
    // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('tenant specific functionality', async ({ page }) => {
    // Use helper function for tenant-specific URL
    const tenantUrl = getTenantUrl('/');
    
    await page.goto(tenantUrl);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `tenant-dashboard-${config.environment}-${config.tenantId}.png` });
    // Add your tenant-specific assertions here
    //await expect(page).toHaveTitle(/Playwright/);
  });
});

