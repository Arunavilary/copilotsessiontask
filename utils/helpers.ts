/**
 * Helper utilities for test operations
 */

/**
 * Formats a price string to a number
 * @param priceString - Price string like "$29.99"
 * @returns Numeric price value
 */
export function parsePriceString(priceString: string): number {
  const cleaned = priceString.replace(/[$,]/g, '');
  return parseFloat(cleaned);
}

/**
 * Formats a number to a price string
 * @param price - Numeric price
 * @returns Formatted price string like "$29.99"
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/**
 * Calculates expected total with tax
 * @param subtotal - Subtotal amount
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns Total amount
 */
export function calculateTotal(subtotal: number, taxRate: number = 0.08): number {
  const tax = subtotal * taxRate;
  return parseFloat((subtotal + tax).toFixed(2));
}

/**
 * Generates a random string for test data
 * @param length - Length of the string
 * @returns Random alphanumeric string
 */
export function generateRandomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Waits for a condition to be true
 * @param condition - Function that returns boolean
 * @param timeout - Maximum time to wait in ms
 * @param interval - Time between checks in ms
 * @returns Promise that resolves when condition is true
 */
export async function waitForCondition(
  condition: () => Promise<boolean>,
  timeout: number = 5000,
  interval: number = 100
): Promise<void> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  throw new Error(`Condition not met within ${timeout}ms`);
}
