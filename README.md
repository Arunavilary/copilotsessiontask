# Playwright E2E Framework for SauceDemo

This project contains a Playwright-based end-to-end test for the SauceDemo checkout flow using a Page Object Model (POM) structure.

## Guardrails applied

- The Playwright prompt instructions in [.github/copilot-instructions.md](.github/copilot-instructions.md) guide Copilot to prefer resilient locators such as getByRole/getByTestId and avoid hardcoded sleeps.
- Tests are organized into page objects under the pages folder so selectors and page actions stay maintainable.
- Assertions focus on visible UI state and pricing calculations to make the suite clear and reliable.

## Run the test

```bash
npx playwright test tests/checkout.spec.ts
```
