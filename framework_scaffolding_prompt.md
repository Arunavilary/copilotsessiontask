# Prompt 1 : Playwright Framework scaffolding prompt

```
Act as an Expert QA Automation architect, specializing in Playwright and JavaScript. I need you to scaffold a Playwright Automation framework used for web testing specifically for testing E-Commerce websites.

1. Initialize a new Playwright project with a package.json (using npm init playwright@latest)
- Add a .env.example file at the root with placeholder variables like BASE_URL, TEST_USER, and TEST_PASSWORD.

2. Create the following project directory structure:
- /helpers — contains reusable utility modules and a central export file(index.js)
- /page-objects — contains Page Object Model (POM) classes representing website pages
- /tests — contains test specification files (.spec.js)

3. Create helper utility functions inside the /helpers :
- Create data-helpers.js : contains helper functions to generate and store user credentials like generateRandomEmail(), generateRandomPassword(), etc.
- Create assertion-helpers.js : containing the functions performing assertions after actions throughout the automation like navigation, element visibility, data correctness, etc.
- All helpers should include JSDoc comments and use async/await patterns
- Create index.js to export all helper functions

4. Create an example POM class file inside the /page-objects containing the following: 
- Constructor with Page parameter 
- All locators stored as class properties inside the constructor
- Action methods like goto(), verifyElement(), etc.
- Assertions for the pages using the helper functions
- All methods should follow the async/await format
- JSDoc comments should be present in the class
- Class export code should also be present in the file after the class description

5. Sample Test (/tests)
- Create a sample login.spec.js file demonstrating a complete end-to-end login test. 
- It should import the page object and helpers through the barrel file, pull credentials from process.env, and run the test steps clean and async.

6. Create a configuration file (playwright.config.js) with the following configurations:
- Enable /tests as the test directory
- Set the test timeout to be 30 seconds and the assertion (expect) timeout to be 5 seconds
- Use chromium browser only for test execution
- Enable HTML as the reporter
- Set tests to run in headed mode (headless:false)
- Retain execution trace on failure
- Capture screenshots for all the tests (screenshot : 'on')
- Use a single worker for the test execution
- Disable parallel execution (fullyParallel : false)

7. Create a README.md file with the following details:
- Project Description
- Instructions to create .env file for storing credentials
- Commands to install browser dependencies (npx playwright install)
- Commands to run tests (npx playwright test)
- Commands to view HTML report (npx playwright show-report)
- Instructions to create .env file for storing credentials

8. Install dotenv package for environment management and mention credentials to be stored inside the .env file

9. Document Guardrails Application in README.md:
After generating all files, add a comprehensive "Guardrails Application" section to README.md that documents how guardrails from `copilot_instructions.md` are applied. Include:

- **Section-by-Section Mapping**: For each section (1-11) in `copilot_instructions.md`, create tables showing:
  - Rule name and description
  - How it was applied in the generated code
  - Specific file and code examples demonstrating compliance

- **Inline Rule Reference Pattern**: Document the `// Rule Reference: Section X` comment pattern used in code files to link implementation to standards

- **Guardrail Violation Examples**: If a violation-examples folder is created, include a summary table of:
  - Common anti-patterns and their section violations
  - Operational risks of each violation
  - Compliant alternative implementations

- **Runtime Guardrail Interceptors**: Document any runtime validation functions that enforce guardrails during test execution

Use this markdown format for each guardrail section:
```markdown
### [X]. [Section Title] (Section [X])

| Rule | Application |
|------|-------------|
| **[Rule Name]** | [How applied in code] |

**Example from [`filepath`](filepath):**
\`\`\`javascript
// Code example with inline rule reference
\`\`\`
```

This documentation ensures new team members understand the framework standards and can verify compliance during code review.

Make sure all files follow JavaScript best practices and use modern ES6+ syntax.
```
