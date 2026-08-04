# SauceDemo Playwright Test Automation Framework

A production-ready Playwright test automation framework built with TypeScript and Page Object Model (POM) architecture for testing the SauceDemo e-commerce application.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Framework Design](#framework-design)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)

## ✨ Features

- **Page Object Model (POM)**: Clean separation of test logic and page interactions
- **TypeScript**: Type-safe code with IntelliSense support
- **Prompt-Driven Development**: Custom prompts and guardrails for AI-assisted development
- **Strict Locator Strategy**: Uses `getByRole()`, `getByTestId()` for stable element location
- **No Hard-coded Waits**: Relies on Playwright's auto-waiting mechanism
- **Parallel Execution**: Tests run in parallel for faster feedback
- **Rich Reporting**: HTML, JSON, and list reporters
- **Screenshot & Video on Failure**: Automatic capture for debugging
- **Reusable Utilities**: Helper functions and test data management

## 📁 Project Structure

```
copilotsessiontask/
├── .github/
│   └── copilot-instructions.md    # GitHub Copilot guardrails
├── pages/                          # Page Object Model classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── CheckoutOverviewPage.ts
│   └── ConfirmationPage.ts
├── tests/                          # Test files
│   ├── e2e-checkout.spec.ts       # E2E checkout flow tests
│   └── example.spec.ts            # Sample tests
├── utils/                          # Utility functions
│   ├── testData.ts                # Test data constants
│   └── helpers.ts                 # Helper functions
├── prompts/                        # AI prompt files
│   └── framework.prompt.md        # Framework generation prompt
├── test-results/                   # Test execution results
├── playwright-report/              # HTML test report
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies
└── README.md                       # This file
```

## 🔧 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Chrome (for system browser usage)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd copilotsessiontask
```

2. Install dependencies:
```bash
npm install
```

3. The framework is configured to use system Chrome. If you want to use Playwright browsers:
```bash
npx playwright install chromium
```

## 🚀 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test tests/e2e-checkout.spec.ts
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests with specific browser
```bash
npx playwright test --project=chromium
```

### View test report
```bash
npx playwright show-report
```

### Run tests with UI mode
```bash
npx playwright test --ui
```

## 🧪 Test Scenarios

### E2E Checkout Flow
**Location**: `tests/e2e-checkout.spec.ts`

This comprehensive test covers:
1. ✅ Login with valid credentials
2. ✅ Add two products to cart
3. ✅ Verify cart contents and quantities
4. ✅ Proceed through checkout process
5. ✅ Fill buyer information
6. ✅ Verify price calculations (subtotal + tax = total)
7. ✅ Complete order
8. ✅ Verify success confirmation message

### Additional Test Cases
- Invalid login handling
- Remove items from cart
- Cart badge counter validation

## 🏗️ Framework Design

### Page Object Model (POM)

Each page is represented by a class containing:
- **Locators**: All element selectors as class properties
- **Actions**: Reusable methods for page interactions
- **Assertions**: Helper methods for verifications

**Example:**
```typescript
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Locator Strategy Hierarchy

1. **Preferred**: `getByRole()` - Accessible and semantic
2. **Recommended**: `getByTestId()` - Stable test attributes
3. **Alternative**: CSS selectors - When above aren't available
4. **Avoid**: XPath - Only as last resort

### Test Data Management

All test data is centralized in `utils/testData.ts`:
- User credentials
- Product names
- Buyer information
- URLs

This ensures:
- Easy maintenance
- No hardcoded values in tests
- Reusability across tests

## 📏 Best Practices

### Guardrails (Enforced)

✅ **DO**:
- Use `getByRole()` and `getByTestId()` for locators
- Use async/await consistently
- Keep business logic in page objects
- Write meaningful variable names
- Use Playwright's auto-waiting
- Handle errors gracefully
- Create reusable page methods

❌ **DON'T**:
- Use `page.waitForTimeout()` or hardcoded sleeps
- Duplicate locators across files
- Use XPath unless absolutely necessary
- Mix test logic with page interactions
- Hardcode test data in test files

### Code Quality

- **TypeScript**: Strict typing enabled
- **DRY Principle**: No duplicate code
- **SOLID Principles**: Single responsibility for each class
- **Async/Await**: Consistent promise handling
- **Error Handling**: Graceful failure with meaningful messages

### Test Organization

- One test file per feature/flow
- Descriptive test names
- Arrange-Act-Assert pattern
- Independent tests (no test dependencies)
- Clean setup and teardown

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps chromium
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## 📊 Reports

### HTML Report
After test execution, view the interactive HTML report:
```bash
npx playwright show-report
```

### JSON Report
JSON results are saved to `test-results/results.json` for CI/CD integration.

### Screenshots & Videos
- Screenshots captured on test failure
- Videos recorded for failed tests
- Stored in `test-results/` directory

## 🤖 AI-Assisted Development

This framework was built using GitHub Copilot with:

### Custom Prompts
- `prompts/framework.prompt.md` - Framework generation instructions
- `.github/copilot-instructions.md` - Guardrails and best practices

### Prompt Engineering Benefits
- Consistent code style
- Adherence to best practices
- Reduced boilerplate
- Faster development
- Built-in quality checks

## 🛠️ Troubleshooting

### Browser Download Issues
If network is slow, use system Chrome:
```typescript
// In playwright.config.ts
use: { ...devices['Desktop Chrome'], channel: 'chrome' }
```

### Test Timeouts
Adjust timeouts in `playwright.config.ts`:
```typescript
timeout: 30 * 1000,  // Test timeout
actionTimeout: 10 * 1000,  // Action timeout
```

### Debug Failing Tests
```bash
# Run with debug mode
npx playwright test --debug

# Run with trace viewer
npx playwright test --trace on
npx playwright show-trace trace.zip
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [SauceDemo Application](https://www.saucedemo.com)

## 👥 Contributing

1. Follow the established patterns
2. Update tests for new features
3. Maintain documentation
4. Run tests before committing
5. Follow the guardrails in `.github/copilot-instructions.md`

## 📝 License

This project is created for educational purposes.

---

**Built with ❤️ using GitHub Copilot and Playwright**
