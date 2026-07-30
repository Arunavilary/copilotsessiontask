class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemTotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
  }

  async open() {
    await this.page.goto('/checkout-step-two.html');
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async getSummaryValues() {
    return {
      itemTotal: (await this.itemTotalLabel.textContent())?.trim() ?? '',
      tax: (await this.taxLabel.textContent())?.trim() ?? '',
      total: (await this.totalLabel.textContent())?.trim() ?? '',
    };
  }
}

module.exports = CheckoutOverviewPage;
