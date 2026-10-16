/** Page object for the SauceDemo login page. */
export class LoginPage {
  /** @param {import('@playwright/test').Page} page - Playwright page instance. */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.inventoryList = page.locator('.inventory_list');
  }

  /** Opens SauceDemo's login page. */
  async navigateToLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  /** Enters credentials and submits the login form. */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Reports whether the inventory list appeared after login. */
  async isLoginSuccessful() {
    return this.inventoryList.isVisible();
  }
}