import type { ApiRequest } from "@/shared/types/types.js";
import type { Request, Response } from "express";

import * as sessionService from "../services/session.service.js";

export const getActiveSessions = async (req: Request, res: Response) => {
  const { userId } = req.user!;

  const activeSessions = await sessionService.getActiveSessions(userId);

  res.status(200).json({ success: true, activeSessions });
};

export const revokeSession = async (
  req: ApiRequest<{}, { sessionId: string }>,
  res: Response,
) => {
  const { sessionId } = req.params;

  await sessionService.revokeSession(sessionId);

  res.status(200).json({
    success: true,
    message: "Session revoked successfully",
  });
};

export const revokeAllSessions = async (req: Request, res: Response) => {
  const { userId } = req.user!;
  const { refreshToken } = req.cookies;

  await sessionService.revokeAllSessions(userId, refreshToken);

  res.status(200).json({
    success: true,
    message: "All sessions revoked successfully",
  });
};
