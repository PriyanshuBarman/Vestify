import { api } from "@/lib/axios";

// ================ QUERIES ================

export const fetchWatchlist = async () => {
  const { data } = await api.get(`/mutual-funds/watchlist`);
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
  shortName,
  fundHouseDomain,
}) => {
  const { data } = await api.post(`/mutual-funds/watchlist`, {
    schemeCode,
    fundName,
    shortName,
    fundHouseDomain,
  });

  return data;
};

export const removeFromWatchlist = async ({ schemeCode }) => {
  const { data } = await api.delete(`/mutual-funds/watchlist/${schemeCode}`);
  return data;
};
