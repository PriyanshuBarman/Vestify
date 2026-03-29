import { z } from "zod";

export const createSipSchema = z.object({
  body: z.object({
    pin: z.coerce.number().int().positive().max(9999),
    amount: z.coerce.number().positive().max(10000000),
    sipDate: z.coerce.number().int(),
    schemeCode: z.coerce.number().int().positive(),
    fundName: z.string().trim(),
    fundShortName: z.string().trim(),
    fundCategory: z.string().trim(),
    fundHouseDomain: z.string().trim(),
    fundType: z.string().trim(),
  }),
});

export const editSipSchema = z.object({
  params: z.object({
    sipId: z.uuid(),
  }),
  body: z
    .object({
      amount: z.coerce.number().positive().optional(),
      sipDate: z.coerce.number().int().optional(),
    })
    .refine((data) => data.amount !== undefined || data.sipDate !== undefined, {
      message: "amount or sipDate one is required",
      path: ["amount"],
    }),
});

export const stepUpSipSchema = z.object({
  body: z
    .object({
      sipId: z.uuid(),
      intervalInMonths: z.coerce.number().int().positive(),
      amount: z.coerce.number().positive().optional(),
      percentage: z.coerce.number().positive().max(100).optional(),
    })
    .refine(
      (data) => data.amount !== undefined || data.percentage !== undefined,
      {
        message: "amount or percentage one is required",
        path: ["amount"],
      },
    ),
});

export const sipIdParamSchema = z.object({
  params: z.object({
    sipId: z.uuid(),
  }),
});
