# SauceDemo Playwright Framework Generation

## Objective

Create a clean, maintainable end-to-end test automation framework for the SauceDemo application using:

- Python
- Playwright
- pytest
- Page Object Model (POM)

Application URL:

https://www.saucedemo.com/

---

## Framework Structure

Create the following project structure:

```text
.github/
    copilot-instructions.md

prompts/
    framework.prompt.md
    checkout-flow.prompt.md

pages/
    __init__.py
    login_page.py
    inventory_page.py
    cart_page.py
    checkout_page.py

tests/
    __init__.py
    test_checkout.py

conftest.py
pytest.ini
requirements.txt
README.md
