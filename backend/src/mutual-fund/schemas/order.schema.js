import { z } from "zod";

export const investmentOrderSchema = z.object({
  body: z.object({
    pin: z.coerce.number().int().positive().max(9999),
    amount: z.coerce.number().positive().max(10000000),
    schemeCode: z.coerce.number().int().positive(),
    fundName: z.string().trim(),
    fundShortName: z.string().trim(),
    fundType: z.string().trim(),
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
  }),
});

export const orderIdParamSchema = z.object({
  params: z.object({
    orderId: z.uuid(),
  }),
});
