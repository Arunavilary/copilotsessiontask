Act as a Test Automation Architect. I want to set up a new Playwright automation framework with JavaScript for web testing.

1. Initialize a new Node.js project with package.json (name: "playwright-demo-framework", version: "1.0.0").

2. Install Playwright Test framework as a dependency (@playwright/test).

3. Generate a standard folder structure:
   - /tests/specs/ - for test specification files
   - /tests/pages/ - for Page Object Model classes
   - /tests/helpers/ - for reusable helper utility functions

4. Create helper utility functions in /tests/helpers/:
   - Create waitHelpers.js with functions: waitForElement(), waitForPageLoad()
   - Create assertionHelpers.js with functions: assertElementVisible(), assertElementText()
   - Create dataHelpers.js with functions: generateRandomEmail(), generateRandomString()
   - All helpers should include JSDoc comments and use async/await patterns
   - Create index.js to export all helper functions

5. Create an example Page Object Model class (example-page.js) in /tests/pages/ demonstrating:
   - Constructor with page parameter
   - Locator definitions as class properties
   - Action methods (e.g., navigate, fillForm, clickButton)
   - Assertion methods using the helper functions
   - Proper JSDoc documentation

6. Create a playwright.config.js file with the following configuration:
   - Use chromium browser only
   - Set headless: false for demo purposes
   - Enable HTML reporter
   - Set base URL to an empty string (we'll use full URLs in tests)
   - Set timeout to 30 seconds
   - Use 1 worker (single browser instance)
   - Disable parallel execution (fullyParallel: false)

7. Create a simple README.md file with:
   - Project description
   - Instructions for creating .env file for credentials
   - Commands to install dependencies (npm install)
   - Commands to run tests (npx playwright test)
   - Commands to view HTML report (npx playwright show-report)

8. Install dotenv package for environment variable management:
   - Add dotenv as a dev dependency
   - Mention that credentials should be stored in .env file

Make sure all files follow JavaScript best practices and use modern ES6+ syntax.