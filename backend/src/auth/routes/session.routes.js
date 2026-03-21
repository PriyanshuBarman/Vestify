import { Router } from "express";
import { authenticate } from "#shared/middlewares/auth.middleware.js";
import * as sessionController from "../controllers/session.controller.js";

export const sessionRoutes = Router();
sessionRoutes.use(authenticate);

sessionRoutes.get("/", sessionController.getActiveSessions);
sessionRoutes.delete("/", sessionController.revokeAllSessions);
sessionRoutes.delete("/:sessionId", sessionController.revokeSession);
