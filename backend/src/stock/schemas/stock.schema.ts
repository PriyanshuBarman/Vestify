import { z } from "zod";

export const addToStockWatchlistSchema = z.object({
  body: z.object({
    symbol: z.string().trim().min(1, "Symbol is required"),
    name: z.string().trim().min(1, "Name is required"),
    shortName: z.string().trim().min(1, "Short name is required"),
  }),
});

export const symbolParamSchema = z.object({
  params: z.object({
    symbol: z.string().trim().min(1, "Symbol is required"),
  }),
});

export const bseIndexQuerySchema = z.object({
  query: z.object({
    index: z.string().trim().optional(),
  }),
});

export const stockQuotesQuerySchema = z.object({
  query: z.object({
    symbols: z.string().trim().min(1, "Symbols are required"),
  }),
});

export type AddToStockWatchlistSchema = z.infer<
  typeof addToStockWatchlistSchema.shape.body
>;
export type SymbolParamsSchema = z.infer<typeof symbolParamSchema.shape.params>;
export type StockQuotesQuerySchema = z.infer<
  typeof stockQuotesQuerySchema.shape.query
>;
