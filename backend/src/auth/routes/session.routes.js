import { Router } from "express";
import { authenticate } from "#shared/middlewares/auth.middleware.js";
import * as sessionController from "../controllers/session.controller.js";
import { validate } from "#shared/middlewares/validate.middleware.js";
import { sessionIdParamSchema } from "../schemas/auth.schema.js";

export const sessionRoutes = Router();
sessionRoutes.use(authenticate);

sessionRoutes.get("/", sessionController.getActiveSessions);
sessionRoutes.delete("/", sessionController.revokeAllSessions);
sessionRoutes.delete(
  "/:sessionId",
  validate(sessionIdParamSchema),
  sessionController.revokeSession,
);
