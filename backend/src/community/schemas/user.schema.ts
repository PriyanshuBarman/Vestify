import { z } from "zod";
import { FundType } from "@prisma/client";

export const getUsersSchema = z.object({
  query: z.object({
    offset: z.coerce.number().int().min(0).default(0),
    limit: z.coerce.number().int().min(1).default(20),
    sortBy: z.enum(["createdAt", "updatedAt", "name"]).default("updatedAt"),
  }),
});

export const searchUsersSchema = z.object({
  query: z.object({
    query: z.string().min(1, "Query must be at least 1 character long"),
    limit: z.coerce.number().int().min(1).default(10),
  }),
});

export const getPortfolioSchema = z.object({
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

export const usernameParamsSchema = z.object({
  params: z.object({
    username: z.string().min(1, "Username must be at least 1 character long"),
  }),
});

// ========== Type exports ==========

export type GetUsersSchema = z.infer<typeof getUsersSchema.shape.query>;
export type SearchUsersSchema = z.infer<typeof searchUsersSchema.shape.query>;
export type GetPortfolioSchema = z.infer<typeof getPortfolioSchema.shape.query>;
