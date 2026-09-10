# Playwright JavaScript Automation Guardrails & Coding Standards

## General Rules

* **MANDATORY:** All automated test cases MUST be implemented using the **Page Object Model (POM)** approach.
* Use **Playwright Test (`@playwright/test`)** as the test runner and automation framework.
* Each test method MUST contain a comment that clearly describes the purpose of the test.
* Prefer Playwright's built-in synchronization and auto-waiting capabilities.
* **DO NOT** use fixed delays such as `page.waitForTimeout()` unless there is a specific technical reason that makes it unavoidable.
* For this demonstration, configure and execute tests using **Chromium only**.

## Page Object Model (POM) Rules

* **CRITICAL:** Page Objects MUST be maintained separately inside the `pages/` directory.
* Each Page Object class should represent a single application page or an independent reusable UI component.
* Page Object classes should include:

  * Playwright locators required for that page/component.
  * Methods representing user actions and UI interactions.
  * Helper methods for checking UI state when required.
* Use meaningful action-oriented method names such as:

  * `enterSearchText()`
  * `clickSearchButton()`
  * `selectProduct()`
* **CRITICAL:** Never replace, redefine, or override Playwright's native methods. For example, do not implement a custom `click()` method that conflicts with Playwright functionality.
* Page Objects should focus on **UI interaction and abstraction**.
* Test-specific logic and primary test assertions should remain within the test specification files.

## Locator Strategy

* **MANDATORY:** Always prefer stable, user-facing locators over selectors that depend heavily on the DOM structure.

* Follow this locator priority:

  1. `getByRole()` — for semantic elements such as buttons, links, headings, and textboxes.
  2. `getByLabel()` — for form controls with accessible labels.
  3. `getByPlaceholder()` — for inputs identified by placeholder text.
  4. `getByTestId()` — when a suitable `data-testid` is available.
  5. `getByText()` — when unique visible text can reliably identify the element.
  6. CSS selectors — use only when the preferred locator strategies are not suitable.

* **CRITICAL:** XPath MUST NOT be used anywhere in the automation code.

* Avoid brittle selectors such as `nth-child()`, deeply nested CSS selectors, or selectors tightly coupled to the current DOM structure.

* Locators MUST be defined inside the appropriate Page Object instead of being repeatedly declared inside test files.

* Use descriptive locator names such as:

  * `usernameInput`
  * `passwordInput`
  * `loginButton`
  * `searchInput`

## Wait Strategy

* **CRITICAL:** Do not introduce arbitrary hardcoded delays such as:
  `page.waitForTimeout(3000)`
* Rely on Playwright's auto-waiting for standard interactions including `click()`, `fill()`, and similar operations.
* When an explicit wait is genuinely required, use Playwright's supported synchronization methods, such as:

  * `waitForLoadState('domcontentloaded')`
  * `waitForLoadState('networkidle')`
  * `waitForSelector()`
  * `waitForURL()`
* Use explicit waits only when they provide meaningful synchronization with the application state.
* Avoid adding waits merely to make the test execution slower or more predictable.

## Security & Safety

* **CRITICAL:** Never hardcode passwords, credentials, API keys, authentication tokens, or other sensitive information in test scripts.
* Sensitive values MUST be supplied through environment variables, configuration files, or other secure mechanisms.
* **CRITICAL:** Tests MUST NOT interact with production environments.
* Use only designated QA, test, or staging environments.
* Any destructive operation, such as an API `DELETE` request, must include a clear comment explaining why the operation is required.
* Do not expose confidential test data in source code, logs, or reports unnecessarily.

## Code Style & Naming Conventions

* Use **camelCase** for JavaScript variables, functions, and methods.
* Use **PascalCase** for Page Object class names.
* Page Object classes should have descriptive names, for example:

  * `LoginPage`
  * `ProductPage`
  * `CheckoutPage`
* Test specification files MUST use the `.spec.js` extension.
* Page Object files should use **kebab-case**, matching their corresponding class name, for example:

  * `login-page.js`
  * `product-page.js`
  * `checkout-page.js`
* Test descriptions should clearly explain the expected behavior and preferably follow the `should...` naming style.
* Keep test methods concise and readable.
* Move reusable UI operations into Page Objects instead of placing large interaction sequences directly inside tests.

## File Organization

* Maintain the following project structure:

```text
/tests
  ├── specs/              # Playwright test specification files
  └── pages/              # Page Object classes

/playwright.config.js     # Playwright configuration
/package.json             # Project dependencies and scripts
```

* Keep test specifications, Page Objects, configuration, and dependencies clearly separated.
* Do not place Page Object implementations directly inside test specification files.
* Store shared Playwright configuration in `playwright.config.js` rather than duplicating configuration across individual tests.

## Error Prevention

* **CRITICAL:** Do not override Playwright's built-in methods in Page Objects, fixtures, or helper classes.
* Every asynchronous Playwright operation MUST use `await` where required.
* Use `test.beforeEach()` for common test setup and preconditions when applicable.
* Use `test.afterEach()` for cleanup or teardown activities when required.
* Tests MUST be independent and should not rely on another test being executed first.
* Avoid sharing mutable state between tests.
* Test data should be handled through appropriate fixtures, configuration, environment variables, or dedicated test-data mechanisms rather than unnecessarily hardcoding values inside test cases.
* Verify that all locators and actions are valid before considering the automation complete.

## Reporting

* Use Playwright's **built-in HTML reporter** for test execution results.
* Configure the reporter through `playwright.config.js`.
* The generated report should be viewable using:

```bash
npx playwright show-report
```

* Ensure the reporting configuration is maintained centrally and is not duplicated across test files.

## Best Practices

* **MANDATORY:** Keep each test focused on one primary behavior or assertion concept.
* Tests MUST be independent and capable of running in any order.
* Use Page Object methods to separate UI implementation details from test scenarios.
* Prefer reusable methods over duplicated UI interaction code.
* Use meaningful test names that clearly describe the expected behavior.
* Add comments when explaining complex or non-obvious test logic.
* Keep configuration values inside `playwright.config.js` or appropriate environment/configuration files.
* Avoid unnecessary complexity in test implementations.
* Follow Playwright's recommended practices wherever possible.
* Before completing the implementation, verify that:

  * POM is followed consistently.
  * XPath is not used.
  * Unnecessary `waitForTimeout()` calls are absent.
  * Native Playwright methods have not been overridden.
  * Sensitive information is not hardcoded.
  * Locators are maintained within Page Objects.
  * Test and Page Object naming conventions are followed.
  * Tests run independently.
  * Chromium is the configured browser.
  * HTML reporting is enabled.
