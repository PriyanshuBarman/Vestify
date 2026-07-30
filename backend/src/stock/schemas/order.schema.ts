import { StockOrderType, GttType, StockOrderAction } from "@prisma/client";
import { z } from "zod";

export const buyOrderSchema = z.object({
  body: z
    .object({
      symbol: z.string().trim(),
      name: z.string().trim(),
      shortName: z.string().trim(),
      quantity: z.coerce.number().int().positive(),
      type: z.enum(StockOrderType),
      gttType: z.enum(GttType).optional(),
      triggerPrice: z.coerce.number().positive().optional(),
      limitPrice: z.coerce.number().positive().optional(),
    })
    .refine((data) => data.type !== "GTT" || data.gttType !== undefined, {
      message: "gttType is required for GTT orders",
      path: ["gttType"],
    })
    .refine((data) => data.type !== "GTT" || data.triggerPrice !== undefined, {
      message: "triggerPrice is required for GTT orders",
      path: ["triggerPrice"],
    })
    .refine((data) => data.type !== "SL" || data.triggerPrice !== undefined, {
      message: "triggerPrice is required for SL orders",
      path: ["triggerPrice"],
    }),
});

export const sellOrderSchema = z.object({
  body: z
    .object({
      symbol: z.string().trim(),
      quantity: z.coerce.number().int().positive(),
      type: z.enum(StockOrderType),
      gttType: z.enum(GttType).optional(),
      triggerPrice: z.coerce.number().positive().optional(),
      limitPrice: z.coerce.number().positive().optional(),
    })
    .refine((data) => data.type !== "GTT" || data.gttType !== undefined, {
      message: "gttType is required for GTT orders",
      path: ["gttType"],
    })
    .refine((data) => data.type !== "GTT" || data.triggerPrice !== undefined, {
      message: "triggerPrice is required for GTT orders",
      path: ["triggerPrice"],
    })
    .refine((data) => data.type !== "SL" || data.triggerPrice !== undefined, {
      message: "triggerPrice is required for SL orders",
      path: ["triggerPrice"],
    }),
});

export const orderIdParamSchema = z.object({
  params: z.object({
    orderId: z.uuid(),
  }),
});

export const modifyOrderSchema = z.object({
  params: z.object({
    orderId: z.uuid(),
  }),
  body: z.object({
    quantity: z.coerce.number().int().positive(),
    type: z.enum(StockOrderType).optional(),
    action: z.enum(StockOrderAction).optional(),
    triggerPrice: z.coerce.number().positive().nullable().optional(),
    limitPrice: z.coerce.number().positive().nullable().optional(),
    gttType: z.enum(GttType).nullable().optional(),
  }),
});

// ========== Type exports ==========

export type BuyOrderSchema = z.infer<typeof buyOrderSchema.shape.body>;

export type SellOrderSchema = z.infer<typeof sellOrderSchema.shape.body>;

export type OrderIdParamSchema = z.infer<
  typeof orderIdParamSchema.shape.params
>;

export type ModifyOrderSchema = z.infer<typeof modifyOrderSchema.shape.body>;
