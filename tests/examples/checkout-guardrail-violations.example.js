const { flagGuardrailViolation, requireEnvironmentVariable } = require('../../tests/helpers/guardrail-enforcer');

/**
 * Deliberately violating example. This file is outside tests/specs so it is not
 * collected as a test. Calling the function proves the violation is rejected.
 */
const violatingCheckoutImplementation = async (page) => {
  flagGuardrailViolation({
    rule: 'Security & Safety: DO NOT hardcode credentials, API keys, or sensitive data in test files.',
    violation: 'A password literal is about to be used in the checkout test.',
    alternative: 'Read the password from a protected environment variable or secret store.',
  });

  // GUARDRAIL VIOLATION: hardcoded password; this line is unreachable after the runtime guard.
  const password = 'hardcoded-password';
  await page.getByLabel('Password').fill(password);

  // GUARDRAIL VIOLATION: Wait Strategy forbids arbitrary static delays.
  // Correct alternative: await a locator assertion or page.waitForURL/load-state condition.
  await page.waitForTimeout(3000);
};

/**
 * Corrected implementation: environment-backed data and a state-aware wait.
 */
const compliantCheckoutImplementation = async (page) => {
  const password = requireEnvironmentVariable('CHECKOUT_PASSWORD');
  await page.getByLabel('Password').fill(password);
  await page.getByRole('heading', { name: /checkout/i }).waitFor();
};

module.exports = {
  violatingCheckoutImplementation,
  compliantCheckoutImplementation,
};