import { Router } from "express";
import * as portfolioController from "../controllers/portfolio.controller.js";
import { validate } from "#shared/middlewares/validate.middleware.js";
import { portfolioQuerySchema } from "../schemas/portfolio.schema.js";
import { schemeCodeParamSchema } from "#shared/schemas/schemecode-params.schema.js";

export const portfolioRoutes = Router();

portfolioRoutes.get(
  "/",
  validate(portfolioQuerySchema),
  portfolioController.getPortfolio,
);

portfolioRoutes.get("/summary", portfolioController.getPortfolioSummary);

portfolioRoutes.get(
  "/:schemeCode",
  validate(schemeCodeParamSchema),
  portfolioController.getFundPortfolio,
);
