/**
 * Runtime checks that make the project's written guardrails executable.
 */

const flagGuardrailViolation = ({ rule, violation, alternative }) => {
  throw new Error(
    `[GUARDRAIL VIOLATION] ${violation} Violates: ${rule} Compliant alternative: ${alternative}`,
  );
};

const requireEnvironmentVariable = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required test environment variable: ${name}`);
  }

  return value;
};

module.exports = {
  flagGuardrailViolation,
  requireEnvironmentVariable,
};