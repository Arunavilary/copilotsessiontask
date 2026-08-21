// Rule Reference: Section 1 - Use ES Module exports
// Rule Reference: Section 3 - Name Page Object files in kebab-case.page.js
// Rule Reference: Section 6 - Encapsulate locators and action workflows inside Page Object classes

/**
 * @module InventoryPage
 * @description Page Object for SauceDemo inventory/products page.
 */

export class InventoryPage {
  /**
   * Creates an instance of InventoryPage.
   * Rule Reference: Section 6 - Pass page to constructor and define locators as class properties.
   * @param {import('@playwright/test').Page} page - Playwright page instance.
   */
  constructor(page) {
    this.page = page;

    // Rule Reference: Section 5 - Use CSS selectors only as last resort; prefer data-test attributes
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    // Rule Reference: Section 5 - getByRole preferred for buttons
    this.addToCartButtons = page.getByRole('button', { name: /add to cart/i });
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  /**
   * Adds the first available item to the cart.
   * Rule Reference: Section 1 - Use native Playwright APIs directly.
   * @returns {Promise<void>}
   */
  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  /**
   * Adds an item to the cart by its index.
   * @param {number} index - Zero-based index of the item.
   * @returns {Promise<void>}
   */
  async addItemToCartByIndex(index) {
    await this.addToCartButtons.nth(index).click();
  }

  /**
   * Navigates to the shopping cart page.
   * @returns {Promise<void>}
   */
  async goToCart() {
    await this.shoppingCartLink.click();
  }
}
