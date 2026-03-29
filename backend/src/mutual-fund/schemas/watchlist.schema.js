import { z } from "zod";

export const addToWatchlistSchema = z.object({
  body: z.object({
    schemeCode: z.coerce.number().int().positive(),
    fundName: z.string().trim(),
    fundShortName: z.string().trim(),
    fundHouseDomain: z.string().trim(),
  }),
});
