/** Page Object for SauceDemo's login page. */

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    // The requested success signal is the inventory list, not inventory_container.
    this.inventoryList = page.locator('.inventory_list');
  }

  async navigateToLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isLoginSuccessful() {
    return this.inventoryList.isVisible();
  }
}

module.exports = { LoginPage };