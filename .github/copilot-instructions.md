# Copilot Guardrails for Playwright Automation

- Prefer resilient Playwright locators such as getByRole, getByText, or getByTestId over brittle CSS selectors.
- Avoid hardcoded sleep calls; use Playwright auto-waiting and explicit assertions instead.
- Keep page objects focused on locators and user actions; keep test logic in the spec files.
- Use descriptive assertion messages and verify visible UI state before proceeding.
- Handle user-visible errors with clear assertions and avoid silent failures.
