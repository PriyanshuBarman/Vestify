import { authenticate } from "@/shared/middlewares/auth.middleware.js";
import { validate } from "@/shared/middlewares/validate.middleware.js";
import { Router } from "express";
import * as sessionController from "../controllers/session.controller.js";
import { sessionIdParamSchema } from "../schemas/session.schema.js";

export const sessionRoutes = Router();
sessionRoutes.use(authenticate);

sessionRoutes.get("/", sessionController.getActiveSessions);
sessionRoutes.delete("/", sessionController.revokeAllSessions);
sessionRoutes.delete(
  "/:sessionId",
  validate(sessionIdParamSchema),
  sessionController.revokeSession,
);
