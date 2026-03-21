import { Router } from "express";
import * as portfolioController from "../controllers/portfolio.controller.js";
import { validateQuery } from "../validators/portfolio-query.validator.js";

export const portfolioRoutes = Router();

portfolioRoutes.get("/", validateQuery, portfolioController.getPortfolio);

portfolioRoutes.get("/summary", portfolioController.getPortfolioSummary);

portfolioRoutes.get("/:schemeCode", portfolioController.getFundPortfolio);
