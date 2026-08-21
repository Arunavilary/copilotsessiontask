// Rule Reference: Section 1 - Use ES Module exports
// Rule Reference: Section 3 - Name Page Object files in kebab-case.page.js
// Rule Reference: Section 6 - Encapsulate locators and action workflows inside Page Object classes

/**
 * @module CheckoutStepOnePage
 * @description Page Object for SauceDemo checkout step one (customer information).
 */

export class CheckoutStepOnePage {
  /**
   * Creates an instance of CheckoutStepOnePage.
   * Rule Reference: Section 6 - Pass page to constructor and define locators as class properties.
   * @param {import('@playwright/test').Page} page - Playwright page instance.
   */
  constructor(page) {
    this.page = page;

    // Rule Reference: Section 5 - Prefer getByPlaceholder for form inputs
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Fills in customer information and proceeds to step two.
   * Rule Reference: Section 6 - Composite method for multi-step interaction.
   * @param {string} firstName - Customer first name.
   * @param {string} lastName - Customer last name.
   * @param {string} postalCode - Customer postal/zip code.
   * @returns {Promise<void>}
   */
  async fillCustomerInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }
}
