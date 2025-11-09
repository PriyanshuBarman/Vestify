import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { validateSip } from "../validators/sip.validator.js";
import * as sipController from "../controllers/sip.controller.js";
import { verifyPin } from "../../shared/middlewares/verify-pin.middleware.js";

export const sipRoutes = Router();

sipRoutes.post(
  "/",
  authenticate,
  validateSip,
  verifyPin,
  sipController.createSip
);
sipRoutes.patch("/:sipId", authenticate, sipController.editSip);
sipRoutes.delete("/:sipId", authenticate, sipController.cancelSip);
sipRoutes.patch("/:sipId/skip", authenticate, sipController.skipSip);

sipRoutes.get("/", authenticate, sipController.getAllSips);
sipRoutes.get("/:sipId", authenticate, sipController.getSipDetail);
