import { api } from "@/lib/axios";

// ================ MUTATIONS ================

export const changePassword = async ({ currentPassword, newPassword }) => {
  const { data } = await api.patch(`/accounts/change-password`, {
    currentPassword,
    newPassword,
  });
  return data;
};

export const requestEmailChange = async ({ password, newEmail }) => {
  const { data } = await api.post(`/accounts/change-email`, {
    password,
    newEmail,
  });
  return data;
};

export const verifyEmailChangeOTP = async ({ otp }) => {
  const { data } = await api.patch(`/accounts/change-email/${otp}`);
  return data.email;
};

export const setPin = async ({ pin }) => {
  const { data } = await api.patch(`/accounts/set-pin`, { pin });
  return data;
};

export const changePin = async ({ currentPin, newPin }) => {
  const { data } = await api.patch(`/accounts/change-pin`, {
    currentPin,
    newPin,
  });
  return data;
};

export const deleteAccount = async () => {
  const { data } = await api.delete(`/accounts`);
  return data;
};
