import { ApiError } from "../../shared/utils/apiError.utils.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as sessionService from "../services/session.service.js";

export const getActiveSessions = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const activeSessions = await sessionService.getActiveSessions(userId);

  return res.status(200).json({ success: true, activeSessions });
});

export const revokeSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  if (!sessionId || sessionId === "") {
    throw new ApiError(400, "Valid sessionId required");
  }

  await sessionService.revokeSession(sessionId);

  return res.status(200).json({
    success: true,
    message: "Session revoked successfully",
  });
});

export const revokeAllSessions = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  await sessionService.revokeAllSessions(userId);

  return res.status(200).json({
    success: true,
    message: "All sessions revoked successfully",
  });
});
