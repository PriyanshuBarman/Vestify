import { VITE_BACKEND_BASE_URL } from "@/config/env";
import axios from "axios";

export const updateProfile = async ({ name, username }) => {
  const { data } = await axios.patch(
    `${VITE_BACKEND_BASE_URL}/users/profiles`,
    {
      name,
      username,
    },
    { withCredentials: true },
  );

  return data.profile;
};

export const updateAvatar = async (formData) => {
  const { data } = await axios.put(
    `${VITE_BACKEND_BASE_URL}/users/profiles/avatar`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data.avatar;
};

export const removeAvatar = async () => {
  const { data } = await axios.delete(
    `${VITE_BACKEND_BASE_URL}/users/profiles/avatar`,
    { withCredentials: true },
  );
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
  const { data } = await axios.put(
    `${VITE_BACKEND_BASE_URL}/users/change-email/${otp}`,
    { withCredentials: true },
  );

  return data.email;
};
