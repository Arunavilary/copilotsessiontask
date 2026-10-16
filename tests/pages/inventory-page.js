/** Page object for the SauceDemo product inventory. */
export class InventoryPage {
  /** @param {import('@playwright/test').Page} page - Playwright page instance. */
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.productNames = this.inventoryItems.locator('.inventory_item_name');
    this.productPrices = this.inventoryItems.locator('.inventory_item_price');
    this.addToCartButtons = this.inventoryItems.getByRole('button', { name: 'Add to cart' });
    this.cartLink = page.getByRole('button', { name: /^Cart(?:,|$)/ });
    this.cartItemCountBadge = page.locator('.shopping_cart_badge');
  }

  /** Finds an inventory card by its exact visible product name. */
  getProductItem(productName) {
    return this.inventoryItems.filter({
      has: this.page.locator('.inventory_item_name').getByText(productName, { exact: true }),
    });
  }

  /** Reads a product's displayed name and price before adding it to the cart. */
  async getProductDetails(productName) {
    const product = this.getProductItem(productName);
    return {
      name: await product.locator('.inventory_item_name').innerText(),
      price: await product.locator('.inventory_item_price').innerText(),
    };
  }

  /** Adds the product identified by its visible name to the cart. */
  async addProductToCart(productName) {
    await this.getProductItem(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  /** Returns the cart badge count, or zero when empty. */
  async getCartItemCount() {
    if (await this.cartItemCountBadge.count() === 0) {
      return 0;
    }
    return Number(await this.cartItemCountBadge.innerText());
  }

  /** Opens the shopping cart. */
  async navigateToShoppingCart() {
    await this.cartLink.click();
  }

  /** Reports whether the inventory list is displayed. */
  async isInventoryDisplayed() {
    return this.inventoryList.isVisible();
  }
}