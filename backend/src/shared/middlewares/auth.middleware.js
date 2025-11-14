import jwt from "jsonwebtoken";
import config from "#config/env.config.js";
import { ApiError } from "../utils/api-error.utils.js";
import { asyncHandler } from "../utils/async-handler.utils.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  const { accessToken } = req.cookies;

  try {
    const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
    req.user = { userId: decoded.userId };
    return next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }
});
