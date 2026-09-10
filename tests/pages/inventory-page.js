/** Page Object for SauceDemo's inventory page. */

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_list');
    this.productItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.addToCartButtons = page.getByRole('button', { name: /add to cart/i });
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async addProductToCart(productName) {
    const productItem = this.productItems.filter({ hasText: productName });
    await productItem.getByRole('button', { name: /add to cart/i }).click();
  }

  async addMultipleProductsToCart(productNames) {
    for (const productName of productNames) {
      await this.addProductToCart(productName);
    }
  }

  async getCartItemCount() {
    return Number(await this.cartBadge.textContent());
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }
}

module.exports = { InventoryPage };