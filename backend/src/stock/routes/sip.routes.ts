import { Router } from "express";
import * as sipController from "../controllers/sip.controller.js";
import { validate } from "@/shared/middlewares/validate.middleware.js";
import {
  createStockSipSchema,
  editStockSipSchema,
  stockSipIdParamSchema,
} from "../schemas/sip.schema.js";

export const sipRoutes = Router();

sipRoutes.post("/", validate(createStockSipSchema), sipController.createSip);
sipRoutes.patch("/:sipId", validate(editStockSipSchema), sipController.editSip);
sipRoutes.delete(
  "/:sipId",
  validate(stockSipIdParamSchema),
  sipController.cancelSip,
);

sipRoutes.get("/", sipController.getAllSips);
sipRoutes.get(
  "/:sipId",
  validate(stockSipIdParamSchema),
  sipController.getSipDetail,
);
