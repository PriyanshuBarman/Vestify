import { Router } from "express";
import * as watchlistController from "../controllers/watchlist.controller.js";
import { validate } from "@/shared/middlewares/validate.middleware.js";
import { addToWatchlistSchema } from "../schemas/watchlist.schema.js";
import { schemeCodeParamSchema } from "@/shared/schemas/schemecode-params.schema.js";

export const watchlistRoutes = Router();

watchlistRoutes.get("/", watchlistController.getWatchlist);

watchlistRoutes.post(
  "/",
  validate(addToWatchlistSchema),
  watchlistController.addToWatchlist,
);

watchlistRoutes.delete(
  "/:schemeCode",
  validate(schemeCodeParamSchema),
  watchlistController.removeFromWatchlist,
);

watchlistRoutes.get(
  "/:schemeCode",
  validate(schemeCodeParamSchema),
  watchlistController.isInWatchlist,
);
