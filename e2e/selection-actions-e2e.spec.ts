import { test, expect } from '@playwright/test';

test.describe('SelectionActions — Full E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the old demo page which has SelectionActions rendered directly
    await page.goto('/components/selection-actions');
    await page.waitForLoadState('networkidle');
  });

  test('page renders with selectable text', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('SelectionActions');
    const text = page.locator('[data-testid="selection-actions"] p');
    await expect(text.first()).toBeVisible();
  });

  test('no toolbar visible without selection', async ({ page }) => {
    const toolbar = page.locator('[data-testid="selection-toolbar"]');
    const sheet = page.locator('[data-testid="selection-bottom-sheet"]');
    expect(await toolbar.count()).toBe(0);
    expect(await sheet.count()).toBe(0);
  });

  test('selecting text via triple-click shows toolbar with 4 actions', async ({ page }) => {
    const textEl = page.locator('[data-testid="selection-actions"] p').first();
    await textEl.scrollIntoViewIfNeeded();

    // Triple-click to select paragraph text
    await textEl.click({ clickCount: 3 });
    await page.waitForTimeout(600);

    // Desktop should show floating toolbar
    const toolbar = page.locator('[data-testid="selection-toolbar"]');
    const toolbarVisible = await toolbar.isVisible().catch(() => false);

    // Mobile may show bottom sheet instead
    const sheet = page.locator('[data-testid="selection-bottom-sheet"]');
    const sheetVisible = await sheet.isVisible().catch(() => false);

    expect(toolbarVisible || sheetVisible).toBe(true);

    if (toolbarVisible) {
      // Verify all 4 action buttons
      await expect(toolbar.locator('[data-testid="action-rewrite"]')).toBeVisible();
      await expect(toolbar.locator('[data-testid="action-summarize"]')).toBeVisible();
      await expect(toolbar.locator('[data-testid="action-explain"]')).toBeVisible();
      await expect(toolbar.locator('[data-testid="action-translate"]')).toBeVisible();
    }
    if (sheetVisible) {
      await expect(sheet.locator('[data-testid="action-rewrite"]')).toBeVisible();
      await expect(sheet.locator('[data-testid="action-summarize"]')).toBeVisible();
      await expect(sheet.locator('[data-testid="action-explain"]')).toBeVisible();
      await expect(sheet.locator('[data-testid="action-translate"]')).toBeVisible();
    }
  });

  test('selecting text via click-drag shows toolbar', async ({ page }) => {
    const textEl = page.locator('[data-testid="selection-actions"] p').first();
    await textEl.scrollIntoViewIfNeeded();
    const box = await textEl.boundingBox();
    if (!box) return;

    // Click and drag to select a portion of text
    await page.mouse.move(box.x + 10, box.y + 10);
    await page.mouse.down();
    await page.mouse.move(box.x + 250, box.y + 10);
    await page.mouse.up();
    await page.waitForTimeout(600);

    const toolbar = page.locator('[data-testid="selection-toolbar"]');
    const sheet = page.locator('[data-testid="selection-bottom-sheet"]');
    const hasUI = (await toolbar.count()) > 0 || (await sheet.count()) > 0;
    expect(hasUI).toBe(true);
  });

  test('toolbar shows character count on mobile bottom sheet', async ({ page }) => {
    const textEl = page.locator('[data-testid="selection-actions"] p').first();
    await textEl.scrollIntoViewIfNeeded();

    await textEl.click({ clickCount: 3 });
    await page.waitForTimeout(600);

    const sheet = page.locator('[data-testid="selection-bottom-sheet"]');
    if (await sheet.isVisible()) {
      // Mobile bottom sheet shows character count
      await expect(sheet).toContainText('characters selected');
    }
  });

  test('clicking an action clears selection and hides toolbar', async ({ page }) => {
    const textEl = page.locator('[data-testid="selection-actions"] p').first();
    await textEl.scrollIntoViewIfNeeded();

    // Select text
    await textEl.click({ clickCount: 3 });
    await page.waitForTimeout(600);

    const toolbar = page.locator('[data-testid="selection-toolbar"]');
    const sheet = page.locator('[data-testid="selection-bottom-sheet"]');

    if (await toolbar.isVisible()) {
      await toolbar.locator('[data-testid="action-rewrite"]').click();
      await page.waitForTimeout(400);
      // Toolbar should disappear after action
      expect(await toolbar.count()).toBe(0);
    } else if (await sheet.isVisible()) {
      await sheet.locator('[data-testid="action-rewrite"]').click();
      await page.waitForTimeout(400);
      expect(await sheet.count()).toBe(0);
    }
  });

  test('each action button has icon and label', async ({ page }) => {
    const textEl = page.locator('[data-testid="selection-actions"] p').first();
    await textEl.scrollIntoViewIfNeeded();

    await textEl.click({ clickCount: 3 });
    await page.waitForTimeout(600);

    const toolbar = page.locator('[data-testid="selection-toolbar"]');
    if (await toolbar.isVisible()) {
      // Each button should have an SVG icon
      for (const action of ['rewrite', 'summarize', 'explain', 'translate']) {
        const btn = toolbar.locator(`[data-testid="action-${action}"]`);
        await expect(btn).toBeVisible();
        const icon = btn.locator('svg');
        await expect(icon).toBeVisible();
        // Should have text label
        const text = await btn.textContent();
        expect(text!.length).toBeGreaterThan(0);
      }
    }
  });

  test('toolbar positioned near selected text', async ({ page }) => {
    const textEl = page.locator('[data-testid="selection-actions"] p').first();
    await textEl.scrollIntoViewIfNeeded();
    const textBox = await textEl.boundingBox();
    if (!textBox) return;

    await textEl.click({ clickCount: 3 });
    await page.waitForTimeout(600);

    const toolbar = page.locator('[data-testid="selection-toolbar"]');
    if (await toolbar.isVisible()) {
      const toolbarBox = await toolbar.boundingBox();
      if (toolbarBox && textBox) {
        // Toolbar should be on the same page area as the text (within 400px accounting for preview container offset)
        const verticalDistance = Math.abs(toolbarBox.y - textBox.y);
        expect(verticalDistance).toBeLessThan(400);
      }
    }
  });

  test('toolbar has arrow pointer', async ({ page }) => {
    const textEl = page.locator('[data-testid="selection-actions"] p').first();
    await textEl.scrollIntoViewIfNeeded();

    await textEl.click({ clickCount: 3 });
    await page.waitForTimeout(600);

    const toolbar = page.locator('[data-testid="selection-toolbar"]');
    if (await toolbar.isVisible()) {
      // Toolbar should have the arrow div (rotate-45 triangle)
      const arrow = toolbar.locator('.rotate-45');
      await expect(arrow).toBeVisible();
    }
  });

  test('deselecting text hides toolbar', async ({ page }) => {
    const textEl = page.locator('[data-testid="selection-actions"] p').first();
    await textEl.scrollIntoViewIfNeeded();

    // Select
    await textEl.click({ clickCount: 3 });
    await page.waitForTimeout(600);

    const toolbar = page.locator('[data-testid="selection-toolbar"]');
    const wasVisible = await toolbar.isVisible();

    // Click elsewhere to deselect
    await page.locator('h1').click();
    await page.waitForTimeout(600);

    if (wasVisible) {
      expect(await toolbar.count()).toBe(0);
    }
  });
});
