/**
 * GUARDRAIL VIOLATION EXAMPLES
 * ────────────────────────────────────────────────────────────────────────────
 * This file demonstrates ANTI-PATTERNS that violate copilot_instructions.md.
 * Each example shows non-compliant code, the violated rule, operational risk,
 * and the compliant refactored alternative.
 * 
 * DO NOT use these patterns in production code.
 * ────────────────────────────────────────────────────────────────────────────
 */

// ══════════════════════════════════════════════════════════════════════════════
// VIOLATION 1: Hardcoded Credentials (Section 4 - Safety & Security Guardrails)
// ══════════════════════════════════════════════════════════════════════════════

// ❌ NON-COMPLIANT: Credentials embedded directly in code
// RISK: Secrets leak into version control; visible to anyone with repo access.
//
// const username = 'standard_user';        // ← VIOLATION: Section 4
// const password = 'secret_sauce';         // ← VIOLATION: Section 4
// await loginPage.login(username, password);

// ✅ COMPLIANT: Load credentials from environment variables
//
// import 'dotenv/config';
// const username = process.env.TEST_USERNAME;
// const password = process.env.TEST_PASSWORD;
// await loginPage.login(username, password);


// ══════════════════════════════════════════════════════════════════════════════
// VIOLATION 2: Static Waits (Section 5 - Locators & Waiting Strategies)
// ══════════════════════════════════════════════════════════════════════════════

// ❌ NON-COMPLIANT: Using page.waitForTimeout() for arbitrary delays
// RISK: Tests become flaky - pass on fast machines, fail on slow CI runners.
// ESLint rule: playwright/no-wait-for-timeout
//
// await page.goto('/inventory.html');
// await page.waitForTimeout(3000);         // ← VIOLATION: Section 5
// await expect(inventoryList).toBeVisible();

// ✅ COMPLIANT: Rely on Playwright auto-waiting and web-first assertions
//
// await page.goto('/inventory.html');
// await expect(inventoryList).toBeVisible(); // Auto-retries until visible


// ══════════════════════════════════════════════════════════════════════════════
// VIOLATION 3: XPath Locators (Section 5 - Locators & Waiting Strategies)
// ══════════════════════════════════════════════════════════════════════════════

// ❌ NON-COMPLIANT: Using XPath selectors
// RISK: XPath is fragile, breaks on DOM restructuring, hard to maintain.
//
// this.loginButton = page.locator('xpath=//button[@id="login-button"]'); // ← VIOLATION: Section 5

// ✅ COMPLIANT: Use semantic Playwright locators
//
// this.loginButton = page.getByRole('button', { name: 'Login' });


// ══════════════════════════════════════════════════════════════════════════════
// VIOLATION 4: Assertions Inside Page Objects (Section 6 - POM Standards)
// ══════════════════════════════════════════════════════════════════════════════

// ❌ NON-COMPLIANT: Hard assertions (expect) inside Page Object class
// RISK: Hides assertion failures deep in POM; hard to trace failures.
//
// class BadInventoryPage {
//   async verifyInventoryVisible() {
//     await expect(this.inventoryList).toBeVisible();  // ← VIOLATION: Section 6
//   }
// }

// ✅ COMPLIANT: Return locator; place assertion in test spec or helper
//
// class InventoryPage {
//   getInventoryList() {
//     return this.inventoryList;
//   }
// }
// // In test spec:
// await expect(inventoryPage.getInventoryList()).toBeVisible();


// ══════════════════════════════════════════════════════════════════════════════
// VIOLATION 5: Non-Retrying Sync Assertions (Section 7 - Web-First Assertions)
// ══════════════════════════════════════════════════════════════════════════════

// ❌ NON-COMPLIANT: Synchronous assertion that doesn't auto-retry
// RISK: Race condition - element may not yet be visible at evaluation time.
// ESLint rule: playwright/prefer-web-first-assertions
//
// const isVisible = await page.locator('.inventory_list').isVisible();
// expect(isVisible).toBe(true);            // ← VIOLATION: Section 7

// ✅ COMPLIANT: Use web-first auto-retrying assertion
//
// await expect(page.locator('.inventory_list')).toBeVisible();


// ══════════════════════════════════════════════════════════════════════════════
// VIOLATION 6: CommonJS Imports (Section 1 - General Rules)
// ══════════════════════════════════════════════════════════════════════════════

// ❌ NON-COMPLIANT: Using require() instead of ES module imports
// RISK: Inconsistent module system; doesn't work with "type": "module".
//
// const { test } = require('@playwright/test');  // ← VIOLATION: Section 1

// ✅ COMPLIANT: Use ES module import syntax
//
// import { test } from '@playwright/test';


// ══════════════════════════════════════════════════════════════════════════════
// RUNTIME INTERCEPTOR: Credential Validation Guard
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Runtime guard that throws an error if credentials appear to be hardcoded.
 * Use this in test setup to catch accidental hardcoding.
 * @param {string} value - The credential value to validate.
 * @param {string} name - Name of the credential for error messaging.
 * @throws {Error} If the credential is empty or appears hardcoded in code.
 */
export const validateCredentialFromEnv = (value, name) => {
  if (!value || value.trim().length === 0) {
    throw new Error(
      `[GUARDRAIL VIOLATION - Section 4] "${name}" is empty or undefined. ` +
      'Load credentials from process.env via dotenv, never hardcode them.'
    );
  }
};

/**
 * Runtime guard that throws an error if page.waitForTimeout is detected.
 * This is a demonstration - in practice, use ESLint to catch this statically.
 * @param {number} ms - The timeout value in milliseconds.
 * @throws {Error} Always throws to prevent static wait usage.
 */
export const preventStaticWait = (ms) => {
  throw new Error(
    `[GUARDRAIL VIOLATION - Section 5] page.waitForTimeout(${ms}) detected. ` +
    'Never use static waits. Use auto-waiting, locator.waitFor(), or page.waitForURL().'
  );
};


// ══════════════════════════════════════════════════════════════════════════════
// VIOLATION COMPARISON TABLE
// ══════════════════════════════════════════════════════════════════════════════
/**
 * | # | Anti-Pattern                        | Section Violated | ESLint Rule                          | Risk                                  |
 * |---|-------------------------------------|------------------|--------------------------------------|---------------------------------------|
 * | 1 | Hardcoded credentials               | Section 4        | (Manual review)                      | Secrets leak to version control       |
 * | 2 | page.waitForTimeout()               | Section 5        | playwright/no-wait-for-timeout       | Flaky tests on varying environments   |
 * | 3 | XPath selectors                     | Section 5        | (Manual review)                      | Fragile; breaks on DOM changes        |
 * | 4 | expect() inside Page Objects        | Section 6        | (Manual review)                      | Hidden failures; poor traceability    |
 * | 5 | Sync assertions (isVisible().toBe)  | Section 7        | playwright/prefer-web-first-assertions | Race conditions; intermittent failures |
 * | 6 | CommonJS require()                  | Section 1        | (ESLint import rules)                | Module system inconsistency           |
 */
