/**
 * Central export file for all reusable test helper functions.
 */

const { waitForElement, waitForPageLoad } = require('./waitHelpers');
const { assertElementVisible, assertElementText } = require('./assertionHelpers');
const { generateRandomEmail, generateRandomString } = require('./dataHelpers');

module.exports = {
  waitForElement,
  waitForPageLoad,
  assertElementVisible,
  assertElementText,
  generateRandomEmail,
  generateRandomString,
};
