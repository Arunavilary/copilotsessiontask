# End-to-End Checkout Test Generation Prompt

You are an experienced Playwright automation engineer.

Using the existing Playwright framework and Page Object Model classes in this repository, generate a single end-to-end Playwright test for the SauceDemo (Swag Labs) application.

Requirements:

- Use JavaScript.
- Use the existing Page Object classes only.
- Do not add page locators directly inside the test.
- Follow the guardrails defined in `.github/copilot-instructions.md`.
- Use clean Playwright assertions.
- Do not use page.waitForTimeout().
- Use async/await consistently.

Automate the following scenario:

1. Launch the SauceDemo application.
2. Log in using:
   - Username: standard_user
   - Password: secret_sauce
3. Add at least two different products to the cart.
4. Open the cart.
5. Verify the selected products are present.
6. Proceed to checkout.
7. Enter:
   - First Name: John
   - Last Name: Doe
   - Postal Code: 560001
8. Continue to the overview page.
9. Verify:
   - Item Total
   - Tax
   - Total Price
10. Finish the checkout.
11. Verify the success message:
    "Thank you for your order!"

Generate only the Playwright test file using the existing Page Object classes.
Do not modify the Page Object classes.