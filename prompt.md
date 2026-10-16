Act as a Senior Test Automation Engineer. Create a complete SauceDemo end-to-end checkout test using JavaScript, Playwright Test, and Page Object Model.

Before implementation, inspect and reuse the existing instructions, page objects, helpers, test configuration, and package scripts. Do not recreate the framework, alter unrelated files, or add unnecessary dependencies.

Analyze SauceDemo's actual DOM before selecting locators. Prefer accessible roles, labels, and text, then stable CSS selectors only when needed. Do not invent accessible names or test IDs. Never use XPath. Identify products by exact visible names, not list positions. Confirm successful login with `.inventory_list`.

Build or extend separate page objects for login, inventory, cart, checkout information, checkout overview, and order completion. Keep locators and UI interactions in the appropriate page objects and test assertions in the spec. Use asynchronous Playwright APIs correctly and do not override native methods.

Implement one test named `should complete an e-commerce checkout successfully` that logs in using credentials from environment variables, adds two distinct products by name, verifies exact cart contents and quantities, enters buyer information, checks the overview products, and finishes the order. Capture product prices before adding them to the cart. Compute subtotal, tax, and final total using integer cents; verify SauceDemo's observed tax and rounding behavior instead of asserting visibility alone. Assert the order-success heading and supporting message.

Guardrails: no hardcoded credentials, XPath, arbitrary sleeps, weakened assertions, duplicated page-object logic, or unnecessary configuration/dependency changes. Add comments describing the test purpose and major business-flow steps. Run the test with the existing npm script, fix genuine failures, and report the actual result. Do not alter the guardrail-violation example.