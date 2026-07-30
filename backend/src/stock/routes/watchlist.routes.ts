import { Router } from "express";
import { validate } from "@/shared/middlewares/validate.middleware.js";
import {
  addToStockWatchlistSchema,
  symbolParamSchema,
} from "../schemas/stock.schema.js";
import * as watchlistController from "../controllers/watchlist.controller.js";

export const watchlistRoutes = Router();

watchlistRoutes.get("/", watchlistController.getWatchlist);

watchlistRoutes.post(
  "/",
  validate(addToStockWatchlistSchema),
  watchlistController.addToWatchlist,
);

watchlistRoutes.delete(
  "/:symbol",
  validate(symbolParamSchema),
  watchlistController.removeFromWatchlist,
);

watchlistRoutes.get(
  "/:symbol",
  validate(symbolParamSchema),
  watchlistController.isInWatchlist,
);
