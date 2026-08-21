// Rule Reference: Section 1 - Use ES Module imports, never CommonJS
// Rule Reference: Section 7 - Use auto-retrying web-first assertions
// Rule Reference: Section 11 - Add JSDoc comments to functions

import { expect } from '@playwright/test';

/**
 * @module assertion-helpers
 * @description Reusable web-first assertion functions for test specs.
 */

/**
 * Verifies that a locator element is visible using web-first assertion.
 * Rule Reference: Section 7 - Always use auto-retrying assertions.
 * @param {import('@playwright/test').Locator} locator - The element locator.
 * @returns {Promise<void>}
 */
export const verifyElementIsVisible = async (locator) => {
  await expect(locator).toBeVisible();
};

/**
 * Verifies that a locator element is hidden or not present.
 * @param {import('@playwright/test').Locator} locator - The element locator.
 * @returns {Promise<void>}
 */
export const verifyElementIsHidden = async (locator) => {
  await expect(locator).toBeHidden();
};

/**
 * Verifies that an element contains the expected text.
 * @param {import('@playwright/test').Locator} locator - The element locator.
 * @param {string | RegExp} expectedText - The expected text content.
 * @returns {Promise<void>}
 */
export const verifyTextContent = async (locator, expectedText) => {
  await expect(locator).toContainText(expectedText);
};

/**
 * Verifies the page URL matches the expected pattern.
 * @param {import('@playwright/test').Page} page - Playwright page instance.
 * @param {string | RegExp} expectedUrl - Expected URL or pattern.
 * @returns {Promise<void>}
 */
export const verifyPageUrl = async (page, expectedUrl) => {
  await expect(page).toHaveURL(expectedUrl);
};

/**
 * Verifies that a locator has a specific count of elements.
 * @param {import('@playwright/test').Locator} locator - The element locator.
 * @param {number} count - Expected count.
 * @returns {Promise<void>}
 */
export const verifyElementCount = async (locator, count) => {
  await expect(locator).toHaveCount(count);
};
