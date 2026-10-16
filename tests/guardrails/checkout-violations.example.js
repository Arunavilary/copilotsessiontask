import { assertCredentialSource, rejectStaticDelay } from '../helpers/guardrailChecks.js';

/** Demonstrates runtime flagging only; this file is not a test. */
function reportAttempt(attempt, rule, alternative) {
  try {
    attempt();
  } catch (error) {
    if (error.name !== 'GuardrailViolationError') {
      throw error;
    }
    console.error(`[GUARDRAIL VIOLATION] ${error.message}`);
    console.error(`Rule: ${rule}`);
    console.error(`Compliant alternative: ${alternative}`);
  }
}

// VIOLATING EXAMPLE (Security & Safety): credentials must not be literal values in test source.
reportAttempt(
  () => assertCredentialSource('literal', 'CHECKOUT_TEST_PASSWORD'),
  'copilot-instructions.md — Security & Safety: never hardcode credentials or sensitive data.',
  "Read the value with getRequiredEnv('CHECKOUT_TEST_PASSWORD') from the ignored .env file.",
);

// VIOLATING EXAMPLE (Wait Strategy): arbitrary fixed-delay sleeps are prohibited.
reportAttempt(
  () => rejectStaticDelay(3000),
  'copilot-instructions.md — Wait Strategy: do not use page.waitForTimeout() with hardcoded delays.',
  'Wait for the locator with expect(locator).toBeVisible(), or use page.waitForURL().',
);