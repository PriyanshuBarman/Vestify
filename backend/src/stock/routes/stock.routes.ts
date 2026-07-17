import { Router } from "express";
import { validate } from "@/shared/middlewares/validate.middleware.js";
import {
  symbolParamSchema,
  symbolsParamSchema,
} from "../schemas/stock.schema.js";
import {
  getHistoricalChartData,
  getIntradayChartData,
  getStockData,
  getPopularStocks,
  getIndices,
  getGainers,
  getLosers,
} from "../controllers/stock.controller.js";

const router = Router();

router.get("/gainers", getGainers);
router.get("/losers", getLosers);
router.get("/popular", getPopularStocks);
router.get("/indices/:symbols", validate(symbolsParamSchema), getIndices);

router.get(
  "/historical-chart/:symbol",
  validate(symbolParamSchema),
  getHistoricalChartData,
);
router.get(
  "/intraday-chart/:symbol",
  validate(symbolParamSchema),
  getIntradayChartData,
);
router.get("/:symbol", validate(symbolParamSchema), getStockData);

export default router;
