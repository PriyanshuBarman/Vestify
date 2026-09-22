import { api } from "@/lib/axios";

export const createStockSip = async ({
  symbol,
  name,
  shortName,
  frequency,
  type,
  amount,
  quantity,
  sipDate,
}) => {
  const res = await api.post("/stocks/sips", {
    symbol,
    name,
    shortName,
    frequency,
    type,
    amount,
    quantity,
    sipDate,
  });
  return res.data;
};

export const editStockSip = async ({
  sipId,
  frequency,
  type,
  amount,
  quantity,
  sipDate,
}) => {
  const res = await api.patch(`/stocks/sips/${sipId}`, {
    frequency,
    type,
    amount,
    quantity,
    sipDate,
  });
  return res.data;
};

export const cancelStockSip = async (sipId) => {
  const res = await api.delete(`/stocks/sips/${sipId}`);
  return res.data;
};

export const getAllStockSips = async (username) => {
  const url = username
    ? `/community/users/${username}/stocks/sips`
    : "/stocks/sips";
  const res = await api.get(url);
  return res.data;
};

export const getStockSipDetail = async (sipId, username) => {
  const url = username
    ? `/community/users/${username}/stocks/sips/${sipId}`
    : `/stocks/sips/${sipId}`;
  const res = await api.get(url);
  return res.data;
};
