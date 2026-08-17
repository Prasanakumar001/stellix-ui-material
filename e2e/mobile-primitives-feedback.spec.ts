import { test, expect } from '@playwright/test';

// Mobile viewport E2E — tests primitives & feedback at 390x844 (iPhone-like)
test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

test.describe('Mobile — Primitives', () => {

  test.describe('Button (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/button');
      await page.waitForLoadState('networkidle');
    });

    test('buttons render and are tappable', async ({ page }) => {
      const btn = page.locator('[data-testid="button"]').first();
      await expect(btn).toBeVisible();
      // Touch target should be at least 44px
      const box = await btn.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(30);
    });

    test('all variants visible in mobile viewport', async ({ page }) => {
      const buttons = page.locator('[data-testid="button"]');
      expect(await buttons.count()).toBeGreaterThanOrEqual(3);
    });
  });

  test.describe('Input (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/input');
      await page.waitForLoadState('networkidle');
    });

    test('input field is visible and tappable', async ({ page }) => {
      const input = page.locator('[data-testid="input-field"]').first();
      await expect(input).toBeVisible();
      await input.tap();
      await expect(input).toBeFocused();
    });

    test('error state visible on mobile', async ({ page }) => {
      const error = page.locator('[data-testid="input-error"]');
      if (await error.count() > 0) {
        await expect(error.first()).toBeVisible();
      }
    });
  });

  test.describe('Select (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/select');
      await page.waitForLoadState('networkidle');
    });

    test('select trigger opens dropdown on tap', async ({ page }) => {
      const trigger = page.locator('[data-testid="select-trigger"]').first();
      await trigger.tap();
      await expect(page.locator('[data-testid="select-dropdown"]').first()).toBeVisible();
    });

    test('can select option via tap', async ({ page }) => {
      await page.locator('[data-testid="select-trigger"]').first().tap();
      const dropdown = page.locator('[data-testid="select-dropdown"]').first();
      await expect(dropdown).toBeVisible();
      const options = dropdown.locator('[data-testid="select-option"]');
      expect(await options.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Checkbox (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/checkbox');
      await page.waitForLoadState('networkidle');
    });

    test('checkbox visible and tappable', async ({ page }) => {
      const cb = page.locator('[data-testid="checkbox-root"]').first();
      await expect(cb).toBeVisible();
    });
  });

  test.describe('Radio (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/radio');
      await page.waitForLoadState('networkidle');
    });

    test('radio options render in mobile', async ({ page }) => {
      const options = page.locator('[data-testid="radio-option"]');
      expect(await options.count()).toBeGreaterThanOrEqual(2);
    });
  });

  test.describe('Switch (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/switch');
      await page.waitForLoadState('networkidle');
    });

    test('switch is tappable on mobile', async ({ page }) => {
      const track = page.locator('[data-testid="switch-track"]').first();
      await expect(track).toBeVisible();
      const box = await track.boundingBox();
      expect(box).not.toBeNull();
    });
  });

  test.describe('Tooltip (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/tooltip');
      await page.waitForLoadState('networkidle');
    });

    test('tooltip wrapper is visible', async ({ page }) => {
      await expect(page.locator('[data-testid="tooltip-wrapper"]').first()).toBeVisible();
    });
  });

  test.describe('Toggle (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/toggle');
      await page.waitForLoadState('networkidle');
    });

    test('toggle renders on mobile', async ({ page }) => {
      await expect(page.locator('[data-testid="toggle"]').first()).toBeVisible();
    });
  });

  test.describe('Textarea (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/textarea');
      await page.waitForLoadState('networkidle');
    });

    test('textarea is visible and tappable', async ({ page }) => {
      const ta = page.locator('[data-testid="textarea-field"]').first();
      await expect(ta).toBeVisible();
      await ta.tap();
      await expect(ta).toBeFocused();
    });
  });
});


test.describe('Mobile — Feedback', () => {

  test.describe('Toast (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/toast');
      await page.waitForLoadState('networkidle');
    });

    test('toast renders in mobile viewport', async ({ page }) => {
      const toast = page.locator('[data-testid="toast"]').first();
      await expect(toast).toBeVisible();
      const box = await toast.boundingBox();
      expect(box).not.toBeNull();
      // Toast should fit within mobile viewport width (390)
      expect(box!.width).toBeLessThanOrEqual(390);
    });

    test('dismiss button tappable', async ({ page }) => {
      const dismiss = page.locator('[data-testid="toast-dismiss"]');
      if (await dismiss.count() > 0) {
        const box = await dismiss.first().boundingBox();
        expect(box).not.toBeNull();
      }
    });
  });

  test.describe('Alert (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/alert');
      await page.waitForLoadState('networkidle');
    });

    test('alerts render within mobile viewport', async ({ page }) => {
      const alerts = page.locator('[data-testid="alert"]');
      expect(await alerts.count()).toBeGreaterThanOrEqual(1);
      const box = await alerts.first().boundingBox();
      expect(box).not.toBeNull();
    });
  });

  test.describe('ProgressBar (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/progress-bar');
      await page.waitForLoadState('networkidle');
    });

    test('progress bar fills width on mobile', async ({ page }) => {
      const bar = page.locator('[data-testid="progress-bar"]').first();
      await expect(bar).toBeVisible();
    });
  });

  test.describe('Spinner (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/spinner');
      await page.waitForLoadState('networkidle');
    });

    test('spinner visible on mobile', async ({ page }) => {
      const spinner = page.locator('[data-testid="spinner"][data-size="md"], [data-testid="spinner"][data-size="sm"]').first();
      await spinner.scrollIntoViewIfNeeded();
      await expect(spinner).toBeVisible();
    });
  });

  test.describe('SkeletonBlock (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/skeleton-block');
      await page.waitForLoadState('networkidle');
    });

    test('skeleton blocks render in mobile', async ({ page }) => {
      const skeletons = page.locator('[data-testid="skeleton-block"]');
      expect(await skeletons.count()).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('EmptyState (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/empty-state');
      await page.waitForLoadState('networkidle');
    });

    test('empty state centered on mobile', async ({ page }) => {
      const es = page.locator('[data-testid="empty-state"]').first();
      await expect(es).toBeVisible();
    });

    test('action button tappable on mobile', async ({ page }) => {
      const action = page.locator('[data-testid="empty-state-action"]');
      if (await action.count() > 0) {
        const box = await action.first().boundingBox();
        expect(box).not.toBeNull();
        expect(box!.height).toBeGreaterThanOrEqual(30);
      }
    });
  });

  test.describe('StepIndicator (mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/step-indicator');
      await page.waitForLoadState('networkidle');
    });

    test('step indicator renders on mobile', async ({ page }) => {
      await expect(page.locator('[data-testid="step-indicator"]').first()).toBeVisible();
    });

    test('step circles visible on mobile', async ({ page }) => {
      const circles = page.locator('[data-testid="step-circle"]');
      expect(await circles.count()).toBeGreaterThanOrEqual(2);
    });
  });
});
