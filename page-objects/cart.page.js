// Rule Reference: Section 1 - Use ES Module exports
// Rule Reference: Section 3 - Name Page Object files in kebab-case.page.js
// Rule Reference: Section 6 - Encapsulate locators and action workflows inside Page Object classes

/**
 * @module CartPage
 * @description Page Object for SauceDemo shopping cart page.
 */

export class CartPage {
  /**
   * Creates an instance of CartPage.
   * Rule Reference: Section 6 - Pass page to constructor and define locators as class properties.
   * @param {import('@playwright/test').Page} page - Playwright page instance.
   */
  constructor(page) {
    this.page = page;

    // Rule Reference: Section 5 - Use data-test attributes for stable locators
    this.cartList = page.locator('[data-test="cart-list"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.removeButtons = page.getByRole('button', { name: /remove/i });
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /**
   * Proceeds to the checkout step one page.
   * Rule Reference: Section 6 - Single-responsibility action method.
   * @returns {Promise<void>}
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Removes the cart item at the specified index.
   * @param {number} [index=0] - Zero-based index of the item to remove.
   * @returns {Promise<void>}
   */
  async removeItemByIndex(index = 0) {
    await this.removeButtons.nth(index).click();
  }
}
