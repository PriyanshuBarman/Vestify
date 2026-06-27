import { z } from "zod";

export const setPinSchema = z.object({
  body: z.object({
    pin: z.coerce
      .string()
      .length(4)
      .regex(/^\d{4}$/),
  }),
});

export const changePinSchema = z.object({
  body: z.object({
    currentPin: z.coerce
      .string()
      .length(4)
      .regex(/^\d{4}$/),
    newPin: z.coerce
      .string()
      .length(4)
      .regex(/^\d{4}$/),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.coerce.string(),
    newPassword: z.coerce.string(),
  }),
});

export const requestEmailChangeSchema = z.object({
  body: z.object({
    password: z.string(),
    newEmail: z.email().trim().toLowerCase(),
  }),
});

export const verifyEmailChangeSchema = z.object({
  params: z.object({
    otp: z.coerce.string(),
  }),
});

// ========== Type exports ==========

export type SetPinSchema = z.infer<typeof setPinSchema.shape.body>;

export type ChangePinSchema = z.infer<typeof changePinSchema.shape.body>;

export type ChangePasswordSchema = z.infer<
  typeof changePasswordSchema.shape.body
>;

export type RequestEmailChangeSchema = z.infer<
  typeof requestEmailChangeSchema.shape.body
>;

export type VerifyEmailChangeSchema = z.infer<
  typeof verifyEmailChangeSchema.shape.params
>;
