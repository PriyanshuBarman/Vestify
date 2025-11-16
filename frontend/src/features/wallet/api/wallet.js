import { api } from "@/lib/axios";

// ================ QUERIES ================

export const fetchAllTnx = async () => {
  const { data } = await api.get(`/wallet/transactions`);
  return data.transactions;
};

// ================ MUTATIONS ================

export const sendMoney = async ({ amount, note, receiverId, pin }) => {
  const { data } = await api.post(`/wallet/send`, {
    amount,
    note,
    receiverId,
    pin,
  });
  
  return data.balance;
};
