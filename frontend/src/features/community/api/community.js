import { api } from "@/lib/axios";

export const fetchUsers = async ({ pageParam = 0, LIMIT = 20 } = {}) => {
  const { data } = await api.get(`/community/users`, {
    params: { offset: pageParam, limit: LIMIT },
  });
  return data;
};

export const searchUsers = async ({ query, LIMIT = 10 } = {}) => {
  const { data } = await api.get(`/community/search`, {
    params: { query, limit: LIMIT },
  });
  return data.users;
};

export const fetchUserProfile = async (username) => {
  const { data } = await api.get(`/community/users/${username}`);
  return data.profile;
};
