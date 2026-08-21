// Rule Reference: Section 1 - Use ES Module imports, never CommonJS
import 'dotenv/config';
import { test, expect } from '@playwright/test';

// Rule Reference: Section 2 - Import utilities exclusively from barrel file
import { generateCheckoutData, verifyElementIsVisible } from '../helpers/index.js';

// Rule Reference: Section 2 - Import Page Objects from /page-objects
import { LoginPage } from '../page-objects/login.page.js';
import { InventoryPage } from '../page-objects/inventory.page.js';
import { CartPage } from '../page-objects/cart.page.js';
import { CheckoutStepOnePage } from '../page-objects/checkout-step-one.page.js';
import { CheckoutStepTwoPage } from '../page-objects/checkout-step-two.page.js';
import { CheckoutCompletePage } from '../page-objects/checkout-complete.page.js';

// Rule Reference: Section 4 - Load credentials from process.env, never hardcode
const BASE_URL = process.env.BASE_URL;
const TEST_USERNAME = process.env.TEST_USERNAME;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

/**
 * Single, focused end-to-end test for SauceDemo checkout flow.
 * Rule Reference: Section 8 - Keep each test focused on verifying a single logical workflow.
 * 
 * NOTE: This test uses a flat structure (NO test.describe, NO beforeEach) as per prompt requirements.
 * In production code, Section 9 recommends grouping tests with test.describe() for organization.
 */
test('should complete the end-to-end checkout flow successfully', async ({ page }) => {
  // ──────────────────────────────────────────────────────────────────────────
  // Inline Page Object Initialization
  // Rule Reference: Section 6 - Instantiate Page Objects with page instance
  // ──────────────────────────────────────────────────────────────────────────
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  // ──────────────────────────────────────────────────────────────────────────
  // Step 1: Navigate to SauceDemo and Login
  // Rule Reference: Section 4 - Credentials from process.env, not hardcoded
  // ──────────────────────────────────────────────────────────────────────────
  await test.step('Navigate to SauceDemo and login', async () => {
    await loginPage.navigate();
    await loginPage.login(TEST_USERNAME, TEST_PASSWORD);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Step 2: Verify Inventory Page Loaded
  // Rule Reference: Section 7 - Use auto-retrying web-first assertions
  // Rule Reference: Section 5 - No page.waitForTimeout(); rely on auto-waiting
  // ──────────────────────────────────────────────────────────────────────────
  await test.step('Verify inventory list is visible', async () => {
    await verifyElementIsVisible(inventoryPage.inventoryList);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Step 3: Add Item to Cart and Navigate to Cart
  // Rule Reference: Section 1 - Use native Playwright APIs directly
  // ──────────────────────────────────────────────────────────────────────────
  await test.step('Add item to cart and navigate to cart', async () => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Step 4: Proceed to Checkout
  // ──────────────────────────────────────────────────────────────────────────
  await test.step('Proceed to checkout from cart', async () => {
    await verifyElementIsVisible(cartPage.cartItems.first());
    await cartPage.proceedToCheckout();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Step 5: Fill Checkout Information with Dynamic Data
  // Rule Reference: Section 4 - Generate dynamic data, never hardcode
  // ──────────────────────────────────────────────────────────────────────────
  await test.step('Fill customer information and continue', async () => {
    const { firstName, lastName, postalCode } = generateCheckoutData();
    await checkoutStepOnePage.fillCustomerInformation(firstName, lastName, postalCode);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Step 6: Verify Order Summary and Finish Checkout
  // Rule Reference: Section 7 - Web-first assertions with auto-retry
  // ──────────────────────────────────────────────────────────────────────────
  await test.step('Verify order summary and finish checkout', async () => {
    await verifyElementIsVisible(checkoutStepTwoPage.summaryInfo);
    await verifyElementIsVisible(checkoutStepTwoPage.finishButton);
    await checkoutStepTwoPage.finishCheckout();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Step 7: Assert Order Completion
  // Rule Reference: Section 6 - Assertions in test specs, not in Page Objects
  // Rule Reference: Section 7 - Use toBeVisible() auto-retrying assertion
  // ──────────────────────────────────────────────────────────────────────────
  await test.step('Assert order completion heading is visible', async () => {
    const completionHeader = checkoutCompletePage.getCompletionHeader();
    await expect(completionHeader).toBeVisible();
    await expect(completionHeader).toHaveText('Thank you for your order!');
  });
});
