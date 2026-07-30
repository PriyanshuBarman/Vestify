import type { Socket } from "socket.io";
import { parseCookie } from "cookie";
import jwt from "jsonwebtoken";
import { envConfig } from "@/config/env.config.js";

export function authenticateSocket(
  socket: Socket,
  next: (err?: Error) => void,
) {
  try {
    const rawCookies = socket.request.headers.cookie;
    if (!rawCookies) {
      return next(new Error("Authentication error: Cookies missing"));
    }

    const parsedCookies = parseCookie(rawCookies);
    const accessToken = parsedCookies.accessToken;
    if (!accessToken) {
      return next(new Error("Authentication error: Access token missing"));
    }

    jwt.verify(accessToken, envConfig.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err || !decoded) {
        return next(
          new Error("Authentication error: Invalid or expired token"),
        );
      }

      const payload = decoded as { userId: string };

      socket.data.userId = payload.userId;
      next();
    });
  } catch {
    next(new Error("Authentication error: Internal auth verification failed"));
  }
}
