import { Router } from "express";
import * as watchlistService from "../controllers/watchlist.controller.js";
import { validate } from "#shared/middlewares/validate.middleware.js";
import { addToWatchlistSchema } from "../schemas/watchlist.schema.js";
import { schemeCodeParamSchema } from "#shared/schemas/schemecode-params.schema.js";

export const watchlistRoutes = Router();

watchlistRoutes.get("/", watchlistService.getWatchlist);

watchlistRoutes.post(
  "/",
  validate(addToWatchlistSchema),
  watchlistService.addToWatchlist,
);

watchlistRoutes.delete(
  "/:schemeCode",
  validate(schemeCodeParamSchema),
  watchlistService.removeFromWatchlist,
);

watchlistRoutes.get(
  "/:schemeCode",
  validate(schemeCodeParamSchema),
  watchlistService.isInWatchlist,
);
