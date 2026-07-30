import { Router } from "express";
import { validate } from "@/shared/middlewares/validate.middleware.js";
import { symbolParamSchema } from "../schemas/stock.schema.js";
import * as portfolioController from "../controllers/portfolio.controller.js";

export const portfolioRoutes = Router();

portfolioRoutes.get("/", portfolioController.getStockPortfolio);
portfolioRoutes.get(
  "/:symbol/holdings",
  validate(symbolParamSchema),
  portfolioController.getSingleStockHoldings,
);
portfolioRoutes.get(
  "/:symbol",
  validate(symbolParamSchema),
  portfolioController.getSingleStockPortfolio,
);
