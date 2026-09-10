# SauceDemo End-to-End Checkout Test

## Objective

Create an end-to-end pytest test for the SauceDemo application using the existing Page Object Model classes.

Application:

https://www.saucedemo.com/

## Existing Page Objects

Use these existing Page Objects:

- LoginPage
- InventoryPage
- CartPage
- CheckoutPage

Do not create duplicate Page Objects.

---

## Test Scenario

Implement the following user journey:

### 1. Login

Navigate to SauceDemo.

Use the valid credentials:

Username:
standard_user

Password:
secret_sauce

Verify that the Inventory page is displayed.

### 2. Add Products

Add the following two distinct products:

- Sauce Labs Backpack
- Sauce Labs Bike Light

### 3. Verify Cart

Open the shopping cart.

Verify:

- Sauce Labs Backpack is displayed.
- Sauce Labs Bike Light is displayed.
- The cart contains exactly two items.

### 4. Checkout

Click Checkout.

Enter:

First Name:
Test

Last Name:
User

Postal Code:
682001

Continue to the checkout overview.

### 5. Verify Order Summary

Verify that:

- Item total is displayed.
- Tax is displayed.
- Final total is displayed.

Calculate the expected total using:

expected_total = item_total + tax

Round the calculated value to two decimal places.

Verify that the displayed total matches the calculated total.

Do not hardcode the expected final price.

### 6. Complete Order

Click Finish.

Verify that the following message is visible:

"Thank you for your order!"

---

## Test Design Requirements

The test should use the Page Objects rather than directly interacting with page locators.

The test should read as a clear business workflow.

Example:

login_page.login(...)
inventory_page.add_product(...)
cart_page.verify_product(...)
checkout_page.enter_customer_information(...)

Do not put locator definitions in the test.

---

## Guardrails

Read and follow:

.github/copilot-instructions.md

Do not:

- Use time.sleep()
- Use page.wait_for_timeout()
- Use arbitrary waits
- Duplicate locators
- Duplicate Page Object actions
- Use unnecessary XPath
- Hardcode the final order total
- Use print statements as assertions
- Silently ignore exceptions

Use Playwright expect() assertions.

Follow the Page Object Model.

Follow Python PEP 8 conventions.

---

## Expected Test

Create:

tests/test_checkout.py

The test should contain the complete end-to-end checkout scenario and should use the existing Page Objects.
