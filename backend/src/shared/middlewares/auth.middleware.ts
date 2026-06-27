import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.utils.js";
import { envConfig } from "@/config/env.config.js";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return next(new ApiError(401, "Access token is missing"));
  }

  jwt.verify(
    accessToken,
    envConfig.ACCESS_TOKEN_SECRET,
    (error: jwt.VerifyErrors | null, decoded: any) => {
      if (error) {
        return next(new ApiError(401, "Invalid or expired access token"));
      }
      const payload = decoded as { userId: string };

      req.user = { userId: payload.userId };
      next();
    },
  );
}
