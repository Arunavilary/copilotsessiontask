// Rule Reference: Section 1 - Use ES Module exports
// Rule Reference: Section 3 - Name Page Object files in kebab-case.page.js
// Rule Reference: Section 6 - Encapsulate locators and action workflows inside Page Object classes

/**
 * @module CheckoutStepTwoPage
 * @description Page Object for SauceDemo checkout step two (order summary/overview).
 */

export class CheckoutStepTwoPage {
  /**
   * Creates an instance of CheckoutStepTwoPage.
   * Rule Reference: Section 6 - Pass page to constructor and define locators as class properties.
   * @param {import('@playwright/test').Page} page - Playwright page instance.
   */
  constructor(page) {
    this.page = page;

    // Rule Reference: Section 5 - Use data-test attributes for stable locators
    this.summaryInfo = page.locator('[data-test="checkout-summary-container"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  /**
   * Completes the checkout by clicking the Finish button.
   * Rule Reference: Section 6 - Single-responsibility action method.
   * @returns {Promise<void>}
   */
  async finishCheckout() {
    await this.finishButton.click();
  }
}
