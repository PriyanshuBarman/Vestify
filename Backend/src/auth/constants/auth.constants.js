import { NODE_ENV } from "../../../config/env.config.js";

export const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: NODE_ENV === "production" ? "none" : "strict",
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
};

export const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: NODE_ENV === "production" ? "none" : "strict",
  maxAge: 1000 * 60 * 15, // 15 minutes
};
