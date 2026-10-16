/** Error raised when an example or test violates project guardrails. */
export class GuardrailViolationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GuardrailViolationError';
  }
}

/** Returns a required environment variable without embedding secrets in source. */
export function getRequiredEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/** Enforces that credential values are supplied through environment variables. */
export function assertCredentialSource(source, variableName) {
  if (source !== 'environment') {
    throw new GuardrailViolationError(
      `Security & Safety: ${variableName} must come from process.env; never hardcode credentials in tests. ` +
      `Compliant alternative: use getRequiredEnv('${variableName}').`,
    );
  }
}

/** Rejects prohibited fixed-delay waits. */
export function rejectStaticDelay(milliseconds) {
  throw new GuardrailViolationError(
    `Wait Strategy: static delay (${milliseconds}ms) is prohibited. ` +
    'Compliant alternative: await a locator condition, expect(locator).toBeVisible(), or page.waitForURL().',
  );
}

/** Validates a checkout URL as local or clearly non-production. */
export function getValidatedTestUrl(urlValue) {
  let url;
  try {
    url = new URL(urlValue);
  } catch {
    throw new Error('CHECKOUT_URL must be a valid absolute URL.');
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Security & Safety: checkout target must use HTTP(S) on a test/staging system.');
  }

  const host = url.hostname.toLowerCase();
  const localHost = ['localhost', '127.0.0.1', '::1'].includes(host);
  const clearlyNonProduction = /(^|[.-])(test|testing|staging|stage|qa|dev|development)([.-]|$)/.test(host);
  if (!localHost && !clearlyNonProduction) {
    throw new Error(
      `Security & Safety: refusing checkout target '${host}' because it is not clearly a test/staging host. ` +
      'Compliant alternative: use a local URL or a hostname containing a test/stage/qa/dev label.',
    );
  }

  return url;
}