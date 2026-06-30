import { z } from "zod";

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().trim().max(30),
    username: z.string().trim().max(30),
  }),
});

export type UpdateProfileSchema = z.infer<
  typeof updateProfileSchema.shape.body
>;
