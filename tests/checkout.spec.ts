import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { InventoryPage } from '../pages/inventoryPage';
import { LoginPage } from '../pages/loginPage';

test('completes the SauceDemo checkout flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addItemByTestId('add-to-cart-sauce-labs-backpack');
  await inventoryPage.addItemByTestId('add-to-cart-sauce-labs-bike-light');
  await expect(inventoryPage.shoppingCartBadge()).toHaveText('2');

  await inventoryPage.openCart();
  await expect(cartPage.pageTitle()).toBeVisible();
  await expect(cartPage.itemName('Sauce Labs Backpack')).toBeVisible();
  await expect(cartPage.itemName('Sauce Labs Bike Light')).toBeVisible();
  await expect(cartPage.quantityForItem('Sauce Labs Backpack')).toHaveText('1');

  await cartPage.checkout();
  await checkoutPage.fillBuyerInformation('Ada', 'Lovelace', '12345');
  await checkoutPage.continue();

  const itemTotal = await checkoutPage.itemTotal();
  const tax = await checkoutPage.tax();
  const total = await checkoutPage.total();

  expect(itemTotal + tax).toBeCloseTo(total, 2);

  await checkoutPage.finish();
  await expect(checkoutPage.confirmationMessage()).toHaveText(/thank you for your order/i);
});
