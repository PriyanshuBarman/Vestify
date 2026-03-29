import { z } from "zod";

const validSortOptions = ["invested", "current", "pnl", "returnPercent"];
const validOrderOptions = ["asc", "desc"];
const validFundTypes = ["EQUITY", "DEBT", "HYBRID", "OTHER"];

export const portfolioQuerySchema = z.object({
  query: z.object({
    sort_by: z.enum(validSortOptions).optional(),
    order_by: z.enum(validOrderOptions).optional(),
    fund_type: z
      .string()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(validFundTypes))
      .optional(),
  }),
});
