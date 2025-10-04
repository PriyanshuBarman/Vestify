import axios from "axios";
import { VITE_BACKEND_BASE_URL } from "@/config/env";

export const fetchBalance = async () => {
  const { data } = await axios.get(`${VITE_BACKEND_BASE_URL}/wallet/balance`, {
    withCredentials: true,
  });

  return data.balance;
};
