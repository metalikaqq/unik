import { expect, test } from "@playwright/test";

// US-007 — Sheet primitive: focus-trapped, Esc-dismissable, backdrop-click-dismissable.
// Acceptance criteria covered here (E2E layer; unit-level coverage lives in
// tests/unit/components/ui/Sheet.test.tsx):
//   - focus moves into the panel on open
//   - focus returns to the trigger on close
//   - focus is trapped inside while open
//   - Esc closes
//   - backdrop click closes
//   - ARIA: role="dialog", aria-modal="true", aria-labelledby points to the title

const ROUTE = "/dev/components";

test.describe("US-007 Sheet primitive", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const response = await page.goto(ROUTE);
    expect(response?.status()).toBe(200);
  });

  test("renders trigger with correct ARIA initial state", async ({ page }) => {
    const trigger = page.getByTestId("sheet-trigger");
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("opens on trigger click and moves focus into the panel", async ({ page }) => {
    const trigger = page.getByTestId("sheet-trigger");
    await trigger.click();

    const panel = page.locator('[data-sheet-panel][role="dialog"][aria-modal="true"]');
    await expect(panel).toBeVisible();

    // aria-labelledby resolves to a real heading inside the panel.
    const labelledBy = await panel.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    await expect(page.locator(`#${labelledBy}`)).toBeVisible();

    // Focus moved to the first focusable inside the panel (the close button).
    await expect(page.getByTestId("sheet-close")).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  test("Escape closes the sheet and returns focus to the trigger", async ({ page }) => {
    const trigger = page.getByTestId("sheet-trigger");
    await trigger.focus();
    await trigger.press("Enter");

    const panel = page.locator('[data-sheet-panel][role="dialog"][aria-modal="true"]');
    await expect(panel).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("backdrop click closes the sheet", async ({ page }) => {
    const trigger = page.getByTestId("sheet-trigger");
    await trigger.click();

    const panel = page.locator('[data-sheet-panel][role="dialog"][aria-modal="true"]');
    await expect(panel).toBeVisible();

    // Click the backdrop directly (not the panel). The backdrop is a sibling
    // overlay element marked with data-sheet-backdrop. We click at a position
    // outside the panel bounds to ensure the click target is the backdrop.
    const backdrop = page.locator("[data-sheet-backdrop]");
    await expect(backdrop).toBeVisible();
    const panelBox = await panel.boundingBox();
    expect(panelBox).not.toBeNull();
    // Right-positioned panel by default — click far to the left of its left edge.
    const clickX = Math.max(8, Math.floor((panelBox?.x ?? 100) / 2));
    const clickY = Math.floor((panelBox?.y ?? 0) + (panelBox?.height ?? 0) / 2);
    await page.mouse.click(clickX, clickY);

    await expect(panel).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("Tab is trapped inside the panel while open", async ({ page }) => {
    const trigger = page.getByTestId("sheet-trigger");
    await trigger.click();

    const panel = page.locator('[data-sheet-panel][role="dialog"][aria-modal="true"]');
    await expect(panel).toBeVisible();
    const close = page.getByTestId("sheet-close");
    await expect(close).toBeFocused();

    // First focusable is sheet-close, second is the Cancel button (variant="secondary"),
    // and Tab should wrap back from the last focusable to the first.
    await page.keyboard.press("Tab");
    const isInsidePanelAfterFirstTab = await page.evaluate(() => {
      const active = document.activeElement;
      const panel = document.querySelector('[data-sheet-panel]');
      return Boolean(panel && active && panel.contains(active));
    });
    expect(isInsidePanelAfterFirstTab).toBe(true);

    // Tab once more — wraps within the panel (not out to the page).
    await page.keyboard.press("Tab");
    const isInsidePanelAfterSecondTab = await page.evaluate(() => {
      const active = document.activeElement;
      const panel = document.querySelector('[data-sheet-panel]');
      return Boolean(panel && active && panel.contains(active));
    });
    expect(isInsidePanelAfterSecondTab).toBe(true);

    // Shift+Tab from the first focusable wraps to the last — still inside the panel.
    await close.focus();
    await page.keyboard.press("Shift+Tab");
    const isInsidePanelAfterShiftTab = await page.evaluate(() => {
      const active = document.activeElement;
      const panel = document.querySelector('[data-sheet-panel]');
      return Boolean(panel && active && panel.contains(active));
    });
    expect(isInsidePanelAfterShiftTab).toBe(true);
  });
});
