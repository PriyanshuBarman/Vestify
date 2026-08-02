/**
 * Enriches raw stock portfolio array with real-time calculated values.
 */
export function enrichStockPortfolio(rawPortfolio = [], liveStocksMap = {}) {
  return rawPortfolio.map((item) => {
    const symbol = item.symbol;
    const cleanSym = symbol ? symbol.replace(".NS", "").toUpperCase() : "";
    const nseSym = cleanSym ? `${cleanSym}.NS` : "";

    const liveData =
      liveStocksMap[cleanSym] ||
      liveStocksMap[nseSym] ||
      liveStocksMap[symbol] ||
      {};

    const quantity = Number(item.quantity || 0);
    const invested = Number(item.invested || 0);

    const avgPrice = quantity > 0 ? invested / quantity : 0;
    const currentPrice = liveData.regularMarketPrice ?? avgPrice;

    const current = currentPrice * quantity;
    const pnl = current - invested;
    const returnPercent = invested > 0 ? (pnl / invested) * 100 : 0;

    const dayChangePerShare = liveData.regularMarketChange ?? 0;
    const dayChangeValue = dayChangePerShare * quantity;
    const dayChangePercent = liveData.regularMarketChangePercent ?? 0;

    return {
      ...item,
      symbol,
      shortName: item.shortName || item.name || symbol,
      quantity,
      invested,
      avgPrice,
      currentPrice,
      current,
      pnl,
      returnPercent,
      dayChangeValue,
      dayChangePercent,
    };
  });
}

/**
 * Calculates overall portfolio summary stats.
 */
export function calculateStockPortfolioSummary(enrichedPortfolio = []) {
  let invested = 0;
  let current = 0;
  let dayChangeValue = 0;

  enrichedPortfolio.forEach((item) => {
    invested += item.invested;
    current += item.current;
    dayChangeValue += item.dayChangeValue;
  });

  const pnl = current - invested;
  const returnPercent = invested > 0 ? (pnl / invested) * 100 : 0;
  const dayChangePercent = invested > 0 ? (dayChangeValue / invested) * 100 : 0;

  return {
    invested,
    current,
    pnl,
    returnPercent,
    dayChangeValue,
    dayChangePercent,
  };
}

/**
 * Sorts stock portfolio array by specified key and order.
 */
export function sortStockPortfolio(
  portfolioList = [],
  sortBy = "current",
  order = "desc",
) {
  const sorted = [...portfolioList];

  sorted.sort((a, b) => {
    let valA = a[sortBy] ?? 0;
    let valB = b[sortBy] ?? 0;

    if (order === "asc") {
      return valA > valB ? 1 : valA < valB ? -1 : 0;
    }
    return valA < valB ? 1 : valA > valB ? -1 : 0;
  });

  return sorted;
}
