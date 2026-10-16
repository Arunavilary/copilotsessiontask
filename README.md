# SauceDemo Playwright Checkout Automation

This repository contains a JavaScript end-to-end checkout test for SauceDemo, implemented with Playwright Test and Page Object Model (POM).

## Project structure

- `tests/pages/` — page objects for login, inventory, cart, checkout information, checkout overview, and order completion.
- `tests/helpers/` — shared data, assertion, wait, and guardrail utilities.
- `tests/specs/checkout.spec.js` — complete checkout scenario with cart and price validations.
- `tests/guardrails/checkout-violations.example.js` — reference demonstration of prohibited patterns; not a test.
- `prompt.md` — task prompt used to guide the implementation.
- `copilot-instructions.md` — project-wide Copilot and automation guardrails.

## How the prompts applied guardrails

The task prompt directed Copilot to inspect and reuse the existing project before changing code, use observed SauceDemo locators, follow the POM structure, and validate all checkout totals. The instruction file adds enforceable project rules: Chromium-only Playwright Test, semantic locators before CSS, no XPath, no fixed sleeps, environment-based credentials, and page objects limited to page interactions. The implementation follows those constraints, uses assertions in the spec, and keeps secrets out of source control. The violation example is retained for reference and is not imported by the test.

## Setup

Install dependencies and the configured browser:

```sh
npm install
npx playwright install chromium
```

Copy `.env.example` to `.env`, then set SauceDemo demo credentials and the buyer name and postal code. `.env` is ignored by Git and must not be committed.

## Run

```sh
npm test
```

The checkout test logs in, adds two products by name, verifies the cart, enters checkout information, validates subtotal, tax and total in integer cents, and confirms the order.

To view the HTML report:

```sh
npm run test:report
```
