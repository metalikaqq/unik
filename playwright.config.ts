import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3000);
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    ...(isCI ? [] : [{ name: "webkit", use: { ...devices["Desktop Safari"] } }]),
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        // Dev mode is required because the /dev/components showcase route
        // calls notFound() when NODE_ENV === "production" (see src/app/dev/components/page.tsx).
        // `next dev` sets NODE_ENV=development, making the route reachable.
        command: `next dev --port ${PORT}`,
        url: BASE_URL,
        reuseExistingServer: !isCI,
        timeout: 120_000,
      },
});
