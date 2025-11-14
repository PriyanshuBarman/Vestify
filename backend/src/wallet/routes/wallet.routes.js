import { Router } from "express";
import { authenticate } from "#shared/middlewares/auth.middleware.js";
import { verifyPin } from "#shared/middlewares/verify-pin.middleware.js";
import * as walletController from "../controllers/wallet.controller.js";
import { validatePinLimiter } from "#shared/middlewares/rate-limiter.middleware.js";

export const walletRoutes = Router();

walletRoutes.post(
  "/send",
  authenticate,
  validatePinLimiter,
  verifyPin,
  walletController.sendMoney
);
walletRoutes.get("/balance", authenticate, walletController.checkBalance);
walletRoutes.get("/transactions", authenticate, walletController.getAllTnx);
