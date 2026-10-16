import { expect } from '@playwright/test';

/** Asserts that a locator is visible. */
export async function assertElementVisible(locator) {
  await expect(locator).toBeVisible();
}

/** Asserts that a locator contains the expected text. */
export async function assertElementText(locator, expectedText) {
  await expect(locator).toHaveText(expectedText);
}