// Rule Reference: Section 1 - Use ES Module exports
// Rule Reference: Section 3 - Name Page Object files in kebab-case.page.js
// Rule Reference: Section 6 - Encapsulate locators and action workflows inside Page Object classes

/**
 * @module LoginPage
 * @description Page Object for SauceDemo login page.
 */

export class LoginPage {
  /**
   * Creates an instance of LoginPage.
   * Rule Reference: Section 6 - Pass page to constructor and define locators as class properties.
   * @param {import('@playwright/test').Page} page - Playwright page instance.
   */
  constructor(page) {
    this.page = page;

    // Rule Reference: Section 5 - Prefer accessible locators: getByPlaceholder, getByRole
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the login page.
   * Rule Reference: Section 9 - Use relative paths with baseURL from config.
   * @returns {Promise<void>}
   */
  async navigate() {
    await this.page.goto('/');
  }

  /**
   * Performs login with provided credentials.
   * Rule Reference: Section 6 - Move multi-step interactions into composite methods.
   * Rule Reference: Section 4 - Credentials passed as parameters, not hardcoded.
   * @param {string} username - The username.
   * @param {string} password - The password.
   * @returns {Promise<void>}
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
