/** Waits until a Playwright locator becomes visible. */
export async function waitForElement(locator, timeout = 30_000) {
  await locator.waitFor({ state: 'visible', timeout });
}

/** Waits for the page load event. */
export async function waitForPageLoad(page, timeout = 30_000) {
  await page.waitForLoadState('load', { timeout });
}