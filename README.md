# SauceDemo Playwright Automation Framework

An end-to-end test automation framework for the SauceDemo application using Python, Playwright, and pytest.

## Project Structure

```
pages/              # Page Object Model classes
tests/              # Test files
conftest.py         # pytest configuration
pytest.ini          # pytest settings
requirements.txt    # Python dependencies
```

## Page Objects

- **LoginPage** - Handles login functionality
- **InventoryPage** - Product listing and add to cart actions
- **CartPage** - Shopping cart operations
- **CheckoutPage** - Checkout flow and order completion

## Tests

- `tests/test_checkout.py` - End-to-end checkout flow test

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Install Playwright browsers:
   ```bash
   playwright install
   ```

## Running Tests

Run all tests:
```bash
pytest
```

Run specific test file:
```bash
pytest tests/test_checkout.py
```

Run with verbose output:
```bash
pytest -v
```

## Framework Principles

- **Page Object Model**: Each page has its own class with locators and methods
- **DRY (Don't Repeat Yourself)**: No duplicate locators or actions
- **Clean Code**: Small, focused methods with meaningful names
- **Maintainability**: Easy to update and extend

## Guardrails & Best Practices

### 1. No Hardcoded Sleep Calls
- **Rule**: Never use `time.sleep()` or `page.wait_for_timeout()`
- **Why**: Sleep calls make tests flaky, slow, and unpredictable
- **Alternative**: Use Playwright's built-in waiting mechanisms:
  ```python
  expect(element).to_be_visible()  # Waits for element to appear
  expect(element).to_have_text("text")  # Waits for specific text
  page.wait_for_selector(selector)  # Waits for selector to exist
  ```

### 2. Strict Locator Strategies
- **Rule**: Prefer `get_by_role()` and `get_by_test_id()` over CSS/XPath
- **Priority Order**:
  1. `get_by_role()` - Most resilient (accessibility-based)
  2. `get_by_test_id()` - Explicit test attributes
  3. `get_by_label()`, `get_by_placeholder()` - User-facing text
  4. Avoid CSS/XPath unless necessary

- **Example**:
  ```python
  # GOOD - Uses accessibility roles
  button = page.get_by_role("button", name="Login")

  # AVOID - Direct CSS selectors
  button = page.locator(".btn.login-btn")
  ```

### 3. Clean Assertions
- **Rule**: Use `expect()` assertions for all verifications
- **Benefits**: Automatic waiting, better error messages, readable syntax
- **Examples**:
  ```python
  # GOOD - Playwright assertions with auto-wait
  expect(element).to_be_visible()
  expect(element).to_have_text("Expected Text")
  expect(elements).to_have_count(2)

  # AVOID - Basic assert statements
  assert element.is_visible()
  ```

### 4. Proper Error Handling & Messages
- **Rule**: Assertions include clear, descriptive error messages
- **Example**:
  ```python
  assert displayed_total == expected_total, (
      f"Expected total ${expected_total:.2f}, "
      f"but displayed total was ${displayed_total:.2f}"
  )
  ```

### 5. Page Object Model (POM) Enforcement
- **Rule**: All page locators and actions live in Page Classes
- **Test files contain only**: Business logic and assertions
- **Page Objects contain only**: Locators and reusable methods
- **Benefit**: Changes to UI selectors only require updates in one place

### 6. No Assertions in Page Objects
- **Rule**: Page Objects provide methods; tests contain assertions
- **Example**:
  ```python
  # Page Object
  def get_total_price(self) -> float:
      return float(self.total.inner_text().split("$")[1])

  # Test
  assert checkout_page.get_total_price() == 100.00
  ```

## Prompt-Driven Development

Framework structure and tests are guided by detailed prompt files:

- **`prompts/framework.prompt.md`** - Overall framework setup instructions
- **`prompts/checkout-flow.prompt.md`** - Specific test scenario details

These prompts instruct Copilot to generate code following all guardrails automatically.
