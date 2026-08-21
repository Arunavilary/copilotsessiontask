/**
 * @module dataHelpers
 * @description Utility functions for generating random test data and credentials.
 */

/**
 * Generates a random email address suitable for test registration.
 * @returns {string} A unique random email address.
 */
const generateRandomEmail = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `testuser_${timestamp}_${random}@ecomtest.com`;
};

/**
 * Generates a random password meeting common complexity requirements.
 * @param {number} [length=12] - Desired password length (minimum 8).
 * @returns {string} A randomly generated password.
 */
const generateRandomPassword = (length = 12) => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const special = '!@#$%^&*';
  const all = upper + lower + digits + special;

  const required = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    digits[Math.floor(Math.random() * digits.length)],
    special[Math.floor(Math.random() * special.length)],
  ];

  const remaining = Array.from({ length: length - required.length }, () =>
    all[Math.floor(Math.random() * all.length)]
  );

  return [...required, ...remaining]
    .sort(() => Math.random() - 0.5)
    .join('');
};

/**
 * Generates a random full name for test user registration.
 * @returns {{ firstName: string, lastName: string }} An object containing first and last name.
 */
const generateRandomName = () => {
  const firstNames = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Hank'];
  const lastNames = ['Smith', 'Jones', 'Taylor', 'Brown', 'Wilson', 'Evans', 'Thomas', 'Martin'];
  return {
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
  };
};

/**
 * Generates a random US-style phone number string.
 * @returns {string} A 10-digit phone number string.
 */
const generateRandomPhone = () => {
  const areaCode = Math.floor(200 + Math.random() * 800);
  const prefix = Math.floor(200 + Math.random() * 800);
  const line = Math.floor(1000 + Math.random() * 9000);
  return `${areaCode}${prefix}${line}`;
};

/**
 * Builds a complete random user credential object.
 * @returns {{ email: string, password: string, firstName: string, lastName: string, phone: string }}
 */
const generateUserCredentials = () => {
  const { firstName, lastName } = generateRandomName();
  return {
    email: generateRandomEmail(),
    password: generateRandomPassword(),
    firstName,
    lastName,
    phone: generateRandomPhone(),
  };
};

module.exports = {
  generateRandomEmail,
  generateRandomPassword,
  generateRandomName,
  generateRandomPhone,
  generateUserCredentials,
};
