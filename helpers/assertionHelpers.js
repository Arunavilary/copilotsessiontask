/**
 * @module assertionHelpers
 * @description Reusable assertion wrappers built on top of Playwright's expect API.
 */

const { expect } = require('@playwright/test');

/**
 * Asserts that the current page URL matches the expected URL or pattern.
 * @param {import('@playwright/test').Page} page - Playwright page object.
 * @param {string | RegExp} expectedUrl - The expected URL string or regex pattern.
 * @returns {Promise<void>}
 */
const assertNavigation = async (page, expectedUrl) => {
  await expect(page).toHaveURL(expectedUrl);
};

/**
 * Asserts that a locator is visible in the viewport.
 * @param {import('@playwright/test').Locator} locator - Playwright locator for the element.
 * @returns {Promise<void>}
 */
const assertElementVisible = async (locator) => {
  await expect(locator).toBeVisible();
};

/**
 * Asserts that a locator is hidden or not present in the DOM.
 * @param {import('@playwright/test').Locator} locator - Playwright locator for the element.
 * @returns {Promise<void>}
 */
const assertElementHidden = async (locator) => {
  await expect(locator).toBeHidden();
};

/**
 * Asserts that an element contains the expected text content.
 * @param {import('@playwright/test').Locator} locator - Playwright locator for the element.
 * @param {string | RegExp} expectedText - Expected text or regex.
 * @returns {Promise<void>}
 */
const assertTextContent = async (locator, expectedText) => {
  await expect(locator).toContainText(expectedText);
};

/**
 * Asserts that an input element has the specified value.
 * @param {import('@playwright/test').Locator} locator - Playwright locator for the input.
 * @param {string} expectedValue - The expected input value.
 * @returns {Promise<void>}
 */
const assertInputValue = async (locator, expectedValue) => {
  await expect(locator).toHaveValue(expectedValue);
};

/**
 * Asserts that the page title matches the expected title.
 * @param {import('@playwright/test').Page} page - Playwright page object.
 * @param {string | RegExp} expectedTitle - Expected page title or regex.
 * @returns {Promise<void>}
 */
const assertPageTitle = async (page, expectedTitle) => {
  await expect(page).toHaveTitle(expectedTitle);
};

/**
 * Asserts that an element is enabled and ready for interaction.
 * @param {import('@playwright/test').Locator} locator - Playwright locator for the element.
 * @returns {Promise<void>}
 */
const assertElementEnabled = async (locator) => {
  await expect(locator).toBeEnabled();
};

/**
 * Asserts that an element has a specific attribute value.
 * @param {import('@playwright/test').Locator} locator - Playwright locator for the element.
 * @param {string} attribute - The attribute name.
 * @param {string | RegExp} expectedValue - The expected attribute value.
 * @returns {Promise<void>}
 */
const assertAttribute = async (locator, attribute, expectedValue) => {
  await expect(locator).toHaveAttribute(attribute, expectedValue);
};

module.exports = {
  assertNavigation,
  assertElementVisible,
  assertElementHidden,
  assertTextContent,
  assertInputValue,
  assertPageTitle,
  assertElementEnabled,
  assertAttribute,
};
