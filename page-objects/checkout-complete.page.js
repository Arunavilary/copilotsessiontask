// Rule Reference: Section 1 - Use ES Module exports
// Rule Reference: Section 3 - Name Page Object files in kebab-case.page.js
// Rule Reference: Section 6 - Encapsulate locators and action workflows inside Page Object classes

/**
 * @module CheckoutCompletePage
 * @description Page Object for SauceDemo checkout complete/confirmation page.
 */

export class CheckoutCompletePage {
  /**
   * Creates an instance of CheckoutCompletePage.
   * Rule Reference: Section 6 - Pass page to constructor and define locators as class properties.
   * @param {import('@playwright/test').Page} page - Playwright page instance.
   */
  constructor(page) {
    this.page = page;

    // Rule Reference: Section 5 - Use data-test attributes for stable locators
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.ponyExpressImage = page.locator('[data-test="pony-express"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Returns the completion header locator for assertion in test specs.
   * Rule Reference: Section 6 - Keep assertions out of Page Objects; return locator for spec usage.
   * @returns {import('@playwright/test').Locator} The completion header locator.
   */
  getCompletionHeader() {
    return this.completeHeader;
  }

  /**
   * Navigates back to the products/inventory page.
   * @returns {Promise<void>}
   */
  async backToHome() {
    await this.backHomeButton.click();
  }
}
