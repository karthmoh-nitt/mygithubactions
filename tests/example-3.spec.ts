import { test, expect } from '@playwright/test';
import { config, getTenantUrl } from '../config/environment';

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

// Example of tenant-specific test
test('tenant specific functionality', async ({ page }) => {
  console.log('🚀 Starting tenant specific functionality test');
  
  // Use helper function for tenant-specific URL
  const tenantUrl = getTenantUrl('/');
  console.log(`Testing tenant: ${config.tenantId} on environment: ${config.environment}`);
  console.log(`Target URL: ${tenantUrl}`);
  
  try {
    await page.goto(tenantUrl);
    console.log('✅ Successfully navigated to tenant URL');
    
    await page.waitForLoadState('networkidle');
    console.log('✅ Page loaded successfully');
    
    await page.screenshot({ path: `tenant-dashboard-${config.environment}-${config.tenantId}.png` });
    console.log('✅ Screenshot taken successfully');
    
    // Add your tenant-specific assertions here
    //await expect(page).toHaveTitle(/Playwright/);
    console.log('✅ Tenant test completed successfully');
  } catch (error) {
    console.error('❌ Error in tenant test:', error);
    throw error;
  }
});

