import { Router } from "express";
import { authenticate } from "#shared/middlewares/auth.middleware.js";
import { verifyPin } from "#shared/middlewares/verify-pin.middleware.js";
import * as walletController from "../controllers/wallet.controller.js";
import { validatePinLimiter } from "#shared/middlewares/rate-limiter.middleware.js";
import { validate } from "#shared/middlewares/validate.middleware.js";
import { sendMoneySchema } from "../schemas/wallet.schema.js";

export const walletRoutes = Router();

walletRoutes.use(authenticate);

walletRoutes.post(
  "/send",
  validate(sendMoneySchema),
  validatePinLimiter,
  verifyPin,
  walletController.sendMoney,
);
walletRoutes.get("/balance", walletController.checkBalance);
walletRoutes.get("/transactions", walletController.getAllTnx);
