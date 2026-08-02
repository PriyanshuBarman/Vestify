import { validate } from "@/shared/middlewares/validate.middleware.js";
import { Router } from "express";
import {
  bseIndexQuerySchema,
  stockQuotesQuerySchema,
  symbolParamSchema,
} from "../schemas/stock.schema.js";

import {
  get52WeekHighLowStocks,
  getGainers,
  getHistoricalChartData,
  getIndices,
  getIntradayChartData,
  getLosers,
  getMultipleStocksData,
  getPopularStocks,
  getSimilarStocks,
  getStockData,
  getTopByVolume,
  searchStock,
} from "../controllers/stock.controller.js";

const router = Router();

router.get("/search", searchStock);
router.get("/gainers", validate(bseIndexQuerySchema), getGainers);
router.get("/losers", validate(bseIndexQuerySchema), getLosers);
router.get("/popular", getPopularStocks);
router.get("/top-by-volume", validate(bseIndexQuerySchema), getTopByVolume);
router.get(
  "/52-week-high-low",
  validate(bseIndexQuerySchema),
  get52WeekHighLowStocks,
);
router.get(
  "/similar-stocks/:symbol",
  validate(symbolParamSchema),
  getSimilarStocks,
);
router.get("/indices", getIndices);

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

router.get("/quotes", validate(stockQuotesQuerySchema), getMultipleStocksData);
router.get("/:symbol", validate(symbolParamSchema), getStockData);

export const stockDataRoutes = router;
