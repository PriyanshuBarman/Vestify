import { Router } from "express";
import { verifyPin } from "#shared/middlewares/verify-pin.middleware.js";
import * as sipController from "../controllers/sip.controller.js";
import {
  validateSip,
  validateSipEdit,
  validateStepUp,
} from "../validators/sip.validator.js";
import { validatePinLimiter } from "#shared/middlewares/rate-limiter.middleware.js";

export const sipRoutes = Router();

sipRoutes.post(
  "/",
  validateSip,
  validatePinLimiter,
  verifyPin,
  sipController.createSip,
);
sipRoutes.patch("/:sipId", validateSipEdit, sipController.editSip);
sipRoutes.delete("/:sipId", sipController.cancelSip);
sipRoutes.patch("/:sipId/skip", sipController.skipSip);

sipRoutes.get("/", sipController.getAllSips);
sipRoutes.get("/:sipId", sipController.getSipDetail);

// Step-up routes
sipRoutes.patch("/step-up", validateStepUp, sipController.addEditStepUp);
sipRoutes.delete("/step-up/:sipId", sipController.removeStepUp);
