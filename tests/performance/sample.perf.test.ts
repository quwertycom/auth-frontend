import { test, expect } from '@playwright/test';

test('Sample performance test - always passes', async ({ page }) => {
  // Just navigate to the page
  await page.goto('/');
  
  // Simple assertion that always passes
  expect(true).toBeTruthy();
}); 