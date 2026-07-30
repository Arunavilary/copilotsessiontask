class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async open() {
    await this.page.goto('/cart.html');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async getItemNames() {
    return this.cartItems.locator('.inventory_item_name').allTextContents();
  }

  async getItemCount() {
    return this.cartItems.count();
  }
}

module.exports = CartPage;
