# Playwright Automation Framework Instructions

## 1. General Framework Rules

- Use Python with pytest and Playwright.
- Follow the Page Object Model (POM) design pattern.
- Keep page locators and page-specific actions inside Page Object classes.
- Test files should contain the business flow and assertions.
- Avoid duplicating locators or actions across test files.
- Follow PEP 8 conventions.
- Use meaningful class, method, and variable names.
- Keep methods small and focused.

---

## 2. Page Object Model Rules

Each page must have its own Page Object class.

Page Objects should:

- Store page locators.
- Provide reusable methods for user interactions.
- Hide implementation details from tests.
- Avoid unnecessary assertions.
- Avoid duplicating functionality.

Tests should interact with Page Objects instead of directly manipulating page locators.

Example:

```python
class LoginPage:

    def __init__(self, page):
        self.page = page
        self.username = page.get_by_test_id("username")
        self.password = page.get_by_test_id("password")
        self.login_button = page.get_by_role("button", name="Login")

    def login(self, username, password):
        self.username.fill(username)
        self.password.fill(password)
        self.login_button.click()
```
