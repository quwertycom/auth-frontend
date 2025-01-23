import { test, expect } from '@playwright/test';

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

test.describe('Performance Tests', () => {
  test('Home page load performance', async ({ page }) => {
    const startTime = Date.now();
    
    // Navigate to home page
    await page.goto('/');
    
    // Wait for the main heading to be visible (more reliable than data-testid)
    await page.waitForSelector('h1:has-text("Hello World")', { timeout: 5000 });
    
    // Also wait for interactive elements to ensure page is fully loaded
    await page.waitForSelector('button:has-text("Set Username")', { timeout: 5000 });
    
    const loadTime = Date.now() - startTime;
    console.log(`Page load time: ${loadTime}ms`);
    
    // Performance assertions
    expect(loadTime).toBeLessThan(3000); // Page should load under 3 seconds
    
    // Measure First Paint using Performance API
    const firstPaint = await page.evaluate(() => {
      const paint = performance.getEntriesByType('paint');
      return paint.find(entry => entry.name === 'first-paint')?.startTime;
    });
    
    console.log(`First Paint: ${firstPaint}ms`);
    expect(firstPaint).toBeLessThan(1000); // First paint should occur under 1 second
    
    // Check for layout shifts
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries() as LayoutShift[];
          let clsScore = 0;
          entries.forEach(entry => {
            if (entry.hadRecentInput) return;
            clsScore += entry.value;
          });
          resolve(clsScore);
        }).observe({ entryTypes: ['layout-shift'] });
        
        // Wait a bit to capture any layout shifts
        setTimeout(() => resolve(0), 1000);
      });
    });
    
    console.log(`Cumulative Layout Shift: ${cls}`);
    expect(cls).toBeLessThan(0.1); // CLS should be minimal
  });
}); 