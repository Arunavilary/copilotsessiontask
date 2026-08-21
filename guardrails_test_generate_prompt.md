# Prompt 2: Guardrail Implementation and Test generation

Before generating, modifying, or creating any files, review and strictly follow all architecture rules, locator strategies, security guidelines, and coding standards defined in `copilot_instructions.md`.

---

## 1. Core Mandate

- Read `copilot_instructions.md` located at the project root before writing any code.
- Ensure every generated file strictly complies with all guardrails in `copilot_instructions.md`.
- Annotate key implementation choices in all files with inline comments explicitly referencing the relevant section from `copilot_instructions.md`.

---

## 2. Environment & Configuration Setup

- Create `.env.example` containing placeholder keys for `BASE_URL`, `STANDARD_USER`, and `PASSWORD`.
- Create `.env` containing execution values targeting `https://www.saucedemo.com` and standard test credentials.
- Load all configurations dynamically in code using `process.env` via `dotenv`.

---

## 3. Helper Utilities (`/helpers`)

- Create `data-helpers.js` with functions to generate dynamic checkout details like first name, last name, and postal code.
- Create `assertion-helpers.js` with reusable assertion functions to verify page headers and cart state.
- Create an `index.js` barrel export file in `/helpers` to re-export all helper modules through a single entry point.
- Include complete JSDoc annotations above all helper functions for IDE autocompletion and type safety.

---

## 4. Page Object Model Setup (`/page-objects`)

Create Page Object classes for the full Saucedemo user journey using `kebab-case.page.js` file naming:

- Create `login.page.js` containing username, password, login button locators, and a composite `login()` method.
- Create `inventory.page.js` containing product items, add-to-cart buttons, cart badge locators, and cart navigation methods.
- Create `cart.page.js` containing cart items, remove buttons, and the checkout navigation method.
- Create `checkout-step-one.page.js` containing customer information input locators and a `fillCheckoutInformation()` method.
- Create `checkout-step-two.page.js` containing order summary locators, item price calculation details, and a `finishCheckout()` method.
- Create `checkout-complete.page.js` containing order completion header locators and state verification methods.

---

## 5. Test Specification Setup (`/tests`)

- Create `checkout.spec.js` in `/tests` automating the full flow from login to order completion.
- Group the workflow inside a `test.describe()` block and write descriptive test block titles starting with `should`.
- Initialize page object instances and handle relative navigation using `test.beforeEach()` hooks.
- Import helper functions exclusively through the `/helpers/index.js` barrel file.

---

## 6. Guardrail Violation Protocols

If a guardrail violation is demonstrated or encountered:
- Flag the non-compliant code explicitly using inline code comments and trigger runtime error/warning checks during execution.
- Identify the exact section and rule number from `copilot_instructions.md` that was violated.
- Explain the operational risk caused by the violation, such as flakiness, security leaks, or unhandled async states.
- Demonstrate the non-compliant snippet alongside its fully corrected, compliant implementation.
- Provide configuration instructions for static analysis tools like ESLint using `eslint-plugin-playwright` to catch violations automatically.

---

## 7. Output Deliverables

Provide the response structured into the following distinct sections:

1. Compliant Automation Codebase
   - Environment files (`.env` and `.env.example`).
   - Helper utilities (`/helpers/data-helpers.js`, `/helpers/assertion-helpers.js`, and `/helpers/index.js`).
   - Page Object Model classes (`/page-objects/login.page.js` through `/page-objects/checkout-complete.page.js`).
   - End-to-end test specification (`/tests/checkout.spec.js`) mapped back to `copilot_instructions.md` via inline comments.

2. Guardrail-Violating Code Example
   - A standalone snippet intentionally breaking rules from `copilot_instructions.md`.

3. Violation Flagging & Refactoring Breakdown
   - A demonstration of how the anti-pattern is flagged via runtime checks and comments, followed by the compliant refactored solution.

4. Automated Guardrail Enforcement Config
   - A complete `.eslintrc.cjs` configuration tailored with `eslint-plugin-playwright` rules.

---

## 8. README.md Guardrails Documentation Requirements

After generating all code files, update the `README.md` file with a comprehensive **"Guardrails Application"** section documenting how each guardrail from `copilot_instructions.md` has been applied across the codebase:

### Required Documentation Structure

1. **Section-by-Section Mapping Table**: For each section in `copilot_instructions.md` (Sections 1-11), create a table showing:
   - Rule name/description
   - How it was applied in the generated code
   - Specific file and code example demonstrating compliance

2. **Inline Rule Reference Summary**: Document the `// Rule Reference: Section X` comment pattern used throughout the codebase, explaining:
   - Purpose of inline references
   - How they support traceability and code review
   - Examples from generated files

3. **Guardrail Violation Examples Reference**: Include a summary table linking to `violation-examples/guardrail-violations.js` showing:
   - Common anti-patterns
   - Associated section violations
   - Operational risks
   - Compliant alternatives

4. **Runtime Guardrail Interceptors**: Document any runtime validation functions provided (e.g., `validateCredentialFromEnv`, `preventStaticWait`).

### Documentation Format

Use the following markdown structure for each guardrail section:

```markdown
### [Section Number]. [Section Title] (Section [X])

| Rule | Application |
|------|-------------|
| **[Rule Name]** | [How applied in code] |

**Example from [`filepath`](filepath):**
\`\`\`javascript
// Code example with inline rule reference
\`\`\`
```

### Why This Matters

Including guardrails documentation in README.md ensures:
- **Onboarding**: New team members quickly understand framework standards
- **Consistency**: All contributors follow the same patterns
- **Auditability**: Code review can verify compliance against documented rules
- **Maintainability**: Standards remain visible and enforceable over time