import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/env.config.js";
import { ApiError } from "../utils/api-error.utils.js";
import { asyncHandler } from "../utils/async-handler.utils.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  const { accessToken } = req.cookies;

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    req.user = { userId: decoded.userId };
    return next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }
});
