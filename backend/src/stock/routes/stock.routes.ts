import { Router } from "express";
import { validate } from "@/shared/middlewares/validate.middleware.js";
import {
  symbolParamSchema,
  symbolsParamSchema,
  bseIndexQuerySchema,
} from "../schemas/stock.schema.js";
import {
  getHistoricalChartData,
  getIntradayChartData,
  getStockData,
  getPopularStocks,
  getTopByVolume,
  get52WeekHighLowStocks,
  getSimilarStocks,
  getIndices,
  getGainers,
  getLosers,
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

export const stockDataRoutes = router;
