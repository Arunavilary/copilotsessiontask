import 'dotenv/config';
import { defineConfig } from '@playwright/test';

/** @type {import('@playwright/test').PlaywrightTestConfig} */
export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: '',
    browserName: 'chromium',
    headless: false,
  },
});