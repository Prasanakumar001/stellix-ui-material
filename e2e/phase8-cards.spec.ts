import { test, expect } from '@playwright/test';

test.describe('Phase 8 — Card & Control Components E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // ─────────────────────────────────────────
  // RECOMMENDATION CARD
  // ─────────────────────────────────────────

  test.describe('RecommendationCard', () => {
    test('should render card', async ({ page }) => {
      const card = page.locator('[data-testid="recommendation-card"]');
      await card.scrollIntoViewIfNeeded();
      await expect(card).toBeVisible();
    });

    test('should show sparkles icon and title', async ({ page }) => {
      const title = page.locator('[data-testid="rec-title"]');
      await title.scrollIntoViewIfNeeded();
      await expect(title).toHaveText('Use Server Components');
    });

    test('should show description', async ({ page }) => {
      const desc = page.locator('[data-testid="rec-description"]');
      await desc.scrollIntoViewIfNeeded();
      await expect(desc).toContainText('reduce client-side JavaScript');
    });

    test('should show confidence meter with 5 segments', async ({ page }) => {
      const segments = page.locator('[data-testid="confidence-segment"]');
      await expect(segments).toHaveCount(5);
    });

    test('should show confidence percentage', async ({ page }) => {
      const value = page.locator('[data-testid="confidence-value"]');
      await value.scrollIntoViewIfNeeded();
      await expect(value).toHaveText('87%');
    });

    test('should show alternatives with progress bars', async ({ page }) => {
      const alts = page.locator('[data-testid="alternative-row"]');
      await expect(alts).toHaveCount(2);
      const list = page.locator('[data-testid="alternatives-list"]');
      await expect(list).toContainText('Keep Client Components');
      await expect(list).toContainText('45%');
      await expect(list).toContainText('Hybrid Approach');
      await expect(list).toContainText('72%');
    });

    test('alternatives toggle should collapse/expand', async ({ page }) => {
      const toggle = page.locator('[data-testid="alternatives-toggle"]');
      await toggle.scrollIntoViewIfNeeded();
      await toggle.click();
      // Should collapse
      const list = page.locator('[data-testid="alternatives-list"]');
      await expect(list).toHaveCount(0);
      // Click again to expand
      await toggle.click();
      await expect(page.locator('[data-testid="alternatives-list"]')).toBeVisible();
    });

    test('should show Accept, Modify, Reject buttons with icons', async ({ page }) => {
      const accept = page.locator('[data-testid="rec-accept"]');
      const modify = page.locator('[data-testid="rec-modify"]');
      const reject = page.locator('[data-testid="rec-reject"]');
      await accept.scrollIntoViewIfNeeded();
      await expect(accept).toContainText('Accept');
      await expect(modify).toContainText('Modify');
      await expect(reject).toContainText('Reject');
      // Each should have an SVG icon
      expect(await accept.locator('svg').count()).toBe(1);
      expect(await modify.locator('svg').count()).toBe(1);
      expect(await reject.locator('svg').count()).toBe(1);
    });
  });

  // ─────────────────────────────────────────
  // INSIGHT CARDS
  // ─────────────────────────────────────────

  test.describe('InsightCards', () => {
    test('should render insight cards container', async ({ page }) => {
      const container = page.locator('[data-testid="insight-cards"]');
      await container.scrollIntoViewIfNeeded();
      await expect(container).toBeVisible();
    });

    test('should render 3 insight cards', async ({ page }) => {
      const cards = page.locator('[data-testid="insight-card"]');
      await expect(cards).toHaveCount(3);
    });

    test('should show card titles with chart icons', async ({ page }) => {
      const titles = page.locator('[data-testid="insight-title"]');
      await expect(titles.nth(0)).toHaveText('API Latency');
      await expect(titles.nth(1)).toHaveText('Error Rate');
      await expect(titles.nth(2)).toHaveText('Token Usage');
    });

    test('should show descriptions', async ({ page }) => {
      const descs = page.locator('[data-testid="insight-description"]');
      await expect(descs.nth(0)).toHaveText('p99 response time');
    });

    test('should render SVG charts', async ({ page }) => {
      const charts = page.locator('[data-testid="chart-svg"]');
      const count = await charts.count();
      expect(count).toBe(3);
    });

    test('should show trend badges', async ({ page }) => {
      const badges = page.locator('[data-testid="trend-badge"]');
      const count = await badges.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should show data labels at bottom of each card', async ({ page }) => {
      const labels = page.locator('[data-testid="chart-labels"]');
      await expect(labels).toHaveCount(3);
      await expect(labels.first()).toContainText('Mon');
      await expect(labels.first()).toContainText('Fri');
    });

    test('cards should have hover shadow effect', async ({ page }) => {
      const card = page.locator('[data-testid="insight-card"]').first();
      await card.scrollIntoViewIfNeeded();
      await expect(card).toHaveClass(/hover:shadow-raised/);
    });
  });

  // ─────────────────────────────────────────
  // TOOL CHIPS
  // ─────────────────────────────────────────

  test.describe('ToolChips', () => {
    test('should render tool chips container', async ({ page }) => {
      const container = page.locator('[data-testid="tool-chips"]');
      await expect(container).toBeVisible();
    });

    test('should render 3 tool chips', async ({ page }) => {
      const chips = page.locator('[data-testid="tool-chip"]');
      await expect(chips).toHaveCount(3);
    });

    test('should show tool names', async ({ page }) => {
      const container = page.locator('[data-testid="tool-chips"]');
      await expect(container).toContainText('readFile');
      await expect(container).toContainText('writeCode');
      await expect(container).toContainText('runTests');
    });

    test('should show correct status attributes', async ({ page }) => {
      const success = page.locator('[data-testid="tool-chip"][data-status="success"]');
      const running = page.locator('[data-testid="tool-chip"][data-status="running"]');
      const error = page.locator('[data-testid="tool-chip"][data-status="error"]');
      await expect(success).toHaveCount(1);
      await expect(running).toHaveCount(1);
      await expect(error).toHaveCount(1);
    });

    test('should show file paths', async ({ page }) => {
      const container = page.locator('[data-testid="tool-chips"]');
      await expect(container).toContainText('src/index.ts');
      await expect(container).toContainText('src/utils.ts');
    });

    test('clicking chip should expand to show detail', async ({ page }) => {
      const btn = page.locator('[data-testid="tool-chip-btn"]').first();
      await btn.click();
      const detail = page.locator('[data-testid="tool-detail"]');
      await expect(detail.first()).toBeVisible();
      await expect(detail.first()).toContainText('Read the main entry file');
    });

    test('expanded detail should show diff counts', async ({ page }) => {
      const btn = page.locator('[data-testid="tool-chip-btn"]').first();
      await btn.click();
      const counts = page.locator('[data-testid="diff-counts"]').first();
      await expect(counts).toContainText('12');
      await expect(counts).toContainText('3');
    });

    test('running chip should have spinning icon', async ({ page }) => {
      const running = page.locator('[data-testid="tool-chip"][data-status="running"]');
      const spinner = running.locator('.animate-spin');
      await expect(spinner).toBeVisible();
    });
  });

  // ─────────────────────────────────────────
  // FINE-TUNE CARD
  // ─────────────────────────────────────────

  test.describe('FineTuneCard', () => {
    test('should render card with adjustments icon', async ({ page }) => {
      const card = page.locator('[data-testid="finetune-card"]');
      await card.scrollIntoViewIfNeeded();
      await expect(card).toBeVisible();
    });

    test('should show title', async ({ page }) => {
      const title = page.locator('[data-testid="finetune-title"]');
      await title.scrollIntoViewIfNeeded();
      await expect(title).toHaveText('Appearance');
    });

    test('should render 4 properties', async ({ page }) => {
      const props = page.locator('[data-testid="finetune-property"]');
      await expect(props).toHaveCount(4);
    });

    test('should show property labels', async ({ page }) => {
      const labels = page.locator('[data-testid="property-label"]');
      await expect(labels.nth(0)).toHaveText('Font Size');
      await expect(labels.nth(1)).toHaveText('Dark Mode');
      await expect(labels.nth(2)).toHaveText('Accent Color');
      await expect(labels.nth(3)).toHaveText('Font Family');
    });

    test('slider should show current value', async ({ page }) => {
      const value = page.locator('[data-testid="slider-value"]');
      await value.scrollIntoViewIfNeeded();
      await expect(value).toHaveText('16');
    });

    test('slider should have range input with min/max labels', async ({ page }) => {
      const slider = page.locator('[data-testid="slider-input"]');
      await slider.scrollIntoViewIfNeeded();
      await expect(slider).toBeVisible();
    });

    test('toggle should render with correct state', async ({ page }) => {
      const toggle = page.locator('[data-testid="toggle-input"]');
      await toggle.scrollIntoViewIfNeeded();
      await expect(toggle).toBeVisible();
      await expect(toggle).toHaveAttribute('data-checked', 'false');
    });

    test('toggle click should change state', async ({ page }) => {
      const toggle = page.locator('[data-testid="toggle-input"]');
      await toggle.scrollIntoViewIfNeeded();
      await toggle.click({ force: true });
      await expect(toggle).toHaveAttribute('data-checked', 'true');
    });

    test('color picker should show current value', async ({ page }) => {
      const colorValue = page.locator('[data-testid="color-value"]');
      await colorValue.scrollIntoViewIfNeeded();
      await expect(colorValue).toHaveText('#6366f1');
    });

    test('select should show options', async ({ page }) => {
      const select = page.locator('[data-testid="select-input"]');
      await select.scrollIntoViewIfNeeded();
      await expect(select).toBeVisible();
      await expect(select).toContainText('Inter');
    });

    test('select should have chevron icon', async ({ page }) => {
      const prop = page.locator('[data-testid="finetune-property"][data-type="select"]');
      await prop.scrollIntoViewIfNeeded();
      const icon = prop.locator('svg');
      const count = await icon.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  // ─────────────────────────────────────────
  // STYLING
  // ─────────────────────────────────────────

  test.describe('Card Components — Styling', () => {
    test('recommendation card should have shadow', async ({ page }) => {
      const card = page.locator('[data-testid="recommendation-card"]');
      await card.scrollIntoViewIfNeeded();
      await expect(card).toHaveClass(/shadow-card/);
    });

    test('finetune card should have shadow', async ({ page }) => {
      const card = page.locator('[data-testid="finetune-card"]');
      await card.scrollIntoViewIfNeeded();
      await expect(card).toHaveClass(/shadow-card/);
    });

    test('page should not overflow', async ({ page }) => {
      await page.waitForTimeout(500);
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2);
    });
  });
});
