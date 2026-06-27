import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    name: z
      .string("name is required")
      .trim()
      .min(2, "name must be at least 2 characters")
      .max(50, "name must be at most 50 characters"),
    email: z.email().trim().toLowerCase(),
    password: z
      .string("password is required")
      .trim()
      .min(6, "password must be at least 6 characters")
      .max(20, "password must be at most 20 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    referralCode: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email().trim().toLowerCase(),
    password: z
      .string("password is required")
      .trim()
      .max(20, "password must be at most 20 characters"),
  }),
});

// ========== Type exports ==========

export type SignupSchema = z.infer<typeof signupSchema.shape.body>;
export type LoginSchema = z.infer<typeof loginSchema.shape.body>;
