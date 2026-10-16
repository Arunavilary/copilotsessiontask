import { test, expect } from '@playwright/test';
import { getRequiredEnv } from '../helpers/guardrailChecks.js';
import { CartPage } from '../pages/cart-page.js';
import { CheckoutPage } from '../pages/checkout-page.js';
import { CheckoutOverviewPage } from '../pages/checkout-overview-page.js';
import { InventoryPage } from '../pages/inventory-page.js';
import { LoginPage } from '../pages/login-page.js';
import { OrderCompletionPage } from '../pages/order-completion-page.js';

/** Converts displayed USD amounts into integer cents without float math. */
function priceToCents(price) {
  const match = /^\$(\d+)\.(\d{2})$/.exec(price);
  if (!match) {
    throw new Error(`Unexpected SauceDemo price format: ${price}`);
  }
  return Number(match[1]) * 100 + Number(match[2]);
}

function centsToPrice(cents) {
  return `$${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, '0')}`;
}

function sortByName(items) {
  return [...items].sort((first, second) => first.name.localeCompare(second.name));
}

let loginPage;
let inventoryPage;
let cartPage;
let checkoutPage;
let checkoutOverviewPage;
let orderCompletionPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
  checkoutOverviewPage = new CheckoutOverviewPage(page);
  orderCompletionPage = new OrderCompletionPage(page);
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus && !page.isClosed()) {
    await page.screenshot({ path: testInfo.outputPath('checkout-failure.png'), fullPage: true });
  }
});

test('should complete an e-commerce checkout successfully', async ({ page }) => {
  // Test purpose: exercise SauceDemo's complete purchase flow and validate its order totals.

  // Login with demo credentials supplied through environment variables.
  await loginPage.navigateToLoginPage();
  await loginPage.login(getRequiredEnv('TEST_USERNAME'), getRequiredEnv('TEST_PASSWORD'));
  await expect(loginPage.inventoryList, 'Inventory list should confirm a successful login').toBeVisible();

  // Capture actual product names and prices by name, then add one unit of each product.
  const selectedProducts = [];
  for (const productName of ['Sauce Labs Backpack', 'Sauce Labs Bike Light']) {
    const productDetails = await inventoryPage.getProductDetails(productName);
    selectedProducts.push({ ...productDetails, quantity: 1 });
    await inventoryPage.addProductToCart(productName);
  }
  await expect(inventoryPage.cartItemCountBadge, 'Cart badge should count both selected products').toHaveText('2');
  expect(await inventoryPage.getCartItemCount(), 'Cart item count should be two').toBe(2);

  // Verify the cart contains exactly the selected products with their prices and quantities.
  await inventoryPage.navigateToShoppingCart();
  const cartItems = await cartPage.getCartItemDetails();
  expect(sortByName(cartItems), 'Cart contents must exactly match the selected products').toEqual(
    sortByName(selectedProducts),
  );
  expect(cartItems.reduce((total, item) => total + item.quantity, 0), 'Cart should contain two units').toBe(2);
  await cartPage.proceedToCheckout();

  // Enter configured buyer details and continue to the order overview.
  const [firstName, ...lastNameParts] = getRequiredEnv('CHECKOUT_TEST_NAME').split(/\s+/);
  if (!firstName || lastNameParts.length === 0) {
    throw new Error('CHECKOUT_TEST_NAME must contain both a first name and a last name.');
  }
  await checkoutPage.fillCheckoutInformation(
    firstName,
    lastNameParts.join(' '),
    getRequiredEnv('CHECKOUT_TEST_POSTAL_CODE'),
  );
  await expect(checkoutOverviewPage.overviewHeading, 'Checkout overview should be displayed').toBeVisible();

  // Verify overview products and calculate expected monetary values in integer cents.
  const overviewItems = await checkoutOverviewPage.getOverviewItemDetails();
  expect(sortByName(overviewItems), 'Overview items must match the cart products exactly').toEqual(
    sortByName(selectedProducts),
  );

  const expectedSubtotalCents = selectedProducts.reduce(
    (subtotal, item) => subtotal + priceToCents(item.price) * item.quantity,
    0,
  );
  // SauceDemo's live overview was verified to calculate tax at 8%, rounded to the nearest cent.
  const expectedTaxCents = Math.round((expectedSubtotalCents * 8) / 100);
  const expectedTotalCents = expectedSubtotalCents + expectedTaxCents;
  const priceSummary = await checkoutOverviewPage.getPriceSummary();
  expect(priceSummary.itemSubtotal, 'Displayed item subtotal should equal the selected item prices').toBe(
    `Item total: ${centsToPrice(expectedSubtotalCents)}`,
  );
  expect(priceSummary.tax, 'Displayed tax should match SauceDemo tax and cent rounding').toBe(
    `Tax: ${centsToPrice(expectedTaxCents)}`,
  );
  expect(priceSummary.total, 'Final total should equal subtotal plus tax').toBe(
    `Total: ${centsToPrice(expectedTotalCents)}`,
  );

  // Finish the order and verify the success heading and supporting confirmation message.
  await checkoutOverviewPage.finishOrder();
  await expect(orderCompletionPage.orderConfirmationHeading).toBeVisible();
  await expect(orderCompletionPage.orderCompletionMessage).toBeVisible();
});