# GitHub Copilot Session Task - Automated E2E Testing Framework

## Project Overview

This project automates the end-to-end checkout flow of the SauceDemo (Swag Labs) application using Playwright and the Page Object Model (POM) design pattern.

The framework was generated using GitHub Copilot with custom prompt-driven development and explicit guardrails.

## Scenario Covered

- Login using valid credentials
- Add two products to the cart
- Verify cart contents
- Complete the checkout process
- Verify item total, tax, and total price
- Complete the order
- Verify the success confirmation message

## Framework Structure

```
.github/
pages/
prompts/
tests/
utils/
test-data/
playwright.config.js
package.json
```

## Guardrails Applied

The following guardrails were included in the Copilot instructions and prompts:

- No use of `page.waitForTimeout()`
- Prefer `getByRole()` and `getByTestId()` locators where applicable
- Avoid XPath unless absolutely necessary
- Keep assertions inside test files only
- Keep page objects focused on locators and reusable actions
- Use Playwright auto-waiting
- Follow the Page Object Model architecture
- Write reusable and maintainable code

## Prompt-Driven Development

The framework was generated using dedicated prompt files:

- framework.prompt.md
- page-objects.prompt.md
- checkout-e2e.prompt.md

## Run the Project

Install dependencies:

```bash
npm install
```

Run the tests:

```bash
npx playwright test
```

Run in headed mode:

```bash
npx playwright test --headed
```

## Result

The automated end-to-end checkout scenario executes successfully using Playwright with the Page Object Model architecture.