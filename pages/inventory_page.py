from playwright.sync_api import Page


class InventoryPage:

    def __init__(self, page: Page):
        self.page = page

        self.inventory_container = page.get_by_test_id(
            "inventory-container"
        )

        self.cart_link = page.get_by_test_id(
            "shopping-cart-link"
        )

    def add_product(self, product_name: str) -> None:
        product = self.page.get_by_test_id(
            "inventory-item"
        ).filter(
            has=self.page.get_by_text(
                product_name,
                exact=True
            )
        )

        product.get_by_role(
            "button",
            name="Add to cart"
        ).click()

    def open_cart(self) -> None:
        self.cart_link.click()
