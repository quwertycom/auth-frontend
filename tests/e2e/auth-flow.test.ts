import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app to be fully loaded
    await page.waitForSelector('h1:has-text("Hello World")');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display initial empty username', async ({ page }) => {
    // Wait for the button container to be visible first
    const buttonContainer = await page.locator('div.flex.gap-4').first();
    await expect(buttonContainer).toBeVisible();
    
    // Now check the status element
    const usernameElement = await page.getByRole('status').first();
    // Don't check visibility since it's empty initially
    const text = await usernameElement.textContent();
    expect(text?.trim()).toBeFalsy();
  });

  test('should set and reset username correctly', async ({ page }) => {
    const usernameElement = await page.getByRole('status').first();
    const setButton = await page.getByRole('button', { name: 'Set Username', exact: true });
    const resetButton = await page.getByRole('button', { name: 'Reset Username', exact: true });
    
    // Initial state - don't check visibility
    const initialText = await usernameElement.textContent();
    expect(initialText?.trim()).toBeFalsy();

    // Set username
    await setButton.click();
    await expect(usernameElement).toBeVisible();
    await expect(usernameElement).toHaveText('JohnDoe', { timeout: 5000 });

    // Reset username
    await resetButton.click();
    const finalText = await usernameElement.textContent();
    expect(finalText?.trim()).toBeFalsy();
  });

  test('should persist username between page reloads', async ({ page }) => {
    const setButton = await page.getByRole('button', { name: 'Set Username', exact: true });
    await setButton.click();

    // Wait for state to be updated and verify initial set
    const usernameElement = await page.getByRole('status').first();
    await expect(usernameElement).toHaveText('JohnDoe', { timeout: 5000 });

    // Reload and wait for app to be ready
    await page.reload();
    await page.waitForSelector('h1:has-text("Hello World")');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');

    // Wait for button container to be visible first
    const buttonContainer = await page.locator('div.flex.gap-4').first();
    await expect(buttonContainer).toBeVisible();

    // Now verify username persists - check text directly without visibility
    await expect(usernameElement).toHaveText('JohnDoe', { timeout: 5000 });
  });

  test('should handle rapid username changes', async ({ page }) => {
    const usernameElement = await page.getByRole('status').first();
    const setButton = await page.getByRole('button', { name: 'Set Username', exact: true });
    const resetButton = await page.getByRole('button', { name: 'Reset Username', exact: true });

    // Rapid changes with proper waits
    await setButton.click();
    await expect(usernameElement).toBeVisible();
    await expect(usernameElement).toHaveText('JohnDoe', { timeout: 5000 });
    
    await resetButton.click();
    const emptyText = await usernameElement.textContent();
    expect(emptyText?.trim()).toBeFalsy();
    
    await setButton.click();
    await expect(usernameElement).toBeVisible();
    await expect(usernameElement).toHaveText('JohnDoe', { timeout: 5000 });
  });
}); 