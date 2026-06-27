import { FundType } from "@prisma/client";
import { z } from "zod";

export const investmentOrderSchema = z.object({
  body: z.object({
    pin: z.coerce.number().int().positive().max(9999).optional(),
    amount: z.coerce.number().positive().max(10000000),
    schemeCode: z.coerce.number().int().positive(),
    fundName: z.string().trim(),
    fundShortName: z.string().trim(),
    fundType: z.enum(FundType),
    fundCategory: z.string().trim(),
    fundHouseDomain: z.string().trim(),
  }),
});

export const redemptionOrderSchema = z.object({
  params: z.object({
    folio: z.coerce.number().int().positive(),
  }),
  body: z.object({
    amount: z.coerce.number().positive(),
    isInstant: z.boolean().default(false).optional(),
  }),
});

export const orderIdParamSchema = z.object({
  params: z.object({
    orderId: z.uuid(),
  }),
});

// ========== Type exports ==========

export type InvestmentOrderSchema = z.infer<
  typeof investmentOrderSchema.shape.body
>;

export type RedemptionOrderSchema = z.infer<
  typeof redemptionOrderSchema.shape.body
>;

export type OrderIdParamSchema = z.infer<
  typeof orderIdParamSchema.shape.params
>;
