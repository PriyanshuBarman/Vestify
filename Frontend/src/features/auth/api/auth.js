import { api } from "@/lib/axios";

export const signupUser = async ({ name, email, password }) => {
  const { data } = await api.post(`/auth/signup`, { name, email, password });
  return data?.user;
};

export const loginUser = async ({ email, password }) => {
  const { data } = await api.post(`/auth/login`, { email, password });
  return data?.user;
};

export const logoutUser = async () => {
  const { data } = await api.get(`/auth/logout`);
  return data;
};
