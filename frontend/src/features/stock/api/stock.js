import { api } from "@/lib/axios";

export const fetchStockData = async (symbol) => {
  const { data } = await api.get(`/stocks/${symbol}`);
  return data?.data ?? data ?? null;
};

export const fetchStockHistoricalData = async (symbol) => {
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

export const fetchGainers = async () => {
  const { data } = await api.get(`/stocks/gainers`);
  return data?.data ?? data ?? [];
};

export const fetchIndices = async (symbols) => {
  const symbolsString = Array.isArray(symbols) ? symbols.join(",") : symbols;
  const { data } = await api.get(`/stocks/indices/${symbolsString}`);
  return data?.data ?? data ?? null;
};
