import { z } from "zod";
import { FundType } from "@prisma/client";

const validSortOptions = ["invested", "current", "pnl", "returnPercent"];
const validOrderOptions = ["asc", "desc"];

export const portfolioQuerySchema = z.object({
  query: z.object({
    sort_by: z.enum(validSortOptions).optional(),
    order_by: z.enum(validOrderOptions).optional(),
    fund_type: z.enum(FundType).optional(),
  }),
});

export type PortfolioQuerySchema = z.infer<
  typeof portfolioQuerySchema.shape.query
>;
