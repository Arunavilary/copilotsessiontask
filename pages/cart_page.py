from playwright.sync_api import Locator, Page


class CartPage:

    def __init__(self, page: Page):
        self.page = page

        self.cart_items = page.get_by_test_id(
            "inventory-item"
        )

        self.title = page.get_by_test_id("title")

        self.checkout_button = page.get_by_role(
            "button",
            name="Checkout"
        )

    def get_product(
        self,
        product_name: str
    ) -> Locator:
        return self.cart_items.filter(
            has_text=product_name
        )

    def proceed_to_checkout(self) -> None:
        self.checkout_button.click()
