import { api } from "@/lib/axios";

export const fetchStockData = async (symbol) => {
  const { data } = await api.get(`/stocks/${symbol}`);
  return data?.data ?? data ?? null;
};

export const fetchHistoricalChart = async (symbol) => {
  const { data } = await api.get(`/stocks/historical-chart/${symbol}`);
  return data?.data ?? data ?? [];
};

export const fetchIntradayChart = async (symbol) => {
  const { data } = await api.get(`/stocks/intraday-chart/${symbol}`);
  return data?.data ?? data ?? [];
};

export const fetchPopularStocks = async () => {
  const { data } = await api.get(`/stocks/popular`);
  return data?.data ?? data ?? [];
};

export const fetchGainers = async (index) => {
  const params = index ? { index } : {};
  const { data } = await api.get(`/stocks/gainers`, { params });
  return data?.data ?? data ?? [];
};

export const fetchLosers = async (index) => {
  const params = index ? { index } : {};
  const { data } = await api.get(`/stocks/losers`, { params });
  return data?.data ?? data ?? [];
};

export const fetchTopByVolume = async (index) => {
  const params = index ? { index } : {};
  const { data } = await api.get("/stocks/top-by-volume", { params });
  return data?.data ?? data ?? [];
};

export const fetch52WeekHighLow = async (index) => {
  const params = index ? { index } : {};
  const { data } = await api.get("/stocks/52-week-high-low", { params });
  return data?.data ?? data ?? { highs: [], lows: [] };
};

export const fetchSimilarStocks = async (symbol) => {
  if (!symbol) return [];
  const { data } = await api.get(`/stocks/similar-stocks/${symbol}`);
  return data?.data ?? data ?? [];
};

export const fetchIndices = async () => {
  const { data } = await api.get("/stocks/indices");
  return data?.data;
};

export const fetchMultipleStockQuotes = async (symbols) => {
  if (!symbols || (Array.isArray(symbols) && symbols.length === 0)) return {};
  const symbolsString = Array.isArray(symbols) ? symbols.join(",") : symbols;
  const { data } = await api.get("/stocks/quotes", {
    params: { symbols: symbolsString },
  });
  return data?.data ?? data ?? {};
};

export const fetchPortfolio = async (username) => {
  const url = username
    ? `/community/users/${username}/stocks/portfolio`
    : "/stocks/portfolio";
  const { data } = await api.get(url);
  return data?.portfolio ?? [];
};

export const fetchSingleStockPortfolio = async (symbol, username) => {
  if (!symbol) return null;
  const url = username
    ? `/community/users/${username}/stocks/portfolio/${symbol}`
    : `/stocks/portfolio/${symbol}`;
  const { data } = await api.get(url);
  return data?.portfolio ?? null;
};

export const fetchStockHoldings = async (symbol, username) => {
  if (!symbol) return [];
  const url = username
    ? `/community/users/${username}/stocks/portfolio/${symbol}/holdings`
    : `/stocks/portfolio/${symbol}/holdings`;
  const { data } = await api.get(url);
  return data?.holdings ?? [];
};

export const fetchAllOrders = async (username) => {
  const url = username
    ? `/community/users/${username}/stocks/orders`
    : "/stocks/orders";
  const { data } = await api.get(url);
  return data?.orders ?? [];
};

export const fetchOpenOrders = async (username) => {
  const url = username
    ? `/community/users/${username}/stocks/orders/pending`
    : "/stocks/orders/pending";
  const { data } = await api.get(url);
  return data?.orders ?? [];
};

export const fetchTodayOrders = async (username) => {
  const url = username
    ? `/community/users/${username}/stocks/orders/today`
    : "/stocks/orders/today";
  const { data } = await api.get(url);
  return data?.orders ?? [];
};

export const fetchOrderDetail = async (orderId, username) => {
  if (!orderId) return null;
  const url = username
    ? `/community/users/${username}/stocks/orders/${orderId}`
    : `/stocks/orders/${orderId}`;
  const { data } = await api.get(url);
  return data?.order ?? null;
};

export const cancelOrder = async (orderId) => {
  const { data } = await api.delete(`/stocks/orders/${orderId}`);
  return data;
};

// Mutations api

export const placeBuyOrder = async ({
  stock,
  quantity,
  type,
  gttType,
  limitPrice,
  triggerPrice,
}) => {
  const { data } = await api.post("/stocks/orders/buy", {
    symbol: stock.symbol,
    name: stock.longName || stock.shortName || stock.symbol,
    shortName: stock.shortName || stock.symbol,
    quantity: Number(quantity),
    type,
    gttType,
    limitPrice,
    triggerPrice,
  });
  return data.order;
};

export const placeSellOrder = async ({
  stock,
  quantity,
  type,
  gttType,
  limitPrice,
  triggerPrice,
}) => {
  const { data } = await api.post("/stocks/orders/sell", {
    symbol: stock.symbol,
    quantity: Number(quantity),
    type,
    gttType,
    limitPrice,
    triggerPrice,
  });
  return data.order;
};

export const modifyOrder = async ({
  orderId,
  quantity,
  type,
  action,
  triggerPrice,
  limitPrice,
  gttType,
}) => {
  const { data } = await api.patch(`/stocks/orders/${orderId}`, {
    quantity: Number(quantity),
    type,
    action,
    triggerPrice,
    limitPrice,
    gttType,
  });
  return data.order;
};
