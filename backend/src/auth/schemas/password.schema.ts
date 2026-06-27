import { z } from "zod";

export const resetPasswordSchema = z.object({
  params: z.object({
    token: z.string("token is required"),
  }),
  body: z.object({
    newPassword: z
      .string("newPassword is required")
      .trim()
      .min(6, "password must be at least 6 characters")
      .max(20, "password must be at most 20 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.email("email is required").trim().toLowerCase(),
  }),
});

// ========== Type exports ==========

export type ResetPasswordSchema = z.infer<
  typeof resetPasswordSchema.shape.body
>;

export type ForgotPasswordSchema = z.infer<
  typeof forgotPasswordSchema.shape.body
>;
