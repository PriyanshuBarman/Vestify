/**
 * Evaluates price calculations and validation flags for stock Buy/Sell orders.
 */
export function evaluateOrderValidation({
  action,
  type,
  priceType,
  limitPrice = 0,
  triggerPrice = 0,
  quantity = 0,
  price,
  availableShares,
  balance,
}) {
  const isBuy = action === "BUY";
  const isSell = action === "SELL";

  // Price calculations
  const effectivePrice =
    type === "SL"
      ? limitPrice || triggerPrice || price || 0
      : priceType === "LIMIT"
        ? limitPrice || 0
        : price || 0;

  const totalAmount = quantity * effectivePrice;

  // Basic availability validations
  const isExceedingShares = isSell && quantity > availableShares;
  const isInsufficientBalance = isBuy && totalAmount > balance;

  // Limit price validations (for Regular Limit Orders)
  const isInvalidBuyLimit =
    type === "REGULAR" &&
    isBuy &&
    priceType === "LIMIT" &&
    limitPrice > 0 &&
    Boolean(price) &&
    limitPrice > price;

  const isInvalidSellLimit =
    type === "REGULAR" &&
    isSell &&
    priceType === "LIMIT" &&
    limitPrice > 0 &&
    Boolean(price) &&
    limitPrice < price;

  const isInvalidLimit = isInvalidBuyLimit || isInvalidSellLimit;

  // SL Trigger Price validation (Trigger price MUST be strictly lower than market price)
  const isInvalidSLTrigger =
    type === "SL" &&
    triggerPrice > 0 &&
    Boolean(price) &&
    triggerPrice >= price;

  const isInvalidOrder =
    !quantity ||
    quantity <= 0 ||
    isInsufficientBalance ||
    isExceedingShares ||
    isInvalidLimit ||
    isInvalidSLTrigger ||
    (type === "REGULAR" &&
      priceType === "LIMIT" &&
      (!limitPrice || limitPrice <= 0)) ||
    (type === "SL" && (!triggerPrice || triggerPrice <= 0));

  return {
    effectivePrice,
    totalAmount,
    isExceedingShares,
    isInsufficientBalance,
    isInvalidBuyLimit,
    isInvalidSellLimit,
    isInvalidLimit,
    isInvalidSLTrigger,
    isInvalidOrder,
  };
}
