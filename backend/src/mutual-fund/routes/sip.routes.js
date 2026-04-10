import { Router } from "express";
import { verifyPin } from "#shared/middlewares/verify-pin.middleware.js";
import * as sipController from "../controllers/sip.controller.js";
import { validatePinLimiter } from "#shared/middlewares/rate-limiter.middleware.js";
import { validate } from "#shared/middlewares/validate.middleware.js";
import {
  createSipSchema,
  editSipSchema,
  sipIdParamSchema,
  stepUpSipSchema,
} from "../schemas/sip.schema.js";

export const sipRoutes = Router();

sipRoutes.post(
  "/",
  validate(createSipSchema),
  validatePinLimiter,
  verifyPin,
  sipController.createSip,
);
sipRoutes.patch("/:sipId", validate(editSipSchema), sipController.editSip);
sipRoutes.delete(
  "/:sipId",
  validate(sipIdParamSchema),
  sipController.cancelSip,
);
sipRoutes.patch(
  "/:sipId/skip",
  validate(sipIdParamSchema),
  sipController.skipSip,
);

sipRoutes.get("/", sipController.getAllSips);
sipRoutes.get(
  "/:sipId",
  validate(sipIdParamSchema),
  sipController.getSipDetail,
);

// Step-up SIP routes
sipRoutes.patch(
  "/step-up/:sipId",
  validate(stepUpSipSchema),
  sipController.addOrUpdateStepUp,
);
sipRoutes.delete(
  "/step-up/:sipId",
  validate(sipIdParamSchema),
  sipController.removeStepUp,
);
