# Playwright E-Commerce Automation Framework

A Playwright-based end-to-end test automation framework designed for testing E-Commerce web applications. Built with JavaScript/Node.js using the Page Object Model (POM) pattern.

---

## Project Structure

```
.
├── helpers/
│   ├── dataHelpers.js        # Random test data generators
│   ├── assertionHelpers.js   # Reusable assertion wrappers
│   └── index.js              # Barrel export file
├── page-objects/
│   └── LoginPage.js          # POM class for the login page
├── tests/
│   └── login.spec.js         # E2E login test suite
├── .env.example              # Environment variable template
├── playwright.config.js      # Playwright configuration
├── package.json
└── README.md
```

---

## Prerequisites

- Node.js 18 or later
- npm 9 or later

---

## Installation

### 1. Install Node dependencies

```bash
npm install
```

### 2. Install Playwright browser binaries

```bash
npx playwright install
```

---

## Environment Setup

All credentials and environment-specific values are managed via a `.env` file that is **never committed to version control**.

### Creating the `.env` file

Copy the provided template:

```bash
cp .env.example .env
```

Then open `.env` and fill in the real values:

```env
# Base URL of the application under test
BASE_URL=https://your-ecommerce-site.com

# Test user credentials
TEST_USER=your_test_email@example.com
TEST_PASSWORD=your_test_password
```

> **Important:** Store your real credentials inside the `.env` file. The `.env` file is loaded automatically via `dotenv` when tests run.

---

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/login.spec.js
```

### Run tests in headed mode (browser visible)

```bash
npx playwright test --headed
```

---

## Viewing the HTML Report

After a test run an HTML report is generated automatically. Open it with:

```bash
npx playwright show-report
```

---

## Configuration Highlights (`playwright.config.js`)

| Setting | Value |
|---|---|
| Test directory | `./tests` |
| Browser | Chromium |
| Headless | `false` (headed) |
| Timeout | 30 seconds |
| Expect timeout | 5 seconds |
| Workers | 1 |
| Parallel execution | Disabled |
| Screenshots | On (all tests) |
| Trace | Retained on failure |
| Reporter | HTML |

---

## Adding New Tests

1. Create a new POM class in `/page-objects/`.
2. Add reusable helpers to `/helpers/dataHelpers.js` or `/helpers/assertionHelpers.js` and export them from `/helpers/index.js`.
3. Create a new `*.spec.js` file inside `/tests/`.

---

## Guardrails Application

This framework implements comprehensive guardrails defined in [`copilot_instructions.md`](copilot_instructions.md) to ensure code quality, security, and maintainability. Below is a detailed breakdown of how each guardrail category is applied across the codebase.

### 1. General Rules (Section 1)

| Rule | Application |
|------|-------------|
| **ES6+ syntax** | All files use `const`/`let` (never `var`), arrow functions, and template literals |
| **ES Module imports** | All files use `import`/`export` syntax; CommonJS `require()` is avoided |
| **No custom wrappers** | Native Playwright APIs are used directly without creating wrapper functions |
| **test.step() blocks** | Complex workflows in test specs are wrapped in `test.step()` for clean execution logs |

**Example from [`checkout.spec.js`](tests/checkout.spec.js):**
```javascript
// Rule Reference: Section 1 - Use ES Module imports, never CommonJS
import { test, expect } from '@playwright/test';
```

### 2. Directory Structure & File Organization (Section 2)

| Directory | Purpose | Guardrail Compliance |
|-----------|---------|---------------------|
| `/tests` | Test specification files | All `.spec.js` files placed here |
| `/page-objects` | Page Object Model classes | All `.page.js` files placed here |
| `/helpers` | Utility functions | `data-helpers.js`, `assertion-helpers.js` with barrel `index.js` |

**Barrel Export Pattern from [`helpers/index.js`](helpers/index.js):**
```javascript
// Rule Reference: Section 2 - Use index.js barrel exports for clean imports
export * from './data-helpers.js';
export * from './assertion-helpers.js';
```

### 3. Naming Conventions (Section 3)

| Convention | Example | Application |
|------------|---------|-------------|
| `camelCase` for functions/variables | `generateCheckoutData`, `verifyElementIsVisible` | All helper functions |
| `PascalCase` for classes | `LoginPage`, `InventoryPage` | All Page Object classes |
| `kebab-case.spec.js` for tests | `checkout.spec.js`, `login.spec.js` | All test files |
| `kebab-case.page.js` for POMs | `login.page.js`, `cart.page.js` | All page object files |

### 4. Safety & Security Guardrails (Section 4)

| Rule | Implementation |
|------|----------------|
| **Never hardcode credentials** | All credentials loaded via `process.env` using `dotenv` |
| **Environment management** | `.env` file for credentials (gitignored), `.env.example` as template |
| **Dynamic test data** | `generateCheckoutData()` generates random customer details |

**Example from [`checkout.spec.js`](tests/checkout.spec.js):**
```javascript
// Rule Reference: Section 4 - Load credentials from process.env, never hardcode
const BASE_URL = process.env.BASE_URL;
const TEST_USERNAME = process.env.TEST_USERNAME;
const TEST_PASSWORD = process.env.TEST_PASSWORD;
```

**Example from [`data-helpers.js`](helpers/data-helpers.js):**
```javascript
// Rule Reference: Section 4 - Never hardcode data; generate dynamically.
export const generateCheckoutData = () => ({
  firstName: randomFrom(FIRST_NAMES),
  lastName: randomFrom(LAST_NAMES),
  postalCode: generatePostalCode(),
});
```

### 5. Locators & Waiting Strategies (Section 5)

| Strategy | Priority | Example |
|----------|----------|---------|
| `getByRole()` | 1st | `page.getByRole('button', { name: 'Login' })` |
| `getByPlaceholder()` | 2nd | `page.getByPlaceholder('Username')` |
| `getByTestId()` / `data-test` | 3rd | `page.locator('[data-test="checkout"]')` |
| **NO XPath** | Forbidden | Never used in codebase |
| **NO `waitForTimeout()`** | Forbidden | Auto-waiting and `expect().toBeVisible()` used instead |

**Example from [`login.page.js`](page-objects/login.page.js):**
```javascript
// Rule Reference: Section 5 - Prefer accessible locators: getByPlaceholder, getByRole
this.usernameInput = page.getByPlaceholder('Username');
this.passwordInput = page.getByPlaceholder('Password');
this.loginButton = page.getByRole('button', { name: 'Login' });
```

### 6. Page Object Model (POM) Standards (Section 6)

| Rule | Implementation |
|------|----------------|
| **Locators as class properties** | All locators defined in constructor |
| **Pass `page` to constructor** | Every POM class accepts `page` as parameter |
| **Composite methods** | Multi-step interactions encapsulated (e.g., `login()`, `fillCustomerInformation()`) |
| **No assertions in POMs** | All `expect()` calls placed in test specs or assertion helpers |

**Example from [`checkout-step-one.page.js`](page-objects/checkout-step-one.page.js):**
```javascript
// Rule Reference: Section 6 - Composite method for multi-step interaction.
async fillCustomerInformation(firstName, lastName, postalCode) {
  await this.firstNameInput.fill(firstName);
  await this.lastNameInput.fill(lastName);
  await this.postalCodeInput.fill(postalCode);
  await this.continueButton.click();
}
```

### 7. Async & Web-First Assertions (Section 7)

| Pattern | Implementation |
|---------|----------------|
| **Always `await`** | Every Playwright action and assertion is awaited |
| **Auto-retrying assertions** | `expect(locator).toBeVisible()` used instead of `isVisible().toBe(true)` |
| **Web-first assertions** | All assertions use Playwright's built-in auto-retry mechanism |

**Example from [`assertion-helpers.js`](helpers/assertion-helpers.js):**
```javascript
// Rule Reference: Section 7 - Always use auto-retrying assertions.
export const verifyElementIsVisible = async (locator) => {
  await expect(locator).toBeVisible();
};
```

### 8. Test Isolation & Reliability (Section 8)

| Rule | Application |
|------|-------------|
| **Stateless tests** | Each test creates its own page object instances |
| **Single logical concept** | Each test verifies one complete workflow |
| **No shared state** | No global variables shared across test files |

### 9. Best Practices (Section 9)

| Practice | Implementation |
|----------|----------------|
| **Centralized config** | All settings in `playwright.config.js` |
| **`baseURL` usage** | Relative paths used: `await page.goto('/')` |
| **Trace on failure** | `trace: 'retain-on-failure'` configured |
| **Screenshots** | `screenshot: 'on'` for all tests |

### 10. Reporting (Section 10)

| Feature | Configuration |
|---------|---------------|
| **HTML Reporter** | `reporter: 'html'` in config |
| **Failure artifacts** | Screenshots, traces, videos auto-attached |

### 11. Documentation & Type Intelligence (Section 11)

| Standard | Implementation |
|----------|----------------|
| **JSDoc comments** | All classes and methods have JSDoc annotations |
| **Type hints** | `@param {import('@playwright/test').Page} page` pattern used |
| **Named exports** | `export class LoginPage`, `export function generateCheckoutData()` |

**Example JSDoc from [`login.page.js`](page-objects/login.page.js):**
```javascript
/**
 * Performs login with provided credentials.
 * Rule Reference: Section 6 - Move multi-step interactions into composite methods.
 * @param {string} username - The username.
 * @param {string} password - The password.
 * @returns {Promise<void>}
 */
async login(username, password) { ... }
```

---

## Guardrail Violation Examples

The [`violation-examples/guardrail-violations.js`](violation-examples/guardrail-violations.js) file demonstrates common anti-patterns and their compliant alternatives:

| Violation | Section | Risk | Compliant Alternative |
|-----------|---------|------|----------------------|
| Hardcoded credentials | Section 4 | Secrets leak to VCS | Use `process.env` via dotenv |
| `page.waitForTimeout()` | Section 5 | Flaky tests | Use `expect(locator).toBeVisible()` |
| XPath selectors | Section 5 | Fragile locators | Use `getByRole()`, `getByPlaceholder()` |
| Assertions in POMs | Section 6 | Hidden failures | Place assertions in test specs |
| Sync assertions | Section 7 | Race conditions | Use web-first assertions |
| CommonJS `require()` | Section 1 | Module inconsistency | Use ES `import` |

### Runtime Guardrail Interceptors

The violation examples file also provides runtime guards:

```javascript
// Validates credentials are loaded from environment, not hardcoded
export const validateCredentialFromEnv = (value, name) => { ... }

// Prevents accidental use of static waits
export const preventStaticWait = (ms) => { ... }
```

---

## Inline Rule References

All code files include inline comments referencing the specific guardrail section from `copilot_instructions.md`:

```javascript
// Rule Reference: Section 5 - Prefer accessible locators: getByPlaceholder, getByRole
// Rule Reference: Section 6 - Pass page to constructor and define locators as class properties
// Rule Reference: Section 7 - Use auto-retrying web-first assertions
```

This pattern ensures:
- **Traceability**: Every implementation decision links to documented standards
- **Onboarding**: New team members understand the reasoning behind patterns
- **Review**: Code reviewers can verify compliance against referenced rules
- **Maintenance**: Standards are consistently applied as code evolves
