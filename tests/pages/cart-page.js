/** Page Object for SauceDemo's cart page. */

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartContainer = page.locator('.cart_list');
    this.cartItems = page.locator('.cart_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productQuantities = page.locator('.cart_quantity');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async getCartItemNames() {
    return this.productNames.allTextContents();
  }

  async getProductQuantity(productName) {
    const cartItem = this.cartItems.filter({ hasText: productName });
    return Number(await cartItem.locator('.cart_quantity').textContent());
  }

  async isProductInCart(productName) {
    return this.cartItems.filter({ hasText: productName }).isVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };