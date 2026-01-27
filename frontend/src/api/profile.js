import { api } from "@/lib/axios";

// ================ QUERIES ================

export const fetchProfileById = async (userId) => {
  const { data } = await api.get(`/profiles/${userId}`);
  return data.profile;
};

export const searchProfile = async (query) => {
  const { data } = await api.get(`/profiles?query=${query}`);
  return data.profiles;
};

// ---------------- Community ----------------
export const fetchUserCount = async () => {
  const { data } = await api.get(`/community/users/count`);
  return data.count;
};
