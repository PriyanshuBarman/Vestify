import { Router } from "express";
import * as watchlistService from "../controllers/watchlist.controller.js";
import { validateWatchlist } from "../validators/watchlist.validator.js";

export const watchlistRoutes = Router();

watchlistRoutes.post("/", validateWatchlist, watchlistService.addToWatchlist);

watchlistRoutes.delete("/:schemeCode", watchlistService.removeFromWatchlist);

watchlistRoutes.get("/", watchlistService.getWatchlist);

watchlistRoutes.get("/:schemeCode", watchlistService.isInWatchlist);
