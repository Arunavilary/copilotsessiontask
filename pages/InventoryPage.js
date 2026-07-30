class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async open() {
    await this.page.goto('/inventory.html');
  }

  async addItemByName(productName) {
    const item = this.inventoryItems.filter({
      has: this.page.locator('.inventory_item_name', { hasText: productName }),
    });

    await item.getByRole('button').click();
  }

  async addItemsByNames(productNames) {
    for (const productName of productNames) {
      await this.addItemByName(productName);
    }
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }

  async getProductNames() {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getPageTitle() {
    return (await this.pageTitle.textContent())?.trim() ?? '';
  }
}

module.exports = InventoryPage;
