import { test, expect } from '@playwright/test';

test.describe('Phase 14 — Theme System E2E', () => {

  test.describe('ThemeSwitcher Page', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/theme-switcher'); await page.waitForLoadState('networkidle'); });

    test('page loads', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('ThemeSwitcher');
    });

    test('renders theme switcher', async ({ page }) => {
      const switcher = page.locator('[data-testid="theme-switcher"]');
      await expect(switcher).toBeVisible();
    });

    test('renders preset buttons', async ({ page }) => {
      const btns = page.locator('[data-testid="theme-preset-btn"]');
      const count = await btns.count();
      expect(count).toBe(8);
    });

    test('shows all 8 theme names', async ({ page }) => {
      const switcher = page.locator('[data-testid="theme-switcher"]');
      await expect(switcher).toContainText('Light');
      await expect(switcher).toContainText('Dark');
      await expect(switcher).toContainText('Midnight');
      await expect(switcher).toContainText('Sunset');
      await expect(switcher).toContainText('Forest');
      await expect(switcher).toContainText('Ocean');
      await expect(switcher).toContainText('Monochrome');
      await expect(switcher).toContainText('High Contrast');
    });

    test('clicking preset activates it', async ({ page }) => {
      const midnight = page.locator('[data-theme-key="midnight"]');
      await midnight.scrollIntoViewIfNeeded();
      await midnight.click();
      await expect(midnight).toHaveClass(/border-accent/);
    });

    test('each preset has accent color dot', async ({ page }) => {
      const dots = page.locator('[data-testid="theme-preset-btn"] .rounded-full');
      const count = await dots.count();
      expect(count).toBeGreaterThanOrEqual(8);
    });
  });

  test.describe('ThemeBuilder Page', () => {
    test.beforeEach(async ({ page }) => { await page.goto('/components/theme-builder'); await page.waitForLoadState('networkidle'); });

    test('page loads', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('ThemeBuilder');
    });

    test('renders theme builder', async ({ page }) => {
      const builder = page.locator('[data-testid="theme-builder"]');
      await expect(builder).toBeVisible();
    });

    test('renders color pickers', async ({ page }) => {
      const pickers = page.locator('[data-testid="theme-color-input"]');
      const count = await pickers.count();
      expect(count).toBeGreaterThanOrEqual(10);
    });

    test('renders token labels', async ({ page }) => {
      const tokens = page.locator('[data-testid="theme-token"]');
      const count = await tokens.count();
      expect(count).toBeGreaterThanOrEqual(10);
    });

    test('has reset button', async ({ page }) => {
      const reset = page.locator('[data-testid="theme-reset"]');
      await expect(reset).toBeVisible();
    });

    test('shows Accent label', async ({ page }) => {
      const builder = page.locator('[data-testid="theme-builder"]');
      await expect(builder).toContainText('Accent');
    });
  });
});
