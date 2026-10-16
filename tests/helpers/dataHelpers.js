/** Generates a unique-looking email address for test data. */
export async function generateRandomEmail(domain = 'example.com') {
  const localPart = `test-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${localPart}@${domain}`;
}

/** Generates a random alphanumeric string. */
export async function generateRandomString(length = 12) {
  if (!Number.isInteger(length) || length < 1) {
    throw new RangeError('length must be a positive integer');
  }

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let index = 0; index < length; index += 1) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }

  return result;
}