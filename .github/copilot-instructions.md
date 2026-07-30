# GitHub Copilot Instructions

## Project Overview
Generate a Playwright end-to-end automation framework for the SauceDemo (Swag Labs) application using the Page Object Model (POM) design pattern.

## Technology Stack
- Playwright with JavaScript
- Node.js
- Page Object Model (POM)

## Framework Guidelines
- Follow the Page Object Model design pattern.
- Keep page locators and page actions inside Page Object classes.
- Keep test logic inside the test files only.
- Reuse methods wherever possible.
- Write modular, readable, and maintainable code.

## Locator Strategy
- Prefer `getByRole()` wherever possible.
- Use `getByTestId()` when available.
- Use stable CSS selectors only if required.
- Avoid XPath unless there is no alternative.

## Guardrails
- Never use `page.waitForTimeout()`.
- Use Playwright auto-waiting features.
- Avoid hardcoded values except where explicitly required by the assignment.
- Keep assertions clean and meaningful.
- Handle unexpected failures gracefully.
- Use async/await consistently.

## Test Scenario
Generate automation for the complete SauceDemo checkout flow:
1. Login using valid credentials.
2. Add at least two products to the cart.
3. Verify cart contents.
4. Complete checkout.
5. Verify item total, tax, and total.
6. Finish the order.
7. Verify the success confirmation message.

## Code Quality
- Keep methods small and reusable.
- Use meaningful method names.
- Avoid duplicate code.
- Add comments only where necessary.