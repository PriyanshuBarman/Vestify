import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as sessionController from "../controllers/session.controller.js";

export const sessionRoutes = Router();

sessionRoutes.get("/", authenticate, sessionController.getActiveSessions);
sessionRoutes.delete("/", authenticate, sessionController.revokeAllSessions);
sessionRoutes.delete(
  "/:sessionId",
  authenticate,
  sessionController.revokeSession
);
