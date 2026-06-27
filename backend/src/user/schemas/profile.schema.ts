import { z } from "zod";

export const searchProfileSchema = z.object({
  query: z.object({
    query: z.string().min(1, "Query must be at least 1 character long"),
    limit: z.coerce.number().int().min(1).default(10),
  }),
});

export const userIdParamsSchema = z.object({
  params: z.object({
    userId: z.uuid(),
  }),
});
