/*
 * Formates Number to INR ex: 12555.12 -> ₹12,555
 */
export const formatToINR = (num, maxFracDigits = 2) => {
  const number = Number(num);
  if (isNaN(number)) return;

  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFracDigits,
  }).format(number);

  return formatted;
};

export const formatShortINR = (num) => {
  const number = Number(num);
  if (isNaN(number) || number === 0) return "₹0";

  if (number >= 10000000) {
    return `₹${(number / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
  }
  if (number >= 100000) {
    return `₹${(number / 100000).toFixed(1).replace(/\.0$/, "")} Lakh`;
  }
  if (number >= 1000) {
    return `₹${(number / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(number);
};

export const sanitizeAmount = (value) => {
  if (!value) return;
  // Remove any non-digit and non-dot characters
  value = value.replace(/[^\d.]/g, "");

  // Handle leading zeros (but allow "0." at start)
  if (value.startsWith("00")) {
    value = "0" + value.slice(2);
  } else if (
    value.length > 1 &&
    value.startsWith("0") &&
    !value.includes(".")
  ) {
    value = value.slice(1);
  }

  // Handle decimal places
  if (value.includes(".")) {
    const [integer, decimal] = value.split(".");
    // Keep only first 2 decimal digits (max 2 decimals)
    const limitedDecimal = decimal ? `.${decimal.slice(0, 2)}` : ".";
    value = integer + limitedDecimal;
  }

  // Handle single dot
  if (value === ".") {
    value = "0.";
  }

  return value;
};
