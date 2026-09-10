import pytest
from playwright.sync_api import Page, expect

from pages.login_page import LoginPage
from pages.inventory_page import InventoryPage
from pages.cart_page import CartPage
from pages.checkout_page import CheckoutPage


@pytest.fixture
def login(page: Page):
    """Login fixture that navigates and logs in with valid credentials."""
    login_page = LoginPage(page)
    login_page.navigate()
    login_page.login(
        username="standard_user",
        password="secret_sauce"
    )
    return page


def test_checkout_flow(login: Page):
    """
    End-to-end test for the SauceDemo checkout flow.

    Verifies the complete user journey from login through order completion.
    """
    page = login

    # Step 2: Verify Inventory page is displayed
    inventory_page = InventoryPage(page)
    expect(inventory_page.inventory_container).to_be_visible()

    # Step 3: Add products
    inventory_page.add_product("Sauce Labs Backpack")
    inventory_page.add_product("Sauce Labs Bike Light")

    # Step 4: Open cart and verify products
    inventory_page.open_cart()
    cart_page = CartPage(page)
    expect(cart_page.title).to_have_text("Your Cart")
    expect(
        cart_page.get_product("Sauce Labs Backpack")
    ).to_be_visible()
    expect(
        cart_page.get_product("Sauce Labs Bike Light")
    ).to_be_visible()
    expect(cart_page.cart_items).to_have_count(2)

    # Step 5: Proceed to checkout
    cart_page.proceed_to_checkout()
    checkout_page = CheckoutPage(page)

    # Step 6: Enter customer information
    checkout_page.enter_customer_information(
        first_name="Test",
        last_name="User",
        postal_code="682001"
    )
    checkout_page.continue_to_overview()

    # Step 7: Verify order summary (total calculation)
    item_total = checkout_page.get_item_total()
    tax = checkout_page.get_tax()
    displayed_total = checkout_page.get_total()
    expected_total = round(item_total + tax, 2)
    assert displayed_total == expected_total, (
        f"Expected total ${expected_total:.2f}, "
        f"but displayed total was ${displayed_total:.2f}"
    )

    # Step 8: Complete order
    checkout_page.finish_order()
    expect(checkout_page.confirmation_message).to_have_text(
        "Thank you for your order!"
    )
