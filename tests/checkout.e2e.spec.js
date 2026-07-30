const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const CheckoutOverviewPage = require('../pages/CheckoutOverviewPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');

test('completes the SauceDemo checkout flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addItemsByNames(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
  await inventoryPage.openCart();

  const cartItemNames = await cartPage.getItemNames();
  expect(cartItemNames).toEqual(expect.arrayContaining(['Sauce Labs Backpack', 'Sauce Labs Bike Light']));

  await cartPage.proceedToCheckout();
  await checkoutPage.fillCustomerInfo('John', 'Doe', '560001');
  await checkoutPage.continueToOverview();

 const summary = await checkoutOverviewPage.getSummaryValues();

const itemTotal = parseFloat(summary.itemTotal.replace('Item total: $', ''));
const tax = parseFloat(summary.tax.replace('Tax: $', ''));
const total = parseFloat(summary.total.replace('Total: $', ''));

expect(itemTotal).toBeGreaterThan(0);
expect(tax).toBeGreaterThan(0);
expect(total).toBeGreaterThan(0);

expect(total).toBeCloseTo(itemTotal + tax, 2);

  await checkoutOverviewPage.finishOrder();

  await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
});
