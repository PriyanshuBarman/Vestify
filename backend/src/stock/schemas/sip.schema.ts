import { StockSipFrequency, StockSipType } from "@prisma/client";
import { z } from "zod";

export const createStockSipSchema = z.object({
  body: z
    .object({
      symbol: z.string().min(1, "Symbol is required"),
      name: z.string().min(1, "Name is required"),
      shortName: z.string().min(1, "Short name is required"),
      frequency: z.enum(StockSipFrequency),
      type: z.enum(StockSipType),
      sipDate: z.number().int().min(1).max(28),
      amount: z.number().positive("Amount must be positive").optional(),
      quantity: z
        .number()
        .int()
        .positive("Quantity must be positive")
        .optional(),
    })
    .refine(
      (data) => {
        if (data.type === "AMOUNT" && !data.amount) return false;
        if (data.type === "QUANTITY" && !data.quantity) return false;
        return true;
      },
      {
        message:
          "Amount is required for AMOUNT type, and quantity is required for QUANTITY type",
      },
    )
    .refine(
      (data) => {
        if (
          data.frequency === "WEEKLY" &&
          (data.sipDate < 1 || data.sipDate > 5)
        )
          return false;
        return true;
      },
      {
        message:
          "For WEEKLY frequency, sipDate must be between 1 (Monday) and 5 (Friday)",
        path: ["sipDate"],
      },
    ),
});

export const editStockSipSchema = z.object({
  params: z.object({
    sipId: z.uuid(),
  }),
  body: z
    .object({
      frequency: z.enum(StockSipFrequency).optional(),
      type: z.enum(StockSipType).optional(),
      sipDate: z.number().int().min(1).max(28).optional(),
      amount: z.number().positive("Amount must be positive").optional(),
      quantity: z
        .number()
        .int()
        .positive("Quantity must be positive")
        .optional(),
    })
    .refine(
      (data) => {
        if (
          data.frequency === "WEEKLY" &&
          data.sipDate &&
          (data.sipDate < 1 || data.sipDate > 5)
        )
          return false;
        return true;
      },
      {
        message:
          "For WEEKLY frequency, sipDate must be between 1 (Monday) and 5 (Friday)",
        path: ["sipDate"],
      },
    ),
});

export const stockSipIdParamSchema = z.object({
  params: z.object({
    sipId: z.uuid(),
  }),
});

export type CreateStockSipSchema = z.infer<
  typeof createStockSipSchema.shape.body
>;
export type EditStockSipSchema = z.infer<typeof editStockSipSchema.shape.body>;
