import config from "#config/env.config.js";

const isProd = config.NODE_ENV === "production";

export const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "strict",
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
};

export const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "strict",
  maxAge: 1000 * 60 * 15, // 15 minutes
};
