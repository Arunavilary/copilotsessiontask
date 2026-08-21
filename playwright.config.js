// Rule Reference: Section 1 - Use ES Module imports, never CommonJS
import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

// Rule Reference: Section 9 - Keep configurations centralized in playwright.config.js
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
