import { api } from "@/lib/axios";

export const fetchScreenshots = async () => {
  const { data } = await api.get(`/public/screenshots`);
  return data;
};

export const fetchUserCount = async () => {
  const { data } = await api.get(`/public/users-count`);
  return data.count;
};
