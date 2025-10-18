import { VITE_BACKEND_BASE_URL } from "@/config/env";
import axios from "axios";

export const fetchUserData = async () => {
  const { data } = await axios.get(`${VITE_BACKEND_BASE_URL}/users`, {
    withCredentials: true,
  });

  return data.user;
};

export const claimDailyReward = async () => {
  const { data } = await axios.patch(
    `${VITE_BACKEND_BASE_URL}/users/claim-daily-reward`,
    {},
    { withCredentials: true },
  );

  return data;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  const { data } = await axios.patch(
    `${VITE_BACKEND_BASE_URL}/users/change-password`,
    {
      currentPassword,
      newPassword,
    },
    { withCredentials: true },
  );

  return data;
};

export const requestEmailChange = async ({ password, newEmail }) => {
  const { data } = await axios.post(
    `${VITE_BACKEND_BASE_URL}/users/change-email`,
    {
      password,
      newEmail,
    },
    { withCredentials: true },
  );

  return data;
};

export const verifyEmailChangeOTP = async ({ otp }) => {
  const { data } = await axios.patch(
    `${VITE_BACKEND_BASE_URL}/users/change-email/${otp}`,
    { withCredentials: true },
  );

  return data.email;
};

export const setPin = async ({ pin }) => {
  const { data } = await axios.patch(
    `${VITE_BACKEND_BASE_URL}/users/set-pin`,
    { pin },
    { withCredentials: true },
  );

  return data;
};

export const changePin = async ({ currentPin, newPin }) => {
  const { data } = await axios.patch(
    `${VITE_BACKEND_BASE_URL}/users/change-pin`,
    { currentPin, newPin },
    { withCredentials: true },
  );

  return data;
};
