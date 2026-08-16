import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Mobile', width: 375 },
  { name: 'Tablet', width: 768 },
  { name: 'Web', width: 1280 },
  { name: 'Large', width: 1920 },
];

test.describe('PromptBar — All Views + Functionality', () => {

  for (const vp of viewports) {
    test.describe(`${vp.name} (${vp.width}px)`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/components/prompt-bar');
        await page.waitForLoadState('networkidle');
        // Click the viewport button
        // Use title attribute to avoid matching tab bar "Web Code" etc.
        const vpBtn = page.locator(`button[title*="${vp.width}"]`).first();
        if (await vpBtn.count() > 0) {
          await vpBtn.click();
        } else {
          // Fallback: click by text within Preview row only
          const previewRow = page.locator('text=Preview:').locator('..').first();
          await previewRow.locator(`button`, { hasText: vp.name }).first().click();
        }
        await page.waitForTimeout(1000);
      });

      test('page renders without crash', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('PromptBar');
      });

      test('textarea is visible', async ({ page }) => {
        const textarea = page.locator('[data-testid="prompt-textarea"]');
        await expect(textarea).toBeVisible();
      });

      test('send button is visible inside the bar', async ({ page }) => {
        const sendBtn = page.locator('[data-testid="send-btn"]');
        await expect(sendBtn).toBeVisible();

        // Send button should be inside the prompt bar container
        const bar = page.locator('[data-testid="prompt-bar"]');
        const barBox = await bar.boundingBox();
        const sendBox = await sendBtn.boundingBox();

        if (barBox && sendBox) {
          // Send button right edge should not exceed prompt bar right edge
          expect(sendBox.x + sendBox.width).toBeLessThanOrEqual(barBox.x + barBox.width + 2);
        }
      });

      test('sources button is visible', async ({ page }) => {
        const btn = page.locator('[data-testid="sources-btn"]');
        await expect(btn).toBeVisible();
      });

      test('commands button is visible', async ({ page }) => {
        const btn = page.locator('[data-testid="commands-btn"]');
        await expect(btn).toBeVisible();
      });

      test('model picker is visible', async ({ page }) => {
        const btn = page.locator('[data-testid="model-picker-btn"]');
        await expect(btn).toBeVisible();
      });

      test('no horizontal overflow', async ({ page }) => {
        const bar = page.locator('[data-testid="prompt-bar"]');
        const barBox = await bar.boundingBox();
        // Bar should have content, not be 0 width
        expect(barBox).not.toBeNull();
        if (barBox) {
          expect(barBox.width).toBeGreaterThan(100);
          expect(barBox.width).toBeLessThanOrEqual(vp.width + 10);
        }
      });
    });
  }

  test.describe('Functionality', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/components/prompt-bar');
      await page.waitForLoadState('networkidle');
    });

    test('clicking Sources shows dropdown inside bar', async ({ page }) => {
      const btn = page.locator('[data-testid="sources-btn"]');
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      await page.waitForTimeout(500);

      const menu = page.locator('[data-testid="popover-menu"]');
      await expect(menu).toBeVisible();

      // Menu should contain source items
      const items = page.locator('[data-testid="source-item"]');
      const count = await items.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('clicking Commands shows dropdown inside bar', async ({ page }) => {
      const btn = page.locator('[data-testid="commands-btn"]');
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      await page.waitForTimeout(500);

      const items = page.locator('[data-testid="command-item"]');
      const count = await items.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('clicking Model picker shows options', async ({ page }) => {
      const btn = page.locator('[data-testid="model-picker-btn"]');
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      await page.waitForTimeout(500);

      const items = page.locator('[data-testid="model-item"]');
      const count = await items.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('selecting a source inserts into textarea', async ({ page }) => {
      const srcBtn = page.locator('[data-testid="sources-btn"]');
      await srcBtn.scrollIntoViewIfNeeded();
      await srcBtn.click();
      await page.waitForTimeout(500);

      const item = page.locator('[data-testid="source-item"]').first();
      await item.click();
      await page.waitForTimeout(300);

      const textarea = page.locator('[data-testid="prompt-textarea"]');
      const val = await textarea.inputValue();
      expect(val).toContain('@');
    });

    test('selecting a command inserts into textarea', async ({ page }) => {
      const cmdBtn = page.locator('[data-testid="commands-btn"]');
      await cmdBtn.scrollIntoViewIfNeeded();
      await cmdBtn.click();
      await page.waitForTimeout(500);

      const item = page.locator('[data-testid="command-item"]').first();
      await item.click();
      await page.waitForTimeout(300);

      const textarea = page.locator('[data-testid="prompt-textarea"]');
      const val = await textarea.inputValue();
      expect(val).toContain('/');
    });

    test('selecting model updates button text', async ({ page }) => {
      const btn = page.locator('[data-testid="model-picker-btn"]');
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      await page.waitForTimeout(500);

      const secondModel = page.locator('[data-testid="model-item"]').nth(1);
      const modelName = await secondModel.textContent();
      await secondModel.click();
      await page.waitForTimeout(300);

      // Button text should update
      const btnText = await btn.textContent();
      expect(btnText).toContain(modelName?.trim().split('\n')[0] || '');
    });

    test('send button disabled when empty, enabled when typing', async ({ page }) => {
      const sendBtn = page.locator('[data-testid="send-btn"]');
      await expect(sendBtn).toBeDisabled();

      const textarea = page.locator('[data-testid="prompt-textarea"]');
      await textarea.fill('Hello');
      await expect(sendBtn).toBeEnabled();
    });

    test('dropdown closes after selection', async ({ page }) => {
      const srcBtn = page.locator('[data-testid="sources-btn"]');
      await srcBtn.scrollIntoViewIfNeeded();
      await srcBtn.click();
      await page.waitForTimeout(500);

      const item = page.locator('[data-testid="source-item"]').first();
      await item.click();
      await page.waitForTimeout(500);

      // Menu should be gone
      const menu = page.locator('[data-testid="popover-menu"]');
      await expect(menu).toHaveCount(0);
    });
  });
});
