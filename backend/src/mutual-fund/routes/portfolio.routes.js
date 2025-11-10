import { authenticate } from "#shared/middlewares/auth.middleware.js";
import { Router } from "express";
import * as portfolioController from "../controllers/portfolio.controller.js";
import { validateQuery } from "../validators/portfolio-query.validator.js";

export const portfolioRoutes = Router();

portfolioRoutes.get(
  "/",
  authenticate,
  validateQuery,
  portfolioController.getPortfolio
);

portfolioRoutes.get(
  "/summary",
  authenticate,
  portfolioController.getPortfolioSummary
);

portfolioRoutes.get(
  "/:schemeCode",
  authenticate,
  portfolioController.getFundPortfolio
);
