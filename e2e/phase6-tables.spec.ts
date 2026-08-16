import { test, expect } from '@playwright/test';

test.describe('Phase 6 — Table Components E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // ─────────────────────────────────────────
  // DIFF TABLE
  // ─────────────────────────────────────────

  test.describe('DiffTable — Structure', () => {
    test('should render diff table', async ({ page }) => {
      const dt = page.locator('[data-testid="diff-table"]');
      await dt.scrollIntoViewIfNeeded();
      await expect(dt).toBeVisible();
    });

    test('should show diff stat with additions and deletions', async ({ page }) => {
      const stat = page.locator('[data-testid="diff-stat"]');
      await stat.scrollIntoViewIfNeeded();
      await expect(stat).toBeVisible();
      // Should show + and - counts
      const text = await stat.textContent();
      expect(text).toMatch(/\d+/);
    });

    test('should show mode toggle', async ({ page }) => {
      const toggle = page.locator('[data-testid="mode-toggle"]');
      await toggle.scrollIntoViewIfNeeded();
      await expect(toggle).toBeVisible();
      await expect(toggle).toContainText('Unified');
      await expect(toggle).toContainText('Split');
    });

    test('should default to unified mode', async ({ page }) => {
      const unified = page.locator('[data-testid="mode-unified"]');
      await unified.scrollIntoViewIfNeeded();
      await expect(unified).toHaveClass(/shadow-btn/);
    });

    test('should show hunk headers', async ({ page }) => {
      const headers = page.locator('[data-testid="hunk-header"]');
      const count = await headers.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('DiffTable — Diff Lines', () => {
    test('should render added lines with green background', async ({ page }) => {
      const adds = page.locator('[data-testid="diff-line-add"]');
      await adds.first().scrollIntoViewIfNeeded();
      const count = await adds.count();
      expect(count).toBeGreaterThanOrEqual(1);
      await expect(adds.first()).toHaveClass(/bg-green/);
    });

    test('should render removed lines with red background', async ({ page }) => {
      const removes = page.locator('[data-testid="diff-line-remove"]');
      await removes.first().scrollIntoViewIfNeeded();
      const count = await removes.count();
      expect(count).toBeGreaterThanOrEqual(1);
      await expect(removes.first()).toHaveClass(/bg-red/);
    });

    test('should render unchanged lines', async ({ page }) => {
      const unchanged = page.locator('[data-testid="diff-line-unchanged"]');
      const count = await unchanged.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should show line numbers', async ({ page }) => {
      const lineNums = page.locator('[data-testid="old-line-num"]');
      const count = await lineNums.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should show + indicator for additions', async ({ page }) => {
      const dt = page.locator('[data-testid="diff-table"]');
      await dt.scrollIntoViewIfNeeded();
      await expect(dt).toContainText('+');
    });

    test('should display code content', async ({ page }) => {
      const dt = page.locator('[data-testid="diff-table"]');
      await dt.scrollIntoViewIfNeeded();
      await expect(dt).toContainText('import React');
      await expect(dt).toContainText('useState');
    });
  });

  test.describe('DiffTable — Mode Toggle', () => {
    test('clicking Split should switch to split mode', async ({ page }) => {
      const splitBtn = page.locator('[data-testid="mode-split"]');
      await splitBtn.scrollIntoViewIfNeeded();
      await splitBtn.click();
      await expect(splitBtn).toHaveClass(/shadow-btn/);
    });

    test('clicking Unified should switch back', async ({ page }) => {
      const splitBtn = page.locator('[data-testid="mode-split"]');
      await splitBtn.scrollIntoViewIfNeeded();
      await splitBtn.click();
      const unifiedBtn = page.locator('[data-testid="mode-unified"]');
      await unifiedBtn.click();
      await expect(unifiedBtn).toHaveClass(/shadow-btn/);
    });
  });

  test.describe('DiffTable — Actions', () => {
    test('should show Accept and Reject buttons per hunk', async ({ page }) => {
      const actions = page.locator('[data-testid="hunk-actions"]');
      await actions.first().scrollIntoViewIfNeeded();
      await expect(actions.first()).toBeVisible();
    });

    test('Accept button should have check icon', async ({ page }) => {
      const btn = page.locator('[data-testid="accept-hunk"]');
      await btn.first().scrollIntoViewIfNeeded();
      await expect(btn.first()).toContainText('Accept');
      const icon = btn.first().locator('svg');
      await expect(icon).toBeVisible();
    });

    test('Reject button should have X icon', async ({ page }) => {
      const btn = page.locator('[data-testid="reject-hunk"]');
      await btn.first().scrollIntoViewIfNeeded();
      await expect(btn.first()).toContainText('Reject');
    });
  });

  // ─────────────────────────────────────────
  // RECORDS TABLE
  // ─────────────────────────────────────────

  test.describe('RecordsTable — Structure', () => {
    test('should render records table', async ({ page }) => {
      const rt = page.locator('[data-testid="records-table"]');
      await rt.scrollIntoViewIfNeeded();
      await expect(rt).toBeVisible();
    });

    test('should show record count', async ({ page }) => {
      const rt = page.locator('[data-testid="records-table"]');
      await rt.scrollIntoViewIfNeeded();
      await expect(rt).toContainText('5 records');
    });

    test('should render column headers', async ({ page }) => {
      const rt = page.locator('[data-testid="records-table"]');
      await rt.scrollIntoViewIfNeeded();
      await expect(rt).toContainText('Name');
      await expect(rt).toContainText('Email');
      await expect(rt).toContainText('Role');
      await expect(rt).toContainText('Status');
    });

    test('should render all 5 rows', async ({ page }) => {
      const rows = page.locator('[data-testid="table-row"]');
      // May be 0 on mobile (cards view), check on tablet+
      const viewport = page.viewportSize();
      if (viewport && viewport.width >= 640) {
        await expect(rows).toHaveCount(5);
      }
    });

    test('should display record data', async ({ page }) => {
      const rt = page.locator('[data-testid="records-table"]');
      await rt.scrollIntoViewIfNeeded();
      await expect(rt).toContainText('Alice Johnson');
      await expect(rt).toContainText('bob@stellix.dev');
      await expect(rt).toContainText('Engineer');
    });
  });

  test.describe('RecordsTable — Sorting', () => {
    test('sortable columns should have sort indicator', async ({ page }) => {
      const viewport = page.viewportSize();
      if (viewport && viewport.width < 640) return;
      const nameHeader = page.locator('[data-testid="column-header-name"]');
      await nameHeader.scrollIntoViewIfNeeded();
      const icon = nameHeader.locator('svg');
      await expect(icon).toBeVisible();
    });

    test('clicking sortable column should sort data', async ({ page }) => {
      const viewport = page.viewportSize();
      if (viewport && viewport.width < 640) return;
      const nameHeader = page.locator('[data-testid="column-header-name"]');
      await nameHeader.scrollIntoViewIfNeeded();
      await nameHeader.click();
      // First row should be Alice (ascending)
      const firstCell = page.locator('[data-testid="cell-name"]').first();
      await expect(firstCell).toContainText('Alice');
    });

    test('clicking same column again should reverse sort', async ({ page }) => {
      const viewport = page.viewportSize();
      if (viewport && viewport.width < 640) return;
      const nameHeader = page.locator('[data-testid="column-header-name"]');
      await nameHeader.scrollIntoViewIfNeeded();
      await nameHeader.click(); // asc
      await nameHeader.click(); // desc
      const firstCell = page.locator('[data-testid="cell-name"]').first();
      await expect(firstCell).toContainText('Eve');
    });
  });

  test.describe('RecordsTable — Selection', () => {
    test('should have select-all checkbox', async ({ page }) => {
      const viewport = page.viewportSize();
      if (viewport && viewport.width < 640) return;
      const selectAll = page.locator('[data-testid="select-all"]');
      await selectAll.scrollIntoViewIfNeeded();
      await expect(selectAll).toBeVisible();
    });

    test('clicking select-all should show selected count', async ({ page }) => {
      const viewport = page.viewportSize();
      if (viewport && viewport.width < 640) return;
      const selectAll = page.locator('[data-testid="select-all"]');
      await selectAll.scrollIntoViewIfNeeded();
      await selectAll.click();
      const count = page.locator('[data-testid="selected-count"]');
      await expect(count).toContainText('5 selected');
    });

    test('selected row should have accent background', async ({ page }) => {
      const viewport = page.viewportSize();
      if (viewport && viewport.width < 640) return;
      const selectAll = page.locator('[data-testid="select-all"]');
      await selectAll.scrollIntoViewIfNeeded();
      await selectAll.click();
      const row = page.locator('[data-testid="table-row"]').first();
      await expect(row).toHaveClass(/bg-accent/);
    });
  });

  test.describe('RecordsTable — Mobile Cards', () => {
    test('should show card layout on mobile', async ({ page }) => {
      const viewport = page.viewportSize();
      if (viewport && viewport.width >= 640) return;
      const cards = page.locator('[data-testid="record-card"]');
      const count = await cards.count();
      expect(count).toBe(5);
    });
  });

  // ─────────────────────────────────────────
  // FILTER TABLE
  // ─────────────────────────────────────────

  test.describe('FilterTable — Filter Chips', () => {
    test('should render filter table', async ({ page }) => {
      const ft = page.locator('[data-testid="filter-table"]');
      await ft.scrollIntoViewIfNeeded();
      await expect(ft).toBeVisible();
    });

    test('should render filter chips', async ({ page }) => {
      const chips = page.locator('[data-testid="filter-chip"]');
      await expect(chips).toHaveCount(3);
    });

    test('should show filter labels', async ({ page }) => {
      const ft = page.locator('[data-testid="filter-bar"]');
      await ft.scrollIntoViewIfNeeded();
      await expect(ft).toContainText('Active');
      await expect(ft).toContainText('Away');
      await expect(ft).toContainText('Offline');
    });

    test('should show count badges on chips', async ({ page }) => {
      const counts = page.locator('[data-testid="filter-count"]');
      const count = await counts.count();
      expect(count).toBe(3);
    });

    test('should show funnel icon', async ({ page }) => {
      const bar = page.locator('[data-testid="filter-bar"]');
      await bar.scrollIntoViewIfNeeded();
      const icon = bar.locator('svg').first();
      await expect(icon).toBeVisible();
    });

    test('should show result count', async ({ page }) => {
      const rc = page.locator('[data-testid="result-count"]');
      await rc.scrollIntoViewIfNeeded();
      await expect(rc).toContainText('5 of 5 results');
    });
  });

  test.describe('FilterTable — Filtering', () => {
    test('clicking chip should activate it', async ({ page }) => {
      const chip = page.locator('[data-testid="filter-chip"]').first();
      await chip.scrollIntoViewIfNeeded();
      await chip.click();
      await expect(chip).toHaveAttribute('data-active', 'true');
      await expect(chip).toHaveClass(/border-accent/);
    });

    test('activating filter should reduce result count', async ({ page }) => {
      const chip = page.locator('[data-testid="filter-chip"]', { hasText: 'Away' });
      await chip.scrollIntoViewIfNeeded();
      await chip.click();
      const rc = page.locator('[data-testid="result-count"]');
      await expect(rc).toContainText('1 of 5');
    });

    test('should show Clear button when filters active', async ({ page }) => {
      const chip = page.locator('[data-testid="filter-chip"]').first();
      await chip.scrollIntoViewIfNeeded();
      await chip.click();
      const clearBtn = page.locator('[data-testid="clear-filters"]');
      await expect(clearBtn).toBeVisible();
    });

    test('Clear should reset all filters', async ({ page }) => {
      const chip = page.locator('[data-testid="filter-chip"]').first();
      await chip.scrollIntoViewIfNeeded();
      await chip.click();
      const clearBtn = page.locator('[data-testid="clear-filters"]');
      await clearBtn.click();
      const rc = page.locator('[data-testid="result-count"]');
      await expect(rc).toContainText('5 of 5');
    });

    test('clicking active chip should deactivate it', async ({ page }) => {
      const chip = page.locator('[data-testid="filter-chip"]').first();
      await chip.scrollIntoViewIfNeeded();
      await chip.click();
      await expect(chip).toHaveAttribute('data-active', 'true');
      await chip.click();
      await expect(chip).toHaveAttribute('data-active', 'false');
    });
  });

  // ─────────────────────────────────────────
  // RESPONSIVE & STYLING
  // ─────────────────────────────────────────

  test.describe('Table Components — Styling', () => {
    test('diff table should have card styling', async ({ page }) => {
      const dt = page.locator('[data-testid="diff-table"]');
      await dt.scrollIntoViewIfNeeded();
      await expect(dt).toHaveClass(/rounded-xl/);
      await expect(dt).toHaveClass(/shadow-card/);
    });

    test('records table should have card styling', async ({ page }) => {
      const rt = page.locator('[data-testid="records-table"]');
      await rt.scrollIntoViewIfNeeded();
      await expect(rt).toHaveClass(/rounded-xl/);
      await expect(rt).toHaveClass(/shadow-card/);
    });

    test('page should not have horizontal overflow', async ({ page }) => {
      await page.waitForTimeout(500);
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2);
    });
  });
});
