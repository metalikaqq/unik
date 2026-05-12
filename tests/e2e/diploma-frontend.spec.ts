import AxeBuilder from "@axe-core/playwright";
import { expect, test, type ConsoleMessage, type Page } from "@playwright/test";

const LOCALES = ["uk", "en"] as const;
const ROUTES = ["", "/speakers", "/schedule", "/tickets", "/venue"] as const;

const VIEWPORTS = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1280", width: 1280, height: 800 },
] as const;

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

function attachErrorWatchers(page: Page) {
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

test.describe("diploma-frontend — full a11y + smoke matrix", () => {
  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      for (const vp of VIEWPORTS) {
        const path = `/${locale}${route}`;
        test(`${path} renders cleanly at ${vp.name}`, async ({ page }) => {
          await page.setViewportSize({ width: vp.width, height: vp.height });
          const errors = attachErrorWatchers(page);

          const response = await page.goto(path);
          expect(response?.status()).toBe(200);
          await expect(page.locator("h1, h2").first()).toBeVisible();

          // No horizontal overflow on body
          const overflow = await page.evaluate(() => {
            const html = document.documentElement;
            return html.scrollWidth > html.clientWidth;
          });
          expect(overflow, `${path} has horizontal overflow at ${vp.width}px`).toBe(false);

          // axe scan — fail on serious or critical violations only
          const results = await new AxeBuilder({ page }).analyze();
          const blocking = results.violations.filter(
            (v) => v.impact === "serious" || v.impact === "critical"
          );
          expect(
            blocking,
            `axe violations on ${path}:\n${blocking.map((v) => `${v.impact} — ${v.id}: ${v.help}`).join("\n")}`
          ).toEqual([]);

          expect(errors, errors.join("\n")).toEqual([]);
        });
      }
    }
  }
});

test.describe("diploma-frontend — keyboard tour", () => {
  test("can tab through home page interactive elements without trapping", async ({ page }) => {
    await page.goto("/uk");
    await page.keyboard.press("Tab");
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused).toBeTruthy();

    // Tab 30 times — should walk through nav, hero CTA, marquee buttons, form fields.
    // Confirm focus never falls back to <body> mid-tour (which would mean a focus trap leak).
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press("Tab");
    }
    const tag = await page.evaluate(() => document.activeElement?.tagName);
    expect(tag).not.toBe("BODY");
  });
});

test.describe("diploma-frontend — reduced motion", () => {
  test.use({ colorScheme: "light" });

  test("marquee track sits in idle state when prefers-reduced-motion is reduce", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/uk");

    const track = page.locator("[data-marquee-track]").first();
    await expect(track).toBeVisible();
    // The animate-marquee Tailwind class is conditionally applied; useReducedMotion
    // strips it. The element must not advertise the animation token in its class list.
    const classList = await track.evaluate((el) => Array.from(el.classList));
    expect(classList).not.toContain("animate-marquee");

    await context.close();
  });
});
