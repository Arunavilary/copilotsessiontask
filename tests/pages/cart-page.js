/** Page object for the SauceDemo shopping cart. */
export class CartPage {
  /** @param {import('@playwright/test').Page} page - Playwright page instance. */
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.productNames = this.cartItems.locator('.inventory_item_name');
    this.productPrices = this.cartItems.locator('.inventory_item_price');
    this.productQuantities = this.cartItems.locator('.cart_quantity');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  /** Reads all cart rows for exact content and quantity verification. */
  async getCartItemDetails() {
    const itemCount = await this.cartItems.count();
    const items = [];

    for (let index = 0; index < itemCount; index += 1) {
      const item = this.cartItems.nth(index);
      items.push({
        name: await item.locator('.inventory_item_name').innerText(),
        price: await item.locator('.inventory_item_price').innerText(),
        quantity: Number(await item.locator('.cart_quantity').innerText()),
      });
    }

    return items;
  }

  /** Proceeds to the checkout information form. */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}