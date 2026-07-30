import type { StockOrder } from "@prisma/client";

/**
 * Evaluates whether a stock order's conditions are met against the current live market price.
 *
 * @param order The stock order to evaluate
 * @param currentPrice The current live market price of the stock
 * @returns true if the order should be executed, false otherwise
 */
export const evaluateOrderCondition = (
  order: StockOrder,
  currentPrice: number,
): boolean => {
  const triggerPrice = order.triggerPrice?.toNumber();
  const limitPrice = order.limitPrice?.toNumber();

  if (order.action === "BUY") {
    if (order.type === "REGULAR") {
      if (!limitPrice && !triggerPrice) return true; // Market Buy
      if (limitPrice && currentPrice <= limitPrice) return true; // Limit Buy
    } else if (order.type === "GTT") {
      if (triggerPrice && currentPrice <= triggerPrice) {
        // Trigger hit
        if (!limitPrice) return true; // No limit, execute at market
        if (currentPrice <= limitPrice) return true; // Limit condition met
      }
    }
  } else if (order.action === "SELL") {
    if (order.type === "REGULAR") {
      if (!limitPrice && !triggerPrice) return true; // Market Sell
      if (limitPrice && currentPrice >= limitPrice) return true; // Limit Sell
    } else if (order.type === "SL") {
      if (triggerPrice && currentPrice <= triggerPrice) {
        if (!limitPrice) return true;
        if (currentPrice >= limitPrice) return true;
      }
    } else if (order.type === "GTT") {
      if (triggerPrice) {
        const isTarget = order.gttType === "TARGET";
        const isStopLoss = order.gttType === "STOP_LOSS";

        if (isTarget && currentPrice >= triggerPrice) {
          if (!limitPrice) return true;
          if (currentPrice >= limitPrice) return true;
        } else if (isStopLoss && currentPrice <= triggerPrice) {
          if (!limitPrice) return true;
          if (currentPrice >= limitPrice) return true;
        }
      }
    }
  }

  return false;
};

// No no no I think you don't get it it will be wrong because error price is required so user will place a trigger price as you kind of price is 100 user place sl order for 90 rupees trigger price but now if we place the limit price of ₹2000 so what will happen is that when the price will reach ₹90 or below ₹90 so that rare price will trigger and then it will see that if the current price is greater than the limit price so if yes then it will execute It will still be pending because the limit wise is too high right 2000 also the conidration will met and the order will expire I think you are maybe right I'm going to the scenario we see opposite like that rear price is 90 but the selling price is limit price is really low assume Only ₹1 so then what will happen is that even though the crying current price does not reach the limit price still the order will be using right there was a current price is greater than the limit price which is wrong but which I think is good also because uses probability will not add the limit wise too much lower then we will try to probably will try to add the limit price with the same value as triggered price lower little bit low but not too much but if somehow three do the tip that then there is some but which I cannot solve because I do not have to take biotech data so what do you think what is the solution here what should we do to resolve this kind of problem here?
