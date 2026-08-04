import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
  }

  pageTitle() {
    return this.title;
  }

  itemName(name: string) {
    return this.page.getByText(name);
  }

  quantityForItem(name: string) {
    return this.page.locator('.cart_item').filter({ hasText: name }).locator('.cart_quantity');
  }

  checkout() {
    return this.page.locator('[data-test="checkout"]').click();
  }
}
