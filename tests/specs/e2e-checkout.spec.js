require('dotenv/config');

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { InventoryPage } = require('../pages/inventory-page');
const { CartPage } = require('../pages/cart-page');
const { CheckoutPage } = require('../pages/checkout-page');
const { CheckoutOverviewPage } = require('../pages/checkout-overview-page');

const products = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
];

const buyerInformation = {
  firstName: 'Test',
  lastName: 'User',
  postalCode: '12345',
};

test('should complete e-commerce checkout successfully', async ({ page }) => {
  // Guardrail: credentials come from environment variables, never source-code literals.
  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;
  if (!username || !password) {
    throw new Error('TEST_USERNAME and TEST_PASSWORD must be set in .env before running this test.');
  }

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.login(username, password);
  await expect(inventoryPage.inventoryContainer).toBeVisible();
  await expect(await loginPage.isLoginSuccessful()).toBe(true);

  await inventoryPage.addMultipleProductsToCart(products);
  await expect(inventoryPage.cartBadge).toHaveText(String(products.length));
  await expect(inventoryPage.productItems.filter({ hasText: products[0] })).toBeVisible();
  await expect(inventoryPage.productItems.filter({ hasText: products[1] })).toBeVisible();

  await inventoryPage.goToCart();
  await expect(cartPage.cartContainer).toBeVisible();
  await expect(cartPage.cartItems).toHaveCount(products.length);
  await expect(await cartPage.getCartItemNames()).toEqual(products);
  for (const productName of products) {
    await expect(await cartPage.isProductInCart(productName)).toBe(true);
    await expect(await cartPage.getProductQuantity(productName)).toBe(1);
  }

  await cartPage.proceedToCheckout();
  await checkoutPage.fillBuyerInformation(
    buyerInformation.firstName,
    buyerInformation.lastName,
    buyerInformation.postalCode,
  );
  await expect(checkoutPage.firstNameInput).toHaveValue(buyerInformation.firstName);
  await expect(checkoutPage.lastNameInput).toHaveValue(buyerInformation.lastName);
  await expect(checkoutPage.postalCodeInput).toHaveValue(buyerInformation.postalCode);
  await checkoutPage.continueToOverview();

  await expect(checkoutOverviewPage.overviewContainer).toBeVisible();
  await expect(await checkoutOverviewPage.getItemNames()).toEqual(products);
  await expect(await checkoutOverviewPage.getItemQuantities()).toEqual([1, 1]);
  await expect(await checkoutOverviewPage.getItemPrice(products[0])).toBe(29.99);
  await expect(await checkoutOverviewPage.getItemPrice(products[1])).toBe(9.99);

  const expectedItemTotal = await checkoutOverviewPage.calculateExpectedItemTotal();
  const expectedTax = checkoutOverviewPage.calculateExpectedTax(expectedItemTotal);
  const expectedTotal = checkoutOverviewPage.calculateExpectedTotal(expectedItemTotal, expectedTax);
  await expect(await checkoutOverviewPage.getItemTotal()).toBe(expectedItemTotal);
  await expect(await checkoutOverviewPage.getTax()).toBe(expectedTax);
  await expect(await checkoutOverviewPage.getTotal()).toBe(expectedTotal);

  await checkoutOverviewPage.finishOrder();
  await expect(checkoutOverviewPage.successConfirmationContainer).toBeVisible();
  await expect(checkoutOverviewPage.successConfirmationMessage).toBeVisible();
  await expect(checkoutOverviewPage.successConfirmationMessage).toHaveText('Thank you for your order!');
});