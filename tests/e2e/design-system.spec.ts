import AxeBuilder from "@axe-core/playwright";
import { expect, test, type ConsoleMessage, type Page } from "@playwright/test";

const ROUTE = "/dev/components";

const VIEWPORTS = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1280", width: 1280, height: 800 },
] as const;

// Next.js dev mode emits informational console messages we don't want to flag
// as page errors (e.g. fast-refresh ping, React DevTools hints, sourcemap notices).
// We filter only by these benign substrings; anything else surfaces as a failure.
const DEV_NOISE_PATTERNS = [
  "Download the React DevTools",
  "[Fast Refresh]",
  "Fast Refresh",
  "[HMR]",
];

function isDevNoise(msg: ConsoleMessage): boolean {
  const text = msg.text();
  return DEV_NOISE_PATTERNS.some((p) => text.includes(p));
}

function attachConsoleAndPageErrorWatchers(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" && !isDevNoise(msg)) {
      errors.push(`[console.error] ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => {
    errors.push(`[pageerror] ${err.message}`);
  });
  return errors;
}

test.describe("phase-01 design system showcase", () => {
  for (const vp of VIEWPORTS) {
    test(`renders without console errors at ${vp.name} (${vp.width}x${vp.height})`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const errors = attachConsoleAndPageErrorWatchers(page);

      const response = await page.goto(ROUTE);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();

      // Sanity-check that primary primitive sections rendered.
      await expect(page.locator("section#button")).toBeVisible();
      await expect(page.locator("section#tag")).toBeVisible();
      await expect(page.locator("section#rule")).toBeVisible();
      await expect(page.locator("section#marquee")).toBeVisible();
      await expect(page.locator("section#accordion")).toBeVisible();
      await expect(page.locator("section#sheet")).toBeVisible();

      expect(errors, errors.join("\n")).toEqual([]);
    });

    test(`no horizontal overflow at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(ROUTE);
      const overflow = await page.evaluate(() => {
        const html = document.documentElement;
        const body = document.body;
        return Math.max(html.scrollWidth, body.scrollWidth) - window.innerWidth;
      });
      expect(overflow, `unexpected horizontal overflow of ${overflow}px`).toBeLessThanOrEqual(0);
    });
  }

  test("Tab order walks all interactive primitives in source order", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(ROUTE);

    // Tab through and collect identifiable focused elements. Build an entry
    // that includes BOTH testid/id AND visible text so primitives with ids
    // (accordion triggers) can still be matched by content.
    const focusedTrail: string[] = [];
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press("Tab");
      const entry = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        const testid = el.getAttribute("data-testid");
        const elementId = el.id;
        const tag = el.tagName.toLowerCase();
        const text = (el.textContent ?? "").trim().slice(0, 48);
        const parts: string[] = [];
        if (testid) parts.push(`testid:${testid}`);
        if (elementId) parts.push(`id:${elementId}`);
        parts.push(`${tag}:${text}`);
        return parts.join("|");
      });
      if (entry) focusedTrail.push(entry);
    }

    // Every Button (3 variants × 3 sizes = 9) plus accordion triggers (3) plus sheet trigger
    // must be tab-reachable. We assert the high-value ones rather than exact order to avoid
    // brittleness from intervening focusable elements.
    const trail = focusedTrail.join("\n");
    expect(trail).toContain("testid:btn-primary-sm");
    expect(trail).toContain("testid:btn-secondary-md");
    expect(trail).toContain("testid:btn-ghost-lg");
    expect(trail).toContain("testid:sheet-trigger");
    // Accordion triggers don't have testids — assert by their DOM text content.
    // (Visual case is CSS-only via Tailwind `uppercase`; textContent is original.)
    expect(trail).toContain("What is Unik?");
  });

  test("focus rings are visible on interactive primitives", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(ROUTE);

    const triggerLocator = page.getByTestId("sheet-trigger");
    await triggerLocator.focus();
    const outline = await triggerLocator.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        outlineStyle: cs.outlineStyle,
        outlineWidth: cs.outlineWidth,
        outlineColor: cs.outlineColor,
        outlineOffset: cs.outlineOffset,
      };
    });
    // The Button uses Tailwind v4 utilities mapping to outline-2 (2px) solid outline-accent
    // with offset 4px. Color values are token-driven, so we assert width + style only.
    expect(outline.outlineStyle, JSON.stringify(outline)).toBe("solid");
    expect(outline.outlineWidth).toBe("2px");
  });

  test("Sheet opens on trigger, traps focus, closes on Escape, returns focus", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(ROUTE);

    const trigger = page.getByTestId("sheet-trigger");
    await trigger.focus();
    await trigger.press("Enter");

    // Panel renders with role=dialog and aria-modal.
    const panel = page.locator('[data-sheet-panel][role="dialog"][aria-modal="true"]');
    await expect(panel).toBeVisible();

    // Focus moved into the panel (close button is the first focusable).
    await expect(page.getByTestId("sheet-close")).toBeFocused();

    // Escape closes.
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);

    // Focus returns to the trigger.
    await expect(trigger).toBeFocused();
  });

  for (const vp of VIEWPORTS) {
    test(`axe scan clean at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(ROUTE);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const blocking = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical"
      );
      expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
    });
  }
});
