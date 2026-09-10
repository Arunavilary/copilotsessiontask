/**
 * Utility helpers for common Playwright assertions.
 */

const { expect } = require('@playwright/test');

/**
 * Asserts that a locator is visible on the page.
 *
 * @param {import('@playwright/test').Locator} locator - Playwright locator to validate.
 * @param {Object} [options] - Optional assertion configuration.
 * @param {number} [options.timeout=30000] - Timeout in milliseconds.
 * @returns {Promise<boolean>} Resolves to true when the element is visible.
 */
const assertElementVisible = async (locator, options = {}) => {
  const { timeout = 30000 } = options;

  if (!locator || typeof locator.waitFor !== 'function') {
    throw new Error('A Playwright locator instance is required.');
  }

  await locator.waitFor({ state: 'visible', timeout });
  await expect(locator).toBeVisible({ timeout });
  return true;
};

/**
 * Asserts that a locator contains the expected text.
 *
 * @param {import('@playwright/test').Locator} locator - Playwright locator whose text is validated.
 * @param {string} expectedText - Expected text content.
 * @param {Object} [options] - Optional assertion configuration.
 * @param {number} [options.timeout=30000] - Timeout in milliseconds.
 * @returns {Promise<boolean>} Resolves to true when the text matches.
 */
const assertElementText = async (locator, expectedText, options = {}) => {
  const { timeout = 30000 } = options;

  if (!locator || typeof locator.textContent !== 'function') {
    throw new Error('A Playwright locator instance is required.');
  }

  await expect(locator).toHaveText(expectedText, { timeout });
  return true;
};

module.exports = {
  assertElementVisible,
  assertElementText,
};
