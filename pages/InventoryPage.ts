import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async addItemToCart(itemName: string) {
    const item = this.page.locator('.inventory_item', { hasText: itemName });
    const addButton = item.getByRole('button', { name: /add to cart/i });
    await addButton.click();
  }

  async addMultipleItemsToCart(itemNames: string[]) {
    for (const itemName of itemNames) {
      await this.addItemToCart(itemName);
    }
  }

  async getCartItemCount(): Promise<number> {
    const isVisible = await this.shoppingCartBadge.isVisible();
    if (!isVisible) return 0;
    const count = await this.shoppingCartBadge.textContent();
    return parseInt(count || '0', 10);
  }

  async goToCart() {
    await this.shoppingCartLink.click();
    await this.page.waitForURL('**/cart.html');
  }

  async getItemPrice(itemName: string): Promise<number> {
    const item = this.page.locator('.inventory_item', { hasText: itemName });
    const priceText = await item.locator('.inventory_item_price').textContent();
    return parseFloat(priceText?.replace('$', '') || '0');
  }
}
