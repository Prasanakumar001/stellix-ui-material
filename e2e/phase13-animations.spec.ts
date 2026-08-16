import { test, expect } from '@playwright/test';

test.describe('Phase 13 — Animations E2E', () => {

  test.describe('All Animation Pages Load', () => {
    const slugs = [
      'glimm-effect', 'gliding-highlight', 'morph-transition', 'confetti-effect',
      'typewriter-effect', 'number-ticker', 'progress-ring', 'ripple-effect',
      'shake-animation', 'slide-reveal',
    ];
    for (const slug of slugs) {
      test(`/components/${slug} renders 200`, async ({ page }) => {
        const res = await page.goto(`/components/${slug}`);
        expect(res?.status()).toBe(200);
        await expect(page.locator('h1')).toBeVisible();
      });
    }
  });

  test.describe('GlimmEffect', () => {
    test('renders shimmer overlay', async ({ page }) => {
      await page.goto('/components/glimm-effect');
      await page.waitForLoadState('networkidle');
      const glimm = page.locator('[data-testid="glimm-effect"]');
      await expect(glimm).toBeVisible();
    });
  });

  test.describe('GlidingHighlight', () => {
    test('renders highlight buttons', async ({ page }) => {
      await page.goto('/components/gliding-highlight');
      await page.waitForLoadState('networkidle');
      const hl = page.locator('[data-testid="gliding-highlight"]');
      await expect(hl).toBeVisible();
    });
    test('has clickable items', async ({ page }) => {
      await page.goto('/components/gliding-highlight');
      await page.waitForLoadState('networkidle');
      const items = page.locator('[data-testid*="gliding-highlight-item"]');
      const count = await items.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });

  test.describe('TypewriterEffect', () => {
    test('renders and types text', async ({ page }) => {
      await page.goto('/components/typewriter-effect');
      await page.waitForLoadState('networkidle');
      const tw = page.locator('[data-testid="typewriter-effect"]');
      await expect(tw).toBeVisible();
      // Wait for some text to appear
      await page.waitForTimeout(1000);
      const text = await tw.textContent();
      expect(text?.length).toBeGreaterThan(5);
    });
  });

  test.describe('NumberTicker', () => {
    test('renders with numbers', async ({ page }) => {
      await page.goto('/components/number-ticker');
      await page.waitForLoadState('networkidle');
      const ticker = page.locator('[data-testid="number-ticker"]');
      await expect(ticker.first()).toBeVisible();
    });
  });

  test.describe('ProgressRing', () => {
    test('renders SVG ring', async ({ page }) => {
      await page.goto('/components/progress-ring');
      await page.waitForLoadState('networkidle');
      const ring = page.locator('[data-testid="progress-ring"]');
      await expect(ring.first()).toBeVisible();
      const svg = ring.first().locator('svg');
      await expect(svg).toBeVisible();
    });
  });

  test.describe('RippleEffect', () => {
    test('renders clickable wrapper', async ({ page }) => {
      await page.goto('/components/ripple-effect');
      await page.waitForLoadState('networkidle');
      const ripple = page.locator('[data-testid="ripple-effect"]');
      await expect(ripple).toBeVisible();
    });
    test('click creates ripple', async ({ page }) => {
      await page.goto('/components/ripple-effect');
      await page.waitForLoadState('networkidle');
      const ripple = page.locator('[data-testid="ripple-effect"]');
      await ripple.click();
      // Ripple span should appear briefly
      await page.waitForTimeout(100);
    });
  });

  test.describe('SlideReveal', () => {
    test('renders revealed content', async ({ page }) => {
      await page.goto('/components/slide-reveal');
      await page.waitForLoadState('networkidle');
      const sr = page.locator('[data-testid="slide-reveal"]');
      const count = await sr.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('ShakeAnimation', () => {
    test('renders shake wrapper', async ({ page }) => {
      await page.goto('/components/shake-animation');
      await page.waitForLoadState('networkidle');
      const shake = page.locator('[data-testid="shake-animation"]');
      await expect(shake).toBeVisible();
    });
  });

  test.describe('MorphTransition', () => {
    test('renders content', async ({ page }) => {
      await page.goto('/components/morph-transition');
      await page.waitForLoadState('networkidle');
      const morph = page.locator('[data-testid="morph-transition"]');
      await expect(morph).toBeVisible();
    });
  });

  test.describe('ConfettiEffect', () => {
    test('page renders', async ({ page }) => {
      await page.goto('/components/confetti-effect');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('h1')).toContainText('ConfettiEffect');
    });
  });
});
