/** Page Object for SauceDemo's checkout information page. */

class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance.
   */
  constructor(page) {
    this.page = page;

    // SauceDemo exposes stable data-test attributes for these unlabeled inputs.
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  /**
   * Fills buyer information with non-sensitive test data.
   * @param {string} firstName - Buyer's first name.
   * @param {string} lastName - Buyer's last name.
   * @param {string} postalCode - Buyer's postal code.
   */
  async fillBuyerInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /** Advances after Playwright auto-waits for the enabled Continue button. */
  async continueToOverview() {
    await this.continueButton.click();
  }
}

module.exports = {
  CheckoutPage,
};