/** Page object for the SauceDemo checkout overview. */
export class CheckoutOverviewPage {
  /** @param {import('@playwright/test').Page} page - Playwright page instance. */
  constructor(page) {
    this.page = page;
    this.overviewItems = page.locator('.cart_item');
    this.productNames = this.overviewItems.locator('.inventory_item_name');
    this.productPrices = this.overviewItems.locator('.inventory_item_price');
    this.productQuantities = this.overviewItems.locator('.cart_quantity');
    this.itemSubtotal = page.getByText(/^Item total:/);
    this.taxAmount = page.getByText(/^Tax:/);
    this.finalTotal = page.getByText(/^Total:/);
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.overviewHeading = page.getByText('Checkout: Overview', { exact: true });
  }

  /** Reads each overview row's product name, displayed price, and quantity. */
  async getOverviewItemDetails() {
    const itemCount = await this.overviewItems.count();
    const items = [];

    for (let index = 0; index < itemCount; index += 1) {
      const item = this.overviewItems.nth(index);
      items.push({
        name: await item.locator('.inventory_item_name').innerText(),
        price: await item.locator('.inventory_item_price').innerText(),
        quantity: Number(await item.locator('.cart_quantity').innerText()),
      });
    }

    return items;
  }

  /** Returns displayed subtotal, tax, and total labels, including their values. */
  async getPriceSummary() {
    return {
      itemSubtotal: await this.itemSubtotal.innerText(),
      tax: await this.taxAmount.innerText(),
      total: await this.finalTotal.innerText(),
    };
  }

  /** Submits the reviewed order. */
  async finishOrder() {
    await this.finishButton.click();
  }
}