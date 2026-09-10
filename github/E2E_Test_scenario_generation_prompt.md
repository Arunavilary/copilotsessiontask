
Act as a Senior Test Automation Engineer. I need to create a complete End-to-End automated test for the SauceDemo E-Commerce Checkout Flow using Playwright and Page Object Model (POM).

Website URL: https://www.saucedemo.com/

TEST CREDENTIALS:
Username: standard_user
Password: secret_sauce

TASK 1 - ENVIRONMENT SETUP:

Create ONLY a .env.example file in the project root as a template with the following sample values:

TEST_USERNAME=your_username_here
TEST_PASSWORD=your_password_here

Do NOT create an actual .env file.

Add the following comment to .env.example:

# Copy this file to .env and replace with actual credentials

Install dotenv as a development dependency:

npm install dotenv --save-dev

The test must load credentials using:

process.env.TEST_USERNAME
process.env.TEST_PASSWORD

DO NOT hardcode the username or password inside the test file.

The actual .env file will be created by the user separately.


TASK 2 - LOCATOR IDENTIFICATION:

Analyze the current SauceDemo application and identify the most reliable Playwright locators for all elements required for the complete checkout flow.

The flow requires locators for:

LOGIN PAGE:
- Username input
- Password input
- Login button

INVENTORY PAGE:
- Inventory page/container
- Product items
- Product names
- Add to Cart buttons
- Shopping cart link/icon
- Cart badge

CART PAGE:
- Cart container
- Cart items
- Product names
- Product quantities
- Checkout button

CHECKOUT INFORMATION PAGE:
- First Name input
- Last Name input
- Postal Code input
- Continue button

CHECKOUT OVERVIEW PAGE:
- Overview container
- Item names
- Item quantities
- Item prices
- Item total
- Tax
- Total price
- Finish button

ORDER CONFIRMATION PAGE:
- Success confirmation container
- Success confirmation message
- Back Home button if required

Use this locator priority:

1. getByRole() - preferred for semantic elements
2. getByLabel() - preferred for labeled form fields
3. getByPlaceholder() - when appropriate
4. getByTestId() - if reliable data-testid attributes are available
5. CSS selectors using reliable attributes such as id, name, or class
6. Complex CSS selectors only as a last resort

DO NOT use XPath locators.

DO NOT use fragile selectors based on:
- Dynamic generated classes
- Element indexes
- nth-child unless absolutely necessary
- Full DOM paths

For successful login, use:

.inventory_list

as the confirmation element.

Do NOT use #inventory_container for successful-login verification.


TASK 3 - PAGE OBJECT MODEL STRUCTURE:

Implement the test using the Page Object Model.

Create the following Page Object classes:

1. login-page.js
2. inventory-page.js
3. cart-page.js
4. checkout-page.js
5. checkout-overview-page.js

Each Page Object must:

- Have a class representing that page
- Accept the Playwright page object through the constructor
- Define locators as class properties
- Contain reusable methods for actions performed on that page
- Use async/await correctly
- Avoid hardcoded waits
- Use descriptive method names
- Follow camelCase naming convention
- Keep selectors inside the Page Object rather than inside the test
- Add concise comments where useful

DO NOT override Playwright's native methods.


LOGIN PAGE:

Create LoginPage with:

Constructor:
- Accept page object

Locators:
- Username input
- Password input
- Login button

Methods:

navigateToLoginPage()
- Navigate to https://www.saucedemo.com/

login(username, password)
- Enter the username
- Enter the password
- Click Login

isLoginSuccessful()
- Return true if .inventory_list is visible


INVENTORY PAGE:

Create InventoryPage with:

Locators:
- Inventory container
- Product items
- Product names
- Add to Cart buttons
- Shopping cart link
- Cart badge

Methods:

addProductToCart(productName)
- Locate the specified product dynamically
- Add that product to the cart

addMultipleProductsToCart(productNames)
- Accept an array of product names
- Add each requested product to the cart

getCartItemCount()
- Return the number displayed in the cart badge

goToCart()
- Click the shopping cart


IMPORTANT:

The test must add at least TWO DISTINCT PRODUCTS.

Use product names that currently exist in SauceDemo, for example:

Sauce Labs Backpack
Sauce Labs Bike Light

Do not rely on product indexes such as:

nth(0)
nth(1)

when a product can be located by its name.


CART PAGE:

Create CartPage with:

Locators:
- Cart container
- Cart items
- Product names
- Product quantities
- Checkout button

Methods:

getCartItemNames()
- Return the names of products currently present in the cart

getProductQuantity(productName)
- Return the quantity of the specified product

isProductInCart(productName)
- Verify whether the specified product is displayed

proceedToCheckout()
- Click the Checkout button


CHECKOUT PAGE:

Create CheckoutPage with:

Locators:
- First Name input
- Last Name input
- Postal Code input
- Continue button

Method:

fillBuyerInformation(firstName, lastName, postalCode)
- Fill First Name
- Fill Last Name
- Fill Postal Code

continueToOverview()
- Click Continue


CHECKOUT OVERVIEW PAGE:

Create CheckoutOverviewPage with:

Locators:
- Overview container
- Item names
- Item prices
- Item quantities
- Item total
- Tax
- Total
- Finish button

Methods:

getItemTotal()
- Return the displayed item total

getTax()
- Return the displayed tax

getTotal()
- Return the displayed total

calculateExpectedItemTotal()
- Calculate the expected item total based on the selected product prices

calculateExpectedTax()
- Calculate expected tax based on the item total

calculateExpectedTotal()
- Calculate expected total as item total + tax

finishOrder()
- Click Finish


ORDER CONFIRMATION:

Create a method or appropriate locator in CheckoutOverviewPage, or a separate OrderConfirmationPage if required, to verify:

"Thank you for your order!"

The success confirmation must be asserted using a reliable locator.

Do not assert only by checking that the URL changed.


TASK 4 - TEST CREATION:

Create:

e2e-checkout.spec.js

The test must contain ONE focused end-to-end test using:

test('should complete e-commerce checkout successfully', async ({ page }) => {

});


The test must perform the following complete flow:

STEP 1 - LOGIN:

- Navigate to SauceDemo
- Load username from process.env.TEST_USERNAME
- Load password from process.env.TEST_PASSWORD
- Login using LoginPage
- Verify successful login using .inventory_list

DO NOT hardcode credentials in the test file.


STEP 2 - ADD PRODUCTS TO CART:

Add at least TWO DISTINCT PRODUCTS.

Use:

Sauce Labs Backpack
Sauce Labs Bike Light

Verify that both products were successfully added to the cart.

Verify the cart badge shows the expected quantity.


STEP 3 - VERIFY CART:

- Navigate to the cart
- Verify the cart contains exactly the selected products
- Verify each selected product is displayed
- Verify each product quantity is 1
- Verify the cart contains the expected number of products

Do not validate the cart only by checking the cart URL.


STEP 4 - CHECKOUT:

- Click Checkout
- Fill in buyer information:

First Name: Test
Last Name: User
Postal Code: 12345

The buyer information values may be hardcoded because they are test data and are not authentication credentials.

- Click Continue


STEP 5 - VERIFY CHECKOUT OVERVIEW:

Verify that the selected products are displayed on the overview page.

Verify:

- Correct product names
- Correct quantities
- Correct item prices
- Item total
- Tax
- Total price

The test must verify the price calculation logically.

Expected calculation:

Item Total = Sum of selected product prices

Tax = Item Total × applicable SauceDemo tax rate

Total = Item Total + Tax

Do NOT hardcode the final total without validating the calculation.

When comparing monetary values, avoid floating-point precision problems.

For example, convert displayed currency values into numeric values and round calculations to two decimal places before comparison.

The displayed values should be parsed safely from strings such as:

"$29.99"

Do not make assumptions about currency symbols or formatting without inspecting the actual page.


STEP 6 - COMPLETE ORDER:

- Click Finish
- Verify the order confirmation page is displayed
- Assert that the message:

"Thank you for your order!"

is visible.


TASK 5 - TEST DATA:

Keep test data clearly separated from test actions where practical.

Use:

const products = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light'
];

Use buyer information:

First Name: Test
Last Name: User
Postal Code: 12345

Credentials must come ONLY from:

process.env.TEST_USERNAME
process.env.TEST_PASSWORD


TASK 6 - ASSERTIONS:

Use Playwright's built-in assertions:

expect()

Examples:

await expect(locator).toBeVisible();
await expect(locator).toHaveText();
await expect(locator).toContainText();
await expect(locator).toHaveCount();

Do not use unnecessary manual assertions such as:

if (...) {
   throw new Error(...)
}

unless there is a specific reason.

Assertions must verify meaningful business outcomes at each major stage.


TASK 7 - WAITING STRATEGY:

DO NOT use:

page.waitForTimeout()

DO NOT use arbitrary hardcoded waits.

DO NOT use:

sleep()
setTimeout()
waitFor()

unless specifically required for a valid application synchronization scenario.

Rely on Playwright's automatic waiting and web-first assertions.


TASK 8 - CODE QUALITY:

Follow these coding standards:

- Page Object Model
- camelCase naming
- Meaningful class and method names
- Reusable Page Objects
- No duplicated selectors
- No duplicated login logic
- No XPath
- No hardcoded credentials
- No hardcoded waits
- Proper async/await
- Playwright expect() assertions
- Keep test actions readable
- Keep locators inside Page Objects
- Keep the test focused on business flow rather than selector implementation

The test should read approximately like this:

1. Login
2. Add products
3. Verify cart
4. Checkout
5. Verify overview calculations
6. Finish order
7. Verify confirmation


TASK 9 - FILE STRUCTURE:

Create the following structure:

project-root/
│
├── .env.example
├── login-page.js
├── inventory-page.js
├── cart-page.js
├── checkout-page.js
├── checkout-overview-page.js
│
└── e2e-checkout.spec.js

If the existing project already has a standard Playwright directory structure such as:

pages/
tests/

then follow that existing structure instead of unnecessarily creating files in the root.

Do not create duplicate Page Objects if they already exist.


TASK 10 - VERIFICATION:

Before completing the task, verify that the implementation satisfies all of the following:

[ ] Uses Playwright
[ ] Uses Page Object Model
[ ] Uses separate Page Objects for the relevant pages
[ ] Uses reliable semantic locators wherever possible
[ ] Does not use XPath
[ ] Does not use page.waitForTimeout()
[ ] Does not use hardcoded waits
[ ] Does not hardcode login credentials
[ ] Uses process.env.TEST_USERNAME
[ ] Uses process.env.TEST_PASSWORD
[ ] Contains .env.example
[ ] Does not create an actual .env file
[ ] Adds at least two distinct products
[ ] Verifies products in cart
[ ] Verifies product quantities
[ ] Verifies checkout information
[ ] Verifies item total
[ ] Verifies tax
[ ] Verifies total price calculation
[ ] Completes the order
[ ] Verifies "Thank you for your order!"
[ ] Uses async/await
[ ] Uses Playwright expect() assertions
[ ] Follows camelCase naming
[ ] Does not override Playwright native methods
[ ] Keeps selectors inside Page Objects
[ ] Keeps the test focused on the E2E business flow


TASK 11 - OUTPUT:

Provide the complete code for:

1. .env.example
2. login-page.js
3. inventory-page.js
4. cart-page.js
5. checkout-page.js
6. checkout-overview-page.js
7. e2e-checkout.spec.js

The code should be immediately runnable after the user:

1. Installs dependencies
2. Creates .env by copying .env.example
3. Adds valid SauceDemo credentials to .env
4. Runs the Playwright test

Do not create unnecessary test cases.

Keep this as ONE focused end-to-end checkout test.