import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { verifyPin } from "../../shared/middlewares/verifyPin.middleware.js";
import * as walletController from "../controllers/wallet.controller.js";

export const walletRoutes = Router();

walletRoutes.post("/send", authenticate, verifyPin, walletController.sendMoney);
walletRoutes.get("/balance", authenticate, walletController.checkBalance);
walletRoutes.get("/transactions", authenticate, walletController.getAllTnx);
