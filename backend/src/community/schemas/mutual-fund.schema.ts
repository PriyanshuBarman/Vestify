import { FundType } from "@prisma/client";
import { z } from "zod";

export const getMutualFundPortfolioSchema = z.object({
  params: z.object({
    username: z.string().min(1, "Username must be at least 1 character long"),
  }),
  query: z.object({
    sort_by: z.enum(["invested", "current"]).optional(),
    order_by: z.enum(["asc", "desc"]).default("desc"),
    fund_type: z.enum(FundType).optional(),
  }),
});

export const getFundOrdersSchema = z.object({
  params: z.object({
    username: z.string().min(1, "Username must be at least 1 character long"),
    schemeCode: z.coerce
      .number()
      .min(1, "Scheme code must be a positive number"),
  }),
});

export const mutualFundUsernameParamsSchema = z.object({
  params: z.object({
    username: z.string().min(1, "Username must be at least 1 character long"),
  }),
});

// ========== Type exports ==========

export type GetMutualFundPortfolioSchema = z.infer<
  typeof getMutualFundPortfolioSchema.shape.query
>;
