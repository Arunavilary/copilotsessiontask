/** Page object for the SauceDemo order-completion page. */
export class OrderCompletionPage {
  /** @param {import('@playwright/test').Page} page - Playwright page instance. */
  constructor(page) {
    this.orderConfirmationHeading = page.getByRole('heading', { name: 'Thank you for your order!' });
    this.orderCompletionMessage = page.getByText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
      { exact: true },
    );
  }

  /** Reports whether both order-completion confirmation elements are visible. */
  async isOrderCompleted() {
    const [headingVisible, messageVisible] = await Promise.all([
      this.orderConfirmationHeading.isVisible(),
      this.orderCompletionMessage.isVisible(),
    ]);
    return headingVisible && messageVisible;
  }
}