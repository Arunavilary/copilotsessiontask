## General Rules

**MANDATORY:** All test cases MUST follow the Page Object Model (POM) pattern.
- Use Playwright Test as the test runner (`@playwright/test`).
- Every test method MUST include a comment explaining the test purpose.
- Use Playwright's built-in auto-waiting. DO NOT use arbitrary timeouts like `page.waitForTimeout()` unless absolutely necessary.
- Always run tests in Chromium browser only for this demo.

## Page Object Model (POM) Rules

**CRITICAL:** Create separate Page Object classes in a `pages/` directory.
- Each Page Object class MUST represent a single page or component.
- Page Object classes should contain locators as class properties and action methods. Assertion methods may be used when appropriate.
- DO NOT override Playwright's built-in methods.
- Keep Page Objects focused on UI interactions; test assertions belong in specs.

## Locator Strategy

Use this priority order: `getByRole()`, `getByLabel()`, `getByPlaceholder()`, `getByTestId()`, `getByText()`, then CSS selectors as a last resort.

**CRITICAL:** NEVER use XPath locators. Avoid fragile selectors such as positional selectors and complex CSS chains. Store locators in Page Objects, not test files.

## Wait Strategy

**CRITICAL:** DO NOT use `page.waitForTimeout()` with hardcoded delays. Prefer Playwright auto-waiting, locator conditions, web-first `expect()` assertions, and `page.waitForURL()` when needed.

## Security & Safety

**CRITICAL:** DO NOT hardcode credentials, API keys, or sensitive data in test files. Use environment variables. Do not write to production environments; use the configured demo/test target. Clearly comment on destructive actions.

## Code Style & Naming Conventions

- Use camelCase for JavaScript variables and functions and PascalCase for page object classes.
- Test files end with `.spec.js`; page-object filenames use kebab-case.
- Use descriptive `test('should...')` names, proper `async`/`await`, and keep test logic focused.

## Error Prevention & Reporting

- Do not override native Playwright methods; always await asynchronous Playwright APIs.
- Preserve test independence and useful failure evidence.
- Use the configured Playwright HTML reporter.

## Best Practices

- Prefer focused tests and delegate UI operations to Page Objects.
- Add comments for test purpose and major scenarios.
- Keep configuration in `playwright.config.js`.