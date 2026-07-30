class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async open() {
    await this.page.goto('/checkout-complete.html');
  }

  async getConfirmationMessage() {
    return (await this.completeHeader.textContent())?.trim() ?? '';
  }

  async goBackHome() {
    await this.backHomeButton.click();
  }
}

module.exports = CheckoutCompletePage;
