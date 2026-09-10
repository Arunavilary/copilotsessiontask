from playwright.sync_api import Page


class CheckoutPage:

    def __init__(self, page: Page):
        self.page = page

        self.first_name_input = page.get_by_role(
            "textbox",
            name="First Name"
        )

        self.last_name_input = page.get_by_role(
            "textbox",
            name="Last Name"
        )

        self.postal_code_input = page.get_by_role(
            "textbox",
            name="Zip/Postal Code"
        )

        self.continue_button = page.get_by_role(
            "button",
            name="Continue"
        )

        self.finish_button = page.get_by_role(
            "button",
            name="Finish"
        )

        self.item_total = page.get_by_test_id(
            "subtotal-label"
        )

        self.tax = page.get_by_test_id(
            "tax-label"
        )

        self.total = page.get_by_test_id(
            "total-label"
        )

        self.confirmation_message = page.get_by_test_id(
            "complete-header"
        )

    def enter_customer_information(
        self,
        first_name: str,
        last_name: str,
        postal_code: str
    ) -> None:
        self.first_name_input.fill(first_name)
        self.last_name_input.fill(last_name)
        self.postal_code_input.fill(postal_code)

    def continue_to_overview(self) -> None:
        self.continue_button.click()

    def get_item_total(self) -> float:
        text = self.item_total.inner_text()
        return float(text.split("$")[1])

    def get_tax(self) -> float:
        text = self.tax.inner_text()
        return float(text.split("$")[1])

    def get_total(self) -> float:
        text = self.total.inner_text()
        return float(text.split("$")[1])

    def finish_order(self) -> None:
        self.finish_button.click()
