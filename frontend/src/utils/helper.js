/**
 * Returns a text color class based on value change.
 * - One arg → checks if value is +/−/0.
 * - Two args → compares old vs new value.
 *
 * @param {number|string} oldValue - Value or old value.
 * @param {number|string} [newValue] - Optional new value.
 * @returns {"text-positive"|"text-negative"|"text-foreground"}
 */

export const getChangeColor = (oldValue, newValue) => {
  if (!oldValue && !newValue) return;

  const change = newValue !== undefined ? newValue - oldValue : oldValue;

  if (change > 0) return "text-positive";
  if (change < 0) return "text-negative";
  return "text-foreground";
};
