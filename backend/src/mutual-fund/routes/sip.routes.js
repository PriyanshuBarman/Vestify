import { Router } from "express";
import { authenticate } from "#shared/middlewares/auth.middleware.js";
import { verifyPin } from "#shared/middlewares/verify-pin.middleware.js";
import * as sipController from "../controllers/sip.controller.js";
import {
  validateSip,
  validateSipEdit,
  validateStepUp,
} from "../validators/sip.validator.js";
import { validatePinLimiter } from "#shared/middlewares/rate-limiter.middleware.js";

export const sipRoutes = Router();

// Step-up routes
sipRoutes.patch(
  "/step-up",
  authenticate,
  validateStepUp,
  sipController.addEditStepUp
);
sipRoutes.delete("/step-up/:sipId", authenticate, sipController.removeStepUp);

// Regular SIP routes
sipRoutes.post(
  "/",
  authenticate,
  validateSip,
  validatePinLimiter,
  verifyPin,
  sipController.createSip
);
sipRoutes.patch(
  "/:sipId",
  authenticate,
  validateSipEdit,
  sipController.editSip
);
sipRoutes.delete("/:sipId", authenticate, sipController.cancelSip);
sipRoutes.patch("/:sipId/skip", authenticate, sipController.skipSip);

sipRoutes.get("/", authenticate, sipController.getAllSips);
sipRoutes.get("/:sipId", authenticate, sipController.getSipDetail);
