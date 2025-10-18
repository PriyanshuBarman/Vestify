import { VITE_BACKEND_BASE_URL } from "@/config/env";
import axios from "axios";

export const signupUser = async ({ name, email, password }) => {
  const { data } = await axios.post(
    `${VITE_BACKEND_BASE_URL}/auth/signup`,
    { name, email, password },
    { withCredentials: true },
  );

  return data?.user;
};

export const loginUser = async ({ email, password }) => {
  const { data } = await axios.post(
    `${VITE_BACKEND_BASE_URL}/auth/login`,
    { email, password },
    { withCredentials: true },
  );
  return data?.user;
};

export const logoutUser = async () => {
  const { data } = await axios.get(`${VITE_BACKEND_BASE_URL}/auth/logout`, {
    withCredentials: true,
  });
};
