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

export const symbolsParamSchema = z.object({
  params: z.object({
    symbols: z.string().trim().min(1, "Symbols are required"),
  }),
});

export const bseIndexQuerySchema = z.object({
  query: z.object({
    index: z.string().trim().optional(),
  }),
});

export type AddToStockWatchlistSchema = z.infer<
  typeof addToStockWatchlistSchema.shape.body
>;
export type SymbolParams = { symbol: string };
