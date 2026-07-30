import { formatToINR } from "@/utils/formatters";

function OrderErrorMessage({
  isBuy,
  isInsufficientBalance,
  isInvalidBuyLimit,
  isInvalidSellLimit,
  isInvalidSLTrigger,
  price,
}) {
  if (isBuy && isInsufficientBalance) {
    return (
      <p className="text-xs text-destructive font-medium text-center animate-in fade-in slide-in-from-bottom-1">
        You do not have sufficient balance
      </p>
    );
  }

  if (isInvalidBuyLimit) {
    return (
      <p className="text-xs text-destructive font-medium text-center animate-in fade-in slide-in-from-bottom-1">
        Limit price cannot be higher than market price {formatToINR(price)}
      </p>
    );
  }

  if (isInvalidSellLimit) {
    return (
      <p className="text-xs text-destructive font-medium text-center animate-in fade-in slide-in-from-bottom-1">
        Limit price cannot be lower than market price {formatToINR(price)}
      </p>
    );
  }

  if (isInvalidSLTrigger) {
    return (
      <p className="text-xs text-destructive font-medium text-center animate-in fade-in slide-in-from-bottom-1">
        SL trigger price must be lower than market price {formatToINR(price)}
      </p>
    );
  }

  return null;
}

export default OrderErrorMessage;
