import { z } from "zod";

export const getStockPortfolioSchema = z.object({
  params: z.object({
    username: z.string().min(1, "Username must be at least 1 character long"),
  }),
});

export const getSingleStockPortfolioSchema = z.object({
  params: z.object({
    username: z.string().min(1, "Username must be at least 1 character long"),
    symbol: z.string().min(1, "Symbol must be at least 1 character long"),
  }),
});

export const getSingleStockHoldingsSchema = z.object({
  params: z.object({
    username: z.string().min(1, "Username must be at least 1 character long"),
    symbol: z.string().min(1, "Symbol must be at least 1 character long"),
  }),
});

export const getStockOrdersSchema = z.object({
  params: z.object({
    username: z.string().min(1, "Username must be at least 1 character long"),
  }),
});

export const getStockOrderDetailSchema = z.object({
  params: z.object({
    orderId: z.string().min(1, "Order ID must be specified"),
  }),
});

export const getStockWatchlistSchema = z.object({
  params: z.object({
    username: z.string().min(1, "Username must be at least 1 character long"),
  }),
});
