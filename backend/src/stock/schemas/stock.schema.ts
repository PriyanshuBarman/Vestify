import { z } from "zod";

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
