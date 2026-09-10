/**
 * Utility helpers for synchronizing with page and locator states.
 */

/**
 * Waits for a locator to reach the requested state.
 *
 * @param {import('@playwright/test').Locator} locator - Playwright locator to wait for.
 * @param {Object} [options] - Optional waiting configuration.
 * @param {string} [options.state='visible'] - Desired locator state.
 * @param {number} [options.timeout=30000] - Timeout in milliseconds.
 * @param {number} [options.poll=100] - Polling interval in milliseconds.
 * @returns {Promise<import('@playwright/test').Locator>} Resolves to the locator once it is ready.
 */
const waitForElement = async (locator, options = {}) => {
  const {
    state = 'visible',
    timeout = 30000,
    poll = 100,
  } = options;

  if (!locator || typeof locator.waitFor !== 'function') {
    throw new Error('A Playwright locator instance is required.');
  }

  await locator.waitFor({ state, timeout, poll });
  return locator;
};

/**
 * Waits for the page to reach a specified load state.
 *
 * @param {import('@playwright/test').Page} page - Playwright page instance.
 * @param {Object} [options] - Optional waiting configuration.
 * @param {string} [options.state='load'] - Desired page load state.
 * @param {number} [options.timeout=30000] - Timeout in milliseconds.
 * @returns {Promise<import('@playwright/test').Page>} Resolves to the page after the state has completed.
 */
const waitForPageLoad = async (page, options = {}) => {
  const { state = 'load', timeout = 30000 } = options;

  if (!page || typeof page.waitForLoadState !== 'function') {
    throw new Error('A Playwright page instance is required.');
  }

  await page.waitForLoadState(state, { timeout });
  return page;
};

module.exports = {
  waitForElement,
  waitForPageLoad,
};
