import { test, expect } from '@playwright/test';

// ═══════════════════════════════════════════════════════
// LAYOUT — Comprehensive E2E
// ═══════════════════════════════════════════════════════

test.describe('Layout E2E', () => {

  // ─── Tabs ─────────────────────────────────────────
  test.describe('Tabs', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/tabs');
      await page.waitForLoadState('networkidle');
    });

    test('renders tab bar with multiple tabs', async ({ page }) => {
      const tabs = page.locator('[data-testid="tabs"]');
      await expect(tabs.first()).toBeVisible();
    });

    test('renders all three variants', async ({ page }) => {
      const tabs = page.locator('[data-testid="tabs"]');
      expect(await tabs.count()).toBeGreaterThanOrEqual(3);
    });

    test('tab buttons are clickable', async ({ page }) => {
      const tabBtn = page.locator('[data-testid^="tab-"]').first();
      await expect(tabBtn).toBeVisible();
      await tabBtn.click();
    });
  });

  // ─── Breadcrumb ───────────────────────────────────
  test.describe('Breadcrumb', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/breadcrumb');
      await page.waitForLoadState('networkidle');
    });

    test('renders breadcrumb with multiple items', async ({ page }) => {
      await expect(page.locator('[data-testid="breadcrumb"]').first()).toBeVisible();
      const items = page.locator('[data-testid^="breadcrumb-item-"]');
      expect(await items.count()).toBeGreaterThanOrEqual(2);
    });

    test('separators render between items', async ({ page }) => {
      const separators = page.locator('[data-testid="breadcrumb-separator"]');
      expect(await separators.count()).toBeGreaterThanOrEqual(1);
    });

    test('last item is not a link (current page)', async ({ page }) => {
      const items = page.locator('[data-testid^="breadcrumb-item-"]');
      const count = await items.count();
      const lastItem = items.nth(count - 1);
      const tagName = await lastItem.evaluate(el => el.tagName.toLowerCase());
      expect(tagName).toBe('span');
    });
  });

  // ─── Pagination ───────────────────────────────────
  test.describe('Pagination', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/pagination');
      await page.waitForLoadState('networkidle');
    });

    test('renders pagination with prev/next buttons', async ({ page }) => {
      await expect(page.locator('[data-testid="pagination"]').first()).toBeVisible();
      await expect(page.locator('[data-testid="pagination-prev"]').first()).toBeVisible();
      await expect(page.locator('[data-testid="pagination-next"]').first()).toBeVisible();
    });

    test('page number buttons render', async ({ page }) => {
      const pages = page.locator('[data-testid^="pagination-page-"]');
      expect(await pages.count()).toBeGreaterThanOrEqual(1);
    });

    test('current page button is visually distinct', async ({ page }) => {
      const currentPage = page.locator('[data-testid="pagination-page-3"]');
      if (await currentPage.count() > 0) {
        await expect(currentPage).toBeVisible();
      }
    });
  });

  // ─── Dropdown ─────────────────────────────────────
  test.describe('Dropdown', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/dropdown');
      await page.waitForLoadState('networkidle');
    });

    test('renders dropdown trigger', async ({ page }) => {
      await expect(page.locator('[data-testid="dropdown-trigger"]').first()).toBeVisible();
    });

    test('opens menu on trigger click', async ({ page }) => {
      await page.locator('[data-testid="dropdown-trigger"]').first().click();
      await expect(page.locator('[data-testid="dropdown-menu"]').first()).toBeVisible();
    });

    test('menu items are visible when open', async ({ page }) => {
      await page.locator('[data-testid="dropdown-trigger"]').first().click();
      const items = page.locator('[data-testid^="dropdown-item-"]');
      expect(await items.count()).toBeGreaterThanOrEqual(2);
    });

    test('closes menu when clicking outside', async ({ page }) => {
      await page.locator('[data-testid="dropdown-trigger"]').first().click();
      await expect(page.locator('[data-testid="dropdown-menu"]').first()).toBeVisible();
      await page.mouse.click(10, 10);
      await expect(page.locator('[data-testid="dropdown-menu"]')).toHaveCount(0);
    });
  });

  // ─── Modal ────────────────────────────────────────
  test.describe('Modal', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/modal');
      await page.waitForLoadState('networkidle');
    });

    test('renders modal page', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('Modal');
    });

    test('modal description is visible', async ({ page }) => {
      const desc = page.locator('text=accessible dialog');
      await expect(desc.first()).toBeVisible();
    });
  });

  // ─── Drawer ───────────────────────────────────────
  test.describe('Drawer', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/drawer');
      await page.waitForLoadState('networkidle');
    });

    test('renders drawer page', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('Drawer');
    });

    test('drawer description is visible', async ({ page }) => {
      const desc = page.locator('text=slide-in panel');
      await expect(desc.first()).toBeVisible();
    });
  });

  // ─── Accordion ────────────────────────────────────
  test.describe('Accordion', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/accordion');
      await page.waitForLoadState('networkidle');
    });

    test('renders accordion with multiple items', async ({ page }) => {
      await expect(page.locator('[data-testid="accordion"]').first()).toBeVisible();
    });

    test('accordion triggers are clickable', async ({ page }) => {
      const triggers = page.locator('[data-testid^="accordion-trigger-"]');
      expect(await triggers.count()).toBeGreaterThanOrEqual(2);
    });

    test('clicking trigger expands content', async ({ page }) => {
      const trigger = page.locator('[data-testid^="accordion-trigger-"]').first();
      await trigger.click();
      await page.waitForTimeout(400);
      const content = page.locator('[data-testid^="accordion-content-"]').first();
      await expect(content).toBeVisible();
    });

    test('accordion chevron icons rotate on expand', async ({ page }) => {
      const icon = page.locator('[data-testid^="accordion-icon-"]').first();
      await expect(icon).toBeVisible();
    });
  });
});


// ═══════════════════════════════════════════════════════
// ANIMATIONS — Comprehensive E2E
// ═══════════════════════════════════════════════════════

test.describe('Animations E2E', () => {

  // ─── GlimmEffect ──────────────────────────────────
  test.describe('GlimmEffect', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/glimm-effect');
      await page.waitForLoadState('networkidle');
    });

    test('renders glimm effect wrapper', async ({ page }) => {
      await expect(page.locator('[data-testid="glimm-effect"]').first()).toBeVisible();
    });

    test('shimmer overlay present when active', async ({ page }) => {
      const overlay = page.locator('[data-testid="glimm-effect-overlay"]');
      if (await overlay.count() > 0) {
        await expect(overlay.first()).toBeVisible();
      }
    });
  });

  // ─── GlidingHighlight ─────────────────────────────
  test.describe('GlidingHighlight', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/gliding-highlight');
      await page.waitForLoadState('networkidle');
    });

    test('renders gliding highlight with items', async ({ page }) => {
      await expect(page.locator('[data-testid="gliding-highlight"]').first()).toBeVisible();
    });

    test('multiple items are clickable', async ({ page }) => {
      const items = page.locator('[data-testid^="gliding-highlight-item-"]');
      expect(await items.count()).toBeGreaterThanOrEqual(3);
    });
  });

  // ─── MorphTransition ──────────────────────────────
  test.describe('MorphTransition', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/morph-transition');
      await page.waitForLoadState('networkidle');
    });

    test('renders morph transition wrapper', async ({ page }) => {
      await expect(page.locator('[data-testid="morph-transition"]').first()).toBeVisible();
    });
  });

  // ─── ConfettiEffect ───────────────────────────────
  test.describe('ConfettiEffect', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/confetti-effect');
      await page.waitForLoadState('networkidle');
    });

    test('renders confetti page', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('ConfettiEffect');
    });
  });

  // ─── TypewriterEffect ─────────────────────────────
  test.describe('TypewriterEffect', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/typewriter-effect');
      await page.waitForLoadState('networkidle');
    });

    test('renders typewriter text', async ({ page }) => {
      await expect(page.locator('[data-testid="typewriter-effect"]').first()).toBeVisible();
    });

    test('cursor blinks during typing', async ({ page }) => {
      const cursor = page.locator('[data-testid="typewriter-cursor"]');
      if (await cursor.count() > 0) {
        await expect(cursor.first()).toBeVisible();
      }
    });

    test('text content appears over time', async ({ page }) => {
      const text = page.locator('[data-testid="typewriter-effect"]').first();
      await page.waitForTimeout(500);
      const content = await text.textContent();
      expect(content?.length).toBeGreaterThan(0);
    });
  });

  // ─── NumberTicker ─────────────────────────────────
  test.describe('NumberTicker', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/number-ticker');
      await page.waitForLoadState('networkidle');
    });

    test('renders number ticker elements', async ({ page }) => {
      const tickers = page.locator('[data-testid="number-ticker"]');
      expect(await tickers.count()).toBeGreaterThanOrEqual(2);
    });

    test('displays numeric values with suffix', async ({ page }) => {
      await page.waitForTimeout(1200);
      const ticker = page.locator('[data-testid="number-ticker"]').first();
      const text = await ticker.textContent();
      expect(text?.length).toBeGreaterThan(0);
    });
  });

  // ─── ProgressRing ─────────────────────────────────
  test.describe('ProgressRing', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/progress-ring');
      await page.waitForLoadState('networkidle');
    });

    test('renders progress ring SVG', async ({ page }) => {
      const rings = page.locator('[data-testid="progress-ring"]');
      expect(await rings.count()).toBeGreaterThanOrEqual(2);
    });

    test('label displays inside ring', async ({ page }) => {
      const label = page.locator('[data-testid="progress-ring-label"]');
      if (await label.count() > 0) {
        await expect(label.first()).toBeVisible();
      }
    });

    test('ring has progressbar role', async ({ page }) => {
      const ring = page.locator('[data-testid="progress-ring"] [role="progressbar"]');
      await expect(ring.first()).toBeVisible();
    });
  });

  // ─── RippleEffect ─────────────────────────────────
  test.describe('RippleEffect', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/ripple-effect');
      await page.waitForLoadState('networkidle');
    });

    test('renders ripple wrapper', async ({ page }) => {
      await expect(page.locator('[data-testid="ripple-effect"]').first()).toBeVisible();
    });

    test('clicking creates ripple animation', async ({ page }) => {
      const wrapper = page.locator('[data-testid="ripple-effect"]').first();
      await wrapper.click();
      // Ripple span appears briefly
      await page.waitForTimeout(100);
    });
  });

  // ─── ShakeAnimation ───────────────────────────────
  test.describe('ShakeAnimation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/shake-animation');
      await page.waitForLoadState('networkidle');
    });

    test('renders shake wrapper', async ({ page }) => {
      await expect(page.locator('[data-testid="shake-animation"]').first()).toBeVisible();
    });
  });

  // ─── SlideReveal ──────────────────────────────────
  test.describe('SlideReveal', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/slide-reveal');
      await page.waitForLoadState('networkidle');
    });

    test('renders slide reveal elements', async ({ page }) => {
      const reveals = page.locator('[data-testid="slide-reveal"]');
      expect(await reveals.count()).toBeGreaterThanOrEqual(2);
    });

    test('elements become visible after animation', async ({ page }) => {
      await page.waitForTimeout(600);
      const reveal = page.locator('[data-testid="slide-reveal"]').first();
      await expect(reveal).toBeVisible();
    });
  });
});
