/**
 * ESLint Configuration with eslint-plugin-playwright
 * ────────────────────────────────────────────────────────────────────────────
 * This configuration enforces guardrails from copilot_instructions.md statically.
 * Uses .cjs extension because package.json has "type": "module".
 * 
 * Run: npm run lint
 * ────────────────────────────────────────────────────────────────────────────
 */

module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['playwright'],
  extends: ['plugin:playwright/recommended'],
  rules: {
    // ══════════════════════════════════════════════════════════════════════════
    // Section 1: General Rules - ES6+ Syntax Enforcement
    // ══════════════════════════════════════════════════════════════════════════
    'no-var': 'error',                    // Never use var; use const/let
    'prefer-const': 'error',              // Use const by default
    'no-unused-vars': 'error',            // Delete unused variables
    'no-empty': 'error',                  // No empty catch blocks

    // ══════════════════════════════════════════════════════════════════════════
    // Section 5: Locators & Waiting Strategies
    // ══════════════════════════════════════════════════════════════════════════
    // Catches page.waitForTimeout() - use auto-waiting instead
    'playwright/no-wait-for-timeout': 'error',

    // ══════════════════════════════════════════════════════════════════════════
    // Section 7: Async & Web-First Assertions
    // ══════════════════════════════════════════════════════════════════════════
    // Flags non-retrying sync assertions like expect(await el.isVisible()).toBe(true)
    'playwright/prefer-web-first-assertions': 'error',
    // Ensures every Playwright action is awaited
    'playwright/missing-playwright-await': 'error',

    // ══════════════════════════════════════════════════════════════════════════
    // Section 8: Test Isolation & Reliability
    // ══════════════════════════════════════════════════════════════════════════
    // Prevents test.only from being committed
    'playwright/no-focused-test': 'error',
    // Warns about skipped tests left in codebase
    'playwright/no-skipped-test': 'warn',
    // Prevents conditional logic that causes flakiness
    'playwright/no-conditional-in-test': 'warn',

    // ══════════════════════════════════════════════════════════════════════════
    // Section 9: General Best Practices
    // ══════════════════════════════════════════════════════════════════════════
    // Requires at least one assertion per test
    'playwright/expect-expect': 'error',
    // Warns against using force: true option
    'playwright/no-force-option': 'warn',
    // Ensures page.pause() is not left in code
    'playwright/no-page-pause': 'error',
  },
  overrides: [
    {
      // Apply stricter rules to test files only
      files: ['tests/**/*.spec.js', 'page-objects/**/*.js'],
      rules: {
        'playwright/no-standalone-expect': 'error',
      },
    },
  ],
};
