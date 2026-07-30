# Page Objects Generation Prompt

You are an experienced Playwright automation architect.

Using the existing Playwright framework in this repository, generate the Page Object Model (POM) classes for the SauceDemo (Swag Labs) application.

Requirements:

- Use JavaScript.
- Follow the Page Object Model (POM) design pattern.
- Generate only Page Object classes.
- Do not generate any test cases.
- Keep page locators and page actions inside the page classes.
- Do not include assertions inside Page Objects.
- Use reusable methods.
- Use Playwright recommended locator strategies (prefer getByRole(), getByTestId(), and stable CSS selectors).
- Do not use XPath unless absolutely necessary.
- Do not use page.waitForTimeout().
- Follow the guardrails defined in `.github/copilot-instructions.md`.

Generate the following Page Object classes:

1. LoginPage.js
2. InventoryPage.js
3. CartPage.js
4. CheckoutPage.js
5. CheckoutOverviewPage.js
6. CheckoutCompletePage.js

Each Page Object should:
- Define page locators.
- Expose reusable action methods.
- Follow clean coding practices.
- Be ready for use in end-to-end tests.