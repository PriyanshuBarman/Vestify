import { api } from "@/lib/axios";

export const fetchBalance = async () => {
  const { data } = await api.get(`/wallet/balance`);
  return data.balance;
};
