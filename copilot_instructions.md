# Playwright JavaScript Automation Guardrails & Coding Standards

The following standards, directory structures, and guardrails govern code creation, modification, and refactoring across this automation framework.

---

## 1. General Rules

- Use native Playwright APIs directly without creating custom wrapper functions around core methods.
- Keep classes, specs, and helpers focused on a single responsibility.
- Delete commented-out code, unused variables, and orphaned files before committing.
- Use modern ES6+ syntax (`const` by default, `let` when needed, never `var`).
- Use ES Module imports (`import`/`export`), never CommonJS (`require`).
- Handle or rethrow errors explicitly; never leave empty `catch` blocks.
- Wrap complex workflows in `test.step()` blocks for clean execution logs.
- Run tests in headless mode by default during automated test execution.
- Use path-agnostic syntax and `dotenv` for cross-platform support.
- Ensure `.gitignore` excludes reports, traces, videos, `node_modules`, and `.env`.

---

## 2. Directory Structure & File Organization

- Place test specs in `/tests`, page objects in `/page-objects`, and utilities in `/helpers`.
- Use `index.js` barrel exports in helper folders for clean imports.

---

## 3. Naming Conventions

- Use `camelCase` for functions and variables (`getUserData`, `submitButton`).
- Use `PascalCase` for classes (`LoginPage`, `DataHelper`).
- Name test files in `kebab-case.spec.js` (`user-login.spec.js`).
- Name Page Object files in `kebab-case.page.js` (`login.page.js`).
- Use clear, action-oriented method names that describe the UI operation being performed.

---

## 4. Safety & Security Guardrails

- Never hardcode credentials, URLs, or secrets in code.
- Load environment variables via `dotenv` (`process.env`).
- Restrict test execution to non-production environments (staging or dedicated test instances).
- Flag destructive operations like data deletion with explanatory comments.
- Maintain a `.env.example` template and add `.env` to `.gitignore`.

---

## 5. Locators & Waiting Strategies

- Prefer accessible locators in priority order: `getByRole()`, `getByLabel()`, `getByPlaceholder()`, `getByTestId()`, `getByText()`.
- Use CSS selectors only as a last resort; never use XPath selectors or fragile CSS chains.
- Never use `page.waitForTimeout()`; rely on auto-waiting, state waiters (`locator.waitFor()`), navigation waiters (`page.waitForURL()`), or page load events (`waitForLoadState()`).

---

## 6. Page Object Model (POM) Standards

- Encapsulate locators and action workflows inside Page Object classes.
- Pass `page` to the constructor and define locators as class properties.
- Do not wrap or override core Playwright methods inside Page Objects.
- Keep assertions out of Page Objects; place them in test specs or helpers.
- Move multi-step interactions into composite Page Object methods (`await loginPage.login(...)`).

---

## 7. Async & Web-First Assertions

- Always `await` every Playwright action and assertion.
- Use auto-retrying web-first assertions (`await expect(locator).toBeVisible()`).
- Never use non-retrying sync assertions (`expect(await locator.isVisible()).toBe(true)`).

---

## 8. Test Isolation & Reliability

- Ensure tests are stateless, independent, and runnable in any sequence.
- Keep each test focused on verifying a single logical concept or workflow.
- Do not share global state variables across test files.
- Seed test data via APIs or `beforeEach` hooks rather than depending on UI test sequences.

---

## 9. General Best Practices

- Group tests with `test.describe()` and use `beforeEach`/`afterEach` for setup and teardown.
- Extract repetitive logic and navigation into helper modules.
- Keep framework and run configurations centralized in `playwright.config.js` rather than in test specs.
- Enable trace, screenshot, and video capture on failure in `playwright.config.js`.
- Set `baseURL` in `playwright.config.js` and use relative paths in tests (`await page.goto('/login')`).

---

## 10. Reporting

- Configure HTML and list reporters directly in `playwright.config.js`.
- View reports after execution using `npx playwright show-report`.
- Attach failure traces, screenshots, and videos automatically.
- Add test metadata using Playwright annotations (`test.info().annotations.push(...)`).

---

## 11. Documentation & Type Intelligence

- Add JSDoc comments to classes and methods explaining their purpose and parameter types:
  ```javascript
  /**
   * @param {import('@playwright/test').Page} page
   */
- Use explicit ES6 named exports (export class LoginPage, export function helper()).