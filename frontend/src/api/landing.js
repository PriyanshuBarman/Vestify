import { api } from "@/lib/axios";

export const fetchScreenshots = async () => {
  const { data } = await api.get(`/landing/screenshots`);
  return data;
};

export const fetchUserCount = async () => {
  const { data } = await api.get(`/landing/users-count`);
  return data.count;
};
