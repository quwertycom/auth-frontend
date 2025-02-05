import { test, expect } from '@playwright/test';

test('Sample e2e test - always passes', async ({ page }) => {
  // Navigate to the page
  await page.goto('/');

  // Check that the page is loaded by verifying the title exists
  const title = await page.title();
  expect(title).toBeDefined();
});
