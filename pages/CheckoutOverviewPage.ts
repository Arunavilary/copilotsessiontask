import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
  }

  async getSubtotal(): Promise<number> {
    const text = await this.subtotalLabel.textContent();
    const match = text?.match(/\$(\d+\.\d+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async getTax(): Promise<number> {
    const text = await this.taxLabel.textContent();
    const match = text?.match(/\$(\d+\.\d+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async getTotal(): Promise<number> {
    const text = await this.totalLabel.textContent();
    const match = text?.match(/\$(\d+\.\d+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async getItemNames(): Promise<string[]> {
    const itemNames: string[] = [];
    const count = await this.cartItems.count();
    
    for (let i = 0; i < count; i++) {
      const item = this.cartItems.nth(i);
      const name = await item.locator('.inventory_item_name').textContent();
      if (name) itemNames.push(name);
    }
    
    return itemNames;
  }

  async verifyTotalCalculation(): Promise<boolean> {
    const subtotal = await this.getSubtotal();
    const tax = await this.getTax();
    const total = await this.getTotal();
    const expectedTotal = parseFloat((subtotal + tax).toFixed(2));
    return Math.abs(total - expectedTotal) < 0.01;
  }

  async finishOrder() {
    await this.finishButton.click();
    await this.page.waitForURL('**/checkout-complete.html');
  }

  async cancel() {
    await this.cancelButton.click();
    await this.page.waitForURL('**/inventory.html');
  }
}
