import { api } from "@/lib/axios";

// ================ QUERIES ================

export const fetchProfileById = async (userId) => {
  const { data } = await api.get(`/users/profiles/${userId}`);
  return data.profile;
};

export const searchProfile = async (query) => {
  const { data } = await api.get(`/users/profiles?query=${query}`);
  return data.profiles;
};

// ================ MUTATIONS ================

export const updateProfile = async ({ name, username }) => {
  const { data } = await api.patch(`/users/profiles`, {
    name,
    username,
  });

  return data.profile;
};

export const updateAvatar = async (formData) => {
  const { data } = await api.patch(`/users/profiles/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.avatar;
};

export const removeAvatar = async () => {
  const { data } = await api.delete(`/users/profiles/avatar`);
  return data;
};
