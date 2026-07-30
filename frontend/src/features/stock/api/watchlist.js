import { api } from "@/lib/axios";

export const fetchkWatchlist = async (username) => {
  const url = username
    ? `/community/users/${username}/stocks/watchlist`
    : `/stocks/watchlist`;
  const { data } = await api.get(url);
  return data.watchlist;
};

export const isInWatchlist = async (symbol) => {
  const { data } = await api.get(`/stocks/watchlist/${symbol}`);
  return data.isWatchlisted;
};

export const addToWatchlist = async ({ symbol, name, shortName }) => {
  const { data } = await api.post(`/stocks/watchlist`, {
    symbol,
    name,
    shortName,
  });

  return data;
};

export const removeFromWatchlist = async ({ symbol }) => {
  const { data } = await api.delete(`/stocks/watchlist/${symbol}`);
  return data;
};
