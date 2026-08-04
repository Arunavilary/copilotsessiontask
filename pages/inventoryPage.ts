import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  shoppingCartBadge() {
    return this.cartBadge;
  }

  addItemByTestId(testId: string) {
    return this.page.locator(`[data-test="${testId}"]`).click();
  }

  openCart() {
    return this.page.locator('.shopping_cart_link').click();
  }
}
