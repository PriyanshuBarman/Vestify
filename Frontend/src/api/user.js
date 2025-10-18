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

export const fetchProfileById = async (userId) => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/users/profiles/${userId}`,
    { withCredentials: true },
  );

  return data.profile;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  const { data } = await axios.put(
    `${VITE_BACKEND_BASE_URL}/users/change-password`,
    {
      currentPassword,
      newPassword,
    },
    { withCredentials: true },
  );
};

export const changePin = async ({ currentPin, newPin }) => {
  const { data } = await axios.put(
    `${VITE_BACKEND_BASE_URL}/users/pin`,
    { currentPin, newPin },
    { withCredentials: true },
  );
};
