import { api } from "@/lib/axios";

// ================ QUERIES ================

export const fetchSips = async (username) => {
  const url = username
    ? `/community/users/${username}/sips`
    : `/mutual-funds/sips`;
  const { data } = await api.get(url);
  return data;
};

export const fetchSipDetail = async (sipId, username) => {
  const url = username
    ? `/community/users/${username}/sips/${sipId}`
    : `/mutual-funds/sips/${sipId}`;
  const { data } = await api.get(url);
  return data;
};

// ================ MUTATIONS ================

export const createSip = async ({ amount, sipDate, fund, pin }) => {
  const { data } = await api.post(`/mutual-funds/sips`, {
    pin,
    amount: Number(amount),
    sipDate,
    schemeCode: fund.scheme_code,
    fundName: fund.name,
    fundShortName: fund.short_name,
    fundCategory: fund.fund_category,
    fundType: fund.fund_type,
    fundHouseDomain: fund.detail_info,
  });

  return { order: data.order, sip: data.sip };
};

export const editSip = async ({ sipId, amount, sipDate }) => {
  const { data } = await api.patch(`/mutual-funds/sips/${sipId}`, {
    amount: amount ? Number(amount) : null,
    sipDate: sipDate ? sipDate : null,
  });
  return data;
};

export const deleteSip = async ({ sipId }) => {
  const { data } = await api.delete(`/mutual-funds/sips/${sipId}`);
  return data;
};

export const skipSip = async ({ sipId, diff }) => {
  const { data } = await api.patch(`/mutual-funds/sips/${sipId}/skip`);
  return data;
};

export const addStepUp = async ({
  sipId,
  amount,
  percentage,
  intervalInMonths,
}) => {
  const { data } = await api.patch("/mutual-funds/sips/step-up", {
    sipId,
    amount,
    percentage,
    intervalInMonths,
  });
  return data.sip;
};

export const removeStepUp = async ({ sipId }) => {
  const { data } = await api.delete(`/mutual-funds/sips/step-up/${sipId}`);
  return data;
};
