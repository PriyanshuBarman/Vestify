import { z } from "zod";

export const getUsersSchema = z.object({
  query: z.object({
    offset: z.coerce.number().int().min(0).default(0),
    limit: z.coerce.number().int().min(1).default(20),
    sortBy: z
      .enum(["createdAt", "updatedAt", "name", "balance"])
      .default("updatedAt"),
  }),
});

export const searchUsersSchema = z.object({
  query: z.object({
    query: z.string().min(1, "Query must be at least 1 character long"),
    limit: z.coerce.number().int().min(1).default(10),
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
export type UsernameParamsSchema = z.infer<
  typeof usernameParamsSchema.shape.params
>;
