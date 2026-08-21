# Instructions for GitHub Copilot: SauceDemo End-to-End Checkout Test Generation

Act as a Senior QA Automation Architect. Before generating, modifying, or creating any files, review and strictly follow all architecture rules, locator strategies, security guidelines, and coding standards defined in `copilot_instructions.md` located in the project root.

---

## 1. Core Mandate & Guardrail Alignment

- Read `copilot_instructions.md` located in the project root before writing any code.
- Ensure every generated file strictly complies with all guardrails in `copilot_instructions.md`.
- Annotate key implementation choices across all files with inline comments explicitly referencing the relevant section from `copilot_instructions.md` (e.g., `// Rule Reference: Section 5 - Locators & Waiting Strategies`).

---

## 2. Environment Setup Rules

- Create `.env.example` in the root directory containing template placeholders:
  - `BASE_URL=https://www.saucedemo.com`
  - `TEST_USERNAME=standard_user`
  - `TEST_PASSWORD=secret_sauce`
- Create `.env` in the root directory containing actual execution credentials for local testing.
- Load environment variables dynamically in test specs using `dotenv` via `process.env`. Do NOT hardcode credentials or URLs in page objects or spec files.

---

## 3. Helper Utilities Rules (`/helpers`)

Create modular utility functions with complete JSDoc annotations:

- `helpers/data-helpers.js`: Export a `generateCheckoutData()` function returning dynamic customer details (`firstName`, `lastName`, `postalCode`).
- `helpers/assertion-helpers.js`: Export reusable, web-first assertion functions (e.g., `verifyElementIsVisible(locator)`).
- `helpers/index.js`: Barrel export file re-exporting all helper modules through a single entry point.

---

## 4. Page Object Model Rules (`/page-objects`)

Create Page Object Model (POM) classes in `/page-objects` using `kebab-case.page.js` file naming:

- `login.page.js` (`LoginPage`): Encapsulate username, password, login button locators, and `navigate()` / `login()` methods.
- `inventory.page.js` (`InventoryPage`): Encapsulate inventory list, add-to-cart button, shopping cart link locators, and navigation methods.
- `cart.page.js` (`CartPage`): Encapsulate cart list, checkout button locators, and `proceedToCheckout()` method.
- `checkout-step-one.page.js` (`CheckoutStepOnePage`): Encapsulate customer information input locators and `fillCustomerInformation()` method.
- `checkout-step-two.page.js` (`CheckoutStepTwoPage`): Encapsulate overview summary locators and `finishCheckout()` method.
- `checkout-complete.page.js` (`CheckoutCompletePage`): Encapsulate completion header locators and `isOrderComplete()` method.

**POM Guardrail Constraints:**
- Store locators as class constructor properties using semantic Playwright locators (`getByPlaceholder`, `getByRole`, `getByTestId`).
- Do NOT place hard assertions (`expect`) inside Page Object classes.
- Do NOT wrap or override native Playwright methods (e.g., custom `click()` overrides).
- Do NOT use XPath locators or fragile CSS selector chains.

---

## 5. Test Specification Setup Rules (`/tests/checkout.spec.js`)

Create a single, focused end-to-end test specification:

- **File Path:** `/tests/checkout.spec.js`.
- **Single Function Structure:** Define **ONLY ONE** top-level test function: `test('should complete the end-to-end checkout flow successfully', async ({ page }) => { ... })`.
- **NO Nesting or Hooks:** Do **NOT** use `test.describe()` wrapper blocks and do **NOT** use `test.beforeEach()` or `test.afterEach()` hooks.
- **Inline Initialization & Execution:** Instantiate all Page Objects (`loginPage`, `inventoryPage`, `cartPage`, etc.) directly inside the single `test()` function body.
- **Workflow Sequence (All inside the single test):**
  1. Open SauceDemo URL using `process.env.BASE_URL`.
  2. Log in using `process.env.TEST_USERNAME` and `process.env.TEST_PASSWORD`.
  3. Verify `.inventory_list` is visible using web-first retrying assertions.
  4. Add an item to the cart and navigate to the cart page.
  5. Proceed to checkout, fill dynamic customer details from `data-helpers.js`, and click Continue.
  6. Verify order summary visibility and finish checkout.
  7. Assert that the completion heading (`Thank you for your order!`) is visible.
- **Execution Rules:**
  - Import utilities exclusively from `../helpers/index.js`.
  - Use proper `async/await` for every Playwright action and assertion.
  - Do NOT use `page.waitForTimeout()` or static sleep calls.

---

## 6. Guardrail Violation Protocols

Demonstrate anti-pattern violation handling and static guardrail enforcement:

- **Violation Flagging:** Include a standalone code snippet demonstrating common non-compliant patterns (e.g., static waits, hardcoded passwords, or XPath usage).
- **Runtime Error Checking:** Provide a runtime interceptor check or custom error throw demonstrating how anti-patterns are intercepted during execution.
- **Refactoring Demonstration:** Show a comparison table mapping non-compliant snippets directly to their section in `copilot_instructions.md`, explaining operational risks and providing the refactored compliant alternative.
- **Static Analysis Configuration:** Provide a ready-to-use `.eslintrc.cjs` configuration configured with `eslint-plugin-playwright` rules to catch violations statically.

---

## 7. Required Deliverables Format

Deliver the full solution structured strictly under the following four section headers:

1. **Compliant Automation Codebase:**
   - `.env.example` and `.env`
   - `/helpers/data-helpers.js`, `/helpers/assertion-helpers.js`, `/helpers/index.js`
   - `/page-objects/login.page.js` through `/page-objects/checkout-complete.page.js`
   - `/tests/checkout.spec.js` (flat single-test structure with `copilot_instructions.md` reference comments)
2. **Guardrail-Violating Code Example:**
   - Standalone non-compliant snippet violating `copilot_instructions.md`.
3. **Violation Flagging & Refactoring Breakdown:**
   - Runtime error detection demonstration and side-by-side refactoring comparison table.
4. **Automated Guardrail Enforcement Config:**
   - Working `.eslintrc.cjs` file configured with `eslint-plugin-playwright`.

---

## 8. README.md Guardrails Documentation Requirements

After generating all code files, update the `README.md` file with a comprehensive **"Guardrails Application"** section. This ensures anyone reviewing the generated code can understand how guardrails from `copilot_instructions.md` have been applied.

### Required Documentation Structure

1. **Guardrails Application Section**: Create a new section in README.md titled "Guardrails Application" containing:

   - **Section-by-Section Breakdown**: For each section (1-11) in `copilot_instructions.md`, include:
     - Table mapping rules to their implementation in generated code
     - Specific file references with code examples
     - Links to the actual files demonstrating compliance

   - **Example Format for Each Section**:
     ```markdown
     ### [X]. [Section Title] (Section [X])
     
     | Rule | Application |
     |------|-------------|
     | **[Rule Name]** | [Implementation description] |
     
     **Example from [`filepath`](filepath):**
     \`\`\`javascript
     // Rule Reference: Section X - [Rule description]
     [code snippet]
     \`\`\`
     ```

2. **Inline Rule Reference Documentation**: Explain the `// Rule Reference: Section X` comment pattern:
   - Purpose: Traceability between code and standards
   - Benefits: Onboarding, code review, maintenance
   - Examples from multiple file types (page objects, helpers, test specs)

3. **Guardrail Violations Summary**: Include a table referencing `violation-examples/guardrail-violations.js`:
   
   | Violation | Section | Risk | Compliant Alternative |
   |-----------|---------|------|----------------------|
   | Hardcoded credentials | Section 4 | Secrets in VCS | `process.env` via dotenv |
   | `waitForTimeout()` | Section 5 | Flaky tests | Web-first assertions |
   | XPath selectors | Section 5 | Fragile locators | Semantic locators |
   | Assertions in POMs | Section 6 | Hidden failures | Assertions in test specs |
   | Sync assertions | Section 7 | Race conditions | Auto-retrying assertions |
   | CommonJS imports | Section 1 | Module inconsistency | ES Module imports |

4. **Runtime Guardrail Interceptors**: Document runtime validation functions:
   - `validateCredentialFromEnv(value, name)` - Prevents hardcoded credentials
   - `preventStaticWait(ms)` - Blocks static wait usage

### Purpose of README Documentation

Including guardrails documentation in README.md serves critical purposes:

| Benefit | Description |
|---------|-------------|
| **Traceability** | Every implementation decision links to documented standards |
| **Onboarding** | New team members understand framework patterns immediately |
| **Code Review** | Reviewers can verify compliance against referenced rules |
| **Consistency** | Standards remain visible and consistently applied |
| **Maintenance** | Framework evolves while maintaining guardrail compliance |

### Documentation Completeness Checklist

Before finalizing the deliverables, ensure README.md includes:

- [ ] Guardrails Application section header
- [ ] All 11 sections from `copilot_instructions.md` covered
- [ ] Tables mapping rules to implementations
- [ ] Code examples with inline rule references
- [ ] File path links to generated code
- [ ] Violation examples summary table
- [ ] Runtime interceptors documentation
- [ ] Inline reference pattern explanation







