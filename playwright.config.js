const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/specs',
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  reporter: [['html']],
  use: {
    browserName: 'chromium',
    headless: false,
    baseURL: '',
    // SauceDemo uses data-test for its stable test attributes.
    testIdAttribute: 'data-test',
  },
});
