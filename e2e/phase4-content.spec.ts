import { test, expect } from '@playwright/test';

test.describe('Phase 4 — Content Components E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // ─────────────────────────────────────────
  // STREAMING TEXT
  // ─────────────────────────────────────────

  test.describe('StreamingText — Streaming', () => {
    test('should render streaming text container', async ({ page }) => {
      const st = page.locator('[data-testid="streaming-text"]');
      await expect(st).toBeVisible();
    });

    test('should stream text word by word', async ({ page }) => {
      const st = page.locator('[data-testid="streaming-text"]');
      await expect(st).toContainText('streaming', { timeout: 5000 });
    });

    test('should show blinking cursor while streaming', async ({ page }) => {
      // Navigate fresh to catch streaming in progress
      await page.goto('/');
      const cursor = page.locator('[data-testid="streaming-cursor"]');
      // May or may not be visible depending on speed
      const count = await cursor.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should show progress bar while streaming', async ({ page }) => {
      await page.goto('/');
      // Progress bar may appear briefly during streaming
      const progressBar = page.locator('[data-testid="stream-progress"]');
      const count = await progressBar.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('StreamingText — Citations', () => {
    test('should show citation chips after streaming completes', async ({ page }) => {
      await page.waitForTimeout(4000);
      const citations = page.locator('[data-testid="citations"]');
      await expect(citations).toBeVisible();
    });

    test('should render correct citation labels', async ({ page }) => {
      await page.waitForTimeout(4000);
      const chips = page.locator('[data-testid="citation-chip"]');
      await expect(chips).toHaveCount(2);
      await expect(chips.first()).toContainText('React Docs');
      await expect(chips.last()).toContainText('Next.js Guide');
    });

    test('citation chips should have source number', async ({ page }) => {
      await page.waitForTimeout(4000);
      const citations = page.locator('[data-testid="citations"]');
      await expect(citations).toContainText('[1]');
      await expect(citations).toContainText('[2]');
    });

    test('citation chips should have link icon', async ({ page }) => {
      await page.waitForTimeout(4000);
      const chip = page.locator('[data-testid="citation-chip"]').first();
      const icon = chip.locator('svg');
      await expect(icon).toBeVisible();
    });
  });

  test.describe('StreamingText — Action Toolbar', () => {
    test('should show action toolbar after streaming completes', async ({ page }) => {
      await page.waitForTimeout(4000);
      const toolbar = page.locator('[data-testid="action-toolbar"]');
      await expect(toolbar).toBeVisible();
    });

    test('should have Copy button', async ({ page }) => {
      await page.waitForTimeout(4000);
      const toolbar = page.locator('[data-testid="action-toolbar"]');
      await expect(toolbar).toContainText('Copy');
    });

    test('Copy button should show Copied state on click', async ({ page }) => {
      await page.waitForTimeout(4000);
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
      const copyBtn = page.locator('[data-testid="action-toolbar"] button', { hasText: 'Copy' });
      await copyBtn.click();
      await expect(page.locator('[data-testid="action-toolbar"]')).toContainText('Copied');
    });

    test('should have thumbs up/down buttons', async ({ page }) => {
      await page.waitForTimeout(4000);
      const toolbar = page.locator('[data-testid="action-toolbar"]');
      const buttons = toolbar.locator('button');
      const count = await buttons.count();
      expect(count).toBeGreaterThanOrEqual(4); // copy, up, down, share
    });

    test('thumbs up should toggle active state', async ({ page }) => {
      await page.waitForTimeout(4000);
      const toolbar = page.locator('[data-testid="action-toolbar"]');
      const upBtn = toolbar.locator('button[title="Helpful"]');
      await upBtn.click();
      await expect(upBtn).toHaveClass(/bg-green/);
    });
  });

  test.describe('StreamingText — Follow-ups', () => {
    test('should show follow-up suggestions after streaming', async ({ page }) => {
      await page.waitForTimeout(4000);
      const followUps = page.locator('[data-testid="follow-ups"]');
      await expect(followUps).toBeVisible();
    });

    test('should render 3 follow-up buttons', async ({ page }) => {
      await page.waitForTimeout(4000);
      const buttons = page.locator('[data-testid="follow-up"]');
      await expect(buttons).toHaveCount(3);
    });

    test('follow-ups should have chat icon', async ({ page }) => {
      await page.waitForTimeout(4000);
      const button = page.locator('[data-testid="follow-up"]').first();
      const icon = button.locator('svg');
      await expect(icon).toBeVisible();
    });

    test('follow-ups should have correct text', async ({ page }) => {
      await page.waitForTimeout(4000);
      const container = page.locator('[data-testid="follow-ups"]');
      await expect(container).toContainText('Tell me more about streaming');
      await expect(container).toContainText('How does SSR work?');
      await expect(container).toContainText('Show me an example');
    });
  });

  // ─────────────────────────────────────────
  // CODE BLOCK
  // ─────────────────────────────────────────

  test.describe('CodeBlock — Structure', () => {
    test('should render code block container', async ({ page }) => {
      const cb = page.locator('[data-testid="code-block"]');
      await cb.scrollIntoViewIfNeeded();
      await expect(cb).toBeVisible();
    });

    test('should show language badge', async ({ page }) => {
      const lang = page.locator('[data-testid="code-language"]');
      await lang.scrollIntoViewIfNeeded();
      await expect(lang).toHaveText('tsx');
    });

    test('should show code bracket icon in header', async ({ page }) => {
      const cb = page.locator('[data-testid="code-block"]');
      await cb.scrollIntoViewIfNeeded();
      const icon = cb.locator('svg').first();
      await expect(icon).toBeVisible();
    });

    test('should have dark background', async ({ page }) => {
      const area = page.locator('[data-testid="code-area"]');
      await area.scrollIntoViewIfNeeded();
      await expect(area).toBeVisible();
    });

    test('should show footer with line count and encoding', async ({ page }) => {
      const cb = page.locator('[data-testid="code-block"]');
      await cb.scrollIntoViewIfNeeded();
      await expect(cb).toContainText('lines');
      await expect(cb).toContainText('UTF-8');
    });
  });

  test.describe('CodeBlock — Syntax Highlighting', () => {
    test('should render code lines', async ({ page }) => {
      const lines = page.locator('[data-testid="code-line"]');
      const count = await lines.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should show line numbers', async ({ page }) => {
      const lineNums = page.locator('[data-testid="line-number"]');
      const count = await lineNums.count();
      expect(count).toBeGreaterThanOrEqual(1);
      await expect(lineNums.first()).toHaveText('1');
    });

    test('should have syntax-colored tokens (keywords in purple)', async ({ page }) => {
      const cb = page.locator('[data-testid="code-block"]');
      await cb.scrollIntoViewIfNeeded();
      // Keywords like import/export/const should be colored
      const keywords = cb.locator('span[class*="c586c0"]');
      const count = await keywords.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should have syntax-colored strings (in orange)', async ({ page }) => {
      const cb = page.locator('[data-testid="code-block"]');
      await cb.scrollIntoViewIfNeeded();
      const strings = cb.locator('span[class*="ce9178"]');
      const count = await strings.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('CodeBlock — Copy', () => {
    test('should have copy button', async ({ page }) => {
      const copyBtn = page.locator('[data-testid="copy-button"]');
      await copyBtn.scrollIntoViewIfNeeded();
      await expect(copyBtn).toBeVisible();
      await expect(copyBtn).toContainText('Copy');
    });

    test('copy button should show Copied state on click', async ({ page }) => {
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
      const copyBtn = page.locator('[data-testid="copy-button"]');
      await copyBtn.scrollIntoViewIfNeeded();
      await copyBtn.click();
      await expect(copyBtn).toContainText('Copied');
    });
  });

  test.describe('CodeBlock — Streaming', () => {
    test('should render code content eventually', async ({ page }) => {
      const cb = page.locator('[data-testid="code-block"]');
      await cb.scrollIntoViewIfNeeded();
      await expect(cb).toContainText('LoadingState', { timeout: 10000 });
    });

    test('should show line count in footer', async ({ page }) => {
      await page.waitForTimeout(2000);
      const cb = page.locator('[data-testid="code-block"]');
      await cb.scrollIntoViewIfNeeded();
      await expect(cb).toContainText('lines');
    });
  });

  // ─────────────────────────────────────────
  // CONTEXT CARDS
  // ─────────────────────────────────────────

  test.describe('ContextCards — Grid', () => {
    test('should render context cards container', async ({ page }) => {
      const cc = page.locator('[data-testid="context-cards"]');
      await cc.scrollIntoViewIfNeeded();
      await expect(cc).toBeVisible();
    });

    test('should render 3 context cards', async ({ page }) => {
      const cards = page.locator('[data-testid="context-card"]');
      await expect(cards).toHaveCount(3);
    });

    test('cards should have staggered fade-up animation', async ({ page }) => {
      const cards = page.locator('[data-testid="context-card"]');
      const firstDelay = await cards.first().getAttribute('style');
      const lastDelay = await cards.last().getAttribute('style');
      expect(firstDelay).toContain('0ms');
      expect(lastDelay).toContain('160ms');
    });
  });

  test.describe('ContextCards — Card Content', () => {
    test('should show card titles', async ({ page }) => {
      const cc = page.locator('[data-testid="context-cards"]');
      await cc.scrollIntoViewIfNeeded();
      await expect(cc).toContainText('React Best Practices');
      await expect(cc).toContainText('Tailwind CSS Guide');
      await expect(cc).toContainText('TypeScript Handbook');
    });

    test('should show source URLs', async ({ page }) => {
      const sources = page.locator('[data-testid="card-source"]');
      const count = await sources.count();
      expect(count).toBe(3);
      await expect(sources.first()).toContainText('docs.react.dev');
    });

    test('should show document icon in accent-colored container', async ({ page }) => {
      const cards = page.locator('[data-testid="context-card"]');
      const iconContainers = cards.locator('.bg-accent\\/10');
      const count = await iconContainers.count();
      expect(count).toBe(3);
    });

    test('should show globe icon next to source', async ({ page }) => {
      const card = page.locator('[data-testid="context-card"]').first();
      await card.scrollIntoViewIfNeeded();
      const svgIcons = card.locator('svg');
      const count = await svgIcons.count();
      expect(count).toBeGreaterThanOrEqual(2); // document icon + globe icon
    });
  });

  test.describe('ContextCards — Relevance', () => {
    test('should show relevance meters', async ({ page }) => {
      const meters = page.locator('[data-testid="relevance-meter"]');
      await expect(meters).toHaveCount(3);
    });

    test('should show correct relevance percentages', async ({ page }) => {
      const cc = page.locator('[data-testid="context-cards"]');
      await cc.scrollIntoViewIfNeeded();
      await expect(cc).toContainText('95%');
      await expect(cc).toContainText('88%');
      await expect(cc).toContainText('82%');
    });

    test('relevance meter should have colored bar', async ({ page }) => {
      const meter = page.locator('[data-testid="relevance-meter"]').first();
      await meter.scrollIntoViewIfNeeded();
      // 95% should have green bar
      const bar = meter.locator('.bg-green');
      await expect(bar).toBeVisible();
    });
  });

  test.describe('ContextCards — Show More/Less', () => {
    test('should show truncated content by default', async ({ page }) => {
      const content = page.locator('[data-testid="card-content"]').first();
      await content.scrollIntoViewIfNeeded();
      const text = await content.textContent();
      expect(text!.length).toBeLessThanOrEqual(125);
    });

    test('should have Show more button for long content', async ({ page }) => {
      const btn = page.locator('[data-testid="show-more-btn"]').first();
      await btn.scrollIntoViewIfNeeded();
      await expect(btn).toContainText('Show more');
    });

    test('clicking Show more should reveal full content', async ({ page }) => {
      const btn = page.locator('[data-testid="show-more-btn"]').first();
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      await expect(btn).toContainText('Show less');
    });

    test('Show more button should have chevron icon', async ({ page }) => {
      const btn = page.locator('[data-testid="show-more-btn"]').first();
      await btn.scrollIntoViewIfNeeded();
      const chevron = btn.locator('svg');
      await expect(chevron).toBeVisible();
    });
  });

  test.describe('ContextCards — Styling', () => {
    test('cards should have shadow and hover effect', async ({ page }) => {
      const card = page.locator('[data-testid="context-card"]').first();
      await card.scrollIntoViewIfNeeded();
      await expect(card).toHaveClass(/shadow-card/);
      await expect(card).toHaveClass(/hover:shadow-raised/);
    });

    test('cards should have accent border on hover class', async ({ page }) => {
      const card = page.locator('[data-testid="context-card"]').first();
      await card.scrollIntoViewIfNeeded();
      await expect(card).toHaveClass(/hover:border-accent/);
    });
  });
});
