/** Page object for the SauceDemo checkout information form. */
export class CheckoutPage {
  /** @param {import('@playwright/test').Page} page - Playwright page instance. */
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.checkoutInformationHeading = page.getByText('Checkout: Your Information', { exact: true });
  }

  /** Fills buyer information and advances to the checkout overview. */
  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }
}