// Rule Reference: Section 1 - Use ES Module imports, never CommonJS
// Rule Reference: Section 2 - Place utilities in /helpers
// Rule Reference: Section 11 - Add JSDoc comments to functions

/**
 * @module data-helpers
 * @description Generates dynamic test data for checkout workflows.
 */

const FIRST_NAMES = ['Alex', 'Jordan', 'Morgan', 'Taylor', 'Casey', 'Riley', 'Jamie', 'Avery'];
const LAST_NAMES = ['Anderson', 'Campbell', 'Harris', 'Mitchell', 'Parker', 'Reed', 'Walker', 'Young'];

/**
 * Returns a random element from an array.
 * @template T
 * @param {T[]} arr - Array to pick from.
 * @returns {T} A random element.
 */
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Generates a random 5-digit US postal code.
 * @returns {string} A random postal code string.
 */
export const generatePostalCode = () =>
  String(Math.floor(10000 + Math.random() * 90000));

/**
 * Generates dynamic checkout customer details.
 * Rule Reference: Section 4 - Never hardcode data; generate dynamically.
 * @returns {{ firstName: string, lastName: string, postalCode: string }}
 */
export const generateCheckoutData = () => ({
  firstName: randomFrom(FIRST_NAMES),
  lastName: randomFrom(LAST_NAMES),
  postalCode: generatePostalCode(),
});
