import jwt from "jsonwebtoken";
import envConfig from "#config/env.config.js";
import { ApiError } from "../utils/api-error.utils.js";

export const authenticate = (req, res, next) => {
  const { accessToken } = req.cookies;

  jwt.verify(accessToken, envConfig.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      throw new ApiError(401, "Invalid or expired access token");
    }

    req.user = { userId: decoded.userId };
    next();
  });
};
