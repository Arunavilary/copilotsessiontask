/**
 * Utility helpers for random data generation used in test inputs.
 */

const crypto = require('node:crypto');

/**
 * Generates a random email address for test scenarios.
 *
 * @returns {Promise<string>} A randomly generated email address.
 */
const generateRandomEmail = async () => {
  const randomText = crypto.randomBytes(4).toString('hex');
  const timestamp = Date.now();
  return `user.${randomText}.${timestamp}@example.com`;
};

/**
 * Generates a random string with a configurable length.
 *
 * @param {number} [length=12] - Number of characters to generate.
 * @returns {Promise<string>} A random alphanumeric string.
 */
const generateRandomString = async (length = 12) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const bytes = crypto.randomBytes(length);

  let randomString = '';
  for (let index = 0; index < length; index += 1) {
    const randomIndex = bytes[index] % characters.length;
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

module.exports = {
  generateRandomEmail,
  generateRandomString,
};
