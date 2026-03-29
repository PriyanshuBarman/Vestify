import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.email().trim().toLowerCase(),
  password: z
    .string("Password is required")
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    )
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
});

export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z
    .string()
    .trim()
    .min(1, "Password must be at least 1 characters")
    .max(20, "Password must be at most 20 characters"),
});
