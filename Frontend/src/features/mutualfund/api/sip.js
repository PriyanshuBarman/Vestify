import { api } from "@/lib/axios";

// ================ QUERIES ================

export const fetchSips = async () => {
  const { data } = await api.get(`/mutual-funds/sips`);
  return data;
};

export const fetchSipDetail = async (sipId) => {
  const { data } = await api.get(`/mutual-funds/sips/${sipId}`);
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
    amount: Number(amount),
    sipDate,
  });
  return data;
};

export const deleteSip = async (sipId) => {
  const { data } = await api.delete(`/mutual-funds/sips/${sipId}`);
  return data;
};

export const skipSip = async (sipId) => {
  const { data } = await api.patch(`/mutual-funds/sips/${sipId}/skip`);
  return data;
};
