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
    
    // Wait for the main heading to be visible
    await page.waitForSelector('h1:has-text("Hello World")', { timeout: 5000 });
    
    // Also wait for interactive elements
    await page.waitForSelector('button:has-text("Set Username")', { timeout: 5000 });
    
    const loadTime = Date.now() - startTime;
    console.log(`Page load time: ${loadTime}ms`);
    
    // Performance assertions
    expect(loadTime).toBeLessThan(3000); // Page should load under 3 seconds
    
    // Measure First Contentful Paint using Performance API
    const fcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        // Use PerformanceObserver to get FCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries[0]?.startTime;
          resolve(fcp);
        }).observe({ entryTypes: ['paint'] });

        // Fallback if FCP is not available
        setTimeout(() => resolve(performance.now()), 100);
      });
    });
    
    console.log(`First Contentful Paint: ${fcp}ms`);
    expect(fcp).toBeLessThan(1500); // FCP should occur under 1.5 seconds
    
    // Check for layout shifts
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsScore = 0;
        
        new PerformanceObserver((list) => {
          const entries = list.getEntries() as LayoutShift[];
          entries.forEach(entry => {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
            }
          });
        }).observe({ entryTypes: ['layout-shift'] });
        
        // Wait a bit to capture any layout shifts
        setTimeout(() => resolve(clsScore), 1000);
      });
    });
    
    console.log(`Cumulative Layout Shift: ${cls}`);
    expect(cls).toBeLessThan(0.1); // CLS should be minimal
  });
}); 