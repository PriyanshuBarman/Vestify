import { api } from "@/lib/axios";

// ================ QUERIES ================

export const fetchWatchlist = async (username) => {
  const url = username
    ? `/community/users/${username}/watchlist`
    : `/mutual-funds/watchlist`;
  const { data } = await api.get(url);
  return data.watchlist;
};

export const isInWatchlist = async (schemeCode) => {
  const { data } = await api.get(`/mutual-funds/watchlist/${schemeCode}`);
  return data.isWatchlisted;
};

// ================ MUTATIONS ================

export const addToWatchlist = async ({
  schemeCode,
  fundName,
  fundShortName,
  fundHouseDomain,
}) => {
  const { data } = await api.post(`/mutual-funds/watchlist`, {
    schemeCode,
    fundName,
    fundShortName,
    fundHouseDomain,
  });

  return data;
};

export const removeFromWatchlist = async ({ schemeCode }) => {
  const { data } = await api.delete(`/mutual-funds/watchlist/${schemeCode}`);
  return data;
};
