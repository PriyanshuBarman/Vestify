import { z } from "zod";

export const sendMoneySchema = z.object({
  body: z.object({
    pin: z.coerce.number().int().positive().max(9999),
    amount: z.coerce.number().positive().max(100000000),
    receiverId: z.string().trim(),
    note: z.string().max(100).optional(),
  }),
});
