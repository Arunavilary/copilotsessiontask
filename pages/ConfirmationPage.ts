import { Page, Locator } from '@playwright/test';

export class ConfirmationPage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;
  readonly ponyExpressImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('#back-to-products');
    this.ponyExpressImage = page.locator('.pony_express');
  }

  async getConfirmationMessage(): Promise<string> {
    return await this.completeHeader.textContent() || '';
  }

  async getCompleteText(): Promise<string> {
    return await this.completeText.textContent() || '';
  }

  async isOrderComplete(): Promise<boolean> {
    const message = await this.getConfirmationMessage();
    return message.toLowerCase().includes('thank you for your order');
  }

  async isSuccessImageVisible(): Promise<boolean> {
    return await this.ponyExpressImage.isVisible();
  }

  async backToProducts() {
    await this.backHomeButton.click();
    await this.page.waitForURL('**/inventory.html');
  }
}
