import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.removeButtons = page.locator('[id^="remove-"]');
  }

  async getCartItemNames(): Promise<string[]> {
    const itemNames: string[] = [];
    const count = await this.cartItems.count();
    
    for (let i = 0; i < count; i++) {
      const item = this.cartItems.nth(i);
      const name = await item.locator('.inventory_item_name').textContent();
      if (name) itemNames.push(name);
    }
    
    return itemNames;
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async isItemInCart(itemName: string): Promise<boolean> {
    const items = await this.getCartItemNames();
    return items.includes(itemName);
  }

  async getItemQuantity(itemName: string): Promise<number> {
    const item = this.page.locator('.cart_item', { hasText: itemName });
    const quantityText = await item.locator('.cart_quantity').textContent();
    return parseInt(quantityText || '1', 10);
  }

  async removeItem(itemName: string) {
    const item = this.page.locator('.cart_item', { hasText: itemName });
    const removeButton = item.locator('[id^="remove-"]');
    await removeButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
    await this.page.waitForURL('**/inventory.html');
  }
}
