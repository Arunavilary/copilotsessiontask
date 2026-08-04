import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

test.describe('SauceDemo E2E Checkout Flow', () => {
  test('should complete end-to-end purchase successfully', async ({ page }) => {
    // Test data
    const username = 'standard_user';
    const password = 'secret_sauce';
    const itemsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    const buyerInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    };

    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);

    // Step 2: Add items to cart
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addMultipleItemsToCart(itemsToAdd);
    
    // Verify cart badge shows correct count
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(itemsToAdd.length);

    // Step 3: Navigate to cart and verify items
    await inventoryPage.goToCart();
    
    const cartPage = new CartPage(page);
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(itemsToAdd.length);

    // Verify each item is in the cart
    for (const itemName of itemsToAdd) {
      const isInCart = await cartPage.isItemInCart(itemName);
      expect(isInCart).toBeTruthy();
      
      const quantity = await cartPage.getItemQuantity(itemName);
      expect(quantity).toBe(1);
    }

    // Step 4: Proceed to checkout and fill information
    await cartPage.proceedToCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutInformation(
      buyerInfo.firstName,
      buyerInfo.lastName,
      buyerInfo.postalCode
    );
    await checkoutPage.continueToOverview();

    // Step 5: Verify order overview and calculations
    const overviewPage = new CheckoutOverviewPage(page);
    
    // Verify items in overview
    const overviewItems = await overviewPage.getItemNames();
    expect(overviewItems.length).toBe(itemsToAdd.length);
    for (const itemName of itemsToAdd) {
      expect(overviewItems).toContain(itemName);
    }

    // Verify price calculations
    const subtotal = await overviewPage.getSubtotal();
    const tax = await overviewPage.getTax();
    const total = await overviewPage.getTotal();
    
    expect(subtotal).toBeGreaterThan(0);
    expect(tax).toBeGreaterThan(0);
    expect(total).toBeGreaterThan(0);
    
    // Verify total = subtotal + tax
    const isTotalCorrect = await overviewPage.verifyTotalCalculation();
    expect(isTotalCorrect).toBeTruthy();

    // Step 6: Complete order and verify confirmation
    await overviewPage.finishOrder();
    
    const confirmationPage = new ConfirmationPage(page);
    const isComplete = await confirmationPage.isOrderComplete();
    expect(isComplete).toBeTruthy();
    
    const confirmationMessage = await confirmationPage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Thank you for your order');
    
    // Verify we're on the completion page
    expect(page.url()).toContain('checkout-complete');
  });

  test('should handle login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    await loginPage.usernameInput.fill('invalid_user');
    await loginPage.passwordInput.fill('wrong_password');
    await loginPage.loginButton.click();
    
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('should remove items from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    let itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);

    await cartPage.removeItem('Sauce Labs Backpack');
    itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(0);
  });
});
