import { api } from "@/lib/axios";

// ================ QUERIES ================

export const fetchUserData = async () => {
  const { data } = await api.get(`/users`);
  return data.user;
};

export const fetchReferrals = async () => {
  const { data } = await api.get(`/users/referrals`);
  return data.referrals;
};

// ================ MUTATIONS ================

export const claimDailyReward = async () => {
  const { data } = await api.patch(`/users/claim-daily-reward`);
  return data;
};

// ---------------- Profile ----------------
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
