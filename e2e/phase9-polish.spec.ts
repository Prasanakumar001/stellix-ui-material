import { test, expect } from '@playwright/test';

test.describe('Phase 9 — Polish & Accessibility E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // ─────────────────────────────────────────
  // ACCESSIBILITY — ARIA
  // ─────────────────────────────────────────

  test.describe('Accessibility — ARIA Roles', () => {
    test('LoadingState should have role=status', async ({ page }) => {
      const loader = page.locator('[data-testid="loading-state"]').first();
      await expect(loader).toHaveAttribute('role', 'status');
    });

    test('LoadingState should have aria-label', async ({ page }) => {
      const loader = page.locator('[data-testid="loading-state"]').first();
      const label = await loader.getAttribute('aria-label');
      expect(label).toBeTruthy();
    });

    test('LoadingState should have aria-live=polite', async ({ page }) => {
      const loader = page.locator('[data-testid="loading-state"]').first();
      await expect(loader).toHaveAttribute('aria-live', 'polite');
    });

    test('Thinking header should have aria-expanded', async ({ page }) => {
      const panel = page.locator('[data-testid="thinking-panel"]');
      const header = panel.locator('button').first();
      const expanded = await header.getAttribute('aria-expanded');
      expect(expanded).toBeTruthy();
    });

    test('Thinking trace items should have aria-expanded', async ({ page }) => {
      const traceBtn = page.locator('[data-testid="trace-item-steps"] button');
      const expanded = await traceBtn.getAttribute('aria-expanded');
      expect(expanded === 'true' || expanded === 'false').toBe(true);
    });

    test('Chat messages container should have role=log', async ({ page }) => {
      const messages = page.locator('[data-testid="chat-messages"]');
      await expect(messages).toHaveAttribute('role', 'log');
    });

    test('Chat messages should have aria-live=polite', async ({ page }) => {
      const messages = page.locator('[data-testid="chat-messages"]');
      await expect(messages).toHaveAttribute('aria-live', 'polite');
    });

    test('Chat input should have aria-label', async ({ page }) => {
      const input = page.locator('[data-testid="chat-input"]');
      const label = await input.getAttribute('aria-label');
      expect(label).toBeTruthy();
    });

    test('ApprovalCard options should have role=radiogroup', async ({ page }) => {
      const options = page.locator('[data-testid="approval-options"]');
      const role = await options.getAttribute('role');
      expect(role === 'radiogroup' || role === 'group').toBe(true);
    });

    test('ApprovalCard option should have aria-checked', async ({ page }) => {
      const option = page.locator('[data-testid="approval-option"]').first();
      const checked = await option.getAttribute('aria-checked');
      expect(checked === 'true' || checked === 'false').toBe(true);
    });

    test('PromptBar textarea should have aria-label', async ({ page }) => {
      const textarea = page.locator('[data-testid="prompt-textarea"]');
      await textarea.scrollIntoViewIfNeeded();
      const label = await textarea.getAttribute('aria-label');
      expect(label).toBeTruthy();
    });

    test('CodeBlock should have role=region', async ({ page }) => {
      const cb = page.locator('[data-testid="code-block"]');
      await cb.scrollIntoViewIfNeeded();
      await expect(cb).toHaveAttribute('role', 'region');
    });

    test('DiffTable should have aria-label', async ({ page }) => {
      const table = page.locator('[data-testid="diff-content"]');
      await table.scrollIntoViewIfNeeded();
      const label = await table.getAttribute('aria-label');
      expect(label).toBeTruthy();
    });

    test('RecordsTable sortable columns should have aria-sort', async ({ page }) => {
      const viewport = page.viewportSize();
      if (viewport && viewport.width < 640) return;
      const header = page.locator('[data-testid="column-header-name"]');
      await header.scrollIntoViewIfNeeded();
      const sort = await header.getAttribute('aria-sort');
      expect(sort).toBe('none');
    });

    test('RecordsTable sorted column should update aria-sort', async ({ page }) => {
      const viewport = page.viewportSize();
      if (viewport && viewport.width < 640) return;
      const header = page.locator('[data-testid="column-header-name"]');
      await header.scrollIntoViewIfNeeded();
      await header.click();
      await expect(header).toHaveAttribute('aria-sort', 'ascending');
    });

    test('FineTuneCard toggle should have role=switch', async ({ page }) => {
      const toggle = page.locator('[data-testid="toggle-input"]');
      await toggle.scrollIntoViewIfNeeded();
      await expect(toggle).toHaveAttribute('role', 'switch');
    });

    test('FineTuneCard toggle should have aria-checked', async ({ page }) => {
      const toggle = page.locator('[data-testid="toggle-input"]');
      await toggle.scrollIntoViewIfNeeded();
      await expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    test('FineTuneCard slider should have aria-valuemin/max/now', async ({ page }) => {
      const slider = page.locator('[data-testid="slider-input"]');
      await slider.scrollIntoViewIfNeeded();
      const min = await slider.getAttribute('aria-valuemin');
      const max = await slider.getAttribute('aria-valuemax');
      const now = await slider.getAttribute('aria-valuenow');
      expect(min).toBe('10');
      expect(max).toBe('32');
      expect(now).toBe('16');
    });

    test('TaskRows should have role=list', async ({ page }) => {
      const container = page.locator('[data-testid="task-rows"]');
      await expect(container).toHaveAttribute('role', 'list');
    });
  });

  // ─────────────────────────────────────────
  // ACCESSIBILITY — KEYBOARD
  // ─────────────────────────────────────────

  test.describe('Accessibility — Keyboard', () => {
    test('should have skip-to-content link', async ({ page }) => {
      const skip = page.locator('a[href="#main-content"]');
      await expect(skip).toBeAttached();
    });

    test('main content should have id for skip link', async ({ page }) => {
      const main = page.locator('#main-content');
      await expect(main).toBeVisible();
    });

    test('html should have lang attribute', async ({ page }) => {
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang).toBe('en');
    });

    test('all buttons should be focusable', async ({ page }) => {
      const buttons = page.locator('button:not([disabled])');
      const count = await buttons.count();
      expect(count).toBeGreaterThan(20);
    });

    test('page should have proper heading hierarchy (h1 > h2)', async ({ page }) => {
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
      const h2s = page.locator('h2');
      const count = await h2s.count();
      expect(count).toBeGreaterThanOrEqual(15);
    });
  });

  // ─────────────────────────────────────────
  // DARK MODE
  // ─────────────────────────────────────────

  test.describe('Dark Mode', () => {
    test('should have dark mode toggle button', async ({ page }) => {
      const toggle = page.locator('[data-testid="dark-mode-toggle"]');
      await expect(toggle).toBeVisible();
      await expect(toggle).toContainText('Dark');
    });

    test('clicking toggle should add dark class to html', async ({ page }) => {
      const toggle = page.locator('[data-testid="dark-mode-toggle"]');
      await toggle.click();
      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);
    });

    test('clicking toggle should set data-theme=dark', async ({ page }) => {
      const toggle = page.locator('[data-testid="dark-mode-toggle"]');
      await toggle.click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });

    test('dark mode should change background color', async ({ page }) => {
      const toggle = page.locator('[data-testid="dark-mode-toggle"]');
      const bgBefore = await page.evaluate(() =>
        getComputedStyle(document.body).backgroundColor,
      );
      await toggle.click();
      await page.waitForTimeout(400);
      const bgAfter = await page.evaluate(() =>
        getComputedStyle(document.body).backgroundColor,
      );
      expect(bgBefore).not.toBe(bgAfter);
    });

    test('toggle button should show Light text in dark mode', async ({ page }) => {
      const toggle = page.locator('[data-testid="dark-mode-toggle"]');
      await toggle.click();
      await expect(toggle).toContainText('Light');
    });

    test('clicking toggle again should restore light mode', async ({ page }) => {
      const toggle = page.locator('[data-testid="dark-mode-toggle"]');
      await toggle.click(); // dark
      await toggle.click(); // light
      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', 'light');
    });

    test('dark mode toggle should have aria-label', async ({ page }) => {
      const toggle = page.locator('[data-testid="dark-mode-toggle"]');
      await expect(toggle).toHaveAttribute('aria-label', 'Toggle dark mode');
    });
  });

  // ─────────────────────────────────────────
  // REDUCED MOTION
  // ─────────────────────────────────────────

  test.describe('Reduced Motion', () => {
    test('reduced motion CSS rule should exist in stylesheet', async ({ page }) => {
      const hasRule = await page.evaluate(() => {
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule.cssText?.includes('prefers-reduced-motion')) return true;
            }
          } catch { /* cross-origin */ }
        }
        return false;
      });
      expect(hasRule).toBe(true);
    });
  });

  // ─────────────────────────────────────────
  // FOCUS VISIBLE
  // ─────────────────────────────────────────

  test.describe('Focus Visible', () => {
    test('focus-visible CSS rule should exist', async ({ page }) => {
      const hasRule = await page.evaluate(() => {
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule.cssText?.includes('focus-visible')) return true;
            }
          } catch { /* cross-origin */ }
        }
        return false;
      });
      expect(hasRule).toBe(true);
    });
  });

  // ─────────────────────────────────────────
  // DESIGN TOKENS
  // ─────────────────────────────────────────

  test.describe('Design Tokens — CSS Variables', () => {
    test('accent color should be defined', async ({ page }) => {
      const accent = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),
      );
      expect(accent).toBe('#6366f1');
    });

    test('ink color should change in dark mode', async ({ page }) => {
      const inkBefore = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--ink').trim(),
      );
      const toggle = page.locator('[data-testid="dark-mode-toggle"]');
      await toggle.click();
      await page.waitForTimeout(200);
      const inkAfter = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--ink').trim(),
      );
      expect(inkBefore).not.toBe(inkAfter);
    });
  });
});
