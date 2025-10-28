import { api } from "@/lib/axios";

// ================ QUERIES ================

export const fetchOrders = async () => {
  const { data } = await api.get(`/mutual-funds/orders`);
  return data.orders;
};

export const fetchOrderDetail = async (orderId) => {
  const { data } = await api.get(`/mutual-funds/orders/${orderId}`);
  return data.order;
};

// ================ MUTATIONS ================

export const createInvestOrder = async ({ amount, fund, pin }) => {
  const { data } = await api.post(`/mutual-funds/orders/invest`, {
    pin,
    amount: Number(amount),
    schemeCode: fund.scheme_code,
    fundName: fund.name,
    shortName: fund.short_name,
    fundType: fund.fund_type,
    fundCategory: fund.fund_category,
    fundHouseDomain: fund.detail_info,
  });

  return data.orderDetail;
};
