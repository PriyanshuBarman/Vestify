import { z } from "zod";

export const schemeCodeParamSchema = z.object({
  params: z.object({
    schemeCode: z.coerce.number().int().positive(),
  }),
});
