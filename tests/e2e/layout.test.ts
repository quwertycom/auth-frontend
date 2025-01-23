import { test, expect } from '@playwright/test';

test.describe('Layout and Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app to be fully loaded
    await page.waitForSelector('h1:has-text("Hello World")');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should be centered on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForLoadState('networkidle');

    // Check if main container is centered
    const container = await page.locator('div.min-h-screen').first();
    await expect(container).toBeVisible();
    
    // Verify container has required classes
    const classes = await container.getAttribute('class');
    expect(classes).toContain('flex');
    expect(classes).toContain('items-center');
    expect(classes).toContain('justify-center');
  });

  test('should maintain layout on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');

    // Check heading visibility and style
    const heading = await page.getByRole('heading', { level: 1 }).first();
    await expect(heading).toBeVisible();
    const headingClasses = await heading.getAttribute('class');
    expect(headingClasses).toContain('text-4xl');

    // Check buttons visibility and container
    const buttonContainer = await page.locator('div.flex.gap-4').first();
    await expect(buttonContainer).toBeVisible();
    
    const setButton = await page.getByRole('button', { name: 'Set Username', exact: true });
    const resetButton = await page.getByRole('button', { name: 'Reset Username', exact: true });
    
    await expect(setButton).toBeVisible();
    await expect(resetButton).toBeVisible();
  });

  test('should have correct spacing between elements', async ({ page }) => {
    const container = await page.locator('div.min-h-screen').first();
    await expect(container).toBeVisible();
    
    // Verify gap classes
    const containerClasses = await container.getAttribute('class');
    expect(containerClasses).toContain('gap-16');
    
    const buttonContainer = await page.locator('div.flex.gap-4').first();
    await expect(buttonContainer).toBeVisible();
    const buttonContainerClasses = await buttonContainer.getAttribute('class');
    expect(buttonContainerClasses).toContain('gap-4');
  });

  test('should have correct text sizes', async ({ page }) => {
    // Check heading size
    const heading = await page.getByRole('heading', { level: 1 }).first();
    await expect(heading).toBeVisible();
    const headingClasses = await heading.getAttribute('class');
    expect(headingClasses).toContain('text-4xl');

    // Check username text size - first set a username so it's visible
    const setButton = await page.getByRole('button', { name: 'Set Username', exact: true });
    await setButton.click();
    
    const username = await page.getByRole('status').first();
    await expect(username).toBeVisible();
    const usernameClasses = await username.getAttribute('class');
    expect(usernameClasses).toContain('text-2xl');
  });
}); 