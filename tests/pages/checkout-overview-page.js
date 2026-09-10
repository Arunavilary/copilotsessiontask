/** Page Object for SauceDemo's checkout overview and confirmation states. */

const SAUCE_DEMO_TAX_RATE = 0.08;

const parseCurrency = (currencyText) => {
  const numericText = currencyText.replace(/[^0-9.-]/g, '');
  const amount = Number(numericText);

  if (!Number.isFinite(amount)) {
    throw new Error(`Unable to parse currency value: ${currencyText}`);
  }

  return amount;
};

const roundToCents = (amount) => Math.round((amount + Number.EPSILON) * 100) / 100;

class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.overviewContainer = page.locator('.checkout_summary_container');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.itemQuantities = page.locator('.cart_quantity');
    this.itemTotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.successConfirmationContainer = page.locator('.checkout_complete_container');
    this.successConfirmationMessage = page.getByText('Thank you for your order!', { exact: true });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
  }

  async getItemNames() {
    return this.itemNames.allTextContents();
  }

  async getItemQuantities() {
    const quantities = await this.itemQuantities.allTextContents();
    return quantities.map(Number);
  }

  async getItemPrices() {
    const prices = await this.itemPrices.allTextContents();
    return prices.map(parseCurrency);
  }

  async getItemPrice(productName) {
    const item = this.page.locator('.cart_item').filter({ hasText: productName });
    return parseCurrency(await item.locator('.inventory_item_price').textContent());
  }

  async getItemTotal() {
    return parseCurrency(await this.itemTotal.textContent());
  }

  async getTax() {
    return parseCurrency(await this.tax.textContent());
  }

  async getTotal() {
    return parseCurrency(await this.total.textContent());
  }

  async calculateExpectedItemTotal() {
    const prices = await this.getItemPrices();
    const quantities = await this.getItemQuantities();
    return roundToCents(prices.reduce((sum, price, index) => sum + price * quantities[index], 0));
  }

  calculateExpectedTax(itemTotal) {
    return roundToCents(itemTotal * SAUCE_DEMO_TAX_RATE);
  }

  calculateExpectedTotal(itemTotal, tax) {
    return roundToCents(itemTotal + tax);
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutOverviewPage, parseCurrency, roundToCents };