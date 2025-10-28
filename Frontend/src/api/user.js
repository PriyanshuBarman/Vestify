import { api } from "@/lib/axios";

// ================ QUERIES ================

export const fetchUserData = async () => {
  const { data } = await api.get(`/users`);
  return data.user;
};

export const fetchSessions = async () => {
  const { data } = await api.get(`/users/sessions`);
  return data.activeSessions;
};

// ================ MUTATIONS ================

export const claimDailyReward = async () => {
  const { data } = await api.patch(`/users/claim-daily-reward`);
  return data;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  const { data } = await api.patch(`/users/change-password`, {
    currentPassword,
    newPassword,
  });

  return data;
};

export const requestEmailChange = async ({ password, newEmail }) => {
  const { data } = await api.post(`/users/change-email`, {
    password,
    newEmail,
  });

  return data;
};

export const verifyEmailChangeOTP = async ({ otp }) => {
  const { data } = await api.patch(`/users/change-email/${otp}`);
  return data.email;
};

export const setPin = async ({ pin }) => {
  const { data } = await api.patch(`/users/set-pin`, { pin });
  return data;
};

export const changePin = async ({ currentPin, newPin }) => {
  const { data } = await api.patch(`/users/change-pin`, { currentPin, newPin });
  return data;
};

export const deleteSession = async ({ sessionId }) => {
  const { data } = await api.delete(`/users/sessions/${sessionId}`);
  return data;
};

export const deleteAllSessions = async () => {
  const { data } = await api.delete(`/users/sessions`);
  return data;
};
